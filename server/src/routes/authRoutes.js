import  express  from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; 
import db from "../db.js";

//This is the file we will handle all authenticaion stuff
/*
JWT
    -   A key that is a secure password we can associate with a user 
        to authenticate them when they make future requests 
        without the need of them signing up again
*/

const router = express.Router();

//Post(CREATE) --> Creating a new user at endpoint /auth/register
//We need a userID(already done by db), username, and password, and then give then a jwt
router.post('/register', (req, res)=>{
    const {username, password} = req.body

    //1: Make sure it is not within the current DB by unique usernames

    //Creates a prepared SQL satement with placeholder ?
    //We get the username and ? with it
    //We get an object(truthy) or null(falsy)
    const userExists = db.prepare(
        "SELECT * FROM users WHERE username = ?"
    ).get(username); //.get runs it and returns the select

    if (userExists) {
        return res.status(400).json({ 
            error: "User already exists" 
        });
    }

    //2: Hash password with bcrypt synchronously
    const hashedPassword = bcrypt.hashSync(password, 8);
    
    //3: Save new user in DB
    try{
        const insertUser = db.prepare(
            `INSERT INTO users (username, password) VALUES (?, ?)`
        );
        const result = insertUser.run(username, hashedPassword);

        //Now create a default todo for this user
        const defaultTodo = `Hello, heres your first todo!`
        const insertTodo = db.prepare(`INSERT INTO todos(user_id, task) VALUES (?, ?)`)
        insertTodo.run(result.lastInsertRowid, defaultTodo);

        //4: Create the token which has the payload(user_id), secret, and expiresIn clause
        const token = jwt.sign({id: result.lastInsertRowid}, 
                                process.env.JWT_SECRET,
                                {expiresIn: '1d'}
                                );

        return res.status(201).json({ token }); //Send token and OK status

    } catch (err){
        console.log(err.message);
        res.sendStatus(503); // 500 level codes means the sever has broken down
    }
})

//Post(CREATE) --> A "log in" is a post cause we have to create the authentication state (jwt)
router.post('/login', (req, res)=>{
    const { username, password } = req.body;

    try{
        // 1. Validate request
        if (!username || !password) {
            return res.status(400).json({ error: "Missing username or password" });
        }

        // 2. Check if user exists
        const user = db.prepare(
            "SELECT * FROM users WHERE username = ?"
        ).get(username);

        if (!user) {
            return res.status(404).json({ error: "User not found, must sign up" });
        }

        // 3. Compare password with stored hash synchronously
        const isMatch = bcrypt.compareSync(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ error: "Incorrect password" });
        }
    
        console.log(user);

        // 4. Create JWT token
        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        // 5. Send token back
        res.json({ token });

    }catch(err){
        console.log(err.message);
        res.sendStatus(503); // 500 level codes means the sever has broken down
    }

})


export default router;
