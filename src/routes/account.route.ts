import { Router } from 'express';
import accountController from '../controllers/account.controller';
import AuthGuard from '../utils/auth.guard';

export const accountRoute = Router();

accountRoute.post('/createAccount', accountController.signUp);
accountRoute.post('/login', accountController.login);
