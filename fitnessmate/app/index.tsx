import React from "react";
import DrawerNavigator from "./navigation/DrawerNavigator";
import { WorkoutProvider } from "./context/WorkoutContext";

const Page: React.FC = () => {
  return (
    <WorkoutProvider>
      <DrawerNavigator />
    </WorkoutProvider>
  );
};

export default Page;
