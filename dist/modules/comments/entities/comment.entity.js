"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
class Comment {
    constructor(createCommetDto) {
        this.comments = [];
        Object.assign(this, createCommetDto);
    }
    updateOne(updateCommentDto) {
        Object.assign(this, { ...this, ...updateCommentDto });
    }
    addAuthor(author) {
        this.author = author;
    }
    addPost(post) {
        this.post = post;
    }
    addComment(user, post) {
        this.addAuthor(user);
        this.addPost(post);
    }
    addReplyToComment(replyto, user) {
        this.addAuthor(user);
        this.replyToComment = { ...replyto };
    }
}
exports.Comment = Comment;
//# sourceMappingURL=comment.entity.js.map