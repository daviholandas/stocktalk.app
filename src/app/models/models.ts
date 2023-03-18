export interface loginInput{
    username:string,
    password: string
}

export interface Message{
    body:string;
    sentAt:string;
    sentTo:string | null;

}

export interface UserToken{
    token:string;
}

export interface ChatRoom{
    id: string,
    name:string,
    messangesHistory:Message[],
    status: string
}

export interface CreateChatCommand{
    name:string
}