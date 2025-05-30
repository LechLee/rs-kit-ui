'use client'

import * as React from 'react'
import { addDays, format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { DateRange } from 'react-day-picker'

import { Button, Calendar, Popover, PopoverContent, PopoverTrigger, cn } from '@rs-kit/ui-kit'
import { ComponentDoc } from '@/components/ComponentDoc'

export default function DatePickerDemo() {
	return (
		<ComponentDoc
			title="Date Picker"
			description="A date picker component that allows users to select a date or a range of dates."
			component={
				<div className="flex flex-col items-start gap-4 md:flex-row">
					<DatePickerSimple />
					<DatePickerWithRange />
				</div>
			}
		/>
	)
}

function DatePickerSimple() {
	const [date, setDate] = React.useState<Date>()

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant={'outline'} className={cn('min-w-[200px] justify-start px-2 font-normal', !date && 'text-muted-foreground')}>
					<CalendarIcon />
					{date ? format(date, 'PPP') : <span>Pick a date</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0" align="start">
				<Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
			</PopoverContent>
		</Popover>
	)
}

function DatePickerWithRange() {
	const [date, setDate] = React.useState<DateRange | undefined>({
		from: new Date(new Date().getFullYear(), 0, 20),
		to: addDays(new Date(new Date().getFullYear(), 0, 20), 20)
	})

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button id="date" variant={'outline'} className={cn('w-fit justify-start px-2 font-normal', !date && 'text-muted-foreground')}>
					<CalendarIcon />
					{date?.from ? (
						date.to ? (
							<>
								{format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
							</>
						) : (
							format(date.from, 'LLL dd, y')
						)
					) : (
						<span>Pick a date</span>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0" align="start">
				<Calendar initialFocus mode="range" defaultMonth={date?.from} selected={date} onSelect={setDate} numberOfMonths={2} />
			</PopoverContent>
		</Popover>
	)
}
