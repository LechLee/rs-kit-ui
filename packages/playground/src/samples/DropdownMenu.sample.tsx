import { Button, DropdownMenu } from 'ui-kit'
import { ComponentDoc } from '../components/ComponentDoc'

export default function DropdownMenuSample() {
	return (
		<ComponentDoc
			title="Dropdown Menu"
			description="Displays a menu to the user triggered by a button."
			component={
				<div className="flex w-full items-center justify-center">
					<Button>Open Menu</Button>
				</div>
			}
		/>
	)
}
