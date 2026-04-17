import { Injectable } from '@nestjs/common';
import * as cron from 'node-cron';

@Injectable()
export class CronService {
  private tasks: Map<string, cron.ScheduledTask> = new Map();

  constructor() {}

  startJob({
    name,
    schedule,
    callback,
  }: {
    name: string;
    schedule: string;
    callback: () => void | Promise<void>;
  }) {
    // early return to avoid multiple jobs for the same key (name)
    if (this.tasks.has(name)) {
      console.log(`Job ${name} already running`);
      return;
    }

    // schedule and store job
    const task = cron.schedule(schedule, async () => {
      await callback();
    });

    this.tasks.set(name, task);

    console.log(`Started job: ${name}`);
  }
}
