"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const comment_entity_1 = require("./entities/comment.entity");
const users_service_1 = require("../users/users.service");
const posts_service_1 = require("../posts/posts.service");
let CommentsService = class CommentsService {
    constructor(postsService, userService) {
        this.postsService = postsService;
        this.userService = userService;
        this.comments = [];
    }
    create(createCommentDto, id) {
        const { author, replyToComment } = createCommentDto;
        const user = this.userService.findOne(author);
        const post = this.postsService.findOne(id);
        let commentID = this.comments.length + 1;
        if (replyToComment) {
            const comment = this.comments.find((comment) => comment.id === replyToComment);
            if (!comment)
                throw new common_1.HttpException('comment does not exist ', common_1.HttpStatus.BAD_REQUEST);
            const replyID = comment.comments.length + 1;
            const reply = new comment_entity_1.Comment({
                ...createCommentDto,
                id: replyID
            });
            const replyComment = new comment_entity_1.Comment({
                ...createCommentDto,
                id: commentID
            });
            replyComment.addReplyToComment(comment, user);
            this.comments.push(replyComment);
            comment.comments.push(reply);
        }
        else {
            const comment = new comment_entity_1.Comment({
                ...createCommentDto,
                id: commentID,
            });
            comment.addComment(user, post);
            this.comments.push(comment);
        }
    }
    findAll() {
        return this.comments;
    }
    findOne(id) {
        return `This action returns a #${id} comment`;
    }
};
exports.CommentsService = CommentsService;
exports.CommentsService = CommentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [posts_service_1.PostsService, users_service_1.UsersService])
], CommentsService);
//# sourceMappingURL=comments.service.js.map