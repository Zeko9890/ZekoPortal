"use client";

import React, { useState } from "react";
import { 
  User, 
  Settings as SettingsIcon, 
  Bell, 
  Globe, 
  ShieldCheck, 
  Mail, 
  Check, 
  AlertCircle,
  Building,
  UserCheck
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockUserProfile } from "@/lib/mock-data";
import { cn } from "@/lib/utils";


export default function SettingsPage() {
  const [profile, setProfile] = useState(mockUserProfile);
  const [isSaved, setIsSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
    }, 3000);
  };

  const toggleNotification = (key: keyof typeof mockUserProfile.notifications) => {
    setProfile(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key]
      }
    }));
  };

  const handleProfileChange = (key: keyof typeof mockUserProfile, value: string) => {
    setProfile(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header section */}
      <div>
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">Portal Settings</h2>
        <p className="text-xs md:text-sm text-muted-foreground">
          Manage your personal identity, team details, and notification thresholds.
        </p>
      </div>

      {/* Success alert banner */}
      {isSaved && (
        <div className="flex items-center gap-2.5 p-3 rounded-lg border border-emerald-500/20 bg-emerald-500/5 text-xs text-emerald-400 animate-in fade-in duration-200">
          <Check className="h-4 w-4 shrink-0" />
          <span className="font-semibold">Settings successfully updated.</span> Changes are synchronized across your team portal.
        </div>
      )}

      {/* Tabs Layout */}
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="bg-zinc-900/60 p-1 border border-border rounded-lg">
          <TabsTrigger value="profile" className="cursor-pointer gap-1.5 flex items-center">
            <User className="h-3.5 w-3.5" />
            <span>Profile settings</span>
          </TabsTrigger>
          <TabsTrigger value="preferences" className="cursor-pointer gap-1.5 flex items-center">
            <SettingsIcon className="h-3.5 w-3.5" />
            <span>System preferences</span>
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Profile Settings */}
        <TabsContent value="profile" className="space-y-4">
          <form onSubmit={handleProfileSave} className="rounded-xl border border-border bg-card p-6 shadow space-y-6">
            
            {/* Avatar section */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4.5 pb-6 border-b border-border/40">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={profile.avatar}
                alt={profile.name}
                className="h-16 w-16 rounded-full border border-border object-cover"
              />
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-white">Profile Avatar</h4>
                <p className="text-[10px] text-muted-foreground">JPG, PNG, or GIF. Max size of 800K.</p>
                <div className="flex gap-2.5 pt-1">
                  <Button type="button" size="sm" variant="outline" className="h-7 text-[10px] px-2.5 hover:bg-zinc-900 cursor-pointer">
                    Change Photo
                  </Button>
                  <Button type="button" size="sm" variant="ghost" className="h-7 text-[10px] text-red-400 hover:text-red-300 px-2.5 hover:bg-red-500/10 cursor-pointer">
                    Delete
                  </Button>
                </div>
              </div>
            </div>

            {/* Inputs grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <UserCheck className="h-3 w-3" /> Full Name
                </label>
                <Input
                  type="text"
                  required
                  value={profile.name}
                  onChange={(e) => handleProfileChange("name", e.target.value)}
                  className="bg-zinc-900/60 border-border/80 h-9.5"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <Mail className="h-3 w-3" /> Email Address
                </label>
                <Input
                  type="email"
                  required
                  value={profile.email}
                  onChange={(e) => handleProfileChange("email", e.target.value)}
                  className="bg-zinc-900/60 border-border/80 h-9.5"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <Building className="h-3 w-3" /> Company Name
                </label>
                <Input
                  type="text"
                  required
                  value={profile.company}
                  onChange={(e) => handleProfileChange("company", e.target.value)}
                  className="bg-zinc-900/60 border-border/80 h-9.5"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <Globe className="h-3 w-3" /> Timezone
                </label>
                <Input
                  type="text"
                  required
                  value={profile.timezone}
                  onChange={(e) => handleProfileChange("timezone", e.target.value)}
                  className="bg-zinc-900/60 border-border/80 h-9.5"
                />
              </div>
            </div>

            {/* Save trigger */}
            <div className="flex justify-end pt-3">
              <Button type="submit" className="h-9 px-6 font-semibold cursor-pointer text-xs">
                Save Profile Changes
              </Button>
            </div>
          </form>
        </TabsContent>

        {/* Tab 2: System Preferences */}
        <TabsContent value="preferences" className="space-y-4">
          <div className="rounded-xl border border-border bg-card p-6 shadow space-y-6">
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Bell className="h-4 w-4 text-primary animate-pulse-slow" />
                Notification Subscriptions
              </h3>
              <p className="text-[10px] text-muted-foreground">Select which notifications you want sent to email and push channels.</p>
            </div>

            <div className="space-y-4 divide-y divide-border/40">
              
              {/* Notification Item 1 */}
              <div className="flex items-center justify-between py-3 first:pt-0">
                <div className="space-y-0.5 max-w-[80%]">
                  <h4 className="text-xs font-semibold text-white">Project Milestones Alerts</h4>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">Receive updates immediately when wireframes or code integrations are marked complete by Zeko developers.</p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleNotification("projectUpdates")}
                  className={cn(
                    "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                    profile.notifications.projectUpdates ? "bg-primary" : "bg-zinc-800"
                  )}
                >
                  <span className={cn(
                    "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                    profile.notifications.projectUpdates ? "translate-x-4" : "translate-x-0"
                  )} />
                </button>
              </div>

              {/* Notification Item 2 */}
              <div className="flex items-center justify-between py-3">
                <div className="space-y-0.5 max-w-[80%]">
                  <h4 className="text-xs font-semibold text-white">Email Notification Matrix</h4>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">Send an email summary immediately for alerts, new conversation threads or mention tags.</p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleNotification("email")}
                  className={cn(
                    "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                    profile.notifications.email ? "bg-primary" : "bg-zinc-800"
                  )}
                >
                  <span className={cn(
                    "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                    profile.notifications.email ? "translate-x-4" : "translate-x-0"
                  )} />
                </button>
              </div>

              {/* Notification Item 3 */}
              <div className="flex items-center justify-between py-3">
                <div className="space-y-0.5 max-w-[80%]">
                  <h4 className="text-xs font-semibold text-white">Weekly Portal Digest</h4>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">Receive a clean markdown report of project activities and deliverables every Monday morning.</p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleNotification("weeklyDigest")}
                  className={cn(
                    "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                    profile.notifications.weeklyDigest ? "bg-primary" : "bg-zinc-800"
                  )}
                >
                  <span className={cn(
                    "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                    profile.notifications.weeklyDigest ? "translate-x-4" : "translate-x-0"
                  )} />
                </button>
              </div>

            </div>

            {/* Extra details warning */}
            <div className="flex gap-2 p-3.5 rounded-lg border border-border/80 bg-zinc-900/35 text-[10px] text-muted-foreground leading-relaxed">
              <AlertCircle className="h-4 w-4 shrink-0 text-primary mt-0.5" />
              <span>Some notifications are locked in by Skynet administrator settings to comply with SLAs. Contact Lucas Hayes to request system changes.</span>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
