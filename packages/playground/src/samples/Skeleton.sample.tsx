import { Skeleton } from 'ui-kit'
import { ComponentDoc } from '@/components/ComponentDoc'

export default function SkeletonSample() {
	return (
		<ComponentDoc
			title="Skeleton"
			description="Used to show a placeholder while content is loading."
			component={
				<div className="flex items-center space-x-4 bg-white p-4">
					<Skeleton className="h-12 w-12 rounded-full" />
					<div className="space-y-2">
						<Skeleton className="h-4 w-[250px]" />
						<Skeleton className="h-4 w-[200px]" />
					</div>
				</div>
			}
		/>
	)
}
