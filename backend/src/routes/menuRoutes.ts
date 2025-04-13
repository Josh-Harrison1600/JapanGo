import express, { Request, Response } from 'express';
import MenuItem, { IMenuItem } from '../models/MenuItem';

const router = express.Router();

//Get all
router.get('/', async (req: Request, res: Response) => {
    const items = await MenuItem.find();
    res.json(items);
});

//Create
router.post('/', async (req: Request, res: Response) => {
    const { name, category, price, description, imageUrl } = req.body;
    const newItem = new MenuItem({ name, category, price, description, imageUrl });
    await newItem.save();
    res.status(201).json(newItem);
});

//Update
router.put('/:id', async (req: Request, res: Response) => {
    const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(item);
});

//Archive
router.put('/menu-items/archive/:id', async (req, res) => {
    try{
        const item = await MenuItem.findByIdAndUpdate(req.params.id, { archived: false }, { new: true});
        if(!item){
            res.status(404).json({ message: "Item not found" })
            return;
        }
        res.json(item);
    }catch(err){
        res.status(500).json({ message: "Error archiving item" })
    }
})


//Restore
router.put('/menu-items/restore/:id', async (req, res) => {
    try{
        const item = await MenuItem.findByIdAndUpdate(req.params.id, { archived: false }, { new: true});
        if(!item){
            res.status(404).json({ message: "Item not found" })
            return;
        }
        res.json(item);
    }catch(err){
        res.status(500).json({ message: "Error restoring item" })
    }
})


//Delete
router.delete('/:id', async (req: Request, res: Response) => {
    await MenuItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted' });
});

export default router;