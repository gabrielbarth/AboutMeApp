import firestore, { arrayUnion } from '@react-native-firebase/firestore';
import { UserAccount } from 'src/@types/user';
import { Group } from 'src/@types/group';

const db = firestore();
const groupsCollection = db.collection('groups');
const usersCollection = db.collection('users');

export interface GroupParcicipants {
  id: string;
  name: string;
  photoUrl?: string;
}

export interface GroupDetailsWithParticipants {
  group: Group & { id: string };
  participants: GroupParcicipants[];
}

const createGroup = async (
  name: string,
  description: string,
  hostId: string,
): Promise<string> => {
  const group: Group = {
    name,
    description,
    hostId,
    participants: [hostId],
  };
  const docRef = await groupsCollection.add(group);
  return docRef.id;
};

const deleteGroup = async (groupId: string, userId: string): Promise<void> => {
  const docRef = groupsCollection.doc(groupId);
  const doc = await docRef.get();
  if (!doc.exists) throw new Error('Group not found');
  const data = doc.data() as Group;
  if (data.hostId !== userId)
    throw new Error('Only the creator can delete the group');
  await docRef.delete();
};

const addMembersToGroup = async (
  groupId: string,
  userIds: string[],
): Promise<void> => {
  const docRef = groupsCollection.doc(groupId);
  await docRef.update({
    participants: arrayUnion(...userIds),
  });
};

const updateGroup = async (
  groupId: string,
  userId: string,
  updates: { name?: string; description?: string },
): Promise<void> => {
  const docRef = groupsCollection.doc(groupId);
  const doc = await docRef.get();
  if (!doc.exists) throw new Error('Group not found');
  const data = doc.data() as Group;
  if (data.hostId !== userId)
    throw new Error('Only the creator can update the group');
  await docRef.update(updates);
};

const getUserGroups = async (userId: string): Promise<Group[]> => {
  const snapshot = await groupsCollection
    .where('participants', 'array-contains', userId)
    .get();
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Group),
  }));
};

const getGroupById = async (groupId: string): Promise<Group | null> => {
  const docRef = groupsCollection.doc(groupId);
  const doc = await docRef.get();
  if (!doc.exists) return null;
  return {
    id: doc.id,
    ...(doc.data() as Group),
  };
};

const getGroupDetailsWithParticipants = async (
  groupId: string,
): Promise<GroupDetailsWithParticipants | null> => {
  const groupDoc = await groupsCollection.doc(groupId).get();
  if (!groupDoc.exists) return null;

  const groupData = groupDoc.data() as Group;
  const participantIds = groupData.participants || [];

  const usersSnap = await usersCollection
    .where(
      firestore.FieldPath.documentId(),
      'in',
      participantIds.length > 0 ? participantIds : ['__none__'],
    )
    .get();

  const participants = usersSnap.docs.map((doc) => {
    const data = doc.data() as UserAccount;
    return {
      id: doc.id,
      name: data.name,
      photoUrl: data.photoUrl,
    };
  });

  return {
    group: { id: groupDoc.id, ...groupData },
    participants,
  };
};

const exitGroup = async (groupId: string, userId: string): Promise<void> => {
  const docRef = groupsCollection.doc(groupId);
  const doc = await docRef.get();
  if (!doc.exists) throw new Error('Group not found');
  const data = doc.data() as Group;
  if (!data.participants.includes(userId))
    throw new Error('User is not a participant of the group');
  await docRef.update({
    participants: firestore.FieldValue.arrayRemove(userId),
  });
};

const getUserGroupIds = async (userId: string): Promise<string[]> => {
  const groupsSnapshot = await groupsCollection
    .where('participants', 'array-contains', userId)
    .get();

  const groupIds = groupsSnapshot.docs.map((doc) => doc.id);
  return groupIds.length > 0 ? groupIds : [];
};

export {
  createGroup,
  deleteGroup,
  addMembersToGroup,
  updateGroup,
  getUserGroups,
  getGroupById,
  getGroupDetailsWithParticipants,
  exitGroup,
  getUserGroupIds,
};
