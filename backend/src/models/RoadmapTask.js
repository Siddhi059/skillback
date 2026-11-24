import mongoose from 'mongoose';

const roadmapTaskSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    phase: { type: String, required: true },
    title: { type: String, required: true },
    duration: { type: String, default: '20 mins' },
    status: {
      type: String,
      enum: ['pending', 'in_progress', 'completed'],
      default: 'pending',
    },
    category: { type: String, default: 'General' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export default mongoose.model('RoadmapTask', roadmapTaskSchema);
