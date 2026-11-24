import mongoose from 'mongoose';

const skillModuleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true },
    duration: { type: String, required: true },
    defaultProgress: { type: Number, default: 0 },
    priority: { type: String, default: 'Recommended' },
    description: { type: String, required: true },
  },
  { timestamps: true },
);

export default mongoose.model('SkillModule', skillModuleSchema);
