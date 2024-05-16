import express, {Request, Response} from "express";
export const router = express.Router()
import registerController from "../controllers/registerController";
import tokenMiddleware from "../middleware/tokenMiddleware";
import loginController from "../controllers/loginController";
import customerController from "../controllers/customerController";

router.post('/register', registerController);
router.post('/login', loginController)
router.get('/user/:id', tokenMiddleware, customerController)
router.get('/', (req: Request, res: Response) => {
    res.send("hello from index");
});
