import { Toggle } from 'ui-kit'
import { ComponentDoc } from '../components/ComponentDoc'

export default function ToggleSample() {
	return (
		<ComponentDoc
			title="Toggle"
			description="A two-state button that can be either on or off."
			component={
				<div className="flex items-center space-x-4">
					<button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground border bg-transparent hover:bg-muted hover:text-muted-foreground h-10 px-3">
						Bold
					</button>
					<button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground bg-accent text-accent-foreground border hover:bg-accent/80 h-10 px-3">
						Italic
					</button>
					<button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground border bg-transparent hover:bg-muted hover:text-muted-foreground h-10 px-3">
						Underline
					</button>
				</div>
			}
		/>
	)
}
