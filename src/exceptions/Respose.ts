export class Response{
    public status: number;
    public message: string;
  
    constructor(status: number, message: string) {
      this.status = status;
      this.message = message;
    }
  }

export class InsertCompleted extends Response{
  constructor(public message: string = "Insert Completed"){
    super(201,message);
  }
}

export class OperationCompleted extends Response{
    constructor(public message: string = "Operation Completed"){
      super(200,message);
    }
  }
  