import { Tabs } from 'ui-kit'
import { ComponentDoc } from '../components/ComponentDoc'

export default function TabsSample() {
	return (
		<ComponentDoc
			title="Tabs"
			description="A set of layered sections of content—known as tab panels—that display one panel at a time."
			component={
				<div className="w-full max-w-md">
					<div className="flex flex-col space-y-4">
						<div className="border-b flex">
							<div className="px-4 py-2 font-medium border-b-2 border-primary">Account</div>
							<div className="px-4 py-2 text-muted-foreground">Password</div>
							<div className="px-4 py-2 text-muted-foreground">Settings</div>
						</div>
						<div className="p-4">
							<div className="space-y-4">
								<div className="space-y-2">
									<label className="text-sm font-medium">Name</label>
									<input className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm" defaultValue="John Doe" />
								</div>
								<div className="space-y-2">
									<label className="text-sm font-medium">Email</label>
									<input className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm" defaultValue="john@example.com" />
								</div>
							</div>
						</div>
					</div>
				</div>
			}
		/>
	)
}
