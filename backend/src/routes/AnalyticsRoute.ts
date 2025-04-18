import express, { Request, Response } from 'express';
import Analytics from '../models/Analytics'; 

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    const { page, action, platform } = req.body;
    try {
      await Analytics.create({ page, action, platform, timestamp: new Date() });
      res.sendStatus(201);
    } catch (err) {
      res.status(500).json({ error: 'Failed to log analytics' });
    }
  });
  
  // GET /analytics/monthly
  router.get('/monthly', async (req: Request, res: Response) => {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    try {
      const count = await Analytics.countDocuments({ timestamp: { $gte: firstDay } });
      res.json({ visitsThisMonth: count });
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch analytics' });
    }
  });
  
export default router;