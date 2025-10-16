import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Download, CheckCircle2, AlertTriangle, Info, Shield } from "lucide-react";

interface AuditEvent {
  id: string;
  type: "success" | "warning" | "info" | "error";
  message: string;
  timestamp: string;
  details?: string;
}

const mockEvents: AuditEvent[] = [
  {
    id: "1",
    type: "success",
    message: "Key established with bob@example.com",
    timestamp: "2025-10-14 14:23:15",
    details: "IP: 192.168.1.10",
  },
  {
    id: "2",
    type: "warning",
    message: "Eavesdropping attempt detected & blocked during key exchange with charlie@example.com",
    timestamp: "2025-10-14 14:15:42",
    details: "IP: 203.0.113.42 (Flagged)",
  },
  {
    id: "3",
    type: "success",
    message: "Quantum-secured message sent to alice@example.com",
    timestamp: "2025-10-14 13:45:30",
    details: "IP: 192.168.1.10",
  },
  {
    id: "4",
    type: "info",
    message: "Ephemeral message auto-destructed after viewing",
    timestamp: "2025-10-14 13:30:18",
    details: "Recipient: david@example.com",
  },
  {
    id: "5",
    type: "success",
    message: "Device authenticated from Mumbai, IN",
    timestamp: "2025-10-14 12:00:00",
    details: "IP: 103.21.244.35",
  },
  {
    id: "6",
    type: "warning",
    message: "Failed login attempt detected",
    timestamp: "2025-10-14 11:23:45",
    details: "IP: 198.51.100.24 (Blocked)",
  },
];

export function AuditTrailTab() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");

  const getEventIcon = (type: AuditEvent["type"]) => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case "error":
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case "info":
        return <Info className="w-5 h-5 text-blue-500" />;
      default:
        return <Shield className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (event.details?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    const matchesFilter = filterType === "all" || 
                         (filterType === "alerts" && (event.type === "warning" || event.type === "error")) ||
                         (filterType === "success" && event.type === "success");
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-4">
      {/* Filter and Search Controls */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by recipient or IP..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Events</SelectItem>
                <SelectItem value="alerts">Alerts Only</SelectItem>
                <SelectItem value="success">Successes</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Export as CSV
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Event List */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-3">
            {filteredEvents.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No events found matching your criteria
              </div>
            ) : (
              filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-start gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                >
                  <div className="mt-0.5">{getEventIcon(event.type)}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{event.message}</p>
                    {event.details && (
                      <p className="text-xs text-muted-foreground mt-1">{event.details}</p>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground whitespace-nowrap">
                    {event.timestamp}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
