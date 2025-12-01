import  express  from "express";
import db from "../db.js";

//Our crud endpoints lie here

const router = express.Router();

//Get all todos for logged in user
router.get('/', (req, res) => {
    const getTodos = db.prepare(`SELECT * FROM todos WHERE user_id = ?`)
    const todos = getTodos.all(req.userId) //.all() executes the query and returns all rows that match.
    // The db library turns it into objects
    //so todos returns an array of objects
    //     [ 
    //          { id: 1, text: "Buy milk", user_id: 5 },
    //          { id: 2, text: "Wash dishes", user_id: 5 },
    //          { id: 3, text: "Go gym", user_id: 5 } 
    //     ] 
    //   
    res.json(todos);
})

//Create a new todo
router.post('/', (req, res) => {
    const {task} = req.body;
    const insertTodo = db.prepare(`INSERT INTO todos (user_id, task) VALUES(?, ?)`); //id auto icrements
    const result = insertTodo.run(req.userId, task);

    res.json({id: result.lastInsertRowid, task, completed: 0})

})

//Update a todo using a route parameter of id of the specified task
router.put('/:id', (req, res) => {
    const { completed } = req.body;
    const { id } = req.params; //params from the request url

    const updatedTodo = db.prepare('UPDATE todos SET completed = ? WHERE id = ?');
    updatedTodo.run(completed, id);

    res.json({message: "Todo completed"}); //sends a 200 by default

})

//Delete a todo using a route parameter of id of the specified task
router.delete('/:id', (req, res)=>{
    const {id} = req.params;
    const userId = req.userId; //Remember the middleware intercepts the request
    const deleteTodo = db.prepare(`DELETE FROM todos WHERE id = ? AND user_id = ?`);
    deleteTodo.run(id, userId);

    res.json({message: "Todo deleted"});
})

export default router;