"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestIdGenerator = void 0;
function requestIdGenerator(time, token) {
    let key = '';
    let tokenIndex = 0;
    for (let i = 0; i < time.length && tokenIndex < token.length; i += 2) {
        key += token[tokenIndex++];
        key += time[i + 1];
    }
    return key;
}
exports.requestIdGenerator = requestIdGenerator;
//# sourceMappingURL=requestID-generator.util.js.map