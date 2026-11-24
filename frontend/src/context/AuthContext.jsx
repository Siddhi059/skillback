import { useEffect, useState } from 'react';
import {
  authService,
  getStoredToken,
  profileService,
  setStoredToken,
} from '../services/api';
import { AuthContext } from './authStore';

const STORAGE_KEY = 'skillback_user_session_v1';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // Ignore storage quota errors
    }
  }, [user]);

  useEffect(() => {
    const token = getStoredToken();
    if (!token || token === 'offline_demo_token') return;

    authService
      .getMe()
      .then((res) => {
        if (res?.user) setUser(res.user);
      })
      .catch(() => {
        // Keep cached session if offline or clear on explicit 401
      });
  }, []);

  const login = async (credentials) => {
    const res = await authService.login(credentials);
    setStoredToken(res.token);
    setUser(res.user);
    return res.user;
  };

  const signup = async (payload) => {
    const res = await authService.signup(payload);
    setStoredToken(res.token);
    setUser(res.user);
    return res.user;
  };

  const loginAsDemo = async () => {
    const res = await authService.demoLogin();
    setStoredToken(res.token);
    setUser(res.user);
    return res.user;
  };

  const updateUserProfile = async (updates) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : prev));
    const res = await profileService.updateProfile(updates);
    if (res?.user) {
      setUser((prev) => (prev ? { ...prev, ...res.user } : prev));
    }
  };

  const completeOnboarding = async (payload) => {
    setUser((prev) => (prev ? { ...prev, ...payload, onboardingCompleted: true } : prev));
    const res = await profileService.completeOnboarding(payload);
    if (res?.user) {
      setUser((prev) => (prev ? { ...prev, ...res.user } : prev));
    }
  };

  const logout = () => {
    setStoredToken('');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        login,
        signup,
        loginAsDemo,
        updateUserProfile,
        completeOnboarding,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
