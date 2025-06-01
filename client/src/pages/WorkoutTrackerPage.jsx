import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

const WorkoutTrackerPage = () => {
  const [exercises, setExercises] = useState([]);
  const [currentExercise, setCurrentExercise] = useState({
    name: '',
    sets: '',
    reps: '',
    weight: '',
    notes: ''
  });

  const workoutTypes = [
    'strength',
    'cardio',
    'flexibility',
    'hiit'
  ];

  const commonExercises = {
    strength: ['Bench Press', 'Squats', 'Deadlifts', 'Shoulder Press'],
    cardio: ['Running', 'Cycling', 'Swimming', 'Jump Rope'],
    flexibility: ['Yoga Flow', 'Dynamic Stretching', 'Static Stretching'],
    hiit: ['Burpees', 'Mountain Climbers', 'Jump Squats', 'High Knees']
  };

  const handleAddExercise = () => {
    if (currentExercise.name && currentExercise.sets && currentExercise.reps) {
      setExercises([...exercises, { ...currentExercise, id: Date.now() }]);
      setCurrentExercise({
        name: '',
        sets: '',
        reps: '',
        weight: '',
        notes: ''
      });
    }
  };

  const handleRemoveExercise = (id) => {
    setExercises(exercises.filter(exercise => exercise.id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Workout Tracker</h1>

      <Tabs defaultValue="log" className="w-full">
        <TabsList>
          <TabsTrigger value="log">Log Workout</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="log">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>New Workout</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-4">
                    <div>
                      <Label>Workout Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select workout type" />
                        </SelectTrigger>
                        <SelectContent>
                          {workoutTypes.map(type => (
                            <SelectItem key={type} value={type}>
                              {type.charAt(0).toUpperCase() + type.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Exercise Name</Label>
                      <Input
                        value={currentExercise.name}
                        onChange={(e) => setCurrentExercise({ ...currentExercise, name: e.target.value })}
                        placeholder="Enter exercise name"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label>Sets</Label>
                        <Input
                          type="number"
                          value={currentExercise.sets}
                          onChange={(e) => setCurrentExercise({ ...currentExercise, sets: e.target.value })}
                          placeholder="Sets"
                        />
                      </div>
                      <div>
                        <Label>Reps</Label>
                        <Input
                          type="number"
                          value={currentExercise.reps}
                          onChange={(e) => setCurrentExercise({ ...currentExercise, reps: e.target.value })}
                          placeholder="Reps"
                        />
                      </div>
                      <div>
                        <Label>Weight (kg)</Label>
                        <Input
                          type="number"
                          value={currentExercise.weight}
                          onChange={(e) => setCurrentExercise({ ...currentExercise, weight: e.target.value })}
                          placeholder="Weight"
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Notes</Label>
                      <Input
                        value={currentExercise.notes}
                        onChange={(e) => setCurrentExercise({ ...currentExercise, notes: e.target.value })}
                        placeholder="Add notes"
                      />
                    </div>

                    <Button onClick={handleAddExercise}>Add Exercise</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {exercises.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Current Workout</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {exercises.map(exercise => (
                      <div key={exercise.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <div>
                          <h3 className="font-medium">{exercise.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {exercise.sets} sets × {exercise.reps} reps {exercise.weight && `@ ${exercise.weight}kg`}
                          </p>
                          {exercise.notes && (
                            <p className="text-sm text-muted-foreground mt-1">{exercise.notes}</p>
                          )}
                        </div>
                        <Button variant="destructive" size="sm" onClick={() => handleRemoveExercise(exercise.id)}>
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button className="w-full">Save Workout</Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Workout History</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Your past workouts will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorkoutTrackerPage; 