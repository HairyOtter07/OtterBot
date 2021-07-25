import { ApplyOptions } from "@sapphire/decorators";
import { Command, CommandOptions } from "@sapphire/framework";
import { Message } from "discord.js";

@ApplyOptions<CommandOptions>({
    name: 'ping',
    description: "Shows the bot's latency"
})
export default class extends Command {
    public async run(message: Message) {
        const msg = await message.reply({ content: "Pong!" });
        msg.edit({ content: `Pong! (${msg.createdTimestamp - message.createdTimestamp} ms)` });
    }
};