import { Server } from "./../server";

Server.listen(Server.get('port'), () => {
    console.log("\n> Steaph API\n> Listening in :" + Server.get('port'));
});