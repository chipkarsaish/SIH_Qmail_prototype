import { useState } from "react";
import { EmailSidebar } from "@/components/EmailSidebar";
import { MessageList } from "@/components/MessageList";
import { ReadingPane } from "@/components/ReadingPane";
import { SecurityStatusBar } from "@/components/SecurityStatusBar";
import { Search, Settings, HelpCircle, User } from "lucide-react";
import qumailLogo from '../assets/new.png';
import { FeedbackModal } from '@/components/FeedbackModal';


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

const Index = () => {
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  return (
    <>
      <div className="h-screen flex flex-col bg-background">
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

        {/* Secondary Toolbar - MODIFIED */}
        <div className="bg-card border-b border-border px-4 py-2 flex items-center gap-2">
          <div className="flex items-center gap-5 text-sm">
            <span className="font-semibold text-foreground">Home</span>
            {/* Changed span to a button for click handling and accessibility */}
            <button
              onClick={() => setIsFeedbackModalOpen(true)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Help
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        {isFeedbackModalOpen && (
          <FeedbackModal onClose={() => setIsFeedbackModalOpen(false)} />
        )}
        <div className="flex-1 flex overflow-hidden">
          <EmailSidebar />

          <MessageList onSelectEmail={setSelectedEmail} />
          <ReadingPane email={selectedEmail} />
        </div>

        {/* Security Status Bar */}
        <SecurityStatusBar />
      </div>
    </>
  );
};

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

export default Index;
