import { User } from "./user";

export class Transaction {

    id: number;
    userId: number;
    description: string;
    amount: number;
    payeeDTO: User;
    
}