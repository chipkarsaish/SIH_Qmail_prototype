import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export function SettingsTab() {
  const { toast } = useToast();
  const [encryptionLevel, setEncryptionLevel] = useState("quantum");
  const [notifications, setNotifications] = useState({
    keyExchange: true,
    threats: true,
    ephemeralExpiry: false,
    securityUpdates: true,
  });

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your security preferences have been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Default Security */}
      <Card>
        <CardHeader>
          <CardTitle>Default Security</CardTitle>
          <CardDescription>
            Choose the default encryption level for new emails
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="encryption">Encryption Level</Label>
            <Select value={encryptionLevel} onValueChange={setEncryptionLevel}>
              <SelectTrigger id="encryption">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="quantum">⚛️ Quantum-Secured (Recommended)</SelectItem>
                <SelectItem value="standard">🔒 Standard Encryption</SelectItem>
                <SelectItem value="none">📧 No Encryption</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Quantum-secured emails use advanced encryption that protects against future quantum computing attacks
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Ephemeral Messages */}
      <Card>
        <CardHeader>
          <CardTitle>Ephemeral Messages</CardTitle>
          <CardDescription>
            Configure self-destructing message settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ephemeral-time">Default Self-Destruct Timer</Label>
            <Select defaultValue="5">
              <SelectTrigger id="ephemeral-time">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 minute</SelectItem>
                <SelectItem value="5">5 minutes</SelectItem>
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="60">1 hour</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="confirm-destruct" defaultChecked />
            <Label htmlFor="confirm-destruct" className="text-sm font-normal cursor-pointer">
              Require confirmation before sending ephemeral messages
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>
            Manage security alert preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="notif-key" 
                checked={notifications.keyExchange}
                onCheckedChange={(checked) => 
                  setNotifications(prev => ({ ...prev, keyExchange: checked as boolean }))
                }
              />
              <Label htmlFor="notif-key" className="text-sm font-normal cursor-pointer">
                Notify me when quantum keys are exchanged
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="notif-threats" 
                checked={notifications.threats}
                onCheckedChange={(checked) => 
                  setNotifications(prev => ({ ...prev, threats: checked as boolean }))
                }
              />
              <Label htmlFor="notif-threats" className="text-sm font-normal cursor-pointer">
                Alert me immediately when threats are detected
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="notif-ephemeral" 
                checked={notifications.ephemeralExpiry}
                onCheckedChange={(checked) => 
                  setNotifications(prev => ({ ...prev, ephemeralExpiry: checked as boolean }))
                }
              />
              <Label htmlFor="notif-ephemeral" className="text-sm font-normal cursor-pointer">
                Remind me before ephemeral messages expire
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="notif-updates" 
                checked={notifications.securityUpdates}
                onCheckedChange={(checked) => 
                  setNotifications(prev => ({ ...prev, securityUpdates: checked as boolean }))
                }
              />
              <Label htmlFor="notif-updates" className="text-sm font-normal cursor-pointer">
                Receive security protocol updates and announcements
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} size="lg" className="gap-2">
          Save Changes
        </Button>
      </div>
    </div>
  );
}
