import { Switch } from 'ui-kit'
import { ComponentDoc } from '../components/ComponentDoc'

export default function SwitchSample() {
	return (
		<ComponentDoc
			title="Switch"
			description="A toggle switch alternative to a checkbox."
			component={
				<div className="flex items-center space-x-2 w-full max-w-md">
					<div className="relative inline-flex h-6 w-11 items-center rounded-full bg-muted">
						<span className="inline-block h-4 w-4 transform rounded-full bg-white shadow-lg translate-x-[1.5rem]" />
					</div>
					<label className="text-sm font-medium leading-none">Airplane Mode</label>
				</div>
			}
		/>
	)
}
