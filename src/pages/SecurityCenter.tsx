import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Settings, HelpCircle, User, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DashboardTab } from "@/components/security/DashboardTab";
import { AuditTrailTab } from "@/components/security/AuditTrailTab";
import { SettingsTab } from "@/components/security/SettingsTab";
import { DeviceManagementTab } from "@/components/security/DeviceManagementTab";
import { SecurityStatusBar } from "@/components/SecurityStatusBar";
import qumailLogo from '../assets/new.png';

const SecurityCenter = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");

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

      {/* Secondary Toolbar */}
      <div className="bg-card border-b border-border px-4 py-2 flex items-center gap-2">
        <button 
          onClick={() => navigate('/index')}
          className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-semibold">Back to Inbox</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden bg-background">
        <div className="h-full p-6 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <span className="text-4xl">🛡️</span>
                <span className="absolute -top-1 -right-1 text-xl">⚛️</span>
              </div>
              <h1 className="text-3xl font-bold text-foreground">Security Center</h1>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="audit">Audit Trail</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
                <TabsTrigger value="devices">Device Management</TabsTrigger>
              </TabsList>

              <TabsContent value="dashboard" className="mt-0">
                <DashboardTab />
              </TabsContent>

              <TabsContent value="audit" className="mt-0">
                <AuditTrailTab />
              </TabsContent>

              <TabsContent value="settings" className="mt-0">
                <SettingsTab />
              </TabsContent>

              <TabsContent value="devices" className="mt-0">
                <DeviceManagementTab />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Security Status Bar */}
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

export default SecurityCenter;
