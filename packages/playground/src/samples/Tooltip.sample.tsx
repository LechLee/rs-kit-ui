import { Fragment, useState } from 'react'
import {
	Button,
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
	Label,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Badge,
	Switch,
	Avatar,
	AvatarFallback,
	AvatarImage,
	Progress,
	Separator,
	Input
} from '@rs-kit/ui-kit'
import {
	InfoIcon,
	HelpCircleIcon,
	UserIcon,
	SettingsIcon,
	BellIcon,
	SearchIcon,
	HeartIcon,
	ShareIcon,
	BookmarkIcon,
	MoreHorizontalIcon,
	EditIcon,
	TrashIcon,
	CopyIcon,
	DownloadIcon,
	PrinterIcon,
	MailIcon,
	PhoneIcon,
	MapPinIcon,
	CalendarIcon,
	ClockIcon,
	StarIcon,
	TrendingUpIcon,
	DollarSignIcon,
	PackageIcon,
	UsersIcon,
	BarChartIcon,
	ShieldIcon,
	ZapIcon,
	WifiIcon,
	BatteryIcon
} from 'lucide-react'
import { ComponentDoc } from '@/components/ComponentDoc'

// User Interface Tooltips
const UserInterfaceTooltips = () => {
	const [showAdvancedTooltips, setShowAdvancedTooltips] = useState(true)

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold flex items-center gap-2">
					<UserIcon className="w-5 h-5" />
					User Interface Elements
				</Label>
				<p className="text-sm text-muted-foreground">Common UI components with helpful tooltips and contextual information</p>
			</div>

			<div className="space-y-6">
				{/* Navigation Bar */}
				<Card>
					<CardHeader>
						<CardTitle>Navigation Bar</CardTitle>
						<CardDescription>Top navigation with icon tooltips</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
							<div className="flex items-center gap-4">
								<h3 className="font-semibold">MyApp</h3>
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger asChild>
											<Button variant="ghost" size="sm">
												<SearchIcon className="w-4 h-4" />
											</Button>
										</TooltipTrigger>
										<TooltipContent>
											<p>Search (Ctrl+K)</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							</div>
							
							<div className="flex items-center gap-2">
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger asChild>
											<Button variant="ghost" size="sm" className="relative">
												<BellIcon className="w-4 h-4" />
												<Badge variant="destructive" className="absolute -top-1 -right-1 text-xs h-4 w-4 p-0 flex items-center justify-center">
													3
												</Badge>
											</Button>
										</TooltipTrigger>
										<TooltipContent>
											<p>Notifications (3 unread)</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>

								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger asChild>
											<Button variant="ghost" size="sm">
												<SettingsIcon className="w-4 h-4" />
											</Button>
										</TooltipTrigger>
										<TooltipContent>
											<p>Settings</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>

								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger asChild>
											<Avatar className="w-8 h-8 cursor-pointer">
												<AvatarImage src="https://github.com/shadcn.png" />
												<AvatarFallback>JD</AvatarFallback>
											</Avatar>
										</TooltipTrigger>
										<TooltipContent>
											<div className="text-center">
												<p className="font-medium">John Doe</p>
												<p className="text-xs text-muted-foreground">john@example.com</p>
											</div>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Action Buttons */}
				<Card>
					<CardHeader>
						<CardTitle>Action Buttons</CardTitle>
						<CardDescription>Interactive buttons with descriptive tooltips</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="flex items-center gap-2 flex-wrap">
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger asChild>
											<Button size="sm">
												<HeartIcon className="w-4 h-4 mr-2" />
												Like
											</Button>
										</TooltipTrigger>
										<TooltipContent>
											<p>Add to favorites</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>

								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger asChild>
											<Button variant="outline" size="sm">
												<ShareIcon className="w-4 h-4 mr-2" />
												Share
											</Button>
										</TooltipTrigger>
										<TooltipContent>
											<p>Share with others</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>

								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger asChild>
											<Button variant="outline" size="sm">
												<BookmarkIcon className="w-4 h-4" />
											</Button>
										</TooltipTrigger>
										<TooltipContent>
											<p>Save for later</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>

								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger asChild>
											<Button variant="ghost" size="sm">
												<MoreHorizontalIcon className="w-4 h-4" />
											</Button>
										</TooltipTrigger>
										<TooltipContent>
											<p>More options</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							</div>

							<div className="flex items-center gap-2">
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger asChild>
											<Button variant="ghost" size="sm">
												<EditIcon className="w-4 h-4" />
											</Button>
										</TooltipTrigger>
										<TooltipContent>
											<p>Edit document</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>

								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger asChild>
											<Button variant="ghost" size="sm">
												<CopyIcon className="w-4 h-4" />
											</Button>
										</TooltipTrigger>
										<TooltipContent>
											<p>Copy to clipboard</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>

								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger asChild>
											<Button variant="ghost" size="sm">
												<DownloadIcon className="w-4 h-4" />
											</Button>
										</TooltipTrigger>
										<TooltipContent>
											<p>Download file</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>

								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger asChild>
											<Button variant="ghost" size="sm">
												<PrinterIcon className="w-4 h-4" />
											</Button>
										</TooltipTrigger>
										<TooltipContent>
											<p>Print document</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>

								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger asChild>
											<Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
												<TrashIcon className="w-4 h-4" />
											</Button>
										</TooltipTrigger>
										<TooltipContent>
											<p>Delete permanently</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Form Elements */}
				<Card>
					<CardHeader>
						<CardTitle>Form Elements</CardTitle>
						<CardDescription>Form inputs with helpful guidance</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<div className="flex items-center gap-2 mb-2">
										<Label htmlFor="username">Username</Label>
										<TooltipProvider>
											<Tooltip>
												<TooltipTrigger asChild>
													<InfoIcon className="w-4 h-4 text-muted-foreground cursor-help" />
												</TooltipTrigger>
												<TooltipContent>
													<div className="max-w-xs">
														<p className="font-medium mb-1">Username Requirements:</p>
														<ul className="text-xs space-y-1">
															<li>• 3-20 characters</li>
															<li>• Letters, numbers, and underscores only</li>
															<li>• Must start with a letter</li>
														</ul>
													</div>
												</TooltipContent>
											</Tooltip>
										</TooltipProvider>
									</div>
									<Input id="username" placeholder="Enter username" />
								</div>

								<div>
									<div className="flex items-center gap-2 mb-2">
										<Label htmlFor="password">Password</Label>
										<TooltipProvider>
											<Tooltip>
												<TooltipTrigger asChild>
													<InfoIcon className="w-4 h-4 text-muted-foreground cursor-help" />
												</TooltipTrigger>
												<TooltipContent>
													<div className="max-w-xs">
														<p className="font-medium mb-1">Strong Password Tips:</p>
														<ul className="text-xs space-y-1">
															<li>• At least 8 characters</li>
															<li>• Include uppercase & lowercase</li>
															<li>• Add numbers and symbols</li>
															<li>• Avoid common words</li>
														</ul>
													</div>
												</TooltipContent>
											</Tooltip>
										</TooltipProvider>
									</div>
									<Input id="password" type="password" placeholder="Enter password" />
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}

