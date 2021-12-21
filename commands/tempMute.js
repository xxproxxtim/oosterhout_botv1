const discord = require("discord.js");
const ms = require("ms");

const fs = require("fs");
const tempMute = JSON.parse(fs.readFileSync("./tempMutes.json", "utf8"));

module.exports.run = async (client, message, args) => {

    if(!message.member.permissions.has("KICK_MEMBERS")) return message.reply("Jij bent geen mod!");

    if(!args[0]) return message.reply("Je moet een gebruiker meegeven.");

    var tempMuteUser = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || 
    message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || 
    message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());

    if(!tempMuteUser) return message.reply("Kan gebruiker niet vinden.");

    if (tempMuteUser.permissions.has("MANAGE_MESSAGES")) return message.reply("Je kan geen staff muten.");

    let muteRole = message.guild.roles.cache.get("872146717217267742");

    if(!muteRole) return message.channel.send("Rol bestaat niet.");

    var muteTime = args[1];

    if(!muteTime) return message.channel.send("Geen tijd meegegeven.");

    if(tempMuteUser.roles.cache.some(role => role.name === "muted")) {
        message.channel.send("Deze persoon is al muted.");
    }else{
        tempMuteUser.roles.add(muteRole.id);
        message.channel.send(`${tempMuteUser} is succesvol gemute voor ${muteTime}.`);

        if(!tempMute[tempMuteUser]) tempMute[tempMuteUser] = {
            time: 0
        };

        let date = new Date();
        let dateMilli = date.getTime();
        let dateAdded = dateMilli + ms(muteTime);

        tempMute[tempMuteUser].time = dateAdded;

        fs.writeFile("./tempMutes.json", JSON.stringify(tempMute), (err) => {
            if(err) console.log(err);
        });


        //setTimeout(() => {
        //    tempMuteUser.roles.remove(muteRole.id);
        //}, ms(muteTime));
    }

}

module.exports.help = {
    name: "tempMute"
}