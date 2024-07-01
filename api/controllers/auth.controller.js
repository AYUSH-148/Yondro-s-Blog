import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        next(errorHandler(400, 'All fields are required'));
    }

    if (password.length < 6) {
        return next(errorHandler(400, "Password must be atleast 6 character"))
    }
    const hashedpassword = bcryptjs.hashSync(password, 10);

    if(req.body.username.length < 7 || req.body.username.length > 20 ){
        return next(errorHandler(400, 'Username must be between 7 and 20 characters'));
    }
    if(req.body.username.includes(" ")){
        return next(errorHandler(400, 'Username cannot contain spaces'));
    }
    if(req.body.username !== req.body.username.toLowerCase()) {
        return next(errorHandler(400, 'Username must be lowercase'));
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
        return next(errorHandler(400, 'Username can only contain letters and numbers'));
    }

    const newUser = new User({
        username,
        email,
        password: hashedpassword,
    });
    try {
        await newUser.save();
        res.json("Signed Up successfully");
    } catch (error) {
        next(error);
    }
}

export const signin = async(req,res,next)=>{
    const {email,password} = req.body;
    if (!email || !password || email === '' || password === '') {
        next(errorHandler(400, 'All fields are required'));
    }
    try {
        const validUser = await User.findOne({email});
        if(!validUser){
            return next(errorHandler(404,'User not found'));
        }
        const validPassword = bcryptjs.compareSync(password,validUser.password);
        if(!validPassword){
            return next(errorHandler(400, 'Invalid password'));
        }
        const token = jwt.sign(
            {id:validUser._id, isAdmin : validUser.isAdmin},
            process.env.JWT_SECRET
        )
        const {password:pass ,...rest} = validUser._doc;
        res.status(200).cookie('access_token',token,{httpOnly:true}).json(rest);
    } catch (error) {
        next(error);
    }
}
export const google = async (req,res,next)=>{
    const {email,name,googlePhotoUrl} = req.body;
    try {
        const validUser = await User.findOne({email});
        if(validUser){
            const token = jwt.sign(
                {id:validUser._id, isAdmin : validUser.isAdmin},
                process.env.JWT_SECRET
            )
            const { password, ...rest } = validUser._doc;
            res.status(200).cookie('access_token', token, {httpOnly: true,})
            .json(rest);
        }
        else{
            const generatedPassword =  Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword,10);
            const newUser = new User({
                username:name.toLowerCase().split(" ").join('')+Math.random().toString(9).slice(-4),
                email,
                password:hashedPassword,
                profilePicture: googlePhotoUrl,
            })
            await newUser.save();
            const token = jwt.sign({id:newUser.password,isAdmin:newUser.isAdmin},process.env.JWT_SECRET);
            const {password,...rest} = newUser._doc;
            res.status(200).cookie("access_token",token,{httpOnly:true}).json(rest);
        }
    } catch (error) {
        next(error);
    }
}