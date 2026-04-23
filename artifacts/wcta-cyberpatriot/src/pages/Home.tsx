import { useState, useEffect } from "react";

const ASCII_ART = `
  _      __ _____  _____   ___        _____         __                 ____          __         _         __   
 | | /| / // ___/ /__  /  / _ |      / ___/ __ __  / /  ___  ____     / __ \\ ___ _  / /_  ____ (_) ___   / /_  
 | |/ |/ // /__     / /  / __ |     / /__  / // / / _ \\/ -_)/ __/    / /_/ // _ \`/ / __// __// / / _ \\ / __/  
 |__/|__/ \\___/    /_/  /_/ |_|     \\___/  \\_, / /_.__/\\__//_/      / .___/ \\_,_/  \\__//_/  /_/  \\___/ \\__/   
                                          /___/                    /_/                                        
`;

export default function Home() {
  const [bootSequence, setBootSequence] = useState<string[]>([]);
  const [isBooted, setIsBooted] = useState(false);

  const sequence = [
    "INIT SYSTEM v2.4.1",
    "LOADING KERNEL MODULES...",
    "MOUNTING VIRTUAL FILESYSTEM...",
    "ESTABLISHING SECURE CONNECTION...",
    "HANDSHAKE PROTOCOL: ACCEPTED",
    "DECRYPTING PAYLOAD...",
    "WELCOME TO WEST CAREER & TECHNICAL ACADEMY CYBERPATRIOT TERMINAL."
  ];

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < sequence.length) {
        setBootSequence(prev => [...prev, sequence[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
        setTimeout(() => setIsBooted(true), 800);
      }
    }, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-[#00ff00] font-mono p-4 md:p-8 flex flex-col relative overflow-hidden">
      {/* CRT Scanline overlay */}
      <div className="pointer-events-none fixed inset-0 z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-20"></div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .cursor-blink {
          animation: blink 1s step-end infinite;
        }
        ::selection {
          background: #00ff00;
          color: black;
        }
        @keyframes glitch-anim {
          0% { transform: translate(0) }
          20% { transform: translate(-2px, 1px) }
          40% { transform: translate(-1px, -1px) }
          60% { transform: translate(2px, 1px) }
          80% { transform: translate(1px, -1px) }
          100% { transform: translate(0) }
        }
        .glitch {
          animation: glitch-anim 2.5s infinite;
        }
      `}} />

      <main className="max-w-4xl mx-auto w-full z-10 space-y-16 pb-20">
        <section className="space-y-4 pt-8">
          <pre className="text-[0.45rem] md:text-xs leading-tight whitespace-pre-wrap text-[#00ff00] opacity-80 overflow-x-auto">
            {ASCII_ART}
          </pre>

          <div className="space-y-2 text-xs md:text-sm pt-4">
            {bootSequence.map((line, i) => (
              <div key={i} className="opacity-80">
                <span className="text-[#00ff00]/50">[{new Date().toISOString().split('T')[1].slice(0,-1)}]</span> {line}
              </div>
            ))}
            {!isBooted && (
              <div>
                <span className="text-[#00ff00]/50">[{new Date().toISOString().split('T')[1].slice(0,-1)}]</span> <span className="cursor-blink">_</span>
              </div>
            )}
          </div>
        </section>

        {isBooted && (
          <section className="animate-in fade-in duration-1000 pt-8">
            <h1 className="text-4xl md:text-7xl font-bold uppercase tracking-widest glitch">
              Coming Soon<span className="cursor-blink">_</span>
            </h1>
          </section>
        )}
      </main>
    </div>
  );
}
