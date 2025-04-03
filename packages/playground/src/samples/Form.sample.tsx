import { Button, Form, Input } from 'ui-kit'
import { ComponentDoc } from '../components/ComponentDoc'

export default function FormSample() {
	return (
		<ComponentDoc
			title="Form"
			description="Building forms with validation."
			component={
				<div className="w-full max-w-md">
					<form className="space-y-6">
						<div className="space-y-2">
							<label htmlFor="email" className="text-sm font-medium">
								Email
							</label>
							<Input id="email" type="email" placeholder="example@example.com" />
						</div>
						<div className="space-y-2">
							<label htmlFor="password" className="text-sm font-medium">
								Password
							</label>
							<Input id="password" type="password" />
						</div>
						<Button type="submit" className="w-full">
							Submit
						</Button>
					</form>
				</div>
			}
		/>
	)
}
