import type { MetadataRoute } from "next";
import { storyLinks } from "@/lib/website";
export default function sitemap():MetadataRoute.Sitemap{return ["", "/how-it-works", "/story-types", "/parables", "/about", "/privacy", "/terms", "/contact", ...storyLinks.flatMap(({slug})=>[`/story-types/${slug}`,`/parables/${slug}`])].map(path=>({url:`https://www.parablepath.com${path}`,changeFrequency:"monthly" as const}));}
