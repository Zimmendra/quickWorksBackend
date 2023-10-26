import { Router } from 'express';
import userController from '../controllers/user.controller';
export const userRoute = Router();
// Route needed
userRoute.post('/createReview', userController.createReview);
userRoute.get('/getReview/:user_id', userController.getReview);
userRoute.put('/updateReview', userController.updateReview);
userRoute.delete('/deleteReview/:review_id', userController.deleteReview);
