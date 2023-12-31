import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseFromServiceI } from 'shared/interfaces/general/response-from-service.interface';
import { User } from './entities/user.entity';
import { FilterUsersDto } from './dto/filter-users.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(filterUsersDto: FilterUsersDto): Promise<ResponseFromServiceI<User[]>>;
    findOne(userID: string): Promise<ResponseFromServiceI<User>>;
    update(userID: string, updateUserDto: UpdateUserDto): Promise<ResponseFromServiceI<User>>;
    remove(userID: string): Promise<ResponseFromServiceI<number>>;
}
