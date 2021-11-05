"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoContactsError = void 0;
const common_1 = require("@nestjs/common");
class NoContactsError extends common_1.HttpException {
    constructor() {
        super(`No common contacts were found`, common_1.HttpStatus.NOT_FOUND);
    }
}
exports.NoContactsError = NoContactsError;
//# sourceMappingURL=errors.js.map