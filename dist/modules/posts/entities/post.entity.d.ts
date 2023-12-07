import { User } from 'src/modules/users/entities/user.entity';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
export declare class Post {
    id: number;
    author: User;
    text: string;
    image: string;
    createdAt: string;
    updatedAt: string;
    constructor(createPostDto: CreatePostDto);
    updateOne(updatePostDto: UpdatePostDto): void;
    addAuthor(author: User): void;
    updateDate(): void;
}
