module.exports.run = async (bot, message, args) => {

    return message.channel.send("Test werkt!");

}

module.exports.help = {
    name: "test",
    category: "general",
    discription: "Doet niks nutig."
}