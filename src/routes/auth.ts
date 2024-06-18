import express, { Router } from 'express';
import userLogin from '../controllers/authentication/userLogIn.js';
import userLogout from '../controllers/authentication/userLogout.js';
import divyangLogin from '../controllers/authentication/divyangLogin.js';
import divyangLogout from '../controllers/authentication/divyangLogout.js';
import { postDivyang } from '../controllers/divyangDetails/post.js';
import divyangForgetPassword from '../controllers/authentication/divyangForgotPassword.js';
import updatePassword from '../controllers/authentication/updatePassword.js';
import userForgetPassword from '../controllers/authentication/userForgotPassword.js';
import errorHandler from '../middlewares/errorHandler/errorHandler.js';
import superAdminLogin from '../controllers/authentication/superAdmin.js';
import fileHandler from '../middlewares/fileHandler/fileHandler.js';
const authRouter = Router();

authRouter.use(express.json());

authRouter.post('/divyang/login', divyangLogin);
authRouter.post(
  '/divyang/signup',
  fileHandler.fields([{ name: 'profilePhoto', maxCount: 1 }]),
  postDivyang
);
authRouter.post('/divyang/logout', divyangLogout);
authRouter.post('/divyang/forgetpassword', divyangForgetPassword);
authRouter.post('/user/login', userLogin);
authRouter.post('/user/logout', userLogout);
authRouter.post('/user/forgetpassword', userForgetPassword);
authRouter.post('/updatePassword/:id', updatePassword);
authRouter.post('/admin/login', superAdminLogin);

authRouter.use(errorHandler);

export default authRouter;
