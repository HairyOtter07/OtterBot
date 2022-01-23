import { ApplyOptions } from "@sapphire/decorators";
import { Message, MessageEmbed } from "discord.js";
import { OtterCommand, OtterCommandOptions } from "../../lib/structures/OtterCommand";
import { formatTimestamp } from "../../lib/util/functions";

@ApplyOptions<OtterCommandOptions>({
    name: "server-info",
    description: "Shows information about this server",
    detailedDescription: "Show the server name, along with information about the members and channels",
    generateDashLessAliases: true,
    preconditions: ["GuildOnly"],
    category: "Information",
    examples: ["server-info"],
    syntax: "server-info"
})
export default class extends OtterCommand {
    public async messageRun(message: Message) {
        if (message.guild) {
            const guild = message.guild;
            const infoEmbed = new MessageEmbed({
                title: guild.name,
                description: "Information about this server",
                fields: [
                    {
                        name: "Created On",
                        value: `${formatTimestamp(guild.createdAt)}`
                    },
                    {
                        name: "Number of Members",
                        value: `${guild.memberCount} (${guild.members.cache.filter(member => member.user.bot).size} bots, ${guild.members.cache.filter(member => !member.user.bot).size} humans)`
                    },
                    {
                        name: "Number of Channels",
                        value: `${guild.channels.cache.filter(channel => channel.type != "GUILD_CATEGORY" && channel.type != "GUILD_NEWS_THREAD" && channel.type != "GUILD_PRIVATE_THREAD" && channel.type != "GUILD_PUBLIC_THREAD").size} (${guild.channels.cache.filter(channel => channel.type == "GUILD_STAGE_VOICE" || channel.type == "GUILD_VOICE").size} voice channels, ${guild.channels.cache.filter(channel => channel.type == "GUILD_TEXT" || channel.type == "GUILD_NEWS").size} text channels)`
                    },
                    {
                        name: "Number of Roles",
                        value: `${guild.roles.cache.size} (highest: ${guild.roles.highest.toString()})`
                    }
                ],
                thumbnail: {
                    url: guild.iconURL() ?? undefined
                }
            });
            message.reply({ embeds: [infoEmbed] });
        }
    }
}