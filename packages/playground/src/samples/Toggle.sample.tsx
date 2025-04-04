import { Bold } from 'lucide-react'
import { Toggle } from 'ui-kit'
import { ComponentDoc } from '@/components/ComponentDoc'

export default function ToggleSample() {
	return (
		<ComponentDoc
			title="Toggle"
			description="A two-state button that can be either on or off."
			component={
				<Toggle aria-label="Toggle italic">
					<Bold className="h-4 w-4" />
				</Toggle>
			}
		/>
	)
}
