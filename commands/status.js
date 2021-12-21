module.exports.run = async (client, message, args) => {

    const statusText = args.join(" ");

    if(!message.member.permissions.has("BAN_MEMBERS")) return message.reply("Sorry jij kan jij niet doen.");

    client.user.setPresence({

        status: "online",
        activities: [
            {
                name: statusText
            }
        ]

    });

    return message.reply("Status aangepast voor de volgende 60sec.");

}

module.exports.help = {
    name: "status"
}