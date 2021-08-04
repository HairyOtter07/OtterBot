import type { ClientEnv } from "./ClientEnv";

declare global {
    namespace NodeJS {
        interface ProcessEnv extends ClientEnv {}
    }
}