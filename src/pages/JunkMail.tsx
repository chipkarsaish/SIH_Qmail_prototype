import { EmailSidebar } from "@/components/EmailSidebar";
import { Shield, AlertTriangle, Trash2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Settings, HelpCircle, User } from "lucide-react";
import qumailLogo from '../assets/new.png';
import { SecurityStatusBar } from "@/components/SecurityStatusBar";


interface JunkEmail {
    id: number;
    from: string;
    subject: string;
    preview: string;
    time: string;
    reason: string;
    threat: "high" | "medium" | "low";
}

const junkEmails: JunkEmail[] = [
    {
        id: 1,
        from: "noreply@suspicious-bank.com",
        subject: "URGENT: Verify Your Account Now!",
        preview: "Your account will be suspended unless you verify immediately...",
        time: "2 hours ago",
        reason: "Phishing attempt detected",
        threat: "high"
    },
    {
        id: 2,
        from: "winner@lottery-scam.net",
        subject: "Congratulations! You've Won $1,000,000",
        preview: "Click here to claim your prize money...",
        time: "5 hours ago",
        reason: "Known scam sender",
        threat: "high"
    },
    {
        id: 3,
        from: "marketing@spamcompany.com",
        subject: "Buy Our Product - 90% OFF Today Only!!!",
        preview: "Limited time offer, act now or miss out forever...",
        time: "1 day ago",
        reason: "Spam content detected",
        threat: "low"
    },
    {
        id: 4,
        from: "admin@fake-service.com",
        subject: "Password Reset Request",
        preview: "We received a request to reset your password...",
        time: "2 days ago",
        reason: "Suspicious link detected",
        threat: "medium"
    }
];

export default function JunkMail() {
    const getThreatColor = (threat: string) => {
        switch (threat) {
            case "high": return "text-alert-danger";
            case "medium": return "text-alert-warning";
            case "low": return "text-muted-foreground";
            default: return "text-muted-foreground";
        }
    };

    const getThreatBg = (threat: string) => {
        switch (threat) {
            case "high": return "bg-alert-danger/10 border-alert-danger/20";
            case "medium": return "bg-alert-warning/10 border-alert-warning/20";
            case "low": return "bg-muted/50 border-border";
            default: return "bg-muted/50 border-border";
        }
    };

    return (
        <div className="flex flex-col h-screen w-full bg-background">
            {/* Top Header */}
            <header className="bg-primary text-primary-foreground px-4 py-2 flex items-center gap-4 shadow-md shrink-0">
                <div className="flex items-center gap-2">
                    <div style={styles.logo}>
                        <img
                            src={qumailLogo}
                            alt="QuMail Logo"
                            style={{ width: '30px', height: '30px' }} // Adjust size as needed
                        />
                    </div>
                    <span className="font-semibold text-lg">QuMail</span>
                </div>

                <div className="flex-1 max-w-xl">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-primary-foreground/60" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full bg-primary-hover text-primary-foreground placeholder:text-primary-foreground/60 pl-10 pr-4 py-1.5 rounded outline-none focus:ring-2 focus:ring-primary-foreground/30"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-primary-hover rounded transition-colors" title="Settings">
                        <Settings className="w-4 h-4" />
                    </button>
                    
                </div>
            </header>

            {/* Secondary Toolbar */}
            <div className="bg-card border-b border-border px-4 py-2 flex items-center gap-2 shrink-0">
                <div className="flex items-center gap-5 text-sm">
                    <span className="font-semibold text-foreground">Home</span>
                    <span className="text-muted-foreground">Help</span>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex flex-1 overflow-hidden">
                <EmailSidebar />

                <div className="flex-1 flex flex-col">
                    {/* Header */}
                    <header className="h-12 bg-card border-b border-border flex items-center px-4 gap-2">
                        <AlertTriangle className="w-5 h-5 text-alert-warning" />
                        <h1 className="font-semibold text-foreground">Junk Email</h1>
                        <Badge variant="secondary" className="ml-2">{junkEmails.length}</Badge>
                        <div className="ml-auto flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="text-xs">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Empty Folder
                            </Button>
                        </div>
                    </header>

                    {/* Info Banner */}
                    <div className="bg-alert-info/10 border-b border-alert-info/20 px-4 py-2 flex items-center gap-3">
                        <Info className="w-4 h-4 text-alert-info" />
                        <p className="text-sm text-foreground">
                            <span className="font-medium">Protected by Quantum Security:</span> These messages were automatically identified as potential threats and moved to junk.
                        </p>
                    </div>

                    {/* Email List */}
                    <div className="flex-1 overflow-y-auto p-4">
                        <div className="space-y-2">
                            {junkEmails.map((email) => (
                                <div
                                    key={email.id}
                                    className={`p-4 rounded-lg border ${getThreatBg(email.threat)} hover:shadow-md transition-all cursor-pointer`}
                                >
                                    <div className="flex items-start gap-3">
                                        <AlertTriangle className={`w-5 h-5 mt-1 ${getThreatColor(email.threat)}`} />

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2 mb-1">
                                                <div className="flex-1 min-w-0">
                                                    <div className="font-medium text-foreground truncate">{email.from}</div>
                                                    <div className="text-sm font-medium text-foreground truncate">{email.subject}</div>
                                                </div>
                                                <span className="text-xs text-muted-foreground whitespace-nowrap">{email.time}</span>
                                            </div>

                                            <p className="text-sm text-muted-foreground line-clamp-1 mb-2">{email.preview}</p>

                                            <div className="flex items-center gap-2">
                                                <Badge variant="outline" className={getThreatColor(email.threat)}>
                                                    {email.reason}
                                                </Badge>
                                                {email.threat === "high" && (
                                                    <Badge variant="destructive" className="text-xs">High Risk</Badge>
                                                )}
                                            </div>
                                        </div>

                                        <Button variant="ghost" size="sm">
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <SecurityStatusBar />
        </div>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    logo: {
        width: 'auto',
        height: '20px',
        background: '#316AB7',
        borderRadius: '10px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1px',
        boxShadow: '0 4px 12px rgba(49, 106, 183, 0.3)',

    },
};