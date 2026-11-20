import type { ReactNode } from "react";
import { holidayResults } from "@/lib/holiday/results";
import { holidayEngagement } from "@/lib/holiday/engagement";
import { holidayShareHooks, holidaySocialGifts } from "@/lib/holiday/share-copy";
import { holidayArtwork } from "@/lib/holiday/artwork";
import { holidayCardFormats, type HolidayCardFormat } from "@/lib/holiday/card-formats";
import type { Pattern } from "@/lib/holiday/scoring";
import artwork from "@/lib/holiday/card-artwork.json";

// Export-native HTML: existing official art, bundled fonts, no character imagery.
export function HolidaySocialCard({pattern,format,tentative,globe}:{pattern:Pattern;format:HolidayCardFormat;tentative:boolean;globe:ReactNode}) {
  const [width,height]=holidayCardFormats[format];
  const result=holidayResults[pattern], content=holidayEngagement[pattern], social=holidaySocialGifts[pattern];
  const wide=format==='landscape', tall=format==='story', portrait=format==='portrait';
  const accent=holidayArtwork[pattern].color;
  const titleSize=wide?46:tall?91:portrait?73:66;
  return <div style={{display:'flex',position:'relative',width,height,overflow:'hidden',fontFamily:'HolidaySans',color:'#132659',background:'linear-gradient(145deg,#eff8ff,#dde7f8 55%,#e8e2f7)',padding:wide?'28px 38px':tall?'48px 52px':'38px 42px',flexDirection:'column',justifyContent:'space-between',gap:wide?14:tall?28:22}}>
    <div style={{display:'flex',position:'absolute',left:-100,top:tall?180:110,width:tall?1000:680,height:tall?1000:680,borderRadius:'50%',background:`radial-gradient(circle,${accent}40,#ffffff00 68%)`}}/>
    <div style={{display:'flex',position:'absolute',right:-300,top:-250,width:900,height:900,border:'2px solid #ffffff90',borderRadius:'50%'}}/>
    {Array.from({length:34},(_,i)=><div key={i} style={{display:'flex',position:'absolute',left:(i*137+27)%width,top:(i*211+53)%height,width:i%5===0?6:3,height:i%5===0?6:3,borderRadius:'50%',background:i%4===0?'#d8b263':'#fff',opacity:.7}}/>)}
    <div style={{display:'flex',position:'relative',justifyContent:'space-between',alignItems:'center',flexShrink:0}}>
      <img src={artwork._brandLogo} width={wide?230:260} height={wide?62:70} alt="ParablePath"/>
      <div style={{display:'flex',fontSize:wide?13:17,letterSpacing:2,fontWeight:700,padding:'12px 18px',border:'1px solid #bbb9d6',borderRadius:40,background:'#ffffff90'}}>HOLIDAY EDITION</div>
    </div>
    <div style={{display:'flex',position:'relative',flexDirection:tall?'column':'row',alignItems:'center',gap:wide?24:tall?25:22,flexShrink:0}}>
      <div style={{display:'flex',flexShrink:0,position:'relative'}}>{globe}</div>
      <div style={{display:'flex',flexDirection:'column',...(tall?{width:'100%',flexShrink:0}:{flex:1}),alignItems:tall?'center':'flex-start',textAlign:tall?'center':'left',gap:wide?10:tall?20:16}}>
        <div style={{display:'flex',fontSize:wide?11:tall?20:15,letterSpacing:3,fontWeight:700,color:'#31587b'}}>{tentative?'A HOLIDAY STORY TO EXPLORE':'YOUR HOLIDAY STORY'}</div>
        <div style={{display:'flex',fontSize:titleSize,lineHeight:1.02,fontWeight:700,letterSpacing:-2}}>{result.name}</div>
        <div style={{display:'flex',fontSize:wide?25:tall?43:32,lineHeight:1.24,fontWeight:700,color:'#19345f'}}>{holidayShareHooks[pattern]}</div>
        <div style={{display:'flex',flexDirection:'column',alignItems:tall?'center':'flex-start',gap:6,padding:wide?'10px 14px':'14px 18px',borderRadius:18,background:'#ffffffa8',border:'1px solid #ffffff',boxShadow:'0 8px 20px #19345f0a'}}>
          <div style={{display:'flex',fontSize:wide?11:tall?18:13,letterSpacing:2,color:'#31587b',fontWeight:700}}>CHRISTMAS MOVIE ENERGY</div>
          <div style={{display:'flex',fontSize:wide?20:tall?35:25,lineHeight:1.2,fontWeight:700}}>{content.movie}</div>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:12,fontSize:wide?21:tall?34:26,fontWeight:700}}><div style={{display:'flex',width:7,height:28,borderRadius:4,background:accent}}/>ParablePath Calling: {result.calling}</div>
      </div>
    </div>
    <div style={{display:'flex',position:'relative',flexDirection:'column',gap:portrait?15:8,padding:wide?'14px 20px':tall?'26px 30px':'20px 24px',background:'#ffffff90',border:'1px solid #ffffff',borderLeft:`6px solid ${accent}`,borderRadius:22,flexShrink:0}}>
      <div style={{display:'flex',fontSize:wide?12:tall?19:15,letterSpacing:2,fontWeight:700,color:'#31587b'}}>YOUR HOLIDAY SUPERPOWER</div>
      <div style={{display:'flex',fontSize:wide?23:tall?38:29,lineHeight:1.25,fontWeight:700}}>{social.gift}</div>
      {portrait?<div style={{display:'flex',flexDirection:'column',gap:12,borderTop:'1px solid #bdcee2',paddingTop:14,fontSize:23,lineHeight:1.3}}><div style={{display:'flex'}}>{`Watch out: ${content.watch}`}</div><div style={{display:'flex'}}>{`Try this: ${content.tryThis}`}</div></div>:null}
    </div>
    <div style={{display:'flex',position:'relative',flexDirection:'column',gap:wide?7:12,padding:wide?'18px 24px':tall?'30px':'24px',borderRadius:24,color:'#fff',background:'linear-gradient(120deg,#102e62,#1c3f73)',boxShadow:'0 12px 25px #19345f25',flexShrink:0}}>
      <div style={{display:'flex',fontWeight:700,fontSize:wide?24:tall?40:32,letterSpacing:1}}>WHAT’S YOUR HOLIDAY STORY? →</div>
      <div style={{display:'flex',fontSize:wide?18:tall?30:25,color:'#ffe2a3'}}>ParablePath.com/HolidayEdition</div>
      {!wide?<div style={{display:'flex',fontSize:tall?23:18,lineHeight:1.25,color:'#e0eafa'}}>{social.prompt}</div>:null}
    </div>
  </div>;
}

