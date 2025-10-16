import { CheckCircle, AlertTriangle, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";

interface SecurityEvent {
  id: string;
  message: string;
  type: "success" | "warning" | "info";
  timestamp: Date;
}

const initialEvents: SecurityEvent[] = [
  {
    id: "1",
    message: "Key established with bob@example.com",
    type: "success",
    timestamp: new Date(Date.now() - 45000),
  },
  {
    id: "2",
    message: "Eavesdropping attempt detected & blocked during key exchange with charlie@example.com",
    type: "warning",
    timestamp: new Date(Date.now() - 120000),
  },
];

export function SecurityStatusBar() {
  const [events, setEvents] = useState<SecurityEvent[]>(initialEvents);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    // Simulate periodic security checks
    const interval = setInterval(() => {
      setIsChecking(true);
      setTimeout(() => {
        setIsChecking(false);
        // Randomly add new events
        if (Math.random() > 0.7) {
          const newEvent: SecurityEvent = {
            id: Date.now().toString(),
            message: "Security scan completed - All systems secure",
            type: "success",
            timestamp: new Date(),
          };
          setEvents((prev) => [newEvent, ...prev].slice(0, 5));
        }
      }, 1500);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="border-t border-border bg-card px-4 py-2">
      <div className="flex items-center gap-4 text-xs">
        <span className="font-semibold text-muted-foreground">
          Security Audit Trail:
        </span>
        
        <div className="flex-1 flex items-center gap-6 overflow-x-auto">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              {event.type === "success" && (
                <CheckCircle className="w-3.5 h-3.5 text-alert-success flex-shrink-0" />
              )}
              {event.type === "warning" && (
                <AlertTriangle className="w-3.5 h-3.5 text-alert-warning flex-shrink-0" />
              )}
              <span
                className={
                  event.type === "success"
                    ? "text-alert-success"
                    : event.type === "warning"
                    ? "text-alert-warning"
                    : "text-muted-foreground"
                }
              >
                {event.message}
              </span>
            </div>
          ))}
          
          {isChecking && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Checking for new alerts...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
