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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const dist_1 = require("@nestjs/swagger/dist");
const decorators_1 = require("@nestjs/swagger/dist/decorators");
const public_decorator_1 = require("../../core/decorators/public.decorator");
const user_id_decorator_1 = require("../../core/decorators/user-id.decorator");
const create_user_dto_1 = require("../users/dto/create-user.dto");
const routes_constant_1 = require("../../shared/constants/routes.constant");
const register_route_api_response_conatant_1 = require("./constants/register-route-api-response.conatant");
const log_user_in_dto_1 = require("./dto/log-user-in.dto");
const login_service_1 = require("./login.service");
const logout_service_1 = require("./logout.service");
const register_service_1 = require("./register.service");
let AuthController = class AuthController {
    loginService;
    registerService;
    logoutService;
    constructor(loginService, registerService, logoutService) {
        this.loginService = loginService;
        this.registerService = registerService;
        this.logoutService = logoutService;
    }
    registerUser(createUserDto) {
        return this.registerService.registerUser(createUserDto);
    }
    logUserIn(logUserInDto) {
        return this.loginService.logUserIn(logUserInDto);
    }
    logUserOut(userID) {
        return this.logoutService.logUserOut(userID);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, decorators_1.ApiResponse)(register_route_api_response_conatant_1.registerRouteApiResponse),
    (0, common_1.Post)(routes_constant_1.ROUTES.AUTH.REGISTER_USER),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "registerUser", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)(routes_constant_1.ROUTES.AUTH.LOG_USER_IN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [log_user_in_dto_1.LogUserInDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "logUserIn", null);
__decorate([
    (0, common_1.Post)(routes_constant_1.ROUTES.AUTH.LOG_OUT),
    __param(0, (0, user_id_decorator_1.UserID)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "logUserOut", null);
exports.AuthController = AuthController = __decorate([
    (0, dist_1.ApiTags)(routes_constant_1.ROUTES.AUTH.CONTROLLER),
    (0, common_1.Controller)(routes_constant_1.ROUTES.AUTH.CONTROLLER),
    __metadata("design:paramtypes", [login_service_1.LoginService,
        register_service_1.RegisterService,
        logout_service_1.LogoutService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map