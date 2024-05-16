import { Request, Response } from "express";
import {customerLogin} from "../models/customerModel";
import {IUser} from "../models/customerModel";
import * as bcrypt from "bcrypt";
import {JwtPayload} from "jsonwebtoken";
import * as jwt from "jsonwebtoken";
import * as dotenv from 'dotenv'
dotenv.config()

export const getEnv = () => {
    if (typeof process.env["TOKEN_SECRET"]==='undefined'){
        throw new Error('Undefined')
    }
    return process.env["TOKEN_SECRET"]
}

const generateToken = (customerNumber: string, passcode: string): string | undefined => {
    const apikey: string | JwtPayload = getEnv()
    return jwt.sign({customer_number: customerNumber, passcode: passcode}, apikey, {expiresIn: '1000s'})
}

const allowAccess = (result: boolean, customer: IUser, res: Response) => {
    if (result) {
        const token = generateToken(String(customer.customer_number), String(customer.passcode))
        return res.status(200).send({'message': 'Login successful', 'data': customer, 'token': token})
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