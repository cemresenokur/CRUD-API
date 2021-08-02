export class HttpException extends Error {
    public status: number;
    public message: string;
  
    constructor(status: number, message: string) {
      super(message);
      this.status = status;
      this.message = message;
    }
  }

export class NotFound extends HttpException{
  constructor(public message: string = "Not Found"){
    super(404,message);
  }
}
  
