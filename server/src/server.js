import express from "express"; //Importing express
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import authRoutes from './routes/authRoutes.js';
import todoRoutes from './routes/todoRoutes.js';
import authMiddleware from "./middleware/authMiddleware.js";
/*
    import path, {dirname} from "path"; 
    import {fileURLToPath} from "url"; 

The last two imports will alllow our js server.js file to 
look for the html files and send them back as a response 
*/

const app = express();

const PORT = process.env.PORT || 5003;

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

//--------MIDDLEWARE---------
app.use(express.json())

//Serves all the static files from the React build folder
app.use(express.static(path.join(__dirname, "../..", "client", "dist")));

//ROUTES FOR AUTH
app.use('/auth', authRoutes);

//ROUTES FOR TODO using our middlware
app.use('/todos', authMiddleware, todoRoutes);


//If the request is NOT a static file or an API route --> send the React index.html file
// SPA fallback (send React index.html)
// SPA fallback — MUST BE LAST
app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../..", "client", "dist", "index.html"));
});  

  
//Set up our backend to listen to PORT
app.listen(PORT, () => console.log(`Server has started on ${PORT}`));
