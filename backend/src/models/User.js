import mongoose from 'mongoose';

const moduleProgressSchema = new mongoose.Schema(
  {
    moduleId: { type: mongoose.Schema.Types.ObjectId, ref: 'SkillModule', required: true },
    progress: { type: Number, default: 0, min: 0, max: 100 },
  },
  { _id: false },
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true, select: false },
    avatarInitials: { type: String, default: 'SB' },

    // Career Returner Profile
    previousRole: { type: String, default: '' },
    previousCompany: { type: String, default: '' },
    yearsPriorExperience: { type: Number, default: 3 },
    breakDuration: { type: String, default: '1–2 years' },
    breakReason: { type: String, default: 'Family & Caregiving' },
    breakHighlights: { type: String, default: '' },
    targetRole: { type: String, default: 'Product Manager' },
    targetIndustry: { type: String, default: 'Technology & SaaS' },
    workPreference: { type: String, default: 'Hybrid or Remote (Flexible Core Hours)' },
    selectedFlex: { type: [String], default: ['Remote First', 'Flexible Core Hours'] },

    // Progress & Readiness Metrics
    readinessScore: { type: Number, default: 68, min: 0, max: 100 },
    translatedSkillsCount: { type: Number, default: 6 },
    interviewConfidence: { type: Number, default: 72, min: 0, max: 100 },
    onboardingCompleted: { type: Boolean, default: false },

    // Workspace Interactions
    savedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
    appliedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
    bookedMentors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Mentor' }],
    moduleProgress: { type: [moduleProgressSchema], default: [] },
  },
  { timestamps: true },
);

userSchema.methods.toPublicProfile = function toPublicProfile() {
  return {
    id: this._id.toString(),
    name: this.name,
    email: this.email,
    avatarInitials: this.avatarInitials,
    previousRole: this.previousRole,
    previousCompany: this.previousCompany,
    yearsPriorExperience: this.yearsPriorExperience,
    breakDuration: this.breakDuration,
    breakReason: this.breakReason,
    breakHighlights: this.breakHighlights,
    targetRole: this.targetRole,
    targetIndustry: this.targetIndustry,
    workPreference: this.workPreference,
    selectedFlex: this.selectedFlex,
    readinessScore: this.readinessScore,
    translatedSkillsCount: this.translatedSkillsCount,
    interviewConfidence: this.interviewConfidence,
    onboardingCompleted: this.onboardingCompleted,
    savedJobs: (this.savedJobs || []).map((id) => id.toString()),
    appliedJobs: (this.appliedJobs || []).map((id) => id.toString()),
    bookedMentors: (this.bookedMentors || []).map((id) => id.toString()),
  };
};

export default mongoose.model('User', userSchema);
