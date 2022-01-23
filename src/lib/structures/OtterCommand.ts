import { Command, CommandOptions, PieceContext, Store } from "@sapphire/framework";
import { CategoryOption } from "../util/constants";

export abstract class OtterCommand extends Command {
    public store!: Store<OtterCommand>;

    public examples: string[];
    public syntax: string;
    public fullName: string;

    public constructor(context: PieceContext, options: OtterCommandOptions) {
        super(context, options);

        const { examples, syntax } = options;
        this.examples = examples;
        this.syntax = syntax;

        this.fullName = this.category + "/" + this.name;
    }
}

export interface OtterCommandOptions extends CommandOptions {
    examples: string[];
    syntax: string;
}