import {createCustomer} from "../models/customerModel";
import {checkCustomerNumberExists, createAccount} from "../models/accountModel";
import * as bcrypt from 'bcrypt'
import * as EmailValidator from 'email-validator'
import {createFirstAccount} from "./newAccountController";
import {User} from "../models/customerModel";
import { JwtPayload } from 'jsonwebtoken'
import * as jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import { Request, Response } from 'express'
dotenv.config()

const generateCustomerNumber = (): number => {
    return Math.floor(100000000000 + Math.random() * 900000000000)
}

const generateUniqueNumber = async (): Promise<any> => {
    let number: number
    do {
        number = generateCustomerNumber()
    } while (await checkCustomerNumberExists(number))
    return number.toString()
}

const verifyEmail = (email: string) => {
    return EmailValidator.validate(email)
}

const verifyName = (name: string) => {
    let nameRegex = /^[a-zA-Z]+([ '-][a-zA-Z]+)*$/
    return nameRegex.test(name)
}

const verifyPasscode = (passcode: string) => {
    let passcodeRegex = /^\d{6}$/
    return passcodeRegex.test(passcode)
}

const verifyInput = (user: User) => {
    return (verifyName(user.first_name)
        && verifyName(user.last_name) && verifyEmail(user.email)
        && verifyPasscode(user.passcode))
}

export const getEnv = () => {
    if (typeof process.env["TOKEN_SECRET"]==='undefined'){
        throw new Error('Undefined')
    }
    return process.env["TOKEN_SECRET"]
}

const generateToken = (customer_number: string, passcode: string): string | undefined => {
    const apikey: string|JwtPayload = getEnv()
    return jwt.sign({customer_number: customer_number, passcode: passcode}, apikey, {expiresIn: '300s'})
}

export interface UserRequest<T> extends Request {
    body: T
}

const registerController = async (req: UserRequest<User>, res: Response) => {
    const user = req.body
    // @ts-ignore
    user.customer_number = await generateUniqueNumber()
    if (verifyInput(user)){
        // @ts-ignore
        user.passcode = await bcrypt.hash(user.passcode, 10)
        await createCustomer(user)
        await createFirstAccount(user)
        const token = generateToken(String(user.customer_number), String(user.passcode))
        res.status(201).send({'message': 'Successfully registered user.', "token": token})
    } else {
        res.status(400).send({'message': 'Invalid register data', "data": user})
    }
}

export default registerController
