import { formationStoryInvitation, type FormationTypologyProfile } from "@/lib/parablepath/popular/results";

export function FormationTypologyResultCard({ profile }: { profile: FormationTypologyProfile }) {
  const cardUrl = `/api/formation-card/${profile.id}`;
  const alt = `ParablePath ${profile.storyName} Story formation card. You may be living in the ${profile.storyName} Story. You are invited to become a ${profile.callingName}.`;
  return <div className="typology-result-shell experience-popular">
    <div className="typology-result-page">
      <p className="sr-only" role="status" aria-live="polite">Your result is the {profile.storyName} Story, with an invitation to become a {profile.callingName}.</p>
      <img className="formation-card-image" src={cardUrl} alt={alt} width={1122} height={1402}/>
      <details className="formation-card-transcript">
        <summary>Read the full card as text</summary>
        <div>
          <h1>You may be living in the {profile.storyName} Story.</h1>
          <h2>You are invited to become a {profile.callingName}.</h2>
          <h3>Your Redemptive Calling</h3><p>{profile.callingDescription}</p>
          <h3>False Story</h3><p>“{profile.falseStory}”</p>
          <h3>Shadow Side: {profile.shadowName}</h3><p>{profile.shadowDescription}</p>
          <h3>Ways to live into your true story</h3><ol>{profile.practices.map((item) => <li key={item}>{item}</li>)}</ol>
          <h3>Read the parable</h3><p><strong>STORY Invitation:</strong> {formationStoryInvitation}</p><p><strong>Parable references:</strong> {profile.parableReferences}</p>
          <h3>Next Steps</h3><ol>{profile.nextSteps.map((item) => <li key={item}>{item}</li>)}</ol>
        </div>
      </details>
    </div>
  </div>;
}
