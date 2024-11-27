import { useEffect, useState } from 'react';

const FirstRender = (callback: any, dependencies: any[]) => {
  const [firstRender, setFirstRender] = useState(false);
  useEffect(() => {
    if (firstRender) callback();
    if (!firstRender) setFirstRender(true);
  }, [firstRender, ...dependencies]);
};

export default FirstRender;
