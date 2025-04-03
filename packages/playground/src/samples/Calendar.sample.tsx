import { Calendar } from 'ui-kit'
import { ComponentDoc } from '../components/ComponentDoc'
import { useState } from 'react'

export default function CalendarSample() {
	const [date, setDate] = useState<Date | undefined>(new Date())

	return (
		<ComponentDoc
			title="Calendar"
			description="A date field component that allows users to enter and edit dates."
			component={<Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />}
		/>
	)
}
