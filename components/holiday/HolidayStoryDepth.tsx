import { holidayStoryBridge } from "@/lib/holiday/engagement";
import { formationResultByRoom } from "@/lib/parablepath/popular/results";
import type { Pattern } from "@/lib/holiday/scoring";
import { HolidaySeen, HolidayAppCTA, HolidayParableLink } from "./HolidayEngagement";

export function HolidayStoryDepth({ story }: { story: Pattern }) {
  const content = holidayStoryBridge(story);
  return <>
    <HolidaySeen event="survival_guide_view" story={story} className="holiday-survival"><section aria-labelledby={`survival-${story}`}><p className="holiday-eyebrow">A little help for the real-life version</p><h3 id={`survival-${story}`}>Your Holiday Survival Guide</h3><dl><div><dt>Watch Out For</dt><dd>{content.watch}</dd></div><div><dt>Lean Into</dt><dd>{content.lean}</dd></div><div><dt>Try This</dt><dd>{content.tryThis}</dd></div></dl></section></HolidaySeen>
    <HolidaySeen event="movie_match_view" story={story} className="holiday-movie"><section><p className="holiday-eyebrow">Your Christmas Movie Energy</p><h3>{content.movie}</h3><p>{content.movieCopy}</p><p className="holiday-fine">A playful illustration—not your identity, a new type, or a connection to the film’s creators.</p></section></HolidaySeen>
    <section className="holiday-story-bridge"><h3>The Story Beneath the Season</h3><dl><div><dt>Holiday version</dt><dd>{content.holidayVersion}</dd></div><div><dt>The deeper story</dt><dd>“{content.falseStory}”</dd></div><div><dt>The invitation</dt><dd>{content.invitation}</dd></div></dl><p><strong>This probably doesn’t only happen at Christmas.</strong></p></section>
    <details className="holiday-deeper"><summary>Want to Go Deeper?</summary><p>Jesus often told stories that disrupted the stories people had learned to live inside.</p><p>{content.parableQuestion}</p><p className="holiday-fine">{formationResultByRoom[story].parableReferences}</p><HolidayParableLink story={story}/><p><HolidayAppCTA story={story} placement="parable"/></p></details>
    <details className="holiday-five-day"><summary>Try a 5-Day Holiday Story Challenge</summary><HolidaySeen event="holiday_challenge_view" story={story}><p>Five small experiments. No account, streak, or perfect Christmas required.</p><ol>{content.days.map((day, index) => <li key={day}><strong>Day {index + 1}</strong><span>{day}</span></li>)}</ol><HolidayAppCTA story={story} placement="challenge"/></HolidaySeen></details>
  </>;
}
