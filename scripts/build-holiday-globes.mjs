// Usage: node scripts/build-holiday-globes.mjs /absolute/path/to/approved-shells
// Decorative shells are generated separately. Typology glyphs come only from the
// unchanged official artwork files, not from an image model or traced substitutes.
import { createRequire } from 'node:module';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { join, resolve } from 'node:path';
const require=createRequire(import.meta.url);
const sharp=createRequire(require.resolve('next/package.json'))('sharp');
const source=process.argv[2];
if(!source)throw Error('Pass the approved decorative-shell directory. Originals are never overwritten.');
const root=resolve(import.meta.dirname,'..');
const output=join(root,'public/holiday/globes');
await mkdir(output,{recursive:true});
const ids=['table-maker','bridger','healer','mentor','innovator','multiplier','waymaker','awakener'];
const sha=buffer=>createHash('sha256').update(buffer).digest('hex');
const provenance=[];
for(const id of ids){
  const shell=await readFile(join(source,`${id}.png`));
  const official=await readFile(join(root,`public/holiday/artwork/${id}.webp`));
  const {data,info}=await sharp(official).ensureAlpha().raw().toBuffer({resolveWithObject:true});
  const mask=Buffer.from(data);
  for(let y=0;y<info.height;y++)for(let x=0;x<info.width;x++){
    const i=(y*info.width+x)*4;
    // Non-destructive foreground isolation: retain original luminous symbol RGB
    // and antialiasing; discard only the colored medallion/background pixels.
    const white=Math.min(data[i],data[i+1],data[i+2]);
    const inside=Math.hypot(x-info.width/2,y-info.height/2)<info.width*.46;
    mask[i+3]=inside?Math.round(data[i+3]*Math.max(0,Math.min(1,(white-190)/45))):0;
  }
  const glyph=await sharp(mask,{raw:info}).trim({threshold:2}).resize({width:480,height:410,fit:'inside'}).png().toBuffer();
  const glyphMeta=await sharp(glyph).metadata();
  const left=Math.round(512-glyphMeta.width/2),top=Math.round(420-glyphMeta.height/2);
  const shellNormalized=await sharp(shell).resize(1024,1024,{fit:'contain',background:'#00000000'}).png().toBuffer();
  // Consistent inset satin-gold medallion and eight-point brand compass star.
  const cx=512,cy=850;
  const points=Array.from({length:16},(_,i)=>{
    const angle=-Math.PI/2+i*Math.PI/8;
    const radius=i%2?8:(i%4===0?29:21);
    return `${cx+Math.cos(angle)*radius},${cy+Math.sin(angle)*radius}`;
  }).join(' ');
  const seal=Buffer.from(`<svg width="1024" height="1024" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="gold"><stop stop-color="#c99641"/><stop offset=".45" stop-color="#efd194"/><stop offset="1" stop-color="#bd8733"/></linearGradient></defs><ellipse cx="${cx}" cy="${cy}" rx="91" ry="56" fill="url(#gold)" stroke="#f7db98" stroke-width="2"/><polygon points="${points}" fill="#9e6b20" stroke="#ffe7ad" stroke-width="1.5"/></svg>`);
  const finished=await sharp(shellNormalized).composite([{input:glyph,left,top},{input:seal}]).png().toBuffer();
  const exportFile=await sharp(finished).resize(768,768).png({compressionLevel:9}).toBuffer();
  const webFile=await sharp(finished).resize(512,512).webp({quality:90,alphaQuality:95}).toBuffer();
  await writeFile(join(output,`${id}.png`),exportFile);
  await writeFile(join(output,`${id}.webp`),webFile);
  provenance.push({id,shellSha256:sha(shell),officialSourceSha256:sha(official),pngSha256:sha(exportFile),webpSha256:sha(webFile),exportSize:768,webSize:512,webBytes:webFile.length,exportBytes:exportFile.length,method:'Generated decorative scene + mechanically isolated original white glyph + shared eight-point base seal. Original artwork unchanged.',glyph:{left,top,width:glyphMeta.width,height:glyphMeta.height},seal:{cx,cy}});
  console.info(id,`web ${Math.round(webFile.length/1024)}KB; export ${Math.round(exportFile.length/1024)}KB`);
}
await writeFile(join(output,'provenance.json'),JSON.stringify(provenance,null,2)+'\n');
