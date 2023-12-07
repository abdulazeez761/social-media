import { HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { CacheService } from 'core/lib/cache/cache.service';
export declare class UsersService {
    private readonly cacheService;
    constructor(cacheService: CacheService);
    users: User[];
    createuserForAuth(createUserDto: CreateUserDto): void;
    findUserByEmail(email: string): User | undefined;
    create(createUserDto: CreateUserDto): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
    findAll(): User[];
    findOne(id: number): User;
    update(id: number, updateUserDto: UpdateUserDto): {
        data: User | undefined;
        message: string;
        statusCode: HttpStatus;
    };
    remove(id: number): {
        data: User;
        message: string;
        statusCode: HttpStatus;
    };
}
