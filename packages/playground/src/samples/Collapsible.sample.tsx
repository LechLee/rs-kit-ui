import { Collapsible } from 'ui-kit'
import { ComponentDoc } from '../components/ComponentDoc'
import { useState } from 'react'

export default function CollapsibleSample() {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<ComponentDoc
			title="Collapsible"
			description="An interactive component which expands/collapses a panel."
			component={
				<Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full max-w-md space-y-2">
					<div className="flex items-center justify-between space-x-4 px-4">
						<h4 className="text-sm font-semibold">@peduarte starred 3 repositories</h4>
						<button onClick={() => setIsOpen(!isOpen)} className="rounded-full h-8 w-8 flex items-center justify-center border">
							{isOpen ? '−' : '+'}
						</button>
					</div>
					<div className="px-4 pb-2 text-sm">
						<div className="rounded-md border px-4 py-3 font-mono text-sm">@radix-ui/primitives</div>
					</div>
					<div className={`px-4 pb-2 text-sm ${isOpen ? 'block' : 'hidden'}`}>
						<div className="rounded-md border px-4 py-3 font-mono text-sm">@radix-ui/colors</div>
						<div className="mt-2 rounded-md border px-4 py-3 font-mono text-sm">@stitches/react</div>
					</div>
				</Collapsible>
			}
		/>
	)
}
