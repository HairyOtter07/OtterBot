import { ApplyOptions } from "@sapphire/decorators";
import { Command, CommandOptions } from "@sapphire/framework";
import { Message } from "discord.js";

@ApplyOptions<CommandOptions>({
    name: 'ping',
    description: "Pings the bot",
    detailedDescription: "Shows the bot's latency, calculated as the time between your command and the bot's response"
})
export default class extends Command {
    public async run(message: Message) {
        const msg = await message.reply({ content: "Pong!" });
        msg.edit({ content: `Pong! (${msg.createdTimestamp - message.createdTimestamp} ms)` });
    }
};