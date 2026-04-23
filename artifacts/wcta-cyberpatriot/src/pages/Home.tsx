import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

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
  const [email, setEmail] = useState("");
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  
  const sequence = [
    "INIT SYSTEM v2.4.1",
    "LOADING KERNEL MODULES...",
    "MOUNTING VIRTUAL FILESYSTEM...",
    "ESTABLISHING SECURE CONNECTION...",
    "HANDSHAKE PROTOCOL: ACCEPTED",
    "DECRYPTING PAYLOAD...",
    "WELCOME TO WCTA CYBERPATRIOT TERMINAL."
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setFormStatus("submitting");
    setTimeout(() => {
      setFormStatus("success");
      setEmail("");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black text-[#00ff00] font-mono p-4 md:p-8 flex flex-col relative overflow-hidden">
      {/* CRT Scanline overlay */}
      <div className="pointer-events-none fixed inset-0 z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-20"></div>
      
      {/* Glitch animation styles */}
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
        
        .glitch-hover:hover {
          animation: glitch-anim 0.3s cubic-bezier(.25, .46, .45, .94) both infinite;
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
      `}} />

      <main className="max-w-4xl mx-auto w-full z-10 space-y-16 pb-20">
        {/* HERO SECTION */}
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
          <div className="space-y-24 animate-in fade-in duration-1000">
            {/* OVERVIEW SECTION */}
            <section className="space-y-6 border border-[#00ff00]/30 p-6 md:p-8 bg-black relative shadow-[0_0_15px_rgba(0,255,0,0.1)]">
              <div className="absolute -top-3 left-4 bg-black px-2 text-sm font-bold tracking-widest text-[#00ff00]">STATUS: OFFLINE</div>
              <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-widest mb-6">
                System Compiling...
              </h1>
              <p className="text-base md:text-lg text-[#00ff00]/90 max-w-3xl leading-relaxed">
                Whitney Cunningham Tech Academy's elite cybersecurity competition team is currently in stealth mode. 
                We are training the next generation of ethical hackers, network defenders, and systems administrators.
                Forget the textbook — we learn by breaking things and putting them back together.
              </p>
              <div className="pt-4 flex flex-wrap gap-4 text-xs md:text-sm">
                <span className="border border-[#00ff00]/40 px-3 py-1">TARGET: NATIONALS</span>
                <span className="border border-[#00ff00]/40 px-3 py-1">ETA: FALL_2026</span>
              </div>
            </section>
            
            {/* IMAGE & MISSION SECTION */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="border border-[#00ff00]/30 p-1 relative group">
                <div className="absolute -top-3 right-4 bg-black px-2 text-xs text-[#00ff00]/60">VISUAL_DATA</div>
                <img 
                  src="/terminal-art.png" 
                  alt="Abstract terminal network representation" 
                  className="w-full h-auto object-cover opacity-80 mix-blend-screen filter grayscale contrast-150"
                  onError={(e) => {
                     e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-[#00ff00]/10 mix-blend-overlay pointer-events-none"></div>
              </div>
              <div className="space-y-6">
                <h2 className="text-xl border-b border-[#00ff00]/30 pb-2 inline-block">
                  WHAT_IS_CYBERPATRIOT?
                </h2>
                <p className="text-[#00ff00]/80 text-sm md:text-base leading-relaxed">
                  CyberPatriot is the National Youth Cyber Education Program. Teams of high schoolers are given virtual machines — Windows, Linux, Ubuntu — riddled with cybersecurity vulnerabilities. 
                </p>
                <p className="text-[#00ff00]/80 text-sm md:text-base leading-relaxed">
                  The objective? Secure the network. Lock down users. Configure firewalls. Find the malware. Every vulnerability patched earns points. Every mistake loses them. 
                  Compete against thousands of teams nationwide in real-time 6-hour hacking scenarios.
                </p>
              </div>
            </section>

            {/* CURRICULUM SECTION */}
            <section className="space-y-8">
              <h2 className="text-xl md:text-2xl border-b border-[#00ff00]/30 pb-2 inline-block">
                TRAINING_MODULES
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border border-[#00ff00]/20 p-6 hover:bg-[#00ff00]/5 transition-colors cursor-crosshair">
                  <div className="text-xs text-[#00ff00]/50 mb-2 font-bold">MODULE_01</div>
                  <h3 className="text-lg font-bold mb-4">Linux / OS Hardening</h3>
                  <ul className="space-y-2 text-sm text-[#00ff00]/80 list-disc list-inside ml-4 marker:text-[#00ff00]/50">
                    <li>Bash scripting</li>
                    <li>User & Group permissions</li>
                    <li>Service configuration (SSH, FTP)</li>
                    <li>Log analysis</li>
                  </ul>
                </div>
                <div className="border border-[#00ff00]/20 p-6 hover:bg-[#00ff00]/5 transition-colors cursor-crosshair">
                  <div className="text-xs text-[#00ff00]/50 mb-2 font-bold">MODULE_02</div>
                  <h3 className="text-lg font-bold mb-4">Windows Security</h3>
                  <ul className="space-y-2 text-sm text-[#00ff00]/80 list-disc list-inside ml-4 marker:text-[#00ff00]/50">
                    <li>Registry auditing</li>
                    <li>Active Directory & GPOs</li>
                    <li>Local Security Policies</li>
                    <li>Malware identification</li>
                  </ul>
                </div>
                <div className="border border-[#00ff00]/20 p-6 hover:bg-[#00ff00]/5 transition-colors cursor-crosshair">
                  <div className="text-xs text-[#00ff00]/50 mb-2 font-bold">MODULE_03</div>
                  <h3 className="text-lg font-bold mb-4">Network Defense</h3>
                  <ul className="space-y-2 text-sm text-[#00ff00]/80 list-disc list-inside ml-4 marker:text-[#00ff00]/50">
                    <li>Wireshark & Packet analysis</li>
                    <li>Firewall configurations</li>
                    <li>Subnetting & Routing</li>
                    <li>Cisco NetAcad</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* RECRUITMENT SECTION */}
            <section className="space-y-6 max-w-2xl mx-auto">
              <div className="border-t border-l border-r border-[#00ff00]/30 p-2 flex justify-between bg-[#00ff00]/10">
                <span className="text-xs">RECRUITMENT_PORTAL</span>
                <span className="text-xs">SECURE_CONNECTION</span>
              </div>
              <div className="border border-[#00ff00]/30 p-6 md:p-10 bg-black/50 space-y-6 mt-0 shadow-[0_0_20px_rgba(0,255,0,0.05)]">
                <p className="text-[#00ff00] font-bold text-lg">
                  &gt; The roster is currently closed.
                </p>
                <p className="text-[#00ff00]/80">
                  Enter your school email to request access to the recruitment ping list.
                  You will receive an encrypted notification when tryouts begin.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 mt-8">
                  <div className="flex-1 flex items-center border border-[#00ff00]/50 bg-transparent p-3 focus-within:border-[#00ff00] focus-within:shadow-[0_0_10px_rgba(0,255,0,0.2)] transition-all">
                    <span className="text-[#00ff00] mr-3 font-bold">&gt;</span>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="user@wcta.edu"
                      className="bg-transparent border-none outline-none w-full text-[#00ff00] placeholder:text-[#00ff00]/30 font-mono"
                      required
                      disabled={formStatus === "submitting" || formStatus === "success"}
                    />
                  </div>
                  <Button 
                    type="submit"
                    variant="outline" 
                    className="border-[#00ff00] text-[#00ff00] bg-transparent glitch-hover font-mono font-bold uppercase rounded-none px-8 py-6 h-auto"
                    disabled={formStatus === "submitting" || formStatus === "success"}
                  >
                    {formStatus === "submitting" ? "ENCRYPTING..." : "EXECUTE"}
                  </Button>
                </form>

                {formStatus === "success" && (
                  <div className="text-[#00ff00] border-l-2 border-[#00ff00] pl-4 py-3 bg-[#00ff00]/10 mt-6 animate-in slide-in-from-left-4">
                    <p className="font-bold">&gt; ENCRYPTION COMPLETE.</p>
                    <p>&gt; CREDENTIALS SECURED.</p>
                    <p>&gt; STAND BY FOR FURTHER INSTRUCTIONS.</p>
                  </div>
                )}
              </div>
            </section>

            <footer className="text-center text-xs text-[#00ff00]/40 pt-16 pb-4 border-t border-[#00ff00]/20 flex flex-col md:flex-row justify-between items-center gap-4">
              <p>WCTA_CYBERPATRIOT_TERMINAL_V1.0</p>
              <div className="flex gap-4">
                <span className="hover:text-[#00ff00] cursor-pointer transition-colors">SYS_LOGS</span>
                <span className="hover:text-[#00ff00] cursor-pointer transition-colors">PING</span>
              </div>
            </footer>
          </div>
        )}
      </main>
    </div>
  );
}
