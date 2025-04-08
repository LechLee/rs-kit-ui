import { useState } from 'react'
import { CalendarIcon } from 'lucide-react'
// import { toast } from '@/registry/default/hooks/use-toast'
import { z } from 'zod'
import { Button, Calendar, Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Popover, PopoverContent, PopoverTrigger, cn } from '@rs-kit/ui-kit'
import { addDays, format } from 'date-fns'
import { type DateRange } from 'react-day-picker'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ComponentDoc } from '@/components/ComponentDoc'

const FormSchema = z.object({
	dob: z.date({
		required_error: 'A date of birth is required.'
	})
})

export default function CalendarSample() {
	const [date, setDate] = useState<Date | undefined>(new Date())
	const [dateRange, setDateRange] = useState<DateRange | undefined>({
		from: new Date(new Date().getFullYear(), 0, 12),
		to: addDays(new Date(new Date().getFullYear(), 0, 12), 30)
	})
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema)
	})

	function onSubmit(data: z.infer<typeof FormSchema>) {
		// toast({
		// 	title: 'You submitted the following values:',
		// 	description: (
		// 		<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
		// 			<code className="text-white">{JSON.stringify(data, null, 2)}</code>
		// 		</pre>
		// 	)
		// })
	}
	return (
		<ComponentDoc
			title="Calendar"
			description="A date field component that allows users to enter and edit dates."
			component={
				<div className="flex flex-col items-start gap-4">
					<div className="flex items-start gap-2 md:flex-row">
						<Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border shadow-sm" />
						<Calendar
							mode="range"
							defaultMonth={dateRange?.from}
							selected={dateRange}
							onSelect={setDateRange}
							numberOfMonths={2}
							disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
							className="rounded-md border shadow-sm"
						/>
					</div>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
							<FormField
								control={form.control}
								name="dob"
								render={({ field }) => (
									<FormItem className="flex flex-col">
										<FormLabel>Date of birth</FormLabel>
										<Popover>
											<PopoverTrigger asChild>
												<FormControl>
													<Button variant={'outline'} className={cn('w-[240px] pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}>
														{field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
														<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent className="w-auto p-0" align="start">
												<Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date > new Date() || date < new Date('1900-01-01')} initialFocus />
											</PopoverContent>
										</Popover>
										<FormDescription>Your date of birth is used to calculate your age.</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type="submit">Submit</Button>
						</form>
					</Form>
				</div>
			}
		/>
	)
}