// Data Display Tooltips
const DataDisplayTooltips = () => {
	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold flex items-center gap-2">
					<BarChartIcon className="w-5 h-5" />
					Data Visualization
				</Label>
				<p className="text-sm text-muted-foreground">Charts, metrics, and data points with detailed tooltip information</p>
			</div>

			<div className="space-y-6">
				{/* KPI Cards */}
				<Card>
					<CardHeader>
						<CardTitle>Key Performance Indicators</CardTitle>
						<CardDescription>Business metrics with detailed explanations</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<Card className="cursor-pointer hover:shadow-md transition-shadow">
											<CardContent className="p-4 text-center">
												<DollarSignIcon className="w-8 h-8 mx-auto mb-2 text-green-600" />
												<p className="text-2xl font-bold">$124.5K</p>
												<p className="text-sm text-muted-foreground">Revenue</p>
											</CardContent>
										</Card>
									</TooltipTrigger>
									<TooltipContent>
										<div className="max-w-xs">
											<p className="font-medium">Monthly Revenue</p>
											<p className="text-xs text-muted-foreground mt-1">
												Total revenue for the current month, including all sales channels and subscriptions.
											</p>
											<Separator className="my-2" />
											<p className="text-xs">
												<span className="text-green-600">↗ +12.5%</span> vs last month
											</p>
										</div>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>

							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<Card className="cursor-pointer hover:shadow-md transition-shadow">
											<CardContent className="p-4 text-center">
												<UsersIcon className="w-8 h-8 mx-auto mb-2 text-blue-600" />
												<p className="text-2xl font-bold">2,847</p>
												<p className="text-sm text-muted-foreground">Customers</p>
											</CardContent>
										</Card>
									</TooltipTrigger>
									<TooltipContent>
										<div className="max-w-xs">
											<p className="font-medium">Active Customers</p>
											<p className="text-xs text-muted-foreground mt-1">
												Number of unique customers who made at least one purchase in the last 30 days.
											</p>
											<Separator className="my-2" />
											<p className="text-xs">
												<span className="text-green-600">↗ +5.2%</span> vs last month
											</p>
										</div>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>

							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<Card className="cursor-pointer hover:shadow-md transition-shadow">
											<CardContent className="p-4 text-center">
												<PackageIcon className="w-8 h-8 mx-auto mb-2 text-purple-600" />
												<p className="text-2xl font-bold">1,246</p>
												<p className="text-sm text-muted-foreground">Orders</p>
											</CardContent>
										</Card>
									</TooltipTrigger>
									<TooltipContent>
										<div className="max-w-xs">
											<p className="font-medium">Total Orders</p>
											<p className="text-xs text-muted-foreground mt-1">
												All completed orders including both one-time purchases and subscription renewals.
											</p>
											<Separator className="my-2" />
											<p className="text-xs">
												<span className="text-green-600">↗ +8.7%</span> vs last month
											</p>
										</div>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>

							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<Card className="cursor-pointer hover:shadow-md transition-shadow">
											<CardContent className="p-4 text-center">
												<TrendingUpIcon className="w-8 h-8 mx-auto mb-2 text-orange-600" />
												<p className="text-2xl font-bold">94.2%</p>
												<p className="text-sm text-muted-foreground">Satisfaction</p>
											</CardContent>
										</Card>
									</TooltipTrigger>
									<TooltipContent>
										<div className="max-w-xs">
											<p className="font-medium">Customer Satisfaction</p>
											<p className="text-xs text-muted-foreground mt-1">
												Average satisfaction score based on post-purchase surveys and support interactions.
											</p>
											<Separator className="my-2" />
											<p className="text-xs">
												<span className="text-green-600">↗ +2.1%</span> vs last month
											</p>
										</div>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						</div>
					</CardContent>
				</Card>

				{/* Progress Indicators */}
				<Card>
					<CardHeader>
						<CardTitle>Progress Tracking</CardTitle>
						<CardDescription>Goal progress with detailed breakdowns</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<div className="cursor-pointer">
											<div className="flex items-center justify-between mb-2">
												<span className="font-medium">Monthly Sales Goal</span>
												<span className="text-sm text-muted-foreground">78%</span>
											</div>
											<Progress value={78} className="h-3" />
										</div>
									</TooltipTrigger>
									<TooltipContent>
										<div className="max-w-xs">
											<p className="font-medium">Sales Progress</p>
											<p className="text-xs text-muted-foreground mt-1">
												$156K of $200K monthly target achieved
											</p>
											<Separator className="my-2" />
											<div className="text-xs space-y-1">
												<p>• 22 days remaining</p>
												<p>• Need $2K/day to reach goal</p>
												<p>• Currently at $2.4K/day average</p>
											</div>
										</div>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>

							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<div className="cursor-pointer">
											<div className="flex items-center justify-between mb-2">
												<span className="font-medium">Project Completion</span>
												<span className="text-sm text-muted-foreground">45%</span>
											</div>
											<Progress value={45} className="h-3" />
										</div>
									</TooltipTrigger>
									<TooltipContent>
										<div className="max-w-xs">
											<p className="font-medium">Project Alpha Status</p>
											<p className="text-xs text-muted-foreground mt-1">
												18 of 40 tasks completed
											</p>
											<Separator className="my-2" />
											<div className="text-xs space-y-1">
												<p>• Due: March 15, 2024</p>
												<p>• 8 tasks in progress</p>
												<p>• 2 blocked tasks</p>
												<p>• On track for deadline</p>
											</div>
										</div>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}

