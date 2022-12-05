require("dotenv").config();
const { Client, GatewayIntentBits, Events } = require("discord.js");
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

client.on(Events.ClientReady, () => {
  console.log("I am ready!");
})