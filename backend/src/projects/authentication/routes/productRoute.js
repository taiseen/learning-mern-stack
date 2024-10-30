import tokenValidation from '../middleware/tokenValidation.js';
import products from '../controllers/products.js';
import express from 'express'


const router = express.Router();


router.get('/', tokenValidation, products);


export default router;