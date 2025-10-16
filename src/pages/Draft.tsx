import React, { useState, useEffect } from 'react';
import { Search, Settings, HelpCircle, User, Send, FileText, Trash2, Edit3, X, Paperclip, Shield, Loader, AlertTriangle, Plus, Flame } from 'lucide-react';
import { EmailSidebar } from "@/components/EmailSidebar";
import qumailLogo from '../assets/new.png';
import { FeedbackModal } from '@/components/FeedbackModal';
import { SecurityStatusBar } from "@/components/SecurityStatusBar";


// --- CONFIG & MOCK DATA ---
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

const initialDrafts = [

    { id: 'draft-2', to: 'ciso@enterprise.com', subject: 'Re: Urgent Security Audit Findings', body: 'Addressing the findings now.', timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), securityLevel: 'level3', ephemeralSettings: { enabled: true, duration: '5m' }, status: 'draft' },

];



const ContextMenu = ({ x, y, visible, onAction, isSending, draft }) => {
    const [showSecuritySubMenu, setShowSecuritySubMenu] = useState(false);
    if (!visible) return null;

    return (
        <div
            style={{ top: y, left: x }}
            className="absolute z-50 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg py-1 text-sm"
            onClick={e => e.stopPropagation()}
            onMouseLeave={() => setShowSecuritySubMenu(false)}
        >
            <button onClick={() => onAction('edit')} disabled={isSending} className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"><Edit3 size={16} /> Continue Editing</button>
            <button onClick={() => onAction('send')} disabled={isSending} className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"><Send size={16} /> Send Now</button>
            <div className="my-1 border-t border-gray-200 dark:border-gray-700"></div>

            <div className="relative" onMouseEnter={() => setShowSecuritySubMenu(true)}>
                <button disabled={isSending} className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-between disabled:opacity-50">
                    <span>Change Security Level</span>
                    <span className="text-xs">▶</span>
                </button>
                {showSecuritySubMenu && (
                    <div className="absolute left-full -top-1 ml-1 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg py-1">
                        {Object.entries(SECURITY_LEVELS).map(([key, { name, recommended }]) => (
                            <button
                                key={key}
                                onClick={() => onAction('set-security-level', key)}
                                disabled={isSending}
                                className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                {name} {recommended && <span className="text-xs text-green-500">(Recommended)</span>}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <button onClick={() => onAction('toggle-ephemeral')} disabled={isSending} className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                {draft?.ephemeralSettings?.enabled ? 'Disable Ephemeral Mode' : 'Make Ephemeral (Burn After Reading) 🔥'}
            </button>

            <div className="my-1 border-t border-gray-200 dark:border-gray-700"></div>
            <button onClick={() => onAction('delete')} disabled={isSending} className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"><Trash2 size={16} /> Discard</button>
        </div>
    );
};

const ToastNotification = ({ config, onClose }) => {
    if (!config || !config.visible) return null;
    const baseClasses = "fixed bottom-5 right-5 z-50 flex items-center gap-4 px-6 py-4 rounded-lg shadow-2xl transition-all duration-300 transform";
    const typeClasses = {
        info: "bg-blue-600 text-white",
        success: "bg-green-600 text-white",
        error: "bg-red-600 text-white",
    };
    return (
        <div className={`${baseClasses} ${typeClasses[config.type]}`}>
            {config.type === 'info' && <Loader className="animate-spin" size={24} />}
            {config.type === 'success' && <Shield size={24} />}
            {config.type === 'error' && <AlertTriangle size={24} />}
            <p className="font-medium">{config.message}</p>
            {config.persistent && (
                <button onClick={onClose} className="p-1 rounded-full hover:bg-white/20 -mr-2"><X size={18} /></button>
            )}
        </div>
    );
};

const ComposeModal = ({ draft, onSave, onClose, onSend, onDelete }) => {
    const isNewDraft = !draft || !draft.id;
    const [to, setTo] = useState(draft?.to || '');
    const [subject, setSubject] = useState(draft?.subject === '(No Subject)' ? '' : draft?.subject || '');
    const [body, setBody] = useState(draft?.body || '');
    const [securityLevel, setSecurityLevel] = useState(draft?.securityLevel || 'level1');
    const [ephemeral, setEphemeral] = useState(draft?.ephemeralSettings?.enabled || false);
    const [ephemeralDuration, setEphemeralDuration] = useState(draft?.ephemeralSettings?.duration || '5m');


    const createDraftObject = () => ({
        ...draft,
        id: draft?.id || `draft-${Date.now()}`,
        to,
        subject: subject || '(No Subject)',
        body,
        timestamp: new Date().toISOString(),
        status: 'draft',
        securityLevel: securityLevel,
        ephemeralSettings: { enabled: ephemeral, duration: ephemeralDuration }
    });

    const handleSave = () => {
        onSave(createDraftObject());
        onClose();
    };

    const handleSend = () => {
        onSend(createDraftObject());
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-40 flex justify-end items-end">
            <div className="bg-white dark:bg-gray-800 w-full max-w-2xl h-[70%] rounded-t-lg shadow-2xl flex flex-col">
                <header className="bg-gray-100 dark:bg-gray-700 px-4 py-2 flex justify-between items-center rounded-t-lg">
                    <h2 className="font-semibold text-gray-800 dark:text-gray-100">{isNewDraft ? 'New Message' : 'Edit Draft'}</h2>
                    <button onClick={onClose} className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full"><X size={20} /></button>
                </header>
                <div className="p-4 flex flex-col flex-grow overflow-y-auto">
                    <input type="text" value={to} onChange={e => setTo(e.target.value)} placeholder="To" className="w-full p-2 border-b dark:border-gray-700 bg-transparent dark:text-white focus:outline-none focus:border-blue-500" />
                    <input type="text" value={subject} onChange={e => setSubject(e.target.value)} placeholder="Subject" className="w-full p-2 border-b dark:border-gray-700 bg-transparent dark:text-white focus:outline-none focus:border-blue-500 font-medium" />
                    <textarea value={body} onChange={e => setBody(e.target.value)} className="w-full flex-grow p-2 mt-2 bg-transparent dark:text-gray-300 focus:outline-none resize-none" placeholder="Your message..."></textarea>
                </div>
                <footer className="p-4 border-t dark:border-gray-700">
                    <div className="flex items-center justify-between flex-wrap gap-y-2">
                        {/* Left Side: Primary Actions */}
                        <div className="flex items-center gap-2">
                            <button className="bg-blue-600 text-white font-bold py-2 px-5 rounded-md shadow-md hover:bg-blue-700 flex items-center gap-2" onClick={handleSend}>
                                <Send size={16} />
                                <span>Send</span>
                            </button>
                            <button onClick={handleSave} className="py-2 px-4 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md" title="Save Draft">
                                Save
                            </button>
                            <button title="Attach files" className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"><Paperclip size={20} /></button>
                        </div>

                        {/* Right Side: Secondary Actions & Settings */}
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            {/* Security Dropdown */}
                            <div className="relative">
                                <select value={securityLevel} onChange={e => setSecurityLevel(e.target.value)} className="pl-8 pr-3 py-2 text-sm appearance-none bg-transparent border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" title="Set Security Level">
                                    {Object.entries(SECURITY_LEVELS).map(([key, { name }]) => (<option key={key} value={key}>{name}</option>))}
                                </select>
                                <Shield size={16} className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>

                            {/* Ephemeral Toggle & Time Selector */}
                            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
                                <button onClick={() => setEphemeral(!ephemeral)} title={ephemeral ? 'Disable Ephemeral Mode' : 'Enable Ephemeral Mode'} className={`p-2 rounded-l-md ${ephemeral ? 'bg-orange-100 text-orange-500 dark:bg-orange-900/50 dark:text-orange-400' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
                                    <Flame size={18} />
                                </button>
                                {ephemeral && (
                                    <select value={ephemeralDuration} onChange={e => setEphemeralDuration(e.target.value)} className="pl-2 pr-2 py-1.5 text-sm appearance-none bg-transparent focus:outline-none h-full border-l border-gray-300 dark:border-gray-600">
                                        {Object.entries(EPHEMERAL_DURATIONS).map(([key, value]) => (<option key={key} value={key}>{value}</option>))}
                                    </select>
                                )}
                            </div>

                            {/* Discard Button */}
                            <button
                                onClick={() => onDelete(draft?.id)}
                                className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500 rounded-full"
                                title="Discard Draft">
                                <Trash2 size={20} />
                            </button>

                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};


// --- MAIN PAGE COMPONENT ---
const DraftsPage = () => {
    const [drafts, setDrafts] = useState(initialDrafts);
    const [sentItems, setSentItems] = useState([]);
    const [selectedDraft, setSelectedDraft] = useState(null);
    const [editingDraft, setEditingDraft] = useState(null);
    const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 });
    const [toastConfig, setToastConfig] = useState({ visible: false });

    const showToast = (message, type, persistent = false, duration = 4000) => {
        setToastConfig({ visible: true, message, type, persistent });
        if (!persistent) {
            setTimeout(() => setToastConfig({ visible: false }), duration);
        }
    };

    const updateDraftStatus = (draftId, newStatus) => {
        setDrafts(prevDrafts => prevDrafts.map(d => d.id === draftId ? { ...d, status: newStatus } : d));
    };

    const handleSendProcess = (draftToSend) => {
        handleSaveDraft(draftToSend);
        const draftId = draftToSend.id;

        updateDraftStatus(draftId, 'sending_handshake');
        showToast('⚛️ Establishing secure quantum key...', 'info', true);

        setTimeout(() => {
            if (Math.random() < 0.2) {
                updateDraftStatus(draftId, 'failed_eavesdrop');
                showToast('⚠️ SECURITY ALERT! Send failed.', 'error', true);
                return;
            }

            updateDraftStatus(draftId, 'sending_encrypting');
            showToast('✅ Key established. Encrypting and sending...', 'success', true);

            setTimeout(() => {
                showToast('✅ Message Sent Securely.', 'success');
                const existingSentItems = JSON.parse(localStorage.getItem('qumail_sent_items')) || [];

                // 2. Add the newly sent draft to the array
                // We change its status to 'sent' and update the timestamp
                const newSentItem = { ...draftToSend, status: 'sent', timestamp: new Date().toISOString() };
                const updatedSentItems = [newSentItem, ...existingSentItems];

                // 3. Save the updated array back to localStorage
                localStorage.setItem('qumail_sent_items', JSON.stringify(updatedSentItems));
                // *** MODIFICATION END ***

                // 4. Remove the draft from the drafts list
                setDrafts(prev => prev.filter(d => d.id !== draftId));
            }, 2500);
        }, 3000);
    };

    const handleCreateNewDraft = () => setEditingDraft({});
    const closeContextMenu = () => setContextMenu({ ...contextMenu, visible: false });

    const handleContextMenu = (e, draft) => {
        e.preventDefault();
        setSelectedDraft(draft);
        setContextMenu({ visible: true, x: e.pageX, y: e.pageY });
    };

    useEffect(() => {
        window.addEventListener('click', closeContextMenu);
        return () => window.removeEventListener('click', closeContextMenu);
    }, []);

    const handleAction = (action, payload) => {
        if (!selectedDraft) return;
        switch (action) {
            case 'edit': setEditingDraft(selectedDraft); break;
            case 'delete': setDrafts(drafts.filter(d => d.id !== selectedDraft.id)); break;
            case 'send': handleSendProcess(selectedDraft); break;
            case 'toggle-ephemeral':
                setDrafts(drafts.map(d =>
                    d.id === selectedDraft.id
                        ? { ...d, ephemeralSettings: { ...d.ephemeralSettings, enabled: !d.ephemeralSettings.enabled } }
                        : d
                ));
                setSelectedDraft(d => ({ ...d, ephemeralSettings: { ...d.ephemeralSettings, enabled: !d.ephemeralSettings.enabled } }));
                break;
            case 'set-security-level':
                setDrafts(drafts.map(d =>
                    d.id === selectedDraft.id ? { ...d, securityLevel: payload } : d
                ));
                break;
        }
        if (action !== 'set-security-level') {
            closeContextMenu();
        }
    };

    const handleSaveDraft = (updatedDraft) => {
        const index = drafts.findIndex(d => d.id === updatedDraft.id);
        if (index > -1) {
            setDrafts(drafts.map(d => d.id === updatedDraft.id ? updatedDraft : d));
        } else {
            setDrafts([updatedDraft, ...drafts]);
        }
    };

    const getStatusIndicator = (status) => {
        switch (status) {
            case 'sending_handshake': return <span className="flex items-center gap-2 text-blue-500"><Loader size={16} className="animate-spin" />Handshake...</span>;
            case 'sending_encrypting': return <span className="flex items-center gap-2 text-green-500"><Shield size={16} />Encrypting...</span>;
            case 'failed_eavesdrop': return <span className="flex items-center gap-2 text-red-500 font-bold"><AlertTriangle size={16} />Send Failed</span>;
            default: return <span className="text-gray-500">Draft</span>;
        }
    };

    const handleDeleteDraft = (draftId) => {
        // If there's no ID, it's a new draft that hasn't been saved. Just close the modal.
        if (!draftId) {
            setEditingDraft(null);
            return;
        }
        // If there is an ID, remove the draft from the state array.
        setDrafts(prevDrafts => prevDrafts.filter(d => d.id !== draftId));
        // Close the modal.
        setEditingDraft(null);
    };

    const isActionable = (status) => status === 'draft' || status === 'failed_eavesdrop';
    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

    return (
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

            {isFeedbackModalOpen && (
                <FeedbackModal onClose={() => setIsFeedbackModalOpen(false)} />
            )}
            <div className="flex-1 flex overflow-hidden">
                <EmailSidebar draftCount={drafts.length} />
                <main className="flex-1 flex flex-col overflow-hidden relative">
                    <div className="border-b border-gray-200 dark:border-gray-800 px-6 py-3"><h1 className="text-2xl font-bold">Drafts</h1></div>
                    <div className="flex-1 overflow-y-auto">
                        <table className="min-w-full text-sm">
                            <thead className="sticky top-0 bg-gray-50 dark:bg-gray-800/50 backdrop-blur-sm z-10">
                                <tr>
                                    <th className="px-3 py-2 text-center font-semibold" title="Security Level"><Shield size={16} /></th>
                                    <th className="px-6 py-2 text-left font-semibold">To</th>
                                    <th className="px-6 py-2 text-left font-semibold">Subject & Preview</th>
                                    <th className="px-6 py-2 text-left font-semibold">Status</th>
                                    <th className="px-6 py-2 text-right font-semibold">Last Modified</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                                {drafts.map(draft => (
                                    <tr key={draft.id}
                                        onContextMenu={e => handleContextMenu(e, draft)}
                                        onClick={() => isActionable(draft.status) && setEditingDraft(draft)}
                                        className={`${isActionable(draft.status) ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800' : 'opacity-60 cursor-not-allowed'}`}>
                                        <td className="px-3 py-3 text-center" title={SECURITY_LEVELS[draft.securityLevel]?.name || 'Unknown Security'}>
                                            {React.createElement(SECURITY_LEVELS[draft.securityLevel]?.icon || AlertTriangle, {
                                                size: 18,
                                                className: draft.securityLevel === 'level4' ? 'text-yellow-500' : 'text-gray-400'
                                            })}
                                        </td>
                                        <td className="px-6 py-3 whitespace-nowrap"><span className="font-medium">{draft.to || <span className="text-gray-500 italic">No Recipient</span>}</span></td>
                                        <td className="px-6 py-3">
                                            <div className="flex items-center gap-2">
                                                <span className="text-red-500 font-semibold">[Draft]</span>
                                                {draft.ephemeralSettings.enabled && <span title={`Ephemeral: ${EPHEMERAL_DURATIONS[draft.ephemeralSettings.duration]}`}>🔥</span>}
                                                <span className="font-semibold">{draft.subject}</span>
                                                <span className="text-gray-500 dark:text-gray-400 truncate"> - {draft.body.substring(0, 50)}...</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-3 whitespace-nowrap">{getStatusIndicator(draft.status)}</td>
                                        <td className="px-6 py-3 text-right whitespace-nowrap text-gray-500 dark:text-gray-400">{new Date(draft.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <button onClick={handleCreateNewDraft} title="Create New Draft" className="absolute bottom-6 right-6 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-110"><Plus size={24} /></button>
                </main>
            </div>
            <ContextMenu {...contextMenu} draft={selectedDraft} onAction={handleAction} isSending={selectedDraft && !isActionable(selectedDraft.status)} />
            {editingDraft && (<ComposeModal draft={editingDraft} onClose={() => setEditingDraft(null)} onSave={handleSaveDraft} onSend={handleSendProcess} onDelete={handleDeleteDraft} />)}
            <ToastNotification config={toastConfig} onClose={() => setToastConfig({ visible: false })} />
            <SecurityStatusBar />
        </div>
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
export default DraftsPage;

