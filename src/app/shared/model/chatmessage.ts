import {User} from './user';

export interface ChatMessage {
    id: string;
    avatar: string;
    body: string;
    dateCreated: string;
    email: string;
    name: string;
    newMessage: string;
    owner: string;
    topic: string;
}

export class ChatMessageEntity implements ChatMessage {
    id: string;
    avatar: string;
    body: string;
    dateCreated: string;
    email: string;
    name: string;
    newMessage: string;
    owner: string;
    topic: string;

    constructor(attributes: any) {
        for (let key in attributes) {
            if (attributes.hasOwnProperty(key)) {
                this[key] = attributes[key];
            }
        }
    }
}
