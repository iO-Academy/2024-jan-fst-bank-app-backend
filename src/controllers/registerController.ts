import {createCustomer} from "../models/customerModel";
import {checkCustomerNumberExists, createAccount} from "../models/accountModel";
import * as bcrypt from 'bcrypt'
import * as EmailValidator from 'email-validator'
import {createFirstAccount} from "./newAccountController";

const generateCustomerNumber = (): number => {
    return Math.floor(100000000000 + Math.random() * 900000000000)
}

const generateUniqueNumber = async (): Promise<any> => {
    let number: number
    do {
        number = generateCustomerNumber()
    } while (await checkCustomerNumberExists(number))
    return number
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

const verifyInput = (user) => {
    return (verifyName(user.first_name)
        && verifyName(user.last_name) && verifyEmail(user.email)
        && verifyPasscode(user.passcode))
}

const registerController = async (req: Request, res) => {
    const user = req.body
    user.customer_number = await generateUniqueNumber()
    if (verifyInput(user)){
        user.passcode = await bcrypt.hash(user.passcode, 10)
        await createCustomer(user)
        await createFirstAccount(user)
        res.status(201).send({'message': 'Successfully registered user.'})
    } else {
        res.status(400).send({'message': 'Invalid register data', "data": user})
    }
}

export default registerController
