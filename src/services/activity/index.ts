import firestore, {
  FirebaseFirestoreTypes,
  Timestamp,
} from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { getUserGroupIds } from 'src/services/group';
import { getUserNameAndPhoto } from 'src/services/account';
import { Activity } from 'src/@types/activity';
import { formatFirebaseTimestampToDate } from 'root/src/utils/formatFirebaseTimestampToDate';

export interface ActivityWithUser extends Activity {
  user: {
    name: string;
    avatarUrl?: string;
  };
}

const activitiesCollection = firestore().collection('activities');

export interface PostActivityParams {
  activity: Omit<Activity, 'id' | 'imageUrl' | 'likes' | 'groupIds'>;
  localImageUri: string;
}

const postActivity = async (params: PostActivityParams): Promise<string> => {
  const { activity, localImageUri } = params;

  const groupIds = await getUserGroupIds(activity.userId);

  // const imageRef = storage().ref(`activities/${activity.userId}/${uuidv4()}`);
  // await imageRef.putFile(localImageUri);
  const imageUrl =
    'https://firebasestorage.googleapis.com/v0/b/rolefit-53539.firebasestorage.app/o/activities%2FoB0T26mtrSOk2YS9rnmavK5BAR03%2Feeb218e7-c509-4e12-bf21-a315ceac2c47?alt=media&token=310af587-4a34-4c2d-909b-057a2333fd61'; // await imageRef.getDownloadURL();

  const docRef = await activitiesCollection.add({
    ...activity,
    groupIds,
    imageUrl,
    likes: [],
    date:
      activity.date instanceof Date ? activity.date : new Date(activity.date),
  });
  return docRef.id;
};

const removeActivity = async (activityId: string): Promise<void> => {
  await activitiesCollection.doc(activityId).delete();
};

const likeActivity = async (
  activityId: string,
  userId: string,
): Promise<void> => {
  const activityRef = activitiesCollection.doc(activityId);
  await activityRef.update({
    likes: firestore.FieldValue.arrayUnion(userId),
  });
};

const editActivity = async (
  activityId: string,
  updates: Partial<Omit<Activity, 'id' | 'userId' | 'groupIds' | 'likes'>>,
  imageFile?: File,
): Promise<void> => {
  let updateData = { ...updates };
  if (imageFile) {
    const imageRef = storage().ref(`activities/${uuidv4()}_${imageFile.name}`);
    await imageRef.put(imageFile);
    const imageUrl = await imageRef.getDownloadURL();
    updateData.imageUrl = imageUrl;
  }
  if (updates.date && updates.date instanceof Date) {
    updateData.date = updates.date;
  }
  await activitiesCollection.doc(activityId).update(updateData);
};

const listUserActivities = async (userId: string): Promise<Activity[]> => {
  const snapshot = await activitiesCollection
    .where('userId', '==', userId)
    .get();
  return snapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() }) as Activity,
  );
};

const listGroupActivities = async (
  userId: string,
): Promise<ActivityWithUser[]> => {
  const userGroupIds = await getUserGroupIds(userId);
  console.log('@@ userId', userId);
  console.log('@@ userGroupIds', userGroupIds);

  if (userGroupIds.length === 0) {
    const user = await getUserNameAndPhoto(userId);
    if (!user) throw new Error('User not found');
    const userSnapshot = await activitiesCollection
      .where('userId', '==', userId)
      .get();
    return userSnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          user: {
            name: user.name,
            avatarUrl: user.photoUrl,
          },
          ...doc.data(),
        }) as ActivityWithUser,
    );
  }

  const groupSnapshot = await activitiesCollection
    .where('groupIds', 'array-contains-any', userGroupIds)
    .get();

  const userSnapshot = await activitiesCollection
    .where('userId', '==', userId)
    .get();

  const allDocs = [...groupSnapshot.docs, ...userSnapshot.docs];
  const uniqueActivities = new Map<
    string,
    FirebaseFirestoreTypes.DocumentSnapshot
  >();
  allDocs.forEach((doc) => {
    uniqueActivities.set(doc.id, doc);
  });

  const activities: ActivityWithUser[] = [];
  for (const doc of uniqueActivities.values()) {
    const activityData = doc.data() as Activity;
    const activityUser = await getUserNameAndPhoto(activityData.userId);

    const formattedDate = formatFirebaseTimestampToDate(
      activityData.date as unknown as Timestamp,
    );

    activities.push({
      id: doc.id,
      ...activityData,
      date: formattedDate,
      user: {
        name: activityUser?.name ?? '',
        avatarUrl: activityUser?.photoUrl,
      },
    });
  }

  return activities;
};

export {
  postActivity,
  removeActivity,
  likeActivity,
  editActivity,
  listUserActivities,
  listGroupActivities,
};
