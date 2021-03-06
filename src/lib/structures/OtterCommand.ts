import { Command, CommandOptions, CommandStore, PieceContext, Store } from "@sapphire/framework";

export abstract class OtterCommand extends Command {
    public store!: Store<OtterCommand>;
    public baseStore: CommandStore;

    public examples: string[];
    public syntax: string;
    public fullName: string;

    public constructor(context: PieceContext, options: OtterCommandOptions) {
        super(context, options);

        const { examples, syntax } = options;
        this.examples = examples;
        this.syntax = syntax;

        this.fullName = this.fullCategory.join("/") + "/" + this.name;

        this.baseStore = this.container.stores.get("commands");
    }
}

export interface OtterCommandOptions extends CommandOptions {
    examples: string[];
    syntax: string;
}