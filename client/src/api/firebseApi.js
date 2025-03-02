import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage"; 스토리지 사용시
// import { getAuth } from "firebase/auth"; 인증 사용시

// 파이어베이스 Config
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FB_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FB_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FB_MESSAGE_ID,
  appId: process.env.REACT_APP_FB_APP_ID,
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;
