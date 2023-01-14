const Discord = require('discord.js');
const config = require('./config');
const fs = require('node:fs');
const { readdirSync } = require('node:fs');
const { Client, Collection, EmbedBuilder, GatewayIntentBits } = require("discord.js");
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildIntegrations
    ]
});

module.exports = client;

client.slashCommands = new Collection();

/* Log publico/public */
 client.logsbot = async function({ Member, Bot }, interaction){
  let canal = "CHANNEL_ID";
  let lgsB = interaction.guild.channels.cache.get(canal);
	
  const LogsB = new EmbedBuilder()
  .setColor('Random')
  .addFields(
   { name: 'Desarrollador', value: `${Member.user.tag} - ${Member.id}` },
   { name: 'Hace', value: `<t:${parseInt(interaction.createdTimestamp / 1000)}:R>` },
   { name: 'Bot Id', value: `${Bot}` }
  )
  .setAuthor({ name: `¡Nuevo bot en estado de revisión!`, iconURL: interaction.guild.iconURL({ dynamic: true }).toString() })
  .setThumbnail(Member.user.displayAvatarURL({ dynamic: 'true', extension: 'png' }))
	 
  lgsB.send({ embeds: [LogsB] })
}

/* Log privado 🔏 */
client.logsMod = async function({ MemberM, PrefixM, InviteM, Id, DescM, BotM }, interaction){
  
  let psc = "CHANNEL_ID";
  let cann = interaction.guild.channels.cache.get(psc);
	
  const LogsM = new EmbedBuilder()
  .setAuthor({ name: interaction.guild.name.toString(), iconURL: interaction.guild.iconURL({dynamic: true, extension: "png"}) })
	.setThumbnail(interaction.guild.iconURL({dynamic: true, extension: "png"}))
	.addFields(
   { name: 'Desarrollador', value: `${MemberM.user.tag} - ${MemberM.id}` },
   { name: 'Bot Id', value: `${BotM}` },
   { name: 'Invitación', value: `${InviteM}` },
   { name: 'Descripción', value: `${DescM || "this.error" }` }
  )
  .setColor('Random')
	
  cann.send({ content: "MENTION", embeds: [LogsM] })
}

/* Bot approved */
 client.approve = async function({ Member, Bot }, interaction){
  let cba = "CHANNEL_ID";
  let lgsApr = interaction.guild.channels.cache.get(cba);
	 
  const approvedB = new EmbedBuilder()
  .setColor('Green')
  .addFields(
   { name: 'Desarrollador', value: `${Member.tag} - ${Member.id}` },
   { name: 'Hace', value: `<t:${parseInt(interaction.createdTimestamp / 1000)}:R>` },
   { name: 'Bot Id', value: `${Bot}` }
  )
  .setAuthor({ name: `¡Nuevo bot aceptado!`,  iconURL: interaction.guild.iconURL({ dynamic: true, extension: "png" }).toString() })
  .setThumbnail(Member.displayAvatarURL({dynamic: 'true', extension: 'png'}))
  
  lgsApr.send({ content: `<@${Member.id}>`, embeds: [approvedB] })
}

/* Bot Deny */
client.deny = async function({ Member, Bot }, interaction){
  let cbd = "CHANNEL_ID";
  let lgsD = interaction.guild.channels.cache.get(cbd);
	
  const denyB = new EmbedBuilder()
  .setColor('Red')
  .addFields(
   { name: 'Desarrollador', value: `${Member.tag} - ${Member.id}` },
   { name: 'Hace', value: `<t:${parseInt(interaction.createdTimestamp / 1000)}:R>` },
   { name: 'Bot Id', value: `${Bot}` }
  )
  .setAuthor({ name: "¡Bot denegado!",  iconURL: message.guild.iconURL({ dynamic: true, extension: "png" }).toString()
  })
  .setThumbnail(Member.displayAvatarURL({dynamic: 'true', extension: 'png'}))
  
  lgsD.send({ content: `<@${Member.id}>`, embeds: [denyB] })
}

/* Slash command Handler */
for (const subFolder of readdirSync(`${__dirname}/slashCommands/`)) {
    for (const fileName of readdirSync(`${__dirname}/slashCommands/${subFolder}/`)) {
        let file = require(`${__dirname}/slashCommands/${subFolder}/${fileName}`);
       client.slashCommands.set(file.name, file);
    }
	}

client.login(config.token);
