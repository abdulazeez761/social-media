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
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const post_entity_1 = require("./entities/post.entity");
const users_service_1 = require("../users/users.service");
let PostsService = class PostsService {
    constructor(usersService) {
        this.usersService = usersService;
        this.posts = [];
    }
    create(createPostDto, authorID) {
        const user = this.usersService.findOne(authorID);
        if (!user)
            throw new common_1.HttpException('user not found', common_1.HttpStatus.BAD_REQUEST);
        let length = this.posts.length;
        const post = new post_entity_1.Post({ ...createPostDto, id: ++length });
        post.addAuthor(user);
        this.posts.push(post);
        return {
            statusCode: common_1.HttpStatus.CREATED,
            message: 'Created Post Successfully',
        };
    }
    findAll() {
        return this.posts;
    }
    findOne(id) {
        const post = this.posts.find((post) => post.id === id);
        if (!post)
            throw new common_1.HttpException('[post] not found', common_1.HttpStatus.BAD_REQUEST);
        return post;
    }
    update(id, updatePostDto) {
        const post = this.posts.find((post) => post.id === id);
        if (!post)
            throw new common_1.HttpException('[post] not found', common_1.HttpStatus.BAD_REQUEST);
        post.updateOne(updatePostDto);
        return {
            data: post,
            message: 'Updated Post Successfully',
            statusCode: common_1.HttpStatus.OK,
        };
    }
    remove(id) {
        const post = this.findOne(id);
        this.posts = this.posts.filter((post) => post.id !== id);
        return {
            data: post,
            message: 'Delted Post Successfully',
            statusCode: common_1.HttpStatus.OK,
        };
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], PostsService);
//# sourceMappingURL=posts.service.js.map