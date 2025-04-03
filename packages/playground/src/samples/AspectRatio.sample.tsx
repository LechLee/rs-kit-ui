import { AspectRatio } from 'ui-kit'
import { ComponentDoc } from '../components/ComponentDoc'

export default function AspectRatioSample() {
	return (
		<ComponentDoc
			title="Aspect Ratio"
			description="Displays content within a desired ratio."
			component={
				<div className="w-full max-w-md">
					<AspectRatio ratio={16 / 9} className="bg-slate-100 rounded-md overflow-hidden">
						<img src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80" alt="Photo by Drew Beamer" className="object-cover w-full h-full" />
					</AspectRatio>
				</div>
			}
		/>
	)
}
