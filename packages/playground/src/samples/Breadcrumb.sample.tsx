import { Breadcrumb } from 'ui-kit'
import { ComponentDoc } from '../components/ComponentDoc'

export default function BreadcrumbSample() {
	return (
		<ComponentDoc
			title="Breadcrumb"
			description="Displays the path to the current resource using a hierarchy of links."
			component={
				<div className="flex items-center space-x-2 text-sm">
					<a href="/" className="text-muted-foreground hover:text-foreground">
						Home
					</a>
					<span className="text-muted-foreground">/</span>
					<a href="/components" className="text-muted-foreground hover:text-foreground">
						Components
					</a>
					<span className="text-muted-foreground">/</span>
					<span>Breadcrumb</span>
				</div>
			}
		/>
	)
}
