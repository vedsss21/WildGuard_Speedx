import {initializeApp, getApps} from 'firebase-admin/app';
import {getFirestore, Timestamp} from 'firebase-admin/firestore';

if (!getApps().length) {
  initializeApp();
}

const db = getFirestore();

export async function getIncidents() {
  const incidentsCollection = db.collection('incidents');
  const snapshot = await incidentsCollection.get();
  if (snapshot.empty) {
    return [];
  }
  return snapshot.docs.map(doc => {
    const data = doc.data();
    // Convert Firestore Timestamp to a serializable date string
    const reportedTime = data.reportedTime instanceof Timestamp 
      ? data.reportedTime.toDate().toISOString() 
      : data.reportedTime;

    return {
      id: doc.id,
      ...data,
      reportedTime,
    };
  });
}
