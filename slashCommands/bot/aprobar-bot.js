const Discord = require('discord.js');
const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: "aprobar-bot",
    description: "Aprueba un bot.",
    // permissions: ["ADMINISTRATOR"],
    options: [
      {
        name: "miembro",
        description: "Menciona a un miembro.",
        type: ApplicationCommandOptionType.User,
        required: true,
      },
      {
        name: "bot",
        description: "Id del bot.",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: "adicional",
        description: "Ingresa algo adicional.",
        type: ApplicationCommandOptionType.String,
        required: false,
      },
    ],
    run: async (client, interaction) => {

	if(!interaction.member.roles.cache.has("ROLE_ID")) return interaction.followUp({ content: `<:tick_err:887739719247626380> No tienes permisos para usar este comando.`, ephemeral: true })
  var member = interaction.options.getUser('miembro');
  var bot = interaction.options.getString('bot');
  var adicional = interaction.options.getString('adicional');
  
  await member.send(`¡${member.tag} Su bot ha sido aceptado en **That**!\n\nAdicional: ${adicional || 'No hay nada adicional.' }`).catch((err) => {});
  
  interaction.reply({ content: "Todo ha salido correctamente.", ephemeral: true })
  
  client.approve({
    Member: member,
    Bot: bot
  }, interaction)

 }
};
