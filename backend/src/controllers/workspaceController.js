import Job from '../models/Job.js';
import Mentor from '../models/Mentor.js';
import RoadmapTask from '../models/RoadmapTask.js';
import SkillModule from '../models/SkillModule.js';

export async function getRoadmap(req, res, next) {
  try {
    const tasks = await RoadmapTask.find({ userId: req.user._id }).sort({ order: 1, createdAt: 1 });
    return res.json({
      tasks: tasks.map((t) => ({
        id: t._id.toString(),
        phase: t.phase,
        title: t.title,
        duration: t.duration,
        status: t.status,
        category: t.category,
      })),
    });
  } catch (err) {
    return next(err);
  }
}

export async function toggleRoadmapTask(req, res, next) {
  try {
    const task = await RoadmapTask.findOne({ _id: req.params.id, userId: req.user._id });
    if (!task) {
      return res.status(404).json({ message: 'Roadmap task not found.' });
    }
    task.status = task.status === 'completed' ? 'pending' : 'completed';
    await task.save();

    return res.json({
      task: {
        id: task._id.toString(),
        phase: task.phase,
        title: task.title,
        duration: task.duration,
        status: task.status,
        category: task.category,
      },
    });
  } catch (err) {
    return next(err);
  }
}

export async function getSkillModules(req, res, next) {
  try {
    const modules = await SkillModule.find().sort({ createdAt: 1 });
    const progressMap = new Map(
      (req.user.moduleProgress || []).map((entry) => [entry.moduleId.toString(), entry.progress]),
    );

    return res.json({
      modules: modules.map((mod) => {
        const progress = progressMap.has(mod._id.toString())
          ? progressMap.get(mod._id.toString())
          : mod.defaultProgress;
        return {
          id: mod._id.toString(),
          title: mod.title,
          category: mod.category,
          duration: mod.duration,
          progress,
          priority: progress === 100 ? 'Completed' : progress > 0 ? 'In Progress' : mod.priority,
          description: mod.description,
        };
      }),
    });
  } catch (err) {
    return next(err);
  }
}

export async function updateSkillModuleProgress(req, res, next) {
  try {
    const mod = await SkillModule.findById(req.params.id);
    if (!mod) {
      return res.status(404).json({ message: 'Skill module not found.' });
    }

    const idx = (req.user.moduleProgress || []).findIndex(
      (entry) => entry.moduleId.toString() === mod._id.toString(),
    );
    const current = idx >= 0 ? req.user.moduleProgress[idx].progress : mod.defaultProgress;
    const requested = req.body.progress;
    const nextProgress =
      typeof requested === 'number'
        ? Math.max(0, Math.min(100, requested))
        : current >= 100
          ? 0
          : Math.min(100, current + 25);

    if (idx >= 0) {
      req.user.moduleProgress[idx].progress = nextProgress;
    } else {
      req.user.moduleProgress.push({ moduleId: mod._id, progress: nextProgress });
    }
    await req.user.save();

    return res.json({
      module: {
        id: mod._id.toString(),
        title: mod.title,
        category: mod.category,
        duration: mod.duration,
        progress: nextProgress,
        priority: nextProgress === 100 ? 'Completed' : nextProgress > 0 ? 'In Progress' : mod.priority,
        description: mod.description,
      },
    });
  } catch (err) {
    return next(err);
  }
}

export async function getJobs(req, res, next) {
  try {
    const { q, mentorship, flexible } = req.query;
    const filter = {};
    if (mentorship === 'true') filter.mentorship = true;
    if (flexible === 'true') filter.flexibleHours = true;

    let jobs = await Job.find(filter).sort({ matchScore: -1 });
    if (q && q.trim()) {
      const term = q.trim().toLowerCase();
      jobs = jobs.filter((job) =>
        `${job.title} ${job.company} ${job.tags.join(' ')}`.toLowerCase().includes(term),
      );
    }

    const savedSet = new Set((req.user.savedJobs || []).map((id) => id.toString()));
    const appliedSet = new Set((req.user.appliedJobs || []).map((id) => id.toString()));

    return res.json({
      jobs: jobs.map((job) => ({
        id: job._id.toString(),
        title: job.title,
        company: job.company,
        location: job.location,
        type: job.type,
        compensation: job.compensation,
        matchScore: job.matchScore,
        breakFriendly: job.breakFriendly,
        mentorship: job.mentorship,
        flexibleHours: job.flexibleHours,
        tags: job.tags,
        summary: job.summary,
        saved: savedSet.has(job._id.toString()),
        applied: appliedSet.has(job._id.toString()),
      })),
    });
  } catch (err) {
    return next(err);
  }
}

export async function toggleSaveJob(req, res, next) {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found.' });
    }
    const idStr = job._id.toString();
    const exists = (req.user.savedJobs || []).some((id) => id.toString() === idStr);
    if (exists) {
      req.user.savedJobs = req.user.savedJobs.filter((id) => id.toString() !== idStr);
    } else {
      req.user.savedJobs.push(job._id);
    }
    await req.user.save();

    return res.json({ saved: !exists, savedJobs: req.user.savedJobs.map((id) => id.toString()) });
  } catch (err) {
    return next(err);
  }
}

export async function applyToJob(req, res, next) {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found.' });
    }
    const idStr = job._id.toString();
    const exists = (req.user.appliedJobs || []).some((id) => id.toString() === idStr);
    if (!exists) {
      req.user.appliedJobs.push(job._id);
      await req.user.save();
    }

    return res.json({
      applied: true,
      appliedJobs: req.user.appliedJobs.map((id) => id.toString()),
    });
  } catch (err) {
    return next(err);
  }
}

export async function getMentors(req, res, next) {
  try {
    const mentors = await Mentor.find().sort({ createdAt: 1 });
    const bookedSet = new Set((req.user.bookedMentors || []).map((id) => id.toString()));

    return res.json({
      mentors: mentors.map((m) => ({
        id: m._id.toString(),
        name: m.name,
        role: m.role,
        breakNote: m.breakNote,
        circle: m.circle,
        availability: m.availability,
        initials: m.initials,
        booked: bookedSet.has(m._id.toString()),
      })),
    });
  } catch (err) {
    return next(err);
  }
}

export async function bookMentor(req, res, next) {
  try {
    const mentor = await Mentor.findById(req.params.id);
    if (!mentor) {
      return res.status(404).json({ message: 'Mentor not found.' });
    }
    const idStr = mentor._id.toString();
    const exists = (req.user.bookedMentors || []).some((id) => id.toString() === idStr);
    if (!exists) {
      req.user.bookedMentors.push(mentor._id);
      await req.user.save();
    }

    return res.json({
      booked: true,
      bookedMentors: req.user.bookedMentors.map((id) => id.toString()),
    });
  } catch (err) {
    return next(err);
  }
}
