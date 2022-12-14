import { ThreadChannel } from 'discord.js';

import db from '../lib/db';

export default async (oldThread: ThreadChannel, newThread: ThreadChannel) => {
  if (!oldThread.archived && newThread.archived) {
    const watching = await db.channel.findUnique({
      where: { channel_id: newThread.id },
    }).catch(() => null);

    if (watching)
      await newThread.setArchived(false).catch(() => null);
  }
};