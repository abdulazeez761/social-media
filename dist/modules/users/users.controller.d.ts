import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    findAll(): import("./entities/user.entity").User[];
    findOne(id: number): import("./entities/user.entity").User;
    update(id: number, updateUserDto: UpdateUserDto): {
        data: import("./entities/user.entity").User;
        message: string;
        statusCode: import("@nestjs/common").HttpStatus;
    };
    remove(id: number): {
        data: import("./entities/user.entity").User;
        message: string;
        statusCode: import("@nestjs/common").HttpStatus;
    };
}
