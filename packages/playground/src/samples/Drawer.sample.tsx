import { Fragment, useCallback, useState } from 'react'
import {
	Button,
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
	Label,
	Input,
	Textarea,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Switch,
	Checkbox,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Badge,
	Separator,
	Progress,
	Avatar,
	AvatarFallback,
	AvatarImage,
	Alert,
	AlertDescription
} from '@rs-kit/ui-kit'
import {
	Minus,
	Plus,
	MenuIcon,
	UserIcon,
	SettingsIcon,
	BellIcon,
	SearchIcon,
	HomeIcon,
	FileIcon,
	FolderIcon,
	ImageIcon,
	VideoIcon,
	MusicIcon,
	DownloadIcon,
	UploadIcon,
	TrashIcon,
	EditIcon,
	SaveIcon,
	XIcon,
	CheckIcon,
	InfoIcon,
	AlertTriangleIcon,
	RefreshCwIcon,
	FilterIcon,
	SortAscIcon,
	EyeIcon,
	HeartIcon,
	StarIcon,
	ShareIcon,
	MoreHorizontalIcon
} from 'lucide-react'
// import { Bar, BarChart, ResponsiveContainer } from 'recharts'
import { ComponentDoc } from '@/components/ComponentDoc'

// Sample data for charts and lists
const chartData = [
	{ goal: 400 },
	{ goal: 300 },
	{ goal: 200 },
	{ goal: 300 },
	{ goal: 200 },
	{ goal: 278 },
	{ goal: 189 },
	{ goal: 239 },
	{ goal: 300 },
	{ goal: 200 },
	{ goal: 278 },
	{ goal: 189 },
	{ goal: 349 }
]

const menuItems = [
	{ id: 'dashboard', label: 'Dashboard', icon: HomeIcon, href: '/dashboard' },
	{ id: 'projects', label: 'Projects', icon: FolderIcon, href: '/projects' },
	{ id: 'files', label: 'Files', icon: FileIcon, href: '/files' },
	{ id: 'settings', label: 'Settings', icon: SettingsIcon, href: '/settings' },
	{ id: 'notifications', label: 'Notifications', icon: BellIcon, href: '/notifications' }
]

const notificationItems = [
	{ id: 1, title: 'New message received', description: 'John sent you a new message', time: '2 min ago', type: 'message' },
	{ id: 2, title: 'File uploaded successfully', description: 'document.pdf has been uploaded', time: '5 min ago', type: 'success' },
	{ id: 3, title: 'System maintenance', description: 'Scheduled maintenance in 1 hour', time: '10 min ago', type: 'warning' },
	{ id: 4, title: 'New team member added', description: 'Sarah joined your workspace', time: '1 hour ago', type: 'info' }
]

const fileItems = [
	{ id: 1, name: 'project-proposal.pdf', size: '2.5 MB', type: 'pdf', modified: '2 hours ago' },
	{ id: 2, name: 'design-assets.zip', size: '15.2 MB', type: 'archive', modified: '1 day ago' },
	{ id: 3, name: 'presentation.pptx', size: '8.7 MB', type: 'presentation', modified: '3 days ago' },
	{ id: 4, name: 'data-analysis.xlsx', size: '1.2 MB', type: 'spreadsheet', modified: '1 week ago' }
]

