import { Button, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from 'ui-kit'
import { ComponentDoc } from '@/components/ComponentDoc'

export default function TooltipSample() {
	return (
		<ComponentDoc
			title="Tooltip"
			description="A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it."
			component={
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button variant="outline">Hover</Button>
						</TooltipTrigger>
						<TooltipContent>
							<p>Add to library</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			}
		/>
	)
}
