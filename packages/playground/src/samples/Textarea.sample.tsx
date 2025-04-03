import { Textarea } from 'ui-kit'
import { ComponentDoc } from '../components/ComponentDoc'

export default function TextareaSample() {
	return (
		<ComponentDoc
			title="Textarea"
			description="Displays a form textarea or a component that looks like a textarea."
			component={
				<div className="grid w-full max-w-md gap-2">
					<label htmlFor="message" className="text-sm font-medium">
						Your message
					</label>
					<textarea
						id="message"
						className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
						placeholder="Type your message here."
					/>
					<p className="text-sm text-muted-foreground">Your message will be sent to the team.</p>
				</div>
			}
		/>
	)
}
