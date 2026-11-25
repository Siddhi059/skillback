import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/useAuth';
import AppShell from './components/layout/AppShell';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import OnboardingPage from './pages/OnboardingPage';
import DashboardPage from './pages/DashboardPage';
import ResumeTranslatorPage from './pages/ResumeTranslatorPage';
import SkillRoadmapPage from './pages/SkillRoadmapPage';
import InterviewCoachPage from './pages/InterviewCoachPage';
import JobsBoardPage from './pages/JobsBoardPage';
import BiasAuditPage from './pages/BiasAuditPage';
import CommunityPage from './pages/CommunityPage';
import SettingsPage from './pages/SettingsPage';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />

          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <AppShell />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="onboarding" element={<OnboardingPage />} />
            <Route path="resume-translator" element={<ResumeTranslatorPage />} />
            <Route path="skill-roadmap" element={<SkillRoadmapPage />} />
            <Route path="interview-coach" element={<InterviewCoachPage />} />
            <Route path="jobs" element={<JobsBoardPage />} />
            <Route path="bias-audit" element={<BiasAuditPage />} />
            <Route path="community" element={<CommunityPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
