"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings,
  Bell,
  Shield,
  Palette,
  Globe,
  User,
  Save,
  RotateCcw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { getProfile, updateProfile } from '@/lib/supabase';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/integrations/supabase/client';

interface Profile {
  id: string;
  username: string;
  avatar_url: string | null;
  updated_at: string;
  onboarding_complete: boolean;
}

const SettingsPage = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [moderation, setModeration] = useState(true);
  const [language, setLanguage] = useState("en");
  const [theme, setTheme] = useState("dark");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const searchParams = useSearchParams();
  const guildId = searchParams.get('guild');

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      
      const data = await getProfile(session.user.id);
      if (data) {
        setProfile(data);
        setUsername(data.username || "");
        // Bio não está no perfil, mas poderia ser adicionado
        setBio("");
      }
      setLoading(false);
    };
    
    fetchProfile();
  }, []);

  const handleSave = async () => {
    if (!profile) return;
    
    setSaving(true);
    const success = await updateProfile(profile.id, {
      username: username
    });
    
    if (success) {
      // Atualizar o perfil localmente
      setProfile({ ...profile, username: username });
    }
    
    setSaving(false);
  };

  const handleReset = () => {
    if (profile) {
      setUsername(profile.username || "");
      setBio("");
    }
    setNotifications(true);
    setModeration(true);
    setLanguage("en");
    setTheme("dark");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5865F2]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-black text-white tracking-tight mb-2">Settings.</h1>
        <p className="text-white/40 font-medium">Customize your dashboard and bot preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-[#141417] rounded-[2rem] border border-white/5 p-6">
            <div className="space-y-2">
              {[
                { id: "general", label: "General", icon: Settings },
                { id: "notifications", label: "Notifications", icon: Bell },
                { id: "moderation", label: "Moderation", icon: Shield },
                { id: "appearance", label: "Appearance", icon: Palette },
                { id: "language", label: "Language", icon: Globe },
                { id: "profile", label: "Profile", icon: User }
              ].map((item) => (
                <button
                  key={item.id}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-white/40 hover:text-white hover:bg-white/5 transition-all group"
                >
                  <item.icon size={20} className="group-hover:text-[#5865F2] transition-colors" />
                  <span className="text-sm font-bold">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* General Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#141417] rounded-[2rem] border border-white/5 p-6"
          >
            <h2 className="text-xl font-black text-white tracking-tight mb-6">General Settings</h2>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5">
                <div>
                  <h3 className="font-bold text-white">Enable Notifications</h3>
                  <p className="text-white/40 text-sm mt-1">Receive alerts for important events</p>
                </div>
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              </div>
              
              <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5">
                <div>
                  <h3 className="font-bold text-white">Auto Moderation</h3>
                  <p className="text-white/40 text-sm mt-1">Automatically moderate messages</p>
                </div>
                <Switch checked={moderation} onCheckedChange={setModeration} />
              </div>
              
              <div className="space-y-2">
                <Label className="text-white font-bold">Language</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="bg-[#1A1A1E] border border-white/5 rounded-2xl text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1A1A1E] border border-white/5 rounded-2xl">
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label className="text-white font-bold">Theme</Label>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger className="bg-[#1A1A1E] border border-white/5 rounded-2xl text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1A1A1E] border border-white/5 rounded-2xl">
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </motion.div>

          {/* Profile Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#141417] rounded-[2rem] border border-white/5 p-6"
          >
            <h2 className="text-xl font-black text-white tracking-tight mb-6">Profile Settings</h2>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-white font-bold">Username</Label>
                <Input 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-[#1A1A1E] border border-white/5 rounded-2xl text-white"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-white font-bold">Bio</Label>
                <Textarea 
                  value={bio} 
                  onChange={(e) => setBio(e.target.value)}
                  className="bg-[#1A1A1E] border border-white/5 rounded-2xl text-white min-h-[120px]"
                />
              </div>
            </div>
          </motion.div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4">
            <Button 
              onClick={handleSave}
              disabled={saving}
              className="h-12 px-8 rounded-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold"
            >
              {saving ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <>
                  <Save size={18} className="mr-2" />
                  Save Changes
                </>
              )}
            </Button>
            
            <Button 
              onClick={handleReset}
              variant="outline"
              className="h-12 px-8 rounded-full border border-white/10 bg-[#1A1A1E] text-white hover:bg-white/5 font-bold"
            >
              <RotateCcw size={18} className="mr-2" />
              Reset Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;