// Contact Card Tooltips
const ContactCardTooltips = () => {
	const contacts = [
		{
			name: 'Sarah Johnson',
			role: 'Product Manager',
			email: 'sarah.johnson@company.com',
			phone: '+1 (555) 123-4567',
			location: 'San Francisco, CA',
			status: 'online',
			lastSeen: 'Active now',
			projects: ['Design System', 'Mobile App'],
			rating: 4.8
		},
		{
			name: 'Mike Chen',
			role: 'Senior Developer',
			email: 'mike.chen@company.com',
			phone: '+1 (555) 234-5678',
			location: 'Seattle, WA',
			status: 'away',
			lastSeen: '2 hours ago',
			projects: ['API Gateway', 'Analytics'],
			rating: 4.9
		},
		{
			name: 'Emily Davis',
			role: 'UX Designer',
			email: 'emily.davis@company.com',
			phone: '+1 (555) 345-6789',
			location: 'Austin, TX',
			status: 'offline',
			lastSeen: '1 day ago',
			projects: ['User Research', 'Prototyping'],
			rating: 4.7
		}
	]

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold flex items-center gap-2">
					<UserIcon className="w-5 h-5" />
					Contact Directory
				</Label>
				<p className="text-sm text-muted-foreground">Team member cards with detailed contact information and status</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Team Members</CardTitle>
					<CardDescription>Hover over team members for detailed information</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						{contacts.map((contact, index) => (
							<TooltipProvider key={index}>
								<Tooltip>
									<TooltipTrigger asChild>
										<Card className="cursor-pointer hover:shadow-md transition-shadow">
											<CardContent className="p-4">
												<div className="flex items-center gap-3">
													<div className="relative">
														<Avatar className="w-12 h-12">
															<AvatarImage src={`https://github.com/shadcn.png`} />
															<AvatarFallback>{contact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
														</Avatar>
														<div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
															contact.status === 'online' ? 'bg-green-500' :
															contact.status === 'away' ? 'bg-yellow-500' :
															'bg-gray-400'
														}`} />
													</div>
													<div className="flex-1 min-w-0">
														<p className="font-semibold text-sm">{contact.name}</p>
														<p className="text-xs text-muted-foreground">{contact.role}</p>
														<div className="flex items-center gap-1 mt-1">
															{Array.from({ length: 5 }, (_, i) => (
																<StarIcon
																	key={i}
																	className={`w-3 h-3 ${
																		i < Math.floor(contact.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
																	}`}
																/>
															))}
															<span className="text-xs text-muted-foreground ml-1">{contact.rating}</span>
														</div>
													</div>
												</div>
											</CardContent>
										</Card>
									</TooltipTrigger>
									<TooltipContent>
										<div className="max-w-xs">
											<div className="flex items-center gap-2 mb-2">
												<Avatar className="w-8 h-8">
													<AvatarImage src={`https://github.com/shadcn.png`} />
													<AvatarFallback>{contact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
												</Avatar>
												<div>
													<p className="font-medium">{contact.name}</p>
													<p className="text-xs text-muted-foreground">{contact.role}</p>
												</div>
											</div>
											
											<Separator className="my-2" />
											
											<div className="space-y-2 text-xs">
												<div className="flex items-center gap-2">
													<MailIcon className="w-3 h-3" />
													<span>{contact.email}</span>
												</div>
												<div className="flex items-center gap-2">
													<PhoneIcon className="w-3 h-3" />
													<span>{contact.phone}</span>
												</div>
												<div className="flex items-center gap-2">
													<MapPinIcon className="w-3 h-3" />
													<span>{contact.location}</span>
												</div>
												<div className="flex items-center gap-2">
													<ClockIcon className="w-3 h-3" />
													<span>{contact.lastSeen}</span>
												</div>
											</div>

											<Separator className="my-2" />
											
											<div>
												<p className="text-xs font-medium mb-1">Current Projects:</p>
												<div className="flex gap-1">
													{contact.projects.map((project, i) => (
														<Badge key={i} variant="secondary" className="text-xs">
															{project}
														</Badge>
													))}
												</div>
											</div>
										</div>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	)
}

// System Status Tooltips
const SystemStatusTooltips = () => {
	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold flex items-center gap-2">
					<ShieldIcon className="w-5 h-5" />
					System Status
				</Label>
				<p className="text-sm text-muted-foreground">System health indicators with detailed status information</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Service Health</CardTitle>
					<CardDescription>Real-time system status and performance metrics</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<div className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:shadow-sm transition-shadow">
										<div className="w-3 h-3 bg-green-500 rounded-full" />
										<div>
											<p className="font-medium text-sm">API</p>
											<p className="text-xs text-muted-foreground">Operational</p>
										</div>
									</div>
								</TooltipTrigger>
								<TooltipContent>
									<div className="max-w-xs">
										<p className="font-medium">API Service</p>
										<p className="text-xs text-green-600 mb-2">✓ All systems operational</p>
										<Separator className="my-2" />
										<div className="text-xs space-y-1">
											<p>• Response time: 142ms</p>
											<p>• Uptime: 99.98%</p>
											<p>• Last incident: 12 days ago</p>
											<p>• Requests/min: 1,247</p>
										</div>
									</div>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>

						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<div className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:shadow-sm transition-shadow">
										<div className="w-3 h-3 bg-yellow-500 rounded-full" />
										<div>
											<p className="font-medium text-sm">Database</p>
											<p className="text-xs text-muted-foreground">Degraded</p>
										</div>
									</div>
								</TooltipTrigger>
								<TooltipContent>
									<div className="max-w-xs">
										<p className="font-medium">Database Service</p>
										<p className="text-xs text-yellow-600 mb-2">⚠ Performance degraded</p>
										<Separator className="my-2" />
										<div className="text-xs space-y-1">
											<p>• Query time: 890ms (high)</p>
											<p>• Connection pool: 85% used</p>
											<p>• Investigating slow queries</p>
											<p>• ETA resolution: 30 min</p>
										</div>
									</div>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>

						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<div className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:shadow-sm transition-shadow">
										<div className="w-3 h-3 bg-green-500 rounded-full" />
										<div>
											<p className="font-medium text-sm">CDN</p>
											<p className="text-xs text-muted-foreground">Optimal</p>
										</div>
									</div>
								</TooltipTrigger>
								<TooltipContent>
									<div className="max-w-xs">
										<p className="font-medium">Content Delivery Network</p>
										<p className="text-xs text-green-600 mb-2">✓ Performing optimally</p>
										<Separator className="my-2" />
										<div className="text-xs space-y-1">
											<p>• Cache hit rate: 96.4%</p>
											<p>• Global edge locations: 147</p>
											<p>• Avg response time: 23ms</p>
											<p>• Data transferred: 2.3TB today</p>
										</div>
									</div>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>

						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<div className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:shadow-sm transition-shadow">
										<div className="w-3 h-3 bg-green-500 rounded-full" />
										<div>
											<p className="font-medium text-sm">Monitoring</p>
											<p className="text-xs text-muted-foreground">Active</p>
										</div>
									</div>
								</TooltipTrigger>
								<TooltipContent>
									<div className="max-w-xs">
										<p className="font-medium">Monitoring System</p>
										<p className="text-xs text-green-600 mb-2">✓ All checks passing</p>
										<Separator className="my-2" />
										<div className="text-xs space-y-1">
											<p>• Active alerts: 0</p>
											<p>• Metrics collected: 45,672</p>
											<p>• Data retention: 90 days</p>
											<p>• Next backup: 2 hours</p>
										</div>
									</div>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>

					<Separator className="my-6" />

					<div className="grid grid-cols-3 gap-4">
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<div className="text-center p-3 rounded-lg bg-gray-50 cursor-pointer hover:shadow-sm transition-shadow">
										<ZapIcon className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
										<p className="font-medium text-sm">CPU Usage</p>
										<p className="text-2xl font-bold">34%</p>
									</div>
								</TooltipTrigger>
								<TooltipContent>
									<div className="max-w-xs">
										<p className="font-medium">CPU Performance</p>
										<div className="text-xs space-y-1 mt-2">
											<p>• Current: 34% (8 cores)</p>
											<p>• Peak today: 67%</p>
											<p>• Average: 28%</p>
											<p>• Threshold: 80%</p>
										</div>
									</div>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>

						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<div className="text-center p-3 rounded-lg bg-gray-50 cursor-pointer hover:shadow-sm transition-shadow">
										<WifiIcon className="w-8 h-8 mx-auto mb-2 text-blue-600" />
										<p className="font-medium text-sm">Network</p>
										<p className="text-2xl font-bold">12GB</p>
									</div>
								</TooltipTrigger>
								<TooltipContent>
									<div className="max-w-xs">
										<p className="font-medium">Network Traffic</p>
										<div className="text-xs space-y-1 mt-2">
											<p>• Today: 12.4GB</p>
											<p>• Incoming: 8.2GB</p>
											<p>• Outgoing: 4.2GB</p>
											<p>• Peak: 847MB/h</p>
										</div>
									</div>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>

						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<div className="text-center p-3 rounded-lg bg-gray-50 cursor-pointer hover:shadow-sm transition-shadow">
										<BatteryIcon className="w-8 h-8 mx-auto mb-2 text-green-600" />
										<p className="font-medium text-sm">Uptime</p>
										<p className="text-2xl font-bold">99.9%</p>
									</div>
								</TooltipTrigger>
								<TooltipContent>
									<div className="max-w-xs">
										<p className="font-medium">System Uptime</p>
										<div className="text-xs space-y-1 mt-2">
											<p>• Current: 45 days, 12 hours</p>
											<p>• This month: 99.94%</p>
											<p>• Last year: 99.87%</p>
											<p>• SLA target: 99.9%</p>
										</div>
									</div>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}

export default function TooltipSample() {
	const [showAdvanced, setShowAdvanced] = useState(false)

	return (
		<Fragment>
			<TooltipProvider>
				<ComponentDoc
					title="Tooltip"
					description="Contextual information popups that appear on hover or focus. Perfect for providing additional details, explanations, and helpful hints without cluttering the interface."
					component={
						<div className="flex flex-col gap-8 w-full max-w-6xl">
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
								<h3 className="text-lg font-semibold mb-4">Tooltip Applications</h3>
								<div className="grid grid-cols-1 gap-8">
									<Card>
										<CardHeader>
											<CardTitle className="flex items-center gap-2">
												<UserIcon className="w-5 h-5" />
												User Interface Elements
											</CardTitle>
											<CardDescription>Navigation, buttons, and form elements with helpful tooltips</CardDescription>
										</CardHeader>
										<CardContent>
											<UserInterfaceTooltips />
										</CardContent>
									</Card>

									<Card>
										<CardHeader>
											<CardTitle className="flex items-center gap-2">
												<BarChartIcon className="w-5 h-5" />
												Data Visualization
											</CardTitle>
											<CardDescription>Charts and metrics with detailed information tooltips</CardDescription>
										</CardHeader>
										<CardContent>
											<DataDisplayTooltips />
										</CardContent>
									</Card>

									<Card>
										<CardHeader>
											<CardTitle className="flex items-center gap-2">
												<UserIcon className="w-5 h-5" />
												Contact Directory
											</CardTitle>
											<CardDescription>Team member profiles with comprehensive contact details</CardDescription>
										</CardHeader>
										<CardContent>
											<ContactCardTooltips />
										</CardContent>
									</Card>
								</div>
							</div>

							{/* Advanced Examples */}
							{showAdvanced && (
								<div>
									<h3 className="text-lg font-semibold mb-4">Advanced Examples</h3>
									<Card>
										<CardHeader>
											<CardTitle className="flex items-center gap-2">
												<ShieldIcon className="w-5 h-5" />
												System Status
											</CardTitle>
											<CardDescription>Real-time system health with detailed status information</CardDescription>
										</CardHeader>
										<CardContent>
											<SystemStatusTooltips />
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
									<CardDescription>Best practices for implementing informative tooltips</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										<div>
											<h4 className="font-semibold mb-2">When to Use</h4>
											<ul className="space-y-1 text-sm text-muted-foreground">
												<li>• For providing additional context without cluttering the UI</li>
												<li>• To explain complex data points or metrics</li>
												<li>• For icon-only buttons that need clarification</li>
												<li>• To show detailed information about truncated content</li>
												<li>• For form field help and validation guidance</li>
											</ul>
										</div>
										<Separator />
										<div>
											<h4 className="font-semibold mb-2">Design Principles</h4>
											<ul className="space-y-1 text-sm text-muted-foreground">
												<li>• Keep tooltip content concise and scannable</li>
												<li>• Position tooltips to avoid covering important content</li>
												<li>• Use consistent timing for show/hide animations</li>
												<li>• Ensure tooltips are accessible via keyboard navigation</li>
												<li>• Include rich content (icons, formatting) when helpful</li>
												<li>• Avoid tooltips on mobile devices where hover isn't available</li>
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
											<strong>Use Cases:</strong> UI Elements, Data Viz, Contacts{showAdvanced ? ', System Status' : ''}
										</p>
										<p>
											<strong>Features:</strong> Rich Content, Multiple Positions, Keyboard Accessible
										</p>
									</div>
								</div>
							</div>
						</div>
					}
				/>
			</TooltipProvider>
		</Fragment>
	)
}
