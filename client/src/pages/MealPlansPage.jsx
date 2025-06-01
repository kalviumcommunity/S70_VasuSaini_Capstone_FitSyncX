import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Utensils, CalendarDays, Zap, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';

const mealPlans = [
  {
    id: 1,
    title: '7-Day Weight Loss Kickstart',
    description: 'A balanced plan focusing on whole foods and calorie deficit to help you shed initial pounds.',
    duration: '7 Days',
    caloriesPerDay: '1500-1800 kcal',
    type: 'Weight Loss',
    icon: <Zap className="text-destructive" />,
    imageName: "Healthy salad bowl with grilled chicken",
    imageAlt: "A vibrant salad bowl with grilled chicken, mixed greens, tomatoes, and avocado, representing a healthy meal for weight loss."
  },
  {
    id: 2,
    title: 'Muscle Gain Power Plan',
    description: 'High-protein meals designed to support muscle growth and recovery after intense workouts.',
    duration: '30 Days',
    caloriesPerDay: '2500-3000 kcal',
    type: 'Muscle Gain',
    icon: <Utensils className="text-blue-500 dark:text-blue-400" />,
    imageName: "Steak with sweet potatoes and broccoli",
    imageAlt: "A plate with a juicy steak, roasted sweet potatoes, and steamed broccoli, symbolizing a high-protein meal for muscle gain."
  },
  {
    id: 3,
    title: 'Vegetarian Vitality Plan',
    description: 'A diverse and nutritious plant-based meal plan ensuring all essential nutrients are covered.',
    duration: '14 Days',
    caloriesPerDay: '1800-2200 kcal',
    type: 'Vegetarian',
    icon: <Leaf className="text-green-500 dark:text-green-400" />,
    imageName: "Colorful vegetarian stir-fry with tofu",
    imageAlt: "A wok filled with colorful vegetarian stir-fry including tofu, bell peppers, broccoli, and carrots, showcasing a vibrant plant-based meal."
  },
];

const MealPlanCard = ({ plan, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: delay, duration: 0.5 }}
  >
    <Card className="bg-card border-border text-card-foreground shadow-lg h-full flex flex-col transform hover:scale-105 transition-transform duration-300">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <CardTitle className="text-xl text-foreground flex items-center">
            {React.cloneElement(plan.icon, { className: `mr-2 h-6 w-6 ${plan.icon.props.className}` })}
            {plan.title}
          </CardTitle>
          <span className="text-xs bg-accent/20 text-accent-foreground dark:text-primary px-2 py-1 rounded-full">{plan.type}</span>
        </div>
        <CardDescription className="text-muted-foreground">{plan.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="mb-4">
          <img className="w-full h-48 object-cover rounded-md mb-4" alt={plan.imageAlt} src="https://images.unsplash.com/photo-1595872018818-97555653a011?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" />
        </div>
        <div className="text-sm text-muted-foreground space-y-1">
          <p><CalendarDays className="inline mr-2 h-4 w-4 text-primary" />Duration: {plan.duration}</p>
          <p><Utensils className="inline mr-2 h-4 w-4 text-primary" />Avg. Calories: {plan.caloriesPerDay}</p>
        </div>
      </CardContent>
      <div className="p-6 pt-0">
        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
          View Plan Details
        </Button>
      </div>
    </Card>
  </motion.div>
);

const MealPlansPage = () => {
  return (
    <motion.div 
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <header className="text-center">
        <h1 className="text-4xl font-bold gradient-text">Curated Meal Plans</h1>
        <p className="text-lg text-muted-foreground mt-2">Discover AI-personalized and expert-designed meal plans to achieve your health goals.</p>
      </header>

      <div className="flex justify-center my-6">
        <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
          <Zap className="mr-2 h-4 w-4" /> Generate My AI Plan
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mealPlans.map((plan, index) => (
          <MealPlanCard key={plan.id} plan={plan} delay={index * 0.15} />
        ))}
      </div>
      
      <motion.div 
        className="text-center mt-12 p-8 glassmorphism-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: mealPlans.length * 0.15 + 0.2, duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold text-foreground mb-3">Can't find what you're looking for?</h2>
        <p className="text-muted-foreground mb-6">Our AI can generate a unique meal plan tailored specifically to your dietary needs, preferences, and fitness objectives.</p>
        <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
          Create Custom AI Plan
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default MealPlansPage;