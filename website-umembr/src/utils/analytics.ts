// utils/analytics.ts
interface EventParams {
    event: string;
    category: string;
    action: string;
    label?: string;
    value?: number;
    [key: string]: any;
  }

  export const sendEvent = ( params : EventParams) => {
    if (typeof window !== 'undefined') {
      const settedWindow: any = window;
      if (settedWindow.dataLayer) {
        settedWindow.dataLayer.push(
          params

        );
      }
    }
  };
  