import { type FormationTypologyProfile } from "@/lib/parablepath/popular/results";
import { StoryProfileCard } from "@/components/website/StoryProfileCard";

export function FormationTypologyResultCard({ profile }: { profile: FormationTypologyProfile }) {
  return <div className="website-result-card"><StoryProfileCard profile={profile} result /></div>;
}
