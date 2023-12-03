import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUser(id: string): Promise<{
        id: any;
        name: string;
        email: string;
    }>;
}
