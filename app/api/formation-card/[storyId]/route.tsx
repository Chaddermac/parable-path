import { FormationResultCardImage } from "@/components/formation/FormationResultCardImage";
import { formationResultByRoom, isRoomId } from "@/lib/parablepath/popular/results";
import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export async function GET(request: Request, { params }: { params: Promise<{ storyId: string }> }) {
  const { storyId } = await params;
  if (!isRoomId(storyId)) return new Response("Result not found", { status: 404, headers: { "Cache-Control": "private, no-store" } });

  const profile = formationResultByRoom[storyId];
  const [serifData, sansRegularData, sansBoldData] = await Promise.all(
    ["LibreBaskerville-Bold.ttf", "SourceSans3-Regular.otf", "SourceSans3-Bold.otf"].map(async (filename) => {
      const response = await fetch(new URL(`/fonts/${filename}`, request.url), { cache: "no-store" });
      if (!response.ok) throw new Error(`Unable to load bundled card font (${response.status}).`);
      return response.arrayBuffer();
    })
  );
  const callingSlug = profile.callingName.toLowerCase().replaceAll(" / ", "-").replaceAll(" ", "-");

  return new ImageResponse(
    <FormationResultCardImage profile={profile} logoSrc={new URL("/parablepath-full-logo.png", request.url).toString()}/>,
    {
      width: 1122,
      height: 1402,
      fonts: [
        { name: "Libre Baskerville", data: serifData, style: "normal", weight: 700 },
        { name: "Source Sans 3", data: sansRegularData, style: "normal", weight: 400 },
        { name: "Source Sans 3", data: sansBoldData, style: "normal", weight: 700 }
      ],
      headers: {
        "Content-Disposition": `attachment; filename="parablepath-${callingSlug}-formation-card.png"`,
        "Cache-Control": "private, no-store"
      }
    }
  );
}
