import { holidayArtwork, showcaseOrder } from "@/lib/holiday/artwork";
import { holidayResults } from "@/lib/holiday/results";
import { TypologyGlobe, WinterStar } from "./WinterArtwork";
export function HolidayTypes() {
  return <section id="holiday-types" className="winter-types"><div className="reference-section-heading"><span/><WinterStar/><h2>Explore the 8 Holiday Story Types</h2><WinterStar/><span/></div><p className="winter-section-intro">The same ParablePath callings, with a seasonal lens for Christmas.</p><div className="winter-types-grid">{showcaseOrder.map(pattern => <details className="winter-type" key={pattern}><summary><TypologyGlobe pattern={pattern}/><h3>{holidayArtwork[pattern].calling}</h3><p>{holidayResults[pattern].name}</p><span className="winter-type-more">A little peek <span aria-hidden="true">+</span></span></summary><p className="winter-type-preview">{holidayResults[pattern].line}</p></details>)}</div></section>;
}
