module.exports.run = async (bot, message, args) => {

    if(!args[0]) return message.reply("Gebruik sps <steen, papier, schaar>");

    var options = ["steen", "papier", "schaar"];

    var result = options[Math.floor( Math.random() * options.length)];

    switch(args[0].toUpperCase()){

        case "STEEN":

        switch(result){
            case "steen":
                message.channel.send(`Ik heb **${result}**, het is gelijk spel.`);
            break;

            case "papier":
                message.channel.send(`Ik heb **${result}**, ik win!`);
            break;

            case "schaar":
                message.channel.send(`Ik heb **${result}**, jij wint!`);
            break;
        }

        break;

        case "PAPIER":

            switch(result){
                case "steen":
                    message.channel.send(`Ik heb **${result}**, jij win!`);
                break;
    
                case "papier":
                    message.channel.send(`Ik heb **${result}**, het is gelijk spel!`);
                break;
    
                case "schaar":
                    message.channel.send(`Ik heb **${result}**, ik win!`);
                break;
            }
        
        break;

        case "SCHAAR":

            switch(result){
                case "steen":
                    message.channel.send(`Ik heb **${result}**, ik win!`);
                break;
    
                case "papier":
                    message.channel.send(`Ik heb **${result}**, jij wint!`);
                break;
    
                case "schaar":
                    message.channel.send(`Ik heb **${result}**, het is gelijk spel!`);
                break;
            }

        break;

        default:

        return message.channel.send("Gebruik steen, papier of schaar.");

    }

}

module.exports.help = {
    name: "sps"
}