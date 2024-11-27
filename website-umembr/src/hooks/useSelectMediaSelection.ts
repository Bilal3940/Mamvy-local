// /hooks/useStringState.ts
import { useState } from 'react';

// Define the hook
export const useSelectMediaSelection= (initialValue: string = 'audio') => {
  // Create a state variable to hold the string
  const [value, setValue] = useState<string>(initialValue);

  // Return both the value and a function to update it
  return {
    value,         // The current string value
    setValue,      // Function to update the string
  };
};
