const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    if (!args[0]) return message.reply("Gelieve een user mee te geven.");

    if (!args[1]) return message.reply("Gelieve een reden mee te geven.");

    var kickUser = message.guild.members.cache.get(message.mentions.users.first().id || message.guild.members.get(args[0]).id);

    if (!kickUser) return message.reply("Kan de gebruiker niet vinden.");

    if (kickUser.permissions.has("KICK_MEMBERS")) return message.reply("Je kan geen staff bannen.");

    var reason = args.slice(1).join(" ");

    var embedPromt = new discord.MessageEmbed()
        .setColor("ORANGE")
        .setTitle("Reageer binnen de 30 sec.")
        .setDescription(`Wil je ${kickUser} (${kickUser.id}) bannen?`)
        .setTimestamp()
        .setFooter(`${message.author.username}`);
    var embed = new discord.MessageEmbed()
        .setColor("RED")
        .setTitle("Persoon gekickt.")
        .setDescription(`**Geband:** ${kickUser.user.username} (${kickUser.id})
            **Geband door:** ${message.author}
            **Reden:** ${reason}`)
        .setTimestamp()
        .setFooter(`${message.member.displayName}`);
    message.channel.send({ embeds: [embedPromt] }).then(async msg => {

        let authorID = message.author.id;
        let time = 30;
        let reactions = ["✔", "✖"];

        time *= 1000;

        for (const reaction of reactions) {
            await msg.react(reaction);
        }

        const filter = (reaction, user) => {
            return reactions.includes(reaction.emoji.name) && user.id === authorID;
        };

        msg.awaitReactions({ filter, max: 1, time: time }).then(collected => {
            var emojiDetails = collected.first();

            if (emojiDetails.emoji.name === "✔") {

                msg.delete();

                kickUser.ban(`${reason} Unban: https://forms.gle/W8zwyubcDPbfvqGEA`);

                message.channel.send({ embeds: [embed] });

            } else if (emojiDetails.emoji.name === "✖") {

                msg.delete();

                message.channel.send("Ban geanulleerd.").then(msg => {
                    message.delete()
                    setTimeout(() => msg.delete(), 5000);
                });

            }

        });
    });

}

module.exports.help = {
    name: "ban",
    category: "staff",
    discription: "Band een persoon."
}