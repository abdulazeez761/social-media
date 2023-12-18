import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'core/decorator/public.decorator';
import { ROUTES } from 'shared/constants/routes.constant';

@ApiTags(ROUTES.USERS.CONTROLLER)
@Controller(ROUTES.USERS.CONTROLLER)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @Public()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(ROUTES.USERS.FIND_ALL)
  findAll() {
    return this.usersService.findAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(ROUTES.USERS.FIND_ONE)
  findOne(@Param('userID', ParseIntPipe) userID: number) {
    return this.usersService.findOne(userID);
  }
  @UseInterceptors(ClassSerializerInterceptor)
  @Patch(ROUTES.USERS.UPDATE_ONE)
  update(
    @Param('userID', ParseIntPipe) userID: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(userID, updateUserDto);
  }

  @Delete(ROUTES.USERS.DELETE_ONE)
  remove(@Param('userID', ParseIntPipe) userID: number) {
    return this.usersService.remove(userID);
  }
}
