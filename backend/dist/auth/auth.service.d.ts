import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto, RegisterUserDto } from 'src/users/dtos';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UsersService, jwtService: JwtService);
    hashPassword(password: string): Promise<string>;
    register(user: RegisterUserDto): Promise<{
        id: any;
        name: string;
        email: string;
    }>;
    doesPasswordMatch(password: string, hashedPassword: string): Promise<boolean>;
    validateUser(email: string, password: string): Promise<{
        id: any;
        name: string;
        email: string;
    }>;
    login(existingUser: LoginUserDto): Promise<{
        token: string;
    } | null>;
    verifyJwt(jwt: string): Promise<{
        exp: number;
    }>;
}
