
'use server';

import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';

// Initialize Firebase Admin SDK
if (!getApps().length) {
  // If a service account key is available as an environment variable, use it.
  // This is common for production environments.
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
    initializeApp({
      credential: cert(serviceAccount),
    });
  } else {
    // For local development, you might not have the service account key set.
    // The Admin SDK can sometimes discover credentials automatically in certain environments.
    // If not, you might need to set up GOOGLE_APPLICATION_CREDENTIALS.
    // Initializing without credentials will work for emulators.
    initializeApp();
  }
}

const firestore = getFirestore();

export async function getIncidents() {
  const incidentsCollection = firestore.collection('incidents');
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
