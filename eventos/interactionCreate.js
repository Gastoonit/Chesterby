const client = require('../index.js');

client.on("interactionCreate", async (interaction) => {

  if (interaction.isChatInputCommand()) {
  
  const command = client.slashCommands.get(interaction.commandName);
	if(!command) return interaction.reply("Ha ocurrido un error.")
  
  if(!interaction.member.permissions.has(command.permissions || [])) return interaction.reply({ content: "<:tick_err:887739719247626380> No tienes permisos para usar el comando." })
		
  command.run(client, interaction)
  
  }
});
