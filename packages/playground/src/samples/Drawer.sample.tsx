import { Button, Drawer } from 'ui-kit'
import { ComponentDoc } from '../components/ComponentDoc'
import { useState } from 'react'

export default function DrawerSample() {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<ComponentDoc
			title="Drawer"
			description="A panel that slides out from the edge of the screen."
			component={
				<div className="flex items-center justify-center">
					<Button onClick={() => setIsOpen(true)}>Open Drawer</Button>
					<div className={`fixed inset-0 z-50 bg-black/20 ${isOpen ? 'block' : 'hidden'}`}>
						<div className="fixed bottom-0 left-0 right-0 h-[300px] bg-white p-6 shadow-lg">
							<div className="flex h-full flex-col">
								<div className="flex items-center justify-between">
									<h3 className="text-lg font-semibold">Drawer Title</h3>
									<Button variant="ghost" onClick={() => setIsOpen(false)}>
										×
									</Button>
								</div>
								<div className="flex-1 overflow-auto py-4">
									<p>Drawer content</p>
								</div>
								<div className="flex justify-end gap-2">
									<Button variant="outline" onClick={() => setIsOpen(false)}>
										Cancel
									</Button>
									<Button onClick={() => setIsOpen(false)}>Submit</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			}
		/>
	)
}
