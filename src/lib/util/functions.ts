import { DateTime } from "luxon";

export const formatTimestamp = (timestamp: Date): string => {
    return DateTime.fromJSDate(timestamp).toLocaleString(DateTime.DATE_HUGE);
}