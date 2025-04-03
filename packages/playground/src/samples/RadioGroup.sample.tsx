import { RadioGroup } from 'ui-kit'
import { ComponentDoc } from '../components/ComponentDoc'

export default function RadioGroupSample() {
	return (
		<ComponentDoc
			title="Radio Group"
			description="A set of checkable buttons where only one can be checked at a time."
			component={
				<div className="w-full max-w-md">
					<div className="flex flex-col space-y-2">
						<div className="flex items-center space-x-2">
							<div className="h-4 w-4 rounded-full border border-primary bg-primary/90"></div>
							<label className="text-sm font-medium">Default</label>
						</div>
						<div className="flex items-center space-x-2">
							<div className="h-4 w-4 rounded-full border"></div>
							<label className="text-sm font-medium">Comfortable</label>
						</div>
						<div className="flex items-center space-x-2">
							<div className="h-4 w-4 rounded-full border"></div>
							<label className="text-sm font-medium">Compact</label>
						</div>
					</div>
				</div>
			}
		/>
	)
}
