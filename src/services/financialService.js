import jwt from "jsonwebtoken";
import * as financialRepository from "../repositories/financialRepository.js";

async function auth (req) {
    const authorization = req.headers.authorization || "";
    const token = authorization.split('Bearer ')[1];
  
    if (!token) {
        return null;
    }
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        return user;  
    } catch {
        return null;
    }
}

async function badRequest(req) {
    const { value, type } = req.body;
  
    if (!value || !type) {
      return null;
    }

    if (!['INCOME', 'OUTCOME'].includes(type)) {
      return null;
    }

    if (value < 0) {
      return null;
    }

    return true;
}

async function createFinancialEvent(user, value, type) {
    await financialRepository.createFinancialEvent(user, value, type);
}

async function getFinancialById(userId){
    return await financialRepository.getFinancialById(userId);
}

async function getSum(userId){

    const events = await financialRepository.getFinancialById(userId);

    const sum = events.reduce((total, event) => event.type === 'INCOME' ? total + event.value : total - event.value, 0);

    return sum;
}
export {
    auth,
    badRequest,
    createFinancialEvent,
    getFinancialById,
    getSum,
}