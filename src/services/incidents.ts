
'use server';

import { getFirestore, collection, getDocs, Timestamp } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';

// Initialize Firebase client-side
const { firestore } = initializeFirebase();

export async function getIncidents() {
  const incidentsCollection = collection(firestore, 'incidents');
  const snapshot = await getDocs(incidentsCollection);
  if (snapshot.empty) {
    return [];
  }
  return snapshot.docs.map(doc => {
    const data = doc.data();
    // Convert Firestore Timestamp to a serializable date string if it exists
    const reportedTime = data.reportedTime instanceof Timestamp 
      ? data.reportedTime.toDate().toISOString() 
      : data.reportedTime;

    return {
      id: doc.id,
      ...data,
      date: reportedTime, // Ensure the 'date' field is populated for the tool
    };
  });
}
