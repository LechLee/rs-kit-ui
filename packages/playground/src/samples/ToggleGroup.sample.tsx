import { ToggleGroup } from 'ui-kit'
import { ComponentDoc } from '../components/ComponentDoc'

export default function ToggleGroupSample() {
	return (
		<ComponentDoc
			title="Toggle Group"
			description="A set of two-state buttons that can be toggled on or off."
			component={
				<div className="flex flex-col space-y-4">
					<div className="inline-flex rounded-md border">
						<button className="inline-flex items-center justify-center rounded-l-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-r bg-accent text-accent-foreground hover:bg-accent/80 h-10 px-3">
							Day
						</button>
						<button className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-r bg-transparent hover:bg-muted hover:text-muted-foreground h-10 px-3">
							Week
						</button>
						<button className="inline-flex items-center justify-center rounded-r-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-transparent hover:bg-muted hover:text-muted-foreground h-10 px-3">
							Month
						</button>
					</div>
				</div>
			}
		/>
	)
}
