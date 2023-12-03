import { AuthService } from './auth.service';
import { LoginUserDto, RegisterUserDto } from 'src/users/dtos';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(user: RegisterUserDto): Promise<{
        id: any;
        name: string;
        email: string;
    }>;
    login(user: LoginUserDto): Promise<{
        token: string;
    }>;
    verifyJwt(payload: {
        jwt: string;
    }): Promise<{
        exp: number;
    }>;
}
