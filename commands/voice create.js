const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    if (!message.member.permissions.has("KICK_MEMBERS")) return message.reply("Jij bent geen moderator.");

    const naam = args.join(" ");

    const categoryId = "874307065827426355";

    if (!naam) return message.reply("Gelieve een naam mee te geven.");

    var ticketBestaat = false;

    message.guild.channels.cache.forEach((channel) => {

        if (channel.createdAt == message.author.id) {
            message.reply(`Je hebt al een spraak kanaal gemaakt.`);

            ticketBestaat = true;

            return;
        }

    });

    if (ticketBestaat) return;

    message.guild.channels.create(naam, { type: 'GUILD_VOICE' }).then((createdChan) => {

        createdChan.setParent(categoryId).then((settedParent) => {

            settedParent.permissionOverwrites.edit(message.guild.roles.cache.find(x => x.name === "@everyone"), {
                CREATE_INSTANT_INVITE: false,
                VIEW_CHANNEL: true,
                CONNECT: false

            });

            settedParent.permissionOverwrites.edit(message.author.id, {
                CREATE_INSTANT_INVITE: true,
                VIEW_CHANNEL: true,
                CONNECT: true
            });

        }).catch(err => {
            message.reply("Er is iets fout gelopen.");
            console.log(err);
        });

        message.channel.send(`Je voice channel is succesvol aangemaakt met de naam **${naam}**`);

    }).catch(err => {
        message.reply("Er is iets fout gelopen.");
        console.log(err);
    });


}

module.exports.help = {
    name: "voice-create",
    category: "serverBooster",
    discription: "Maakt een voice channel aan."
}