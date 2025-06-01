import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { UserCircle, Mail, Target, Weight, TrendingUp, Save } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';

const ProfilePage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    goal: 'Weight Loss',
    currentWeight: '85',
    targetWeight: '75',
    activityLevel: 'Moderate',
  });

  useEffect(() => {
    if (user) {
      const savedProfile = localStorage.getItem(`userProfile_${user.id}`);
      if (savedProfile) {
        setProfile(JSON.parse(savedProfile));
      } else {
        setProfile(prev => ({
          ...prev,
          name: user.name || '',
          email: user.email || '',
        }));
      }
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user) {
      localStorage.setItem(`userProfile_${user.id}`, JSON.stringify(profile));
      toast({
        title: "Profile Updated! ✨",
        description: "Your profile information has been saved successfully.",
        variant: "default",
        duration: 3000,
        className: "bg-primary text-primary-foreground"
      });
    } else {
       toast({
        title: "Error",
        description: "You must be logged in to update your profile.",
        variant: "destructive",
      });
    }
  };


  return (
    <motion.div 
      className="max-w-3xl mx-auto space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <header className="text-center">
        <h1 className="text-4xl font-bold gradient-text">Your Profile</h1>
        <p className="text-lg text-muted-foreground mt-2">Manage your personal information and fitness goals.</p>
      </header>

      <Card className="bg-card border-border text-card-foreground shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-foreground flex items-center">
            <UserCircle className="mr-3 h-7 w-7 text-primary" /> Personal Information
          </CardTitle>
          <CardDescription className="text-muted-foreground">Keep your personal details up to date.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name" className="text-muted-foreground">Full Name</Label>
                <div className="relative mt-1">
                  <UserCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground/70" />
                  <Input 
                    id="name" 
                    name="name"
                    type="text" 
                    value={profile.name} 
                    onChange={handleChange} 
                    className="pl-10 bg-input border-border text-foreground focus:ring-ring" 
                    placeholder="Your Name"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email" className="text-muted-foreground">Email Address</Label>
                 <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground/70" />
                  <Input 
                    id="email" 
                    name="email"
                    type="email" 
                    value={profile.email} 
                    onChange={handleChange} 
                    className="pl-10 bg-input border-border text-foreground focus:ring-ring" 
                    placeholder="your@email.com"
                    readOnly={!!user} 
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-foreground flex items-center mt-6 mb-4">
                <Target className="mr-3 h-6 w-6 text-primary" /> Fitness Goals
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="goal" className="text-muted-foreground">Primary Goal</Label>
                  <Input id="goal" name="goal" value={profile.goal} onChange={handleChange} className="bg-input border-border text-foreground focus:ring-ring" placeholder="e.g., Weight Loss, Muscle Gain"/>
                </div>
                <div>
                  <Label htmlFor="activityLevel" className="text-muted-foreground">Activity Level</Label>
                  <Input id="activityLevel" name="activityLevel" value={profile.activityLevel} onChange={handleChange} className="bg-input border-border text-foreground focus:ring-ring" placeholder="e.g., Sedentary, Light, Moderate, Active"/>
                </div>
                <div>
                  <Label htmlFor="currentWeight" className="text-muted-foreground">Current Weight (kg)</Label>
                  <div className="relative mt-1">
                    <Weight className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground/70" />
                    <Input id="currentWeight" name="currentWeight" type="number" value={profile.currentWeight} onChange={handleChange} className="pl-10 bg-input border-border text-foreground focus:ring-ring" placeholder="e.g., 80"/>
                  </div>
                </div>
                <div>
                  <Label htmlFor="targetWeight" className="text-muted-foreground">Target Weight (kg)</Label>
                  <div className="relative mt-1">
                    <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground/70" />
                    <Input id="targetWeight" name="targetWeight" type="number" value={profile.targetWeight} onChange={handleChange} className="pl-10 bg-input border-border text-foreground focus:ring-ring" placeholder="e.g., 70"/>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end pt-4">
              <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3" disabled={!user}>
                <Save className="mr-2 h-5 w-5" /> Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProfilePage;