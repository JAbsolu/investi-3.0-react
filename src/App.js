import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from "./pages/home";
import SignIn from './pages/signin';
import Signup from './pages/signup';
import DashboardPage from './pages/dashboard';
import ChatPage from "./pages/dashboard/chat";
import { auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';
import News from './pages/dashboard/news';
import AssistantPage from './assistant/AssistantPage';

function App() {
  const [userIsAuth, setUserIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserIsAuth(!!user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div style={{ color: "white", textAlign: "center", paddingTop: "3em", background: "black", height: "100vh" }}>
        Loading...
      </div>
    ); 
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={userIsAuth ? <DashboardPage /> : <SignIn />} />
      <Route path="/signup" element={userIsAuth ? <DashboardPage /> : <Signup />} />
      <Route path="/dashboard" element={userIsAuth ? <DashboardPage /> : <SignIn />} />
      <Route path="/dashboard/chat" element={userIsAuth ? <ChatPage /> : <SignIn />} />
      <Route path="/dashboard/news" element={userIsAuth ? <News /> : <SignIn />} />
      <Route path="/dashboard/assistant" element={userIsAuth ? <AssistantPage /> : <SignIn />} />
    </Routes>
  );
}

export default App;
