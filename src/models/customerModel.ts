
import dbConnection from "../dbConnection/dbConnection";

export interface User {
    first_name: string,
    last_name: string,
    email: string,
    passcode: string,
    customer_number: string
}

export const createCustomer = (user: User): Promise<any> => {
    const query =
        `INSERT INTO customers (first_name, last_name, email, passcode, customer_number)
         VALUES (?, ?, ?, ?, ?)`

    return new Promise((resolve, reject): void => {
        dbConnection.query(query, [user.first_name, user.last_name, user.email, user.passcode, user.customer_number],
            (err: Error | null, results: any): void => {
                if (err) {
                    reject(err)
                } else {
                    resolve(results)
                }
            })
    })
}
