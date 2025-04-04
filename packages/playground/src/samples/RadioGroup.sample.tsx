import { RadioGroup, RadioGroupItem, Label } from 'ui-kit'
import { ComponentDoc } from '@/components/ComponentDoc'

export default function RadioGroupSample() {
	return (
		<ComponentDoc
			title="Radio Group"
			description="A set of checkable buttons where only one can be checked at a time."
			component={
				<RadioGroup defaultValue="comfortable">
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="default" id="r1" />
						<Label htmlFor="r1">Default</Label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="comfortable" id="r2" />
						<Label htmlFor="r2">Comfortable</Label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="compact" id="r3" />
						<Label htmlFor="r3">Compact</Label>
					</div>
				</RadioGroup>
			}
		/>
	)
}
