const generateAccountNumber = ():number => {
    let accountNumber: string = ''
    for (let i:number = 0; i < 8; i++) {
        accountNumber += (Math.floor(Math.random() * (10)).toString())
    }
    return Number(accountNumber)
}

export default generateAccountNumber()
