const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const validator = require('validator')

const createToken =(id)=>{
    return  jwt.sign(
        {id},
        process.env.JWT_TOKEN_SECRET
    )
}

//login
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log("LOGIN attempt with:", email);

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            console.log("User not found");
            return res.status(400).json({ message: "Invalid Email or Password" });
        }

        console.log("User found:", user);

        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password match:", isMatch);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password or Email" });
        }

        const token = createToken(user._id);
        console.log("Token created:", token);
        res.status(200).json({ token });
    } catch (error) {
        console.log("LOGIN ERROR BACKEND:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


//register
const registerUser = async(req,res)=>{
    const {name,email,password} = req.body
    try{
        const exists = await userModel.findOne({email})
        if(exists)
            return res.status(400).json({"message":"Email already exists"})
        if(!validator.isEmail(email))
             return res.status(400).json({"message":"Invalid Email"})
        if(password.length<8)
            return res.status(400).json({"message":"Password must be atleast 8 chars long"})

        const hashedPassword = await bcrypt.hash(password,10)
        const user = await userModel.create({
            name,email,password:hashedPassword

        })
        res.status(201).json({"message":"User registered successfully"})

    }catch (error){
        console.log(error)
        res.status(500).json({"message":"Internal Server Error"})
    }

}

module.exports= {loginUser,registerUser}
