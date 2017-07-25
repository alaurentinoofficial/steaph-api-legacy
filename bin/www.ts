import { Server } from "./../server";

Server.listen(Server.get('port'), () => {
    console.log("\n> Steaph API\n> Lintening in :" + Server.get('port'));
});