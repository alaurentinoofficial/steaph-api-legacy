export abstract class Job {
    public delayTime: number;
    protected repeat: Boolean;

    constructor(delayTime: number) {
        this.delayTime = delayTime;
    }

    public Run() {
        if(this.repeat)
            setTimeout(this.Execute, 5000);
        else
            this.Execute();
    }

    protected abstract Execute();
}