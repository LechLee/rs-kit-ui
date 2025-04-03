import { HoverCard } from 'ui-kit'
import { ComponentDoc } from '../components/ComponentDoc'

export default function HoverCardSample() {
	return (
		<ComponentDoc
			title="Hover Card"
			description="For sighted users to preview content available behind a link."
			component={
				<div className="flex items-center justify-center">
					<span className="text-blue-500 hover:underline cursor-pointer">Hover over me</span>
				</div>
			}
		/>
	)
}
