const { ApplicationCommandType, ApplicationCommandOptionType, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
	name: "agregar",
	description: "🧢 - Agrega tu bot al servidor.",
	options: [
		{
			name: "bot",
			description: "🧢 - Agrega tu bot al servidor.",
			type: ApplicationCommandOptionType.Subcommand
		},
	],
	run: async (client, interaction) => {

		const modalAddbot = new ModalBuilder()
			.setCustomId('modalAddbot')
			.setTitle('* Agrega información de tu bot');

		const prefixInput = new TextInputBuilder()
			.setCustomId('prefixInput')
			.setLabel("Prefix:")
			.setPlaceholder('Ej: !')
			.setMaxLength(10)
			.setMinLength(1)
			.setRequired(true)
			.setStyle(TextInputStyle.Short);

		const descriptionInput = new TextInputBuilder()
			.setCustomId('descriptionInput')
			.setLabel("\"Pequeña\" descripción:")
			.setPlaceholder('Ej: {bot} es un bot multiuso con funciones como {funciones}.')
			.setMaxLength(150)
			.setMinLength(10)
			.setRequired(true)
			.setStyle(TextInputStyle.Paragraph);

		const inviteInput = new TextInputBuilder()
			.setCustomId('inviteInput')
			.setLabel("Invitación del bot:")
			.setPlaceholder('Ej: {linkBot}')
			.setMaxLength(170)
			.setMinLength(13)
			.setRequired(true)
			.setStyle(TextInputStyle.Paragraph);

		const idInput = new TextInputBuilder()
			.setCustomId('idInput')
			.setLabel("ID del bot:")
			.setPlaceholder('Ej: 0123456789101112')
			.setMaxLength(60)
			.setMinLength(9)
			.setRequired(true)
			.setStyle(TextInputStyle.Short);

		const actionRowFir = new ActionRowBuilder().addComponents(prefixInput);
		const actionRowSec = new ActionRowBuilder().addComponents(descriptionInput);
		const actionRowTer = new ActionRowBuilder().addComponents(inviteInput);
		const actionRowCua = new ActionRowBuilder().addComponents(idInput);

		modalAddbot.addComponents(actionRowFir, actionRowSec, actionRowTer, actionRowCua);
		await interaction.showModal(modalAddbot);

		client.on('interactionCreate', async interaction => {
			if (interaction.isModalSubmit()) {
				await interaction.deferReply()
				if (interaction.customId === 'modalAddbot') {

					const PrefixText = interaction.fields.getTextInputValue('prefixInput');
					const DescriptionText = interaction.fields.getTextInputValue('descriptionInput');
					const InviteText = interaction.fields.getTextInputValue('inviteInput');
					const IdText = interaction.fields.getTextInputValue('idInput');

					try {
						await interaction.followUp({ content: 'Tu bot ha sido agregado, espera pacientemente la revisión de los testers. (Habilitá tu dm para que te mande un mensaje)', ephemeral: false });
					} catch (err) { }

					client.logsbot({ Member: interaction.member, Bot: IdText }, interaction)
					client.logsMod({ MemberM: interaction.member, PrefixM: PrefixText, InviteM: InviteText, DescM: DescriptionText, BotM: IdText }, interaction)
				}
			}
		})
	}
};