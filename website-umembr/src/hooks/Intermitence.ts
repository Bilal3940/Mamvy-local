import { useState, useCallback } from 'react';

const UseIntermitence = (initialStatus: boolean = false) => {
  const [status, setStatus] = useState(initialStatus);
  const switchStatus = useCallback(() => setStatus((status: boolean) => !status), []);
  return { status, switchStatus };
};

export default UseIntermitence;
