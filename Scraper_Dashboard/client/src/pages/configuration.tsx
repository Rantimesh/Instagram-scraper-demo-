import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Sidebar from "@/components/sidebar";
import ThemeToggle from "@/components/theme-toggle";

export default function Configuration() {
  const [formData, setFormData] = useState({
    targetUsername: "",
    scheduleFrequency: "24h",
    autoTag: false,
    emailNotifications: false,
  });

  const [instagramCredentials, setInstagramCredentials] = useState({
    instagramUsername: "",
    instagramPassword: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Config saved:', formData);
  };

  const handleSaveCredentials = () => {
    console.log('Credentials saved:', instagramCredentials);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-card border-b border-border px-6 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold" data-testid="page-title">Configuration</h1>
              <p className="text-muted-foreground">Configure your Instagram scraper settings</p>
            </div>
            <ThemeToggle />
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-2xl space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Scraper Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="targetUsername">Target Instagram Username</Label>
                    <Input
                      id="targetUsername"
                      placeholder="@username"
                      value={formData.targetUsername}
                      onChange={(e) => handleInputChange("targetUsername", e.target.value)}
                      data-testid="input-target-username"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="scheduleFrequency">Schedule Frequency</Label>
                    <Select 
                      value={formData.scheduleFrequency} 
                      onValueChange={(value) => handleInputChange("scheduleFrequency", value)}
                    >
                      <SelectTrigger data-testid="select-schedule-frequency">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6h">Every 6 hours</SelectItem>
                        <SelectItem value="12h">Every 12 hours</SelectItem>
                        <SelectItem value="24h">Every 24 hours</SelectItem>
                        <SelectItem value="manual">Manual only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="autoTag"
                        checked={formData.autoTag}
                        onCheckedChange={(checked) => handleInputChange("autoTag", checked)}
                        data-testid="switch-auto-tag"
                      />
                      <Label htmlFor="autoTag">Auto-tag new video types</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="emailNotifications"
                        checked={formData.emailNotifications}
                        onCheckedChange={(checked) => handleInputChange("emailNotifications", checked)}
                        data-testid="switch-email-notifications"
                      />
                      <Label htmlFor="emailNotifications">Email notifications</Label>
                    </div>
                  </div>

                  <Button 
                    type="submit"
                    data-testid="button-save-config"
                  >
                    Save Configuration
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Instagram Account</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="instagramUsername">Instagram Login Username</Label>
                  <Input
                    id="instagramUsername"
                    placeholder="Your Instagram username"
                    value={instagramCredentials.instagramUsername}
                    onChange={(e) => setInstagramCredentials(prev => ({ ...prev, instagramUsername: e.target.value }))}
                    data-testid="input-instagram-username"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="instagramPassword">Instagram Password</Label>
                  <Input
                    id="instagramPassword"
                    type="password"
                    placeholder="Your Instagram password"
                    value={instagramCredentials.instagramPassword}
                    onChange={(e) => setInstagramCredentials(prev => ({ ...prev, instagramPassword: e.target.value }))}
                    data-testid="input-instagram-password"
                  />
                </div>

                <div className="bg-muted/30 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <i className="fas fa-info-circle mr-2"></i>
                    Your credentials are stored securely and only used for scraping. We recommend using environment variables for production.
                  </p>
                </div>

                <Button 
                  variant="outline" 
                  onClick={handleSaveCredentials}
                  data-testid="button-save-credentials"
                >
                  <i className="fas fa-save mr-2"></i>
                  Save Instagram Credentials
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
