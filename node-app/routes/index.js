const express=require('express');
const router=express.Router();
const {practise}=require('../controllers/practise');
const {getpractise} =require('../controllers/getpractise');
router.post('/practise',practise);
router.get('/get',getpractise);
module.exports=router;