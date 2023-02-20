const { Client, Collection, EmbedBuilder, GatewayIntentBits } = require("discord.js");
const { readdirSync } = require('node:fs');
const config = require('./config.json');
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildBans,
		GatewayIntentBits.GuildEmojisAndStickers,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.DirectMessageReactions,
		GatewayIntentBits.MessageContent,
	]
});

module.exports = client;

client.slashCommands = new Collection();

/* Log publico/public */
client.logsbot = async function({ Member, Bot }, interaction) {
	let channel_1 = config.CHANNEL_1;
	let lgsB = interaction.guild.channels.cache.get(channel_1);

	const LogsB = new EmbedBuilder()
		.setColor('Random')
		.addFields(
			{ name: 'Desarrollador', value: `${Member.user.tag} - ${Member.id}` },
			{ name: 'Hace', value: `<t:${parseInt(interaction.createdTimestamp / 1000)}:R>` },
			{ name: 'Bot Id', value: `${Bot}` }
		)
		.setAuthor({ name: `¡Nuevo bot en estado de revisión!`, iconURL: interaction.guild.iconURL({ dynamic: true, extension: "png" }) })
		.setThumbnail(Member.user.displayAvatarURL({ dynamic: 'true', extension: 'png' }))

	lgsB.send({ embeds: [LogsB] })
}

/* Log privado 🔏 */
client.logsMod = async function({ MemberM, PrefixM, InviteM, Id, DescM, BotM }, interaction) {

	let channel_2 = config.CHANNEL_2;
	let cann = interaction.guild.channels.cache.get(channel_2);

	const LogsM = new EmbedBuilder()
		.setAuthor({ name: interaction.guild.name.toString(), iconURL: interaction.guild.iconURL({ dynamic: true, extension: "png" }) })
		.setThumbnail(interaction.guild.iconURL({ dynamic: true, extension: "png" }))
		.addFields(
			{ name: 'Desarrollador', value: `${MemberM.user.tag} - ${MemberM.id}` },
			{ name: 'Bot Id', value: `${BotM}` },
			{ name: 'Invitación', value: `${InviteM}` },
			{ name: 'Descripción', value: `${DescM || "this.error"}` }
		)
		.setColor('Random')

	cann.send({ content: "MENTION", embeds: [LogsM] })
}

/* Bot approved */
client.approve = async function({ Member, Bot }, interaction) {
	let channel_3 = config.CHANNEL_3;
	let lgsApr = interaction.guild.channels.cache.get(channel_3);

	const approvedB = new EmbedBuilder()
		.setColor('Green')
		.addFields(
			{ name: 'Desarrollador', value: `${Member.tag} - ${Member.id}` },
			{ name: 'Hace', value: `<t:${parseInt(interaction.createdTimestamp / 1000)}:R>` },
			{ name: 'Bot Id', value: `${Bot}` }
		)
		.setAuthor({ name: `¡Nuevo bot aceptado!`, iconURL: interaction.guild.iconURL({ dynamic: true, extension: "png" }) })
		.setThumbnail(Member.displayAvatarURL({ dynamic: 'true', extension: 'png' }))

	lgsApr.send({ content: `<@${Member.id}>`, embeds: [approvedB] })
}

/* Bot Deny */
client.deny = async function({ Member, Bot }, interaction) {
	let channel_4 = config.CHANNEL_4;
	let lgsD = interaction.guild.channels.cache.get(channel_4);

	const denyB = new EmbedBuilder()
		.setColor('Red')
		.addFields(
			{ name: 'Desarrollador', value: `${Member.tag} - ${Member.id}` },
			{ name: 'Hace', value: `<t:${parseInt(interaction.createdTimestamp / 1000)}:R>` },
			{ name: 'Bot Id', value: `${Bot}` }
		)
		.setAuthor({
			name: "¡Bot denegado!", iconURL: interaction.guild.iconURL({ dynamic: true, extension: "png" })
		})
		.setThumbnail(Member.displayAvatarURL({ dynamic: 'true', extension: 'png' }))

	lgsD.send({ content: `<@${Member.id}>`, embeds: [denyB] })
}

/* Slash command Handler */
for (const subFolder of readdirSync(`${__dirname}/slashCommands/`)) {
	for (const fileName of readdirSync(`${__dirname}/slashCommands/${subFolder}/`)) {
		let file = require(`${__dirname}/slashCommands/${subFolder}/${fileName}`);
		client.slashCommands.set(file.name, file);
	}
}
/* Event Handler */
for (const fileName of readdirSync(`${__dirname}/eventos/`)) {
	let file = require(`${__dirname}/eventos/${fileName}`);
	let eventEmiter = file.emiter;

	client[eventEmiter](file.name, file.run.bind(null, client));
}

client.login(config.BOT_TOKEN);
