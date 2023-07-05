const User = require("../models/user.schema");
const tryCatchHandler = require('../utils/tryCatchHandler')
const CustomError = require("../utils/customError");



// 
exports.cookieOptions={
    expires: new Date (Date.now() + 3 * 24 * 60 *60 * 1000),
    httpOnly: true,

    // could be in separate file in utils 
}
 
// signup controller
exports.signup = tryCatchHandler(async (req, res, next) => {
    // collect data from frontend
    const {name, email, password} = req.body

    if(!name || !email || !password){
        throw new CustomError('Please fill all fields', 400)
    }

    // check if user exists

    const existingUser =await User.findOne({email})

    if (existingUser){
        throw new CustomError('User alreaady exists',400)
    }

    const user = await User.create({
        name,
        email,
        password
    })

    const token = user.getJwtToken()
    console.log(user);
    user.password = undefined

    res.cookie("token", token, this.cookieOptions);
    res.status(200).json({
        success:true,
        token,
        user
    })
});

// login controller
exports.login = tryCatchHandler (async(req,res) =>{
    const {email, password} = req.body

    if( !email || !password){
        throw new CustomError('Please fill all fields', 400)
    }

    const user= await User.findOne({email}).select("+password")

    if(!user){
        throw new CustomError('Invalid credentials', 400)
    }

    const isPasswordMatched =await user.comparePassword(password)

    if(isPasswordMatched){
        const token = user.getJwtToken()
        user.password = undefined;
        res.cookie("token", token, this.cookieOptions)
        return res.status(200).json({
            success:true,
            token,
            user
        })
    }

    throw new CustomError('Invalid credentials - pass', 400)
})

// logout controller
exports.logout = tryCatchHandler(async (_req, res) =>{
    // res.clearCookie()
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: "Logged Out"
    })
})

// get profile controller

exports.getProfile = tryCatchHandler(async(req, res)=>{
    // req.user
    const {user} =  req;

    if (! user){
        throw new CustomError('user not  found ', 404)
    }

    res.status(200).json({
        success:true,
        user
    })
})






