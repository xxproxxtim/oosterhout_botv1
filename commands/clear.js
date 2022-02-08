const fs = require("fs");

module.exports.run = async (client, message, args) => {

    if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.reply("Je bent geen moderator.");

    if(!args[0]) return message.reply("Geef een getal op.");

    if(parseInt(args[0])){

        var amount = parseInt(args[0]) + 1;

        message.channel.bulkDelete(amount).then(() => {

            if(parseInt(args[0]) == 1){
                message.channel.send("Ik heb **1** bericht verwijderd.").then(msg => {
                    setTimeout(() => {
                        msg.delete();
                    }, 3000);
                });
            }else{
                message.channel.send(`Er zijn **${parseInt(args[0])}** verwijderd.`).then(msg => {
                    setTimeout(() => {
                        msg.delete();
                    }, 3000);
                });
            }

        }).catch(err => {
            return message.reply("Geef een getal boven de 0 op.")
        });

    }else{
        return message.reply("Geef een getal op.");
    }

}

module.exports.help = {
    name: "clear",
    category: "staff",
    discription: "Verwijderd berichten."
}