"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(createUserDto) {
        Object.assign(this, createUserDto);
    }
    updateOne(updateUserDto) {
        Object.assign(this, { ...this, ...updateUserDto });
    }
}
exports.User = User;
//# sourceMappingURL=user.entity.js.map