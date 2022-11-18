import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyBxLb-S18wHykRI78b9bGzJR5ZyY0twINo",
	authDomain: "jsalhigherlower.firebaseapp.com",
	projectId: "jsalhigherlower",
	storageBucket: "jsalhigherlower.appspot.com",
	messagingSenderId: "231951663910",
	appId: "1:231951663910:web:1c1222e80855eb578df7e7",
	measurementId: "G-BTCH3PBLJC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
