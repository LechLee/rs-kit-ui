import { useState } from 'react'
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '../ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'

interface CountryCode {
	value: string
	label: string
	country: string
}

const countryCodes: CountryCode[] = [
	{
		value: '+60',
		label: '🇲🇾 +60',
		country: 'Malaysia'
	},
	{
		value: '+65',
		label: '🇸🇬 +65',
		country: 'Singapore'
	},
	{
		value: '+84',
		label: '🇻🇳 +84',
		country: 'Vietnam'
	}
]

interface MobileNumberInputProps {
	dialCode?: string
	mobileNumber?: string
	onDialCodeChange?: (value: string) => void
	onMobileNumberChange?: (value: string) => void
	placeholder?: string
	className?: string
	disabled?: boolean
	error?: boolean
	errorMessage?: string
	displayError?: boolean
	required?: boolean
	name?: string
	onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
}

export default function MobileNumberInput({
	dialCode = '+60',
	mobileNumber = '',
	onDialCodeChange,
	onMobileNumberChange,
	placeholder = 'enter your mobile number',
	className = '',
	disabled = false,
	error,
	errorMessage = '',
	displayError = true,
	required = false,
	name,
	onBlur
}: MobileNumberInputProps) {
	const [open, setOpen] = useState(false)

	const handleDialCodeSelect = (currentValue: string) => {
		onDialCodeChange?.(currentValue)
		setOpen(false)
	}

	const handleMobileNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onMobileNumberChange?.(e.target.value)
	}

	const hasValue = mobileNumber && String(mobileNumber).length > 0
	const isError = error || !!errorMessage

	return (
		<div className={cn('w-full', className)}>
			<div className="flex gap-3">
				{/* Country code dropdown */}
				<Popover open={open} onOpenChange={setOpen}>
					<PopoverTrigger asChild>
						<Button
							variant="outline"
							role="combobox"
							aria-expanded={open}
							disabled={disabled}
							className={cn(
								'h-10 min-w-[100px] justify-between bg-white rounded-[10px] text-neutral-800 text-base font-normal border transition-colors px-3',
								isError
									? 'border-error-1 focus:border-error-1 focus:ring-1 focus:ring-error-1 focus:outline-none'
									: 'border-gray-300 focus:border-[#e20079] focus:ring-1 focus:ring-[#e20079] focus:outline-none',
								'disabled:cursor-not-allowed disabled:opacity-50'
							)}
						>
							{dialCode ? countryCodes.find((code) => code.value === dialCode)?.label : 'Select code...'}
							<svg className="w-4 h-4 text-gray-500 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
							</svg>
						</Button>
					</PopoverTrigger>
					<PopoverContent className="p-0" style={{ width: '140px' }} align="start">
						<Command>
							<CommandList>
								<CommandEmpty>No country found.</CommandEmpty>
								<CommandGroup>
									{countryCodes.map((code) => (
										<CommandItem key={code.value} value={code.value} onSelect={handleDialCodeSelect}>
											<div className="py-2">{code.label}</div>
										</CommandItem>
									))}
								</CommandGroup>
							</CommandList>
						</Command>
					</PopoverContent>
				</Popover>

				{/* Phone number input */}
				<input
					type="tel"
					placeholder={placeholder}
					value={mobileNumber}
					onChange={handleMobileNumberChange}
					onBlur={onBlur}
					disabled={disabled}
					required={required}
					name={name}
					aria-invalid={isError ? 'true' : 'false'}
					className={cn(
						'flex-1 bg-white rounded-[10px] text-neutral-800 text-base font-normal border transition-colors',
						'h-10 pl-4 pr-3 py-1.5',
						isError
							? 'border-error-1 focus:border-error-1 focus:ring-1 focus:ring-error-1 focus:outline-none'
							: hasValue
							? 'border-gray-500 focus:border-[#e20079] focus:ring-1 focus:ring-[#e20079] focus:outline-none'
							: 'border-gray-300 focus:border-[#e20079] focus:ring-1 focus:ring-[#e20079] focus:outline-none',
						'placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50'
					)}
				/>
			</div>

			{/* Error message */}
			{isError && displayError && errorMessage && <p className="text-error-1 text-sm mt-1">{errorMessage}</p>}
		</div>
	)
}
