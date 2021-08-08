import { container, SapphireClient, Store } from "@sapphire/framework";
import type { ClientOptions } from "discord.js";

export default class OtterClient extends SapphireClient {
    public constructor(options: ClientOptions) {
        super(options);

        Store.defaultStrategy.onLoad = (store, piece) => container.logger.info(`[INFO] Loading ${store.name}:${piece.name}`);
    }
}