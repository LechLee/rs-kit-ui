import { Select } from 'ui-kit'
import { ComponentDoc } from '../components/ComponentDoc'

export default function SelectSample() {
	return (
		<ComponentDoc
			title="Select"
			description="Displays a list of options for the user to pick from—triggered by a button."
			component={
				<div className="w-full max-w-xs">
					<div className="relative">
						<select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
							<option value="default">Default</option>
							<option value="comfortable">Comfortable</option>
							<option value="compact">Compact</option>
						</select>
						<div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="h-4 w-4 opacity-50"
							>
								<path d="m6 9 6 6 6-6" />
							</svg>
						</div>
					</div>
				</div>
			}
		/>
	)
}
