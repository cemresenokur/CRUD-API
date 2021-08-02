import { NotFound } from '../exceptions/HttpException';
import { Pagination } from '../interfaces/pagination.interface';
import { CreateUser } from '../interfaces/request.create.user';
import knexdb from '../db/knexfile';
import { User } from '../interfaces/user.interface';


class userRepository {
    knx: typeof knexdb;
    constructor() {
        this.knx = knexdb;
    }
    
    async getUsers(pagination:Pagination): Promise<User[]> {
        return new Promise(async(resolve,reject) =>{
            await this.knx.db("users")
                .orderBy(pagination.orderBy, pagination.sortBy)
                .limit(pagination.limit)
                .offset(pagination.offset)
                .then((users:User[]) =>{
                    if(users){
                        resolve(users);
                    }else{
                        console.log(new Error());
                        reject(new Error());
                    }
                })
                .catch((error)=>{
                    console.log(error)
                    reject(error);
                });
                    
            });
    }

    async getUserById(userId:number): Promise<User>{
        return new Promise(async(resolve,reject) =>{
            await this.knx.db("users")
                .where("id", userId)
                .first()
                .then((user:User) =>{
                    if(user){
                        resolve(user);
                    }else{
                        console.log(new NotFound("User with id "+ userId +" is not found!"));
                        reject(new NotFound("User with id "+ userId +" is not found!"));
                    }
                })
                .catch((error)=>{
                    console.log(error)
                    reject(error);
                });
                    
            });
            
    }

    async createUser(newUser:CreateUser): Promise<number>{
        return new Promise(async(resolve,reject) =>{
            await this.knx.db("users")
                .insert(newUser, "id")
                .then((newUserID:number[]) =>{
                    if(newUserID[0]){
                        resolve(newUserID[0]);
                    }else{
                        console.log(new Error());
                        reject(new Error());
                    }
                })
                .catch((error)=>{
                    console.log(error)
                    reject(error);
                });
                    
            });
            
    }

    async deleteUser(userID:number): Promise<number>{
        return new Promise(async(resolve,reject) =>{
            await this.knx.db("users")
                .where("id", userID)
                .del()
                .then((count:number) =>{
                    if(count){
                        resolve(userID);
                    }else{
                        console.log(new NotFound("User with id "+ userID +" is not found!"));
                        reject(new NotFound("User with id "+ userID +" is not found!"));
                    }
                })
                .catch((error)=>{
                    console.log(error)
                    reject(error);
                });
                    
            });
            
    }
    
    async updateUser(userBody:User): Promise<number>{
        return new Promise(async(resolve,reject) =>{
            await this.knx.db("users")
                .where("id", userBody.id)
                .update(userBody)
                .returning("id")
                .then((userID:number[]) =>{
                    if(userID[0]){
                        resolve(userID[0]);
                    }else{
                        console.log(new NotFound("User with id "+ userID +" is not found!"));
                        reject(new NotFound("User with id "+ userID +" is not found!"));
                    }
                })
                .catch((error)=>{
                    console.log(error)
                    reject(error);
                });
                    
            });
            
    }

}

const rep = new userRepository();
export default rep;