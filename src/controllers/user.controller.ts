import express from 'express';
import userService from '../services/user.service';
import userValidationSchema from '../validation/user.validation';
import * as Joi from 'joi';
import { User } from 'interfaces/user.interface';
import { CreateUser } from 'interfaces/request.create.user';
import { Pagination } from 'interfaces/pagination.interface';
import { Response } from 'exceptions/Respose';


class UserController{
    public router: express.Router;

    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    getUsers(req: express.Request, res: express.Response, next: express.NextFunction){ 
        const pagination = req.query;
        userValidationSchema.get
        .validateAsync(pagination).then((validated: Pagination) => {
            if(!validated.sortBy) validated.sortBy = 'asc';
            if(!validated.orderBy) validated.orderBy = 'id';
            if(!validated.limit) validated.limit = 10;
            if(!validated.offset) validated.offset = 0;
            const users = userService.getUsers(validated);
            console.log("GET/users initiated: " + new Date());
            users.then(result => {
                console.log("GET/users succesfull!");
                res.status(200).send(result);
                })
            .catch((error) => {
                console.log("GET/users failed!" + error);
                next(error)
            });
        })
        .catch((error:Joi.ValidationError) => {
            console.log(error);
            next(error)
        });   
            

    };

    getUserById (req: express.Request, res: express.Response, next: express.NextFunction){
        console.log("GET/users/:id initiated: " + new Date());
        const userId = Number (req.params.id)
        if(isNaN(userId)){
            return res.status(400).send("Invalid Parameter");
    }
        const user = userService.getUserById(userId);
        user.then(result => {
            console.log("GET/users/:id is succesfull!");
            res.status(200).send(result);
        })
        .catch((error) => {
            console.log("GET/users/:id failed" + error);
            next(error)
        });
              
    };

    createUser (req: express.Request, res: express.Response, next: express.NextFunction){
        const newUser = req.body;
        userValidationSchema.create
        .validateAsync(newUser).then((validatedUser: CreateUser) => {
            userService.createUser(validatedUser)
            .then((result:Response) => {
                console.log(result.status + " " + result.message);
                res.status(result.status).json({ message: result.message });
            })
            .catch((error) => {
                console.log(error);
                next(error);
            });
        })
        .catch((error:Joi.ValidationError) => {
            console.log(error);
            next(error)
        });     
    }

    deleteUser (req: express.Request, res: express.Response, next: express.NextFunction){
     
        const userId = Number (req.params.id)
        if(isNaN(userId)){
            return res.status(400).send("Invalid Parameter");
    }
        const user = userService.deleteUser(userId);
        user.then((result:Response) => {
            console.log(result.status + " " + result.message);
            res.status(result.status).json({ message: result.message });
        })
        .catch((error) => {
            console.log(error);
            next(error)
        });     
    }
    

    updateUser (req: express.Request, res: express.Response, next: express.NextFunction){
        const newUser = req.body;
        userValidationSchema.update
        .validateAsync(newUser).then((validatedUser:User) => {
            userService.updateUser(validatedUser)
            .then((result:Response) => {
                console.log(result.status + " " + result.message);
                res.status(result.status).json({ message: result.message });
            })
            .catch((error) => {
                console.log(error);
                next(error);
            });
        })
        .catch((error:Joi.ValidationError) => {
            console.log(error);
            next(error)
        });     
    };



    private initializeRoutes() {
        this.router.get('/', this.getUsers.bind(this));
        this.router.get('/:id', this.getUserById.bind(this));
        this.router.post('/', this.createUser.bind(this));
        this.router.delete('/:id',this.deleteUser.bind(this));
        this.router.put('/', this.updateUser.bind(this));

    }
}

const newController = new UserController();
export default newController;

