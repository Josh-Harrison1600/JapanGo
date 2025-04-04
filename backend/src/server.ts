import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './routes/menuRoutes';
import hoursRoute from './routes/hoursRoute';
import uploadRoute from './routes/uploadRoute';
import authRoute from './routes/authRoute';
import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI as string)
  .then(() => console.log('DB Connected'))
  .catch((err) => console.log(err));

// Routes
app.use('/menu-items', routes);
app.use('/hours', hoursRoute);
app.use('/upload-image', uploadRoute);
app.use('/auth', authRoute);

// Base route
app.get('/', (req, res) => {
  res.send('API is running...');
});


//For the sitemap.xml
app.get('/sitemap.xml', async (req, res) => {
  try {
    const links = [
      { url: '/', changefreq: 'daily', priority: 1.0 },
      { url: '/shop', changefreq: 'weekly', priority: 0.8 },
      { url: '/contact-us', changefreq: 'monthly', priority: 0.6 },
      { url: '/admin/login', changefreq: 'monthly', priority: 0.4 },
    ];

    const stream = new SitemapStream({ hostname: process.env.HOSTNAME }); 

    const xml = await streamToPromise(Readable.from(links).pipe(stream)).then(data =>
      data.toString()
    );

    res.header('Content-Type', 'application/xml');
    res.send(xml);
  } catch (err) {
    console.error('Sitemap error:', err);
    res.status(500).send('Error generating sitemap');
  }
});


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
