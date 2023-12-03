import { Model } from 'mongoose';
import { UserDocument } from './schemas/user.schema';
export declare class UsersService {
    private readonly userModel;
    constructor(userModel: Model<UserDocument>);
    getUserDetails(user: UserDocument): {
        id: any;
        name: string;
        email: string;
    };
    findByEmail(email: string): Promise<UserDocument | null>;
    findById(id: string): Promise<{
        id: any;
        name: string;
        email: string;
    }>;
    create(name: string, email: string, hashedPassword: string): Promise<UserDocument>;
}
