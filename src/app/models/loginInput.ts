export interface loginInput{
    username:string,
    password: string
}

export class Message{
    public body!: string;
    public timestamp!: Date;
}