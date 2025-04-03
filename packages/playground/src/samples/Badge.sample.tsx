import { Badge } from 'ui-kit'
import { ComponentDoc } from '../components/ComponentDoc'

export default function BadgeSample() {
	return (
		<ComponentDoc
			title="Badge"
			description="Displays a badge or a component that looks like a badge."
			component={
				<div className="flex flex-wrap gap-2">
					<Badge>Default</Badge>
					<Badge variant="secondary">Secondary</Badge>
					<Badge variant="outline">Outline</Badge>
					<Badge variant="destructive">Destructive</Badge>
				</div>
			}
		/>
	)
}
