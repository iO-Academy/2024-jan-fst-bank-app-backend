import dbConnection from "../dbConnection/dbConnection";

export const createTransaction = (account_id: number, transaction_value: number,
                                  corresponding_account: number): Promise<any> => {
    const query =
        `INSERT INTO transactions (account_id, transaction_value, corresponding_account)
         VALUES (?, ?, ?)`

    return new Promise((resolve, reject): void => {
        dbConnection.query(query, [account_id, transaction_value, corresponding_account],
            (err: Error | null, results: any): void => {
                if (err) {
                    resolve(false)
                } else {
                    resolve(true)
                }
            })
    })
}

export const retrieveTransactionHistory = (account_id: number) => {
    const query =
        `SELECT * FROM transactions WHERE (account_id = ?)`

    return new Promise((resolve, reject): void => {
        dbConnection.query(query, [account_id],
            (err: Error | null, results: any): void => {
                if (err) {
                    reject(err)
                } else {
                    resolve(results)
                }
            })
    })
}
