import { SapphireClient } from "@sapphire/framework";
import type { ClientOptions } from "discord.js";

export default class OtterClient extends SapphireClient {
    public constructor(options: ClientOptions) {
        super(options);
    }
}