import firestore from '@react-native-firebase/firestore';

const invitesCollection = firestore().collection('invites');
const groupsCollection = firestore().collection('groups');

export interface CreateInviteParams {
  groupId: string;
  userId: string;
}

export interface AcceptInviteParams {
  inviteId: string;
  groupId: string;
  userId: string;
}

const createInvite = async ({
  groupId,
  userId,
}: CreateInviteParams): Promise<string> => {
  const inviteId = `${groupId}_${userId}`;
  const inviteUrl = `https://rolefit.com.br/invite?groupId=${groupId}&invitedBy=${userId}`;
  const docRef = await invitesCollection.doc(inviteId).set({
    inviteId: inviteId,
    groupId: groupId,
    userId: userId,
    url: inviteUrl,
    acceptedAmount: 0,
    createdAt: Date.now(),
  });
  console.log('Invite created with ID:', docRef);
  return inviteUrl;
};

const getInviteById = async (inviteId: string) => {
  const query = await invitesCollection
    .where('inviteId', '==', inviteId)
    .limit(1)
    .get();
  if (query.empty) return null;
  return { id: query.docs[0].id, ...query.docs[0].data() };
};

const acceptInvite = async ({
  inviteId,
  groupId,
  userId,
}: AcceptInviteParams): Promise<void> => {
  console.log('Accepting invite:', { inviteId, groupId, userId });
  const groupRef = groupsCollection.doc(groupId);
  const inviteRef = invitesCollection.doc(inviteId);

  await firestore().runTransaction(async (transaction) => {
    const groupDoc = await transaction.get(groupRef);
    if (!groupDoc.exists) throw new Error('Group not found');

    const groupData = groupDoc.data();
    const participants: string[] = groupData?.participants || [];
    if (!participants.includes(userId)) {
      transaction.update(groupRef, {
        participants: firestore.FieldValue.arrayUnion(userId),
      });
    } else {
      throw new Error('Participant already exists in the group');
    }

    transaction.update(inviteRef, {
      acceptedAmount: firestore.FieldValue.increment(1),
    });
  });
};
export { createInvite, getInviteById, acceptInvite };
