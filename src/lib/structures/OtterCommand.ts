import { Command, CommandOptions, PieceContext, Store } from "@sapphire/framework";
import { CategoryOption } from "../util/constants";

export abstract class OtterCommand extends Command {
    public store!: Store<OtterCommand>;

    public category: CategoryOption;
    public examples: string[];
    public fullName: string;

    public constructor(context: PieceContext, options: OtterCommandOptions) {
        super(context, options);

        const { category, examples } = options;
        this.category = category;
        this.examples = examples;

        this.fullName = this.category + "/" + this.name;
    }
}

export interface OtterCommandOptions extends CommandOptions {
    category: CategoryOption;
    examples: string[];
}