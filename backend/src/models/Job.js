import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    location: { type: String, required: true },
    type: { type: String, required: true },
    compensation: { type: String, default: '' },
    matchScore: { type: Number, default: 85, min: 0, max: 100 },
    breakFriendly: { type: Boolean, default: true },
    mentorship: { type: Boolean, default: false },
    flexibleHours: { type: Boolean, default: false },
    tags: { type: [String], default: [] },
    summary: { type: String, required: true },
  },
  { timestamps: true },
);

export default mongoose.model('Job', jobSchema);
