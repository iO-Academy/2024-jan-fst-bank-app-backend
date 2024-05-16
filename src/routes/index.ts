import express, {Request, Response} from "express";
export const router = express.Router()
import registerController from "../controllers/registerController";
import tokenMiddleware from "../middleware/tokenMiddleware";
import loginController from "../controllers/loginController";
import customerController from "../controllers/customerController";
import { createNewAccount } from "../controllers/newAccountController";

router.post('/register', registerController);
router.post('/login', loginController)
router.get('/user/:id', tokenMiddleware, customerController)
router.post('/newAccount', createNewAccount)

router.get('/', (req: Request, res: Response) => {
    res.send("hello from index");  // Remember to delete when happy
});
