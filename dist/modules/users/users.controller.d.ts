import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<{
        httpStatus: import("@nestjs/common").HttpStatus;
        message: string;
        data: import("./entities/user.entity").User;
    }>;
    findAll(): {
        httpStatus: import("@nestjs/common").HttpStatus;
        message: string;
        data: import("./entities/user.entity").User[];
    };
    findOne(userID: number): {
        data: import("./entities/user.entity").User;
        message: string;
        httpStatus: import("@nestjs/common").HttpStatus;
    };
    update(userID: number, updateUserDto: UpdateUserDto): {
        data: import("./entities/user.entity").User | undefined;
        message: string;
        httpStatus: import("@nestjs/common").HttpStatus;
    };
    remove(userID: number): {
        data: {
            data: import("./entities/user.entity").User;
            message: string;
            httpStatus: import("@nestjs/common").HttpStatus;
        };
        message: string;
        httpStatus: import("@nestjs/common").HttpStatus;
    };
}
