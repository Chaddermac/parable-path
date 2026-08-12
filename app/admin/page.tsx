import { ADMIN_COOKIE, adminIsConfigured, sessionMatches } from "@/lib/admin-auth";
import { rooms } from "@/lib/content";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

const feedbackMetrics = [
  ["accuracy_score", "Result accuracy"],
  ["parable_helpfulness_score", "Parable helpfulness"],
  ["repentance_reframing_score", "Repentance reframing"],
  ["next_step_usefulness_score", "Next-step usefulness"],
  ["tone_score", "Invitational tone"]
] as const;

type RecentResponse = { created_at: string; primary_room: string; secondary_room: string; third_room: string; safety_flag: boolean };
type FeedbackRow = Record<(typeof feedbackMetrics)[number][0], number>;

function Login({ error }: { error: boolean }) {
  return <main className="shell py-16 sm:py-24"><form action="/api/admin/login" method="post" className="panel mx-auto max-w-md p-7 sm:p-10"><p className="eyebrow">Protected area</p><h1 className="mt-4 font-serif text-4xl">ParablePath admin</h1><p className="mt-4 text-sm leading-6 text-ink/60">Enter the administrator password to view anonymous aggregate data.</p>{error && <p className="mt-5 rounded-lg bg-clay/10 p-3 text-sm text-clay">The password was not accepted.</p>}<label className="mt-7 block text-sm font-semibold">Admin password<input type="password" name="password" required autoComplete="current-password" className="mt-2 w-full rounded-xl border border-ink/15 bg-transparent p-3 outline-none focus:border-forest" /></label><button className="button-primary mt-7 w-full" type="submit">Open dashboard</button></form></main>;
}

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const cookieStore = await cookies();
  const authenticated = sessionMatches(cookieStore.get(ADMIN_COOKIE)?.value);
  if (!authenticated) return <Login error={(await searchParams).error === "1"} />;

  let total = 0;
  let primaryRooms: { primary_room: string }[] = [];
  let recent: RecentResponse[] = [];
  let feedback: FeedbackRow[] = [];
  let loadError = "";
  try {
    const supabase = createServerSupabaseClient();
    const [countResult, roomResult, recentResult, feedbackResult] = await Promise.all([
      supabase.from("responses").select("*", { count: "exact", head: true }),
      supabase.from("responses").select("primary_room"),
      supabase.from("responses").select("created_at,primary_room,secondary_room,third_room,safety_flag").order("created_at", { ascending: false }).limit(20),
      supabase.from("feedback").select("accuracy_score,parable_helpfulness_score,repentance_reframing_score,next_step_usefulness_score,tone_score")
    ]);
    const firstError = countResult.error || roomResult.error || recentResult.error || feedbackResult.error;
    if (firstError) throw firstError;
    total = countResult.count || 0;
    primaryRooms = roomResult.data || [];
    recent = recentResult.data || [];
    feedback = feedbackResult.data || [];
  } catch (error) {
    console.error("Unable to load admin dashboard", error);
    loadError = adminIsConfigured() ? "Dashboard data is temporarily unavailable. Check the Supabase configuration and migrations." : "ADMIN_PASSWORD must contain at least 12 characters.";
  }

  const distribution = rooms.map((room) => ({ ...room, count: primaryRooms.filter((item) => item.primary_room === room.id).length }));
  const maximum = Math.max(1, ...distribution.map((item) => item.count));
  const averages = feedbackMetrics.map(([field, label]) => ({ field, label, average: feedback.length ? feedback.reduce((sum, row) => sum + Number(row[field] || 0), 0) / feedback.length : null }));

  return <main className="shell py-10 sm:py-16">
    <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><p className="eyebrow">Anonymous study overview</p><h1 className="mt-3 font-serif text-5xl sm:text-6xl">ParablePath admin</h1></div><div className="flex gap-3"><a className="button-primary" href="/api/admin/export">Export CSV</a><form action="/api/admin/logout" method="post"><button className="button-secondary" type="submit">Sign out</button></form></div></div>
    {loadError && <p className="mt-8 rounded-xl border border-clay/20 bg-clay/10 p-4 text-sm text-clay">{loadError}</p>}
    <section className="mt-10 grid gap-5 lg:grid-cols-3"><article className="panel p-7"><p className="eyebrow">Total responses</p><p className="mt-5 font-serif text-6xl text-forest">{total}</p><p className="mt-2 text-sm text-ink/50">Anonymous completed assessments</p></article><article className="panel p-7 lg:col-span-2"><p className="eyebrow">Average feedback</p><div className="mt-5 grid gap-4 sm:grid-cols-2">{averages.map((metric) => <div key={metric.field} className="flex items-end justify-between border-b border-ink/10 pb-3"><span className="text-sm text-ink/65">{metric.label}</span><strong className="font-serif text-2xl">{metric.average === null ? "—" : metric.average.toFixed(1)}</strong></div>)}</div></article></section>
    <section className="panel mt-6 p-7"><p className="eyebrow">Room distribution</p><div className="mt-7 grid gap-4 sm:grid-cols-2">{distribution.map((room) => <div key={room.id}><div className="flex justify-between text-sm"><span>{room.name}</span><span className="text-ink/50">{room.count}</span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-ink/10"><div className="h-full rounded-full bg-clay" style={{ width: `${(room.count / maximum) * 100}%` }} /></div></div>)}</div></section>
    <section className="panel mt-6 overflow-hidden"><div className="p-7"><p className="eyebrow">Recent responses</p><p className="mt-3 text-sm text-ink/55">No names, email, open reflections, answers, or generated prose are displayed.</p></div><div className="overflow-x-auto"><table className="w-full min-w-[680px] border-collapse text-left text-sm"><thead className="bg-cream text-xs uppercase tracking-wider text-ink/50"><tr><th className="p-4 pl-7">Date</th><th className="p-4">Primary</th><th className="p-4">Secondary</th><th className="p-4">Third</th><th className="p-4 pr-7">Safety redirect</th></tr></thead><tbody>{recent.length ? recent.map((item, index) => <tr key={`${item.created_at}-${index}`} className="border-t border-ink/10"><td className="p-4 pl-7 text-ink/55">{new Date(item.created_at).toLocaleString()}</td><td className="p-4 font-semibold capitalize">{item.primary_room}</td><td className="p-4 capitalize">{item.secondary_room}</td><td className="p-4 capitalize">{item.third_room}</td><td className="p-4 pr-7">{item.safety_flag ? "Yes" : "No"}</td></tr>) : <tr><td colSpan={5} className="p-8 text-center text-ink/50">No responses yet.</td></tr>}</tbody></table></div></section>
  </main>;
}
