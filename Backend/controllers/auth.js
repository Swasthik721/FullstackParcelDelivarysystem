const Cryptojs = require("crypto-js");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const dotenv = require("dotenv");

dotenv.config();


//Register User

 const registerUser = async (req,res) =>{
const newUser = User({
       fullname:req.body.fullname,
       email:req.body.email,
       age:req.body.age,
       country:req.body.country,
       address:req.body.address,
       password:Cryptojs.AES.encrypt(
        req.body.password,
        process.env.pass
       ).toString()
    });

    try {
        
        constuser =await newUser.save();
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
}

//Login User

 const loginUser = async(req,res) =>{
 try {
        const user = await User.findOne({email:req.body.email});
        if(!user){
            return res.status(401).json("You have not registered");
        }

         const hashedPassword = Cryptojs.AES.decrypt(
           user.password,
           process.env.PASS
         )
        const originalPassword = hashedPassword.toString(Cryptojs.enc.Utf8);
        
        if(originalPassword !== req.body.password){

            return res.status(500).json("Wrong Password");
        }
        const {password, ...info} = user._doc;

        const assessToken = jwt.sign(
           {id:user._id, role:user.role},
            process.env.JWT_SEC,
            {expiresIN: "10d"}
        )
        res.status(200).json({...info, accessToken});
          
    } catch (error) {
        res.status(500).json(error)
    }
}
module.exports={loginUser, }