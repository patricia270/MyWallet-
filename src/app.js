import express from "express";
import cors from "cors";
import * as userController from "../src/controllers/userController.js";
import * as financialController from "../src/controllers/financialController.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/sign-up", userController.signUp);
app.post("/sign-in", userController.signIn);

app.post("/financial-events", financialController.postFinancialEvent);
app.get("/financial-events", financialController.getFinancialEvent);
app.get("/financial-events/sum", financialController.getFinancialSum);

export default app;
