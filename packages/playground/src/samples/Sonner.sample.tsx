import { toast } from 'sonner'
import { Button, Toaster } from 'ui-kit'
import { ComponentDoc } from '@/components/ComponentDoc'

export default function SonnerSample() {
	return (
		<ComponentDoc
			title="Sonner"
			description="The toast component for React, built using the Sonner library."
			component={
				<div className="flex w-full justify-center">
					<Button
						variant="outline"
						onClick={() =>
							toast('Event has been created', {
								description: 'Sunday, December 03, 2023 at 9:00 AM',
								action: {
									label: 'Undo',
									onClick: () => console.log('Undo')
								}
							})
						}
					>
						Show Toast
					</Button>
					<Toaster />
				</div>
			}
		/>
	)
}
