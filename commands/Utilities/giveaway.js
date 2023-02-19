const discord = require('discord.js');
const ms = require('ms');

exports.run = async (Client, message, args) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return channel.reply("Vous n'êtes pas autorisé à utiliser cette commande!");

    if(!args[0]) return message.channel.send(`**Combien de temps le giveaway doit-il durer?**`)
    
    if(!args[0].endsWith("s")&&!args[0].endsWith("h")&&!args[0].endsWith("d")&&!args[0].endsWith("m")) return message.channel.send(`**Combien de temps le giveaway doit-il durer ? Réponder en mettant votre nombre suivie de : s (secondes), h (heure), d (jour)**`)
    
    if(isNaN(args[0][0])) return message.channel.send(`**Combien de temps le giveaway doit-il durer?**`)

    let winnerCount = args[1]
    
    let prize = args.slice(2).join(" ")
    
    if(!args[1]) return message.channel.send(`**Combien de personnes peuvent gagner ?**`)
    
    if(!args[2]) return message.channel.send(`**Quel est le prix pour le giveaway?**`)
    
    message.delete()
    
    var botEmbed = new discord.MessageEmbed()
     .setTitle("🎉 **GIVEAWAY** 🎉")
     .setDescription(`
     Réagissez avec 🎉 pour participer!
     **Prix du Giveaway a Gagner: **${prize}
     **Gagnant du Giveaway: **${winnerCount}
     **Fin du Giveay: **${args[0]}
     **Giveaway Organisé Par: **${message.author}`)
     .setTimestamp(`Se termine le ${Date.now()+ms(args[0])}`)
     .setColor("#4D0348")
     
    var msg = await message.channel.send(botEmbed)
    
    msg.react('🎉')

    setTimeout(function () {

        var random = 0;
        var winners = [];
        var inList = false;
    
        var peopleReacted = msg.reactions.cache.get("🎉").users.cache.array();

        for (let i = 0; i < peopleReacted.length; i++) {

            if(peopleReacted[i].id == Client.user.id){
                peopleReacted.splice(i,1);
                continue;
            }
        }

        if(peopleReacted.length == 0) {
            var non = new discord.MessageEmbed()
             .setColor("#4D0348")
             .setTitle("🎉 **Fin du GIVEAWAY** 🎉")
             .setDescription(`Il n'y a pas de gagnants, car personne n'a participé!
             
              **Giveaway Organisé Par: **${message.author}`)
            msg.edit(non)

            return message.channel.send(`Il n'y a pas de gagnants, car personne n'a participe! :(\n${msg.url}`)
        }

        if(peopleReacted.length < winnerCount) {
            var non = new discord.MessageEmbed()
            .setColor("#4D0348")
            .setTitle("🎉 **Fin du GIVEAWAY** 🎉")
            .setDescription(`Il n'y a pas de gagnants, car personne n'a participé!
            
             **Giveaway Organisé Par: **${message.author}`)
           msg.edit(non)

           return message.channel.send(`Il n'y a pas de gagnants, car personne n'a participe! :(\n${msg.url}`)
        }

        // choosing someone randomly 
        for (let y = 0; y < winnerCount; y++) {

            inList = false;

            random = Math.floor(Math.random() * peopleReacted.length);

            for (let o = 0; o < winners.length; o++) {

                if(winners[o] == peopleReacted[random]){
                    inList = true;
                    y--;
                    break;
                }
            }

            if(!inList){
                winners.push(peopleReacted[random]);
            }
        }

        var response = ``

        for (let y = 0; y < winners.length; y++) {

            response += `${winners[y]}\n`

            var embed = new discord.MessageEmbed()
             .setColor("#4D0348")
             .setTitle("🎉 **FIN DU GIVEAWAY** 🎉")
             .setDescription(`---------------------------------
             **${prize}**
             **Gagnant:**
             ${response}
             **Giveaway Heberger par: ** ${message.author}`)
            msg.edit(embed)
    
            message.channel.send(`**Félicitation** \n${response} **!** \n**Tu vient de gagner le giveaway donc tu remporte se magnifique cadeau :** \n**${prize}** **!**\n${msg.url}`) 
        }
        
       }, ms(args[0]));
}

    exports.help = {
        name: "giveaway",
        aliases: ['give']
    }

    exports.requirements = {
        botOwner: false,
        botPerms: [],
        userPerms: []
    }
