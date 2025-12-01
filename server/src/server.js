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

//This will create our backend
const app = express();

//The port our backend will listen to
const PORT = process.env.PORT || 5003;

//We want to send back the website(so index.html in our client folder)

//We must get the file path from the URL of the current module
const __filename = fileURLToPath(import.meta.url);

//Now we get the dir name from the file path
const __dirname = dirname(__filename);

//--------MIDDLEWARE---------
//Allows our endpoints to intrepret the JSON data
app.use(express.json())

//Serves all the static files from the React build folder
app.use(express.static(path.join(__dirname, "../..", "client", "dist")));

//ROUTES FOR AUTH
//Its basically saying "Hey Express, anytime a request starts with /auth, pass it to the authRoutes.js file"
app.use('/auth', authRoutes);

//ROUTES FOR TODO using our middlware
//So any todos route will head to the middlewear then todoRoutes
//We pass the function to express and passes the params as required
app.use('/todos', authMiddleware, todoRoutes);


//If the request is NOT a static file or an API route --> send the React index.html file
// SPA fallback (send React index.html)
// SPA fallback — MUST BE LAST
app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../..", "client", "dist", "index.html"));
});  

  

//Set up our backend to listen to PORT
app.listen(PORT, () => console.log(`Server has started on ${PORT}`));
