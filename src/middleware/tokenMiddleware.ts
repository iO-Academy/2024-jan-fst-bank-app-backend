import { User } from "../models/customerModel";
import { Response } from "express";
import { UserRequest } from "../controllers/registerController";
import {getEnv} from "../controllers/registerController";
import * as jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import { JwtPayload } from "jsonwebtoken";
dotenv.config()

const authenticateToken = (head: any | undefined, res: Response) => {
    const bearer = 'Bearer '
    const apikey: string | JwtPayload = getEnv()
    if (!head.includes(bearer)) {
        return res.status(401).send({success: false})
    } else {
        const token = head.replace(bearer, '')
        const decoded = jwt.decode(token, {complete: true})
        if (decoded === null) {
            return res.status(401).send({success: false})
        }

        jwt.verify(token, apikey, (err: any) => {
            if (err) {
                res.status(401).send({success: false, err: err})
            } else {
                res.status(200).send({success: true})
            }
        })
    }
}

const tokenMiddleware = async (req: UserRequest<User>, res: Response) => {
    const header = req.headers.authorization
    authenticateToken(header, res)
}

export default tokenMiddleware