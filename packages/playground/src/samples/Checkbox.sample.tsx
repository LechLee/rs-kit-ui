import { Checkbox } from 'ui-kit'
import { ComponentDoc } from '../components/ComponentDoc'

export default function CheckboxSample() {
	return (
		<ComponentDoc
			title="Checkbox"
			description="A control that allows the user to toggle between checked and not checked."
			component={
				<div className="flex flex-col gap-4">
					<div className="flex items-center space-x-2">
						<Checkbox id="terms" />
						<label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
							Accept terms and conditions
						</label>
					</div>
					<div className="flex items-center space-x-2">
						<Checkbox id="disabled" disabled />
						<label htmlFor="disabled" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
							Disabled
						</label>
					</div>
					<div className="flex items-center space-x-2">
						<Checkbox id="checked" defaultChecked />
						<label htmlFor="checked" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
							Default checked
						</label>
					</div>
				</div>
			}
		/>
	)
}
