const { ActivityType, Events, ActivityPlatform } = require("discord.js")
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const exsta = require("gamedig");
const config = require("../config.js")

module.exports = {
 name: Events.ClientReady,
 once: true,
 execute(client) {
  const rest = new REST({ version: "10" }).setToken(client.token);
  setInterval(() => {
    exsta.query({

        type: 'mtasa', //GAME NAME
        host: config.serverIP, // SERVER IP
        port: "22003" // GAME's PORT

      })
    .then((state) => {
        const currentPlayers = state.raw.numplayers; // SERVER ONLINE PLAYERS COUNT
        const maxPlayers = state.maxplayers; // SERVER MAX PLAYER COUNT
        const serverPing = state.ping // SERVER PING (ms)
        const playerPercentage = ((currentPlayers / maxPlayers) * 100).toFixed(2);  // SERVER ONLINE PLAYER PERCENT (%)

        client.user.presence.set(
          { activities: 

            [{

              name: `🟢 ${currentPlayers}/${maxPlayers} (${playerPercentage}%) | Ping: ${serverPing}ms`,
              type: ActivityType.Streaming, 
              url: `https://twitch.tv/exstadev` 

            }]

          })

    }).catch(err => {
        client.log(err);
    });
}, 5000);
  
  client.log(`Logged in as ${client.user.username}.`);
  //
    try {
      rest.put(Routes.applicationCommands(client.user.id), {
      body: client.slashDatas,
    });
  } catch (error) {
    console.error(error);
  }
}};