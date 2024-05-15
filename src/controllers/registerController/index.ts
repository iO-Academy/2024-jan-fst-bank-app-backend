import {Request, Response} from "express";

const registerController = async(req: Request, res: Response) => {
    res.send('hello from register controller')
}

export default registerController