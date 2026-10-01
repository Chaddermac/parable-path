import { FormationResultCardImage } from "@/components/formation/FormationResultCardImage";
import { formationResultByRoom, isRoomId } from "@/lib/parablepath/popular/results";
import { ImageResponse } from "next/og";

export const runtime = "nodejs";

const libreBaskerville = fetch(new URL("../../../../assets/fonts/LibreBaskerville-Bold.ttf", import.meta.url)).then((response) => response.arrayBuffer());
const sourceSansRegular = fetch(new URL("../../../../assets/fonts/SourceSans3-Regular.otf", import.meta.url)).then((response) => response.arrayBuffer());
const sourceSansBold = fetch(new URL("../../../../assets/fonts/SourceSans3-Bold.otf", import.meta.url)).then((response) => response.arrayBuffer());

export async function GET(request: Request, { params }: { params: Promise<{ storyId: string }> }) {
  const { storyId } = await params;
  if (!isRoomId(storyId)) return new Response("Result not found", { status: 404, headers: { "Cache-Control": "private, no-store" } });

  const profile = formationResultByRoom[storyId];
  const [serifData, sansRegularData, sansBoldData] = await Promise.all([libreBaskerville, sourceSansRegular, sourceSansBold]);
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
