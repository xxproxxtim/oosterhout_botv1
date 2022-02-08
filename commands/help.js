const botConfig = require("../botConfig.json");

module.exports.run = async (client, message, args) => {

    const categoryID = "866736873648291910";

    if (message.channel == categoryID) {

        try {

            var prefix = botConfig.prefix;

            var respone = "**Bot commands**\r\n\n";
            var general = "**__Algemeen__**\r\n";
            var serverBooster = "**__ServerBooster__**\r\n";
            var info = "**__Informatie__**\r\n";
            var staff = "**__Staff__**\r\n";

            client.commands.forEach(command => {

                switch (command.help.category) {

                    case "general":
                        general += `${prefix}${command.help.name} - ${command.help.discription}\r\n`;
                        break;

                    case "serverBooster":
                        serverBooster += `${prefix}${command.help.name} - ${command.help.discription}\r\n`;
                        break;

                    case "info":
                        info += `${prefix}${command.help.name} - ${command.help.discription}\r\n`;
                        break;

                    case "staff":
                        staff += `${prefix}${command.help.name} - ${command.help.discription}\r\n`;
                        break;

                }

            });

            respone += general + serverBooster + info + staff;

            message.author.send(respone).then(() => {
                return message.reply("De commands staan in je dm.");
            }).catch(() => {
                return message.reply("Je privé berichten staan uit.");
            });

        } catch (error) {
            message.reply("Er is een fout opgetrede.");
        }

    } else {
        return message.channel.send("Gelieve dit command in <#866736873648291910> te doen.")
    }

}

module.exports.help = {
    name: "help",
    category: "info",
    discription: "Laat alle commands zien."
}