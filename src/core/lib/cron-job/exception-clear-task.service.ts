import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { truncate } from 'fs';

@Injectable()
export class ExceptionClearTaskService {
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  hadnleCron() {
    truncate('./logs/app-exceptions.json', 0, () =>
      console.log("Deleted File 'app-exceptions.json' Successfully!"),
    );
  }
}
