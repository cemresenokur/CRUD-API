import config from './config'
import express from "express";
// Database
import knexdb from './db/knexfile';
// Controllers
import UserController from './controllers/user.controller';
// Middlewares
import errorMiddleware from './middleware/error.middleware';


class SmtApi {
    app: express.Application;
    appRouter: express.Router;
    port: string | number;
    constructor() {
        this.app = express();
        this.port = config.PORT;
        this.appRouter = express.Router();
        this.init();
    }

    init() {
        try{
            knexdb.init();
        }
        catch(error){
            console.log(error);
            process.exit(1);
        }
        
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        
        this.initRoutes();
        this.app.use(errorMiddleware);
    }

    initRoutes(){
        this.app.use('/user', UserController.router);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("listening on port: " + this.port)
        });
    }
}
const app = new SmtApi();
export default app;