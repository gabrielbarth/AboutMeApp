import { useEffect } from 'react';
import { Linking } from 'react-native';
import { useRouter } from 'expo-router';

export const useHandleDeepLinks = () => {
  const router = useRouter();

  useEffect(() => {
    const handleLink = ({ url }: { url: string }) => {
      const parsed = new URL(url);
      if (parsed.protocol === 'rolefit:') {
        const groupId = parsed.searchParams.get('groupId');
        const invitedBy = parsed.searchParams.get('invitedBy');

        if (groupId && invitedBy) {
          router.navigate({
            pathname: '/group/invite',
            params: { groupId, invitedBy },
          });
        }
      }
    };

    Linking.getInitialURL().then((url) => {
      if (url) handleLink({ url });
    });

    const sub = Linking.addEventListener('url', handleLink);
    return () => sub.remove();
  }, []);
};
