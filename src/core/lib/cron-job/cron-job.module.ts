import { Module } from '@nestjs/common';
import { ExceptionClearTaskService } from './exception-clear-task.service';
import { RrequestClearTaskService } from './requests-clear-task.service';

@Module({
  providers: [ExceptionClearTaskService, RrequestClearTaskService],
})
export class CronJobModule {}
