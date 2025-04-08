import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@rs-kit/ui-kit'
import { ComponentDoc } from '@/components/ComponentDoc'

export default function ResizableSample() {
	return (
		<ComponentDoc
			title="Resizable"
			description="Accessible resizable panel groups and handles."
			component={
				<div className="flex flex-col gap-6">
					With Handle
					<ResizablePanelGroup direction="horizontal" className="max-w-md rounded-lg border md:min-w-[450px]">
						<ResizablePanel defaultSize={50}>
							<div className="flex h-[200px] items-center justify-center p-6">
								<span className="font-semibold">One</span>
							</div>
						</ResizablePanel>
						<ResizableHandle withHandle />
						<ResizablePanel defaultSize={50}>
							<ResizablePanelGroup direction="vertical">
								<ResizablePanel defaultSize={25}>
									<div className="flex h-full items-center justify-center p-6">
										<span className="font-semibold">Two</span>
									</div>
								</ResizablePanel>
								<ResizableHandle withHandle />
								<ResizablePanel defaultSize={75}>
									<div className="flex h-full items-center justify-center p-6">
										<span className="font-semibold">Three</span>
									</div>
								</ResizablePanel>
							</ResizablePanelGroup>
						</ResizablePanel>
					</ResizablePanelGroup>
					Without Handle
					<ResizablePanelGroup direction="horizontal" className="max-w-md rounded-lg border md:min-w-[450px]">
						<ResizablePanel defaultSize={50}>
							<div className="flex h-[200px] items-center justify-center p-6">
								<span className="font-semibold">One</span>
							</div>
						</ResizablePanel>
						<ResizableHandle />
						<ResizablePanel defaultSize={50}>
							<ResizablePanelGroup direction="vertical">
								<ResizablePanel defaultSize={25}>
									<div className="flex h-full items-center justify-center p-6">
										<span className="font-semibold">Two</span>
									</div>
								</ResizablePanel>
								<ResizableHandle />
								<ResizablePanel defaultSize={75}>
									<div className="flex h-full items-center justify-center p-6">
										<span className="font-semibold">Three</span>
									</div>
								</ResizablePanel>
							</ResizablePanelGroup>
						</ResizablePanel>
					</ResizablePanelGroup>
				</div>
			}
		/>
	)
}
