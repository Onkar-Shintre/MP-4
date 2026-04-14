import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  auth,
  googleProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from '../firebase';
import { authAPI } from '../services/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  // Listen to Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const idToken = await firebaseUser.getIdToken();
        const userData = {
          uid: firebaseUser.uid,
          name: firebaseUser.displayName,
          email: firebaseUser.email,
          avatar: firebaseUser.photoURL,
        };
        setToken(idToken);
        setUser(userData);
        localStorage.setItem('token', idToken);
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (credentials) => {
    try {
      const { email, password } = credentials;
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Login successful!');
      return { success: true };
    } catch (error) {
      const message = getFirebaseErrorMessage(error.code);
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const register = async (userData) => {
    try {
      const { email, password, name } = userData;
      const credential = await createUserWithEmailAndPassword(auth, email, password);

      // Set display name on Firebase user
      await updateProfile(credential.user, { displayName: name });

      toast.success('Registration successful!');
      return { success: true };
    } catch (error) {
      const message = getFirebaseErrorMessage(error.code);
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success('Signed in with Google!');
      return { success: true };
    } catch (error) {
      const message = getFirebaseErrorMessage(error.code);
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateUserProfile = async (profileData) => {
    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: profileData.name,
          photoURL: profileData.avatar,
        });
        const updatedUser = { ...user, ...profileData };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
      toast.success('Profile updated successfully!');
      return { success: true };
    } catch (error) {
      toast.error('Profile update failed');
      return { success: false, error: error.message };
    }
  };

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    loginWithGoogle,
    logout,
    updateProfile: updateUserProfile,
    updateUser,
    isAuthenticated: !!token && !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Map Firebase error codes to friendly messages
function getFirebaseErrorMessage(code) {
  const messages = {
    'auth/user-not-found': 'No account found with this email',
    'auth/wrong-password': 'Incorrect password',
    'auth/email-already-in-use': 'An account with this email already exists',
    'auth/weak-password': 'Password must be at least 6 characters',
    'auth/invalid-email': 'Invalid email address',
    'auth/popup-closed-by-user': 'Google sign-in was cancelled',
    'auth/network-request-failed': 'Network error. Please check your connection',
    'auth/too-many-requests': 'Too many attempts. Please try again later',
    'auth/invalid-credential': 'Invalid email or password',
  };
  return messages[code] || 'Authentication failed. Please try again';
}
