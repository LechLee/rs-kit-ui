import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from 'ui-kit'
import { ComponentDoc } from '../components/ComponentDoc'

export default function ResizableSample() {
	return (
		<ComponentDoc
			title="Resizable"
			description="Accessible resizable panel groups and handles."
			component={
				<div className="h-[200px] max-w-md w-full rounded-lg border">
					<div className="flex h-full">
						<div className="flex-1 border-r p-4">
							<div className="font-medium">Panel One</div>
						</div>
						<div className="w-1 bg-border cursor-ew-resize" />
						<div className="flex-1 p-4">
							<div className="font-medium">Panel Two</div>
						</div>
					</div>
				</div>
			}
		/>
	)
}
