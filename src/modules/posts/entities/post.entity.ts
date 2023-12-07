import { User } from 'src/modules/users/entities/user.entity';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';

export class Post {
  id: number;

  author: User;

  text: string;

  image: string; // URL;

  createdAt: string; // Time of creation

  updatedAt: string; // last date of updating

  constructor(createPostDto: CreatePostDto) {
    Object.assign(this, createPostDto);
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  updateOne(updatePostDto: UpdatePostDto) {
    Object.assign(this, { ...this, ...updatePostDto });
    this.updateDate();
  }

  addAuthor(author: User) {
    this.author = author;
  }

  updateDate() {
    this.updatedAt = new Date().toISOString();
  }
}
