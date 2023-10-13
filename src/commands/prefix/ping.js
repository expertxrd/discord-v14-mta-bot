const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const config = require("../../config.js")

module.exports = {
    name: "ping",
    aliases: ["ping"],
    cooldown: 5000,//1 saniye = 1000 ms / cooldown olmasını istemezseniz 0 yazın.
    run: async (client, message, args) => {

      if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
          message.reply({ content: `\`Missing Permissions\`` }).then((e) =>
              setTimeout(() => {
                  e.delete();
              }, 5000)
          );
          return;
      }
         
      await message.reply({ content: `Pong!` })
    }
 };

  