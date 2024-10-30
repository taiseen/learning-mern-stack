import routeNotFound from './projects/authentication/helper/routeNotFound.js';
import productRoute from "./projects/authentication/routes/productRoute.js";
import authRoute from "./projects/authentication/routes/authRoute.js";
import tasksRoute from "./projects/todo/routes/tasksRoutes.js";
import config from './config/index.js';
import dbCon from './connection/db.js';
import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';


const app = express();
const publicDir = 'public';


app.use(cors());
app.use(express.json()); // parsing data...
app.use(express.static(publicDir)); // Serve static files from the 'public' directory
app.use(bodyParser.json({ limit: '30mb', extended: true })); // client side body data processing
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));





app.use('/auth', authRoute);

app.use('/products', productRoute);

app.use('/tasks', tasksRoute);





// ✅ Default welcome message at root/index page...
app.get('/', (_, res) => res.sendFile(path.join(__dirname, publicDir, 'index.html')));


// ✅ url checking...
app.use('/test', (_, res) => res.json({ message: 'Hello Testing... | Api Working... ✅' }));


// 🚩 | 404 | Route Not Found, must call at last of the application...
app.use('/', routeNotFound);


app.listen(config.port, dbCon);