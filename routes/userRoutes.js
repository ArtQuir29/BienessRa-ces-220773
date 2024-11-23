import express from 'express';
import {
    formularioPasswordRecovery,
    formularioRegister,
    formularioLogin,
    createNewUser,
    confirm
} from '../controllers/userController.js';

const router = express.Router();

router.get('/login', formularioLogin);
router.get('/createAccount', formularioRegister);
router.post('/createAccount', createNewUser);
router.get('/confirm/:token', confirm);
router.get('/passwordRecovery', formularioPasswordRecovery);

export default router;