import express, { Request, Response } from 'express';
import Hours from '../models/Hours';

const router = express.Router();

//GET Hours
router.get('/', async (req: Request, res: Response) => {
    try{
        const doc = await Hours.findOne();
        res.json(doc);
    }catch(err){
        res.status(500).json({error: 'Failed to get hours'});
    }
});

//Update
router.put('/', async (req: Request, res: Response) => {
    try{
        const updatedHours = req.body;
        await Hours.findOneAndUpdate({}, updatedHours, { upsert: true});
        res.sendStatus(200);
    }catch(err){
        res.status(500).json({error: 'Failed to update hours'});
    }
});

export default router;