export function HolidayWallpaper({pattern,tentative,globe}:{pattern:Pattern;tentative:boolean;globe:ReactNode}) {
  const result=holidayResults[pattern];
  return <div style={{display:'flex',position:'relative',width:1440,height:3120,overflow:'hidden',fontFamily:'HolidaySans',background:'linear-gradient(160deg,#eef7ff,#e0e5f8 60%,#f4f0e5)',color:'#132659',padding:'570px 110px 420px',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',gap:40}}>
    <div style={{display:'flex',position:'absolute',left:30,top:520,width:1380,height:1600,borderRadius:'50%',background:`radial-gradient(circle,${holidayArtwork[pattern].color}30,#ffffff00 70%)`}}/>
    <div style={{display:'flex',position:'relative',flexShrink:0}}>{globe}</div>
    <div style={{display:'flex',fontSize:23,letterSpacing:4,color:'#31587b'}}>{tentative?'A STORY TO EXPLORE':'YOUR HOLIDAY STORY'}</div>
    <div style={{display:'flex',fontSize:100,fontWeight:700,lineHeight:1.08}}>{result.name}</div>
    <div style={{display:'flex',fontSize:44,fontWeight:700}}>ParablePath Calling: {result.calling}</div>
    <div style={{display:'flex',flexDirection:'column',gap:20,padding:40,background:'#ffffffa0',border:'1px solid #ffffff',borderRadius:32}}><div style={{display:'flex',justifyContent:'center',fontSize:23,letterSpacing:4,color:'#31587b'}}>ONE SMALL PRACTICE</div><div style={{display:'flex',fontSize:43,lineHeight:1.4}}>{holidayEngagement[pattern].tryThis}</div></div>
    <img src={artwork._brandLogo} width={280} height={75} alt="ParablePath"/>
  </div>;
}
