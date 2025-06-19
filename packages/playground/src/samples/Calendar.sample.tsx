import { Fragment, useState } from 'react'
import { 
	Calendar,
	Button,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Badge,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	cn
} from '@rs-kit/ui-kit'
import { 
	CalendarIcon,
	CalendarDaysIcon,
	CalendarRangeIcon,
	ClockIcon,
	MapPinIcon,
	UsersIcon,
	StarIcon,
	CheckIcon,
	XIcon,
	PlusIcon,
	ChevronLeftIcon,
	ChevronRightIcon
} from 'lucide-react'
import { format, addDays, subDays, startOfWeek, endOfWeek, isSameDay, isToday, isBefore, isAfter } from 'date-fns'
import { type DateRange } from 'react-day-picker'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ComponentDoc } from '@/components/ComponentDoc'

// Form schema for date selection
const FormSchema = z.object({
	dob: z.date({
		required_error: 'A date of birth is required.'
	}),
	appointmentDate: z.date({
		required_error: 'Please select an appointment date.'
	}),
	eventDate: z.date({
		required_error: 'Please select an event date.'
	})
})

export default function CalendarSample() {
	// State for different calendar modes
	const [singleDate, setSingleDate] = useState<Date | undefined>(new Date())
	const [multiDates, setMultiDates] = useState<Date[]>([new Date(), addDays(new Date(), 2), addDays(new Date(), 5)])
	const [dateRange, setDateRange] = useState<DateRange | undefined>({
		from: new Date(),
		to: addDays(new Date(), 7)
	})
	const [weekRange, setWeekRange] = useState<DateRange | undefined>({
		from: startOfWeek(new Date()),
		to: endOfWeek(new Date())
	})

	// State for interactive examples
	const [selectedEvent, setSelectedEvent] = useState<string | null>(null)
	const [isBookingOpen, setIsBookingOpen] = useState(false)
	const [isDobOpen, setIsDobOpen] = useState(false)
	const [customDisabledDates, setCustomDisabledDates] = useState<Date[]>([
		addDays(new Date(), 3),
		addDays(new Date(), 10),
		addDays(new Date(), 15)
	])

	// Sample events data
	const events = [
		{ id: '1', date: new Date(), title: 'Team Meeting', type: 'meeting', time: '10:00 AM' },
		{ id: '2', date: addDays(new Date(), 1), title: 'Project Deadline', type: 'deadline', time: '11:59 PM' },
		{ id: '3', date: addDays(new Date(), 3), title: 'Client Presentation', type: 'presentation', time: '2:00 PM' },
		{ id: '4', date: addDays(new Date(), 7), title: 'Team Lunch', type: 'social', time: '12:30 PM' },
		{ id: '5', date: addDays(new Date(), 14), title: 'Sprint Planning', type: 'planning', time: '9:00 AM' }
	]

	// Form handling
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema)
	})

	// Event handlers
	const handleEventSelect = (eventId: string) => {
		setSelectedEvent(selectedEvent === eventId ? null : eventId)
	}

	const handleDateRangeSelect = (range: DateRange | undefined) => {
		setDateRange(range)
	}

	const handleWeekSelect = (date: Date) => {
		setWeekRange({
			from: startOfWeek(date),
			to: endOfWeek(date)
		})
	}

	const onSubmit = (data: z.infer<typeof FormSchema>) => {
		console.log('Form submitted:', data)
		alert(`Form submitted with dates:\nDOB: ${format(data.dob, 'PPP')}\nAppointment: ${format(data.appointmentDate, 'PPP')}\nEvent: ${format(data.eventDate, 'PPP')}`)
	}

	// Custom day content with events
	const getDayEvents = (date: Date) => {
		return events.filter(event => isSameDay(event.date, date))
	}

	const getEventTypeColor = (type: string) => {
		switch (type) {
			case 'meeting': return 'bg-blue-500'
			case 'deadline': return 'bg-red-500'
			case 'presentation': return 'bg-purple-500'
			case 'social': return 'bg-green-500'
			case 'planning': return 'bg-orange-500'
			default: return 'bg-gray-500'
		}
	}

	return (
		<Fragment>
			<ComponentDoc
				title="Calendar"
				description="A flexible calendar component for date selection, range picking, and event display. Built on react-day-picker with full accessibility support."
				component={
					<div className="flex flex-col gap-8 w-full max-w-6xl">
						{/* Basic Calendar Modes */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Basic Calendar Modes</h3>
							<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
								<Card>
									<CardHeader>
										<CardTitle className="text-sm">Single Date Selection</CardTitle>
										<CardDescription>Select a single date</CardDescription>
									</CardHeader>
									<CardContent>
										<Calendar 
											mode="single" 
											selected={singleDate} 
											onSelect={setSingleDate}
											className="rounded-md border"
										/>
										{singleDate && (
											<p className="text-sm text-muted-foreground mt-2">
												Selected: {format(singleDate, 'PPP')}
											</p>
										)}
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="text-sm">Multiple Date Selection</CardTitle>
										<CardDescription>Select multiple individual dates</CardDescription>
									</CardHeader>
									<CardContent>
										<Calendar 
											mode="multiple" 
											selected={multiDates} 
											onSelect={setMultiDates}
											className="rounded-md border"
										/>
										<p className="text-sm text-muted-foreground mt-2">
											Selected: {multiDates?.length || 0} dates
										</p>
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="text-sm">Date Range Selection</CardTitle>
										<CardDescription>Select a date range</CardDescription>
									</CardHeader>
									<CardContent>
										<Calendar 
											mode="range" 
											selected={dateRange} 
											onSelect={handleDateRangeSelect}
											className="rounded-md border"
										/>
										{dateRange?.from && (
											<p className="text-sm text-muted-foreground mt-2">
												{dateRange.to 
													? `${format(dateRange.from, 'LLL dd')} - ${format(dateRange.to, 'LLL dd, y')}`
													: format(dateRange.from, 'PPP')
												}
											</p>
										)}
									</CardContent>
								</Card>
							</div>
						</div>

						{/* Calendar with Events */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Calendar with Events</h3>
							<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
								<div className="lg:col-span-2">
									<Calendar 
										mode="single" 
										selected={singleDate} 
										onSelect={setSingleDate}
										className="rounded-md border"
										components={{
											DayContent: ({ date }) => {
												const dayEvents = getDayEvents(date)
												return (
													<div className="relative w-full h-full flex flex-col items-center justify-center">
														<span>{date.getDate()}</span>
														{dayEvents.length > 0 && (
															<div className="flex gap-1 mt-1">
																{dayEvents.slice(0, 2).map((event, index) => (
																	<div 
																		key={index} 
																		className={`w-1.5 h-1.5 rounded-full ${getEventTypeColor(event.type)}`}
																	/>
																))}
																{dayEvents.length > 2 && (
																	<div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
																)}
															</div>
														)}
													</div>
												)
											}
										}}
									/>
								</div>
								
								<div>
									<h4 className="text-sm font-medium text-gray-600 mb-3">Upcoming Events</h4>
									<div className="space-y-2">
										{events.slice(0, 5).map((event) => (
											<div 
												key={event.id}
												className={`p-3 rounded-lg border cursor-pointer transition-colors ${
													selectedEvent === event.id ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
												}`}
												onClick={() => handleEventSelect(event.id)}
											>
												<div className="flex items-start gap-2">
													<div className={`w-3 h-3 rounded-full ${getEventTypeColor(event.type)} mt-1 flex-shrink-0`} />
													<div className="flex-1 min-w-0">
														<p className="text-sm font-medium truncate">{event.title}</p>
														<p className="text-xs text-muted-foreground">
															{format(event.date, 'MMM d')} at {event.time}
														</p>
													</div>
												</div>
											</div>
										))}
									</div>
									
									<div className="mt-4 space-y-2">
										<p className="text-xs font-medium text-gray-600">Event Types:</p>
										<div className="flex flex-wrap gap-2">
											<Badge variant="outline" className="text-xs">
												<div className="w-2 h-2 rounded-full bg-blue-500 mr-1" />
												Meeting
											</Badge>
											<Badge variant="outline" className="text-xs">
												<div className="w-2 h-2 rounded-full bg-red-500 mr-1" />
												Deadline
											</Badge>
											<Badge variant="outline" className="text-xs">
												<div className="w-2 h-2 rounded-full bg-purple-500 mr-1" />
												Presentation
											</Badge>
											<Badge variant="outline" className="text-xs">
												<div className="w-2 h-2 rounded-full bg-green-500 mr-1" />
												Social
											</Badge>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Calendar with Restrictions */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Calendar with Restrictions</h3>
							<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
								<Card>
									<CardHeader>
										<CardTitle className="text-sm">Past Dates Disabled</CardTitle>
										<CardDescription>For booking future appointments</CardDescription>
									</CardHeader>
									<CardContent>
										<Calendar 
											mode="single" 
											selected={undefined} 
											onSelect={() => {}}
											disabled={(date) => isBefore(date, new Date())}
											className="rounded-md border"
										/>
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="text-sm">Weekend Disabled</CardTitle>
										<CardDescription>Business days only</CardDescription>
									</CardHeader>
									<CardContent>
										<Calendar 
											mode="single" 
											selected={undefined} 
											onSelect={() => {}}
											disabled={(date) => {
												const day = date.getDay()
												return day === 0 || day === 6 // Sunday or Saturday
											}}
											className="rounded-md border"
										/>
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="text-sm">Custom Disabled Dates</CardTitle>
										<CardDescription>Specific dates unavailable</CardDescription>
									</CardHeader>
									<CardContent>
										<Calendar 
											mode="single" 
											selected={undefined} 
											onSelect={() => {}}
											disabled={(date) => 
												customDisabledDates.some(disabledDate => 
													isSameDay(date, disabledDate)
												)
											}
											className="rounded-md border"
										/>
										<div className="mt-2">
											<p className="text-xs text-muted-foreground mb-1">Disabled dates:</p>
											<div className="space-y-1">
												{customDisabledDates.map((date, index) => (
													<Badge key={index} variant="outline" className="text-xs">
														{format(date, 'MMM d')}
													</Badge>
												))}
											</div>
										</div>
									</CardContent>
								</Card>
							</div>
						</div>

						{/* Calendar in Forms */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Calendar in Forms</h3>
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
								<Card>
									<CardHeader>
										<CardTitle className="text-sm">Date Picker with Popover</CardTitle>
										<CardDescription>Common pattern for form inputs</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="space-y-4">
											{/* DOB Picker */}
											<div className="space-y-2">
												<label className="text-sm font-medium">Date of Birth</label>
												<Popover open={isDobOpen} onOpenChange={setIsDobOpen}>
													<PopoverTrigger asChild>
														<Button
															variant="outline"
															className={cn(
																"w-full justify-start text-left font-normal",
																!singleDate && "text-muted-foreground"
															)}
														>
															<CalendarIcon className="mr-2 h-4 w-4" />
															{singleDate ? format(singleDate, "PPP") : "Pick a date"}
														</Button>
													</PopoverTrigger>
													<PopoverContent className="w-auto p-0" align="start">
														<Calendar
															mode="single"
															selected={singleDate}
															onSelect={(date) => {
																setSingleDate(date)
																setIsDobOpen(false)
															}}
															disabled={(date) =>
																date > new Date() || date < new Date("1900-01-01")
															}
															initialFocus
														/>
													</PopoverContent>
												</Popover>
											</div>

											{/* Appointment Booking */}
											<div className="space-y-2">
												<label className="text-sm font-medium">Appointment Date</label>
												<Popover open={isBookingOpen} onOpenChange={setIsBookingOpen}>
													<PopoverTrigger asChild>
														<Button
															variant="outline"
															className={cn(
																"w-full justify-start text-left font-normal",
																!dateRange?.from && "text-muted-foreground"
															)}
														>
															<CalendarDaysIcon className="mr-2 h-4 w-4" />
															{dateRange?.from ? (
																dateRange.to ? (
																	`${format(dateRange.from, "LLL dd")} - ${format(dateRange.to, "LLL dd, y")}`
																) : (
																	format(dateRange.from, "PPP")
																)
															) : (
																"Select date range"
															)}
														</Button>
													</PopoverTrigger>
													<PopoverContent className="w-auto p-0" align="start">
														<Calendar
															mode="range"
															selected={dateRange}
															onSelect={(range) => {
																setDateRange(range)
																if (range?.from && range?.to) {
																	setIsBookingOpen(false)
																}
															}}
															disabled={(date) => isBefore(date, new Date())}
															numberOfMonths={2}
															initialFocus
														/>
													</PopoverContent>
												</Popover>
											</div>
										</div>
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="text-sm">Complete Form Example</CardTitle>
										<CardDescription>Form with validation and submission</CardDescription>
									</CardHeader>
									<CardContent>
										<Form {...form}>
											<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
												<FormField
													control={form.control}
													name="dob"
													render={({ field }) => (
														<FormItem className="flex flex-col">
															<FormLabel>Date of birth</FormLabel>
															<Popover>
																<PopoverTrigger asChild>
																	<FormControl>
																		<Button
																			variant="outline"
																			className={cn(
																				"w-full pl-3 text-left font-normal",
																				!field.value && "text-muted-foreground"
																			)}
																		>
																			{field.value ? (
																				format(field.value, "PPP")
																			) : (
																				<span>Pick a date</span>
																			)}
																			<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
																		</Button>
																	</FormControl>
																</PopoverTrigger>
																<PopoverContent className="w-auto p-0" align="start">
																	<Calendar
																		mode="single"
																		selected={field.value}
																		onSelect={field.onChange}
																		disabled={(date) =>
																			date > new Date() || date < new Date("1900-01-01")
																		}
																		initialFocus
																	/>
																</PopoverContent>
															</Popover>
															<FormDescription>
																Your date of birth is used to calculate your age.
															</FormDescription>
															<FormMessage />
														</FormItem>
													)}
												/>
												<FormField
													control={form.control}
													name="appointmentDate"
													render={({ field }) => (
														<FormItem className="flex flex-col">
															<FormLabel>Appointment Date</FormLabel>
															<Popover>
																<PopoverTrigger asChild>
																	<FormControl>
																		<Button
																			variant="outline"
																			className={cn(
																				"w-full pl-3 text-left font-normal",
																				!field.value && "text-muted-foreground"
																			)}
																		>
																			{field.value ? (
																				format(field.value, "PPP")
																			) : (
																				<span>Select appointment date</span>
																			)}
																			<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
																		</Button>
																	</FormControl>
																</PopoverTrigger>
																<PopoverContent className="w-auto p-0" align="start">
																	<Calendar
																		mode="single"
																		selected={field.value}
																		onSelect={field.onChange}
																		disabled={(date) => isBefore(date, new Date())}
																		initialFocus
																	/>
																</PopoverContent>
															</Popover>
															<FormMessage />
														</FormItem>
													)}
												/>
												<Button type="submit" className="w-full">Submit</Button>
											</form>
										</Form>
									</CardContent>
								</Card>
							</div>
						</div>

						{/* Multiple Month Display */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Multiple Month Display</h3>
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
								<Card>
									<CardHeader>
										<CardTitle className="text-sm">Two Month Range Picker</CardTitle>
										<CardDescription>Perfect for trip planning and date ranges</CardDescription>
									</CardHeader>
									<CardContent>
										<Calendar
											mode="range"
											selected={dateRange}
											onSelect={setDateRange}
											numberOfMonths={2}
											className="rounded-md border"
											disabled={(date) => isBefore(date, new Date())}
										/>
										{dateRange?.from && dateRange?.to && (
											<div className="mt-4 p-3 bg-blue-50 rounded-lg">
												<p className="text-sm font-medium text-blue-900">
													Selected Range: {format(dateRange.from, 'MMM d')} - {format(dateRange.to, 'MMM d, yyyy')}
												</p>
												<p className="text-sm text-blue-700">
													Duration: {Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24))} days
												</p>
											</div>
										)}
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="text-sm">Week Selection</CardTitle>
										<CardDescription>Select entire weeks for scheduling</CardDescription>
									</CardHeader>
									<CardContent>
										<Calendar
											mode="range"
											selected={weekRange}
											onSelect={setWeekRange}
											onDayClick={handleWeekSelect}
											className="rounded-md border"
										/>
										{weekRange?.from && weekRange?.to && (
											<div className="mt-4 p-3 bg-green-50 rounded-lg">
												<p className="text-sm font-medium text-green-900">
													Week of {format(weekRange.from, 'MMM d, yyyy')}
												</p>
												<p className="text-sm text-green-700">
													{format(weekRange.from, 'EEE, MMM d')} - {format(weekRange.to, 'EEE, MMM d')}
												</p>
											</div>
										)}
									</CardContent>
								</Card>
							</div>
						</div>

						{/* Current State Display */}
						<div className="mt-6 p-4 bg-gray-50 rounded-lg">
							<h4 className="text-sm font-semibold text-gray-700 mb-2">Interactive State:</h4>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600">
								<div>
									<p><strong>Single Date:</strong> {singleDate ? format(singleDate, 'PPP') : 'None selected'}</p>
									<p><strong>Multiple Dates:</strong> {multiDates?.length || 0} selected</p>
								</div>
								<div>
									<p><strong>Date Range:</strong> {
										dateRange?.from && dateRange?.to 
											? `${format(dateRange.from, 'MMM d')} - ${format(dateRange.to, 'MMM d')}`
											: 'None selected'
									}</p>
									<p><strong>Week Range:</strong> {
										weekRange?.from 
											? `Week of ${format(weekRange.from, 'MMM d')}`
											: 'None selected'
									}</p>
								</div>
								<div>
									<p><strong>Selected Event:</strong> {selectedEvent || 'None'}</p>
									<p><strong>Total Events:</strong> {events.length}</p>
								</div>
							</div>
						</div>
					</div>
				}
			/>

			<ComponentDoc
				title="Calendar Props & Usage Guidelines"
				description="Comprehensive guide to Calendar component modes, props, and best practices."
				component={
					<div className="flex flex-col gap-6 w-full max-w-4xl">
						{/* Props Reference */}
						<div className="p-4 bg-blue-50 rounded-lg">
							<h4 className="text-sm font-semibold text-blue-700 mb-2">Props Reference:</h4>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-600">
								<div>
									<strong>Selection Modes:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li><code>mode="single"</code> - Select one date</li>
										<li><code>mode="multiple"</code> - Select multiple dates</li>
										<li><code>mode="range"</code> - Select date range</li>
										<li><code>selected</code> - Currently selected date(s)</li>
										<li><code>onSelect</code> - Selection change handler</li>
									</ul>
								</div>
								<div>
									<strong>Display Options:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li><code>numberOfMonths</code> - Multiple month display</li>
										<li><code>pagedNavigation</code> - Page through months</li>
										<li><code>showOutsideDays</code> - Show adjacent month days</li>
										<li><code>fixedWeeks</code> - Fixed 6-week layout</li>
									</ul>
								</div>
								<div>
									<strong>Restrictions:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li><code>disabled</code> - Disable specific dates</li>
										<li><code>fromDate</code> - Earliest selectable date</li>
										<li><code>toDate</code> - Latest selectable date</li>
										<li><code>fromMonth</code> - Earliest visible month</li>
										<li><code>toMonth</code> - Latest visible month</li>
									</ul>
								</div>
								<div>
									<strong>Customization:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li><code>components</code> - Override default components</li>
										<li><code>labels</code> - Custom aria labels</li>
										<li><code>formatters</code> - Custom date formatting</li>
										<li><code>modifiers</code> - Custom date styling</li>
									</ul>
								</div>
							</div>
						</div>

						{/* Usage Guidelines */}
						<div className="p-4 bg-green-50 rounded-lg">
							<h4 className="text-sm font-semibold text-green-700 mb-2">Usage Guidelines:</h4>
							<ul className="text-sm text-green-600 space-y-1 list-disc list-inside">
								<li><strong>Single Date:</strong> Use for birthdays, deadlines, appointments - any single point in time</li>
								<li><strong>Date Range:</strong> Perfect for booking systems, trip planning, report date ranges</li>
								<li><strong>Multiple Dates:</strong> Good for selecting multiple deadlines, availability, or event dates</li>
								<li><strong>Form Integration:</strong> Always use with proper form validation and error handling</li>
								<li><strong>Popover Pattern:</strong> Use Popover component for space-efficient date inputs</li>
								<li><strong>Accessibility:</strong> Ensure keyboard navigation and screen reader support</li>
								<li><strong>Disabled Dates:</strong> Clearly communicate why certain dates are unavailable</li>
								<li><strong>Event Display:</strong> Use visual indicators for dates with associated events or data</li>
							</ul>
						</div>

						{/* Code Examples */}
						<div className="p-4 bg-gray-100 rounded-lg">
							<h4 className="text-sm font-semibold text-gray-700 mb-2">Code Examples:</h4>
							<pre className="text-xs text-gray-600 overflow-x-auto whitespace-pre-wrap">
{`// Basic single date calendar
<Calendar 
  mode="single" 
  selected={date} 
  onSelect={setDate}
/>

// Date range picker
<Calendar 
  mode="range" 
  selected={dateRange} 
  onSelect={setDateRange}
  numberOfMonths={2}
/>

// Calendar with restrictions
<Calendar 
  mode="single" 
  selected={date} 
  onSelect={setDate}
  disabled={(date) => 
    date < new Date() || // No past dates
    date.getDay() === 0 || date.getDay() === 6 // No weekends
  }
/>

// Calendar in popover for forms
<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">
      <CalendarIcon className="mr-2 h-4 w-4" />
      {date ? format(date, "PPP") : "Pick a date"}
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-auto p-0">
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      initialFocus
    />
  </PopoverContent>
</Popover>

// Calendar with custom events
<Calendar 
  mode="single" 
  selected={date} 
  onSelect={setDate}
  components={{
    DayContent: ({ date }) => {
      const events = getEventsForDate(date)
      return (
        <div className="relative">
          <span>{date.getDate()}</span>
          {events.length > 0 && (
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
              <div className="w-1 h-1 bg-blue-500 rounded-full" />
            </div>
          )}
        </div>
      )
    }
  }}
/>`}
							</pre>
						</div>

						{/* Design Guidelines */}
						<div className="p-4 bg-purple-50 rounded-lg">
							<h4 className="text-sm font-semibold text-purple-700 mb-2">Design Guidelines:</h4>
							<ul className="text-sm text-purple-600 space-y-1 list-disc list-inside">
								<li><strong>Visual Hierarchy:</strong> Use clear distinction between selectable, selected, and disabled dates</li>
								<li><strong>Color Coding:</strong> Use consistent colors for different states and event types</li>
								<li><strong>Size Considerations:</strong> Ensure touch targets are at least 44px on mobile devices</li>
								<li><strong>Multiple Months:</strong> Use for range selection or when more context is helpful</li>
								<li><strong>Loading States:</strong> Show skeleton or loading indicator when fetching date-related data</li>
								<li><strong>Error States:</strong> Clearly indicate validation errors and how to resolve them</li>
								<li><strong>Responsive Design:</strong> Consider mobile-first approach with appropriate month counts</li>
								<li><strong>Navigation:</strong> Provide clear month/year navigation for date ranges spanning long periods</li>
							</ul>
						</div>
					</div>
				}
			/>
		</Fragment>
	)
}