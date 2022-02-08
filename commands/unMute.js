const fs = require("fs");
const tempMute = JSON.parse(fs.readFileSync("./tempMutes.json", "utf8"));

module.exports.run = async (client, message, args) => {

    if (!message.member.permissions.has("KICK_MEMBERS")) return message.reply("Jij bent geen mod!");

    if (!args[0]) return message.reply("Je moet een gebruiker meegeven.");

    var tempMuteUser = message.guild.members.cache.get(message.mentions.users.first().id || message.guild.members.get(args[0]).id)

    if (!tempMuteUser) return message.reply("Kan gebruiker niet vinden.");

    if (tempMuteUser.permissions.has("MANAGE_MESSAGES")) return message.reply("Je kan geen staff muten.");

    let muteRole = message.guild.roles.cache.get("872146717217267742");

    if (!muteRole) return message.channel.send("Rol bestaat niet.");

    if (tempMuteUser.roles.cache.some(role => role.name === "muted")) {
        message.channel.send("Deze persoon is al unmuted.");
    } else {
        tempMuteUser.roles.remove(muteRole.id);
        message.channel.send(`${tempMuteUser} is succesvol unmuted.`);

        tempMute[tempMuteUser].time = 0;

        fs.writeFile("./tempMutes.json", JSON.stringify(tempMute), (err) => {
            if (err) console.log(err);
        });
    }

}

module.exports.help = {
    name: "unmute",
    category: "staff",
    discription: "Unmute een persoon."
}