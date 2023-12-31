import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { relationSelectUser } from 'modules/users/constants/select-user.constant';
import { UsersService } from 'modules/users/users.service';
import { ResponseFromServiceI } from 'shared/interfaces/general/response-from-service.interface';
import { Repository } from 'typeorm';
import {
  relationSelectPost,
  selectPost,
} from './constants/select-post.constant';
import { CreatePostDto } from './dto/create-post.dto';
import { FilterPostsDto } from './dto/filter-posts.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,

    private readonly usersService: UsersService,
  ) {}
  async create(
    createPostDto: CreatePostDto,
    userID: string,
  ): Promise<ResponseFromServiceI<Post>> {
    const user = await this.usersService.findOneByID(userID);

    if (!user)
      throw new HttpException(
        "can't create a post without a user",
        HttpStatus.NOT_FOUND,
      );

    const createdPost = this.postsRepository.create(createPostDto);
    createdPost.author = user;

    await this.postsRepository.save(createdPost);

    return {
      httpStatus: HttpStatus.CREATED,
      message: {
        translationKey: 'shared.success.create',
        args: { entity: 'entities.post' },
      },
      data: createdPost,
    };
  }

  async findAll(
    filterPostsDto: FilterPostsDto,
  ): Promise<ResponseFromServiceI<Post[]>> {
    const { skip, take } = filterPostsDto;
    const posts = await this.postsRepository.find({
      relations: { author: true },
      select: {
        ...relationSelectPost,
        author: relationSelectUser,
      },
      take,
      skip,
    });

    return {
      data: posts,
      httpStatus: HttpStatus.OK,
      message: {
        translationKey: 'shared.success.findAll',
        args: { entity: 'entities.post' },
      },
    };
  }

  async findOne(postID: string) {
    const post = await this.postsRepository.findOne({
      where: { id: postID },
      relations: { author: true },
      select: {
        ...relationSelectPost,

        author: relationSelectUser,
      },
    });
    if (!post) throw new HttpException('post not found', HttpStatus.NOT_FOUND);
    return {
      data: post,
      httpStatus: HttpStatus.OK,
      message: {
        translationKey: 'shared.success.findOne',
        args: { entity: 'entities.post' },
      },
    };
  }

  async update(postID: string, updatePostDto: UpdatePostDto, userID: string) {
    const updateResult = await this.postsRepository
      .createQueryBuilder()
      .update(Post)
      .set(updatePostDto)
      .where('id = :id AND author = :userID', { id: postID, userID })
      .returning(selectPost as string[])
      .execute();

    if (!updateResult.affected)
      throw new HttpException('post not found', HttpStatus.NOT_FOUND);

    return {
      data: updateResult.raw[0],
      message: {
        translationKey: 'shared.success.update',
        args: { entity: 'entities.post' },
      },
      httpStatus: HttpStatus.OK,
    };
  }

  async remove(postID: string, userID: string) {
    const deleteResult = await this.postsRepository
      .createQueryBuilder()
      .delete()
      .from(Post)
      .where('id = :id AND author = :userID', { id: postID, userID })
      .returning(selectPost as string[])
      .execute();

    if (!deleteResult.affected)
      throw new HttpException('post not found', HttpStatus.NOT_FOUND);

    return {
      data: deleteResult.raw[0],
      message: {
        translationKey: 'shared.success.delete',
        args: { entity: 'entities.post' },
      },
      httpStatus: HttpStatus.OK,
    };
  }
  findOneByID(postID: string) {
    return this.postsRepository.findOneBy({ id: postID });
  }
}
