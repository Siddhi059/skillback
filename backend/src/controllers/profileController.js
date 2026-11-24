const ALLOWED_PROFILE_FIELDS = [
  'name',
  'previousRole',
  'previousCompany',
  'yearsPriorExperience',
  'breakDuration',
  'breakReason',
  'breakHighlights',
  'targetRole',
  'targetIndustry',
  'workPreference',
  'selectedFlex',
  'onboardingCompleted',
  'readinessScore',
];

export async function getProfile(req, res) {
  return res.json({ user: req.user.toPublicProfile() });
}

export async function updateProfile(req, res, next) {
  try {
    for (const field of ALLOWED_PROFILE_FIELDS) {
      if (req.body[field] !== undefined) {
        req.user[field] = req.body[field];
      }
    }

    if (req.body.name) {
      req.user.avatarInitials =
        req.body.name
          .trim()
          .split(/\s+/)
          .map((part) => part[0])
          .join('')
          .slice(0, 2)
          .toUpperCase() || req.user.avatarInitials;
    }

    await req.user.save();
    return res.json({ user: req.user.toPublicProfile() });
  } catch (err) {
    return next(err);
  }
}

export async function completeOnboarding(req, res, next) {
  try {
    for (const field of ALLOWED_PROFILE_FIELDS) {
      if (req.body[field] !== undefined) {
        req.user[field] = req.body[field];
      }
    }
    req.user.onboardingCompleted = true;
    req.user.readinessScore = Math.max(req.user.readinessScore || 62, 80);

    await req.user.save();
    return res.json({ user: req.user.toPublicProfile() });
  } catch (err) {
    return next(err);
  }
}
