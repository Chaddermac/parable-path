import { holidayResults } from "@/lib/holiday/results";
import { holidayArtwork } from "@/lib/holiday/artwork";
import { holidayShareHooks } from "@/lib/holiday/share-copy";
import artwork from "@/lib/holiday/card-artwork.json";
import type { Pattern } from "@/lib/holiday/scoring";

import { holidayCardFormats, type HolidayCardFormat } from "@/lib/holiday/card-formats";
function Star({ size=40 }: { size?:number }) {
  return <svg width={size} height={size} viewBox="0 0 100 100"><path d="M50 0 59 39 100 50 59 61 50 100 41 61 0 50 41 39Z" fill="#f2cf83"/></svg>;
}
function Pine({ size=240, tint="#426f80" }: { size?:number; tint?:string }) {
  return <svg width={size} height={size*1.5} viewBox="0 0 160 240"><path d="M76 180h8v60h-8z" fill="#bbaf8d"/><path d="m80 0-44 76h22L20 143h30L0 218h160l-50-75h30l-38-67h22Z" fill={tint}/><path d="m80 0-44 76 22-5 22-19 22 19 22 5Zm0 78-60 65 30-9 30-20 30 20 30 9Zm0 65L0 218l42-10 38-27 38 27 42 10Z" fill="#e2f0fa"/><g fill="#f4cf83"><circle cx="54" cy="107" r="4"/><circle cx="102" cy="142" r="4"/><circle cx="38" cy="188" r="4"/><circle cx="85" cy="201" r="4"/><circle cx="112" cy="191" r="4"/></g></svg>;
}
function Globe({ pattern,size }: { pattern?:Pattern; size:number }) {
  const art=pattern?holidayArtwork[pattern]:null;
  const src=art?artwork[art.id as keyof typeof artwork]:null;
  return <div style={{display:"flex",position:"relative",width:size,height:size*1.13,flexShrink:0}}>
    <div style={{display:"flex",position:"absolute",left:size*.03,top:0,width:size*.94,height:size*.94,borderRadius:"50%",border:"3px solid #e9f5ff",background:"radial-gradient(circle at 30% 18%,#e9f7ff,#9ebbd4)",boxShadow:"inset -14px -14px 28px #436a9380,0 0 45px #b2d7ee35",alignItems:"center",justifyContent:"center",overflow:"hidden"}}>
      {src?<img src={src} width={size*.72} height={size*.72} style={{borderRadius:"50%",marginTop:-size*.03}}/>:<Star size={size*.55}/>}
      <div style={{display:"flex",position:"absolute",bottom:-size*.05,left:-10,width:size,height:size*.19,borderRadius:"50%",background:"#f1f8ff"}}/>
      <div style={{display:"flex",position:"absolute",left:size*.13,top:size*.11,width:size*.14,height:size*.27,borderLeft:"6px solid #ffffffb0",borderRadius:"50%",transform:"rotate(30deg)"}}/>
      {[.13,.3,.79,.83,.18,.73].map((v,i)=><div key={i} style={{display:"flex",position:"absolute",width:5,height:5,borderRadius:"50%",background:"#fff",left:size*v,top:size*[.3,.13,.18,.44,.65,.73][i]}}/>)}
    </div>
    <div style={{display:"flex",position:"absolute",bottom:size*.015,left:size*.13,width:size*.74,height:size*.19,borderRadius:"6px 6px 22px 22px",border:"2px solid #f3d597",background:"linear-gradient(110deg,#b58a44,#f4d69c 48%,#bb914f)",alignItems:"center",justifyContent:"center"}}><Star size={size*.08}/></div>
  </div>;
}
export function HolidayShareCard({ leaders, format, tentative }: { leaders:Pattern[]; format:HolidayCardFormat; tentative:boolean }) {
  const [width,height]=holidayCardFormats[format];
  const landscape=format==='landscape', wallpaper=format==='wallpaper', square=format==='square';
  const single=leaders.length===1?holidayResults[leaders[0]]:null;
  const title=single?single.name:leaders.length?'More than one holiday story.':'What’s Your Holiday Story?';
  const globeSize=landscape?248:wallpaper?510:square?200:format==='portrait'?270:385;
  const titleSize=landscape?48:wallpaper?102:square?59:format==='portrait'?65:86;
  const bodySize=landscape?21:wallpaper?42:square?32:format==='portrait'?30:36;
  const gap=landscape?10:wallpaper?24:square?10:18;
  const compactTies=leaders.length>4&&!wallpaper;
  return <div style={{display:"flex",position:"relative",width:"100%",height:"100%",overflow:"hidden",fontFamily:"HolidaySans",color:"#132659",background:"linear-gradient(145deg,#edf5ff,#e3e7fb 65%,#dcecf7)",padding:wallpaper?'520px 100px 200px':landscape?'30px 46px':square?'30px 46px':'52px 60px',flexDirection:"column"}}>
    {Array.from({length:48},(_,i)=><div key={i} style={{display:"flex",position:"absolute",left:(i*137+27)%width,top:(i*211+53)%height,width:i%5===0?5:3,height:i%5===0?5:3,borderRadius:"50%",background:i%4===0?'#f1d599':'#ffffff',opacity:i%3===0?.9:.5}}/>)}
    <div style={{display:"flex",position:"absolute",right:width*.055,top:wallpaper?180:100,opacity:.9}}><Star size={wallpaper?92:55}/></div>
    <div style={{display:"flex",position:"absolute",left:-30,bottom:-35,opacity:.55}}><Pine size={landscape?160:wallpaper?430:square?160:format==='portrait'?190:290}/></div>
    <div style={{display:"flex",position:"absolute",right:-35,bottom:-45,opacity:.7}}><Pine size={landscape?210:wallpaper?470:square?190:format==='portrait'?220:340} tint="#315f72"/></div>
    <div style={{display:"flex",position:"absolute",bottom:-height*.03,left:-width*.08,width:width*1.2,height:height*.05,borderRadius:"50%",background:"#f9fbff"}}/>
    <div style={{display:"flex",position:"relative",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
      <div style={{display:"flex",background:"#ffffffb3",padding:landscape?'8px 14px':'10px 18px',borderRadius:50}}><img src={artwork._brandLogo} width={landscape?182:wallpaper?320:250} height={landscape?49:wallpaper?85:67} alt="ParablePath"/></div>
      <div style={{display:"flex",alignItems:"center",gap:10,fontSize:wallpaper?26:landscape?13:19,letterSpacing:3,color:"#19345f",background:"#e6dfff",border:"1px solid #bcb6de",padding:'10px 16px',borderRadius:30}}>HOLIDAY EDITION</div>
    </div>
    <div style={{display:"flex",position:"relative",flex:1,flexDirection:landscape?'row-reverse':'column',alignItems:"center",justifyContent:"center",gap:landscape?30:gap,padding:landscape||square?'10px 0':'18px 0'}}>
      {leaders.length<=1?<Globe pattern={leaders[0]} size={globeSize}/>:null}
      <div style={{display:"flex",flexDirection:"column",alignItems:landscape?'flex-start':'center',textAlign:landscape?'left':'center',...(landscape?{flex:1}:{width:'100%'}),gap}}>
        <div style={{display:"flex",fontSize:landscape?12:wallpaper?25:17,letterSpacing:3,color:"#326f75"}}>{tentative?'A HOLIDAY STORY TO EXPLORE':leaders.length>1?'EQUALLY PLAUSIBLE STORIES':single?'MY HOLIDAY STORY':'A LITTLE CHRISTMAS CURIOSITY'}</div>
        <div style={{display:"flex",fontSize:leaders.length>1?titleSize*.8:titleSize,fontWeight:700,lineHeight:1.05,letterSpacing:-1.7}}>{title}</div>
        {single?<div style={{display:"flex",fontSize:bodySize*.82,color:"#326f75"}}>The {single.calling} calling</div>:null}
        {leaders.length>1?<div style={{display:"flex",flexWrap:'wrap',justifyContent:'center',width:'100%',gap:landscape?10:18}}>{leaders.map(p=><div key={p} style={{display:'flex',flexDirection:'column',alignItems:'center',width:landscape||compactTies?'22%':'44%',gap:6}}><img src={artwork[holidayArtwork[p].id as keyof typeof artwork]} width={landscape?48:wallpaper?110:compactTies?66:78} height={landscape?48:wallpaper?110:compactTies?66:78} style={{borderRadius:'50%',border:'2px solid #ffffff99'}}/><div style={{display:'flex',fontSize:landscape?13:wallpaper?29:compactTies?16:20,lineHeight:1.15}}>{holidayResults[p].name}</div></div>)}</div>:null}
        <div style={{display:"flex",fontSize:bodySize,lineHeight:1.28,color:"#334d73",maxWidth:wallpaper?1120:930}}>{single?holidayShareHooks[leaders[0]]:leaders.length?'Several stories. Equal possibility. Explore the threads that feel like you.':'Family gatherings. Gift exchanges. Awkward conversations. Which holiday story sounds like you?'}</div>
        {single?<div style={{display:"flex",flexDirection:'column',width:'100%',border:'1px solid #b8cce3',borderRadius:20,padding:landscape?'11px 15px':wallpaper?'25px 30px':'16px 22px',background:'#ffffff85',gap:landscape?6:10}}>
          <div style={{display:'flex',fontSize:bodySize*.56,letterSpacing:2,color:'#326f75'}}>THE GIFT YOU BRING</div>
          <div style={{display:'flex',fontSize:bodySize*.94,lineHeight:1.25,color:'#19345f'}}>{single.line}</div>
          {!landscape?<div style={{display:'flex',fontSize:bodySize*.56,letterSpacing:2,color:'#326f75',marginTop:6}}>YOUR HOLIDAY CHALLENGE</div>:null}
          <div style={{display:'flex',fontSize:square?bodySize:bodySize*.88,lineHeight:1.28,color:'#334d73'}}>{single.challenge}</div>
        </div>:null}
      </div>
    </div>
    <div style={{display:'flex',position:'relative',flexShrink:0,flexDirection:landscape?'row':'column',alignItems:'center',justifyContent:'space-between',gap:landscape?20:12,padding:landscape?'10px 0':'14px 0 0'}}>
      <div style={{display:'flex',color:'#172b4e',background:'linear-gradient(120deg,#ffe6a4,#f3c768)',borderRadius:40,padding:landscape?'12px 22px':'15px 28px',fontWeight:700,fontSize:landscape?20:wallpaper?35:28}}>What’s your holiday story? →</div>
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:4}}><div style={{display:'flex',fontSize:landscape?18:wallpaper?32:square?28:24,color:'#19345f'}}>parablepath.com/holidayedition</div><div style={{display:'flex',fontSize:landscape?12:wallpaper?22:16,color:'#506782'}}>16 questions · 3–4 minutes · Share a little Christmas curiosity</div></div>
    </div>
  </div>;
}
