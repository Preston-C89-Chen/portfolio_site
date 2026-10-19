import type { Metadata } from 'next';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { Footer } from '../../components/ui/Footer';
import fleet from '@public/projects/robotics-telemetry/fleet.jpg';
import teleops from '@public/projects/robotics-telemetry/teleops.jpg';
import sessions from '@public/projects/robotics-telemetry/sessions.jpg';
import replay from '@public/projects/robotics-telemetry/replay.jpg';
import comparison from '@public/projects/robotics-telemetry/comparison.jpg';
import reports from '@public/projects/robotics-telemetry/reports.jpg';

export const metadata: Metadata = {
  title: 'Robotics Telemetry Dashboard | Preston Chen',
  description: 'A case study in geospatial fleet monitoring, Franka workcell inspection, and session QA, with synthetic telemetry and resilient integration boundaries.',
};

function Capture({ src, alt, caption, priority = false }: { src: StaticImageData; alt: string; caption: string; priority?: boolean }) {
  return (
    <figure className="min-w-0">
      <div className="border border-black/15 bg-[#FAFAF7] p-2 md:p-4">
        <Image src={src} alt={alt} priority={priority} sizes="(max-width: 768px) 100vw, 1200px" className="h-auto w-full" />
      </div>
      <figcaption className="mt-3 max-w-3xl font-mono text-xs leading-relaxed text-black/60">{caption}</figcaption>
    </figure>
  );
}

const decisions = [
  ['One model, multiple views', 'Domain-specific adapters feed a shared telemetry contract. Fleet and replay share one original procedural robotaxi mesh; instanced Three.js geometry uses MapLibre’s camera. Enlarged map symbols communicate state rather than physical footprints.'],
  ['Fresh data before live controls', 'Socket connectivity alone does not mean telemetry is live. Valid messages establish live state; the default three-second freshness timeout clears stale entities and camera state, disables commands, and triggers reconnection.'],
  ['Preserve the last good session', 'Historical records use an atomic browser-local snapshot. Failed saves preserve the prior snapshot and surface an actionable error; complete legacy records can migrate. This is local persistence, not a shared session backend.'],
  ['Load workspaces as needed', 'Map and 3D workspaces load on demand. This separates heavy graphics dependencies from the shell, although the default fleet view still loads map libraries and graphics bundle advisories remain.'],
];

