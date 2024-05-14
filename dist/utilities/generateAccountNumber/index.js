"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generateAccountNumber = () => {
    let accountNumber = '';
    for (let i = 0; i < 8; i++) {
        accountNumber += (Math.floor(Math.random() * (10)).toString());
    }
    return Number(accountNumber);
};
exports.default = generateAccountNumber();
