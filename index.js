require("dotenv").config();
const { Client, GatewayIntentBits, Events, ApplicationCommandType, ApplicationCommandOptionType } = require("discord.js");
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});
const { ChatGPT } = require("chatgpt-lib");
const chatgpt = new ChatGPT({
  SessionToken: process.env.SESSION_TOKEN,
});

client.on(Events.ClientReady, () => {
  console.log("I am ready!");
  client.application.commands.set([
    {
      type: ApplicationCommandType.ChatInput,
      name: "ask",
      description: "Ask a question to the bot",
      options: [
        {
          type: ApplicationCommandOptionType.String,
          name: "question",
          description: "The question you want to ask",
          required: true,
        },
      ],
    },
    {
      type: ApplicationCommandType.Message,
      name: "Ask ChatGPT",
      channel
    }
  ])
});

client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) return;
  if (message.channel.topic?.includes("ChatGPT")) {
    if (message.content.startsWith("#")) return;
    if (message.content === "clear") {

    }
    const thinking = await message.channel.send("Thinking...");
    const response = await chatgpt.ask(message.content);
    thinking.edit(response);
  }
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.isCommand()) {
    if (interaction.commandName === "ask") {
      await interaction.deferReply();
      const question = interaction.options.getString("question");
      const response = await chatgpt.ask(question);
      interaction.followUp(response);
    }
  } else if (interaction.isMessageComponent()) {
    if (interaction.customId === "ask") {
      await interaction.deferReply();
      const response = await chatgpt.ask(interaction.message.content);
      interaction.followUp(response);
    }
  }
});

client.login();