const Discord = require('discord.js');
const { ApplicationCommandOptionType } = require('discord.js');
const config = require('../../config.json');

module.exports = {
    name: "denegar-bot",
    description: "❗️ - Rechaza un bot.",
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
        name: "razón",
        description: "Ingresa la razón.",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
    run: async (client, interaction) => {

  if(!interaction.member.roles.cache.has(config.ROLE_ID)) return interaction.followUp({ content: `No tienes permisos para usar este comando.`, ephemeral: true })
  const member = interaction.options.getUser('miembro');
  const bot = interaction.options.getString('bot');
  const razón = interaction.options.getString('razón');
  
  await member.send(`${member.tag} Su bot ha sido rechazado en **That**.\n\nRazón: ${razón || 'N/A' }`).catch((err) => {});
  
  interaction.reply({ content: "Todo ha salido correctamente.", ephemeral: true })
  
  client.deny({
    Member: member,
    Bot: bot,
  }, interaction)

 }
};
