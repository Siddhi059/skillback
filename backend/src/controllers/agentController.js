import AgentSession from '../models/AgentSession.js';

const DEFAULT_TRANSLATIONS = [
  {
    lifeContext:
      'Managed multi-generational household budget, medical schedules, and care coordination during career break',
    corporateTranslation: 'Cross-Functional Operations, Risk Prioritization & Resource Allocation',
    impactBullet:
      'Directed complex multi-stakeholder logistics, annual budgeting, and contingency planning under high-ambiguity timelines.',
  },
  {
    lifeContext: 'Led community fundraising committee and digital communications',
    corporateTranslation: 'Stakeholder Engagement, Campaign Strategy & Lifecycle Communications',
    impactBullet:
      'Spearheaded community outreach and program operations, scaling recurring engagement across hundreds of stakeholders.',
  },
  {
    lifeContext: 'Completed self-paced industry refreshers and hands-on micro-projects',
    corporateTranslation: 'Continuous Upskilling & Rapid Digital Prototyping',
    impactBullet:
      'Modernized domain fluency in AI-assisted workflows, data diagnostics, and async collaboration.',
  },
];

/**
 * Break & Resume Translator Agent endpoint.
 * Persists every generation in MongoDB; ready to connect an LLM provider in later steps.
 */
export async function translateCareerBreak(req, res, next) {
  try {
    const { pastRole, breakDuration, breakActivities, tone } = req.body;

    const tonePrefix =
      tone === 'executive'
        ? 'Strategic leader returning with refreshed operational mastery:'
        : tone === 'impact'
          ? 'Outcome-driven specialist re-entering the workforce:'
          : 'Seasoned professional returning with renewed clarity and focus:';

    const cleanRole = pastRole?.trim() || req.user.previousRole || 'Senior Product Manager';
    const cleanDuration = breakDuration?.trim() || req.user.breakDuration || '3.5 years';
    const cleanActivities = breakActivities?.trim() || req.user.breakHighlights;

    const output = {
      headline: `${tonePrefix} ${cleanRole} (${cleanDuration} intentional career pause)`,
      summary: cleanActivities
        ? `Following an intentional ${cleanDuration} break dedicated to ${cleanActivities}, I bring battle-tested domain expertise alongside sharpened stakeholder coordination, resilience, and modern AI-enabled workflows.`
        : `Following an intentional ${cleanDuration} career pause, I am re-entering the field with proven prior execution, fresh technical fluency, and high readiness for immediate team contribution.`,
      translations: DEFAULT_TRANSLATIONS,
      atsReadinessLift: '+29%',
    };

    await AgentSession.create({
      userId: req.user._id,
      agentType: 'resume_translator',
      input: { pastRole: cleanRole, breakDuration: cleanDuration, breakActivities: cleanActivities, tone },
      output,
    });

    req.user.translatedSkillsCount = Math.max(req.user.translatedSkillsCount || 0, 14);
    req.user.readinessScore = Math.min(100, Math.max(req.user.readinessScore || 70, 82));
    await req.user.save();

    return res.json(output);
  } catch (err) {
    return next(err);
  }
}

/**
 * Interview Confidence Coach Agent endpoint.
 * Persists practice evaluations in MongoDB; ready to connect an LLM provider in later steps.
 */
export async function evaluateInterviewAnswer(req, res, next) {
  try {
    const { question, answer } = req.body;
    if (!answer || !answer.trim()) {
      return res.status(400).json({ message: 'Please enter an interview answer to evaluate.' });
    }

    const wordCount = answer.trim().split(/\s+/).filter(Boolean).length;
    const clarity = wordCount > 25 ? 88 : 74;
    const confidence = /apologize|sorry|just a mom|only/i.test(answer) ? 68 : 91;
    const impact = /\d+%|\$|launched|led|grew|built|reduced/i.test(answer) ? 87 : 76;

    const output = {
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

    await AgentSession.create({
      userId: req.user._id,
      agentType: 'interview_coach',
      input: { question, answer },
      output,
    });

    const avg = Math.round((clarity + confidence + impact) / 3);
    req.user.interviewConfidence = Math.max(req.user.interviewConfidence || 70, avg);
    await req.user.save();

    return res.json(output);
  } catch (err) {
    return next(err);
  }
}

export async function getAgentHistory(req, res, next) {
  try {
    const sessions = await AgentSession.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(10);

    return res.json({
      sessions: sessions.map((s) => ({
        id: s._id.toString(),
        agentType: s.agentType,
        input: s.input,
        output: s.output,
        createdAt: s.createdAt,
      })),
    });
  } catch (err) {
    return next(err);
  }
}
