import { Sidebar } from 'ui-kit'
import { ComponentDoc } from '../components/ComponentDoc'

export default function SidebarSample() {
	return (
		<ComponentDoc
			title="Sidebar"
			description="A responsive sidebar navigation component."
			component={
				<div className="w-full max-w-xs">
					<div className="w-full h-[300px] border rounded-md overflow-hidden flex">
						<div className="w-[200px] bg-muted h-full border-r p-4">
							<div className="font-medium mb-4">Navigation</div>
							<div className="space-y-2">
								<div className="flex items-center space-x-2 p-2 rounded-md bg-primary/10 font-medium">
									<span>Dashboard</span>
								</div>
								<div className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted">
									<span>Settings</span>
								</div>
								<div className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted">
									<span>Users</span>
								</div>
								<div className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted">
									<span>Analytics</span>
								</div>
							</div>
						</div>
						<div className="flex-1 p-4">
							<div className="font-medium mb-2">Dashboard</div>
							<p className="text-sm text-muted-foreground">Overview of your account</p>
						</div>
					</div>
				</div>
			}
		/>
	)
}
