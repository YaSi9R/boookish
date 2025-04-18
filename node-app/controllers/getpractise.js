const practise = require('../models/practise');
exports.getpractise = async (req, res) => {
    try {
        const data = await practise.find({});
        res.status(201).json(data);
    }
    catch (error) {
        console.error("Error in get controller",error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}