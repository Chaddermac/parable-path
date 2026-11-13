export const holidayCardFormats = { landscape:[1200,630], square:[1080,1080], portrait:[1080,1350], story:[1080,1920], wallpaper:[1440,3120] } as const;
export type HolidayCardFormat = keyof typeof holidayCardFormats;
// Version image URLs so previously cached social graphics are replaced after redesigns.
export function holidayCardPath(story:string, options:{format?:HolidayCardFormat; tentative?:boolean; download?:boolean}={}) {
  const query=new URLSearchParams({v:'winter-5'});
  if(options.format)query.set('format',options.format);
  if(options.tentative)query.set('tentative','1');
  if(options.download)query.set('download','1');
  return `/api/holiday/card/${story}?${query.toString()}`;
}
