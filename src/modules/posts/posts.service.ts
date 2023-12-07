import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { UsersService } from 'modules/users/users.service';

@Injectable()
export class PostsService {
  constructor(private readonly usersService: UsersService) { }
  posts: Post[] = [];
  create(createPostDto: CreatePostDto, authorID: number) {
    const user = this.usersService.findOne(authorID);

    if (!user)
      throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
    let length = this.posts.length;
    const post = new Post({ ...createPostDto, id: ++length });

    post.addAuthor(user);

    this.posts.push(post);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Created Post Successfully',
    };
  }

  findAll() {
    return this.posts;
  }

  findOne(id: number) {
    const post = this.posts.find((post) => post.id === id);
    if (!post) throw new HttpException('[post] not found', HttpStatus.BAD_REQUEST);
    return post;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    const post = this.posts.find((post) => post.id === id);
    if (!post) throw new HttpException('[post] not found', HttpStatus.BAD_REQUEST);
    post.updateOne(updatePostDto);
    return {
      data: post,
      message: 'Updated Post Successfully',
      statusCode: HttpStatus.OK,
    };
  }

  remove(id: number) {
    const post = this.findOne(id)
    this.posts = this.posts.filter((post) => post.id !== id)
    return {
      data: post,
      message: 'Delted Post Successfully',
      statusCode: HttpStatus.OK,
    }
  }
}
