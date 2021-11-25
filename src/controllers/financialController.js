import * as financialService from "../services/financialService.js"

async function postFinancialEvent(req, res) {
  try {
    const user = await financialService.auth(req);

    if (!user) {
        return res.sendStatus(401);
    }
    
    const validData = await financialService.badRequest(req);
    
    if(!validData) {
        return res.sendStatus(400);
    }

    const { value, type } = req.body;

    await financialService.createFinancialEvent(user, value, type);

    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}


async function getFinancialEvent(req, res) {
  try {
    const user = await financialService.auth(req);

    if (!user) {
        return res.sendStatus(401);
    }

    const events = await financialService.getFinancialById(user.id);

    res.send(events);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

async function getFinancialSum(req, res) {
  try {
    
    const user = await financialService.auth(req);

    if (!user) {
        return res.sendStatus(401);
    }
    const sum = await financialService.getSum(user.id);
  
    res.send({ sum });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

export {
    postFinancialEvent,
    getFinancialEvent,
    getFinancialSum,
}