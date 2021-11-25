
import connection from "../database.js";

async function createFinancialEvent(user, value, type) {
    await connection.query(
        `INSERT INTO "financialEvents" ("userId", "value", "type") VALUES ($1, $2, $3)`,
        [user.id, value, type]
    );
}

async function getFinancialById(userId){

    const events = await connection.query(
      `SELECT * FROM "financialEvents" WHERE "userId"=$1 ORDER BY "id" DESC`,
      [userId]
    );
  
    return events.rows;
}

export {
    createFinancialEvent,
    getFinancialById,
}