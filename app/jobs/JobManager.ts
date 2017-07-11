import { Job } from "./Job";
import { UpdateStatusJob } from "./UpdateStatusJob";

export class JobManager {
    public jobs: Job[];

    public addJob(j): JobManager {
        this.jobs.push(j);
        return this;
    };

    public executeAllJobs() {
        this.jobs.forEach(e => {
            e.Run();
        });
    }
}