export default function RoboticsTelemetryCaseStudy() {
  return (
    <>
      <main className="bg-white text-black">
        <div className="mx-auto max-w-[1400px] px-6 md:px-16 lg:px-24">
          <nav aria-label="Case study navigation" className="flex flex-wrap items-center justify-between gap-4 border-b border-black/15 py-8 font-mono text-xs uppercase tracking-wider">
            <Link href="/" className="hover:underline">Preston Chen</Link>
            <Link href="/#projects" className="hover:underline">← All projects</Link>
          </nav>
          <header className="py-16 md:py-24">
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-black/60">Case study / Robotics & integration engineering</p>
            <h1 className="max-w-5xl text-[clamp(2.5rem,6vw,5.5rem)] font-bold leading-[0.98] tracking-tight">Robotics telemetry.<br />From fleet to failure.</h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-black/70">A browser-based console that connects geospatial fleet monitoring, a 3D Franka workcell, and session investigation in three focused workspaces.</p>
            <div className="mt-8 flex flex-wrap gap-3 font-mono text-xs uppercase tracking-wider">
              {['Desktop portfolio prototype', 'Synthetic scenarios', 'React + TypeScript + Vite'].map(label => <span key={label} className="border border-black/20 px-3 py-2">{label}</span>)}
            </div>
          </header>
          <Capture src={fleet} priority alt="Fleet workspace with 3D robotaxis on a Mountain View street map, selected route, ROS topic rates, and fleet health" caption="Fleet workspace: real geographic context with synthetic vehicle motion, health, and alerts. The original robotaxi model is Waymo-inspired, not an official Waymo asset or data source." />
          <section className="grid gap-10 border-b border-black/15 py-16 md:grid-cols-2 md:py-24" aria-labelledby="problem">
            <div><h2 id="problem" className="text-3xl font-bold tracking-tight">The problem</h2><p className="mt-5 leading-relaxed text-black/70">Robot state is spread across maps, joint readouts, events, and run histories. An operator needs to see which entity needs attention, inspect its state, and determine whether a run regressed without losing context between tools.</p></div>
            <div><h2 className="text-3xl font-bold tracking-tight">The approach</h2><p className="mt-5 leading-relaxed text-black/70">Organize the console around three levels of investigation: Fleet, Teleops, and Sessions. Shared selection and telemetry contracts connect overview to inspection, while explicit source and freshness states keep generated examples distinct from live integrations.</p></div>
          </section>
          <section className="py-16 md:py-24" aria-labelledby="workspaces">
            <h2 id="workspaces" className="mb-12 text-4xl font-bold tracking-tight">Three workspaces. One investigation.</h2>
            <div className="space-y-16">
              <article><p className="font-mono text-xs uppercase tracking-widest text-black/50">01 / Fleet</p><h3 className="mt-3 text-2xl font-bold">Locate the issue in context.</h3><p className="mt-4 max-w-3xl leading-relaxed text-black/70">Eighteen simulated vehicles move across Mountain View routes. Selecting a robotaxi connects its 3D map model, highlighted route, fleet card, and simulated ROS topic health. Ground rings communicate selection and operating state; battery, topic rates, and alerts guide inspection.</p></article>
              <article><p className="font-mono text-xs uppercase tracking-widest text-black/50">02 / Teleops</p><h3 className="mt-3 text-2xl font-bold">Inspect the Franka Cell.</h3><p className="mb-8 mt-4 max-w-3xl leading-relaxed text-black/70">The redesigned workcell places a licensed seven-axis Panda model on a studio-lit stage, with task, source, tracking, and thermal summaries. A tabbed Joints / Control / Vision / Events inspector separates joint ranges and temperatures from operator actions. Camera presets and free orbit support inspection.</p><Capture src={teleops} alt="Franka Panda workcell on a studio-lit stage with joint telemetry bars and a tabbed inspector" caption="Synthetic Franka fallback. The optional Webots-compatible WebSocket adapter supports telemetry, commands, and camera frames; live controls stay unavailable without valid fresh telemetry." /></article>
              <article><p className="font-mono text-xs uppercase tracking-widest text-black/50">03 / Sessions</p><h3 className="mt-3 text-2xl font-bold">Trace the event. Compare the run.</h3><p className="mb-8 mt-4 max-w-3xl leading-relaxed text-black/70">Ten seeded synthetic sessions span fleet and manipulation scenarios. Browse by scenario, build, severity, and outcome; inspect events; seek through generated replay; compare same-domain runs; and review domain-filtered reports.</p><div className="space-y-10"><Capture src={sessions} alt="Session browser listing scenarios, builds, durations, alerts, and pass or warning outcomes" caption="Session browser: seeded records exercise investigation workflows, rather than document physical-robot trials." /><Capture src={replay} alt="Generated 3D AV replay with synchronized events, a timeline, and playback controls" caption="Replay: shared robotaxi geometry, generated scene geometry, and synthetic LiDAR points. This is not a reconstruction of a recorded drive." /><Capture src={comparison} alt="Session comparison showing differences in task success, tracking error, and warnings between runs" caption="Comparison: baseline-relative changes make potential regressions visible, including explicit handling of zero baselines." /><Capture src={reports} alt="Teleops reports with task success, tracking error, tick rate, and alert trends" caption="Reports: success rates, errors, and temperatures are generated interface examples, not measured robot outcomes." /></div></article>
            </div>
          </section>
        </div>
        <section className="bg-black py-16 text-white md:py-24" aria-labelledby="engineering">
          <div className="mx-auto max-w-[1400px] px-6 md:px-16 lg:px-24"><h2 id="engineering" className="mb-12 text-4xl font-bold tracking-tight">Engineering for failure states.</h2><div className="grid gap-10 md:grid-cols-2">{decisions.map(([title, text]) => <article key={title} className="border-t border-white/30 pt-6"><h3 className="text-xl font-bold">{title}</h3><p className="mt-4 leading-relaxed text-white/70">{text}</p></article>)}</div></div>
        </section>
        <div className="mx-auto max-w-[1400px] px-6 md:px-16 lg:px-24">
          <section className="grid gap-12 py-16 md:grid-cols-2 md:py-24" aria-labelledby="scope">
            <div><h2 className="text-3xl font-bold tracking-tight">Verification</h2><p className="mt-5 leading-relaxed text-black/70">The dashboard’s October 18, 2026 verification records a clean install, strict TypeScript checks, a production build, and 11 passing regression tests. Coverage includes timeout/reconnect behavior, command gating, disconnect cleanup, storage failure and migration, HTTP errors, comparison classification, and shared geometry checks.</p><p className="mt-4 leading-relaxed text-black/70">Production-preview browser checks covered fleet selection, the Franka inspector and keyboard tabs, session browsing, replay, comparison, and reports. Integration failures were exercised with mocked sockets and HTTP responses.</p></div>
            <div><h2 id="scope" className="text-3xl font-bold tracking-tight">Current scope</h2><p className="mt-5 leading-relaxed text-black/70">A standalone desktop frontend with synthetic fleet telemetry, seeded sessions, and generated replay. Optional live simulator and routing integrations have not been validated end to end. No physical-robot performance claims are made.</p><p className="mt-4 leading-relaxed text-black/70">Production authentication, shared durable storage, physical robot validation, and broader mobile layouts remain future work. Hosted control requires an authenticated integration host and TLS endpoints. External map tiles and routing services remain dependencies.</p></div>
          </section>
          <p className="border-t border-black/15 py-8 font-mono text-xs leading-relaxed text-black/60">Stack: React 18 · TypeScript · Vite · deck.gl · MapLibre · React Three Fiber · Three.js · WebSocket adapter. Map imagery uses CARTO / OpenStreetMap attribution; the Panda model includes its upstream license. Captures: October 18, 2026.</p>
          <Link href="/#projects" className="mb-16 inline-block border-b border-black pb-2 font-mono text-xs uppercase tracking-wider">← Back to projects</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
