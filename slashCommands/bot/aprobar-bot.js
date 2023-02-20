const Discord = require('discord.js');
const { ApplicationCommandOptionType } = require('discord.js');
const config = require('../../config.json');

module.exports = {
    name: "aprobar-bot",
    description: "✅️ - Aprueba un bot.",
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

	if(!interaction.member.roles.cache.has(config.ROLE_ID)) return interaction.reply({ content: `No tienes permisos para usar este comando.`, ephemeral: true })
  const member = interaction.options.getUser('miembro');
  const bot = interaction.options.getString('bot');
  const adicional = interaction.options.getString('adicional');
  
  await member.send(`¡${member.tag} Su bot ha sido aceptado en **That**!\n\nAdicional: ${adicional || 'No hay nada adicional.' }`).catch((err) => {});
  
  interaction.reply({ content: "Todo ha salido correctamente.", ephemeral: true })
  
  client.approve({
    Member: member,
    Bot: bot
  }, interaction)

 }
};
