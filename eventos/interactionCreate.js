const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	emiter: "on",
	run: async (client, interaction) => {

		if (interaction.isChatInputCommand()) {

			const command = client.slashCommands.get(interaction.commandName);
			if (!command) return interaction.reply("Ha ocurrido un error.")

			await command.run(client, interaction)

		}
	}
}