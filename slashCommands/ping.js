const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {

    data: new SlashCommandBuilder()
	.setName('ping')
	.setDescription('Geeft de ping van de bot.'),
    async execute(client, interaction){

        interaction.reply({content: `ping: **${client.ws.ping}** ms.`, ephemeral: true});

    }

}

