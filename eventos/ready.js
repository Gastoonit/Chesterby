const config = require('../config.json')
const { Events } = require('discord.js')

module.exports = {
	name: Events.Ready,
	emiter: "once",
	run: async (client) => {

		/* Slash Commands */
		const slashCommands = client.slashCommands.map(x => x)
		await client.guilds.cache.get(config.GUILD_ID).commands.set(slashCommands);

		console.log("✅️");

	}
};