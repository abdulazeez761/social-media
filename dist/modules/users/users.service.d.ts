import { CacheService } from 'core/lib/cache/cache.service';
import { ResponseFromServiceI } from 'shared/interfaces/general/response-from-service.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { FilterUsersDto } from './dto/filter-users.dto';
export declare class UsersService {
    private readonly cacheService;
    private usersRepository;
    constructor(cacheService: CacheService, usersRepository: Repository<User>);
    createUserForAuth(createUserDto: CreateUserDto): Promise<User>;
    findAll(filterUsersDto: FilterUsersDto): Promise<ResponseFromServiceI<User[]>>;
    findOne(id: string): Promise<ResponseFromServiceI<User>>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<ResponseFromServiceI<User>>;
    remove(id: string): Promise<ResponseFromServiceI<User>>;
    findUserByEmail(email: string): Promise<User | null>;
}
