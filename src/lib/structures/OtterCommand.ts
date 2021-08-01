import { Command, CommandOptions, PieceContext, Store } from "@sapphire/framework";
import { CategoryOption } from "../util/constants";

export abstract class OtterCommand extends Command {
    public store!: Store<OtterCommand>;

    public category: CategoryOption;

    public constructor(context: PieceContext, options: OtterCommandOptions) {
        super(context, options);

        const { category } = options;
        this.category = category;
    }
}

export interface OtterCommandOptions extends CommandOptions {
    category: CategoryOption;
}