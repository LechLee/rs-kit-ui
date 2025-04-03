import { Checkbox, Label } from 'ui-kit'
import { ComponentDoc } from '../components/ComponentDoc'

export default function LabelSample() {
	return (
		<ComponentDoc
			title="Label"
			description="Renders an accessible label associated with controls."
			component={
				<div className="flex flex-col space-y-4">
					<div className="flex items-center space-x-2">
						<Checkbox id="terms" />
						<Label htmlFor="terms">Accept terms and conditions</Label>
					</div>
					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<input id="email" type="email" className="w-full rounded-md border px-3 py-2" placeholder="example@example.com" />
					</div>
				</div>
			}
		/>
	)
}
