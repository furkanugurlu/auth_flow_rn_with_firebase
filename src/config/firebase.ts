import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGEING_SENDER_ID,
  APP_ID,
  // @ts-ignore
} from "@env";

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGEING_SENDER_ID,
  appId: APP_ID,
};
initializeApp(firebaseConfig);
export const auth = getAuth();
export const database = getFirestore();
