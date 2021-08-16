import { DateTime } from "luxon";
import { CategoryOption, categoryOptions } from "./constants"

export const isValidCategory = (category: string): category is CategoryOption => {
    return (categoryOptions as ReadonlyArray<string>).includes(category);
}

export const formatTimestamp = (timestamp: Date): string => {
    return DateTime.fromJSDate(timestamp).toLocaleString(DateTime.DATE_HUGE);
}