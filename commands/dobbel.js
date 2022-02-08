module.exports.run = async (bot, message, args) => {

    var number = Math.ceil( Math.random() * 6);

    const categoryID = "920756970779205702";

    if (message.channel == categoryID) {

        return message.channel.send(`🎲 Je hebt **${number}** gegooit.`);
    
    }else{
        return message.channel.send("Gelieve dit command in <#920756970779205702> te doen.")
    }

}

module.exports.help = {
    name: "dobbel",
    category: "general",
    discription: "Gooit een dobbelsteen."
}