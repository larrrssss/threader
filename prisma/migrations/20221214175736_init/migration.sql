-- CreateTable
CREATE TABLE "channels" (
    "guild_id" TEXT NOT NULL,
    "channel_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "channels_pkey" PRIMARY KEY ("channel_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "channels_channel_id_key" ON "channels"("channel_id");
