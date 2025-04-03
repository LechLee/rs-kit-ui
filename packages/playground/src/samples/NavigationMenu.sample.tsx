import { NavigationMenu } from 'ui-kit'
import { ComponentDoc } from '../components/ComponentDoc'

export default function NavigationMenuSample() {
	return (
		<ComponentDoc
			title="Navigation Menu"
			description="A collection of links for navigating websites."
			component={
				<div className="relative z-10 w-full max-w-md">
					<div className="flex h-10 items-center space-x-4 rounded-md border p-4">
						<div className="font-medium">Getting started</div>
						<div className="font-medium">Components</div>
						<div className="font-medium">Documentation</div>
					</div>
				</div>
			}
		/>
	)
}
