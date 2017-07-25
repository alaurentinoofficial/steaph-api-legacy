import * as mqtt from "mqtt";
import { EnvironmentScheduleSchema } from "../models/Environment";

var updates = [];

let UpdateStatus = () => {
    var client  = mqtt.connect({
        host: 'm11.cloudmqtt.com',
        port: 14581,
        username: 'zqakfvdw',
        password: 'mSXZM1Lvajuw',
        clientId: 'Steaph-API'
    });

    client.on('connect', function () {
        updates.forEach(e => {
            client.publish('steaph/environments/' + e.environment + "/status",
            e.status ? "true" : "false", {qos: 1, retain: false});

            console.log("> Set status " + e.environment + " = " + e.status);
        });

        updates = [];

        client.end();
    });
}

export var UpdateEnvironments = (delay: Number) => {
    EnvironmentScheduleSchema.find({}, (err, schedules) => {
        if(err || schedules.length == 0){
            return;
        }

        var now = new Date();
        let d = new Date(now);
        d.setHours(now.getHours() + 1);

        schedules.forEach(function (s) {
            if(d > _baseDate(new Date(s.start))
            && now <= _baseDate(new Date(s.end))) {
                updates.push({environment: s.environment, status: true});
            }
            else {
                updates.push({environment: s.environment, status: false});
            }
        });

        UpdateStatus();
    });

    setTimeout(function() {UpdateEnvironments(delay)}, delay);
}

let _baseDate = function(date) {
    var now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(),date.getMilliseconds());
};