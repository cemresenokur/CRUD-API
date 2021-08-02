import dotenv from 'dotenv'

const result = dotenv.config();
if (result.error) {
    throw result.error
  }

class Config{
  // Postgress
  public POSTGRES_URL = process.env.POSTGRES_URL || "";
  public POOL_MIN = parseInt(process.env.POSTGRES_POOL_MIN) || 2;
  public POOL_MAX = parseInt(process.env.POSTGRES_POOL_MIN) || 10;

  // Server
  public PORT = process.env.PORT || 5000;

}

const config = new Config();
export default config;