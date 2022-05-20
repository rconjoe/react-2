import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyDIr5lZ6jqizR7QpgVXFkbM8i9yiBs3LO8",
  authDomain: "beach-coders-react.firebaseapp.com",
  projectId: "beach-coders-react",
  storageBucket: "beach-coders-react.appspot.com",
  messagingSenderId: "794258426330",
  appId: "1:794258426330:web:142e38c3565ffd49ecd8e3",
  measurementId: "G-ZS95QRW53L"
};

const app = initializeApp(firebaseConfig);

export default app;
