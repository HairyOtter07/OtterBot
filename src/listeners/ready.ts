import { ApplyOptions } from "@sapphire/decorators";
import { ListenerOptions, Events, Listener } from "@sapphire/framework";

@ApplyOptions<ListenerOptions>({
    event: Events.ClientReady,
})
export default class extends Listener {
    public async run() {
        const client = this.container.client;
        client.user?.setActivity({
            name: "In Development",
            type: "PLAYING",
        });
        this.container.logger.info(`[INFO] Logged in as ${client.user?.tag}`);
    }
};