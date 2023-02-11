import {Router} from 'express';
const router = Router();

// Importing all controllers
import * as controller from '../controllers/appController.js'
import Auth ,{localVariables} from '../middleware/auth.js';
import {registerMail} from '../controllers/mailer.js'

/** POST methods */
router.route('/register').post(controller.register);
router.route('/registerMail').post(registerMail);   
 router.route('/authenticate').post(controller.VerifyUser, (req,res)=> res.end());
 router.route('/login').post(controller.VerifyUser, controller.login);

/**GET Methods  */
router.route('/user/:username').get(controller.getUser)
router.route('/generateOTP').get( controller.VerifyUser, localVariables, controller.generateOTP)
router.route('/verifyOTP').get(controller.VerifyUser,controller.verifyOTP)
router.route('createResetSession').get(controller.createResetSession)


/**PUT Methods */
router.route('/updateuser').put( Auth, controller.updateUser);    // to update the userProfile = 1st it will authenticate user then it will update user
router.route('/resetPassword').put( controller.VerifyUser, controller.resetPassword); // Use to Reset Password


export default router;