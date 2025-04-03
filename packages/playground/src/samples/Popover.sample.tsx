import { Button, Popover } from 'ui-kit'
import { ComponentDoc } from '../components/ComponentDoc'

export default function PopoverSample() {
	return (
		<ComponentDoc
			title="Popover"
			description="Displays rich content in a portal, triggered by a button."
			component={
				<div className="flex w-full justify-center">
					<Button variant="outline">Open Popover</Button>
				</div>
			}
		/>
	)
}
