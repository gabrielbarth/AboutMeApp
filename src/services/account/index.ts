import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import { UserAccount } from 'src/@types/user';

const usersCollection = firestore().collection('users');

const createUser = async (user: UserAccount): Promise<void> => {
  await usersCollection.doc(user.id).set(user, { merge: true });
};

const getUserById = async (id: string): Promise<UserAccount | null> => {
  const doc = await usersCollection.doc(id).get();
  return doc.exists ? (doc.data() as UserAccount) : null;
};

const getUserByEmail = async (email: string): Promise<UserAccount | null> => {
  const query = await usersCollection
    .where('email', '==', email)
    .limit(1)
    .get();
  if (query.empty) return null;
  return query.docs[0].data() as UserAccount;
};

const deleteUser = async (userId: string): Promise<void> => {
  await usersCollection.doc(userId).delete();
  const currentUser = auth().currentUser;
  if (currentUser && currentUser.uid === userId) {
    await currentUser.delete();
  }
};

const updateUserProfilePhoto = async (
  userId: string,
  localImageUri: string,
): Promise<string> => {
  const storageRef = storage().ref(`profile_photos/${userId}.jpg`);
  await storageRef.putFile(localImageUri);
  const photoUrl = await storageRef.getDownloadURL();
  await usersCollection.doc(userId).update({ photoUrl });

  const currentUser = auth().currentUser;
  if (currentUser && currentUser.uid === userId) {
    await currentUser.updateProfile({ photoURL: photoUrl });
  }

  return photoUrl;
};

const updateUserName = async (
  userId: string,
  newName: string,
): Promise<void> => {
  await usersCollection.doc(userId).update({ name: newName });

  const currentUser = auth().currentUser;
  if (currentUser && currentUser.uid === userId) {
    await currentUser.updateProfile({ displayName: newName });
  }
};

const getUserNameAndPhoto = async (
  userId: string,
): Promise<{ name: string; photoUrl?: string }> => {
  const userDoc = await usersCollection.doc(userId).get();
  if (!userDoc.exists) {
    throw new Error('User not found');
  }
  const userData = userDoc.data() as UserAccount;
  return {
    name: userData.name,
    photoUrl: userData.photoUrl,
  };
};

export {
  createUser,
  getUserById,
  getUserByEmail,
  deleteUser,
  updateUserProfilePhoto,
  updateUserName,
  getUserNameAndPhoto,
};
