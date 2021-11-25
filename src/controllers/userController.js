import * as userService from "../services/userService.js";

async function signUp(req, res) {
    try {
        const { name, email, password } = req.body;
      
        if (!name || !email || !password) {
            return res.sendStatus(400);
        }
      
        const existingUserWithGivenEmail = await userService.existConflit(email)
      
        if (existingUserWithGivenEmail) {
            return res.sendStatus(409);
        }
      
        await userService.createUser(name, email, password);
          res.sendStatus(201);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

async function signIn(req, res) {
    try {
        const { email, password } = req.body;
      
        if (!email || !password) {
            return res.sendStatus(400);
        }
      
        const token = await userService.auth(email, password) ;
      
        if (!token) {
            return res.sendStatus(401);
        }
      
        res.send({
            token
        });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}



export {
    signUp,
    signIn,
}