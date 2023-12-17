"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formattedDateForConsole = void 0;
const formattedDateForConsole = () => new Date(Date.now()).toLocaleString(undefined, {
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    day: '2-digit',
    month: '2-digit',
});
exports.formattedDateForConsole = formattedDateForConsole;
//# sourceMappingURL=date.util.js.map