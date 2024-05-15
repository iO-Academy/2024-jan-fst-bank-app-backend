import { Request, Response } from "express";
import {customerLogin} from "../models/customerModel";
import {User} from "../models/customerModel";
import * as bcrypt from "bcrypt";

const allowAccess = (result: boolean, customer: User, res: Response) => {
    if (result) {
        return res.status(200).send({'message': 'Login successful', 'data': customer})
    } else {
        res.status(401).send({'message': "User does not exist"})
    }
}

    const loginController = async (req: Request, res: Response) => {
        const user = req.body
        const customer = await customerLogin(user.customer_number, user.passcode)
        bcrypt.compare(user.passcode, customer.passcode, ((err, val) => {
            allowAccess(val, customer, res)
        }))
    }

export default loginController