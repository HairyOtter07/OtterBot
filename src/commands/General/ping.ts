import { ApplyOptions } from "@sapphire/decorators";
import { Message } from "discord.js";
import { OtterCommand, OtterCommandOptions } from "../../lib/structures/OtterCommand";

@ApplyOptions<OtterCommandOptions>({
    name: 'ping',
    description: "Pings the bot",
    detailedDescription: "Shows the bot's latency, calculated as the time between your command and the bot's response",
    examples: ["ping"],
    syntax: "ping"
})
export default class extends OtterCommand {
    public async messageRun(message: Message) {
        const msg = await message.reply({ content: "Pong!" });
        msg.edit({ content: `Pong! (${msg.createdTimestamp - message.createdTimestamp} ms)` });
    }
};