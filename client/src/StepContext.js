import React, { useState } from "react";
import BuyerHome from "./pages/BuyerHome";

export const multiStepContext = React.createContext();
const StepContext = () => {
  const [currentStep, setStep] = useState(1);

  return (
    <div>
      <multiStepContext.Provider
        value={{
          currentStep,
          setStep,
        }}
      >
        <BuyerHome />
      </multiStepContext.Provider>
    </div>
  );
};

export default StepContext;
