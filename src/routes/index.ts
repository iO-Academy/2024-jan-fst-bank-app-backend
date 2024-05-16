import express, {Request, Response} from "express";
export const router = express.Router()
import registerController from "../controllers/registerController";
import tokenMiddleware from "../middleware/tokenMiddleware";
import loginController from "../controllers/loginController";
import transactionController from "../controllers/transactionController";

router.post('/register', registerController);
router.post('/login', loginController)
router.post('/transaction', transactionController)
router.get('/', tokenMiddleware, (req: Request, res: Response) => {
    res.send("hello from index");
});
