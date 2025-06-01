import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Activity, Apple, BarChart3, CalendarDays, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Progress } from '../components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const StatCard = ({ title, value, icon, colorClass, unit, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: delay, duration: 0.5 }}
  >
    <Card className="bg-card border-border text-card-foreground shadow-lg hover:shadow-primary/30 transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {React.cloneElement(icon, { className: `h-5 w-5 ${colorClass || 'text-primary'}` })}
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-foreground">{value} <span className="text-sm text-muted-foreground">{unit}</span></div>
        <p className="text-xs text-muted-foreground/70 mt-1">Compared to last week</p>
      </CardContent>
    </Card>
  </motion.div>
);

const DashboardPage = () => {
  const { user } = useAuth();
  const userName = user?.name || 'User';

  // Sample data - replace with actual data from your API
  const progressData = {
    currentWeight: 75,
    targetWeight: 70,
    progress: 60
  };

  const weightData = [
    { date: '2024-01-01', weight: 80 },
    { date: '2024-02-01', weight: 78 },
    { date: '2024-03-01', weight: 75 },
    // Add more data points
  ];

  const recentWorkouts = [
    { id: 1, name: 'Full Body Workout', date: '2024-03-15', duration: 60 },
    { id: 2, name: 'Cardio Session', date: '2024-03-14', duration: 45 },
    { id: 3, name: 'Upper Body Focus', date: '2024-03-13', duration: 50 },
  ];

  const nutritionSummary = {
    calories: 2200,
    protein: 180,
    carbs: 220,
    fats: 70
  };

  return (
    <motion.div 
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-4xl font-bold mb-4 sm:mb-0">
          <span className="gradient-text">Welcome Back, {userName}!</span>
        </h1>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <CalendarDays className="mr-2 h-4 w-4" /> Log Today's Activity
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Calories Consumed" value="1850" unit="kcal" icon={<Apple />} colorClass="text-destructive" delay={0.1} />
        <StatCard title="Calories Burned" value="450" unit="kcal" icon={<Activity />} colorClass="text-green-500 dark:text-green-400" delay={0.2} />
        <StatCard title="Workout Streak" value="7" unit="days" icon={<Target />} colorClass="text-blue-500 dark:text-blue-400" delay={0.3} />
        <StatCard title="Weight Progress" value="-0.5" unit="kg" icon={<BarChart3 />} colorClass="text-yellow-500 dark:text-yellow-400" delay={0.4} />
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.5 }}>
          <Card className="bg-card border-border text-card-foreground shadow-lg h-full">
            <CardHeader>
              <CardTitle className="text-xl text-foreground">Today's Meal Plan</CardTitle>
              <CardDescription className="text-muted-foreground">AI-generated meals for your goals.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-primary">Breakfast (450 kcal)</h4>
                <p className="text-sm text-muted-foreground">Oatmeal with Berries and Nuts</p>
              </div>
              <div>
                <h4 className="font-semibold text-primary">Lunch (600 kcal)</h4>
                <p className="text-sm text-muted-foreground">Grilled Chicken Salad with Quinoa</p>
              </div>
              <div>
                <h4 className="font-semibold text-primary">Dinner (550 kcal)</h4>
                <p className="text-sm text-muted-foreground">Baked Salmon with Roasted Vegetables</p>
              </div>
              <div>
                <h4 className="font-semibold text-primary">Snacks (250 kcal)</h4>
                <p className="text-sm text-muted-foreground">Greek Yogurt, Apple Slices</p>
              </div>
              <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">View Full Meal Plan</Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6, duration: 0.5 }}>
          <Card className="bg-card border-border text-card-foreground shadow-lg h-full">
            <CardHeader>
              <CardTitle className="text-xl text-foreground">Weekly Progress</CardTitle>
              <CardDescription className="text-muted-foreground">Your activity and nutrition summary.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center h-64">
              <img className="w-full h-full object-contain rounded-md" alt="Placeholder for weekly progress chart" src="https://images.unsplash.com/photo-1616261167032-b16d2df8333b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" />
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.5 }}>
        <Card className="bg-card border-border text-card-foreground shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-foreground">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="secondary" className="bg-secondary hover:bg-secondary/80 text-secondary-foreground">Log Water Intake</Button>
            <Button variant="secondary" className="bg-secondary hover:bg-secondary/80 text-secondary-foreground">Find a Recipe</Button>
            <Button variant="secondary" className="bg-secondary hover:bg-secondary/80 text-secondary-foreground">Start Workout</Button>
            <Button variant="secondary" className="bg-secondary hover:bg-secondary/80 text-secondary-foreground">Update Goals</Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Weight Progress Card */}
      <Card>
        <CardHeader>
          <CardTitle>Weight Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Current: {progressData.currentWeight} kg</span>
              <span>Target: {progressData.targetWeight} kg</span>
            </div>
            <Progress value={progressData.progress} className="h-2" />
            <p className="text-sm text-center text-muted-foreground">
              You're {progressData.progress}% of the way to your goal!
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Weight Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Weight Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weightData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="weight" stroke="#2563eb" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent Workouts */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Workouts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentWorkouts.map(workout => (
              <div key={workout.id} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <div>
                  <h3 className="font-medium">{workout.name}</h3>
                  <p className="text-sm text-muted-foreground">{workout.date}</p>
                </div>
                <span className="text-sm">{workout.duration} min</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Nutrition Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Nutrition</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4 text-center">
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-lg font-bold">{nutritionSummary.calories}</p>
              <p className="text-sm text-muted-foreground">Calories</p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-lg font-bold">{nutritionSummary.protein}g</p>
              <p className="text-sm text-muted-foreground">Protein</p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-lg font-bold">{nutritionSummary.carbs}g</p>
              <p className="text-sm text-muted-foreground">Carbs</p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-lg font-bold">{nutritionSummary.fats}g</p>
              <p className="text-sm text-muted-foreground">Fats</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DashboardPage;