import { Lock, CheckCheck, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

interface Email {
  id: string;
  from: string;
  subject: string;
  preview: string;
  body: string; //
  time: string;
  isRead: boolean;
  securityStatus?: "quantum-secured" | "verified-decrypted" | "ephemeral";
}

const emails: Email[] = [
  {
    id: "1",
    from: "John Smith",
    subject: "Q4 Financial Report",
    preview: "This is the start of an email that was received and it goes on and until...",
    body: 'Unusual energy fluctuations detected in Sector 7. Please review the attached logs and advise. This could be a precursor to a containment breach.', // <-- ADD FULL BODY
    time: "Tue 10:00",
    isRead: false,
    securityStatus: "quantum-secured"
  },
  {
    id: "2",
    from: "Alice Johnson",
    subject: "Project Update - Confidential",
    preview: "The latest updates on our quantum encryption implementation...",
    body: 'Unusual energy fluctuations detected in Sector 7. Please review the attached logs and advise. This could be a precursor to a containment breach.', // <-- ADD FULL BODY
    time: "Tue 09:30",
    isRead: false,
    securityStatus: "verified-decrypted"
  },
  {
    id: "3",
    from: "Bob Wilson",
    subject: "Urgent: Security Credentials",
    preview: "Your temporary access codes for the secure system. This message will...",
    body: 'Unusual energy fluctuations detected in Sector 7. Please review the attached logs and advise. This could be a precursor to a containment breach.', // <-- ADD FULL BODY
    time: "Tue 09:15",
    isRead: false,
    securityStatus: "ephemeral"
  },
  {
    id: "4",
    from: "Carol Davis",
    subject: "Meeting Notes",
    preview: "Here are the notes from yesterday's meeting about the new protocol...",
    body: 'Unusual energy fluctuations detected in Sector 7. Please review the attached logs and advise. This could be a precursor to a containment breach.', // <-- ADD FULL BODY
    time: "Mon 16:45",
    isRead: true,
  },
  {
    id: "5",
    from: "David Miller",
    subject: "Weekly Summary",
    preview: "This week's summary of activities and upcoming tasks for next week...",
    body: 'Unusual energy fluctuations detected in Sector 7. Please review the attached logs and advise. This could be a precursor to a containment breach.', // <-- ADD FULL BODY
    time: "Mon 14:20",
    isRead: true,
  },
];

const SecurityIcon = ({ status }: { status?: string }) => {
  if (status === "quantum-secured") {
    return (
      <div className="flex items-center gap-1 text-quantum" title="Quantum-Secured">
        <span className="text-xs">⚛️</span>
        <Lock className="w-3.5 h-3.5" />
      </div>
    );
  }
  if (status === "verified-decrypted") {
    return (
      <div className="flex items-center gap-1 text-alert-success" title="Verified Decrypted">
        <span className="text-xs">⚛️</span>
        <CheckCheck className="w-3.5 h-3.5" />
      </div>
    );
  }
  if (status === "ephemeral") {
    return (
      <div className="flex items-center gap-1 text-alert-danger" title="Ephemeral Message">
        <Flame className="w-3.5 h-3.5" />
      </div>
    );
  }
  return <div className="w-8" />;
};

export function MessageList({ onSelectEmail }: { onSelectEmail: (email: Email) => void }) {
  return (
    <div className="flex-1 flex flex-col border-r border-border bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">

        <div className="border-b border-gray-200 dark:border-gray-800 px-6 py-3">
          <h1 className="text-2xl font-bold">Inbox</h1>



        </div>
      </div>

      {/* Email List */}
      <div className="flex-1 overflow-y-auto">
        {/* Header Row */}
        <div className="grid grid-cols-[40px,160px,1fr,100px,80px] gap-2 px-4 py-2 border-b border-border bg-muted/30 text-xs font-medium text-muted-foreground sticky top-0">
          <div></div>
          <div>From</div>
          <div>Subject</div>
          <div>Status</div>
          <div>Received</div>
        </div>

        {/* Email Items */}
        {emails.map((email, index) => (
          <button
            key={email.id}
            onClick={() => onSelectEmail(email)}
            className={cn(
              "w-full grid grid-cols-[40px,160px,1fr,100px,80px] gap-2 px-4 py-3 border-b border-border hover:bg-accent transition-colors text-left",
              index === 0 && "bg-accent"
            )}
          >
            <div className="flex items-center">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-white font-medium text-sm",
                "bg-primary"
              )}>
                {email.from[0]}
              </div>
            </div>
            <div className="flex items-center">
              <span className={cn(
                "text-sm truncate",
                !email.isRead && "font-semibold"
              )}>
                {email.from}
              </span>
            </div>
            <div className="flex flex-col justify-center min-w-0">
              <div className={cn(
                "text-sm truncate",
                !email.isRead && "font-semibold"
              )}>
                {email.subject}
              </div>
              <div className="text-xs text-muted-foreground truncate">
                {email.preview}
              </div>
            </div>
            <div className="flex items-center justify-center">
              <SecurityIcon status={email.securityStatus} />
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              {email.time}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
