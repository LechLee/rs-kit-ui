import { Separator } from 'ui-kit'
import { ComponentDoc } from '@/components/ComponentDoc'

export default function SeparatorSample() {
	return (
		<ComponentDoc
			title="Separator"
			description="Visually or semantically separates content."
			component={
				<div>
					<div className="space-y-1">
						<h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
						<p className="text-sm text-muted-foreground">An open-source UI component library.</p>
					</div>
					<Separator className="my-4" />
					<div className="flex h-5 items-center space-x-4 text-sm">
						<div>Blog</div>
						<Separator orientation="vertical" />
						<div>Docs</div>
						<Separator orientation="vertical" />
						<div>Source</div>
					</div>
				</div>
			}
		/>
	)
}
