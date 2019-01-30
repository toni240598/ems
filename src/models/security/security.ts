
export class Security {

    constructor(input?: Security) {
        Object.assign(this, input);
    }

    id: Number;
    username: String;
    name: String;
    phone: String;
    email: String;
    password: String;

}
