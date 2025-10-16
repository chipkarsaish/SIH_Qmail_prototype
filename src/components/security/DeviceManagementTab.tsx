import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Monitor, Smartphone, Tablet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Device {
  id: string;
  type: "desktop" | "mobile" | "tablet";
  name: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
}

const mockDevices: Device[] = [
  {
    id: "1",
    type: "desktop",
    name: "Windows Desktop",
    location: "Mumbai, IN",
    lastActive: "Active now",
    isCurrent: true,
  },
  {
    id: "2",
    type: "mobile",
    name: "iPhone 14 Pro",
    location: "Mumbai, IN",
    lastActive: "2 hours ago",
    isCurrent: false,
  },
  {
    id: "3",
    type: "desktop",
    name: "MacBook Pro",
    location: "Delhi, IN",
    lastActive: "Yesterday at 3:42 PM",
    isCurrent: false,
  },
  {
    id: "4",
    type: "tablet",
    name: "iPad Air",
    location: "Bangalore, IN",
    lastActive: "3 days ago",
    isCurrent: false,
  },
];

export function DeviceManagementTab() {
  const { toast } = useToast();

  const getDeviceIcon = (type: Device["type"]) => {
    switch (type) {
      case "desktop":
        return <Monitor className="w-6 h-6 text-primary" />;
      case "mobile":
        return <Smartphone className="w-6 h-6 text-primary" />;
      case "tablet":
        return <Tablet className="w-6 h-6 text-primary" />;
    }
  };

  const handleLogout = (deviceName: string) => {
    toast({
      title: "Device logged out",
      description: `Successfully logged out from ${deviceName}`,
      variant: "default",
    });
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Active Sessions</CardTitle>
          <CardDescription>
            Manage devices that have access to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockDevices.map((device) => (
              <div
                key={device.id}
                className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  {getDeviceIcon(device.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-foreground">{device.name}</h4>
                    {device.isCurrent && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 font-medium">
                        This device
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{device.location}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Last active: {device.lastActive}
                  </p>
                </div>

                <div className="flex-shrink-0">
                  {device.isCurrent ? (
                    <Button variant="outline" disabled>
                      Current Session
                    </Button>
                  ) : (
                    <Button
                      variant="destructive"
                      onClick={() => handleLogout(device.name)}
                    >
                      Log Out
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-1">
                Security Tip
              </h4>
              <p className="text-sm text-amber-800 dark:text-amber-200">
                If you notice any unfamiliar devices, log them out immediately and change your password. 
                All quantum-secured messages are protected even if a device is compromised.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
