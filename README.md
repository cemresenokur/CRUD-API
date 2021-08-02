# CRUD-API  
Runs with "yarn dev" command.  

#POSTMAN URL  
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/e2c8a90c629e8934dab4?action=collection%2Fimport)

#DATABASE TABLES  
CREATE TABLE users(id serial primary key, name varchar(100), password varchar(100));  

#ENVIRONMENT  
POSTGRES_URL="postgres://postgres:admin@localhost:5432/test_user_db"  
POSTGRES_POOL_MIN=2  
POSTGRES_POOL_MAX=10  
PORT=5000 // App port  

