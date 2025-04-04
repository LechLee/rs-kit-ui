import { Switch, Label } from 'ui-kit'
import { ComponentDoc } from '@/components/ComponentDoc'

export default function SwitchSample() {
	return (
		<ComponentDoc
			title="Switch"
			description="A toggle switch alternative to a checkbox."
			component={
				<div className="flex items-center space-x-2 w-full max-w-md">
					<Switch id="airplane-mode" />
					<Label htmlFor="airplane-mode">Airplane Mode</Label>
				</div>
			}
		/>
	)
}
