import { Progress } from 'ui-kit'
import { ComponentDoc } from '../components/ComponentDoc'

export default function ProgressSample() {
	return (
		<ComponentDoc
			title="Progress"
			description="Displays an indicator showing the completion progress of a task."
			component={
				<div className="w-full max-w-md">
					<Progress value={33} className="w-full" />
				</div>
			}
		/>
	)
}
