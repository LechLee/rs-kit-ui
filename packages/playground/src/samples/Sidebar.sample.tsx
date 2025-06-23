import { Fragment, useState } from 'react'
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
	SidebarTrigger,
	Label,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Badge,
	Switch,
	Button,
	Avatar,
	AvatarFallback,
	AvatarImage,
	Progress,
	Separator
} from '@rs-kit/ui-kit'
import {
	Calendar,
	Home,
	Inbox,
	Search,
	Settings,
	BarChartIcon,
	UsersIcon,
	ShoppingCartIcon,
	PackageIcon,
	TruckIcon,
	CreditCardIcon,
	FolderIcon,
	FileTextIcon,
	ImageIcon,
	VideoIcon,
	MusicIcon,
	DownloadIcon,
	TrashIcon,
	StarIcon,
	HeartIcon,
	BookmarkIcon,
	ClockIcon,
	PlusIcon,
	UserIcon,
	MessageSquareIcon,
	BellIcon,
	HelpCircleIcon,
	LogOutIcon,
	LayoutDashboardIcon,
	FileIcon,
	DatabaseIcon,
	CodeIcon,
	PaletteIcon,
	ShieldIcon,
	MonitorIcon,
	SmartphoneIcon,
	TabletIcon,
	InfoIcon,
	MenuIcon,
	BuildingIcon,
	MapPinIcon,
	PhoneIcon,
	MailIcon
} from 'lucide-react'
import { ComponentDoc } from '@/components/ComponentDoc'

