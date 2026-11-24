import mongoose from 'mongoose';

const mentorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true },
    breakNote: { type: String, required: true },
    circle: { type: String, required: true },
    availability: { type: String, required: true },
    initials: { type: String, required: true },
  },
  { timestamps: true },
);

export default mongoose.model('Mentor', mentorSchema);
