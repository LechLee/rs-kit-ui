import { Button, Card } from 'ui-kit'
import { ComponentDoc } from '../components/ComponentDoc'

export default function CardSample() {
	return (
		<ComponentDoc
			title="Card"
			description="Displays a card with header, content, and footer."
			component={
				<Card className="w-full max-w-md">
					<div className="p-6">
						<h3 className="text-2xl font-semibold leading-none tracking-tight">Card Title</h3>
						<p className="text-sm text-muted-foreground pt-1">Card Description</p>
					</div>
					<div className="p-6 pt-0">
						<p>Card Content</p>
					</div>
					<div className="flex items-center p-6 pt-0">
						<Button>Action</Button>
					</div>
				</Card>
			}
		/>
	)
}
