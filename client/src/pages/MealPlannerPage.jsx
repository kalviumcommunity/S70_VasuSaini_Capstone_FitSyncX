import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const MealPlannerPage = () => {
  const [meals, setMeals] = useState([]);
  const [currentMeal, setCurrentMeal] = useState({
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fats: '',
    mealType: '',
    notes: ''
  });

  const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  const calculateTotalNutrition = () => {
    return meals.reduce((acc, meal) => ({
      calories: acc.calories + Number(meal.calories),
      protein: acc.protein + Number(meal.protein),
      carbs: acc.carbs + Number(meal.carbs),
      fats: acc.fats + Number(meal.fats)
    }), { calories: 0, protein: 0, carbs: 0, fats: 0 });
  };

  const macroData = () => {
    const totals = calculateTotalNutrition();
    return [
      { name: 'Protein', value: totals.protein * 4 }, // 4 calories per gram
      { name: 'Carbs', value: totals.carbs * 4 }, // 4 calories per gram
      { name: 'Fats', value: totals.fats * 9 } // 9 calories per gram
    ];
  };

  const handleAddMeal = () => {
    if (currentMeal.name && currentMeal.calories) {
      setMeals([...meals, { ...currentMeal, id: Date.now() }]);
      setCurrentMeal({
        name: '',
        calories: '',
        protein: '',
        carbs: '',
        fats: '',
        mealType: '',
        notes: ''
      });
    }
  };

  const handleRemoveMeal = (id) => {
    setMeals(meals.filter(meal => meal.id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Meal Planner</h1>

      <Tabs defaultValue="log" className="w-full">
        <TabsList>
          <TabsTrigger value="log">Log Meal</TabsTrigger>
          <TabsTrigger value="summary">Daily Summary</TabsTrigger>
        </TabsList>

        <TabsContent value="log">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Add Meal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-4">
                    <div>
                      <Label>Meal Type</Label>
                      <Select
                        value={currentMeal.mealType}
                        onValueChange={(value) => setCurrentMeal({ ...currentMeal, mealType: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select meal type" />
                        </SelectTrigger>
                        <SelectContent>
                          {mealTypes.map(type => (
                            <SelectItem key={type} value={type}>
                              {type.charAt(0).toUpperCase() + type.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Meal Name</Label>
                      <Input
                        value={currentMeal.name}
                        onChange={(e) => setCurrentMeal({ ...currentMeal, name: e.target.value })}
                        placeholder="Enter meal name"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Calories</Label>
                        <Input
                          type="number"
                          value={currentMeal.calories}
                          onChange={(e) => setCurrentMeal({ ...currentMeal, calories: e.target.value })}
                          placeholder="Calories"
                        />
                      </div>
                      <div>
                        <Label>Protein (g)</Label>
                        <Input
                          type="number"
                          value={currentMeal.protein}
                          onChange={(e) => setCurrentMeal({ ...currentMeal, protein: e.target.value })}
                          placeholder="Protein"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Carbs (g)</Label>
                        <Input
                          type="number"
                          value={currentMeal.carbs}
                          onChange={(e) => setCurrentMeal({ ...currentMeal, carbs: e.target.value })}
                          placeholder="Carbs"
                        />
                      </div>
                      <div>
                        <Label>Fats (g)</Label>
                        <Input
                          type="number"
                          value={currentMeal.fats}
                          onChange={(e) => setCurrentMeal({ ...currentMeal, fats: e.target.value })}
                          placeholder="Fats"
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Notes</Label>
                      <Input
                        value={currentMeal.notes}
                        onChange={(e) => setCurrentMeal({ ...currentMeal, notes: e.target.value })}
                        placeholder="Add notes"
                      />
                    </div>

                    <Button onClick={handleAddMeal}>Add Meal</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {meals.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Today's Meals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {meals.map(meal => (
                      <div key={meal.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <div>
                          <h3 className="font-medium">{meal.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {meal.calories} kcal | P: {meal.protein}g | C: {meal.carbs}g | F: {meal.fats}g
                          </p>
                          {meal.notes && (
                            <p className="text-sm text-muted-foreground mt-1">{meal.notes}</p>
                          )}
                        </div>
                        <Button variant="destructive" size="sm" onClick={() => handleRemoveMeal(meal.id)}>
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="summary">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Nutrition Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4 mb-6">
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <p className="text-lg font-bold">{calculateTotalNutrition().calories}</p>
                    <p className="text-sm text-muted-foreground">Calories</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <p className="text-lg font-bold">{calculateTotalNutrition().protein}g</p>
                    <p className="text-sm text-muted-foreground">Protein</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <p className="text-lg font-bold">{calculateTotalNutrition().carbs}g</p>
                    <p className="text-sm text-muted-foreground">Carbs</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <p className="text-lg font-bold">{calculateTotalNutrition().fats}g</p>
                    <p className="text-sm text-muted-foreground">Fats</p>
                  </div>
                </div>

                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={macroData()}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {macroData().map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MealPlannerPage; 