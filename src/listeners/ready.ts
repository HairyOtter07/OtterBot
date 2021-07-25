import { ApplyOptions } from "@sapphire/decorators";
import { EventOptions, Events, Listener } from "@sapphire/framework";

@ApplyOptions<EventOptions>({
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