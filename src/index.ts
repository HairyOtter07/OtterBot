import { LogLevel } from "@sapphire/framework";
import { Intents } from "discord.js";

import OtterClient from "./lib/structures/OtterClient";

import dotenv from "dotenv"; dotenv.config();

const client = new OtterClient({
    intents: [ 
        Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.DIRECT_MESSAGES
    ],
    defaultPrefix: "ob?",
    regexPrefix: /^(hey +)?otterbot[,! ]/i,
    logger: {
        level: LogLevel.Debug
    }
});

client.login(process.env.TOKEN);