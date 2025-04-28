import clsx, { type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import moment from "moment"

/**
 * Generates a random string of the specified length.
 * @param length The length of the random string to generate.
 * @returns The randomly generated string.
 */
export const generateRandomStr = (length: number) => {
  return [...Array(length)]
    .map(() => ((Math.random() * 36) | 0).toString(36))
    .join('')
}

/**
 * Combines multiple class names into a single string.
 *
 * @param inputs - The class names to combine.
 * @returns The combined class names as a string.
 */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

/**
 * 
 * @returns The current date and time in the format 'YYYY-MM-DD HH:mm:ss'.
 */
export const getCurrentDateTime = () => {
  let isoDatetime = new Date().toISOString()
  let datetime = moment(isoDatetime).format('YYYY-MM-DD HH:mm:ss')

  return datetime
}

/**
 * Capitalizes the first letter of a string.
 * @param str - The input string.
 * @returns The input string with the first letter capitalized.
 */
export const capitalizeFirstLetter = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()