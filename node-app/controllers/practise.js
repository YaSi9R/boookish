const practise = require('../models/practise');

exports.practise = async (req, res) => {
  try {
    const { name, number } = req.body;

    const practiseObj = await practise.create({ name, number });

    res.status(201).json(practiseObj);
  } catch (error) {
    console.error('Error while creating practise object:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
