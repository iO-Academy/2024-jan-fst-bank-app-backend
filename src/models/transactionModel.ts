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
                    console.log(err)
                    resolve(false)
                } else {
                    resolve(true)
                }
            })
    })
}
