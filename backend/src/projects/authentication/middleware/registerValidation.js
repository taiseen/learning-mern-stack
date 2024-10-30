import httpStatus from 'http-status';
import Joi from 'joi';


const registerValidation = (req, res, next) => {

    const userGivenData = req.body;

    const schema = Joi.object({
        name: Joi.string().min(2).max(100).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required()
    });


    const { error } = schema.validate(userGivenData);


    if (error) {
        return res
            .status(httpStatus.BAD_REQUEST) // 400 status code
            .json({ message: "Bad request", error })
    }

    
    next(); // if all OK ==> then go to registration process
}

export default registerValidation;