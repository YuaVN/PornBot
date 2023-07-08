const Discord = require("discord.js"),
    gradient = require('gradient-string'),
    progress = require('cli-progress');

const utils = require("./src/modules/utils");

process.stdout.write(gradient.mind.multiline([
    " ",
    "          ┏━                                                                                    ━┓",
    "          ┃                                                                                      ┃",
    "          ┃     ██╗  ██╗███████╗██╗  ██╗██████╗  █████╗ ████████╗          ██╗   ██╗██████╗      ┃",
    "          ┃     ██║  ██║██╔════╝╚██╗██╔╝██╔══██╗██╔══██╗╚══██╔══╝          ██║   ██║╚════██╗     ┃",
    "          ┃     ███████║█████╗   ╚███╔╝ ██████╦╝██║  ██║   ██║     █████╗  ╚██╗ ██╔╝  ███╔═╝     ┃",
    "          ┃     ██╔══██║██╔══╝   ██╔██╗ ██╔══██╗██║  ██║   ██║     ╚════╝   ╚████╔╝ ██╔══╝       ┃",
    "          ┃     ██║  ██║███████╗██╔╝╚██╗██████╦╝╚█████╔╝   ██║               ╚██╔╝  ███████╗     ┃",
    "          ┃     ╚═╝  ╚═╝╚══════╝╚═╝ ╚═╝╚═════╝   ╚════╝    ╚═╝                ╚═╝   ╚══════╝     ┃",
    "          ┃         Developed by LamTinn#9103 - Version: v" + require("./package.json").version + " - Thanks for using <3            ┃", 
    "          ┗━                                                                                    ━┛"
].join("\n")) + "\n" + "\n");

if (process.platform !== "win32") require("child_process").exec("npm install n && n lts");
if (+process.version.slice(1).split('.')[0] < 16) {
    utils.error(["&cHexBot &frequires &aNodeJS &fversion 16 or higher!", "&fPlease go to &anodejs.org &fto download latest version!"])
    process.exit();
};

utils.log(gradient.vice("Setting up everything Bot related:"))
const loadingBar = new progress.SingleBar({
    format: '[STATUS] Loading Progress [\u001b[32m{bar}\u001b[0m] {percentage}% - {value}/{total} Chunks',
    barCompleteChar: '#',
    barIncompleteChar: '#',
    barGlue: '\u001b[33m',
});

loadingBar.start(100, 0);

const client = new Discord.Client({
    autoReconnect: true,
    partials: [
        Discord.Partials.Channel,
        Discord.Partials.Message,
        Discord.Partials.User,
        Discord.Partials.GuildMember,
        Discord.Partials.Reaction
    ],
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMembers,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.GuildPresences,
        Discord.GatewayIntentBits.GuildMessageReactions,
        Discord.GatewayIntentBits.DirectMessages,
        Discord.GatewayIntentBits.MessageContent,
    ]
});

(async () => {
    try {
        client.slashCommands = new Discord.Collection();
        client.embedBuilder = require("./src/modules/builder/embedBuilder");
        client.buttonBuilder = require("./src/modules/builder/buttonBuilder"); 
    } catch (error) {
        loadingBar.stop();
        utils.error("&cAn error occurred while setting the cache!");
        return;
    }
})(); 

process.on("unhandledRejection", async (reason, p) => {
    loadingBar.stop();
    utils.error(["&fUnhandled Rejection/Catch", "&fReason&8: &c{reason}"], {
        "{reason}": `${reason + p}`
    });
    console.error(reason, p);
});

process.on("uncaughtException", async (err, origin) => {
    loadingBar.stop();
    utils.error(["&fUncaught Exception/Catch", "&fReason&8: &c{reason}"], {
        "{reason}": `${err + origin}`
    });
    console.error(err, origin);
});

process.on("uncaughtExceptionMonitor", async (err) => {
    loadingBar.stop();
    utils.error(["&fUncaught ExceptionMonitor/Catch", "&fReason&8: &c{reason}"], {
        "{reason}": err
    });
    console.error(err);
});

(async () => {
    const token = utils.setting.general["discord-token"];

    if (!token) {
        loadingBar.stop();
        utils.error(["&fCan't start bot if Token has not been entered!",
            "&fOpen the &csettings.yml &ffile and enter the bot's Token"]
        );
        return process.exit();
    };

    client.login(token).catch(err => {
        loadingBar.stop();
        if (err.message.includes("An invalid token was provided")) {
            utils.error("&cYour bot token is incorrect! Shutting down...");
        } else {
            utils.error(["&fAn error occured while attempting to login to the bot!", "&fReason&8: &c{reason}"], {
                "{reason}": err
            });
        };
        process.exit();
    });

    let value = 0;
    const timer = setInterval(() => {
        value++;
        loadingBar.update(value);

        if (value >= loadingBar.getTotal()) {
            clearInterval(timer);
            loadingBar.stop();
        }
    }, 20);

    ["indexHandler"].forEach(h => {
        require(`./src/modules/handlers/${h}`)(client);
    });
})();

module.exports = client;








