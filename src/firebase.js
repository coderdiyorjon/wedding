import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Bu yerni o'zingizning Firebase Config ma'lumotlaringiz bilan almashtiring
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

let app;
let dbInstance;

try {
  if (firebaseConfig.apiKey !== "YOUR_API_KEY") {
    app = initializeApp(firebaseConfig);
    dbInstance = getFirestore(app);
  }
} catch (error) {
  console.warn("Firebase not properly configured yet.", error);
}

export const db = dbInstance;
