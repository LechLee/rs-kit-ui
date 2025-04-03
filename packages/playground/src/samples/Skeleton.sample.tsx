import { Skeleton } from 'ui-kit'
import { ComponentDoc } from '../components/ComponentDoc'

export default function SkeletonSample() {
	return (
		<ComponentDoc
			title="Skeleton"
			description="Used to show a placeholder while content is loading."
			component={
				<div className="flex flex-col space-y-3 w-full max-w-md">
					<div className="flex items-center space-x-4">
						<div className="w-12 h-12 rounded-full bg-muted animate-pulse"></div>
						<div className="space-y-2">
							<div className="h-4 w-[200px] bg-muted animate-pulse rounded"></div>
							<div className="h-4 w-[160px] bg-muted animate-pulse rounded"></div>
						</div>
					</div>
					<div className="h-4 w-full bg-muted animate-pulse rounded"></div>
					<div className="h-4 w-full bg-muted animate-pulse rounded"></div>
					<div className="h-4 w-3/4 bg-muted animate-pulse rounded"></div>
				</div>
			}
		/>
	)
}
