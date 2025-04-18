import express, { Request, Response } from 'express';
import MenuItem, { IMenuItem } from '../models/MenuItem';

const router = express.Router();

//Get all
router.get('/', async (req: Request, res: Response) => {
    try{
        const query : any = {};
        if (typeof req.query.archived !== 'undefined') {
            query.archived = req.query.archived === 'true';
          }        const items = await MenuItem.find(query)
        res.json(items);
    }catch(err){
        res.status(500).json({ message: "Error fetching items"})
    }
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
router.put('/archive/:id', async (req, res) => {
    try{
        const item = await MenuItem.findByIdAndUpdate(req.params.id, { archived: true }, { new: true});
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
router.put('/restore/:id', async (req, res) => {
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


//Permanently Delete
router.delete('/archive/:id', async (req: Request, res: Response) => {
    try{
        const item = await MenuItem.findByIdAndDelete(req.params.id);
        if(!item){
            res.status(404).json({ message: "Item not found" })
            return;
        }
        res.json({ message: "Item permanently deleted!"})
    }catch(err){
        console.error("Error deleting item:", err)
        res.status(500).json({ message: "Error deleting item"})
    }
});

export default router;