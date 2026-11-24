import 'dotenv/config';
import app from './src/app.js';
import { connectDB } from './src/config/db.js';
import { ensureSeedData } from './src/utils/seedData.js';

const PORT = Number(process.env.PORT) || 5000;

app.listen(PORT, () => {
  console.log(`SkillBack API listening on http://localhost:${PORT}`);
});

connectDB().then((connected) => {
  if (connected) {
    ensureSeedData().catch((err) => console.error('Seed error:', err.message));
  } else {
    console.warn('MongoDB not reachable at startup. Check MONGODB_URI in backend/.env.');
  }
});
