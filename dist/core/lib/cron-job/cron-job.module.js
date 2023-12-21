"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronJobModule = void 0;
const common_1 = require("@nestjs/common");
const exception_clear_task_service_1 = require("./exception-clear-task.service");
const requests_clear_task_service_1 = require("./requests-clear-task.service");
let CronJobModule = class CronJobModule {
};
exports.CronJobModule = CronJobModule;
exports.CronJobModule = CronJobModule = __decorate([
    (0, common_1.Module)({
        providers: [exception_clear_task_service_1.ExceptionClearTaskService, requests_clear_task_service_1.RrequestClearTaskService],
    })
], CronJobModule);
//# sourceMappingURL=cron-job.module.js.map