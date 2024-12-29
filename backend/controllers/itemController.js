import itemModel from '../models/itemModel.js';
import fs from 'fs';

// Add a new item
const addItem = async (req, res) => {
    let image = `${req.file.filename}`;
    const item = new itemModel({
        name: req.body.name,
        image: image,
        price: req.body.price,
        category: req.body.category,
        description: req.body.description
    })
    
    try {
        await item.save()
        res.json({success: true, message: 'Item added successfully'})
    }
    catch(error) {
        console.log(error)
        res.json({success: false, message: 'Failed to add item'})
    }
};

export { addItem } ;