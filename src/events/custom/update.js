const Discord = require("discord.js");

const utils = require("../../modules/utils");

module.exports = {
    name: Discord.Events.ClientReady,
    /**
     * @param {Discord.Client} client 
     */
    execute: async (client) => {
        const file = utils.setting.general.update["file-name"];
        var param = !file ? "proxies.txt" : file;

        const update = () => {
            utils.updateProxy(param, "", 0);

            let autoUpdate_embed = client.embedBuilder("auto-update", {
                "{client_id}": client.user?.id == null ? utils.setting.general["client-id"] : client.user.id,
                "{file_name}": param,
                "{update_time}": Math.round(utils.setting.general.update.time / 60),
                "{proxies}": utils.existsFile(param) ? `${utils.format(utils.getLine(param))}` : `None`,
            });

            let guildId = utils.setting.general["guild-id"];
            utils.getChannel(client.guilds.cache.get(guildId), utils.setting.general.channels["update-room"]).forEach(c => {
                c.send({ embeds: [autoUpdate_embed] });
            });
        };

        if (utils.setting.general.update["update-on-startup"]) update();

        if (utils.setting.general.update["auto-update"]) {
            let time = utils.setting.general.update.time;
            setInterval(update, time * 1000);
        }
    },
}