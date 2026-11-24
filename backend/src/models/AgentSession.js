import mongoose from 'mongoose';

const agentSessionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    agentType: {
      type: String,
      enum: ['resume_translator', 'interview_coach'],
      required: true,
    },
    input: { type: mongoose.Schema.Types.Mixed, required: true },
    output: { type: mongoose.Schema.Types.Mixed, required: true },
    provider: { type: String, default: 'structured_preview_v1' },
  },
  { timestamps: true },
);

export default mongoose.model('AgentSession', agentSessionSchema);
