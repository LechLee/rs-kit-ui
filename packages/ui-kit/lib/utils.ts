/**
 * @component Utils
 * @version 1.0.0
 * @lastModified 2025-06-20
 * @description Utils component for the UI library
 * @status stable
 */

import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}
