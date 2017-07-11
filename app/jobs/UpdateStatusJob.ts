import { Job } from "./Job";

export class UpdateStatusJob extends Job {
    protected repeat: Boolean = true;

    public Execute() {
        console.log("Oi!");   
    }
}