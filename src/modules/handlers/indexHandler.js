const Discord = require("discord.js"),
    fs = require("fs"),
    path = require("path");

const utils = require("../utils");

/**
 * @param {Discord.Client} client 
 */
module.exports = async (client) => {
    const commandArray = [];

    fs.readdirSync("./src/events/").forEach(async (dir) => {
        const events = fs.readdirSync(path.join("./src/events/", dir)).filter(f => f.endsWith(".js"));

        for (const file of events) {
            const event = require(path.resolve("src/events", dir, file));
            if (event.name) {
                client.on(event.name, (...args) => event.execute(...args, client));
                delete require.cache[require.resolve(path.resolve("src/events", dir, file))];
            } else {
                throw new Error("ailed to load event&8: " + `${file.split('.')[0]}`);
            }
        }
    });

    const cmds = fs.readdirSync("./src/commands/").filter(f => f.endsWith('.js'));

    for (let file of cmds) {
        const slashCmd = require(path.resolve("src/commands", file));

        if (!slashCmd.data?.name) return;
        if (["MESSAGE", "USER"].includes(slashCmd.type)) delete file.data?.description;

        client.slashCommands.set(slashCmd.data?.name, slashCmd);
        commandArray.push(slashCmd.data.toJSON());
    }

    client.on(Discord.Events["ClientReady"], async () => {
        var id = utils.setting.general["guild-id"];

        if (!id) {
            utils.error(["&fGuild ID in config file is missing!", "&fCouldn't find Guild-ID to set the Slash Cmds", "&fEnter your Guild-ID in &csettings.yml &fnow!"]);
            return process.exit();
        };

        await client.guilds.cache.get(id).commands.set(commandArray);
    });
};