import { Calendar, Home, Inbox, Search, Settings } from 'lucide-react'
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarInset,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarTrigger
} from '@rs-kit/ui-kit'
import { ComponentDoc } from '@/components/ComponentDoc'

// Menu items.
const items = [
	{
		title: 'Home',
		url: '#',
		icon: Home
	},
	{
		title: 'Inbox',
		url: '#',
		icon: Inbox
	},
	{
		title: 'Calendar',
		url: '#',
		icon: Calendar
	},
	{
		title: 'Search',
		url: '#',
		icon: Search
	},
	{
		title: 'Settings',
		url: '#',
		icon: Settings
	}
]

export default function SidebarSample() {
	return (
		<ComponentDoc
			title="Sidebar"
			description="A responsive sidebar navigation component."
			component={
				<SidebarProvider>
					<Sidebar>
						<SidebarContent>
							<SidebarGroup>
								<SidebarGroupLabel>Application</SidebarGroupLabel>
								<SidebarGroupContent>
									<SidebarMenu>
										{items.map((item) => (
											<SidebarMenuItem key={item.title}>
												<SidebarMenuButton asChild>
													<a href={item.url}>
														<item.icon />
														<span>{item.title}</span>
													</a>
												</SidebarMenuButton>
											</SidebarMenuItem>
										))}
									</SidebarMenu>
								</SidebarGroupContent>
							</SidebarGroup>
						</SidebarContent>
					</Sidebar>
					<SidebarInset>
						<header className="flex items-center justify-between px-4 h-12">
							<SidebarTrigger />
						</header>
					</SidebarInset>
				</SidebarProvider>
			}
		/>
	)
}
