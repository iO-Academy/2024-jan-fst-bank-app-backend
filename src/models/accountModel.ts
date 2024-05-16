import dbConnection from "../dbConnection/dbConnection";

export interface Account {
    customer_id?: string,
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

export const createAccount = (account: Account): Promise<any> => {
    const query = `INSERT INTO accounts (customer_id, account_type, balance, 
                      interest_rate, custom_label, account_number)
                                            VALUES (?,?,?,?,?,?)`

    return new Promise((resolve, reject): void => {
        dbConnection.query(query, [account.customer_id, account.account_type, account.balance, account.interest_rate,
                account.custom_label, account.account_number],
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

export const getAccountsByCustomerNumber = async (customer_number: string)=> {
    const query = `SELECT customer_id,
                          account_type,
                          balance,
                          interest_rate,
                          custom_label,
                          account_number
                   FROM accounts
                   WHERE customer_id = ?`

    return new Promise((resolve, reject) => {
        dbConnection.query(query, [customer_number],
            (err, results) => {
                if (err) {
                    reject(err)
                } else {
                    if (results) {
                    }
                    resolve(results)
                }
            })
    })
}
