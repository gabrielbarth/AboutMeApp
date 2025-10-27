import { Timestamp } from '@react-native-firebase/firestore';

function formatFirebaseTimestampToDate(timestamp: Timestamp): string {
  const date = new Date(
    timestamp.seconds * 1000 + timestamp.nanoseconds / 1_000_000,
  );

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export { formatFirebaseTimestampToDate };
