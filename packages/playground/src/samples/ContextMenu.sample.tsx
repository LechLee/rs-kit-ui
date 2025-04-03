import { ContextMenu } from 'ui-kit'
import { ComponentDoc } from '../components/ComponentDoc'

export default function ContextMenuSample() {
	return (
		<ComponentDoc
			title="Context Menu"
			description="Displays a menu located at the pointer, triggered by a right-click or a long-press."
			component={
				<div className="flex items-center justify-center">
					<div className="relative flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">Right click here</div>
				</div>
			}
		/>
	)
}
