/**
 * Centralized API client for SkillBack.
 * Calls the Node.js + Express + MongoDB backend (/api/* via Vite proxy or VITE_API_URL),
 * with graceful fallback to local preview data if the backend server is offline.
 */

import {
  DEMO_USER,
  MENTORS,
  RETURN_ROADMAP_TASKS,
  RETURNSHIP_JOBS,
  SKILL_MODULES,
  TRANSFERABLE_SKILLS_SAMPLE,
} from '../data/mockData';

const API_BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
const TOKEN_KEY = 'skillback_jwt_token_v1';
const LOCAL_ACCOUNTS_KEY = 'skillback_local_accounts_v1';

function getLocalAccounts() {
  try {
    const raw = localStorage.getItem(LOCAL_ACCOUNTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalAccounts(accounts) {
  try {
    localStorage.setItem(LOCAL_ACCOUNTS_KEY, JSON.stringify(accounts));
  } catch {
    // Ignore storage quota errors
  }
}

function makeInitials(name = 'SB') {
  return (
    name
      .trim()
      .split(/\s+/)
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'SB'
  );
}

export function getStoredToken() {
  try {
    return localStorage.getItem(TOKEN_KEY) || '';
  } catch {
    return '';
  }
}

export function setStoredToken(token) {
  try {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
  } catch {
    // Ignore storage errors
  }
}

class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

async function request(path, options = {}) {
  const token = getStoredToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const contentType = res.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    // Non-JSON responses (e.g. Vite proxy 500 text or Vercel HTML SPA rewrite) indicate no live API
    throw new ApiError('Backend API unavailable', 503);
  }

  const data = await res.json();

  if (!res.ok) {
    throw new ApiError(data?.message || `Request failed (${res.status})`, res.status);
  }
  return data;
}

function isNetworkOrProxyError(err) {
  return (
    err instanceof TypeError ||
    [404, 405, 502, 503, 504].includes(err?.status) ||
    (err?.status === 500 && (!err?.message || err.message.startsWith('Request failed')))
  );
}

export const authService = {
  async login({ email, password }) {
    try {
      return await request('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
    } catch (err) {
      if (!isNetworkOrProxyError(err)) throw err;
      const cleanEmail = (email || '').trim().toLowerCase();
      const accounts = getLocalAccounts();
      const matched = accounts.find((acc) => acc.email.toLowerCase() === cleanEmail);
      if (matched) {
        if (matched.password && password && matched.password !== password) {
          throw new ApiError('Invalid email or password.', 401);
        }
        const publicUser = { ...matched };
        delete publicUser.password;
        return { user: publicUser, token: 'offline_demo_token' };
      }
      return {
        user: { ...DEMO_USER, email: cleanEmail || DEMO_USER.email },
        token: 'offline_demo_token',
      };
    }
  },

  async signup({ name, email, password, targetRole }) {
    try {
      return await request('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password, targetRole }),
      });
    } catch (err) {
      if (!isNetworkOrProxyError(err)) throw err;
      const cleanName = (name || 'New Returner').trim();
      const cleanEmail = (email || DEMO_USER.email).trim().toLowerCase();
      const accounts = getLocalAccounts();
      const existing = accounts.find((acc) => acc.email.toLowerCase() === cleanEmail);
      if (existing) {
        throw new ApiError('An account with this email already exists. Please sign in.', 409);
      }

      const newUser = {
        ...DEMO_USER,
        id: `usr_local_${Date.now()}`,
        name: cleanName,
        email: cleanEmail,
        avatarInitials: makeInitials(cleanName),
        targetRole: targetRole?.trim() || DEMO_USER.targetRole,
        onboardingCompleted: false,
        readinessScore: 62,
      };
      saveLocalAccounts([...accounts, { ...newUser, password }]);
      return {
        user: newUser,
        token: 'offline_demo_token',
      };
    }
  },

  async demoLogin() {
    try {
      return await request('/api/auth/demo', { method: 'POST' });
    } catch (err) {
      if (!isNetworkOrProxyError(err)) throw err;
      return { user: DEMO_USER, token: 'offline_demo_token' };
    }
  },

  async getMe() {
    return request('/api/auth/me');
  },
};

export const profileService = {
  async updateProfile(updates) {
    try {
      return await request('/api/profile', {
        method: 'PATCH',
        body: JSON.stringify(updates),
      });
    } catch (err) {
      if (!isNetworkOrProxyError(err)) throw err;
      return { user: updates };
    }
  },

  async completeOnboarding(payload) {
    try {
      return await request('/api/profile/onboarding', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    } catch (err) {
      if (!isNetworkOrProxyError(err)) throw err;
      return { user: { ...payload, onboardingCompleted: true, readinessScore: 82 } };
    }
  },
};

export const agentService = {
  async translateCareerBreak({ pastRole, breakDuration, breakActivities, tone }) {
    try {
      return await request('/api/agents/translate-break', {
        method: 'POST',
        body: JSON.stringify({ pastRole, breakDuration, breakActivities, tone }),
      });
    } catch (err) {
      if (!isNetworkOrProxyError(err)) throw err;
      const tonePrefix =
        tone === 'executive'
          ? 'Strategic leader returning with refreshed operational mastery:'
          : tone === 'impact'
            ? 'Outcome-driven specialist re-entering the workforce:'
            : 'Seasoned professional returning with renewed clarity and focus:';

      return {
        headline: `${tonePrefix} ${pastRole || 'Senior Product Manager'} (${breakDuration || '3-year'} intentional career pause)`,
        summary: breakActivities?.trim()
          ? `Following an intentional ${breakDuration || 'multi-year'} break dedicated to ${breakActivities.trim()}, I bring battle-tested domain expertise alongside sharpened stakeholder coordination, resilience, and modern AI-enabled workflows.`
          : `Following an intentional ${breakDuration || 'multi-year'} career pause, I am re-entering the field with proven prior execution, fresh technical fluency, and high readiness for immediate team contribution.`,
        translations: TRANSFERABLE_SKILLS_SAMPLE,
        atsReadinessLift: '+29%',
      };
    }
  },

  async evaluateInterviewAnswer({ question, answer }) {
    try {
      return await request('/api/agents/interview-feedback', {
        method: 'POST',
        body: JSON.stringify({ question, answer }),
      });
    } catch (err) {
      if (!isNetworkOrProxyError(err)) throw err;
      const wordCount = (answer || '').trim().split(/\s+/).filter(Boolean).length;
      const clarity = wordCount > 25 ? 88 : 72;
      const confidence = /apologize|sorry|just a mom|only/i.test(answer || '') ? 68 : 90;
      const impact = /\d+%|\$|launched|led|grew|built|reduced/i.test(answer || '') ? 86 : 74;

      return {
        scores: { clarity, confidence, impact },
        strengths: [
          'Frames your transition forward-looking rather than defensive.',
          'Establishes clear ownership and professional identity early.',
        ],
        suggestions: [
          wordCount < 30
            ? 'Expand slightly with one concrete metric or deliverable from your past or break project.'
            : 'Great pacing—tighten the closing sentence so it lands directly on why this role excites you.',
        ],
      };
    }
  },
};

export const workspaceService = {
  async getRoadmap() {
    try {
      const data = await request('/api/workspace/roadmap');
      return data.tasks;
    } catch (err) {
      if (!isNetworkOrProxyError(err)) throw err;
      return RETURN_ROADMAP_TASKS;
    }
  },

  async toggleRoadmapTask(taskId) {
    try {
      const data = await request(`/api/workspace/roadmap/${taskId}/toggle`, {
        method: 'PATCH',
      });
      return data.task;
    } catch (err) {
      if (!isNetworkOrProxyError(err)) throw err;
      return null;
    }
  },

  async getSkillModules() {
    try {
      const data = await request('/api/workspace/modules');
      return data.modules;
    } catch (err) {
      if (!isNetworkOrProxyError(err)) throw err;
      return SKILL_MODULES;
    }
  },

  async updateSkillModuleProgress(moduleId) {
    try {
      const data = await request(`/api/workspace/modules/${moduleId}/progress`, {
        method: 'PATCH',
        body: JSON.stringify({}),
      });
      return data.module;
    } catch (err) {
      if (!isNetworkOrProxyError(err)) throw err;
      return null;
    }
  },

  async getJobs(params = {}) {
    try {
      const qs = new URLSearchParams();
      if (params.q) qs.set('q', params.q);
      if (params.mentorship) qs.set('mentorship', 'true');
      if (params.flexible) qs.set('flexible', 'true');
      const queryStr = qs.toString() ? `?${qs.toString()}` : '';
      const data = await request(`/api/workspace/jobs${queryStr}`);
      return data.jobs;
    } catch (err) {
      if (!isNetworkOrProxyError(err)) throw err;
      return RETURNSHIP_JOBS.map((j) => ({
        ...j,
        saved: j.id === 'job-1',
        applied: false,
      }));
    }
  },

  async toggleSaveJob(jobId) {
    try {
      return await request(`/api/workspace/jobs/${jobId}/save`, { method: 'POST' });
    } catch (err) {
      if (!isNetworkOrProxyError(err)) throw err;
      return null;
    }
  },

  async applyToJob(jobId) {
    try {
      return await request(`/api/workspace/jobs/${jobId}/apply`, { method: 'POST' });
    } catch (err) {
      if (!isNetworkOrProxyError(err)) throw err;
      return null;
    }
  },

  async getMentors() {
    try {
      const data = await request('/api/workspace/mentors');
      return data.mentors;
    } catch (err) {
      if (!isNetworkOrProxyError(err)) throw err;
      return MENTORS.map((m) => ({ ...m, booked: false }));
    }
  },

  async bookMentor(mentorId) {
    try {
      return await request(`/api/workspace/mentors/${mentorId}/book`, { method: 'POST' });
    } catch (err) {
      if (!isNetworkOrProxyError(err)) throw err;
      return null;
    }
  },
};
