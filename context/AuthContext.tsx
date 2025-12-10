
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth } from '../services/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      console.error("Error signing in with Google", err);
      
      let errorMessage = "Failed to sign in.";
      
      if (err.code === 'auth/popup-blocked') {
        errorMessage = "Popup was blocked by the browser. Please allow popups for this site.";
      } else if (err.code === 'auth/cancelled-popup-request') {
        errorMessage = "Sign-in cancelled. Please try again.";
      } else if (err.code === 'auth/popup-closed-by-user') {
        errorMessage = "Sign-in window was closed before completion.";
      } else if (err.code === 'auth/unauthorized-domain') {
        // We provide a generic message here and let the UI component (LoginView)
        // inspect window.location to show the specific domain to the user.
        errorMessage = "Domain not authorized. Please check the debug info below.";
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setError(null);
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider value={{ user, loading, error, signInWithGoogle, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
