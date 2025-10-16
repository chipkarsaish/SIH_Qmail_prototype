import { useState, useEffect } from "react";
import { EmailSidebar } from "@/components/EmailSidebar";
import { Search, Settings, HelpCircle, User, Send, FileText, Trash2, Edit3, X, Paperclip, Shield, Loader, AlertTriangle, Plus, Flame } from 'lucide-react';
import React from 'react';
import { SecurityStatusBar } from "@/components/SecurityStatusBar";

import qumailLogo from '../assets/new.png';


const SECURITY_LEVELS = {
  'level1': { name: 'Level 1: Quantum Secure', icon: Shield, recommended: true },
  'level2': { name: 'Level 2: Quantum-Aided AES', icon: Shield },
  'level3': { name: 'Level 3: Post-Quantum (PQC)', icon: Shield },
  'level4': { name: 'Level 4: No Security', icon: AlertTriangle }
};

const EPHEMERAL_DURATIONS = {
  '5m': '5 minutes',
  '1h': '1 hour',
  '6h': '6 hours',
  '1d': '1 day',
  '7d': '7 days'
};

interface Email {
  id: string;
  from: string;
  subject: string;
  preview: string;
  time: string;
  isRead: boolean;
  securityStatus?: "quantum-secured" | "verified-decrypted" | "ephemeral";
}

const SentMail = () => {
  const [sentEmails, setSentEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);

  useEffect(() => {
    const storedSentItems = JSON.parse(localStorage.getItem('qumail_sent_items')) || [];
    setSentEmails(storedSentItems);
  }, []);

  const handleEmailSelect = (email: Email) => {
    setSelectedEmail(email);
  };

  const handleClosePreview = () => {
    setSelectedEmail(null);
  };

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

        {/* Secondary Toolbar */}
        <div className="bg-card border-b border-border px-4 py-2 flex items-center gap-2">
          <div className="flex items-center gap-5 text-sm">
            <span className="font-semibold text-foreground">Home</span>
            <span className="text-muted-foreground">Help</span>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex overflow-hidden">
          <EmailSidebar />

          {/* This main section replaces MessageList and ReadingPane */}
          <main className="flex-1 flex flex-col overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-800 px-6 py-3">
              <h1 className="text-2xl font-bold">Sent</h1>
            </div>

            <div className="flex-1 overflow-y-auto">
              {sentEmails.length > 0 ? (
                
                <table className="min-w-full text-sm">
                  <thead className="sticky top-0 bg-gray-50 dark:bg-gray-800/50 backdrop-blur-sm z-10">
                    <tr>
                      <th className="px-3 py-2 text-center font-semibold" title="Security Level"><Shield size={16} /></th>
                      <th className="px-6 py-2 text-left font-semibold">To</th>
                      <th className="px-6 py-2 text-left font-semibold">Subject & Preview</th>
                      <th className="px-6 py-2 text-right font-semibold">Date Sent</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                    {sentEmails.map(email => (
                      <tr
                        key={email.id}
                        className="hover:bg-muted cursor-pointer"
                        onClick={() => setSelectedEmail(email)} // <-- ADD THIS
                      >
                        <td className="px-3 py-3 text-center" title={SECURITY_LEVELS[email.securityLevel]?.name || 'Unknown Security'}>
                          {React.createElement(SECURITY_LEVELS[email.securityLevel]?.icon || AlertTriangle, {
                            size: 18,
                            className: email.securityLevel === 'level4' ? 'text-yellow-500' : 'text-green-500'
                          })}
                        </td>
                        <td className="px-6 py-3 whitespace-nowrap">
                          <span className="font-medium">{email.to || <span className="text-gray-500 italic">No Recipient</span>}</span>
                        </td>
                        <td className="px-6 py-3">
                          <div className="flex items-center gap-2">
                            {email.ephemeralSettings.enabled && <span title={`Ephemeral: ${EPHEMERAL_DURATIONS[email.ephemeralSettings.duration]}`}>🔥</span>}
                            <span className="font-semibold">{email.subject}</span>
                            <span className="text-gray-500 dark:text-gray-400 truncate"> - {email.body.substring(0, 70)}...</span>
                          </div>
                        </td>
                        <td className="px-6 py-3 text-right whitespace-nowrap text-gray-500 dark:text-gray-400">
                          {new Date(email.timestamp).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
              ) : (
                <div className="text-center p-10 text-gray-500">
                  <p>No items in the sent folder.</p>
                </div>
              )}
              {/* --- NEW: Email Preview Pane --- */}
        {selectedEmail && (
          <aside className="flex-1 flex flex-col border-l border-border bg-card">
            {/* Preview Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="text-xl font-bold truncate pr-4">{selectedEmail.subject}</h2>
              {/* This button will close the preview */}
              <button
                onClick={() => setSelectedEmail(null)} // <-- This clears the selection
                className="p-2 rounded-full hover:bg-muted"
                title="Close Preview"
              >
                <X size={20} />
              </button>
            </div>

            {/* Email Details */}
            <div className="p-4 border-b border-border text-sm space-y-2">
              {/* ... details like To, Date, Security ... */}
              <div className="flex justify-between">
                <span className="font-semibold text-muted-foreground">To:</span>
                <span>{selectedEmail.to}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-muted-foreground">Date:</span>
                <span>{new Date(selectedEmail.timestamp).toLocaleString()}</span>
              </div>
            </div>

            {/* Email Body */}
            <div className="flex-1 p-6 overflow-y-auto">
              <pre className="text-base whitespace-pre-wrap font-sans">
                {selectedEmail.body}
              </pre>
            </div>
          </aside>
        )}
            </div>
            
          </main>
        </div>
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

export default SentMail;
