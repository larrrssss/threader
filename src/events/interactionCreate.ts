import { ChannelType, Interaction, TextBasedChannel } from 'discord.js';

import db from '../lib/db';

export default async (interaction: Interaction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'keep-open') {
    const channel = interaction.channel as TextBasedChannel;
    if (![ChannelType.PublicThread, ChannelType.PrivateThread].includes(channel.type)) 
      return interaction.reply({
        ephemeral: true,
        content: '❌ You can use this command only in thread channels',
      });

    const keepingOpen = await db.channel.findUnique({
      where: { channel_id: channel.id },
    }).catch(() => null);

    if (keepingOpen)
      await db.channel.delete({
        where: { channel_id: channel.id },
      });
    else
      await db.channel.create({
        data: {
          guild_id: interaction.guildId as string,
          channel_id: channel.id,
        },
      });
    
    interaction.reply({
      ephemeral: true,
      content: keepingOpen
        ? '✅ This channel will **no** longer be opened automatically once it is archived'
        : '✅ This channel will be opened automatically once it is archived',
    });
  }
};