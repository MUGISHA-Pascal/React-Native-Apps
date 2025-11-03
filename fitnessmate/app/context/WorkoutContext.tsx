import React, { createContext, useState, ReactNode } from "react";

export interface Workout {
  id: string;
  name: string;
  description: string;
}

interface WorkoutContextType {
  workouts: Workout[];
  setWorkouts: React.Dispatch<React.SetStateAction<Workout[]>>;
}

export const WorkoutContext = createContext<WorkoutContextType | undefined>(
  undefined
);

export const WorkoutProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [workouts, setWorkouts] = useState<Workout[]>([
    { id: "1", name: "Push Ups", description: "Upper body exercise" },
    { id: "2", name: "Squats", description: "Leg workout" },
    { id: "3", name: "Plank", description: "Core strengthening" },
  ]);

  return (
    <WorkoutContext.Provider value={{ workouts, setWorkouts }}>
      {children}
    </WorkoutContext.Provider>
  );
};
