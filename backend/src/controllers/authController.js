import bcrypt from 'bcryptjs';
import { signToken } from '../middleware/auth.js';
import RoadmapTask from '../models/RoadmapTask.js';
import SkillModule from '../models/SkillModule.js';
import User from '../models/User.js';
import { DEFAULT_ROADMAP_TASKS, ensureSeedData } from '../utils/seedData.js';

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

export async function register(req, res, next) {
  try {
    const { name, email, password, targetRole } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required.' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters.' });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: 'An account with this email already exists.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const modules = await SkillModule.find();

    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      passwordHash,
      avatarInitials: makeInitials(name),
      targetRole: targetRole?.trim() || 'Product Manager',
      onboardingCompleted: false,
      readinessScore: 62,
      moduleProgress: modules.map((mod) => ({ moduleId: mod._id, progress: 0 })),
    });

    await RoadmapTask.insertMany(
      DEFAULT_ROADMAP_TASKS.map((t) => ({ ...t, status: 'pending', userId: user._id })),
    );

    const token = signToken(user._id);
    return res.status(201).json({ user: user.toPublicProfile(), token });
  } catch (err) {
    return next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+passwordHash');
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const matches = await bcrypt.compare(password, user.passwordHash);
    if (!matches) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const token = signToken(user._id);
    return res.json({ user: user.toPublicProfile(), token });
  } catch (err) {
    return next(err);
  }
}

export async function demoLogin(_req, res, next) {
  try {
    const demoUser = await ensureSeedData();
    const token = signToken(demoUser._id);
    return res.json({ user: demoUser.toPublicProfile(), token });
  } catch (err) {
    return next(err);
  }
}

export async function getMe(req, res) {
  return res.json({ user: req.user.toPublicProfile() });
}
