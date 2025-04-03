import { Button, Toaster } from 'ui-kit'
import { ComponentDoc } from '../components/ComponentDoc'

export default function SonnerSample() {
	return (
		<ComponentDoc
			title="Sonner"
			description="The toast component for React, built using the Sonner library."
			component={
				<div className="flex w-full justify-center">
					<Button variant="outline">Show Toast</Button>
				</div>
			}
		/>
	)
}
