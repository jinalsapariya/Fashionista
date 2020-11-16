export interface IUser {
    _id?: string;
    name: string;
    email: string;
    password: string;
    type: string;
}

export class User implements IUser{
    constructor(
        public type: string,
        public name: string,
        public email: string,
        public password: string,
        public _id?: string
    ) {
        this._id = _id ? _id : null;
        this.type = type;
        this.name = name;
        this.email = email;
        this.password = password;

    }
    
}
