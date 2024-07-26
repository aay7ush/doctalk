import { initializeApp, cert, getApps, App, getApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

const serviceAccountKey = require("@/serviceAccountKey.json");

let app: App;

if (getApps().length === 0) {
  app = initializeApp({
    credential: cert(serviceAccountKey),
  });
} else {
  app = getApp();
}

const db = getFirestore(app);

export { app as adminApp, db as adminDb };
