import { Menubar } from 'ui-kit'
import { ComponentDoc } from '../components/ComponentDoc'

export default function MenubarSample() {
	return (
		<ComponentDoc
			title="Menubar"
			description="A visually persistent menu common in desktop applications."
			component={
				<div className="w-full border-b">
					<div className="flex h-10 items-center px-4">
						<div className="flex items-center space-x-4">
							<div className="font-medium">File</div>
							<div className="font-medium">Edit</div>
							<div className="font-medium">View</div>
							<div className="font-medium">Help</div>
						</div>
					</div>
				</div>
			}
		/>
	)
}
