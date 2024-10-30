import registerValidation from '../middleware/registerValidation.js';
import registration from '../controllers/auth/registration.js';
import loginValidation from '../middleware/loginValidation.js';
import tokenValidation from '../middleware/tokenValidation.js';
import refreshToken from '../helper/refreshToken.js';
import logout from '../controllers/auth/logout.js';
import login from '../controllers/auth/login.js';
import express from 'express'


const router = express.Router();


// user sending data, ✅ creation operation...
router.post('/register', registerValidation, registration); 

// user sending data, 🔎 checking operation...
router.post('/login', loginValidation, login); 

// user sending data, 🔎 checking operation...
router.post('/logout', tokenValidation, logout); 

router.post('/refresh-token', refreshToken); 



export default router;





// 📝 Learning Note:-
// if user hit by browser at this url ==> /auth/login/
// server replay as an error ==> 404
// because this url method is [.post]
// if this url method is [.get] then user get replay from server

// so why [.post] ?
// [.post] ==> because user send some data to server | backend...
// [.post] ==> all of the input values of form, send to the backend...