import {Router} from 'express';
const router = Router();

// Importing all controllers
import * as controller from '../controllers/appController.js'
import Auth from '../middleware/auth.js';

/** POST methods */
router.route('/register').post(controller.register);
//router.route('/registerMail').post();   
 router.route('/authenticate').post((req,res)=> res.end());
 router.route('/login').post(controller.VerifyUser, controller.login);

/**GET Methods  */
router.route('/user/:username').get(controller.getUser)
router.route('/generateOTP').get(controller.generateOTP)
router.route('/verifyOTP').get(controller.verifyOTP)
router.route('createResetSession').get(controller.createResetSession)


/**PUT Methods */
router.route('/updateuser').put( Auth, controller.updateUser);    // to update the userProfile = 1st it will authenticate user then it will update user
router.route('/resetPassword').put(controller.resetPassword); // Use to Reset Password


export default router;