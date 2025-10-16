import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, AlertTriangle, Key, Mail, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function DashboardTab() {
  const navigate = useNavigate();

  const recentEvents = [
    { type: "success", message: "Key established with bob@example.com", time: "2 minutes ago" },
    { type: "warning", message: "Eavesdropping attempt blocked", time: "15 minutes ago" },
    { type: "success", message: "Secure message sent to alice@example.com", time: "1 hour ago" },
  ];

  return (
    <div className="space-y-6">
      {/* Overall Status Card */}
      <Card className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20 border-emerald-200 dark:border-emerald-800">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center">
              <Shield className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">
                Your Account is Secure
              </h2>
              <p className="text-sm text-emerald-700 dark:text-emerald-300">
                All quantum security protocols are active and functioning normally
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/40 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Threats Blocked
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">3</div>
            <p className="text-xs text-muted-foreground mt-1">
              Eavesdropping Attempts Neutralized
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-quantum/20 flex items-center justify-center">
                <Key className="w-5 h-5 text-quantum" />
              </div>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Secure Keys
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">47</div>
            <p className="text-xs text-muted-foreground mt-1">
              Successful Key Exchanges (Last 30 Days)
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Secure Messages
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">156</div>
            <p className="text-xs text-muted-foreground mt-1">
              Total Quantum-Secured Messages
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Activity</CardTitle>
            <button 
              onClick={() => navigate('/security-center?tab=audit')}
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              View Full Trail <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentEvents.map((event, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <div className={`w-2 h-2 rounded-full mt-1.5 ${
                  event.type === 'success' ? 'bg-emerald-500' : 'bg-amber-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm text-foreground">{event.message}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{event.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
