// seedHours.ts
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Hours from './Hours'; // adjust the path if needed

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('Connected to DB');

    // Clear existing hours (optional)
    await Hours.deleteMany({});

    // Insert initial hours
    await Hours.create({
      monday: '11:30 a.m. – 10 p.m.',
      tuesday: '11:30 a.m. – 10 p.m.',
      wednesday: '11:30 a.m. – 10 p.m.',
      thursday: '11:30 a.m. – 10 p.m.',
      friday: '11:30 a.m. – 10:30 p.m.',
      saturday: '11:30 a.m. – 10:30 p.m.',
      sunday: '12:00 a.m.– 9:30 p.m.',
    });

    console.log('Hours seeded successfully ✅');
    process.exit();
  } catch (error) {
    console.error('Failed to seed hours ❌', error);
    process.exit(1);
  }
};

seed();
