import { ApplyOptions } from "@sapphire/decorators";
import { Args } from "@sapphire/framework";
import { Message, MessageEmbed } from "discord.js";
import { OtterCommand, OtterCommandOptions } from "../../lib/structures/OtterCommand";
import { CategoryOption, categoryOptions } from "../../lib/util/constants";

@ApplyOptions<OtterCommandOptions>({
    name: "help",
    description: "Shows the various commands of this bot",
    detailedDescription: "Lists categories, or shows help on a specific category or command",
    options: ["command", "cmd", "category", "cat"],
    examples: ["help", "help --category=General", "help --cat=General --cmd=help", "help --cat=General --command=ping"],
    syntax: "help [--category|--cat] [--command|--cmd]"
})
export default class extends OtterCommand {
    public async messageRun(message: Message, args: Args) {
        const client = this.container.client;
        const commandOpt = args.getOptions('command', 'cmd');
        const categoryOpt = args.getOptions('category', 'cat');

        if (commandOpt && commandOpt.length > 1) {
            message.reply(`Please specify either \`command\` or \`cmd\`, not both.`);
            return
        } else if (categoryOpt && categoryOpt.length > 1) {
            message.reply(`Please specify \`category\` or \`cat\`, not both.`);
            return
        } else if (commandOpt && !categoryOpt) {
            message.reply(`Please specify the category of \`${commandOpt[0]}\``);
            return
        }
        
        const commandStore = this.store;
        if (commandOpt && categoryOpt) {
            const command = commandOpt[0];
            const category = categoryOpt[0];
            if (this.container.stores.get("commands").categories.includes(category)) {
                const commandObj = commandStore.find((value) => (value.name == command || value.aliases.includes(command)) && value.category == category);
                if (commandObj) {
                    const cmdEmbed = new MessageEmbed({
                        title: `${client.user?.username} Help`,
                        description: `\`${commandObj.fullName}\``,
                        fields: [
                            {
                                name: "Description",
                                value: commandObj.detailedDescription
                            },
                            {
                                name: "Syntax",
                                value: `\`${client.fetchPrefix(message)}${commandObj.syntax}\``
                            },
                            {
                                name: "Examples",
                                value: "```\n" + client.fetchPrefix(message) + commandObj.examples.join(`\n${client.fetchPrefix(message)}`) + "\n```"
                            }
                        ]
                    });

                    message.reply({ embeds: [cmdEmbed] });
                
                } else {
                    message.reply(`Command Not Found: \`${category}/${command}\``);
                }
            } else {
                message.reply(`Category Not Found: \`${category}\``)
            }
        } else if (categoryOpt) {
            const category = categoryOpt[0];
            if (this.container.stores.get("commands").categories.includes(category)) {
                const commands = commandStore.filter((value) => value.category == category);
                const catEmbed = new MessageEmbed({
                    title: `${client.user?.username} Help`,
                    description: `Commands in category \`${category}\``
                });
                commands.each(command => {
                    catEmbed.addField(command.name, command.description);
                });
                message.reply({ embeds: [catEmbed ]});
            } else {
                message.reply(`Category Not Found: \`${category}\``);
            }
        } else {
            const categories = categoryOptions as ReadonlyArray<string>;
            const helpEmbed = new MessageEmbed({
                title: `${client.user?.username} Help`,
                description: `Categories:\n\`${categories.join("`\n`")}\``,
                fields: [
                    {
                        name: "Syntax Key",
                        value: "`<--name>`: required option or flag\n`[--name]`: optional option or flag\n`|` (pipe): 'or'"
                    }, 
                    {
                        name: "Getting Help",
                        value: `Use \`${client.fetchPrefix(message)}help --cat=General --cmd=help\` to learn how to use this command`
                    },
                ]
            });
            message.reply({ embeds: [helpEmbed] });
        }
    }
}