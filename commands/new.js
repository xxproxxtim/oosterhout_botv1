const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    const categoryID = "866957228081414144";

    console.log("Kaas5");

    var userName = message.author.username;

    var userDiscriminator = message.author.discriminator;

    var reason = args.join(" ");
    if (!reason) return message.reply("Gelieve een reden te geven.");

    console.log("Kaas6");

    var ticketBestaat = false;

    message.guild.channels.cache.forEach((channel) => {

        if (channel.name == userName.toLowerCase() + "-" + userDiscriminator) {
            message.reply(`Je hebt al een ticket gemaakt.`);

            ticketBestaat = true;

            return;
        }

    });

    console.log("Kaas7");

    if (ticketBestaat) return;

    console.log("Kaas4")

    message.guild.channels.create(userName.toLowerCase() + "-" + userDiscriminator, { type: "text" }).then((createdChan) => {
        createdChan.setParent(categoryID).then((settedParent) => {

            // Perms zodat iedereen niets kan lezen.
            settedParent.permissionOverwrites.edit(message.guild.roles.cache.find(x => x.name === "@everyone"), {

                SEND_MESSAGES: false,
                VIEW_CHANNEL: false

            });

            console.log("Kaas8");

            // READ_MESSAGE_HISTORY Was vroeger READ_MESSAGES
            // Perms zodat de gebruiker die het command heeft getypt alles kan zien van zijn ticket.
            settedParent.permissionOverwrites.edit(message.author.id, {
                CREATE_INSTANT_INVITE: false,
                READ_MESSAGE_HISTORY: true,
                SEND_MESSAGES: true,
                ATTACH_FILES: true,
                CONNECT: true,
                ADD_REACTIONS: true
            });

            console.log("Kaas9");

            // Perms zodat de gebruikers die admin zijn alles kunnen zien van zijn ticket.
            settedParent.permissionOverwrites.edit(message.guild.roles.cache.find(x => x.name === "Support-Oosterhout"), {
                CREATE_INSTANT_INVITE: false,
                READ_MESSAGE_HISTORY: true,
                SEND_MESSAGES: true,
                ATTACH_FILES: true,
                CONNECT: true,
                ADD_REACTIONS: true
            });

            let today = new Date();
            let dd = String(today.getDate()).padStart(2, '0'); // Nul toevoegen als het bv. 1 is -> 01
            let mm = String(today.getMonth() + 1).padStart(2, '0');
            let yyyy = today.getFullYear();
            today = `${dd}/${mm}/${yyyy}`;

            let embedParent = new discord.MessageEmbed()
                .setAuthor(message.author.username, message.author.displayAvatarURL({ size: 4096 }))
                .setTitle(`Ticket ${message.author.username}`)
                .setDescription('Het support-team komt je helpen.')
                .addFields(
                    { name: "Reden", value: reason, inline: true },
                    { name: "Aangemaakt op", value: today, inline: true }
                );
            message.channel.send("Ticket aan gemaakt.");

            settedParent.send({ embeds: [embedParent] });

            settedParent.send(`${message.author}`)

        }).catch(err => {
            message.reply("Er is een probleem opgetreden.");
            console.log(err)
        });

    }).catch(err => {
        message.reply("Er is een probleem opgetreden.");
        console.log(err)
    });

    console.log("Kaas10");

}

module.exports.help = {
    name: "new"
}