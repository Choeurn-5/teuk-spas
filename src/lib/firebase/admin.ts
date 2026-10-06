import { initializeApp, getApps, cert, App } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

// Avoid re-initializing in hot-reloads
let adminApp: App;

if (getApps().length === 0) {
  // Use GOOGLE_APPLICATION_CREDENTIALS or process.env.FIREBASE_SERVICE_ACCOUNT
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT;
  
    let parsedAccount;
    try {
      // Remove surrounding single quotes if they exist (common copy-paste issue)
      let cleanAccount = serviceAccount.trim();
      if (cleanAccount.startsWith("'") && cleanAccount.endsWith("'")) {
        cleanAccount = cleanAccount.slice(1, -1);
      }
      
      // Handle escaped newlines that Vercel might inject
      cleanAccount = cleanAccount.replace(/\\\\n/g, '\\n');
      
      parsedAccount = JSON.parse(cleanAccount);
      
      // Fix double-escaped newlines inside the private_key specifically
      if (parsedAccount.private_key) {
        parsedAccount.private_key = parsedAccount.private_key.replace(/\\n/g, '\n');
      }
    } catch (e) {
      console.error("Failed to parse FIREBASE_SERVICE_ACCOUNT", e);
    }

    if (parsedAccount) {
      adminApp = initializeApp({
        credential: cert(parsedAccount),
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
