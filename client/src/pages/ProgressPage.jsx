import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Target, Award, CalendarCheck2, Weight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const progressData = {
  currentWeight: 78, 
  targetWeight: 75,
  weightChangeLastWeek: -0.5,
  caloriesAvg: 1950,
  workoutStreak: 12,
  achievements: [
    { id: 1, name: 'First 5K Run!', date: '2025-05-15', icon: <Award className="text-yellow-400" /> },
    { id: 2, name: '7-Day Workout Streak', date: '2025-05-10', icon: <CalendarCheck2 className="text-green-500 dark:text-green-400" /> },
    { id: 3, name: 'Lost 2kg', date: '2025-05-01', icon: <Weight className="text-blue-500 dark:text-blue-400" /> },
  ]
};

const ProgressStat = ({ label, value, unit, icon, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: delay, duration: 0.5 }}
  >
    <Card className="bg-card border-border text-card-foreground shadow-lg text-center p-4 h-full">
      {React.cloneElement(icon, { className: "h-10 w-10 mx-auto mb-3 text-primary" })}
      <p className="text-2xl font-bold text-foreground">{value} <span className="text-sm text-muted-foreground">{unit}</span></p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </Card>
  </motion.div>
);

const ProgressPage = () => {
  const [measurements, setMeasurements] = useState([]);
  const [currentMeasurement, setCurrentMeasurement] = useState({
    date: new Date().toISOString().split('T')[0],
    weight: '',
    chest: '',
    waist: '',
    hips: '',
    biceps: '',
    thighs: '',
    notes: ''
  });

  const weightProgressPercent = Math.max(0, Math.min(100, 
    ((progressData.currentWeight - progressData.targetWeight) / (85 - progressData.targetWeight)) * 100 
  ));

  const handleAddMeasurement = () => {
    if (currentMeasurement.weight) {
      setMeasurements([...measurements, { ...currentMeasurement, id: Date.now() }]);
      setCurrentMeasurement({
        date: new Date().toISOString().split('T')[0],
        weight: '',
        chest: '',
        waist: '',
        hips: '',
        biceps: '',
        thighs: '',
        notes: ''
      });
    }
  };

  const handlePhotoUpload = (event) => {
    // Handle photo upload logic here
    console.log('Photo uploaded:', event.target.files[0]);
  };

  return (
    <motion.div 
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <header className="text-center">
        <h1 className="text-4xl font-bold gradient-text">Your Progress Hub</h1>
        <p className="text-lg text-muted-foreground mt-2">Track your journey, celebrate milestones, and stay motivated!</p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ProgressStat label="Current Weight" value={progressData.currentWeight} unit="kg" icon={<Weight />} delay={0.1} />
        <ProgressStat label="Target Weight" value={progressData.targetWeight} unit="kg" icon={<Target />} delay={0.2} />
        <ProgressStat label="Avg. Daily Calories" value={progressData.caloriesAvg} unit="kcal" icon={<TrendingUp />} delay={0.3} />
        <ProgressStat label="Workout Streak" value={progressData.workoutStreak} unit="days" icon={<CalendarCheck2 />} delay={0.4} />
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }}>
        <Card className="bg-card border-border text-card-foreground shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl text-foreground">Weight Journey</CardTitle>
            <CardDescription className="text-muted-foreground">Visualizing your path to your target weight.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="flex justify-between text-sm text-muted-foreground mb-1">
                <span>Start: 85 kg</span>
                <span>Current: {progressData.currentWeight} kg</span>
                <span>Target: {progressData.targetWeight} kg</span>
              </div>
              <div className="w-full bg-muted rounded-full h-4">
                <motion.div 
                  className="bg-gradient-to-r from-primary to-accent h-4 rounded-full"
                  initial={{ width: '0%'}}
                  animate={{ width: `${100 - weightProgressPercent}%`}}
                  transition={{ duration: 1, delay: 0.7 }}
                />
              </div>
            </div>
            <p className="text-sm text-center text-muted-foreground">You've made <span className="font-bold text-primary">{ (85 - progressData.currentWeight).toFixed(1) } kg</span> progress towards your goal!</p>
            <div className="mt-6 flex items-center justify-center h-64">
              <img className="w-full h-full object-contain rounded-md" alt="Placeholder for weight progress chart" src="https://images.unsplash.com/photo-1616261167032-b16d2df8333b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5 }}>
        <Card className="bg-card border-border text-card-foreground shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl text-foreground">Achievements & Milestones</CardTitle>
            <CardDescription className="text-muted-foreground">Celebrate your hard-earned victories!</CardDescription>
          </CardHeader>
          <CardContent>
            {progressData.achievements.length > 0 ? (
              <ul className="space-y-4">
                {progressData.achievements.map((ach, index) => (
                  <motion.li 
                    key={ach.id} 
                    className="flex items-center p-4 bg-secondary/30 rounded-lg shadow"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
                  >
                    {React.cloneElement(ach.icon, { className: `h-8 w-8 mr-4 ${ach.icon.props.className}` })}
                    <div>
                      <p className="font-semibold text-foreground">{ach.name}</p>
                      <p className="text-xs text-muted-foreground">Achieved on: {ach.date}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground text-center py-4">No achievements unlocked yet. Keep going!</p>
            )}
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div 
        className="text-center mt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 + progressData.achievements.length * 0.1, duration: 0.5 }}
      >
        <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
          View Detailed Reports
        </Button>
      </motion.div>

      <Tabs defaultValue="measurements" className="w-full">
        <TabsList>
          <TabsTrigger value="measurements">Measurements</TabsTrigger>
          <TabsTrigger value="photos">Progress Photos</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="measurements">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Log Measurements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-4">
                    <div>
                      <Label>Date</Label>
                      <Input
                        type="date"
                        value={currentMeasurement.date}
                        onChange={(e) => setCurrentMeasurement({ ...currentMeasurement, date: e.target.value })}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Weight (kg)</Label>
                        <Input
                          type="number"
                          value={currentMeasurement.weight}
                          onChange={(e) => setCurrentMeasurement({ ...currentMeasurement, weight: e.target.value })}
                          placeholder="Weight"
                        />
                      </div>
                      <div>
                        <Label>Chest (cm)</Label>
                        <Input
                          type="number"
                          value={currentMeasurement.chest}
                          onChange={(e) => setCurrentMeasurement({ ...currentMeasurement, chest: e.target.value })}
                          placeholder="Chest"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Waist (cm)</Label>
                        <Input
                          type="number"
                          value={currentMeasurement.waist}
                          onChange={(e) => setCurrentMeasurement({ ...currentMeasurement, waist: e.target.value })}
                          placeholder="Waist"
                        />
                      </div>
                      <div>
                        <Label>Hips (cm)</Label>
                        <Input
                          type="number"
                          value={currentMeasurement.hips}
                          onChange={(e) => setCurrentMeasurement({ ...currentMeasurement, hips: e.target.value })}
                          placeholder="Hips"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Biceps (cm)</Label>
                        <Input
                          type="number"
                          value={currentMeasurement.biceps}
                          onChange={(e) => setCurrentMeasurement({ ...currentMeasurement, biceps: e.target.value })}
                          placeholder="Biceps"
                        />
                      </div>
                      <div>
                        <Label>Thighs (cm)</Label>
                        <Input
                          type="number"
                          value={currentMeasurement.thighs}
                          onChange={(e) => setCurrentMeasurement({ ...currentMeasurement, thighs: e.target.value })}
                          placeholder="Thighs"
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Notes</Label>
                      <Input
                        value={currentMeasurement.notes}
                        onChange={(e) => setCurrentMeasurement({ ...currentMeasurement, notes: e.target.value })}
                        placeholder="Add notes"
                      />
                    </div>

                    <Button onClick={handleAddMeasurement}>Save Measurements</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {measurements.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Measurement History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {measurements.map(measurement => (
                      <div key={measurement.id} className="p-4 bg-muted rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-medium">{measurement.date}</h3>
                          <span className="text-sm text-muted-foreground">{measurement.weight} kg</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-sm">
                          <p>Chest: {measurement.chest}cm</p>
                          <p>Waist: {measurement.waist}cm</p>
                          <p>Hips: {measurement.hips}cm</p>
                          <p>Biceps: {measurement.biceps}cm</p>
                          <p>Thighs: {measurement.thighs}cm</p>
                        </div>
                        {measurement.notes && (
                          <p className="text-sm text-muted-foreground mt-2">{measurement.notes}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="photos">
          <Card>
            <CardHeader>
              <CardTitle>Progress Photos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <Label>Upload New Photo</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="mt-2"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Take photos in consistent lighting and poses for better comparison
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {/* Photo grid will be populated here */}
                  <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">No photos yet</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Progress Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="weight"
                      stroke="#2563eb"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-lg font-bold text-green-600">-5 kg</p>
                  <p className="text-sm text-muted-foreground">Total Weight Loss</p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-lg font-bold text-blue-600">-8 cm</p>
                  <p className="text-sm text-muted-foreground">Waist Reduction</p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-lg font-bold text-purple-600">+3 cm</p>
                  <p className="text-sm text-muted-foreground">Biceps Gain</p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-lg font-bold text-orange-600">12 weeks</p>
                  <p className="text-sm text-muted-foreground">Time Period</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default ProgressPage;