import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
const require=createRequire(import.meta.url);
const sharp=createRequire(require.resolve('next/package.json'))('sharp');
test('all eight premium globes preserve official sources and provide transparent optimized assets',async()=>{
  const root=new URL('../public/holiday/',import.meta.url);
  const entries=JSON.parse(await readFile(new URL('globes/provenance.json',root),'utf8'));
  assert.equal(entries.length,8);
  assert.equal(new Set(entries.map(x=>x.id)).size,8);
  for(const entry of entries){
    const original=await readFile(new URL(`artwork/${entry.id}.webp`,root));
    assert.equal(createHash('sha256').update(original).digest('hex'),entry.officialSourceSha256);
    for(const [ext,size] of [['webp',512],['png',768]]){
      const bytes=await readFile(new URL(`globes/${entry.id}.${ext}`,root));
      const meta=await sharp(bytes).metadata();
      assert.equal(meta.width,size);assert.equal(meta.height,size);assert.ok(meta.hasAlpha);
      const corner=await sharp(bytes).extract({left:0,top:0,width:1,height:1}).ensureAlpha().raw().toBuffer();
      assert.equal(corner[3],0);
      assert.equal(createHash('sha256').update(bytes).digest('hex'),entry[`${ext}Sha256`]);
      if(ext==='webp')assert.ok(bytes.length<65000);
    }
  }
});
