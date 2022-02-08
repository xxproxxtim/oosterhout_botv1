const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    const categoryID = "936656709307469855";

    console.log("Kaas5");

    var userName = message.author.username;

    var userDiscriminator = message.author.discriminator;

    console.log("Kaas6");

    var ticketBestaat = false;

    const categoryID2deX51 = "866736873648291910";

    if (message.channel == categoryID2deX51) {

        var reason = args.join(" ");
        if (!reason) return message.reply("Gelieve een reden te geven.");

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

        let role = message.guild.roles.cache.get("866743623593099294");
        let role1 = message.guild.roles.cache.get("918590007806152814");
        let role2 = message.guild.roles.cache.get("866739689683812403");
        let role3 = message.guild.roles.cache.get("866739955737034783");
        let role4 = message.guild.roles.cache.get("877181332340506645");
        let role5 = message.guild.roles.cache.get("866741194369662996");
        let role6 = message.guild.roles.cache.get("878982371595157525");
        let role7 = message.guild.roles.cache.get("875306434546520124");
        let role8 = message.guild.roles.cache.get("866743097324470293");

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
                settedParent.permissionOverwrites.edit(role, {
                    CREATE_INSTANT_INVITE: false,
                    READ_MESSAGE_HISTORY: true,
                    SEND_MESSAGES: true,
                    ATTACH_FILES: true,
                    CONNECT: true,
                    ADD_REACTIONS: true
                });

                settedParent.permissionOverwrites.edit(role1, {
                    CREATE_INSTANT_INVITE: false,
                    READ_MESSAGE_HISTORY: true,
                    SEND_MESSAGES: true,
                    ATTACH_FILES: true,
                    CONNECT: true,
                    ADD_REACTIONS: true
                });

                settedParent.permissionOverwrites.edit(role2, {
                    CREATE_INSTANT_INVITE: false,
                    READ_MESSAGE_HISTORY: true,
                    SEND_MESSAGES: true,
                    ATTACH_FILES: true,
                    CONNECT: true,
                    ADD_REACTIONS: true
                });

                settedParent.permissionOverwrites.edit(role3, {
                    CREATE_INSTANT_INVITE: false,
                    READ_MESSAGE_HISTORY: true,
                    SEND_MESSAGES: true,
                    ATTACH_FILES: true,
                    CONNECT: true,
                    ADD_REACTIONS: true
                });

                settedParent.permissionOverwrites.edit(role4, {
                    CREATE_INSTANT_INVITE: false,
                    READ_MESSAGE_HISTORY: true,
                    SEND_MESSAGES: true,
                    ATTACH_FILES: true,
                    CONNECT: true,
                    ADD_REACTIONS: true
                });

                settedParent.permissionOverwrites.edit(role5, {
                    CREATE_INSTANT_INVITE: false,
                    READ_MESSAGE_HISTORY: true,
                    SEND_MESSAGES: true,
                    ATTACH_FILES: true,
                    CONNECT: true,
                    ADD_REACTIONS: true
                });

                settedParent.permissionOverwrites.edit(role6, {
                    CREATE_INSTANT_INVITE: false,
                    READ_MESSAGE_HISTORY: true,
                    SEND_MESSAGES: true,
                    ATTACH_FILES: true,
                    CONNECT: true,
                    ADD_REACTIONS: true
                });

                settedParent.permissionOverwrites.edit(role7, {
                    CREATE_INSTANT_INVITE: false,
                    READ_MESSAGE_HISTORY: true,
                    SEND_MESSAGES: true,
                    ATTACH_FILES: true,
                    CONNECT: true,
                    ADD_REACTIONS: true
                });

                settedParent.permissionOverwrites.edit(role8, {
                    CREATE_INSTANT_INVITE: false,
                    READ_MESSAGE_HISTORY: true,
                    SEND_MESSAGES: true,
                    ATTACH_FILES: true,
                    CONNECT: true,
                    ADD_REACTIONS: true
                });

                console.log("Kaas15");

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
                message.channel.send(`Ticket aan gemaakt in <#${createdChan.id}>.`);

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

    } else {
        return message.channel.send("Gelieve dit command in <#866736873648291910> te doen.")
    }

}

module.exports.help = {
    name: "new",
    category: "general",
    discription: "Maakt een ticket aan."
}