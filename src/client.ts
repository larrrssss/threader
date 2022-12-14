import { Client } from 'discord.js';

import { interactionCreate, threadUpdate } from './events';

const client = new Client({
  intents: ['Guilds'],
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user?.tag}`);
});

client.on('interactionCreate', interactionCreate);
client.on('threadUpdate', threadUpdate);

export default client;