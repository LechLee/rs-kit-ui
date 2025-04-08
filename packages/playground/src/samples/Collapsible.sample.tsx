import { ChevronsUpDown } from 'lucide-react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger, Button } from '@rs-kit/ui-kit'
import { ComponentDoc } from '@/components/ComponentDoc'
import { useState } from 'react'

export default function CollapsibleSample() {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<ComponentDoc
			title="Collapsible"
			description="An interactive component which expands/collapses a panel."
			component={
				<Collapsible open={isOpen} onOpenChange={setIsOpen} className="flex w-full flex-col gap-2 md:w-[350px]">
					<div className="flex items-center justify-between gap-4 px-4">
						<h4 className="line-clamp-1 text-sm font-semibold">@peduarte starred 3 repositories</h4>
						<CollapsibleTrigger asChild>
							<Button variant="ghost" size="sm">
								<ChevronsUpDown className="h-4 w-4" />
								<span className="sr-only">Toggle</span>
							</Button>
						</CollapsibleTrigger>
					</div>
					<div className="rounded-md border px-4 py-2 font-mono text-sm shadow-xs">@radix-ui/primitives</div>
					<CollapsibleContent className="flex flex-col gap-2">
						<div className="rounded-md border px-4 py-2 font-mono text-sm shadow-xs">@radix-ui/colors</div>
						<div className="rounded-md border px-4 py-2 font-mono text-sm shadow-xs">@stitches/react</div>
					</CollapsibleContent>
				</Collapsible>
			}
		/>
	)
}
