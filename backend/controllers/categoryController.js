import Category from '../models/Category.js';
import Book from '../models/Book.js';
export async function listCategories(req,res,next){try{res.json({success:true,categories:await Category.find().sort('name')})}catch(e){next(e)}}
export async function createCategory(req,res,next){try{res.status(201).json({success:true,category:await Category.create(req.body)})}catch(e){next(e)}}
export async function updateCategory(req,res,next){try{res.json({success:true,category:await Category.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})})}catch(e){next(e)}}
export async function deleteCategory(req,res,next){try{if(await Book.exists({category:req.params.id}))return res.status(409).json({success:false,message:'Category is used by existing books'});await Category.findByIdAndDelete(req.params.id);res.json({success:true,message:'Category deleted'})}catch(e){next(e)}}
