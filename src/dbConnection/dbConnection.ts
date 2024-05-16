import * as mysql from 'mysql2'

const connOptions: mysql.ConnectionOptions = {
    host: '127.0.0.1',
    user: 'root',
    password: 'password',
    database: 'bankingApp'
}


const dbConnection = mysql.createConnection(connOptions)

dbConnection.connect((err: Error | null): void => {
    if (err) {
        console.error('Error connecting to the database', err)
        return
    }
    console.log('Connected to the database')
})

export default dbConnection