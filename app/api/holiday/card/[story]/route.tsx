import { ImageResponse } from "next/og";
import { holidayResults } from "@/lib/holiday/results";
import { holidayArtwork } from "@/lib/holiday/artwork";
import artwork from "@/lib/holiday/card-artwork.json";
import { parseStories } from "@/lib/holiday/scoring";
export const runtime = "nodejs";
const formats = { landscape: [1200, 630], square: [1080, 1080], portrait: [1080, 1350], story: [1080, 1920] } as const;
export async function GET(request: Request, { params }: { params: Promise<{ story: string }> }) {
  const { story } = await params;
  const leaders = story === "quiz" ? [] : parseStories(story);
  if (!leaders) return new Response("Story not found", { status: 404 });
  const query = new URL(request.url).searchParams;
  const requestedFormat = query.get("format") || "landscape";
  if (!Object.hasOwn(formats, requestedFormat)) return new Response("Unknown card format", { status: 400 });
  const format = requestedFormat as keyof typeof formats;
  const [width,height] = formats[format];
  const landscape = format === "landscape";
  const single = leaders.length === 1 ? holidayResults[leaders[0]] : null;
  const art = leaders.length === 1 ? holidayArtwork[leaders[0]] : null;
  const image = art ? artwork[art.id as keyof typeof artwork] : null;
  const title = leaders.length ? leaders.map(p => holidayResults[p].name).join(" + ") : "What’s Your Holiday Story?";
  const calling = leaders.length ? leaders.map(p => holidayArtwork[p].calling).join(" · ") : "16 fun questions. Eight holiday personalities.";
  const globeSize = landscape ? 275 : format === "story" ? 580 : 395;
  return new ImageResponse(<div style={{ display:"flex",flexDirection:"column",justifyContent:"space-between",width:"100%",height:"100%",background:"linear-gradient(145deg,#f4faff,#dceafa 70%,#e7e2ff)",color:"#19345f",padding:landscape?"40px 60px":"65px 65px",position:"relative",overflow:"hidden",fontFamily:"sans-serif" }}>
    <div style={{ position:"absolute",bottom:-140,left:-100,width:width+200,height:300,borderRadius:"50%",background:"#ffffffa6",display:"flex" }}/>
    <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",fontSize:landscape?28:34 }}><img src={artwork._brandLogo} width={landscape?210:300} height={landscape?56:80} alt="ParablePath"/><span style={{ fontSize:landscape?15:19,letterSpacing:3,border:"1px solid #b7cce4",borderRadius:40,padding:"10px 18px",background:"#ffffff99" }}>HOLIDAY EDITION</span></div>
    <div style={{ display:"flex",flexDirection:landscape?"row-reverse":"column",alignItems:"center",gap:landscape?45:format==="story"?65:30,justifyContent:"center",flex:1,padding:landscape?"30px 0":"35px 0" }}>
      <div style={{ display:"flex",position:"relative",width:globeSize,height:globeSize+45,flexShrink:0 }}>
        <div style={{ display:"flex",position:"absolute",width:globeSize,height:globeSize,borderRadius:"50%",border:"4px solid white",background:"radial-gradient(circle at 25% 20%,#ffffff,#d0e2f6)",boxShadow:"inset -12px -12px 30px #b7cfe9,0 15px 35px #7d9bb833",alignItems:"center",justifyContent:"center",overflow:"hidden" }}>
          {image ? <img src={image} width={globeSize*.65} height={globeSize*.65} style={{ borderRadius:"50%",marginTop:-12 }}/> : <svg width={globeSize*.5} height={globeSize*.5} viewBox="0 0 100 100"><path d="M50 0 62 38 100 50 62 62 50 100 38 62 0 50 38 38Z" fill="#edc365"/></svg>}
          <div style={{ display:"flex",position:"absolute",bottom:-18,left:-10,width:globeSize+20,height:globeSize*.19,borderRadius:"50%",background:"#ffffffdb" }}/>
          <div style={{ display:"flex",position:"absolute",top:globeSize*.17,left:globeSize*.13,height:globeSize*.3,width:globeSize*.13,borderLeft:"7px solid #ffffffb5",borderRadius:"50%",transform:"rotate(35deg)" }}/>
          {[.12,.28,.75,.84,.18,.7].map((v,i)=><span key={i} style={{display:"flex",position:"absolute",width:5,height:5,borderRadius:5,background:"#fff",left:globeSize*v,top:globeSize*[.3,.13,.18,.44,.65,.76][i]}}/>)}
        </div>
        <div style={{ display:"flex",position:"absolute",bottom:5,left:globeSize*.12,width:globeSize*.76,height:globeSize*.16,borderRadius:"12px 12px 23px 23px",border:"2px solid #aac3df",background:"linear-gradient(#f6fbff,#b5cce8)",justifyContent:"center",alignItems:"center" }}><svg width="25" height="25" viewBox="0 0 40 40"><path d="m20 1 5 14 14 5-14 5-5 14-5-14L1 20l14-5Z" fill={art?.color||"#b8944a"}/></svg></div>
      </div>
      <div style={{ display:"flex",flexDirection:"column",...(landscape?{flex:1}:{}),alignItems:landscape?"flex-start":"center",textAlign:landscape?"left":"center",maxWidth:950 }}>
        <p style={{ margin:"0 0 16px",fontSize:landscape?13:17,fontWeight:700,letterSpacing:4,color:"#526987" }}>{leaders.length>1?"EQUALLY PLAUSIBLE HOLIDAY STORIES":leaders.length?"YOUR HOLIDAY STORY":"A LITTLE CHRISTMAS CURIOSITY"}</p>
        <h1 style={{ fontSize:leaders.length>2?(landscape?31:42):landscape?57:format==="story"?83:68,lineHeight:1.08,letterSpacing:-2,fontWeight:700,margin:0 }}>{title}</h1>
        <p style={{ fontSize:leaders.length>4?18:landscape?23:29,color:"#456687",margin:"22px 0 0",lineHeight:1.4 }}>{calling}</p>
        <p style={{ fontSize:landscape?21:27,lineHeight:1.5,margin:"22px 0 0",maxWidth:800 }}>{single?.line||(leaders.length?"Several stories. Equal possibility. One new chapter.":"Family drama. Gift exchanges. Awkward parties.")}</p>
      </div>
    </div>
    <div style={{ display:"flex",position:"relative",alignItems:"center",justifyContent:"space-between",borderTop:"1px solid #b9cfe6",paddingTop:24,fontSize:landscape?18:24 }}><span>Find your story → parablepath.com/holidayedition</span><svg width="32" height="32" viewBox="0 0 40 40"><path d="m20 1 5 14 14 5-14 5-5 14-5-14L1 20l14-5Z" fill="#c8a451"/></svg></div>
  </div>,{ width,height,headers:{"Cache-Control":"public, max-age=3600",...(query.has("download")?{"Content-Disposition":`attachment; filename="parablepath-holiday-${story}-${format}.png"`}:{})} });
}
