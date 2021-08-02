import userRepository from '../repository/user.repository';
import { User } from '../interfaces/user.interface';
import { CreateUser } from 'interfaces/request.create.user';
import * as bcrypt from 'bcrypt'; 
import { Pagination } from 'interfaces/pagination.interface';
import { InsertCompleted, OperationCompleted, Response } from '../exceptions/Respose';

class UserService {

    async getUsers(pagination: Pagination): Promise<User[]> {
        return new Promise(async(resolve,reject) =>{
            await userRepository.getUsers(pagination)
                .then((users:User[]) =>{
                    resolve(users);
                })
                .catch((error)=>{
                    console.log(error)
                    reject(error);
                });
                    
            });  
    };

    async getUserById(userId:number): Promise<User>{
        return new Promise(async(resolve,reject) =>{
            await userRepository.getUserById(userId)
                .then((user:User) =>{
                    resolve(user);
                })
                .catch((error)=>{
                    console.log(error)
                    reject(error);
                });
                    
            });
    };

    async createUser(newUser:CreateUser): Promise<Response>{
        return new Promise(async(resolve,reject) =>{
            const salt = 6;
            const hashedPassword = await bcrypt.hash(newUser.password, salt);
            newUser.password = hashedPassword;
            await userRepository.createUser(newUser)
                .then((newUserID:number) =>{
                    resolve(new InsertCompleted("User with id " + newUserID + " created!" ));
                })
                .catch((error)=>{
                    console.log(error)
                    reject(error);
                });
                    
            }); 
    };

    async deleteUser(userID:number): Promise<Response>{
        return new Promise(async(resolve,reject) =>{
            await userRepository.deleteUser(userID)
                .then((userID:number) =>{
                    resolve(new OperationCompleted("User with id " + userID + " deleted!" ));
                })
                .catch((error)=>{
                    console.log(error)
                    reject(error);
                });
                    
            }); 
    }

    async updateUser(newUser:User): Promise<Response>{
        const salt = 6;
        const hashedPassword = await bcrypt.hash(newUser.password, salt);
        newUser.password = hashedPassword;
        return new Promise(async(resolve,reject) =>{
            await userRepository.updateUser(newUser)
                .then((userID:number) =>{
                    resolve(new OperationCompleted("User with id " + userID + " updated!" ));
                })
                .catch((error)=>{
                    console.log(error)
                    reject(error);
                });
                    
            });  
    };



}

const serv = new UserService();
export default serv;