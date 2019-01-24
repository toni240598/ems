export class Log {

  constructor() {}

  id: string;

  console(message: string, data?: any) {
    if (this.id) {
      console.log(`${this.id} - ${message}`, data);
    }
  }


}
