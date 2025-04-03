import { Alert } from 'ui-kit'
import { ComponentDoc } from '../components/ComponentDoc'

export default function AlertSample() {
	return (
		<ComponentDoc
			title="Alert"
			description="Displays a callout for user attention."
			component={
				<div className="flex flex-col gap-4">
					<Alert>
						<h4 className="font-medium mb-2">Information</h4>
						<p>This is a standard informational alert.</p>
					</Alert>
				</div>
			}
		/>
	)
}
