import { CategoryOption } from "./constants"

export const isValidCategory = (category: string): category is CategoryOption => {
    return ["General"].includes(category); // didn't want to repeat but can't find another way ¯\_(ツ)_/¯
}