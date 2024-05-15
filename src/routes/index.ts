import express, {Request, Response} from "express";
export const router = express.Router()
import registerController from "../controllers/registerController";

router.post('/register', registerController);
router.get('/', (req: Request, res: Response) => {
    res.send("hello from index");
});