// Dashboard Sidebar
const DashboardSidebar = () => {
	const [activeItem, setActiveItem] = useState('dashboard')

	const navigationItems = [
		{ id: 'dashboard', title: 'Dashboard', icon: LayoutDashboardIcon, url: '#' },
		{ id: 'analytics', title: 'Analytics', icon: BarChartIcon, url: '#', badge: 'New' },
		{ id: 'customers', title: 'Customers', icon: UsersIcon, url: '#' },
		{ id: 'orders', title: 'Orders', icon: ShoppingCartIcon, url: '#', badge: '12' },
		{ id: 'products', title: 'Products', icon: PackageIcon, url: '#' }
	]

	const managementItems = [
		{ id: 'shipping', title: 'Shipping', icon: TruckIcon, url: '#' },
		{ id: 'payments', title: 'Payments', icon: CreditCardIcon, url: '#' },
		{ id: 'settings', title: 'Settings', icon: Settings, url: '#' }
	]

	const accountItems = [
		{ id: 'profile', title: 'Profile', icon: UserIcon, url: '#' },
		{ id: 'help', title: 'Help & Support', icon: HelpCircleIcon, url: '#' },
		{ id: 'logout', title: 'Log out', icon: LogOutIcon, url: '#' }
	]

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold flex items-center gap-2">
					<LayoutDashboardIcon className="w-5 h-5" />
					Business Dashboard
				</Label>
				<p className="text-sm text-muted-foreground">E-commerce admin panel with organized navigation and user profile</p>
			</div>

			<div className="h-[600px] border rounded-lg overflow-hidden">
				<SidebarProvider>
					<Sidebar>
						<SidebarContent className="gap-6">
							{/* User Profile */}
							<div className="px-4 pt-4">
								<div className="flex items-center gap-3">
									<Avatar className="w-10 h-10">
										<AvatarImage src="https://github.com/shadcn.png" />
										<AvatarFallback>JD</AvatarFallback>
									</Avatar>
									<div className="flex-1 min-w-0">
										<p className="font-semibold text-sm">John Doe</p>
										<p className="text-xs text-muted-foreground">Admin</p>
									</div>
								</div>
							</div>

							{/* Main Navigation */}
							<SidebarGroup>
								<SidebarGroupLabel>Main Menu</SidebarGroupLabel>
								<SidebarGroupContent>
									<SidebarMenu>
										{navigationItems.map((item) => (
											<SidebarMenuItem key={item.id}>
												<SidebarMenuButton 
													asChild 
													isActive={activeItem === item.id}
													onClick={() => setActiveItem(item.id)}
												>
													<a href={item.url} className="flex items-center justify-between">
														<div className="flex items-center gap-2">
															<item.icon className="w-4 h-4" />
															<span>{item.title}</span>
														</div>
														{item.badge && (
															<Badge variant={item.badge === 'New' ? 'default' : 'secondary'} className="text-xs">
																{item.badge}
															</Badge>
														)}
													</a>
												</SidebarMenuButton>
											</SidebarMenuItem>
										))}
									</SidebarMenu>
								</SidebarGroupContent>
							</SidebarGroup>

							{/* Management */}
							<SidebarGroup>
								<SidebarGroupLabel>Management</SidebarGroupLabel>
								<SidebarGroupContent>
									<SidebarMenu>
										{managementItems.map((item) => (
											<SidebarMenuItem key={item.id}>
												<SidebarMenuButton 
													asChild 
													isActive={activeItem === item.id}
													onClick={() => setActiveItem(item.id)}
												>
													<a href={item.url}>
														<item.icon className="w-4 h-4" />
														<span>{item.title}</span>
													</a>
												</SidebarMenuButton>
											</SidebarMenuItem>
										))}
									</SidebarMenu>
								</SidebarGroupContent>
							</SidebarGroup>

							{/* Storage Usage */}
							<div className="px-4">
								<div className="p-3 bg-muted rounded-lg">
									<div className="flex items-center justify-between mb-2">
										<span className="text-xs font-medium">Storage</span>
										<span className="text-xs text-muted-foreground">68%</span>
									</div>
									<Progress value={68} className="h-2" />
									<p className="text-xs text-muted-foreground mt-1">6.8 GB of 10 GB used</p>
								</div>
							</div>

							{/* Account */}
							<SidebarGroup className="mt-auto">
								<SidebarGroupLabel>Account</SidebarGroupLabel>
								<SidebarGroupContent>
									<SidebarMenu>
										{accountItems.map((item) => (
											<SidebarMenuItem key={item.id}>
												<SidebarMenuButton 
													asChild 
													isActive={activeItem === item.id}
													onClick={() => setActiveItem(item.id)}
												>
													<a href={item.url}>
														<item.icon className="w-4 h-4" />
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
						<header className="flex items-center justify-between px-6 h-14 border-b">
							<SidebarTrigger />
							<div className="flex items-center gap-4">
								<Button variant="ghost" size="sm">
									<BellIcon className="w-4 h-4" />
								</Button>
								<Button variant="ghost" size="sm">
									<MessageSquareIcon className="w-4 h-4" />
								</Button>
							</div>
						</header>
						<main className="p-6">
							<div className="space-y-6">
								<div>
									<h1 className="text-2xl font-bold">Dashboard</h1>
									<p className="text-muted-foreground">Welcome back, John! Here's your business overview.</p>
								</div>
								<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
									<Card>
										<CardContent className="p-6">
											<div className="flex items-center justify-between">
												<div>
													<p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
													<p className="text-2xl font-bold">$45,231</p>
												</div>
												<div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
													<span className="text-green-600 text-sm">$</span>
												</div>
											</div>
										</CardContent>
									</Card>
									<Card>
										<CardContent className="p-6">
											<div className="flex items-center justify-between">
												<div>
													<p className="text-sm font-medium text-muted-foreground">Orders</p>
													<p className="text-2xl font-bold">1,234</p>
												</div>
												<div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
													<ShoppingCartIcon className="w-4 h-4 text-blue-600" />
												</div>
											</div>
										</CardContent>
									</Card>
									<Card>
										<CardContent className="p-6">
											<div className="flex items-center justify-between">
												<div>
													<p className="text-sm font-medium text-muted-foreground">Customers</p>
													<p className="text-2xl font-bold">5,678</p>
												</div>
												<div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
													<UsersIcon className="w-4 h-4 text-purple-600" />
												</div>
											</div>
										</CardContent>
									</Card>
								</div>
							</div>
						</main>
					</SidebarInset>
				</SidebarProvider>
			</div>
		</div>
	)
}

// File Manager Sidebar
const FileManagerSidebar = () => {
	const [activeFolder, setActiveFolder] = useState('documents')

	const quickAccessItems = [
		{ id: 'recent', title: 'Recent Files', icon: ClockIcon, url: '#' },
		{ id: 'starred', title: 'Starred', icon: StarIcon, url: '#' },
		{ id: 'shared', title: 'Shared with me', icon: UsersIcon, url: '#' }
	]

	const folderItems = [
		{ id: 'documents', title: 'Documents', icon: FileTextIcon, url: '#', count: 24 },
		{ id: 'images', title: 'Images', icon: ImageIcon, url: '#', count: 156 },
		{ id: 'videos', title: 'Videos', icon: VideoIcon, url: '#', count: 12 },
		{ id: 'music', title: 'Music', icon: MusicIcon, url: '#', count: 89 },
		{ id: 'downloads', title: 'Downloads', icon: DownloadIcon, url: '#', count: 45 }
	]

	const storageData = {
		used: 45.2,
		total: 100,
		percentage: 45
	}

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold flex items-center gap-2">
					<FolderIcon className="w-5 h-5" />
					File Manager
				</Label>
				<p className="text-sm text-muted-foreground">Cloud storage interface with file organization and storage tracking</p>
			</div>

			<div className="h-[600px] border rounded-lg overflow-hidden">
				<SidebarProvider>
					<Sidebar>
						<SidebarContent className="gap-6">
							{/* Header */}
							<div className="px-4 pt-4">
								<Button className="w-full" size="sm">
									<PlusIcon className="w-4 h-4 mr-2" />
									Upload Files
								</Button>
							</div>

							{/* Quick Access */}
							<SidebarGroup>
								<SidebarGroupLabel>Quick Access</SidebarGroupLabel>
								<SidebarGroupContent>
									<SidebarMenu>
										{quickAccessItems.map((item) => (
											<SidebarMenuItem key={item.id}>
												<SidebarMenuButton 
													asChild 
													isActive={activeFolder === item.id}
													onClick={() => setActiveFolder(item.id)}
												>
													<a href={item.url}>
														<item.icon className="w-4 h-4" />
														<span>{item.title}</span>
													</a>
												</SidebarMenuButton>
											</SidebarMenuItem>
										))}
									</SidebarMenu>
								</SidebarGroupContent>
							</SidebarGroup>

							{/* Folders */}
							<SidebarGroup>
								<SidebarGroupLabel>Folders</SidebarGroupLabel>
								<SidebarGroupContent>
									<SidebarMenu>
										{folderItems.map((item) => (
											<SidebarMenuItem key={item.id}>
												<SidebarMenuButton 
													asChild 
													isActive={activeFolder === item.id}
													onClick={() => setActiveFolder(item.id)}
												>
													<a href={item.url} className="flex items-center justify-between">
														<div className="flex items-center gap-2">
															<item.icon className="w-4 h-4" />
															<span>{item.title}</span>
														</div>
														<span className="text-xs text-muted-foreground">{item.count}</span>
													</a>
												</SidebarMenuButton>
											</SidebarMenuItem>
										))}
									</SidebarMenu>
								</SidebarGroupContent>
							</SidebarGroup>

							{/* Storage */}
							<div className="px-4">
								<div className="p-3 bg-muted rounded-lg">
									<div className="flex items-center justify-between mb-2">
										<span className="text-xs font-medium">Storage Used</span>
										<span className="text-xs text-muted-foreground">{storageData.percentage}%</span>
									</div>
									<Progress value={storageData.percentage} className="h-2" />
									<p className="text-xs text-muted-foreground mt-1">
										{storageData.used} GB of {storageData.total} GB used
									</p>
									<Button variant="outline" size="sm" className="w-full mt-2">
										Upgrade Storage
									</Button>
								</div>
							</div>

							{/* Trash */}
							<SidebarGroup className="mt-auto">
								<SidebarGroupContent>
									<SidebarMenu>
										<SidebarMenuItem>
											<SidebarMenuButton asChild>
												<a href="#" className="text-muted-foreground">
													<TrashIcon className="w-4 h-4" />
													<span>Trash</span>
												</a>
											</SidebarMenuButton>
										</SidebarMenuItem>
									</SidebarMenu>
								</SidebarGroupContent>
							</SidebarGroup>
						</SidebarContent>
					</Sidebar>
					<SidebarInset>
						<header className="flex items-center justify-between px-6 h-14 border-b">
							<SidebarTrigger />
							<div className="flex items-center gap-4">
								<Button variant="ghost" size="sm">
									<Search className="w-4 h-4" />
								</Button>
								<Button variant="ghost" size="sm">
									<Settings className="w-4 h-4" />
								</Button>
							</div>
						</header>
						<main className="p-6">
							<div className="space-y-6">
								<div>
									<h1 className="text-2xl font-bold">Documents</h1>
									<p className="text-muted-foreground">Your document files and folders</p>
								</div>
								<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
									{[
										{ name: 'Project Proposal.pdf', type: 'PDF', size: '2.4 MB', modified: '2 hours ago' },
										{ name: 'Meeting Notes.docx', type: 'Word', size: '1.2 MB', modified: '1 day ago' },
										{ name: 'Budget Report.xlsx', type: 'Excel', size: '856 KB', modified: '3 days ago' },
										{ name: 'Presentation.pptx', type: 'PowerPoint', size: '15.2 MB', modified: '1 week ago' }
									].map((file, index) => (
										<Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
											<CardContent className="p-4">
												<div className="text-center space-y-2">
													<FileTextIcon className="w-8 h-8 mx-auto text-blue-600" />
													<div>
														<p className="font-medium text-sm">{file.name}</p>
														<p className="text-xs text-muted-foreground">{file.size}</p>
														<p className="text-xs text-muted-foreground">{file.modified}</p>
													</div>
												</div>
											</CardContent>
										</Card>
									))}
								</div>
							</div>
						</main>
					</SidebarInset>
				</SidebarProvider>
			</div>
		</div>
	)
}

// Corporate Website Sidebar
const CorporateWebsiteSidebar = () => {
	const [activeSection, setActiveSection] = useState('home')

	const mainItems = [
		{ id: 'home', title: 'Home', icon: Home, url: '#' },
		{ id: 'about', title: 'About Us', icon: InfoIcon, url: '#' },
		{ id: 'services', title: 'Services', icon: BuildingIcon, url: '#' },
		{ id: 'contact', title: 'Contact', icon: PhoneIcon, url: '#' }
	]

	const resourceItems = [
		{ id: 'blog', title: 'Blog', icon: FileTextIcon, url: '#' },
		{ id: 'case-studies', title: 'Case Studies', icon: BarChartIcon, url: '#' },
		{ id: 'downloads', title: 'Downloads', icon: DownloadIcon, url: '#' },
		{ id: 'faq', title: 'FAQ', icon: HelpCircleIcon, url: '#' }
	]

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold flex items-center gap-2">
					<BuildingIcon className="w-5 h-5" />
					Corporate Website
				</Label>
				<p className="text-sm text-muted-foreground">Professional business website with company information and contact details</p>
			</div>

			<div className="h-[600px] border rounded-lg overflow-hidden">
				<SidebarProvider>
					<Sidebar>
						<SidebarContent className="gap-6">
							{/* Company Logo */}
							<div className="px-4 pt-4">
								<div className="flex items-center gap-3">
									<div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
										<span className="text-white font-bold text-lg">TC</span>
									</div>
									<div>
										<p className="font-bold text-sm">TechCorp</p>
										<p className="text-xs text-muted-foreground">Solutions</p>
									</div>
								</div>
							</div>

							{/* Main Navigation */}
							<SidebarGroup>
								<SidebarGroupLabel>Main</SidebarGroupLabel>
								<SidebarGroupContent>
									<SidebarMenu>
										{mainItems.map((item) => (
											<SidebarMenuItem key={item.id}>
												<SidebarMenuButton 
													asChild 
													isActive={activeSection === item.id}
													onClick={() => setActiveSection(item.id)}
												>
													<a href={item.url}>
														<item.icon className="w-4 h-4" />
														<span>{item.title}</span>
													</a>
												</SidebarMenuButton>
											</SidebarMenuItem>
										))}
									</SidebarMenu>
								</SidebarGroupContent>
							</SidebarGroup>

							{/* Resources */}
							<SidebarGroup>
								<SidebarGroupLabel>Resources</SidebarGroupLabel>
								<SidebarGroupContent>
									<SidebarMenu>
										{resourceItems.map((item) => (
											<SidebarMenuItem key={item.id}>
												<SidebarMenuButton 
													asChild 
													isActive={activeSection === item.id}
													onClick={() => setActiveSection(item.id)}
												>
													<a href={item.url}>
														<item.icon className="w-4 h-4" />
														<span>{item.title}</span>
													</a>
												</SidebarMenuButton>
											</SidebarMenuItem>
										))}
									</SidebarMenu>
								</SidebarGroupContent>
							</SidebarGroup>

							{/* Contact Info */}
							<div className="px-4">
								<div className="p-3 bg-muted rounded-lg">
									<h4 className="font-semibold text-sm mb-3">Get in Touch</h4>
									<div className="space-y-2">
										<div className="flex items-center gap-2 text-xs">
											<PhoneIcon className="w-3 h-3" />
											<span>+1 (555) 123-4567</span>
										</div>
										<div className="flex items-center gap-2 text-xs">
											<MailIcon className="w-3 h-3" />
											<span>info@techcorp.com</span>
										</div>
										<div className="flex items-center gap-2 text-xs">
											<MapPinIcon className="w-3 h-3" />
											<span>San Francisco, CA</span>
										</div>
									</div>
									<Button size="sm" className="w-full mt-3">
										Contact Us
									</Button>
								</div>
							</div>

							{/* Social Links */}
							<SidebarGroup className="mt-auto">
								<SidebarGroupLabel>Follow Us</SidebarGroupLabel>
								<SidebarGroupContent>
									<div className="px-4">
										<div className="flex gap-2">
											<Button variant="outline" size="sm" className="flex-1">
												LinkedIn
											</Button>
											<Button variant="outline" size="sm" className="flex-1">
												Twitter
											</Button>
										</div>
									</div>
								</SidebarGroupContent>
							</SidebarGroup>
						</SidebarContent>
					</Sidebar>
					<SidebarInset>
						<header className="flex items-center justify-between px-6 h-14 border-b">
							<SidebarTrigger />
							<div className="flex items-center gap-4">
								<Button variant="outline" size="sm">
									Get Quote
								</Button>
								<Button size="sm">
									Contact Sales
								</Button>
							</div>
						</header>
						<main className="p-6">
							<div className="space-y-6">
								<div>
									<h1 className="text-3xl font-bold">Welcome to TechCorp</h1>
									<p className="text-xl text-muted-foreground">Innovative technology solutions for modern businesses</p>
								</div>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
									<Card>
										<CardHeader>
											<CardTitle>Our Services</CardTitle>
											<CardDescription>Comprehensive technology solutions tailored to your needs</CardDescription>
										</CardHeader>
										<CardContent>
											<ul className="space-y-2 text-sm">
												<li>• Cloud Infrastructure</li>
												<li>• Software Development</li>
												<li>• Digital Transformation</li>
												<li>• IT Consulting</li>
											</ul>
										</CardContent>
									</Card>
									<Card>
										<CardHeader>
											<CardTitle>Why Choose Us</CardTitle>
											<CardDescription>20+ years of experience delivering results</CardDescription>
										</CardHeader>
										<CardContent>
											<ul className="space-y-2 text-sm">
												<li>• Expert Team</li>
												<li>• Proven Track Record</li>
												<li>• 24/7 Support</li>
												<li>• Scalable Solutions</li>
											</ul>
										</CardContent>
									</Card>
								</div>
							</div>
						</main>
					</SidebarInset>
				</SidebarProvider>
			</div>
		</div>
	)
}

