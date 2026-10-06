import { initializeApp, getApps, cert, App } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

// Avoid re-initializing in hot-reloads
let adminApp: App;

if (getApps().length === 0) {
  // Use GOOGLE_APPLICATION_CREDENTIALS or process.env.FIREBASE_SERVICE_ACCOUNT
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT;
  
  if (serviceAccount) {
    adminApp = initializeApp({
      credential: cert(JSON.parse(serviceAccount)),
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "demo-project",
    });
  } else {
    // In emulator or environments with Application Default Credentials
    adminApp = initializeApp({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "demo-project",
    });
  }
} else {
  adminApp = getApps()[0];
}

const adminDb = getFirestore(adminApp);
const adminAuth = getAuth(adminApp);

// Setup emulator configuration for admin SDK
// (Disabled so we can test against your live Firebase console data!)
/*
if (process.env.NODE_ENV === "development") {
  process.env.FIRESTORE_EMULATOR_HOST = "127.0.0.1:8080";
  process.env.FIREBASE_AUTH_EMULATOR_HOST = "127.0.0.1:9099";
  process.env.FIREBASE_STORAGE_EMULATOR_HOST = "127.0.0.1:9199";
}
*/

export { adminApp, adminDb, adminAuth };
