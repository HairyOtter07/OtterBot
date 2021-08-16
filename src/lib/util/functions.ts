import { DateTime } from "luxon";
import { CategoryOption, categoryOptions } from "./constants"

export const isValidCategory = (category: string): category is CategoryOption => {
    return (categoryOptions as ReadonlyArray<string>).includes(category);
}

export const formatTimestamp = (timestamp: number): string => {
    return DateTime.fromMillis(timestamp).toLocaleString(DateTime.DATE_HUGE);
}