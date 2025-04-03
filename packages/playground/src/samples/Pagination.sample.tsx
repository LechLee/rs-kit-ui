import { Pagination } from 'ui-kit'
import { ComponentDoc } from '../components/ComponentDoc'

export default function PaginationSample() {
	return (
		<ComponentDoc
			title="Pagination"
			description="Navigate between pages of content."
			component={
				<div className="flex w-full justify-center">
					<nav className="flex items-center space-x-1">
						<button className="h-8 w-8 rounded-md border flex items-center justify-center hover:bg-muted">&lt;</button>
						<button className="h-8 w-8 rounded-md border flex items-center justify-center bg-primary text-white">1</button>
						<button className="h-8 w-8 rounded-md border flex items-center justify-center hover:bg-muted">2</button>
						<button className="h-8 w-8 rounded-md border flex items-center justify-center hover:bg-muted">3</button>
						<button className="h-8 w-8 rounded-md border flex items-center justify-center hover:bg-muted">...</button>
						<button className="h-8 w-8 rounded-md border flex items-center justify-center hover:bg-muted">&gt;</button>
					</nav>
				</div>
			}
		/>
	)
}
