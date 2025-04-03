import { Carousel } from 'ui-kit'
import { ComponentDoc } from '../components/ComponentDoc'

export default function CarouselSample() {
	return (
		<ComponentDoc
			title="Carousel"
			description="A carousel component for cycling through elements."
			component={
				<Carousel className="w-full max-w-md">
					<div className="relative h-64 w-full">
						<div className="absolute inset-0 bg-blue-100 rounded-md flex items-center justify-center">
							<span className="text-2xl font-bold">Slide 1</span>
						</div>
					</div>
					<div className="relative h-64 w-full">
						<div className="absolute inset-0 bg-green-100 rounded-md flex items-center justify-center">
							<span className="text-2xl font-bold">Slide 2</span>
						</div>
					</div>
					<div className="relative h-64 w-full">
						<div className="absolute inset-0 bg-yellow-100 rounded-md flex items-center justify-center">
							<span className="text-2xl font-bold">Slide 3</span>
						</div>
					</div>
				</Carousel>
			}
		/>
	)
}
