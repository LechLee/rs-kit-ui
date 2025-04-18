import { AspectRatio } from '@rs-kit/ui-kit'
import { ComponentDoc } from '@/components/ComponentDoc'

export default function AspectRatioSample() {
	return (
		<ComponentDoc
			title="Aspect Ratio"
			description="Displays content within a desired ratio."
			component={
				<div className="grid w-full max-w-sm items-start gap-4">
					<AspectRatio ratio={16 / 9} className="bg-muted">
						<img
							src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
							alt="Photo by Drew Beamer"
							className="h-full w-full rounded-md object-cover dark:brightness-[0.2] dark:grayscale"
						/>
					</AspectRatio>
					<AspectRatio ratio={1 / 1} className="bg-muted">
						<img
							src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
							alt="Photo by Drew Beamer"
							className="h-full w-full rounded-md object-cover dark:brightness-[0.2] dark:grayscale"
						/>
					</AspectRatio>
				</div>
			}
		/>
	)
}
