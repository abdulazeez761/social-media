"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
class Post {
    constructor(createPostDto) {
        Object.assign(this, createPostDto);
        this.createdAt = new Date().toISOString();
        this.updatedAt = new Date().toISOString();
    }
    updateOne(updatePostDto) {
        Object.assign(this, { ...this, ...updatePostDto });
        this.updateDate();
    }
    addAuthor(author) {
        this.author = author;
    }
    updateDate() {
        this.updatedAt = new Date().toISOString();
    }
}
exports.Post = Post;
//# sourceMappingURL=post.entity.js.map