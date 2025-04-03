import { Slider } from 'ui-kit'
import { ComponentDoc } from '../components/ComponentDoc'

export default function SliderSample() {
	return (
		<ComponentDoc
			title="Slider"
			description="An input slider control that allows users to select a value from a range."
			component={
				<div className="w-full max-w-md">
					<div className="w-full h-10 flex items-center relative">
						<div className="w-full h-2 bg-muted rounded-full relative">
							<div className="absolute h-full w-[65%] bg-primary rounded-full"></div>
							<div className="absolute h-5 w-5 bg-primary rounded-full -top-1.5 left-[65%] -ml-2.5"></div>
						</div>
					</div>
					<div className="flex justify-between text-xs text-muted-foreground mt-1">
						<span>0%</span>
						<span>65%</span>
						<span>100%</span>
					</div>
				</div>
			}
		/>
	)
}