// Navigation Drawer
const NavigationDrawer = () => {
	const [activeItem, setActiveItem] = useState('dashboard')

	return (
		<Drawer>
			<DrawerTrigger asChild>
				<Button variant="outline">
					<MenuIcon className="w-4 h-4 mr-2" />
					Navigation Menu
				</Button>
			</DrawerTrigger>
			<DrawerContent className="h-full w-80">
				<DrawerHeader>
					<DrawerTitle>Navigation</DrawerTitle>
					<DrawerDescription>Quick access to main sections</DrawerDescription>
				</DrawerHeader>
				<div className="flex-1 overflow-y-auto px-4">
					<nav className="space-y-2">
						{menuItems.map((item) => {
							const IconComponent = item.icon
							return (
								<button
									key={item.id}
									onClick={() => setActiveItem(item.id)}
									className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg transition-colors ${
										activeItem === item.id
											? 'bg-blue-100 text-blue-700'
											: 'hover:bg-gray-100'
									}`}
								>
									<IconComponent className="w-5 h-5" />
									<span className="font-medium">{item.label}</span>
									{activeItem === item.id && (
										<Badge variant="secondary" className="ml-auto">Active</Badge>
									)}
								</button>
							)
						})}
					</nav>

					<Separator className="my-4" />

					<div className="space-y-3">
						<h4 className="text-sm font-semibold text-gray-700">Quick Actions</h4>
						<div className="grid grid-cols-2 gap-2">
							<Button variant="outline" size="sm" className="justify-start">
								<SearchIcon className="w-4 h-4 mr-2" />
								Search
							</Button>
							<Button variant="outline" size="sm" className="justify-start">
								<UploadIcon className="w-4 h-4 mr-2" />
								Upload
							</Button>
						</div>
					</div>
				</div>
				<DrawerFooter>
					<DrawerClose asChild>
						<Button variant="outline">Close</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	)
}

// Notifications Drawer
const NotificationsDrawer = () => {
	const [notifications, setNotifications] = useState(notificationItems)
	const [filter, setFilter] = useState('all')

	const filteredNotifications = notifications.filter(notif => 
		filter === 'all' || notif.type === filter
	)

	const markAsRead = (id: number) => {
		setNotifications(prev => prev.filter(n => n.id !== id))
	}

	const getNotificationIcon = (type: string) => {
		switch (type) {
			case 'message': return <UserIcon className="w-4 h-4 text-blue-600" />
			case 'success': return <CheckIcon className="w-4 h-4 text-green-600" />
			case 'warning': return <AlertTriangleIcon className="w-4 h-4 text-yellow-600" />
			case 'info': return <InfoIcon className="w-4 h-4 text-blue-600" />
			default: return <BellIcon className="w-4 h-4 text-gray-600" />
		}
	}

	return (
		<Drawer>
			<DrawerTrigger asChild>
				<Button variant="outline" className="relative">
					<BellIcon className="w-4 h-4 mr-2" />
					Notifications
					{notifications.length > 0 && (
						<Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs">
							{notifications.length}
						</Badge>
					)}
				</Button>
			</DrawerTrigger>
			<DrawerContent className="h-full w-96">
				<DrawerHeader>
					<DrawerTitle className="flex items-center gap-2">
						<BellIcon className="w-5 h-5" />
						Notifications
					</DrawerTitle>
					<DrawerDescription>Stay updated with your latest activity</DrawerDescription>
					
					{/* Filter Tabs */}
					<div className="flex gap-2 mt-4">
						{['all', 'message', 'success', 'warning', 'info'].map((type) => (
							<Button
								key={type}
								variant={filter === type ? 'default' : 'outline'}
								size="sm"
								onClick={() => setFilter(type)}
							>
								{type.charAt(0).toUpperCase() + type.slice(1)}
							</Button>
						))}
					</div>
				</DrawerHeader>
				<div className="flex-1 overflow-y-auto px-4">
					{filteredNotifications.length === 0 ? (
						<div className="flex flex-col items-center justify-center h-32 text-center">
							<BellIcon className="w-8 h-8 text-gray-400 mb-2" />
							<p className="text-sm text-muted-foreground">No notifications</p>
						</div>
					) : (
						<div className="space-y-3">
							{filteredNotifications.map((notification) => (
								<Card key={notification.id} className="p-3">
									<div className="flex items-start gap-3">
										<div className="mt-0.5">
											{getNotificationIcon(notification.type)}
										</div>
										<div className="flex-1">
											<h4 className="text-sm font-medium">{notification.title}</h4>
											<p className="text-xs text-muted-foreground mt-1">{notification.description}</p>
											<p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
										</div>
										<Button
											variant="ghost"
											size="sm"
											onClick={() => markAsRead(notification.id)}
										>
											<XIcon className="w-4 h-4" />
										</Button>
									</div>
								</Card>
							))}
						</div>
					)}
				</div>
				<DrawerFooter>
					<Button variant="outline" onClick={() => setNotifications([])} disabled={notifications.length === 0}>
						<CheckIcon className="w-4 h-4 mr-2" />
						Mark All Read
					</Button>
					<DrawerClose asChild>
						<Button>Close</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	)
}

// File Browser Drawer
const FileBrowserDrawer = () => {
	const [files, setFiles] = useState(fileItems)
	const [sortBy, setSortBy] = useState('name')
	const [viewMode, setViewMode] = useState('list')

	const sortedFiles = [...files].sort((a, b) => {
		if (sortBy === 'name') return a.name.localeCompare(b.name)
		if (sortBy === 'size') return parseFloat(a.size) - parseFloat(b.size)
		if (sortBy === 'modified') return new Date(a.modified).getTime() - new Date(b.modified).getTime()
		return 0
	})

	const getFileIcon = (type: string) => {
		switch (type) {
			case 'pdf': return <FileIcon className="w-5 h-5 text-red-600" />
			case 'archive': return <FolderIcon className="w-5 h-5 text-yellow-600" />
			case 'presentation': return <ImageIcon className="w-5 h-5 text-orange-600" />
			case 'spreadsheet': return <FileIcon className="w-5 h-5 text-green-600" />
			default: return <FileIcon className="w-5 h-5 text-gray-600" />
		}
	}

	return (
		<Drawer>
			<DrawerTrigger asChild>
				<Button variant="outline">
					<FolderIcon className="w-4 h-4 mr-2" />
					Browse Files
				</Button>
			</DrawerTrigger>
			<DrawerContent className="h-full w-96">
				<DrawerHeader>
					<DrawerTitle className="flex items-center gap-2">
						<FolderIcon className="w-5 h-5" />
						File Browser
					</DrawerTitle>
					<DrawerDescription>Browse and manage your files</DrawerDescription>

					{/* Controls */}
					<div className="flex items-center gap-2 mt-4">
						<Select value={sortBy} onValueChange={setSortBy}>
							<SelectTrigger className="flex-1">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="name">Sort by Name</SelectItem>
								<SelectItem value="size">Sort by Size</SelectItem>
								<SelectItem value="modified">Sort by Date</SelectItem>
							</SelectContent>
						</Select>
						<Button variant="outline" size="sm">
							<FilterIcon className="w-4 h-4" />
						</Button>
					</div>
				</DrawerHeader>
				<div className="flex-1 overflow-y-auto px-4">
					<div className="space-y-2">
						{sortedFiles.map((file) => (
							<Card key={file.id} className="p-3 hover:bg-gray-50 transition-colors cursor-pointer">
								<div className="flex items-center gap-3">
									{getFileIcon(file.type)}
									<div className="flex-1 min-w-0">
										<h4 className="text-sm font-medium truncate">{file.name}</h4>
										<div className="flex items-center gap-2 mt-1">
											<span className="text-xs text-muted-foreground">{file.size}</span>
											<span className="text-xs text-muted-foreground">•</span>
											<span className="text-xs text-muted-foreground">{file.modified}</span>
										</div>
									</div>
									<div className="flex items-center gap-1">
										<Button variant="ghost" size="sm">
											<EyeIcon className="w-4 h-4" />
										</Button>
										<Button variant="ghost" size="sm">
											<DownloadIcon className="w-4 h-4" />
										</Button>
										<Button variant="ghost" size="sm">
											<MoreHorizontalIcon className="w-4 h-4" />
										</Button>
									</div>
								</div>
							</Card>
						))}
					</div>
				</div>
				<DrawerFooter>
					<Button variant="outline">
						<UploadIcon className="w-4 h-4 mr-2" />
						Upload Files
					</Button>
					<DrawerClose asChild>
						<Button>Close</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	)
}

export default function DrawerSample() {
	const [showAdvanced, setShowAdvanced] = useState(false)

	return (
		<Fragment>
			<ComponentDoc
				title="Drawer"
				description="Slide-out panels that provide additional content and functionality without leaving the current context. Perfect for navigation menus, detailed views, and interactive content."
				component={
					<div className="flex flex-col gap-8 w-full max-w-4xl">
						{/* Controls */}
						<div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
							<div className="flex items-center gap-4">
								<div className="flex items-center space-x-2">
									<Switch
										id="show-advanced"
										checked={showAdvanced}
										onCheckedChange={setShowAdvanced}
									/>
									<Label htmlFor="show-advanced" className="text-sm">Show Advanced Examples</Label>
								</div>
							</div>
							<Badge variant="outline">{showAdvanced ? '6' : '3'} Examples</Badge>
						</div>

						{/* Basic Drawer Examples */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Basic Drawers</h3>
							<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<MenuIcon className="w-5 h-5" />
											Navigation
										</CardTitle>
										<CardDescription>Side navigation with menu items and quick actions</CardDescription>
									</CardHeader>
									<CardContent>
										<NavigationDrawer />
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<BellIcon className="w-5 h-5" />
											Notifications
										</CardTitle>
										<CardDescription>Notification panel with filtering and actions</CardDescription>
									</CardHeader>
									<CardContent>
										<NotificationsDrawer />
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<FolderIcon className="w-5 h-5" />
											File Browser
										</CardTitle>
										<CardDescription>File management with sorting and actions</CardDescription>
									</CardHeader>
									<CardContent>
										<FileBrowserDrawer />
									</CardContent>
								</Card>
							</div>
						</div>

						{/* Advanced Examples */}
						{showAdvanced && (
							<>
								<div>
									<h3 className="text-lg font-semibold mb-4">Advanced Examples</h3>
									<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
										<Card>
											<CardHeader>
												<CardTitle className="flex items-center gap-2">
													<EditIcon className="w-5 h-5" />
													Goal Tracker
												</CardTitle>
												<CardDescription>Interactive goal setting with charts</CardDescription>
											</CardHeader>
											<CardContent>
												<DrawerBottom />
											</CardContent>
										</Card>

										<Card>
											<CardHeader>
												<CardTitle className="flex items-center gap-2">
													<FileIcon className="w-5 h-5" />
													Scrollable Content
												</CardTitle>
												<CardDescription>Long content with scrolling support</CardDescription>
											</CardHeader>
											<CardContent>
												<DrawerScrollableContent />
											</CardContent>
										</Card>

										<Card>
											<CardHeader>
												<CardTitle className="flex items-center gap-2">
													<SettingsIcon className="w-5 h-5" />
													Directional
												</CardTitle>
												<CardDescription>Drawers from all four directions</CardDescription>
											</CardHeader>
											<CardContent>
												<DrawerDirections />
											</CardContent>
										</Card>
									</div>
								</div>
							</>
						)}

						{/* Usage Guidelines */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<InfoIcon className="w-5 h-5" />
									Usage Guidelines
								</CardTitle>
								<CardDescription>Best practices for implementing drawers</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div>
										<h4 className="font-semibold mb-2">When to Use</h4>
										<ul className="space-y-1 text-sm text-muted-foreground">
											<li>• For navigation menus and app navigation</li>
											<li>• When you need contextual panels without page navigation</li>
											<li>• For detailed views of items in lists or cards</li>
											<li>• To display notifications or activity feeds</li>
											<li>• For file browsers and content management</li>
										</ul>
									</div>
									<Separator />
									<div>
										<h4 className="font-semibold mb-2">Design Principles</h4>
										<ul className="space-y-1 text-sm text-muted-foreground">
											<li>• Choose appropriate direction based on content flow</li>
											<li>• Provide clear visual indicators for interactive elements</li>
											<li>• Use consistent widths and heights for similar content</li>
											<li>• Include proper scroll handling for long content</li>
											<li>• Ensure easy dismissal and clear action buttons</li>
											<li>• Consider mobile responsiveness and touch interactions</li>
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
									<p><strong>Show Advanced:</strong> {showAdvanced ? 'Yes' : 'No'}</p>
									<p><strong>Total Examples:</strong> {showAdvanced ? '6' : '3'}</p>
								</div>
								<div>
									<p><strong>Drawer Types:</strong> Navigation, Notifications, Files{showAdvanced ? ', Goal, Scrollable, Directional' : ''}</p>
									<p><strong>Features:</strong> Filtering, Sorting, Charts, Actions</p>
								</div>
							</div>
						</div>
					</div>
				}
			/>
		</Fragment>
	)
}

// Goal Tracking Drawer (preserved from original)
function DrawerBottom() {
	const [goal, setGoal] = useState(350)

	const onClick = useCallback((adjustment: number) => {
		setGoal((prevGoal) => Math.max(200, Math.min(400, prevGoal + adjustment)))
	}, [])

	return (
		<Drawer>
			<DrawerTrigger asChild>
				<Button variant="outline">
					<EditIcon className="w-4 h-4 mr-2" />
					Set Goal
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<div className="mx-auto w-full max-w-sm">
					<DrawerHeader>
						<DrawerTitle>Daily Activity Goal</DrawerTitle>
						<DrawerDescription>Set your daily calorie target and track progress.</DrawerDescription>
					</DrawerHeader>
					<div className="p-4 pb-0">
						<div className="flex items-center justify-center space-x-2">
							<Button variant="outline" size="icon" className="h-8 w-8 shrink-0 rounded-full" onClick={() => onClick(-10)} disabled={goal <= 200}>
								<Minus className="w-4 h-4" />
								<span className="sr-only">Decrease</span>
							</Button>
							<div className="flex-1 text-center">
								<div className="text-7xl font-bold tracking-tighter">{goal}</div>
								<div className="text-muted-foreground text-[0.70rem] uppercase">Calories/day</div>
							</div>
							<Button variant="outline" size="icon" className="h-8 w-8 shrink-0 rounded-full" onClick={() => onClick(10)} disabled={goal >= 400}>
								<Plus className="w-4 h-4" />
								<span className="sr-only">Increase</span>
							</Button>
						</div>
						<div className="mt-3 h-[120px] bg-gray-100 rounded-lg flex items-center justify-center text-sm text-muted-foreground">
							Chart placeholder (recharts not installed)
						</div>
					</div>
					<DrawerFooter>
						<Button>
							<SaveIcon className="w-4 h-4 mr-2" />
							Save Goal
						</Button>
						<DrawerClose asChild>
							<Button variant="outline">Cancel</Button>
						</DrawerClose>
					</DrawerFooter>
				</div>
			</DrawerContent>
		</Drawer>
	)
}

// Scrollable Content Drawer (enhanced)
function DrawerScrollableContent() {
	return (
		<Drawer>
			<DrawerTrigger asChild>
				<Button variant="outline">
					<FileIcon className="w-4 h-4 mr-2" />
					View Article
				</Button>
			</DrawerTrigger>
			<DrawerContent className="h-full w-96">
				<DrawerHeader>
					<DrawerTitle>Article: Getting Started with UI Components</DrawerTitle>
					<DrawerDescription>A comprehensive guide to building modern interfaces.</DrawerDescription>
				</DrawerHeader>
				<div className="flex-1 overflow-y-auto px-4 text-sm">
					<div className="space-y-6">
						<div>
							<h4 className="text-lg font-semibold mb-3">Introduction</h4>
							<p className="leading-relaxed text-muted-foreground">
								Modern user interfaces require a thoughtful approach to component design and implementation. 
								This guide will walk you through the essential concepts and best practices for building 
								reusable, accessible, and performant UI components.
							</p>
						</div>

						<div>
							<h4 className="text-lg font-semibold mb-3">Core Principles</h4>
							<div className="space-y-3">
								{['Accessibility First', 'Performance Oriented', 'Design System Consistency', 'Developer Experience'].map((principle, index) => (
									<div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
										<div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
											<span className="text-xs font-semibold text-blue-700">{index + 1}</span>
										</div>
										<div>
											<h5 className="font-medium">{principle}</h5>
											<p className="text-xs text-muted-foreground mt-1">
												Ensuring components are usable by everyone and optimized for performance.
											</p>
										</div>
									</div>
								))}
							</div>
						</div>

						<div>
							<h4 className="text-lg font-semibold mb-3">Implementation Details</h4>
							{Array.from({ length: 5 }).map((_, index) => (
								<div key={index} className="mb-4">
									<h5 className="font-medium mb-2">Section {index + 1}: Component Architecture</h5>
									<p className="leading-normal text-muted-foreground">
										When building components, it's essential to consider the separation of concerns between 
										logic, presentation, and state management. This approach ensures maintainability and 
										reusability across different contexts and applications.
									</p>
								</div>
							))}
						</div>

						<div>
							<h4 className="text-lg font-semibold mb-3">Code Examples</h4>
							<div className="bg-gray-100 p-3 rounded-lg font-mono text-xs">
								<div className="text-gray-600 mb-2">// Example component structure</div>
								<div>const Button = ({'{'} children, variant, ...props {'}'}) =&gt; {'{'}</div>
								<div className="ml-4">return &lt;button className=... {'{...props}'}&gt;</div>
								<div className="ml-8">{'{'} children {'}'}</div>
								<div className="ml-4">&lt;/button&gt;</div>
								<div>{'}'}</div>
							</div>
						</div>

						<div>
							<h4 className="text-lg font-semibold mb-3">Conclusion</h4>
							<p className="leading-relaxed text-muted-foreground">
								Building great UI components is both an art and a science. By following these principles 
								and best practices, you'll be well on your way to creating components that stand the test 
								of time and provide excellent user and developer experiences.
							</p>
						</div>
					</div>
				</div>
				<DrawerFooter>
					<div className="flex gap-2">
						<Button variant="outline" size="sm">
							<HeartIcon className="w-4 h-4 mr-1" />
							Like
						</Button>
						<Button variant="outline" size="sm">
							<ShareIcon className="w-4 h-4 mr-1" />
							Share
						</Button>
					</div>
					<DrawerClose asChild>
						<Button>Close Article</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	)
}

// Directional Drawers (enhanced)
const directions = ['top', 'right', 'bottom', 'left'] as const

function DrawerDirections() {
	const getDirectionIcon = (direction: string) => {
		switch (direction) {
			case 'top': return <SettingsIcon className="w-4 h-4" />
			case 'right': return <InfoIcon className="w-4 h-4" />
			case 'bottom': return <MenuIcon className="w-4 h-4" />
			case 'left': return <UserIcon className="w-4 h-4" />
			default: return <SettingsIcon className="w-4 h-4" />
		}
	}

	const getDirectionContent = (direction: string) => {
		switch (direction) {
			case 'top': return {
				title: 'Top Panel',
				description: 'Configuration and settings panel from the top.',
				content: 'This drawer slides down from the top of the screen. Perfect for notifications, alerts, or system-wide settings.'
			}
			case 'right': return {
				title: 'Right Sidebar',
				description: 'Additional information and actions from the right.',
				content: 'This drawer slides in from the right side. Commonly used for detailed views, forms, or supplementary content.'
			}
			case 'bottom': return {
				title: 'Bottom Sheet',
				description: 'Actions and options from the bottom.',
				content: 'This drawer slides up from the bottom. Ideal for mobile-first designs, action sheets, and contextual menus.'
			}
			case 'left': return {
				title: 'Left Navigation',
				description: 'Primary navigation from the left side.',
				content: 'This drawer slides in from the left side. The classic choice for main navigation menus and primary actions.'
			}
			default: return {
				title: 'Drawer',
				description: 'Slide-out panel',
				content: 'Default drawer content.'
			}
		}
	}

	return (
		<div className="flex flex-wrap gap-2">
			{directions.map((direction) => {
				const content = getDirectionContent(direction)
				return (
					<Drawer key={direction}>
						<DrawerTrigger asChild>
							<Button variant="outline" className="capitalize flex items-center gap-2">
								{getDirectionIcon(direction)}
								{direction}
							</Button>
						</DrawerTrigger>
						<DrawerContent className={direction === 'left' || direction === 'right' ? 'h-full w-80' : ''}>
							<DrawerHeader>
								<DrawerTitle className="flex items-center gap-2">
									{getDirectionIcon(direction)}
									{content.title}
								</DrawerTitle>
								<DrawerDescription>{content.description}</DrawerDescription>
							</DrawerHeader>
							<div className="flex-1 overflow-y-auto px-4 text-sm">
								<div className="space-y-4">
									<p className="leading-relaxed">{content.content}</p>
									
									<div className="p-3 bg-gray-50 rounded-lg">
										<h4 className="font-medium mb-2">Direction: {direction.toUpperCase()}</h4>
										<p className="text-xs text-muted-foreground">
											This demonstrates how drawers can slide in from different directions 
											to provide contextual content and actions.
										</p>
									</div>

									<div className="grid grid-cols-2 gap-3">
										<Card className="p-3">
											<h5 className="font-medium text-sm">Use Cases</h5>
											<p className="text-xs text-muted-foreground mt-1">
												{direction === 'left' && 'Navigation, menus'}
												{direction === 'right' && 'Details, forms'}
												{direction === 'top' && 'Alerts, settings'}
												{direction === 'bottom' && 'Actions, mobile'}
											</p>
										</Card>
										<Card className="p-3">
											<h5 className="font-medium text-sm">Best For</h5>
											<p className="text-xs text-muted-foreground mt-1">
												{direction === 'left' && 'Desktop apps'}
												{direction === 'right' && 'Content panels'}
												{direction === 'top' && 'System messages'}
												{direction === 'bottom' && 'Mobile interfaces'}
											</p>
										</Card>
									</div>
								</div>
							</div>
							<DrawerFooter>
								<DrawerClose asChild>
									<Button>Close {content.title}</Button>
								</DrawerClose>
							</DrawerFooter>
						</DrawerContent>
					</Drawer>
				)
			})}
		</div>
	)
}
