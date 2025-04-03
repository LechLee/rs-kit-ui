import { Input } from 'ui-kit'
import { ComponentDoc } from '../components/ComponentDoc'

export default function InputSample() {
	return (
		<ComponentDoc
			title="Input"
			description="A simple input component built on top of React DOM's input element."
			component={
				<div className="flex flex-col gap-4 w-full max-w-sm">
					<Input placeholder="Default input" />
					<Input placeholder="Disabled input" disabled />
					<Input placeholder="With label" id="email" />
				</div>
			}
		/>
	)
}
