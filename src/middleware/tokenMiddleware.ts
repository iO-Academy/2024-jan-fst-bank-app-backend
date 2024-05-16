import { IUser } from "../models/customerModel";
import { Response } from "express";
import { UserRequest } from "../controllers/registerController";
import {getEnv} from "../controllers/loginController";
import * as jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import { JwtPayload } from "jsonwebtoken";
dotenv.config()

const authenticateToken = (head: any | undefined, res: Response, next: () => void) => {
    const bearer: string | null = 'Bearer '
    const apikey: string | JwtPayload = getEnv()
    if (!head || !head.includes(bearer)) {
        return res.status(401).send({"message": "Invalid token"})
    } else {
        const token = head.replace(bearer, '')
        const decoded = jwt.decode(token, {complete: true})
        if (decoded === null) {
            return res.status(401).send({"message": "Invalid token"})
        }

        jwt.verify(token, apikey, (err: any) => {
            if (err) {
                res.status(401).send({"message": "Invalid token", err: err})
            } else {
                next()
            }
        })
    }
}

const tokenMiddleware = async (req: UserRequest<IUser>, res: Response, next: () => void) => {
    const header = req.headers.authorization
    authenticateToken(header, res, next)
}

export default tokenMiddleware