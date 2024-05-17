import {addMoney} from "../models/accountModel";
import {createTransaction} from "../models/transactionModel";
import { Request, Response } from "express";
import {retrieveTransactionHistory} from "../models/transactionModel";

export const makeTransaction = async (req: Request, res: Response) => {
    const transaction_value: number = req.body.transaction_value
    const account_id: number = req.body.account_id
    const corresponding_account: number = req.body.corresponding_account

    await addMoney(transaction_value, account_id)
    if(await createTransaction(account_id, transaction_value, corresponding_account)){
        return res.status(201).send({'message': 'Transaction recorded'})
    } else {
       return res.status(401).send({'message': "Transaction Failed"})
    }
}

export const transactionHistory = async (req: Request, res: Response) => {
    const account_id: number = req.body.account_id
    const results = await retrieveTransactionHistory(account_id)
    if(results){
        return res.status(200).send({'data': results})
    }else{
        return res.status(401).send({'message': "Failed to retrieve transaction history"})
    }
}
