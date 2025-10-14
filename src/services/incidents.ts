'use server';

import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';

// Initialize Firebase Admin SDK
if (!getApps().length) {
  try {
    // Try to initialize with service account from environment variables (common for production)
    if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
      initializeApp({
        credential: cert(serviceAccount),
      });
    } else {
      // For local development, initializing without credentials will work for emulators.
      // In a deployed environment, it might auto-discover credentials.
      initializeApp();
    }
  } catch (error) {
    console.error("Firebase Admin SDK initialization failed:", error);
    // If initialization fails, subsequent Firestore calls will fail,
    // but this prevents the app from crashing on startup.
  }
}

const firestore = getFirestore();

export async function getIncidents() {
  const incidentsCollection = firestore.collection('incidents');
  const snapshot = await incidentsCollection.get();
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