// Basic Sidebar Examples
const BasicSidebarExamples = () => {
	const basicItems = [
		{ title: 'Home', icon: Home, url: '#' },
		{ title: 'Inbox', icon: Inbox, url: '#' },
		{ title: 'Calendar', icon: Calendar, url: '#' },
		{ title: 'Search', icon: Search, url: '#' },
		{ title: 'Settings', icon: Settings, url: '#' }
	]

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold">Basic Sidebar Examples</Label>
				<p className="text-sm text-muted-foreground">Simple sidebar configurations for different applications</p>
			</div>

			<div className="space-y-8">
				<div>
					<Label className="font-medium mb-3 block">Simple Navigation</Label>
					<div className="h-[300px] border rounded-lg overflow-hidden">
						<SidebarProvider>
							<Sidebar>
								<SidebarContent>
									<SidebarGroup>
										<SidebarGroupLabel>Application</SidebarGroupLabel>
										<SidebarGroupContent>
											<SidebarMenu>
												{basicItems.map((item) => (
													<SidebarMenuItem key={item.title}>
														<SidebarMenuButton asChild>
															<a href={item.url}>
																<item.icon className="w-4 h-4" />
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
								<header className="flex items-center justify-between px-4 h-12 border-b">
									<SidebarTrigger />
									<span className="text-sm font-medium">Application</span>
								</header>
								<main className="p-4">
									<p className="text-muted-foreground">Main content area</p>
								</main>
							</SidebarInset>
						</SidebarProvider>
					</div>
				</div>

				<div>
					<Label className="font-medium mb-3 block">With Groups</Label>
					<div className="h-[300px] border rounded-lg overflow-hidden">
						<SidebarProvider>
							<Sidebar>
								<SidebarContent>
									<SidebarGroup>
										<SidebarGroupLabel>Main</SidebarGroupLabel>
										<SidebarGroupContent>
											<SidebarMenu>
												<SidebarMenuItem>
													<SidebarMenuButton asChild>
														<a href="#">
															<Home className="w-4 h-4" />
															<span>Dashboard</span>
														</a>
													</SidebarMenuButton>
												</SidebarMenuItem>
												<SidebarMenuItem>
													<SidebarMenuButton asChild>
														<a href="#">
															<BarChartIcon className="w-4 h-4" />
															<span>Analytics</span>
														</a>
													</SidebarMenuButton>
												</SidebarMenuItem>
											</SidebarMenu>
										</SidebarGroupContent>
									</SidebarGroup>
									<SidebarGroup>
										<SidebarGroupLabel>Settings</SidebarGroupLabel>
										<SidebarGroupContent>
											<SidebarMenu>
												<SidebarMenuItem>
													<SidebarMenuButton asChild>
														<a href="#">
															<UserIcon className="w-4 h-4" />
															<span>Profile</span>
														</a>
													</SidebarMenuButton>
												</SidebarMenuItem>
												<SidebarMenuItem>
													<SidebarMenuButton asChild>
														<a href="#">
															<Settings className="w-4 h-4" />
															<span>Preferences</span>
														</a>
													</SidebarMenuButton>
												</SidebarMenuItem>
											</SidebarMenu>
										</SidebarGroupContent>
									</SidebarGroup>
								</SidebarContent>
							</Sidebar>
							<SidebarInset>
								<header className="flex items-center px-4 h-12 border-b">
									<SidebarTrigger />
								</header>
								<main className="p-4">
									<p className="text-muted-foreground">Content with grouped navigation</p>
								</main>
							</SidebarInset>
						</SidebarProvider>
					</div>
				</div>
			</div>
		</div>
	)
}

export default function SidebarSample() {
	const [showAdvanced, setShowAdvanced] = useState(false)

	return (
		<Fragment>
			<ComponentDoc
				title="Sidebar"
				description="Responsive sidebar navigation with collapsible panels and organized content. Perfect for dashboards, file managers, corporate sites, and any application requiring persistent navigation."
				component={
					<div className="flex flex-col gap-8 w-full max-w-7xl">
						{/* Controls */}
						<div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
							<div className="flex items-center gap-4">
								<div className="flex items-center space-x-2">
									<Switch id="show-advanced" checked={showAdvanced} onCheckedChange={setShowAdvanced} />
									<Label htmlFor="show-advanced" className="text-sm">
										Show Advanced Examples
									</Label>
								</div>
							</div>
							<Badge variant="outline">{showAdvanced ? '4' : '3'} Examples</Badge>
						</div>

						{/* Real-World Examples */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Application Interfaces</h3>
							<div className="grid grid-cols-1 gap-8">
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<LayoutDashboardIcon className="w-5 h-5" />
											Admin Dashboard
										</CardTitle>
										<CardDescription>Business management interface with comprehensive navigation and metrics</CardDescription>
									</CardHeader>
									<CardContent>
										<DashboardSidebar />
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<FolderIcon className="w-5 h-5" />
											File Manager
										</CardTitle>
										<CardDescription>Cloud storage interface with file organization and storage tracking</CardDescription>
									</CardHeader>
									<CardContent>
										<FileManagerSidebar />
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<BuildingIcon className="w-5 h-5" />
											Corporate Website
										</CardTitle>
										<CardDescription>Professional business website with company information and contact</CardDescription>
									</CardHeader>
									<CardContent>
										<CorporateWebsiteSidebar />
									</CardContent>
								</Card>
							</div>
						</div>

						{/* Basic Examples */}
						{showAdvanced && (
							<div>
								<h3 className="text-lg font-semibold mb-4">Basic Examples</h3>
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<MenuIcon className="w-5 h-5" />
											Simple Patterns
										</CardTitle>
										<CardDescription>Basic sidebar layouts for different applications</CardDescription>
									</CardHeader>
									<CardContent>
										<BasicSidebarExamples />
									</CardContent>
								</Card>
							</div>
						)}

						{/* Usage Guidelines */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<InfoIcon className="w-5 h-5" />
									Usage Guidelines
								</CardTitle>
								<CardDescription>Best practices for implementing sidebar navigation</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div>
										<h4 className="font-semibold mb-2">When to Use</h4>
										<ul className="space-y-1 text-sm text-muted-foreground">
											<li>• For applications with multiple main sections or features</li>
											<li>• In dashboard and admin interfaces requiring quick navigation</li>
											<li>• For file management and organization systems</li>
											<li>• In content management systems with hierarchical structure</li>
											<li>• When persistent navigation improves user workflow</li>
										</ul>
									</div>
									<Separator />
									<div>
										<h4 className="font-semibold mb-2">Design Principles</h4>
										<ul className="space-y-1 text-sm text-muted-foreground">
											<li>• Group related navigation items logically</li>
											<li>• Use clear icons and labels for easy recognition</li>
											<li>• Provide visual feedback for active/current sections</li>
											<li>• Consider collapsible states for mobile responsiveness</li>
											<li>• Include user context and status information when relevant</li>
											<li>• Maintain consistent spacing and visual hierarchy</li>
										</ul>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Interactive State Display */}
						<div className="mt-6 p-4 bg-gray-50 rounded-lg">
							<h4 className="text-sm font-semibold text-gray-700 mb-2">Current Settings:</h4>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
								<div>
									<p>
										<strong>Show Advanced:</strong> {showAdvanced ? 'Yes' : 'No'}
									</p>
									<p>
										<strong>Total Examples:</strong> {showAdvanced ? '4' : '3'}
									</p>
								</div>
								<div>
									<p>
										<strong>Applications:</strong> Dashboard, File Manager, Corporate{showAdvanced ? ', Basic' : ''}
									</p>
									<p>
										<strong>Features:</strong> Groups, Icons, Badges, User Context, Storage
									</p>
								</div>
							</div>
						</div>
					</div>
				}
			/>
		</Fragment>
	)
}
