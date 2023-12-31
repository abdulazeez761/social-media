import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { ResponseFromServiceI } from 'shared/interfaces/general/response-from-service.interface';
import { PostsService } from 'modules/posts/posts.service';
import { UsersService } from 'modules/users/users.service';
import { FilterCommentsDto } from './dto/filter-comments.dto';
import { relationSelectUser } from 'modules/users/constants/select-user.constant';
import {
  relationSelectComment,
  selectComment,
} from './constants/select-comment.constant';
import { relationSelectPost } from 'modules/posts/constants/select-post.constant';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentssRepository: Repository<Comment>,
    private readonly postService: PostsService,
    private readonly usersService: UsersService,
  ) {}
  async create(
    createCommentDto: CreateCommentDto,
    postID: string,
    userID: string,
  ): Promise<ResponseFromServiceI<Comment>> {
    const post = await this.postService.findOneByID(postID);
    const user = await this.usersService.findOneByID(userID);

    if (!user)
      throw new HttpException(
        "can't create a post without a user",
        HttpStatus.NOT_FOUND,
      );
    if (!post)
      throw new HttpException(
        "can't create a comment without a post",
        HttpStatus.NOT_FOUND,
      );

    const createdComment = this.commentssRepository.create(createCommentDto);
    createdComment.post = post;
    createdComment.author = user;
    await this.commentssRepository.save(createdComment);
    return {
      httpStatus: HttpStatus.CREATED,
      message: {
        translationKey: 'shared.success.create',
        args: { entity: 'entities.comment' },
      },
      data: createdComment,
    };
  }

  /*
  !هاي غلط بعرف بس تعبت عليها خليها 

  async findAll(
    filterCommentsDto: FilterCommentsDto,
  ): Promise<ResponseFromServiceI<Comment[]>> {
    const { skip, take } = filterCommentsDto;
    let comments = await this.commentssRepository.find({
      relations: { author: true, post: true },
      select: {
        ...relationSelectComment,
        author: relationSelectUser,
        post: relationSelectPost,
      },
      take,
      skip,
    });
    return {
      data: comments,
      httpStatus: HttpStatus.OK,
      message: {
        translationKey: 'shared.success.findAll',
        args: { entity: 'entities.comment' },
      },
    };
  }
*/
  async findOne(commentID: string): Promise<ResponseFromServiceI<Comment>> {
    const comment = await this.commentssRepository.findOne({
      where: { id: commentID },
      relations: { author: true, post: true },
      select: {
        ...relationSelectComment,
        author: relationSelectUser,
        post: relationSelectPost,
      },
    });

    if (!comment)
      throw new HttpException('comment not found!', HttpStatus.NOT_FOUND);

    return {
      data: comment,
      httpStatus: HttpStatus.OK,
      message: {
        translationKey: 'shared.success.findOne',
        args: { entity: 'entities.comment' },
      },
    };
  }
  async findTotalComments(postID: string): Promise<number> {
    let postComments = await this.commentssRepository.find({
      where: {
        post: {
          id: postID,
        },
      },
    });
    let totalPostComments = postComments.length;
    return totalPostComments;
  }

  async findPostComments(
    postID: string,
    filterCommentsDto: FilterCommentsDto,
  ): Promise<ResponseFromServiceI<Comment[]>> {
    const { skip, take } = filterCommentsDto;
    let postComments = await this.commentssRepository.find({
      where: {
        post: {
          id: postID,
        },
      },
      relations: { author: true },
      select: {
        ...relationSelectComment,
        author: relationSelectUser,
      },
      take,
      skip,
    });

    let totalPostComments = await this.findTotalComments(postID);
    if (!postComments[0] || totalPostComments === 0)
      throw new HttpException(
        'this post has no comments!',
        HttpStatus.NOT_FOUND,
      );

    let data = { ...postComments, totalPostComments };
    return {
      data,
      httpStatus: HttpStatus.OK,
      message: {
        translationKey: 'shared.success.findAll',
        args: { entity: 'entities.comment' },
      },
    };
  }

  async update(
    commentID: string,
    userID: string,
    updateCommentDto: UpdateCommentDto,
  ): Promise<ResponseFromServiceI<Comment[]>> {
    const updateResult = await this.commentssRepository
      .createQueryBuilder()
      .update(Comment)
      .set(updateCommentDto)
      .where('id = :id AND author = :userID', { id: commentID, userID })
      .returning(selectComment as string[])

      .execute();

    if (!updateResult.affected)
      throw new HttpException('comment not found', HttpStatus.NOT_FOUND);

    return {
      data: updateResult.raw[0],
      httpStatus: HttpStatus.OK,
      message: {
        translationKey: 'shared.success.update',
        args: { entity: 'entities.comment' },
      },
    };
  }

  async remove(
    commentID: string,
    userID: string,
  ): Promise<ResponseFromServiceI<Comment[]>> {
    const deleteResult = await this.commentssRepository
      .createQueryBuilder()
      .delete()
      .from(Comment)
      .where('id = :id AND author = :userID', { id: commentID, userID })
      .returning(selectComment as string[])
      .execute();

    if (!deleteResult.affected)
      throw new HttpException('comment not found', HttpStatus.NOT_FOUND);

    return {
      data: deleteResult.raw[0],
      message: {
        translationKey: 'shared.success.delete',
        args: { entity: 'entities.comment' },
      },
      httpStatus: HttpStatus.OK,
    };
  }
}
