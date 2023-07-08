const Discord = require("discord.js");

const utils = require("../../modules/utils");

module.exports = {
    name: Discord.Events.InteractionCreate,
    /**
     * @param {Discord.Client} client 
     * @param {Discord.Interaction} interaction
     */
    execute: async (interaction, client) => { 
        if (interaction.type === Discord.InteractionType.ApplicationCommand) {
            const cmd = client.slashCommands.get(interaction.commandName);
            let errorCmd_embed = client.embedBuilder("error-cmd");

            if (!cmd) {
                return interaction.reply({
                    embeds: [errorCmd_embed],
                    ephemeral: true
                });
            };

            if (![interaction.channel.id].some(c => utils.setting.general.channels["white-list-room"].includes(c))) {
                let invalidChannel_embed = client.embedBuilder("invalid-channel", {
                    "{allowed_channels}": `${utils.setting.general.channels["white-list-room"].map((v) => `<#${v}>`).join(",")}`
                });

                return interaction.reply({
                    embeds: [invalidChannel_embed],
                    ephemeral: true
                });
            };

            if (cmd?.settings) {
                let cmdDisabled_embed = client.embedBuilder("cmd-disabled");
                let noPerm_embed = client.embedBuilder("no-perm");

                if (!cmd.settings?.enabled) {
                    await interaction.reply({
                        embeds: [cmdDisabled_embed],
                        ephemeral: true
                    });
                    return;
                }


                if (cmd.settings?.roles.length != 0) {
                    if (!utils.hasRole(cmd.settings?.roles, interaction.member)) {
                        await interaction.reply({
                            embeds: [noPerm_embed],
                            ephemeral: true,
                        });
                        return;
                    }
                }

                if (cmd.settings?.users.length != 0) {
                    if (!cmd.settings?.users.includes(interaction.user.id)) {
                        await interaction.reply({
                            embeds: [noPerm_embed],
                            ephemeral: true,
                        });
                        return;
                    }
                }
            }

            try {
                await cmd.execute(client, interaction);
            } catch (error) {
                utils.logger.error(["&fAn error occurred with the &c{cmd_name} &fcommand!", "&fReason&8: &c{reason}"], {
                    "{cmd_name}": interaction.commandName,
                    "{reason}": String(error.stack ? error.stack : error)
                });
            }
        } else if (interaction.type === Discord.InteractionType.ApplicationCommandAutocomplete) {
            const cmd = client.slashCommands.get(interaction.commandName);

            try {
                await cmd.autocomplete(client, interaction);
            } catch (error) {
                console.error(error);
            }
        }
    },
}