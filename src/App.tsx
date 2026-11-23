import { useCallback, useEffect, useState } from 'react';
import { Rocket } from 'lucide-react';
import launchVideoUrl from '../Public/box-vr2.mp4';

type Phase = 'landing' | 'countdown' | 'video' | 'transition';

const SITE_URL = 'https://www.evercaremedgroup.com';

function App() {
  const [phase, setPhase] = useState<Phase>('landing');

  const handlePublish = useCallback(() => {
    setPhase('countdown');
  }, []);

  const handleVideoComplete = useCallback(() => {
    setPhase('transition');
  }, []);

  useEffect(() => {
    if (phase !== 'transition') return;

    const timer = window.setTimeout(() => {
      window.location.assign(SITE_URL);
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [phase]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#f1fbeb] text-[#245520]">
      {/* ---------- LANDING ---------- */}
      {phase === 'landing' && (
        <div className="absolute inset-0">
          <LandingScene onPublish={handlePublish} />
        </div>
      )}

      {/* ---------- COUNTDOWN ---------- */}
      {phase === 'countdown' && <CountdownScene onComplete={() => setPhase('video')} />}

      {/* ---------- VIDEO ---------- */}
      {(phase === 'video' || phase === 'transition') && (
        <LaunchVideo transitioning={phase === 'transition'} onComplete={handleVideoComplete} />
      )}
    </div>
  );
}

function LandingScene({ onPublish }: { onPublish: () => void }) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      {/* Soft animated background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-float-blob absolute -left-32 top-10 h-96 w-96 rounded-full bg-[#cdefc0] opacity-60 blur-3xl" />
        <div className="animate-float-blob absolute -right-24 top-1/3 h-[28rem] w-[28rem] rounded-full bg-[#a8e294] opacity-50 blur-3xl" style={{ animationDelay: '4s' }} />
        <div className="animate-float-blob absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-[#e6f7e0] opacity-70 blur-3xl" style={{ animationDelay: '8s' }} />
      </div>

      {/* Subtle grain / gradient wash */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-[#e6f7e0]/60" />

      {/* Center content */}
      <main className="relative z-10 flex flex-col items-center justify-center px-6 text-center">
        {/* Publish button with light gradient animation */}
        <div
          className="animate-rise-in relative"
        >
          {/* pulse ring */}
          <span className="animate-pulse-ring absolute inset-0 rounded-full bg-[#a8e294]" />
          <button
            onClick={onPublish}
            className="publish-btn-gradient group relative z-10 flex items-center gap-4 rounded-full px-20 py-9 text-2xl font-semibold text-[#245520] shadow-[0_12px_50px_-10px_rgba(95,191,77,0.65)] transition-transform duration-300 hover:scale-[1.05] active:scale-[0.98] sm:px-24 sm:py-10 sm:text-3xl"
          >
            <Rocket className="h-8 w-8 transition-transform duration-300 group-hover:-translate-y-0.5 sm:h-9 sm:w-9" />
            Publish
          </button>
        </div>


      </main>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 px-8 py-6 text-center text-xs text-[#33822a]/50">
        © {new Date().getFullYear()} Evercare Med Group
      </footer>
    </div>
  );
}

export default App;

function CountdownScene({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState<number | 'GO'>(3);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCount((current) => {
        if (current === 3) return 2;
        if (current === 2) return 1;
        if (current === 1) return 'GO';
        window.clearInterval(timer);
        window.setTimeout(onComplete, 650);
        return 'GO';
      });
    }, 900);

    return () => window.clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-black">
      <div
        className="select-none text-[10rem] font-bold leading-none text-[#a8e294] sm:text-[14rem]"
        style={{ animation: 'countPop 700ms cubic-bezier(0.16, 1, 0.3, 1) both' }}
      >
        {count}
      </div>
    </div>
  );
}

function LaunchVideo({
  transitioning,
  onComplete,
}: {
  transitioning: boolean;
  onComplete: () => void;
}) {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-black">
      <iframe
        className={`absolute inset-0 h-full w-full border-0 transition-opacity duration-1000 ${
          transitioning ? 'opacity-100' : 'opacity-0'
        }`}
        src={SITE_URL}
        title="Evercare Med Group website"
      />
      <video
        className={`relative h-full w-full object-cover transition-opacity duration-1000 ${
          transitioning ? 'opacity-0' : 'opacity-100'
        }`}
        src={launchVideoUrl}
        autoPlay
        muted
        playsInline
        onEnded={onComplete}
      />
    </div>
  );
}
