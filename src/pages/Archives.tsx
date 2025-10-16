import { EmailSidebar } from "@/components/EmailSidebar";
import { Archive, Clock, FolderOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Settings, HelpCircle, User } from "lucide-react";
import qumailLogo from '../assets/new.png';
import { SecurityStatusBar } from "@/components/SecurityStatusBar";


interface ArchivedEmail {
    id: number;
    from: string;
    subject: string;
    preview: string;
    date: string;
    hasAttachment?: boolean;
    isSecure?: boolean;
}

const archivedEmails: ArchivedEmail[] = [
    {
        id: 1,
        from: "alice@company.com",
        subject: "Q4 Financial Report - Final Version",
        preview: "Please find attached the finalized Q4 financial report...",
        date: "Dec 15, 2024",
        hasAttachment: true,
        isSecure: true
    },
    {
        id: 2,
        from: "project-team@work.com",
        subject: "Project Alpha - Completed Successfully",
        preview: "I'm pleased to announce that Project Alpha has been completed...",
        date: "Nov 28, 2024",
        isSecure: true
    },
    {
        id: 3,
        from: "hr@company.com",
        subject: "2024 Annual Leave Summary",
        preview: "Your annual leave summary for 2024 is attached...",
        date: "Nov 10, 2024",
        hasAttachment: true
    },
    {
        id: 4,
        from: "newsletter@industry.com",
        subject: "October Industry Newsletter",
        preview: "Here are the top stories and trends from October...",
        date: "Oct 31, 2024"
    },
    {
        id: 5,
        from: "bob@partner.com",
        subject: "Contract Agreement - Signed Copy",
        preview: "Attached is the signed partnership agreement...",
        date: "Oct 15, 2024",
        hasAttachment: true,
        isSecure: true
    },
    {
        id: 6,
        from: "events@conference.com",
        subject: "Tech Summit 2024 - Thank You for Attending",
        preview: "Thank you for joining us at Tech Summit 2024...",
        date: "Sep 20, 2024"
    }
];

export default function Archives() {
    return (
        <div className="flex flex-col h-screen w-full bg-background">
            {/* Top Header */}
            <header className="bg-primary text-primary-foreground px-4 py-2 flex items-center gap-4 shadow-md">
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
            <div className="bg-card border-b border-border px-4 py-2 flex items-center gap-2">
                <div className="flex items-center gap-5 text-sm">
                    <span className="font-semibold text-foreground">Home</span>
                    <span className="text-muted-foreground">Help</span>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
            <EmailSidebar />

            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="h-12 bg-card border-b border-border flex items-center px-4 gap-2">
                    <Archive className="w-5 h-5 text-primary" />
                    <h1 className="font-semibold text-foreground">Archive</h1>
                    <Badge variant="secondary" className="ml-2">{archivedEmails.length}</Badge>
                    <div className="ml-auto flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="text-xs">
                            <FolderOpen className="w-4 h-4 mr-2" />
                            Move to Inbox
                        </Button>
                    </div>
                </header>

                {/* Info Banner */}
                <div className="bg-muted/50 border-b border-border px-4 py-2 flex items-center gap-3">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                        Archived messages are stored securely and can be restored to your inbox at any time.
                    </p>
                </div>

                {/* Email List */}
                <div className="flex-1 overflow-y-auto p-4">
                    <div className="space-y-2">
                        {archivedEmails.map((email) => (
                            <div
                                key={email.id}
                                className="p-4 rounded-lg border border-border bg-card hover:bg-accent/50 hover:shadow-md transition-all cursor-pointer"
                            >
                                <div className="flex items-start gap-3">
                                    <Archive className="w-4 h-4 mt-1 text-muted-foreground" />

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2 mb-1">
                                            <div className="flex-1 min-w-0">
                                                <div className="font-medium text-foreground truncate">{email.from}</div>
                                                <div className="text-sm font-medium text-foreground truncate">{email.subject}</div>
                                            </div>
                                            <span className="text-xs text-muted-foreground whitespace-nowrap">{email.date}</span>
                                        </div>

                                        <p className="text-sm text-muted-foreground line-clamp-1 mb-2">{email.preview}</p>

                                        <div className="flex items-center gap-2">
                                            {email.isSecure && (
                                                <Badge variant="outline" className="text-quantum border-quantum/30">
                                                    ⚛️ Quantum-Secured
                                                </Badge>
                                            )}
                                            {email.hasAttachment && (
                                                <Badge variant="secondary" className="text-xs">
                                                    📎 Attachment
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
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

