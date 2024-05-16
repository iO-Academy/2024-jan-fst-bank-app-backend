import { IUser } from '../models/customerModel'
import { createAccount } from "../models/accountModel";
import { IAccount } from "../models/accountModel"
import { addMoney } from "../models/accountModel";
import { generateAccountNumber } from "../utilities/generateAccountNumber";

const buildAccountObject = (user: IUser): IAccount => {
    const accountNumber = generateAccountNumber()
    return {
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
    try {
        await createAccount(userAccount)
        await addMoney(150, userAccount.account_number)
    }
    catch {
        return
    }
}