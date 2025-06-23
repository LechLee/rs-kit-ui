'use client'

import { Fragment, useState } from 'react'
import { addDays, format, subDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, isSameDay, isAfter, isBefore } from 'date-fns'
import {
	CalendarIcon,
	ClockIcon,
	CalendarDaysIcon,
	CalendarRangeIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	ClockIconIcon,
	HistoryIcon,
	TrendingUpIcon,
	FilterIcon,
	XIcon,
	CheckIcon,
	SettingsIcon,
	BookOpenIcon
} from 'lucide-react'
import { DateRange } from 'react-day-picker'

import {
	Button,
	Calendar,
	Popover,
	PopoverContent,
	PopoverTrigger,
	cn,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Badge,
	Switch,
	Label,
	Separator,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Input
} from '@rs-kit/ui-kit'
import { ComponentDoc } from '@/components/ComponentDoc'

// Sample data for different date picker scenarios
const appointmentSlots = [
	{ time: '09:00', available: true },
	{ time: '10:00', available: true },
	{ time: '11:00', available: false },
	{ time: '12:00', available: true },
	{ time: '14:00', available: true },
	{ time: '15:00', available: false },
	{ time: '16:00', available: true },
	{ time: '17:00', available: true }
]

const quickDatePresets = [
	{ label: 'Today', getValue: () => new Date() },
	{ label: 'Tomorrow', getValue: () => addDays(new Date(), 1) },
	{ label: 'In 3 days', getValue: () => addDays(new Date(), 3) },
	{ label: 'Next week', getValue: () => addDays(new Date(), 7) },
	{ label: 'In 2 weeks', getValue: () => addDays(new Date(), 14) },
	{ label: 'Next month', getValue: () => addDays(new Date(), 30) }
]

const dateRangePresets = [
	{
		label: 'Today',
		getValue: () => ({ from: new Date(), to: new Date() })
	},
	{
		label: 'Yesterday',
		getValue: () => {
			const yesterday = subDays(new Date(), 1)
			return { from: yesterday, to: yesterday }
		}
	},
	{
		label: 'Last 7 days',
		getValue: () => ({ from: subDays(new Date(), 6), to: new Date() })
	},
	{
		label: 'Last 30 days',
		getValue: () => ({ from: subDays(new Date(), 29), to: new Date() })
	},
	{
		label: 'This week',
		getValue: () => ({ from: startOfWeek(new Date()), to: endOfWeek(new Date()) })
	},
	{
		label: 'This month',
		getValue: () => ({ from: startOfMonth(new Date()), to: endOfMonth(new Date()) })
	}
]

// Simple Date Picker
const SimpleDatePicker = () => {
	const [date, setDate] = useState<Date>()
	const [showPresets, setShowPresets] = useState(true)

	return (
		<div className="space-y-4">
			<div className="flex items-center gap-2">
				<Switch id="show-presets" checked={showPresets} onCheckedChange={setShowPresets} />
				<Label htmlFor="show-presets" className="text-sm">Show quick presets</Label>
			</div>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						className={cn(
							'w-full justify-start text-left font-normal',
							!date && 'text-muted-foreground'
						)}
					>
						<CalendarIcon className="mr-2 h-4 w-4" />
						{date ? format(date, 'PPP') : <span>Pick a date</span>}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0" align="start">
					{showPresets && (
						<div className="border-b p-3">
							<h4 className="font-medium text-sm mb-2">Quick select</h4>
							<div className="grid grid-cols-2 gap-2">
								{quickDatePresets.map((preset) => (
									<Button
										key={preset.label}
										variant="ghost"
										size="sm"
										className="justify-start text-xs"
										onClick={() => setDate(preset.getValue())}
									>
										{preset.label}
									</Button>
								))}
							</div>
						</div>
					)}
					<Calendar
						mode="single"
						selected={date}
						onSelect={setDate}
						initialFocus
					/>
				</PopoverContent>
			</Popover>
			{date && (
				<div className="p-3 bg-gray-50 rounded-lg text-sm">
					<p><strong>Selected:</strong> {format(date, 'EEEE, MMMM do, yyyy')}</p>
					<p><strong>Relative:</strong> {isSameDay(date, new Date()) ? 'Today' : format(date, 'MMM do')}</p>
				</div>
			)}
		</div>
	)
}

