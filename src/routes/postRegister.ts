import { Application } from "express-ws";
import bodyParser from "body-parser";
import { createUser, findUserByEmail, findUserById } from "../repositories/userRepository";


export async function postRegister(app: Application) {
  app.post('/register', bodyParser.urlencoded(),
    async (req, res) => {
      const email = req.body.email;
      const name = req.body.name;
      console.log("eheh");
      if (!email || !name) {
        res.status(401).send("Tout les champs ne sont pas remplie");
        return
      }
      const user = await createUser(email, name);
      console.log("user créer");
      if (!user) {
        res.status(400).send('Email déjà utiliser');
        return
      }
      res.cookie('ssid', user.id, { signed: true, httpOnly: true, sameSite: true });
      res.redirect('/')
    })
}
