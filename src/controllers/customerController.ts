import { getAccountsByCustomerNumber } from "../models/accountModel";
import { Request, Response } from "express";

const customerController = async (req: Request, res: Response) => {
    const customer_number = req.params.id
    const accounts  = await getAccountsByCustomerNumber(customer_number)
    // @ts-ignore
    if (accounts.length > 0) {
        res.status(200).send({"success": true, 'accounts': accounts})
    } else {
        res.status(401).send({'message': 'No Accounts Found'})
    }
}

export default customerController