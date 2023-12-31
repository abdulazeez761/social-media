import { Post } from 'modules/posts/entities/post.entity';
import { Base } from 'shared/entities/base.entity';
import { Gender } from 'shared/enums/gender.enum';
export declare class User extends Base {
    username: string;
    email: string;
    password: string;
    gender: Gender;
    birthday: string;
    posts: Post[];
}
