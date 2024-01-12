import express from 'express';
import {
  getProducts,
  getProductById,
} from '../controllers/productCOntroller.js';

const router = express.Router();

router.route('/').get(getProducts);
router.route('/:id').get(getProductById);

// router.get(
//   '/',
//   asyncHandler(async (req, res) => {
//     const products = await Product.find({});
//     res.json(products);
//   })
// );

export default router;
