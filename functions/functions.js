const Discord = require("discord.js");
const fs = require("fs");
const color = require("../Storage/color.json");

module.exports = {

    loadCommands: function(client, dirname) {
        fs.readdir(dirname, (err, files) => {
            if(err) console.error(err);
            var jsFiles = files.filter(f => f.split(".").pop() === "js");
            if(jsFiles.length <= 0){
                console.log(`Aucune commande a été trouve dans ${dirname.replace(/.\/commands\//gi, "")}`);
                return;
            }

            console.log("");
            console.log(`Commandes ${dirname.replace(/.\/commands\//gi, "")}`);
            console.log("");
            jsFiles.forEach((f, i) => {
                delete require.cache[require.resolve(`${dirname}${f}`)];
                var props = require(`${dirname}${f}`);
                console.log(`${i + 1}: Commande ${f} Charger`);
                client.commands.set(props.help.name, props);

                if(props.help.aliases) for (const alias of props.help.aliases){
                    client.aliases.set(alias, props);
                }
            })
        })
    }, 

    error: function(channel, text){
        let errorEmbed = new Discord.MessageEmbed()
        .setColor(color.red)
        .setDescription(`\\📛 **Error :** ${text}`);
        channel.send(errorEmbed).catch(e => {return console.error(e)});
    },

    success: function(channel, text){
        let successEmbed = new Discord.MessageEmbed()
        .setColor(color.green)
        .setDescription(`\\✅ **Success :** ${text}`);
        channel.send(successEmbed).catch(e => {return console.error(e)});
    }

}