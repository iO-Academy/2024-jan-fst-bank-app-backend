import { User } from '../models/customerModel'
import { createAccount } from "../models/accountModel";
import { Account } from "../models/accountModel"
import { addMoney } from "../models/accountModel";

const buildAccountObject = (user: User): Account => {
    return {
        customer_id: user.customer_number,
        account_type: 'standard',
        balance: 0,
        interest_rate: 0,
        custom_label: 'Main Account',
        account_number: 3  // Placeholder for function - remember to change!
    }
}

export const createFirstAccount = async (user: User) => {
    const userAccount: Account = buildAccountObject(user)
    await createAccount(userAccount)
    await addMoney(150, userAccount.account_number)
}