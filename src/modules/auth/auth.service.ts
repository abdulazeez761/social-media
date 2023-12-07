import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { LogUserInDto } from './dto/log-user-in.dto';
import { CacheService } from 'src/core/lib/cache/cache.service';
@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
        private readonly cacheService: CacheService
    ) { }

    async create(createUserDto: CreateUserDto) { // register
        const { password } = createUserDto;
        const hashedPassword = await bcrypt.hash(password, 10);
        createUserDto.password = hashedPassword;
        this.userService.createuserForAuth(createUserDto)
        return {
            statusCode: HttpStatus.CREATED,
            message: 'Created User Successfully',
        };
    }

    async logUserIn(logUserInDto: LogUserInDto) {
        const { email } = logUserInDto;

        const user = this.userService.findUserByEmail(email);

        if (!user)
            throw new HttpException(
                'User Credentials is incorrect',
                HttpStatus.UNAUTHORIZED,
            );

        const { password } = user;
        const isPasswordCorrect = await bcrypt.compare(
            logUserInDto.password,
            password,
        );

        if (!isPasswordCorrect)
            throw new HttpException(
                'User Credentials is incorrect',
                HttpStatus.UNAUTHORIZED,
            );

        const payload = {
            sub: user.id,
        };

        const userFromCache = await this.cacheService.get<{ // comment50:  we are passing an object because in the set method we will be passing an object that includes the id of the user and the token 
            accessToken: string;
            userID: string
        }>(user.id + ''); // (user.id + '') converts the data type into a string 

        let accessToken = undefined;

        if (!userFromCache?.accessToken) {
            accessToken = this.jwtService.sign(payload, {
                secret: "@AA@23&^D^*&^&DWA^&D^A&D^&SD()()*-989daw>++++_+A1123djakwjdawdja213_AccessToken",
                expiresIn: '1d'
            })

            this.cacheService.set(user.id + '', { // this.comment50
                userID: user.id,
                accessToken: accessToken
            }, 0)
            return { accessToken };
        }

        accessToken = userFromCache?.accessToken;
        return accessToken;
    }

    async logUserOut(id: number) {
        await this.cacheService.deleteField(id + '', "accessToken")
        return {

            message: 'logend out!',
            statusCode: HttpStatus.OK,
        };

    }

}
