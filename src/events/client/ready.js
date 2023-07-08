const Discord = require("discord.js"),
    ms = require("ms"),
    { DownloaderHelper } = require('node-downloader-helper'),
    gradient = require('gradient-string'),
    progress = require('cli-progress');
const { truncateSync } = require("fs");

const utils = require("../../modules/utils");

const pkg = require("./../../../package.json"),
    { byteHelper } = require('./../../../node_modules/node-downloader-helper/bin/helpers');

module.exports = {
    name: Discord.Events.ClientReady,
    /**
     * @param {Discord.Client} client 
     */
    execute: async (client) => {
        let startTime = new Date();
        const activityType = {
            "COMPETING": 5,
            "LISTENING": 2,
            "PLAYING": 0,
            "STREAMING": 1,
            "WATCHING": 3
        };

        const status = utils.setting.general.activity["status"];
        ranMsg = utils.setting.general.activity["random-messages"];

        if (utils.setting.general.activity["random-status"] == false) {
            const main = async () => {
                client.user.setPresence({
                    activities: [{
                        name: utils.parsing(utils.setting.general.activity.message[1], {
                            "{uptime}": ms(client.uptime, { long: true }),
                            "{methods}": Object.keys(utils.method["methods"]).length,
                            "{user_online}": client.guilds.cache.get(utils.setting.general["guild-id"]).members.cache.filter(m => m.presence.status != "offline").size(),
                        }),
                        type: activityType[utils.setting.general.activity.message[0].trim()],
                    }],
                    status: status,
                });
            };
            main();
            setInterval(main, 5 * 1000);
        } else {
            setInterval(() => {
                const randomActivity = ranMsg[Math.floor(Math.random() * ranMsg.length)];
                client.user.setPresence({
                    activities: [{
                        name: utils.parsing(randomActivity[1], {
                            "{uptime}": ms(client.uptime, { long: true }),
                            "{methods}": Object.keys(utils.method["methods"]).length,
                            "{user_online}": client.guilds.cache.get(utils.setting.general["guild-id"]).members.cache.filter(m => m.presence?.status != "offline").size,
                        }),
                        type: activityType[randomActivity[0]],
                    }],
                    status: status,
                });
            }, utils.setting.general.activity.changeTime * 1000);
        };

        if (utils.setting.general["auto-download-java"].enabled === true) {
            let coolGradient = gradient(['#AAFFA9', '#11FFBD']),
                hydrogen = gradient(["#06beb6", "#48b1bf"]);
            
            const dl = new DownloaderHelper(utils.setting.general["auto-download-java"].url, process.cwd(), {
                method: "GET",
                headers: {
                    'user-agent': pkg.name + '/' + pkg.version
                },
                retry: {
                    maxRetries: 3, delay: 3000
                },
                fileName: filename => `[HexBot]-${filename}`,
                override: {
                    skip: true, skipSmaller: true
                },
                forceResume: false,
                removeOnStop: true,
                removeOnFail: true,
            });

            const downloadBar = new progress.SingleBar({
                format: '[STATUS] Download Progress [{bar}] | {speed} - {downloaded}/{size}',
                barCompleteChar: '\u2588',
                barIncompleteChar: '\u2591',
            });

            dl.on('download', downloadInfo => {
                downloadBar.start(downloadInfo.totalSize, 0, {
                    speed: "N/A",
                });
            });
            dl.on('end', downloadInfo => {
                downloadBar.stop();

                utils.log(["\n", "&6ADJ &7- &fSuccessfully downloaded java file!",
                    "&6ADJ &7- &fFile Name&8: " + coolGradient(downloadInfo.fileName),
                    "&6ADJ &7- &fFile Path&8: " + coolGradient(downloadInfo.filePath.replace(`${process.cwd()}`, ".")),
                    "&6ADJ &7- &fFile Size&8: " + coolGradient(Math.round(downloadInfo.totalSize / 1024 / 1024) + " MB")
                ]);
                log(true);
            });
            dl.on('skip', skipInfo => {
                downloadBar.stop();
                log(true);

                if (!utils.setting.general["auto-download-java"]["skip-notify"]) { 
                    return;
                }
                utils.warn(["\n", "&6ADJ &7- &fA java file already exists in the directory!",
                    "&6ADJ &7- &fFile Name&8: &e" + coolGradient(skipInfo.fileName),
                    "&6ADJ &7- &fFile Path&8: &e" + coolGradient(skipInfo.filePath.replace(`${process.cwd()}`, ".")),
                    "&6ADJ &7- &fFile Size&8: &e" + coolGradient(Math.round(skipInfo.totalSize / 1024 / 1024) + " MB")
                ]);
            });
            dl.on('error', error => {
                downloadBar.stop();
                utils.error(["\n", "&6ADJ &7- &fThere was an error executing the feature!",
                    "&6ADJ &7- &fError Message&8: &c" + error.message,
                    "&6ADJ &7- &fStatus&8: &c" + error.status,
                ]);
                log(true);
            });
            dl.on('progress', stats => {
                const currentTime = new Date(),
                    elaspsedTime = currentTime - startTime;
                
                if (elaspsedTime > 1000) {
                    startTime = currentTime;
                    downloadBar.update(stats.downloaded, {
                        speed: gradient.vice("Speed: " + byteHelper(stats.speed) + "/s"),
                        downloaded: hydrogen(byteHelper(stats.downloaded)),
                        size: hydrogen(niceBytes(stats.total)),
                    });
                };
            });
            dl.start().catch(error => {
                downloadBar.stop();
                console.error(error);
            });
        } else {
            log(true);
        }

        const log = (inline) => {
            setTimeout(() => {
                var id = utils.setting.general["guild-id"];

                if (inline) process.stdout.write("\n");
                utils.log(["&fLogged in successfully as {user}", "&fThe current guild&8: {guild_name} &8({guild_id}&8)"], {
                    "{user}": gradient.cristal(client.user.tag),
                    "{guild_name}": gradient.morning(client.guilds.cache.get(id).name || "undefined"),
                    "{guild_id}": gradient.fruit(id),
                });
            }, 5000);
        };
    },
};

const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
function niceBytes(x) {
    let l = 0,
        n = parseInt(x, 10) || 0;

    while (n >= 1024 && ++l) {
        n = n / 1024;
    }
  
    return (n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
};