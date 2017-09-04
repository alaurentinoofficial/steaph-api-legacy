var server_1 = require("./../server");
server_1.Server.listen(server_1.Server.get('port'), function () {
    console.log("\n> Steaph API\n> Lintening in :" + server_1.Server.get('port'));
});
