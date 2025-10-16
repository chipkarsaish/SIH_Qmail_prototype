import { Lock, Flame, Reply, Forward, MoreHorizontal } from "lucide-react";
import { useState, useEffect } from "react";

interface Email {
  id: string;
  from: string;
  subject: string;
  preview: string;
  time: string;
  isRead: boolean;
  securityStatus?: "quantum-secured" | "verified-decrypted" | "ephemeral";
}

export function ReadingPane({ email }: { email: Email | null }) {
  const [timeLeft, setTimeLeft] = useState(270); // 4 minutes 30 seconds

  useEffect(() => {
    if (email?.securityStatus === "ephemeral") {
      const timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [email]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (!email) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Select an email to read</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Toolbar */}
      <div className="border-b border-border bg-card px-4 py-2 flex items-center gap-2">
        
        <h1><b>Preview</b></h1>
      </div>

      {/* Email Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Quantum Security Banner */}
        {email.securityStatus && (
          <div className="mb-4 rounded-lg overflow-hidden shadow-md">
            <div className="bg-quantum text-quantum-foreground px-4 py-3 flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">⚛️</span>
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <div className="font-semibold text-sm">QUANTUM-SECURED MESSAGE</div>
                <div className="text-xs opacity-90">
                  End-to-end encrypted with quantum-resistant algorithms
                </div>
              </div>
            </div>
            
            {/* Self-Destruct Warning */}
            {email.securityStatus === "ephemeral" && (
              <div className="bg-gradient-to-r from-alert-danger to-alert-warning text-white px-4 py-2 flex items-center gap-3 animate-pulse">
                <Flame className="w-5 h-5" />
                <div className="flex-1">
                  <span className="font-semibold text-sm">
                    This message will self-destruct in {formatTime(timeLeft)}
                  </span>
                </div>
                <div className="text-xl font-mono font-bold">
                  {formatTime(timeLeft)}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Email Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold mb-4">{email.subject}</h1>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
              {email.from[0]}
            </div>
            <div>
              <div className="font-medium">{email.from}</div>
              <div className="text-sm text-muted-foreground">
                To: You
              </div>
            </div>
            <div className="ml-auto text-sm text-muted-foreground">
              {email.time}
            </div>
          </div>
        </div>

        {/* Email Body */}
        <div className="prose max-w-none">
          <p className="text-foreground leading-relaxed mb-4">
            Dear Colleague,
          </p>
          <p className="text-foreground leading-relaxed mb-4">
            {email.preview}
          </p>
          <p className="text-foreground leading-relaxed mb-4">
            This secure communication demonstrates our advanced quantum encryption technology. 
            All messages are protected using post-quantum cryptographic algorithms that remain 
            secure even against attacks from quantum computers.
          </p>
          <p className="text-foreground leading-relaxed mb-4">
            Key security features:
          </p>
          <ul className="list-disc list-inside text-foreground mb-4 space-y-1">
            <li>Quantum key distribution (QKD) protocol</li>
            <li>End-to-end encryption with perfect forward secrecy</li>
            <li>Real-time eavesdropping detection</li>
            <li>Tamper-proof message integrity verification</li>
          </ul>
          <p className="text-foreground leading-relaxed mb-4">
            Please review the attached documents and let me know if you have any questions 
            about our security implementation.
          </p>
          <p className="text-foreground leading-relaxed">
            Best regards,<br />
            {email.from}
          </p>
        </div>
      </div>
    </div>
  );
}
