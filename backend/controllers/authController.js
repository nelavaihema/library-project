import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
const view = u => ({ id: u._id, name: u.name, email: u.email, role: u.role });
export async function register(req,res,next){ try { const {name,email,password}=req.body; if(!name||!email||!password||password.length<6) return res.status(400).json({success:false,message:'Name, valid email and 6+ character password are required'}); if(await User.findOne({email})) return res.status(409).json({success:false,message:'Email already registered'}); const user=await User.create({name,email,password:await bcrypt.hash(password,10)}); res.status(201).json({success:true,message:'Registration successful',user:view(user)}); } catch(e){next(e)} }
export async function login(req,res,next){ try { const user=await User.findOne({email:req.body.email}).select('+password'); if(!user||!(await bcrypt.compare(req.body.password,user.password))) return res.status(401).json({success:false,message:'Invalid credentials'}); res.json({success:true,message:'Login successful',token:generateToken(user._id),user:view(user)}); } catch(e){next(e)} }
