import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import { ensureSeedData } from './seedData.js';

async function run() {
  const ok = await connectDB();
  if (!ok) {
    process.exit(1);
  }
  const user = await ensureSeedData();
  console.log(`Seed complete. Demo returner ready: ${user.email}`);
  await mongoose.disconnect();
}

run();
