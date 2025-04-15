import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import reportWebVitals from "./reportWebVitals";
import WeatherProPage from "./pages/home/home";
import SignInPage from "./pages/sign-in/sign-in";
import ForeCastPage from "./pages/forecast/forecast";
import { ClerkProvider, useAuth } from "@clerk/clerk-react";

import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import SignUpPage from "./pages/sign-up/sign-up";

// Import your Publishable Key
// const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;
//
// if (!PUBLISHABLE_KEY) {
//   throw new Error("Missing Publishable Key");
// }

const convex = new ConvexReactClient(process.env.REACT_APP_CONVEX_URL);
const root = ReactDOM.createRoot(document.getElementById("root"));

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WeatherProPage />} />
        <Route path="sign-in" element={<SignInPage />} />
        <Route path="sign-up" element={<SignUpPage />} />
        <Route path="forecast" element={<ForeCastPage />} />
      </Routes>
    </Router>
  );
};

root.render(
  <React.StrictMode>
    <ClerkProvider
      publishableKey="pk_test_Y29tbXVuYWwtZ3VwcHktNTMuY2xlcmsuYWNjb3VudHMuZGV2JA"
      afterSignOutUrl="/"
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <App />
      </ConvexProviderWithClerk>
    </ClerkProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
