import Knex from 'knex';
import config from '../config'

class KnexDb {
  db: Knex;
  private initialized:boolean;
  knexConfig: Knex.Config;
  constructor(){ 
    this.knexConfig = {};
  }

  init(): Promise<Boolean>{
    return new Promise(async(resolve,reject) =>{


      this.knexConfig = {
        client: "pg",
        connection: config.POSTGRES_URL,
        pool: {
          min: config.POOL_MIN,
          max: config.POOL_MAX },
      };
      
      this.db = Knex(this.knexConfig);
      const resultknex = this.db.raw("select 1=1");
      resolve(true);
    });
  }

};

const db = new KnexDb();
export default db;
