import { CacheService } from 'core/lib/cache/cache.service';
import { ResponseFromServiceI } from 'shared/interfaces/general/response-from-service.interface';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { FilterUsersDto } from './dto/filter-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
export declare class UsersService {
    private readonly cacheService;
    private usersRepository;
    constructor(cacheService: CacheService, usersRepository: Repository<User>);
    createUserForAuth(createUserDto: CreateUserDto): Promise<User>;
    findAll(filterUsersDto: FilterUsersDto): Promise<ResponseFromServiceI<User[]>>;
    findOne(userID: string): Promise<ResponseFromServiceI<User>>;
    update(userID: string, updateUserDto: UpdateUserDto): Promise<ResponseFromServiceI<User>>;
    remove(userID: string): Promise<ResponseFromServiceI<number>>;
    findOneByID(userID: string): Promise<User | null>;
    findUserByEmail(email: string): Promise<User | null>;
    findUserByColumn(column: string, value: unknown): Promise<User | null>;
}