// Date Range Picker
const DateRangePicker = () => {
	const [date, setDate] = useState<DateRange | undefined>({
		from: subDays(new Date(), 7),
		to: new Date()
	})
	const [showPresets, setShowPresets] = useState(true)

	const daysDifference = date?.from && date?.to 
		? Math.ceil((date.to.getTime() - date.from.getTime()) / (1000 * 60 * 60 * 24)) + 1
		: 0

	return (
		<div className="space-y-4">
			<div className="flex items-center gap-2">
				<Switch id="range-presets" checked={showPresets} onCheckedChange={setShowPresets} />
				<Label htmlFor="range-presets" className="text-sm">Show quick ranges</Label>
			</div>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						className={cn(
							'w-full justify-start text-left font-normal',
							!date && 'text-muted-foreground'
						)}
					>
						<CalendarRangeIcon className="mr-2 h-4 w-4" />
						{date?.from ? (
							date.to ? (
								<>
									{format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
								</>
							) : (
								format(date.from, 'LLL dd, y')
							)
						) : (
							<span>Pick a date range</span>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0" align="start">
					{showPresets && (
						<div className="border-b p-3">
							<h4 className="font-medium text-sm mb-2">Quick ranges</h4>
							<div className="grid grid-cols-2 gap-2">
								{dateRangePresets.map((preset) => (
									<Button
										key={preset.label}
										variant="ghost"
										size="sm"
										className="justify-start text-xs"
										onClick={() => setDate(preset.getValue())}
									>
										{preset.label}
									</Button>
								))}
							</div>
						</div>
					)}
					<Calendar
						initialFocus
						mode="range"
						defaultMonth={date?.from}
						selected={date}
						onSelect={setDate}
						numberOfMonths={2}
					/>
				</PopoverContent>
			</Popover>
			{date?.from && date?.to && (
				<div className="p-3 bg-gray-50 rounded-lg text-sm space-y-1">
					<p><strong>From:</strong> {format(date.from, 'EEEE, MMMM do, yyyy')}</p>
					<p><strong>To:</strong> {format(date.to, 'EEEE, MMMM do, yyyy')}</p>
					<p><strong>Duration:</strong> {daysDifference} day{daysDifference !== 1 ? 's' : ''}</p>
				</div>
			)}
		</div>
	)
}

// Appointment Scheduler
const AppointmentScheduler = () => {
	const [selectedDate, setSelectedDate] = useState<Date>()
	const [selectedTime, setSelectedTime] = useState<string>()
	const [appointmentType, setAppointmentType] = useState('consultation')

	const isDateDisabled = (date: Date) => {
		const day = date.getDay()
		return day === 0 || day === 6 || isBefore(date, new Date())
	}

	const handleDateSelect = (date: Date | undefined) => {
		setSelectedDate(date)
		setSelectedTime(undefined) // Reset time when date changes
	}

	return (
		<div className="space-y-4">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div>
					<Label className="text-sm font-medium mb-2 block">Select Date</Label>
					<Popover>
						<PopoverTrigger asChild>
							<Button
								variant="outline"
								className={cn(
									'w-full justify-start text-left font-normal',
									!selectedDate && 'text-muted-foreground'
								)}
							>
								<CalendarIcon className="mr-2 h-4 w-4" />
								{selectedDate ? format(selectedDate, 'PPP') : <span>Choose appointment date</span>}
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-0" align="start">
							<Calendar
								mode="single"
								selected={selectedDate}
								onSelect={handleDateSelect}
								disabled={isDateDisabled}
								initialFocus
							/>
						</PopoverContent>
					</Popover>
				</div>

				<div>
					<Label className="text-sm font-medium mb-2 block">Appointment Type</Label>
					<Select value={appointmentType} onValueChange={setAppointmentType}>
						<SelectTrigger>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="consultation">Consultation (30 min)</SelectItem>
							<SelectItem value="checkup">Check-up (15 min)</SelectItem>
							<SelectItem value="procedure">Procedure (60 min)</SelectItem>
							<SelectItem value="followup">Follow-up (20 min)</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>

			{selectedDate && (
				<div>
					<Label className="text-sm font-medium mb-2 block">Available Times</Label>
					<div className="grid grid-cols-4 gap-2">
						{appointmentSlots.map((slot) => (
							<Button
								key={slot.time}
								variant={selectedTime === slot.time ? 'default' : 'outline'}
								size="sm"
								disabled={!slot.available}
								onClick={() => setSelectedTime(slot.time)}
								className="flex items-center gap-2"
							>
								<ClockIcon className="w-3 h-3" />
								{slot.time}
							</Button>
						))}
					</div>
				</div>
			)}

			{selectedDate && selectedTime && (
				<div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
					<h4 className="font-medium text-blue-900 mb-2">Appointment Summary</h4>
					<div className="text-sm text-blue-800 space-y-1">
						<p><strong>Date:</strong> {format(selectedDate, 'EEEE, MMMM do, yyyy')}</p>
						<p><strong>Time:</strong> {selectedTime}</p>
						<p><strong>Type:</strong> {appointmentType.charAt(0).toUpperCase() + appointmentType.slice(1)}</p>
					</div>
					<Button size="sm" className="mt-3">
						<CheckIcon className="w-4 h-4 mr-2" />
						Confirm Appointment
					</Button>
				</div>
			)}
		</div>
	)
}

// Event Planner
const EventPlanner = () => {
	const [eventDates, setEventDates] = useState<Date[]>([])
	const [eventName, setEventName] = useState('')
	const [selectedDate, setSelectedDate] = useState<Date>()

	const addEventDate = (date: Date | undefined) => {
		if (date && !eventDates.some(d => isSameDay(d, date))) {
			setEventDates([...eventDates, date])
			setSelectedDate(undefined)
		}
	}

	const removeEventDate = (dateToRemove: Date) => {
		setEventDates(eventDates.filter(date => !isSameDay(date, dateToRemove)))
	}

	const clearAllDates = () => {
		setEventDates([])
	}

	return (
		<div className="space-y-4">
			<div>
				<Label htmlFor="event-name" className="text-sm font-medium mb-2 block">Event Name</Label>
				<Input
					id="event-name"
					placeholder="Enter event name"
					value={eventName}
					onChange={(e) => setEventName(e.target.value)}
				/>
			</div>

			<div>
				<Label className="text-sm font-medium mb-2 block">Add Event Dates</Label>
				<Popover>
					<PopoverTrigger asChild>
						<Button
							variant="outline"
							className="w-full justify-start text-left font-normal"
						>
							<CalendarDaysIcon className="mr-2 h-4 w-4" />
							Add another date
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-auto p-0" align="start">
						<Calendar
							mode="single"
							selected={selectedDate}
							onSelect={addEventDate}
							disabled={(date) => isBefore(date, new Date())}
							initialFocus
						/>
					</PopoverContent>
				</Popover>
			</div>

			{eventDates.length > 0 && (
				<div>
					<div className="flex items-center justify-between mb-2">
						<Label className="text-sm font-medium">Selected Dates ({eventDates.length})</Label>
						<Button variant="ghost" size="sm" onClick={clearAllDates}>
							<XIcon className="w-4 h-4 mr-1" />
							Clear All
						</Button>
					</div>
					<div className="space-y-2 max-h-40 overflow-y-auto">
						{eventDates
							.sort((a, b) => a.getTime() - b.getTime())
							.map((date, index) => (
								<div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded border">
									<div className="flex items-center gap-2">
										<CalendarIcon className="w-4 h-4 text-gray-500" />
										<span className="text-sm">{format(date, 'EEEE, MMMM do, yyyy')}</span>
									</div>
									<Button
										variant="ghost"
										size="sm"
										onClick={() => removeEventDate(date)}
									>
										<XIcon className="w-3 h-3" />
									</Button>
								</div>
							))}
					</div>
				</div>
			)}

			{eventName && eventDates.length > 0 && (
				<div className="p-4 bg-green-50 border border-green-200 rounded-lg">
					<h4 className="font-medium text-green-900 mb-2">Event Preview</h4>
					<div className="text-sm text-green-800">
						<p><strong>Event:</strong> {eventName}</p>
						<p><strong>Dates:</strong> {eventDates.length} date{eventDates.length !== 1 ? 's' : ''} selected</p>
						<p><strong>Duration:</strong> {eventDates.length > 1 ? 
							`${format(Math.min(...eventDates.map(d => d.getTime())), 'MMM do')} - ${format(Math.max(...eventDates.map(d => d.getTime())), 'MMM do, yyyy')}` : 
							format(eventDates[0], 'MMM do, yyyy')
						}</p>
					</div>
				</div>
			)}
		</div>
	)
}

// Advanced Date Filter
const AdvancedDateFilter = () => {
	const [filterType, setFilterType] = useState<'single' | 'range' | 'multiple'>('range')
	const [singleDate, setSingleDate] = useState<Date>()
	const [dateRange, setDateRange] = useState<DateRange>()
	const [multipleDates, setMultipleDates] = useState<Date[]>([])
	const [dateComparison, setDateComparison] = useState('after')

	const addMultipleDate = (date: Date | undefined) => {
		if (date && !multipleDates.some(d => isSameDay(d, date))) {
			setMultipleDates([...multipleDates, date])
		}
	}

	const removeMultipleDate = (dateToRemove: Date) => {
		setMultipleDates(multipleDates.filter(date => !isSameDay(date, dateToRemove)))
	}

	const clearFilters = () => {
		setSingleDate(undefined)
		setDateRange(undefined)
		setMultipleDates([])
	}

	return (
		<div className="space-y-4">
			<div className="flex items-center gap-4">
				<Label className="text-sm font-medium">Filter Type:</Label>
				<div className="flex gap-2">
					{[
						{ value: 'single', label: 'Single Date' },
						{ value: 'range', label: 'Date Range' },
						{ value: 'multiple', label: 'Multiple Dates' }
					].map((option) => (
						<Button
							key={option.value}
							variant={filterType === option.value ? 'default' : 'outline'}
							size="sm"
							onClick={() => setFilterType(option.value as any)}
						>
							{option.label}
						</Button>
					))}
				</div>
			</div>

			{filterType === 'single' && (
				<div className="space-y-3">
					<div className="grid grid-cols-2 gap-3">
						<div>
							<Label className="text-sm font-medium mb-2 block">Comparison</Label>
							<Select value={dateComparison} onValueChange={setDateComparison}>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="before">Before</SelectItem>
									<SelectItem value="after">After</SelectItem>
									<SelectItem value="on">On</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div>
							<Label className="text-sm font-medium mb-2 block">Date</Label>
							<Popover>
								<PopoverTrigger asChild>
									<Button
										variant="outline"
										className={cn(
											'w-full justify-start text-left font-normal',
											!singleDate && 'text-muted-foreground'
										)}
									>
										<CalendarIcon className="mr-2 h-4 w-4" />
										{singleDate ? format(singleDate, 'PPP') : <span>Select date</span>}
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0" align="start">
									<Calendar
										mode="single"
										selected={singleDate}
										onSelect={setSingleDate}
										initialFocus
									/>
								</PopoverContent>
							</Popover>
						</div>
					</div>
				</div>
			)}

			{filterType === 'range' && (
				<div>
					<Label className="text-sm font-medium mb-2 block">Date Range</Label>
					<Popover>
						<PopoverTrigger asChild>
							<Button
								variant="outline"
								className={cn(
									'w-full justify-start text-left font-normal',
									!dateRange && 'text-muted-foreground'
								)}
							>
								<CalendarRangeIcon className="mr-2 h-4 w-4" />
								{dateRange?.from ? (
									dateRange.to ? (
										<>
											{format(dateRange.from, 'LLL dd, y')} - {format(dateRange.to, 'LLL dd, y')}
										</>
									) : (
										format(dateRange.from, 'LLL dd, y')
									)
								) : (
									<span>Select date range</span>
								)}
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-0" align="start">
							<div className="border-b p-3">
								<div className="grid grid-cols-3 gap-2">
									{dateRangePresets.slice(2, 5).map((preset) => (
										<Button
											key={preset.label}
											variant="ghost"
											size="sm"
											className="text-xs"
											onClick={() => setDateRange(preset.getValue())}
										>
											{preset.label}
										</Button>
									))}
								</div>
							</div>
							<Calendar
								initialFocus
								mode="range"
								defaultMonth={dateRange?.from}
								selected={dateRange}
								onSelect={setDateRange}
								numberOfMonths={2}
							/>
						</PopoverContent>
					</Popover>
				</div>
			)}

			{filterType === 'multiple' && (
				<div className="space-y-3">
					<Label className="text-sm font-medium">Multiple Dates</Label>
					<Popover>
						<PopoverTrigger asChild>
							<Button
								variant="outline"
								className="w-full justify-start text-left font-normal"
							>
								<CalendarDaysIcon className="mr-2 h-4 w-4" />
								Add date to selection
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-0" align="start">
							<Calendar
								mode="single"
								onSelect={addMultipleDate}
								initialFocus
							/>
						</PopoverContent>
					</Popover>
					
					{multipleDates.length > 0 && (
						<div className="space-y-2">
							<div className="flex items-center justify-between">
								<span className="text-sm text-muted-foreground">
									{multipleDates.length} date{multipleDates.length !== 1 ? 's' : ''} selected
								</span>
								<Button variant="ghost" size="sm" onClick={() => setMultipleDates([])}>
									Clear
								</Button>
							</div>
							<div className="flex flex-wrap gap-1">
								{multipleDates.map((date, index) => (
									<Badge key={index} variant="secondary" className="text-xs">
										{format(date, 'MMM dd')}
										<XIcon 
											className="w-3 h-3 ml-1 cursor-pointer" 
											onClick={() => removeMultipleDate(date)}
										/>
									</Badge>
								))}
							</div>
						</div>
					)}
				</div>
			)}

			<div className="flex items-center gap-2 pt-2">
				<Button size="sm">
					<FilterIcon className="w-4 h-4 mr-2" />
					Apply Filter
				</Button>
				<Button variant="outline" size="sm" onClick={clearFilters}>
					Clear All
				</Button>
			</div>

			{/* Filter Preview */}
			<div className="p-3 bg-gray-50 rounded-lg text-sm">
				<h4 className="font-medium mb-1">Filter Preview:</h4>
				{filterType === 'single' && singleDate && (
					<p>Show items {dateComparison} {format(singleDate, 'MMMM do, yyyy')}</p>
				)}
				{filterType === 'range' && dateRange?.from && dateRange?.to && (
					<p>Show items between {format(dateRange.from, 'MMM do')} and {format(dateRange.to, 'MMM do, yyyy')}</p>
				)}
				{filterType === 'multiple' && multipleDates.length > 0 && (
					<p>Show items on {multipleDates.length} specific date{multipleDates.length !== 1 ? 's' : ''}</p>
				)}
				{!((filterType === 'single' && singleDate) || 
				   (filterType === 'range' && dateRange?.from && dateRange?.to) || 
				   (filterType === 'multiple' && multipleDates.length > 0)) && (
					<p className="text-muted-foreground">No filters applied</p>
				)}
			</div>
		</div>
	)
}

export default function DatePickerSample() {
	const [showAdvanced, setShowAdvanced] = useState(false)

	return (
		<Fragment>
			<ComponentDoc
				title="Date Picker"
				description="Comprehensive date selection components for forms, scheduling, filtering, and planning. Supports single dates, ranges, multiple selections, and appointment booking."
				component={
					<div className="flex flex-col gap-8 w-full max-w-4xl">
						{/* Controls */}
						<div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
							<div className="flex items-center gap-4">
								<div className="flex items-center space-x-2">
									<Switch
										id="show-advanced"
										checked={showAdvanced}
										onCheckedChange={setShowAdvanced}
									/>
									<Label htmlFor="show-advanced" className="text-sm">Show Advanced Examples</Label>
								</div>
							</div>
							<Badge variant="outline">{showAdvanced ? '5' : '3'} Examples</Badge>
						</div>

						{/* Basic Date Pickers */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Basic Date Selection</h3>
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<CalendarIcon className="w-5 h-5" />
											Single Date
										</CardTitle>
										<CardDescription>Basic date picker with quick presets</CardDescription>
									</CardHeader>
									<CardContent>
										<SimpleDatePicker />
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<CalendarRangeIcon className="w-5 h-5" />
											Date Range
										</CardTitle>
										<CardDescription>Select start and end dates with range presets</CardDescription>
									</CardHeader>
									<CardContent>
										<DateRangePicker />
									</CardContent>
								</Card>
							</div>
						</div>

						{/* Appointment Scheduler */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Appointment Booking</h3>
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<ClockIcon className="w-5 h-5" />
										Schedule Appointment
									</CardTitle>
									<CardDescription>Combined date and time selection with availability</CardDescription>
								</CardHeader>
								<CardContent>
									<AppointmentScheduler />
								</CardContent>
							</Card>
						</div>

						{/* Advanced Examples */}
						{showAdvanced && (
							<>
								{/* Event Planner */}
								<div>
									<h3 className="text-lg font-semibold mb-4">Event Planning</h3>
									<Card>
										<CardHeader>
											<CardTitle className="flex items-center gap-2">
												<CalendarDaysIcon className="w-5 h-5" />
												Multi-Date Events
											</CardTitle>
											<CardDescription>Select multiple dates for events and activities</CardDescription>
										</CardHeader>
										<CardContent>
											<EventPlanner />
										</CardContent>
									</Card>
								</div>

								{/* Advanced Filter */}
								<div>
									<h3 className="text-lg font-semibold mb-4">Advanced Filtering</h3>
									<Card>
										<CardHeader>
											<CardTitle className="flex items-center gap-2">
												<FilterIcon className="w-5 h-5" />
												Date Filters
											</CardTitle>
											<CardDescription>Complex date filtering with multiple criteria</CardDescription>
										</CardHeader>
										<CardContent>
											<AdvancedDateFilter />
										</CardContent>
									</Card>
								</div>
							</>
						)}

						{/* Usage Guidelines */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<BookOpenIcon className="w-5 h-5" />
									Usage Guidelines
								</CardTitle>
								<CardDescription>Best practices for implementing date pickers</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div>
										<h4 className="font-semibold mb-2">When to Use</h4>
										<ul className="space-y-1 text-sm text-muted-foreground">
											<li>• For scheduling appointments and events</li>
											<li>• When filtering data by date ranges</li>
											<li>• For form inputs requiring precise date selection</li>
											<li>• When planning multi-day activities</li>
										</ul>
									</div>
									<Separator />
									<div>
										<h4 className="font-semibold mb-2">Design Principles</h4>
										<ul className="space-y-1 text-sm text-muted-foreground">
											<li>• Provide quick preset options for common selections</li>
											<li>• Show clear visual feedback for selected dates</li>
											<li>• Disable unavailable or invalid dates</li>
											<li>• Include relative date descriptions (Today, Tomorrow)</li>
											<li>• Support keyboard navigation and accessibility</li>
										</ul>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Interactive State Display */}
						<div className="mt-6 p-4 bg-gray-50 rounded-lg">
							<h4 className="text-sm font-semibold text-gray-700 mb-2">Current Settings:</h4>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
								<div>
									<p><strong>Show Advanced:</strong> {showAdvanced ? 'Yes' : 'No'}</p>
									<p><strong>Total Examples:</strong> {showAdvanced ? '5' : '3'}</p>
								</div>
								<div>
									<p><strong>Picker Types:</strong> Single, Range, Appointment{showAdvanced ? ', Event, Filter' : ''}</p>
									<p><strong>Features:</strong> Presets, Validation, Time Slots, Multi-select</p>
								</div>
							</div>
						</div>
					</div>
				}
			/>
		</Fragment>
	)
}
