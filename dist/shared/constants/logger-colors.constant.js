"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateColor = exports.warnColor = exports.errorColor = exports.logColor = void 0;
exports.logColor = {
    messageColor: '\x1B[96m',
    contextColor: `\x1B[95m`,
};
exports.errorColor = {
    messageColor: '\x1B[31m',
    contextColor: `\x1b[1;30m`,
};
exports.warnColor = {
    messageColor: '\x1b[1;31m',
    contextColor: `\x1b[1;37m`,
};
exports.dateColor = '\x1B[39m';
//# sourceMappingURL=logger-colors.constant.js.map