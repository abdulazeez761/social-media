import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UserID } from 'core/decorators/user-id.decorator';
import { FilterPostsDto } from './dto/filter-posts.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto, @UserID() userID: string) {
    return this.postsService.create(createPostDto, userID);
  }

  @Get()
  findAll(@Query() filterPostsDto: FilterPostsDto) {
    return this.postsService.findAll(filterPostsDto);
  }

  @Get(':postID')
  findOne(@Param('postID', new ParseUUIDPipe()) postID: string) {
    return this.postsService.findOne(postID);
  }

  @Patch(':postID')
  update(
    @Param('postID', new ParseUUIDPipe()) postID: string,
    @Body() updatePostDto: UpdatePostDto,
    @UserID() userID: string,
  ) {
    return this.postsService.update(postID, updatePostDto, userID);
  }

  @Delete(':postID')
  remove(
    @Param('postID', new ParseUUIDPipe()) postID: string,
    @UserID() userID: string,
  ) {
    return this.postsService.remove(postID, userID);
  }
}
