import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { holidayResults } from "@/lib/holiday/results";
import { parseStories } from "@/lib/holiday/scoring";
import { HolidayShareCard } from "@/components/holiday/HolidayShareCard";
import { holidayCardFormats, type HolidayCardFormat } from "@/lib/holiday/card-formats";
export const runtime = "nodejs";
export const maxDuration = 30;
const fonts = Promise.all([
  readFile(join(process.cwd(),"public/holiday/fonts/Inter-Regular.woff")),
  readFile(join(process.cwd(),"public/holiday/fonts/Inter-Bold.woff")),
]);
export async function GET(request:Request,{params}:{params:Promise<{story:string}>}) {
  const {story}=await params;
  const leaders=story==='quiz'?[]:parseStories(story);
  if(!leaders)return new Response('Story not found',{status:404});
  const query=new URL(request.url).searchParams;
  const requested=query.get('format')||'landscape';
  if(!Object.hasOwn(holidayCardFormats,requested))return new Response('Unknown card format',{status:400});
  const format=requested as HolidayCardFormat;
  const [width,height]=holidayCardFormats[format];
  const slug=leaders.length===1?holidayResults[leaders[0]].name.toLowerCase().replace(/^the /,"").replace(/[^a-z0-9]+/g,"-"):story === "quiz"?"holiday-quiz":"holiday-stories";
  const [regular,bold]=await fonts;
  return new ImageResponse(<HolidayShareCard leaders={leaders} format={format} tentative={query.get('tentative')==='1'}/>,{
    width,height,fonts:[{name:"HolidaySans",data:new Uint8Array(regular).buffer,weight:400,style:"normal"},{name:"HolidaySans",data:new Uint8Array(bold).buffer,weight:700,style:"normal"}],headers:{'Cache-Control':'public, max-age=3600',...(query.has('download')?{'Content-Disposition':`attachment; filename="parablepath-${slug}-${format}.png"`}:{})}
  });
}
