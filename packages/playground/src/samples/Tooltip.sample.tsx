import { Button, Tooltip } from 'ui-kit'
import { ComponentDoc } from '../components/ComponentDoc'

export default function TooltipSample() {
	return (
		<ComponentDoc
			title="Tooltip"
			description="A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it."
			component={
				<div className="flex w-full justify-center">
					<div className="relative">
						<Button variant="outline">Hover Me</Button>
					</div>
				</div>
			}
		/>
	)
}
