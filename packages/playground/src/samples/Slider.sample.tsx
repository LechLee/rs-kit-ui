import { Slider, cn } from '@rs-kit/ui-kit'
import { ComponentDoc } from '@/components/ComponentDoc'

export default function SliderSample() {
	return (
		<ComponentDoc
			title="Slider"
			description="An input slider control that allows users to select a value from a range."
			component={<Slider defaultValue={[50]} max={100} step={1} className={cn('w-[60%]')} />}
		/>
	)
}
