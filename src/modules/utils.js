const Discord = require("discord.js");

const fs = require("fs"),
    yaml = require("js-yaml"),
    URL = require("url").URL,
    axios = require("axios");

const { translateColors } = require("./extra/consoleColor");
 
require('console-stamp')(console, {
    label: true,
    format: ':date(dd/mm/yyyy HH:MM:ss) :label',
    colors: {
        stamp: 'gray'
    }
});

const m = loadYaml("methods"),
    s = loadYaml("settings");

module.exports = {
    setting: loadYaml("settings"),
    embed: loadYaml("embeds"),
    button: loadYaml("buttons"),
    method: loadYaml("methods"),
    /**
     * @param {string} msg 
     * @param {object} replaceOptions 
     */
    log: (msg, replaceOptions = {}) => {
        const hexbot_0x34e55b = hexbot_0x4df6; (function (_0x419ffc, _0x174400) { const _0x31042c = hexbot_0x4df6, _0x396660 = _0x419ffc(); while (!![]) { try { const _0x5ba618 = parseInt(_0x31042c(0x172)) / 0x1 * (-parseInt(_0x31042c(0x16e)) / 0x2) + -parseInt(_0x31042c(0x170)) / 0x3 + parseInt(_0x31042c(0x174)) / 0x4 + parseInt(_0x31042c(0x175)) / 0x5 + -parseInt(_0x31042c(0x173)) / 0x6 + parseInt(_0x31042c(0x176)) / 0x7 * (parseInt(_0x31042c(0x16a)) / 0x8) + -parseInt(_0x31042c(0x16c)) / 0x9 * (-parseInt(_0x31042c(0x169)) / 0xa); if (_0x5ba618 === _0x174400) break; else _0x396660['push'](_0x396660['shift']()); } catch (_0x457c25) { _0x396660['push'](_0x396660['shift']()); } } }(hexbot_0x23a8, 0xa3a33)); function hexbot_0x23a8() { const _0x501bd3 = ['20696NYHFzG', 'isArray', '2098893ojPTZL', 'join', '19vnpCKP', '888024MLcVWj', '4042788nYMLYh', '954930prRzeR', '3326071XmSSxq', 'keys', '100Slcjln', '8OpeOKC', 'replace', '33903EetoXC', 'log']; hexbot_0x23a8 = function () { return _0x501bd3; }; return hexbot_0x23a8(); } const filter = new RegExp(Object[hexbot_0x34e55b(0x168)](replaceOptions)[hexbot_0x34e55b(0x171)]('|'), 'gi'); if (Array[hexbot_0x34e55b(0x16f)](msg)) msg['forEach'](_0x16be07 => { const _0x4e4dce = hexbot_0x34e55b; if (Object[_0x4e4dce(0x168)](replaceOptions) != 0x0) { const _0xb111b5 = _0x16be07[_0x4e4dce(0x16b)](filter, _0x12cf2a => { return replaceOptions[_0x12cf2a]; }); return console['log'](translateColors(_0xb111b5)); } else { if (Object[_0x4e4dce(0x168)](replaceOptions) == 0x0) return console[_0x4e4dce(0x16d)](translateColors(_0x16be07)); }; }); else { if (Object['keys'](replaceOptions) != 0x0) { const replaceMsg = msg[hexbot_0x34e55b(0x16b)](filter, _0x10e1b5 => { return replaceOptions[_0x10e1b5]; }); return console[hexbot_0x34e55b(0x16d)](translateColors(replaceMsg)); } else { if (Object[hexbot_0x34e55b(0x168)](replaceOptions) == 0x0) return console['log'](translateColors(msg)); }; } function hexbot_0x4df6(_0x1d9cfe, _0x5d322d) { const _0x23a8db = hexbot_0x23a8(); return hexbot_0x4df6 = function (_0x4df614, _0x1a49af) { _0x4df614 = _0x4df614 - 0x168; let _0x1adc46 = _0x23a8db[_0x4df614]; return _0x1adc46; }, hexbot_0x4df6(_0x1d9cfe, _0x5d322d); };
    },
    warn: (msg, replaceOptions = {}) => {
        function hexbot_0x1988() { const _0x5ce1a6 = ['keys', '196392MmzlmX', '7053186UGqGaS', 'forEach', '136TcEhon', 'replace', '92kAdFKt', 'warn', '1399914lskxfa', '1664258syWybk', '6888995BIUhbb', '398800WrbnyV', 'join', '2422341LRaRmV']; hexbot_0x1988 = function () { return _0x5ce1a6; }; return hexbot_0x1988(); } const hexbot_0x57ec7d = hexbot_0x2747; (function (_0x48c1b0, _0x35dc30) { const _0x42789b = hexbot_0x2747, _0x3649da = _0x48c1b0(); while (!![]) { try { const _0xcaa23 = parseInt(_0x42789b(0x173)) / 0x1 + parseInt(_0x42789b(0x171)) / 0x2 + -parseInt(_0x42789b(0x177)) / 0x3 * (-parseInt(_0x42789b(0x16e)) / 0x4) + parseInt(_0x42789b(0x172)) / 0x5 + parseInt(_0x42789b(0x170)) / 0x6 + parseInt(_0x42789b(0x178)) / 0x7 + parseInt(_0x42789b(0x17a)) / 0x8 * (-parseInt(_0x42789b(0x175)) / 0x9); if (_0xcaa23 === _0x35dc30) break; else _0x3649da['push'](_0x3649da['shift']()); } catch (_0x37d9b7) { _0x3649da['push'](_0x3649da['shift']()); } } }(hexbot_0x1988, 0xbe608)); function hexbot_0x2747(_0xd4936a, _0xe5dfe2) { const _0x198838 = hexbot_0x1988(); return hexbot_0x2747 = function (_0x2747a0, _0x227e0b) { _0x2747a0 = _0x2747a0 - 0x16d; let _0x1dfe1b = _0x198838[_0x2747a0]; return _0x1dfe1b; }, hexbot_0x2747(_0xd4936a, _0xe5dfe2); } const filter = new RegExp(Object[hexbot_0x57ec7d(0x176)](replaceOptions)[hexbot_0x57ec7d(0x174)]('|'), 'gi'); if (Array['isArray'](msg)) msg[hexbot_0x57ec7d(0x179)](_0x958e8a => { const _0x32b6d3 = hexbot_0x57ec7d; if (Object[_0x32b6d3(0x176)](replaceOptions) != 0x0) { const _0x57064f = _0x958e8a[_0x32b6d3(0x16d)](filter, _0x8d5987 => { return replaceOptions[_0x8d5987]; }); return console[_0x32b6d3(0x16f)](translateColors(_0x57064f)); } else return console[_0x32b6d3(0x16f)](translateColors(_0x958e8a));; }); else { if (Object['keys'](replaceOptions) != 0x0) { const replaceMsg = msg['replace'](filter, _0x19b713 => { return replaceOptions[_0x19b713]; }); return console[hexbot_0x57ec7d(0x16f)](translateColors(replaceMsg)); } else { if (Object[hexbot_0x57ec7d(0x176)](replaceOptions) == 0x0) return console[hexbot_0x57ec7d(0x16f)](translateColors(msg)); }; };
    },
    error: (msg, replaceOptions = {}) => {
        function hexbot_0x5e1a(_0x5c181b, _0x25868a) { const _0x2e8e7e = hexbot_0x2e8e(); return hexbot_0x5e1a = function (_0x5e1adc, _0x613c54) { _0x5e1adc = _0x5e1adc - 0x1ee; let _0x282b5d = _0x2e8e7e[_0x5e1adc]; return _0x282b5d; }, hexbot_0x5e1a(_0x5c181b, _0x25868a); } const hexbot_0x2b32e5 = hexbot_0x5e1a; (function (_0x411123, _0x3074e6) { const _0x5ae4c7 = hexbot_0x5e1a, _0x2c2028 = _0x411123(); while (!![]) { try { const _0x246a02 = parseInt(_0x5ae4c7(0x1f4)) / 0x1 * (parseInt(_0x5ae4c7(0x1f9)) / 0x2) + -parseInt(_0x5ae4c7(0x1f2)) / 0x3 + parseInt(_0x5ae4c7(0x1f7)) / 0x4 + parseInt(_0x5ae4c7(0x1f3)) / 0x5 * (parseInt(_0x5ae4c7(0x1ee)) / 0x6) + -parseInt(_0x5ae4c7(0x1fc)) / 0x7 + parseInt(_0x5ae4c7(0x1f5)) / 0x8 + -parseInt(_0x5ae4c7(0x1f1)) / 0x9 * (parseInt(_0x5ae4c7(0x1ef)) / 0xa); if (_0x246a02 === _0x3074e6) break; else _0x2c2028['push'](_0x2c2028['shift']()); } catch (_0x3b3bcb) { _0x2c2028['push'](_0x2c2028['shift']()); } } }(hexbot_0x2e8e, 0x605b3)); const filter = new RegExp(Object['keys'](replaceOptions)[hexbot_0x2b32e5(0x1fa)]('|'), 'gi'); function hexbot_0x2e8e() { const _0x4e8ef9 = ['forEach', '898583QXfNck', '110832DXKtnW', '194760ZNCRQE', 'replace', '234EfVAjS', '1643010XBgnSA', '135dMemTF', '29881EpyYud', '3771872NfOWoX', 'error', '1590780gtaAsn', 'keys', '14CPPlfj', 'join']; hexbot_0x2e8e = function () { return _0x4e8ef9; }; return hexbot_0x2e8e(); } if (Array['isArray'](msg)) msg[hexbot_0x2b32e5(0x1fb)](_0x8c11d6 => { const _0x490fe1 = hexbot_0x2b32e5; if (Object[_0x490fe1(0x1f8)](replaceOptions) != 0x0) { const _0x595852 = _0x8c11d6[_0x490fe1(0x1f0)](filter, _0x278a33 => { return replaceOptions[_0x278a33]; }); return console['error'](translateColors(_0x595852)); } else { if (Object[_0x490fe1(0x1f8)](replaceOptions) == 0x0) return console[_0x490fe1(0x1f6)](translateColors(_0x8c11d6)); }; }); else { if (Object[hexbot_0x2b32e5(0x1f8)](replaceOptions) != 0x0) { const replaceMsg = msg['replace'](filter, _0x21d36c => { return replaceOptions[_0x21d36c]; }); return console[hexbot_0x2b32e5(0x1f6)](translateColors(replaceMsg)); } else { if (Object[hexbot_0x2b32e5(0x1f8)](replaceOptions) == 0x0) return console['error'](translateColors(msg)); }; };
    },
    parsing: (variables, replaceOptions = {}) => {
        const hexbot_0xd8a5bf = hexbot_0x1d3c; (function (_0x1d9ceb, _0x4cd5b5) { const _0x3ac544 = hexbot_0x1d3c, _0x31efaa = _0x1d9ceb(); while (!![]) { try { const _0x3ece61 = -parseInt(_0x3ac544(0x1a8)) / 0x1 + -parseInt(_0x3ac544(0x19f)) / 0x2 * (-parseInt(_0x3ac544(0x19d)) / 0x3) + parseInt(_0x3ac544(0x1aa)) / 0x4 * (-parseInt(_0x3ac544(0x1a3)) / 0x5) + -parseInt(_0x3ac544(0x19c)) / 0x6 * (parseInt(_0x3ac544(0x1a4)) / 0x7) + parseInt(_0x3ac544(0x19b)) / 0x8 * (parseInt(_0x3ac544(0x19e)) / 0x9) + parseInt(_0x3ac544(0x1a1)) / 0xa + parseInt(_0x3ac544(0x1a9)) / 0xb * (parseInt(_0x3ac544(0x1a5)) / 0xc); if (_0x3ece61 === _0x4cd5b5) break; else _0x31efaa['push'](_0x31efaa['shift']()); } catch (_0x184200) { _0x31efaa['push'](_0x31efaa['shift']()); } } }(hexbot_0x8a39, 0xb2a06)); const filter = new RegExp(Object[hexbot_0xd8a5bf(0x1a6)](replaceOptions)['join']('|'), 'gi'); function hexbot_0x1d3c(_0x3cacb3, _0x1cc108) { const _0x8a39db = hexbot_0x8a39(); return hexbot_0x1d3c = function (_0x1d3c2c, _0x27c60d) { _0x1d3c2c = _0x1d3c2c - 0x19b; let _0x5dd3cf = _0x8a39db[_0x1d3c2c]; return _0x5dd3cf; }, hexbot_0x1d3c(_0x3cacb3, _0x1cc108); } if (Array[hexbot_0xd8a5bf(0x1a0)](variables)) { let returnVar = []; return variables['forEach'](_0x180d23 => { const _0x2f6613 = hexbot_0xd8a5bf; if (Object[_0x2f6613(0x1a6)](replaceOptions) != 0x0) { const _0xdcb9e0 = _0x180d23[_0x2f6613(0x1a2)](filter, _0x2a94d3 => { return replaceOptions[_0x2a94d3]; }); returnVar[_0x2f6613(0x1a7)](_0xdcb9e0); } else Object[_0x2f6613(0x1a6)](replaceOptions) == 0x0 && returnVar['push'](_0x180d23);; }), returnVar; } else { if (Object[hexbot_0xd8a5bf(0x1a6)](replaceOptions) != 0x0) { const replaceVar = variables[hexbot_0xd8a5bf(0x1a2)](filter, _0x4b6fe0 => { return replaceOptions[_0x4b6fe0]; }); return replaceVar; } else return variables;; }; function hexbot_0x8a39() { const _0x25ebcc = ['17208MrXLfA', '6dsIHuk', '507dbGfeg', '1062wmYdBD', '14846TUauZu', 'isArray', '5617850pPYhem', 'replace', '85jQvIgN', '1913471UHVUCE', '12SHcqbX', 'keys', 'push', '1003601krozbB', '6373037UnfNRC', '150788yjNOMW']; hexbot_0x8a39 = function () { return _0x25ebcc; }; return hexbot_0x8a39(); }
    },
    /**
     * @param {string} roles 
     * @param {Discord.GuildMember} member 
     */
    hasRole: (roles, member) => {
        if (roles?.length == 0) return true;
        let hasRole = true;

        if (Array.isArray(roles)) {
            roles.forEach(r => {
                if (!member.roles.cache.has(r)) hasRole = false;
            });
        } else {
            if (!member.roles.cache.has(roles)) hasRole = false;
        };

        return hasRole;
    },
    /**
     * @param {string} roles 
     * @param {Discord.GuildMember} member 
     */
    hasOneRole: (roles, member) => {
        if (roles?.length == 0) return true;
        let hasRole = false;

        if (Array.isArray(roles)) { 
            roles.forEach(r => {
                if (member.roles.cache.has(r)) hasRole = true;
            });
        } else {
            if (member.roles.cache.has(roles)) hasRole = true;
        }

        return hasRole;
    },
    getVersionArr: () => {
        let arr = [];

        for (let v of m["version-code"]) {
            arr.push(v.version);
        }

        return arr;
    },
    getMethodArr: () => {
        let arr = [];

        for (let me of m["methods"]) {
            arr.push(me.name);
        }

        return arr;
    },
    /**
     * @param {string} name 
     */
    getVerisonByName: (name) => {
        const r = m["version-code"].find(v => v.version == name);
        return r == undefined ? null : r;
    },
    /**
     * @param {string} name 
     */
    getMethodByName: (name) => {
        const r = m["methods"].find(m => m.name == name);
        return r == undefined ? null : r;
    },
    /**
     * @param {string} id 
     */
    getMethodByID: (id) => {
        const r = m["methods"].find(m => m.id == id);
        return r == undefined ? null : r;
    },
    /**
     * @param {string} value 
     */
    getVersionByValue: (value) => {
        const r = m["version-code"].find(v => v.value == value);
        return r == undefined ? null : r;
    },
    /**
     * @param {Discord.Guild} guild 
     * @param {string} channelId 
     */
    getChannel: (guild, channelId) => { 
        const channels = new Array();
        
        if (Array.isArray(channelId)) {
            for (let c of channelId) { 
                const getChannel = guild.channels.cache.get(c);
                channels.push(getChannel);
            }
        } else {
            const getChannel = guild.channels.cache.get(channelId);
            channels.push(getChannel);
        }

        return channels;
    },
    /**
     * @param {string} s 
     */
    validUrl: (s) => {
        try {
            new URL(s);
            return Boolean(true);
        } catch (err) {
            return Boolean(false);
        };
    },
    /**
     * @param {string} name 
     * @param {string} url 
     * @param {number} mode 
     */
    updateProxy: (name, url, mode) => {
        switch (mode) {
            case 1:
                https.get(url, (res) => {
                    const writeStream = fs.createWriteStream(name);
                    res.pipe(writeStream);

                    writeStream.on("finish", () => {
                        writeStream.close();
                    });
                });
                break;
            case 0:
                let proxyUrl = s.general.update.url;
                
                (async () => {
                    proxyUrl.forEach(p => {
                        axios({
                            method: "GET",
                            url: p,
                            headers: {
                                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
                            },
                        }).then((result) => {
                            getData(result.data);
                        })
                            .catch(err => console.log(err));
                    });
                })();
                break;
        };

        const getData = async (data) => {
            let proxyData = [];
            proxyData.push(data);

            for (let p of proxyData) {
                if (!fs.existsSync(name)) {
                    fs.appendFileSync(name, p, (err) => {
                        if (err) throw err;
                    });
                } else {
                    fs.unlinkSync(name);
                    setTimeout(() => {
                        fs.appendFileSync(name, p,
                            (err) => {
                                if (err) throw err;
                            });
                    }, 1000)
                };
            }
        };
    },
    /**
     * @param {string} name 
     */
    existsFile: (name) => {
        return fs.existsSync(name);
    },
    /**
     * @param {string} name 
     */
    getLine: (name) => {
        var line = fs.readFileSync(name, "utf8");
        return line.split(/\r\n|\r|\n/).length;
    },
    /**
     * @param {number} name 
     */
    format: (num) => {
        const n = String(num),
            p = n.indexOf('.');
        
        return n.replace(
            /\d(?=(?:\d{3})+(?:\.|$))/g,
            (m, i) => p < 0 || i < p ? `${m},` : m
        );
    },
    /**
     * @param {string} url
     */
    sendRequest: async (url) => {
        return new Promise(async (resolve, reject) => {
            await axios.get(url)
                .then((response) => {
                    resolve(response.data);
                }).catch(error => {
                    reject(error);
                });
        });
    },
};

/**
 * @param {string} fileName 
 */
function loadYaml(fileName) {
    return yaml.load(fs.readFileSync("./configs/" + fileName + ".yml", "utf8") );
}