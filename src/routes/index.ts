import express, {Request, Response} from "express";
export const router = express.Router()
import registerController from "../controllers/registerController";
import tokenController from "../controllers/tokenController";
import loginController from "../controllers/loginController";

router.post('/register', registerController);
router.post('/token', tokenController);
router.post('/login', loginController)
router.get('/', (req: Request, res: Response) => {
    res.send("hello from index");
});
