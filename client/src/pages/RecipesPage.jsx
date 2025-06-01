import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UtensilsCrossed, Clock, Zap, Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

const recipes = [
  {
    id: 1,
    title: 'Quick Chicken Stir-fry',
    description: 'A fast and flavorful stir-fry perfect for a weeknight dinner.',
    prepTime: '15 mins',
    cookTime: '10 mins',
    calories: '450 kcal',
    tags: ['Quick', 'High Protein', 'Asian'],
    imageName: "Chicken stir-fry in a wok",
    imageAlt: "A colorful chicken stir-fry with vegetables like bell peppers, broccoli, and carrots in a wok."
  },
  {
    id: 2,
    title: 'Lentil Soup (Vegan)',
    description: 'Hearty and nutritious vegan lentil soup, packed with fiber.',
    prepTime: '20 mins',
    cookTime: '40 mins',
    calories: '300 kcal',
    tags: ['Vegan', 'Hearty', 'Soup'],
    imageName: "Bowl of lentil soup with bread",
    imageAlt: "A steaming bowl of lentil soup garnished with herbs, served with a side of crusty bread."
  },
  {
    id: 3,
    title: 'Baked Salmon with Asparagus',
    description: 'Simple, elegant, and healthy baked salmon with roasted asparagus.',
    prepTime: '10 mins',
    cookTime: '20 mins',
    calories: '550 kcal',
    tags: ['Healthy', 'Omega-3', 'Easy'],
    imageName: "Baked salmon fillet with asparagus",
    imageAlt: "A perfectly baked salmon fillet seasoned with herbs, served alongside roasted asparagus spears on a plate."
  },
];

const RecipeCard = ({ recipe, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: delay, duration: 0.5 }}
  >
    <Card className="bg-card border-border text-card-foreground shadow-lg h-full flex flex-col transform hover:scale-105 transition-transform duration-300">
      <CardHeader>
        <img className="w-full h-48 object-cover rounded-t-md mb-4" alt={recipe.imageAlt} src="https://images.unsplash.com/photo-1561266585-2e3594688aed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" />
        <CardTitle className="text-xl text-foreground">{recipe.title}</CardTitle>
        <CardDescription className="text-muted-foreground h-16 overflow-hidden">{recipe.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="text-sm text-muted-foreground space-y-1 mb-3">
          <p><Clock className="inline mr-2 h-4 w-4 text-primary" />Prep: {recipe.prepTime} | Cook: {recipe.cookTime}</p>
          <p><Zap className="inline mr-2 h-4 w-4 text-primary" />Calories: {recipe.calories}</p>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {recipe.tags.map(tag => (
            <span key={tag} className="text-xs bg-accent/20 text-accent-foreground dark:text-primary px-2 py-1 rounded-full">{tag}</span>
          ))}
        </div>
      </CardContent>
      <div className="p-6 pt-0">
        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
          View Recipe
        </Button>
      </div>
    </Card>
  </motion.div>
);

const RecipesPage = () => {
  return (
    <motion.div 
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <header className="text-center">
        <h1 className="text-4xl font-bold gradient-text">Delicious & Healthy Recipes</h1>
        <p className="text-lg text-muted-foreground mt-2">Find the perfect meal for any occasion, powered by AI and curated by experts.</p>
      </header>

      <motion.div 
        className="flex flex-col md:flex-row gap-4 items-center sticky top-20 z-40 p-4 bg-background/80 backdrop-blur-md rounded-lg shadow-md border border-border"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <div className="relative flex-grow w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground/70" />
          <Input 
            type="search" 
            placeholder="Search recipes (e.g., 'chicken pasta', 'vegan breakfast')" 
            className="pl-10 w-full bg-input border-border text-foreground focus:ring-ring"
          />
        </div>
        <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground w-full md:w-auto">
          <Filter className="mr-2 h-4 w-4" /> Filters
        </Button>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground w-full md:w-auto">
          <UtensilsCrossed className="mr-2 h-4 w-4" /> AI Recipe Generator
        </Button>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipes.map((recipe, index) => (
          <RecipeCard key={recipe.id} recipe={recipe} delay={index * 0.1 + 0.2} />
        ))}
      </div>
      
      <motion.div 
        className="text-center mt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: recipes.length * 0.1 + 0.3, duration: 0.5 }}
      >
        <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
          Load More Recipes
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default RecipesPage;