import dbConnection from "../dbConnection/dbConnection";

export interface IAccount {
    customer_id: string,
    account_type: string,
    balance: number,
    interest_rate: number,
    custom_label: string,
    account_number: number
}

export const addMoney = (amount: number, account_number: number): Promise<any> => {
    const query = `UPDATE accounts SET balance =  (balance + ?)
                                                  WHERE account_number = ?`

    return new Promise((resolve, reject): void => {
        dbConnection.query(query, [amount, account_number],
            (err: Error | null, results: any): void => {
                if (err) {
                    reject(err)
                } else {
                    resolve(results)
                }
            })
    })
}

export const createAccount = (account: IAccount): Promise<any> => {
    const query = `INSERT INTO accounts (customer_id, account_type, balance, interest_rate, custom_label, account_number)
                                            VALUES (?,?,?,?,?,?)`

    return new Promise((resolve, reject): void => {
        dbConnection.query(query, [account.customer_id, account.account_type, account.balance, account.interest_rate, account.custom_label, account.account_number],
            (err: Error | null, results: any): void => {
                if (err) {
                    reject(err)
                } else {
                    resolve(results)
                }
            })
    })
}

export const checkCustomerNumberExists = async (generated_number: number) => {
    const query = `SELECT customer_number FROM customers
                                            WHERE customer_number = ?`

    return new Promise<boolean>((resolve) => {
        dbConnection.query(query, [generated_number],
            (err: Error | null, results: any) => {
                if (results.length > 0) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            })
    })
}
