import { Accordion } from 'ui-kit'
import { ComponentDoc } from '../components/ComponentDoc'

export default function AccordionSample() {
	return (
		<ComponentDoc
			title="Accordion"
			description="A vertically stacked set of interactive headings that each reveal a section of content."
			component={
				<Accordion type="single" collapsible className="w-full">
					<div>
						<h3 className="font-medium">Is it accessible?</h3>
						<div className="pt-2">Yes. It adheres to the WAI-ARIA design pattern.</div>
					</div>
					<div className="mt-4">
						<h3 className="font-medium">Is it styled?</h3>
						<div className="pt-2">Yes. It comes with default styles that matches the other components' aesthetic.</div>
					</div>
					<div className="mt-4">
						<h3 className="font-medium">Is it animated?</h3>
						<div className="pt-2">Yes. It's animated by default, but you can disable it if you prefer.</div>
					</div>
				</Accordion>
			}
		/>
	)
}
