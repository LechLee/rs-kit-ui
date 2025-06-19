import { Fragment, useState } from 'react'
import {
	Breadcrumb,
	BreadcrumbEllipsis,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	Button
} from '@rs-kit/ui-kit'
import { 
	HomeIcon,
	FolderIcon,
	FileIcon,
	SettingsIcon,
	UserIcon,
	ShoppingCartIcon,
	PackageIcon,
	TruckIcon,
	CreditCardIcon,
	BarChart3Icon,
	UsersIcon,
	BookIcon,
	CodeIcon,
	GlobeIcon,
	ServerIcon,
	DatabaseIcon,
	LayersIcon,
	MonitorIcon,
	SmartphoneIcon,
	TabletIcon,
	LaptopIcon,
	HeadphonesIcon,
	KeyboardIcon,
	MouseIcon,
	CameraIcon,
	Gamepad2Icon,
	MusicIcon,
	VideoIcon,
	ImageIcon,
	MapIcon,
	CalendarIcon,
	ChevronRightIcon
} from 'lucide-react'
import { ComponentDoc } from '@/components/ComponentDoc'

export default function BreadcrumbSample() {
	// State for interactive examples
	const [currentPath, setCurrentPath] = useState(['Home', 'Dashboard', 'Analytics'])
	const [ecommercePath, setEcommercePath] = useState(['Home', 'Products', 'Electronics', 'Laptops', 'Gaming Laptops'])
	const [filesPath, setFilesPath] = useState(['Home', 'Documents', 'Projects', '2024', 'Website Redesign'])
	
	// Sample navigation paths
	const samplePaths = {
		dashboard: ['Home', 'Dashboard'],
		analytics: ['Home', 'Dashboard', 'Analytics'],
		users: ['Home', 'Dashboard', 'Users'],
		settings: ['Home', 'Dashboard', 'Settings', 'General'],
		profile: ['Home', 'Dashboard', 'Settings', 'Profile']
	}

	// Interactive handlers
	const navigateToPath = (pathKey: keyof typeof samplePaths) => {
		setCurrentPath(samplePaths[pathKey])
	}

	const addToEcommercePath = (item: string) => {
		setEcommercePath(prev => [...prev, item])
	}

	const removeFromEcommercePath = (index: number) => {
		setEcommercePath(prev => prev.slice(0, index + 1))
	}

	return (
		<Fragment>
			<ComponentDoc
				title="Breadcrumb"
				description="Navigation component that shows the current page's location within a navigational hierarchy. Perfect for deep navigation structures, user orientation, and site navigation."
				component={
					<div className="flex flex-col gap-8 w-full max-w-4xl">
						{/* Basic Breadcrumbs */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Basic Breadcrumbs</h3>
							<div className="space-y-4">
								<div>
									<h4 className="text-sm font-medium text-gray-600 mb-2">Simple Navigation</h4>
									<Breadcrumb>
										<BreadcrumbList>
											<BreadcrumbItem>
												<BreadcrumbLink href="#">
													<HomeIcon className="w-4 h-4" />
													Home
												</BreadcrumbLink>
											</BreadcrumbItem>
											<BreadcrumbSeparator />
											<BreadcrumbItem>
												<BreadcrumbLink href="#">Products</BreadcrumbLink>
											</BreadcrumbItem>
											<BreadcrumbSeparator />
											<BreadcrumbItem>
												<BreadcrumbPage>Electronics</BreadcrumbPage>
											</BreadcrumbItem>
										</BreadcrumbList>
									</Breadcrumb>
								</div>

								<div>
									<h4 className="text-sm font-medium text-gray-600 mb-2">With Icons</h4>
									<Breadcrumb>
										<BreadcrumbList>
											<BreadcrumbItem>
												<BreadcrumbLink href="#" className="flex items-center gap-2">
													<HomeIcon className="w-4 h-4" />
													Home
												</BreadcrumbLink>
											</BreadcrumbItem>
											<BreadcrumbSeparator />
											<BreadcrumbItem>
												<BreadcrumbLink href="#" className="flex items-center gap-2">
													<FolderIcon className="w-4 h-4" />
													Documents
												</BreadcrumbLink>
											</BreadcrumbItem>
											<BreadcrumbSeparator />
											<BreadcrumbItem>
												<BreadcrumbPage className="flex items-center gap-2">
													<FileIcon className="w-4 h-4" />
													Report.pdf
												</BreadcrumbPage>
											</BreadcrumbItem>
										</BreadcrumbList>
									</Breadcrumb>
								</div>

								<div>
									<h4 className="text-sm font-medium text-gray-600 mb-2">Admin Dashboard</h4>
									<Breadcrumb>
										<BreadcrumbList>
											<BreadcrumbItem>
												<BreadcrumbLink href="#" className="flex items-center gap-2">
													<HomeIcon className="w-4 h-4" />
													Dashboard
												</BreadcrumbLink>
											</BreadcrumbItem>
											<BreadcrumbSeparator />
											<BreadcrumbItem>
												<BreadcrumbLink href="#" className="flex items-center gap-2">
													<UsersIcon className="w-4 h-4" />
													User Management
												</BreadcrumbLink>
											</BreadcrumbItem>
											<BreadcrumbSeparator />
											<BreadcrumbItem>
												<BreadcrumbPage className="flex items-center gap-2">
													<UserIcon className="w-4 h-4" />
													Edit User
												</BreadcrumbPage>
											</BreadcrumbItem>
										</BreadcrumbList>
									</Breadcrumb>
								</div>
							</div>
						</div>

						{/* Collapsed Breadcrumbs */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Collapsed Breadcrumbs with Dropdown</h3>
							<div className="space-y-4">
								<div>
									<h4 className="text-sm font-medium text-gray-600 mb-2">Deep File System Navigation</h4>
									<Breadcrumb>
										<BreadcrumbList>
											<BreadcrumbItem>
												<BreadcrumbLink href="#">
													<HomeIcon className="w-4 h-4" />
												</BreadcrumbLink>
											</BreadcrumbItem>
											<BreadcrumbSeparator />
											<BreadcrumbItem>
												<DropdownMenu>
													<DropdownMenuTrigger className="flex items-center gap-1">
														<BreadcrumbEllipsis className="h-4 w-4" />
														<span className="sr-only">Show more</span>
													</DropdownMenuTrigger>
													<DropdownMenuContent align="start">
														<DropdownMenuItem className="flex items-center gap-2">
															<FolderIcon className="w-4 h-4" />
															Documents
														</DropdownMenuItem>
														<DropdownMenuItem className="flex items-center gap-2">
															<FolderIcon className="w-4 h-4" />
															Projects
														</DropdownMenuItem>
														<DropdownMenuItem className="flex items-center gap-2">
															<FolderIcon className="w-4 h-4" />
															2024
														</DropdownMenuItem>
													</DropdownMenuContent>
												</DropdownMenu>
											</BreadcrumbItem>
											<BreadcrumbSeparator />
											<BreadcrumbItem>
												<BreadcrumbLink href="#">Client Work</BreadcrumbLink>
											</BreadcrumbItem>
											<BreadcrumbSeparator />
											<BreadcrumbItem>
												<BreadcrumbPage>Website Redesign</BreadcrumbPage>
											</BreadcrumbItem>
										</BreadcrumbList>
									</Breadcrumb>
								</div>

								<div>
									<h4 className="text-sm font-medium text-gray-600 mb-2">E-commerce Category</h4>
									<Breadcrumb>
										<BreadcrumbList>
											<BreadcrumbItem>
												<BreadcrumbLink href="#">
													<HomeIcon className="w-4 h-4" />
												</BreadcrumbLink>
											</BreadcrumbItem>
											<BreadcrumbSeparator />
											<BreadcrumbItem>
												<DropdownMenu>
													<DropdownMenuTrigger className="flex items-center gap-1">
														<BreadcrumbEllipsis className="h-4 w-4" />
														<span className="sr-only">Show categories</span>
													</DropdownMenuTrigger>
													<DropdownMenuContent align="start">
														<DropdownMenuItem className="flex items-center gap-2">
															<PackageIcon className="w-4 h-4" />
															All Products
														</DropdownMenuItem>
														<DropdownMenuItem className="flex items-center gap-2">
															<MonitorIcon className="w-4 h-4" />
															Electronics
														</DropdownMenuItem>
														<DropdownMenuItem className="flex items-center gap-2">
															<LaptopIcon className="w-4 h-4" />
															Computers
														</DropdownMenuItem>
													</DropdownMenuContent>
												</DropdownMenu>
											</BreadcrumbItem>
											<BreadcrumbSeparator />
											<BreadcrumbItem>
												<BreadcrumbLink href="#">Gaming Laptops</BreadcrumbLink>
											</BreadcrumbItem>
											<BreadcrumbSeparator />
											<BreadcrumbItem>
												<BreadcrumbPage>RTX 4080 Series</BreadcrumbPage>
											</BreadcrumbItem>
										</BreadcrumbList>
									</Breadcrumb>
								</div>

								<div>
									<h4 className="text-sm font-medium text-gray-600 mb-2">Documentation Site</h4>
									<Breadcrumb>
										<BreadcrumbList>
											<BreadcrumbItem>
												<BreadcrumbLink href="#" className="flex items-center gap-2">
													<BookIcon className="w-4 h-4" />
													Docs
												</BreadcrumbLink>
											</BreadcrumbItem>
											<BreadcrumbSeparator />
											<BreadcrumbItem>
												<DropdownMenu>
													<DropdownMenuTrigger className="flex items-center gap-1">
														<BreadcrumbEllipsis className="h-4 w-4" />
														<span className="sr-only">Show sections</span>
													</DropdownMenuTrigger>
													<DropdownMenuContent align="start">
														<DropdownMenuItem className="flex items-center gap-2">
															<BookIcon className="w-4 h-4" />
															Getting Started
														</DropdownMenuItem>
														<DropdownMenuItem className="flex items-center gap-2">
															<CodeIcon className="w-4 h-4" />
															API Reference
														</DropdownMenuItem>
														<DropdownMenuItem className="flex items-center gap-2">
															<LayersIcon className="w-4 h-4" />
															Components
														</DropdownMenuItem>
													</DropdownMenuContent>
												</DropdownMenu>
											</BreadcrumbItem>
											<BreadcrumbSeparator />
											<BreadcrumbItem>
												<BreadcrumbLink href="#">Navigation</BreadcrumbLink>
											</BreadcrumbItem>
											<BreadcrumbSeparator />
											<BreadcrumbItem>
												<BreadcrumbPage>Breadcrumb</BreadcrumbPage>
											</BreadcrumbItem>
										</BreadcrumbList>
									</Breadcrumb>
								</div>
							</div>
						</div>

						{/* Interactive Navigation */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Interactive Navigation</h3>
							<div className="space-y-4">
								<div>
									<h4 className="text-sm font-medium text-gray-600 mb-2">Dynamic Path (Click to Navigate)</h4>
									<div className="flex gap-2 mb-3">
										<Button size="sm" variant="outline" onClick={() => navigateToPath('dashboard')}>Dashboard</Button>
										<Button size="sm" variant="outline" onClick={() => navigateToPath('analytics')}>Analytics</Button>
										<Button size="sm" variant="outline" onClick={() => navigateToPath('users')}>Users</Button>
										<Button size="sm" variant="outline" onClick={() => navigateToPath('settings')}>Settings</Button>
										<Button size="sm" variant="outline" onClick={() => navigateToPath('profile')}>Profile</Button>
									</div>
									<Breadcrumb>
										<BreadcrumbList>
											{currentPath.map((item, index) => (
												<Fragment key={index}>
													{index === 0 ? (
														<BreadcrumbItem>
															<BreadcrumbLink href="#" className="flex items-center gap-2">
																<HomeIcon className="w-4 h-4" />
																{item}
															</BreadcrumbLink>
														</BreadcrumbItem>
													) : index === currentPath.length - 1 ? (
														<BreadcrumbItem>
															<BreadcrumbPage>{item}</BreadcrumbPage>
														</BreadcrumbItem>
													) : (
														<BreadcrumbItem>
															<BreadcrumbLink href="#">{item}</BreadcrumbLink>
														</BreadcrumbItem>
													)}
													{index < currentPath.length - 1 && <BreadcrumbSeparator />}
												</Fragment>
											))}
										</BreadcrumbList>
									</Breadcrumb>
								</div>

								<div>
									<h4 className="text-sm font-medium text-gray-600 mb-2">E-commerce Path Builder</h4>
									<div className="flex gap-2 mb-3">
										<Button size="sm" variant="outline" onClick={() => addToEcommercePath('MacBooks')}>MacBooks</Button>
										<Button size="sm" variant="outline" onClick={() => addToEcommercePath('MacBook Pro')}>MacBook Pro</Button>
										<Button size="sm" variant="outline" onClick={() => addToEcommercePath('14-inch')}>14-inch</Button>
										<Button size="sm" variant="destructive" onClick={() => setEcommercePath(['Home', 'Products'])}>Reset</Button>
									</div>
									<Breadcrumb>
										<BreadcrumbList>
											{ecommercePath.map((item, index) => (
												<Fragment key={index}>
													{index === 0 ? (
														<BreadcrumbItem>
															<BreadcrumbLink href="#" className="flex items-center gap-2">
																<HomeIcon className="w-4 h-4" />
																{item}
															</BreadcrumbLink>
														</BreadcrumbItem>
													) : index === ecommercePath.length - 1 ? (
														<BreadcrumbItem>
															<BreadcrumbPage>{item}</BreadcrumbPage>
														</BreadcrumbItem>
													) : (
														<BreadcrumbItem>
															<BreadcrumbLink 
																href="#" 
																onClick={() => removeFromEcommercePath(index)}
																className="hover:bg-gray-100 rounded px-1"
															>
																{item}
															</BreadcrumbLink>
														</BreadcrumbItem>
													)}
													{index < ecommercePath.length - 1 && <BreadcrumbSeparator />}
												</Fragment>
											))}
										</BreadcrumbList>
									</Breadcrumb>
									<p className="text-xs text-muted-foreground mt-2">Click breadcrumb items to navigate back</p>
								</div>
							</div>
						</div>

						{/* Specialized Use Cases */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Specialized Use Cases</h3>
							<div className="space-y-4">
								<div>
									<h4 className="text-sm font-medium text-gray-600 mb-2">E-commerce Checkout Flow</h4>
									<Breadcrumb>
										<BreadcrumbList>
											<BreadcrumbItem>
												<BreadcrumbLink href="#" className="flex items-center gap-2">
													<ShoppingCartIcon className="w-4 h-4" />
													Cart
												</BreadcrumbLink>
											</BreadcrumbItem>
											<BreadcrumbSeparator />
											<BreadcrumbItem>
												<BreadcrumbLink href="#" className="flex items-center gap-2">
													<TruckIcon className="w-4 h-4" />
													Shipping
												</BreadcrumbLink>
											</BreadcrumbItem>
											<BreadcrumbSeparator />
											<BreadcrumbItem>
												<BreadcrumbPage className="flex items-center gap-2">
													<CreditCardIcon className="w-4 h-4" />
													Payment
												</BreadcrumbPage>
											</BreadcrumbItem>
										</BreadcrumbList>
									</Breadcrumb>
								</div>

								<div>
									<h4 className="text-sm font-medium text-gray-600 mb-2">Multi-device Category</h4>
									<Breadcrumb>
										<BreadcrumbList>
											<BreadcrumbItem>
												<BreadcrumbLink href="#" className="flex items-center gap-2">
													<HomeIcon className="w-4 h-4" />
													Tech Store
												</BreadcrumbLink>
											</BreadcrumbItem>
											<BreadcrumbSeparator />
											<BreadcrumbItem>
												<DropdownMenu>
													<DropdownMenuTrigger className="flex items-center gap-1">
														<BreadcrumbEllipsis className="h-4 w-4" />
														<span className="sr-only">Browse categories</span>
													</DropdownMenuTrigger>
													<DropdownMenuContent align="start" className="w-48">
														<DropdownMenuItem className="flex items-center gap-2">
															<MonitorIcon className="w-4 h-4" />
															Desktops
														</DropdownMenuItem>
														<DropdownMenuItem className="flex items-center gap-2">
															<LaptopIcon className="w-4 h-4" />
															Laptops
														</DropdownMenuItem>
														<DropdownMenuItem className="flex items-center gap-2">
															<TabletIcon className="w-4 h-4" />
															Tablets
														</DropdownMenuItem>
														<DropdownMenuItem className="flex items-center gap-2">
															<SmartphoneIcon className="w-4 h-4" />
															Smartphones
														</DropdownMenuItem>
													</DropdownMenuContent>
												</DropdownMenu>
											</BreadcrumbItem>
											<BreadcrumbSeparator />
											<BreadcrumbItem>
												<BreadcrumbLink href="#" className="flex items-center gap-2">
													<HeadphonesIcon className="w-4 h-4" />
													Audio
												</BreadcrumbLink>
											</BreadcrumbItem>
											<BreadcrumbSeparator />
											<BreadcrumbItem>
												<BreadcrumbPage className="flex items-center gap-2">
													<MusicIcon className="w-4 h-4" />
													Wireless Earbuds
												</BreadcrumbPage>
											</BreadcrumbItem>
										</BreadcrumbList>
									</Breadcrumb>
								</div>

								<div>
									<h4 className="text-sm font-medium text-gray-600 mb-2">Content Management System</h4>
									<Breadcrumb>
										<BreadcrumbList>
											<BreadcrumbItem>
												<BreadcrumbLink href="#" className="flex items-center gap-2">
													<GlobeIcon className="w-4 h-4" />
													Website
												</BreadcrumbLink>
											</BreadcrumbItem>
											<BreadcrumbSeparator />
											<BreadcrumbItem>
												<BreadcrumbLink href="#" className="flex items-center gap-2">
													<BookIcon className="w-4 h-4" />
													Blog
												</BreadcrumbLink>
											</BreadcrumbItem>
											<BreadcrumbSeparator />
											<BreadcrumbItem>
												<BreadcrumbLink href="#" className="flex items-center gap-2">
													<CalendarIcon className="w-4 h-4" />
													2024
												</BreadcrumbLink>
											</BreadcrumbItem>
											<BreadcrumbSeparator />
											<BreadcrumbItem>
												<BreadcrumbPage>10 React Performance Tips</BreadcrumbPage>
											</BreadcrumbItem>
										</BreadcrumbList>
									</Breadcrumb>
								</div>

								<div>
									<h4 className="text-sm font-medium text-gray-600 mb-2">Server Management</h4>
									<Breadcrumb>
										<BreadcrumbList>
											<BreadcrumbItem>
												<BreadcrumbLink href="#" className="flex items-center gap-2">
													<ServerIcon className="w-4 h-4" />
													Servers
												</BreadcrumbLink>
											</BreadcrumbItem>
											<BreadcrumbSeparator />
											<BreadcrumbItem>
												<BreadcrumbLink href="#">Production</BreadcrumbLink>
											</BreadcrumbItem>
											<BreadcrumbSeparator />
											<BreadcrumbItem>
												<BreadcrumbLink href="#">web-server-01</BreadcrumbLink>
											</BreadcrumbItem>
											<BreadcrumbSeparator />
											<BreadcrumbItem>
												<BreadcrumbPage className="flex items-center gap-2">
													<DatabaseIcon className="w-4 h-4" />
													Logs
												</BreadcrumbPage>
											</BreadcrumbItem>
										</BreadcrumbList>
									</Breadcrumb>
								</div>
							</div>
						</div>

						{/* Current State Display */}
						<div className="mt-6 p-4 bg-gray-50 rounded-lg">
							<h4 className="text-sm font-semibold text-gray-700 mb-2">Interactive State:</h4>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
								<div>
									<p><strong>Current Path:</strong> {currentPath.join(' > ')}</p>
									<p><strong>E-commerce Path:</strong> {ecommercePath.join(' > ')}</p>
								</div>
								<div>
									<p><strong>Files Path:</strong> {filesPath.join(' > ')}</p>
									<p><strong>Path Depth:</strong> {currentPath.length} levels</p>
								</div>
							</div>
						</div>
					</div>
				}
			/>

			<ComponentDoc
				title="Breadcrumb Props & Usage Guidelines"
				description="Comprehensive guide to Breadcrumb component structure, navigation patterns, and best practices."
				component={
					<div className="flex flex-col gap-6 w-full max-w-4xl">
						{/* Props Reference */}
						<div className="p-4 bg-blue-50 rounded-lg">
							<h4 className="text-sm font-semibold text-blue-700 mb-2">Props Reference:</h4>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-600">
								<div>
									<strong>Breadcrumb:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li><code>children</code> - BreadcrumbList component</li>
										<li><code>className</code> - Additional CSS classes</li>
										<li>Root navigation container</li>
									</ul>
								</div>
								<div>
									<strong>BreadcrumbList:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li><code>children</code> - BreadcrumbItem components</li>
										<li><code>className</code> - List styling</li>
										<li>Ordered list semantic structure</li>
									</ul>
								</div>
								<div>
									<strong>BreadcrumbItem:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li><code>children</code> - BreadcrumbLink or BreadcrumbPage</li>
										<li><code>className</code> - Item styling</li>
										<li>Individual breadcrumb segment</li>
									</ul>
								</div>
								<div>
									<strong>BreadcrumbLink:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li><code>href</code> - Navigation URL</li>
										<li><code>onClick</code> - Click handler</li>
										<li><code>className</code> - Link styling</li>
									</ul>
								</div>
								<div>
									<strong>BreadcrumbPage:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li><code>children</code> - Current page name</li>
										<li><code>className</code> - Page styling</li>
										<li>Non-interactive current page</li>
									</ul>
								</div>
								<div>
									<strong>BreadcrumbSeparator:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li><code>className</code> - Separator styling</li>
										<li>Visual divider between items</li>
										<li>Automatically includes proper ARIA</li>
									</ul>
								</div>
								<div>
									<strong>BreadcrumbEllipsis:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li><code>className</code> - Ellipsis icon styling</li>
										<li>Indicates collapsed navigation</li>
										<li>Used with dropdown menus</li>
									</ul>
								</div>
								<div>
									<strong>Accessibility:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li>ARIA navigation landmarks</li>
										<li>Screen reader friendly</li>
										<li>Keyboard navigation support</li>
										<li>Semantic HTML structure</li>
									</ul>
								</div>
							</div>
						</div>

						{/* Usage Guidelines */}
						<div className="p-4 bg-green-50 rounded-lg">
							<h4 className="text-sm font-semibold text-green-700 mb-2">Usage Guidelines:</h4>
							<ul className="text-sm text-green-600 space-y-1 list-disc list-inside">
								<li><strong>When to Use:</strong> Deep navigation structures, file systems, e-commerce categories, documentation</li>
								<li><strong>Structure:</strong> Always start with home/root, show logical hierarchy, end with current page</li>
								<li><strong>Length:</strong> Keep reasonable length (3-7 items), use ellipsis dropdown for longer paths</li>
								<li><strong>Links:</strong> Make all parent items clickable, current page should not be a link</li>
								<li><strong>Icons:</strong> Use meaningful icons consistently, especially for home and common sections</li>
								<li><strong>Mobile:</strong> Consider truncation or horizontal scrolling on small screens</li>
								<li><strong>Dynamic Paths:</strong> Update breadcrumbs as users navigate through the application</li>
								<li><strong>Collapsed Navigation:</strong> Use dropdown menus for complex hierarchies with many levels</li>
							</ul>
						</div>

						{/* Code Examples */}
						<div className="p-4 bg-gray-100 rounded-lg">
							<h4 className="text-sm font-semibold text-gray-700 mb-2">Code Examples:</h4>
							<pre className="text-xs text-gray-600 overflow-x-auto whitespace-pre-wrap">
{`// Basic breadcrumb
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">
        <HomeIcon className="w-4 h-4" />
        Home
      </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/products">Products</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Current Page</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>

// With dropdown for collapsed items
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-1">
          <BreadcrumbEllipsis className="h-4 w-4" />
          <span className="sr-only">Show more</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem>Documents</DropdownMenuItem>
          <DropdownMenuItem>Projects</DropdownMenuItem>
          <DropdownMenuItem>2024</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Current File</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>

// Dynamic breadcrumb with React state
const [path, setPath] = useState(['Home', 'Dashboard', 'Settings'])

<Breadcrumb>
  <BreadcrumbList>
    {path.map((item, index) => (
      <Fragment key={index}>
        <BreadcrumbItem>
          {index === path.length - 1 ? (
            <BreadcrumbPage>{item}</BreadcrumbPage>
          ) : (
            <BreadcrumbLink 
              href="#" 
              onClick={() => setPath(path.slice(0, index + 1))}
            >
              {item}
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
        {index < path.length - 1 && <BreadcrumbSeparator />}
      </Fragment>
    ))}
  </BreadcrumbList>
</Breadcrumb>`}
							</pre>
						</div>

						{/* Design Guidelines */}
						<div className="p-4 bg-purple-50 rounded-lg">
							<h4 className="text-sm font-semibold text-purple-700 mb-2">Design Guidelines:</h4>
							<ul className="text-sm text-purple-600 space-y-1 list-disc list-inside">
								<li><strong>Visual Hierarchy:</strong> Use consistent typography and spacing, current page should be prominent</li>
								<li><strong>Separator Style:</strong> Use subtle separators (slashes, arrows, or dots) that don't compete with content</li>
								<li><strong>Link Styling:</strong> Distinguish between clickable links and current page with color/weight</li>
								<li><strong>Icon Usage:</strong> Use icons sparingly and meaningfully, maintain consistent size (16px)</li>
								<li><strong>Truncation:</strong> Truncate very long item names with ellipsis, show full text on hover</li>
								<li><strong>Responsive Design:</strong> Consider horizontal scrolling or stacking on mobile devices</li>
								<li><strong>Color Contrast:</strong> Ensure sufficient contrast for all interactive and text elements</li>
								<li><strong>Animation:</strong> Use subtle transitions when dynamically updating breadcrumb content</li>
							</ul>
						</div>
					</div>
				}
			/>
		</Fragment>
	)
}
