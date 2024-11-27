import { useEffect } from 'react';
import { useRouter } from 'next/router';
import TagManager from 'react-gtm-module';

const GTM_ID = 'GTM-NHHQM64X';

const GoogleTagManager: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    TagManager.initialize({ gtmId: GTM_ID });

    const handleRouteChange = (url: string) => {
      TagManager.dataLayer({
        dataLayer: {
          event: 'page_view',
          pagePath: url,
          cookie_flags: 'secure; SameSite=None;',
        },
      });
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return null;
};

export default GoogleTagManager;
