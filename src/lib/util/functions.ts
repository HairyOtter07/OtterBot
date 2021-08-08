import { CategoryOption, categoryOptions } from "./constants"

export const isValidCategory = (category: string): category is CategoryOption => {
    return (categoryOptions as ReadonlyArray<string>).includes(category);
}