import { Bold, Italic, Underline } from 'lucide-react'
import { ToggleGroup, ToggleGroupItem } from 'ui-kit'
import { ComponentDoc } from '@/components/ComponentDoc'

export default function ToggleGroupSample() {
	return (
		<ComponentDoc
			title="Toggle Group"
			description="A set of two-state buttons that can be toggled on or off."
			component={
				<ToggleGroup type="multiple">
					<ToggleGroupItem value="bold" aria-label="Toggle bold">
						<Bold className="h-4 w-4" />
					</ToggleGroupItem>
					<ToggleGroupItem value="italic" aria-label="Toggle italic">
						<Italic className="h-4 w-4" />
					</ToggleGroupItem>
					<ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough">
						<Underline className="h-4 w-4" />
					</ToggleGroupItem>
				</ToggleGroup>
			}
		/>
	)
}
