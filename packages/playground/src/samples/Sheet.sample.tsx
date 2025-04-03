import { Button, Sheet } from 'ui-kit'
import { ComponentDoc } from '../components/ComponentDoc'

export default function SheetSample() {
	return (
		<ComponentDoc
			title="Sheet"
			description="Extends the Dialog component to display content that complements the main content of the screen."
			component={
				<div className="flex w-full justify-center">
					<Button variant="outline">Open Sheet</Button>
				</div>
			}
		/>
	)
}
