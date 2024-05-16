import { IUser } from '../models/customerModel'
import { createAccount } from "../models/accountModel";
import { IAccount } from "../models/accountModel"
import { addMoney } from "../models/accountModel";
import { Response, Request } from "express";
import { generateAccountNumber } from "../utilities/generateAccountNumber";

const buildAccountObject = (user: IUser): IAccount => {
    const accountNumber = generateAccountNumber()
    return <IAccount>{
        customer_id: user.customer_number,
        account_type: 'standard',
        balance: 0,
        interest_rate: 0,
        custom_label: 'Main Account',
        account_number: accountNumber
    }
}

export const createFirstAccount = async (user: IUser) => {
    const userAccount: IAccount = buildAccountObject(user)
        await createAccount(userAccount)
        await addMoney(150, userAccount.account_number)
}

export const createNewAccount = async (account: IAccount, req: Request,  res: Response) => {
    try {
        const newAccount = await createAccount(account)
        return res.status(201).send({"message": "New account created", "account": newAccount})
    } catch {
        return res.status(500).send({"message": "Internal Server Error"})
    }
}