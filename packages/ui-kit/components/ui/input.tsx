import * as React from 'react'

import { cn } from '@/lib/utils'

interface InputProps extends React.ComponentProps<'input'> {
	error?: boolean
	errorMessage?: string
	displayError?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, error, errorMessage, displayError = true, ...props }, ref) => {
	const hasValue = props.value && String(props.value).length > 0
	const isError = error || !!errorMessage || props['aria-invalid'] === 'true' || props['aria-invalid'] === true

	return (
		<div className="w-full">
			<input
				type={type}
				className={cn(
					'w-full bg-white rounded-[10px] text-neutral-800 text-base font-normal border transition-colors',
					'h-10 pl-4 pr-3 py-1.5',
					isError
						? 'border-error-1 focus:border-error-1 focus:ring-1 focus:ring-error-1 focus:outline-none'
						: hasValue
						? 'border-gray-500 focus:border-[#e20079] focus:ring-1 focus:ring-[#e20079] focus:outline-none'
						: 'border-gray-300 focus:border-[#e20079] focus:ring-1 focus:ring-[#e20079] focus:outline-none',
					'file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground',
					'placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
					className
				)}
				ref={ref}
				{...props}
			/>
			{isError && displayError && errorMessage && (
				<p className="text-error-1 text-sm mt-1">{errorMessage}</p>
			)}
		</div>
	)
})
Input.displayName = 'Input'

export { Input }
