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





