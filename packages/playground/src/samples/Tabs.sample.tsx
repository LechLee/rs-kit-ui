import { Fragment, useState } from 'react'
import { 
	Tabs, 
	TabsContent, 
	TabsList, 
	TabsTrigger,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
	Button,
	Input,
	Label,
	Badge,
	Avatar,
	AvatarFallback,
	AvatarImage,
	Progress,
	Switch,
	Textarea,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@rs-kit/ui-kit'
import { 
	UserIcon,
	SettingsIcon,
	BellIcon,
	ShieldIcon,
	CreditCardIcon,
	ActivityIcon,
	FileTextIcon,
	BarChart3Icon,
	TrendingUpIcon,
	TrendingDownIcon,
	StarIcon,
	MessageSquareIcon,
	CalendarIcon,
	ClockIcon,
	CheckIcon,
	XIcon,
	PlusIcon,
	EditIcon,
	TrashIcon,
	DownloadIcon,
	UploadIcon,
	RefreshCwIcon,
	EyeIcon,
	EyeOffIcon
} from 'lucide-react'
import { ComponentDoc } from '@/components/ComponentDoc'

export default function TabsSample() {
	// State for interactive examples
	const [activeTab, setActiveTab] = useState('overview')
	const [settingsTab, setSettingsTab] = useState('account')
	const [notifications, setNotifications] = useState(true)
	const [emailUpdates, setEmailUpdates] = useState(false)
	const [profileName, setProfileName] = useState('John Doe')
	const [profileEmail, setProfileEmail] = useState('john.doe@example.com')

	// Sample data
	const projectStats = {
		totalProjects: 12,
		activeProjects: 8,
		completedThisMonth: 4,
		revenue: 24750
	}

	const recentActivities = [
		{ id: 1, action: 'Created new project', time: '2 hours ago', type: 'create' },
		{ id: 2, action: 'Updated dashboard design', time: '4 hours ago', type: 'update' },
		{ id: 3, action: 'Completed client review', time: '1 day ago', type: 'complete' },
		{ id: 4, action: 'Added new team member', time: '2 days ago', type: 'create' }
	]

	const teamMembers = [
		{ id: 1, name: 'Alice Johnson', role: 'Designer', avatar: 'https://github.com/shadcn.png', status: 'online' },
		{ id: 2, name: 'Bob Smith', role: 'Developer', avatar: null, status: 'away' },
		{ id: 3, name: 'Carol Brown', role: 'Manager', avatar: 'https://github.com/leerob.png', status: 'online' },
		{ id: 4, name: 'David Lee', role: 'Developer', avatar: null, status: 'offline' }
	]

	const getActivityIcon = (type: string) => {
		switch (type) {
			case 'create': return <PlusIcon className="w-4 h-4 text-green-600" />
			case 'update': return <EditIcon className="w-4 h-4 text-blue-600" />
			case 'complete': return <CheckIcon className="w-4 h-4 text-purple-600" />
			default: return <ActivityIcon className="w-4 h-4 text-gray-600" />
		}
	}

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'online': return 'bg-green-500'
			case 'away': return 'bg-yellow-500'
			case 'offline': return 'bg-gray-400'
			default: return 'bg-gray-400'
		}
	}

	return (
		<Fragment>
			<ComponentDoc
				title="Tabs"
				description="A set of layered sections of content that display one panel at a time. Perfect for organizing related content and reducing cognitive load."
				component={
					<div className="flex flex-col gap-8 w-full max-w-6xl">
						{/* Basic Tabs */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Basic Tabs</h3>
							<div className="space-y-6">
								<div>
									<h4 className="text-sm font-medium text-gray-600 mb-3">Simple Form Tabs</h4>
									<Tabs defaultValue="account" className="w-full max-w-md">
										<TabsList className="grid w-full grid-cols-2">
											<TabsTrigger value="account">Account</TabsTrigger>
											<TabsTrigger value="password">Password</TabsTrigger>
										</TabsList>
										<TabsContent value="account" className="space-y-4">
											<Card>
												<CardHeader>
													<CardTitle>Account</CardTitle>
													<CardDescription>
														Make changes to your account here. Click save when you're done.
													</CardDescription>
												</CardHeader>
												<CardContent className="space-y-4">
													<div className="space-y-2">
														<Label htmlFor="name">Name</Label>
														<Input 
															id="name" 
															value={profileName}
															onChange={(e) => setProfileName(e.target.value)}
														/>
													</div>
													<div className="space-y-2">
														<Label htmlFor="email">Email</Label>
														<Input 
															id="email" 
															type="email"
															value={profileEmail}
															onChange={(e) => setProfileEmail(e.target.value)}
														/>
													</div>
												</CardContent>
												<CardFooter>
													<Button>Save changes</Button>
												</CardFooter>
											</Card>
										</TabsContent>
										<TabsContent value="password" className="space-y-4">
											<Card>
												<CardHeader>
													<CardTitle>Password</CardTitle>
													<CardDescription>
														Change your password here. After saving, you'll be logged out.
													</CardDescription>
												</CardHeader>
												<CardContent className="space-y-4">
													<div className="space-y-2">
														<Label htmlFor="current">Current password</Label>
														<Input id="current" type="password" />
													</div>
													<div className="space-y-2">
														<Label htmlFor="new">New password</Label>
														<Input id="new" type="password" />
													</div>
													<div className="space-y-2">
														<Label htmlFor="confirm">Confirm password</Label>
														<Input id="confirm" type="password" />
													</div>
												</CardContent>
												<CardFooter>
													<Button>Save password</Button>
												</CardFooter>
											</Card>
										</TabsContent>
									</Tabs>
								</div>

								<div>
									<h4 className="text-sm font-medium text-gray-600 mb-3">Multiple Tab Layout</h4>
									<Tabs defaultValue="profile" className="w-full max-w-2xl">
										<TabsList className="grid w-full grid-cols-4">
											<TabsTrigger value="profile">
												<UserIcon className="w-4 h-4 mr-2" />
												Profile
											</TabsTrigger>
											<TabsTrigger value="settings">
												<SettingsIcon className="w-4 h-4 mr-2" />
												Settings
											</TabsTrigger>
											<TabsTrigger value="notifications">
												<BellIcon className="w-4 h-4 mr-2" />
												Notifications
											</TabsTrigger>
											<TabsTrigger value="security">
												<ShieldIcon className="w-4 h-4 mr-2" />
												Security
											</TabsTrigger>
										</TabsList>
										<TabsContent value="profile" className="space-y-4">
											<Card>
												<CardHeader>
													<CardTitle>Profile Information</CardTitle>
													<CardDescription>Update your profile details and bio.</CardDescription>
												</CardHeader>
												<CardContent className="space-y-4">
													<div className="flex items-center gap-4">
														<Avatar className="w-16 h-16">
															<AvatarImage src="https://github.com/shadcn.png" />
															<AvatarFallback>JD</AvatarFallback>
														</Avatar>
														<div className="space-y-2">
															<Button size="sm">Change photo</Button>
															<p className="text-xs text-muted-foreground">JPG, GIF or PNG. 1MB max.</p>
														</div>
													</div>
													<div className="grid grid-cols-2 gap-4">
														<div className="space-y-2">
															<Label htmlFor="firstName">First name</Label>
															<Input id="firstName" value="John" />
														</div>
														<div className="space-y-2">
															<Label htmlFor="lastName">Last name</Label>
															<Input id="lastName" value="Doe" />
														</div>
													</div>
													<div className="space-y-2">
														<Label htmlFor="bio">Bio</Label>
														<Textarea 
															id="bio" 
															placeholder="Tell us about yourself"
															className="min-h-[100px]"
														/>
													</div>
												</CardContent>
											</Card>
										</TabsContent>
										<TabsContent value="settings" className="space-y-4">
											<Card>
												<CardHeader>
													<CardTitle>App Settings</CardTitle>
													<CardDescription>Configure your app preferences.</CardDescription>
												</CardHeader>
												<CardContent className="space-y-6">
													<div className="flex items-center justify-between">
														<div className="space-y-0.5">
															<Label>Email notifications</Label>
															<p className="text-sm text-muted-foreground">
																Receive notifications via email
															</p>
														</div>
														<Switch 
															checked={emailUpdates}
															onCheckedChange={setEmailUpdates}
														/>
													</div>
													<div className="flex items-center justify-between">
														<div className="space-y-0.5">
															<Label>Push notifications</Label>
															<p className="text-sm text-muted-foreground">
																Receive push notifications in browser
															</p>
														</div>
														<Switch 
															checked={notifications}
															onCheckedChange={setNotifications}
														/>
													</div>
													<div className="space-y-2">
														<Label>Language</Label>
														<Select defaultValue="en">
															<SelectTrigger>
																<SelectValue />
															</SelectTrigger>
															<SelectContent>
																<SelectItem value="en">English</SelectItem>
																<SelectItem value="fr">French</SelectItem>
																<SelectItem value="de">German</SelectItem>
																<SelectItem value="es">Spanish</SelectItem>
															</SelectContent>
														</Select>
													</div>
												</CardContent>
											</Card>
										</TabsContent>
										<TabsContent value="notifications" className="space-y-4">
											<Card>
												<CardHeader>
													<CardTitle>Notification Settings</CardTitle>
													<CardDescription>Choose what notifications you want to receive.</CardDescription>
												</CardHeader>
												<CardContent className="space-y-4">
													<div className="space-y-4">
														{[
															{ id: 'comments', label: 'Comments', description: 'Get notified when someone comments on your posts' },
															{ id: 'mentions', label: 'Mentions', description: 'Get notified when someone mentions you' },
															{ id: 'followers', label: 'New followers', description: 'Get notified when someone follows you' },
															{ id: 'messages', label: 'Direct messages', description: 'Get notified when you receive a direct message' }
														].map((item) => (
															<div key={item.id} className="flex items-center justify-between">
																<div className="space-y-0.5">
																	<Label>{item.label}</Label>
																	<p className="text-sm text-muted-foreground">
																		{item.description}
																	</p>
																</div>
																<Switch defaultChecked={item.id === 'comments' || item.id === 'messages'} />
															</div>
														))}
													</div>
												</CardContent>
											</Card>
										</TabsContent>
										<TabsContent value="security" className="space-y-4">
											<Card>
												<CardHeader>
													<CardTitle>Security Settings</CardTitle>
													<CardDescription>Manage your account security and privacy.</CardDescription>
												</CardHeader>
												<CardContent className="space-y-4">
													<div className="space-y-4">
														<div className="flex items-center justify-between p-4 border rounded-lg">
															<div>
																<p className="font-medium">Two-factor authentication</p>
																<p className="text-sm text-muted-foreground">Add an extra layer of security</p>
															</div>
															<Button variant="outline" size="sm">Enable</Button>
														</div>
														<div className="flex items-center justify-between p-4 border rounded-lg">
															<div>
																<p className="font-medium">Login activity</p>
																<p className="text-sm text-muted-foreground">See recent login activity</p>
															</div>
															<Button variant="outline" size="sm">View</Button>
														</div>
														<div className="flex items-center justify-between p-4 border rounded-lg">
															<div>
																<p className="font-medium">Connected accounts</p>
																<p className="text-sm text-muted-foreground">Manage linked social accounts</p>
															</div>
															<Button variant="outline" size="sm">Manage</Button>
														</div>
													</div>
												</CardContent>
											</Card>
										</TabsContent>
									</Tabs>
								</div>
							</div>
						</div>

						{/* Dashboard Tabs */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Dashboard Tabs</h3>
							<Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
								<TabsList className="grid w-full grid-cols-5">
									<TabsTrigger value="overview">
										<BarChart3Icon className="w-4 h-4 mr-2" />
										Overview
									</TabsTrigger>
									<TabsTrigger value="projects">
										<FileTextIcon className="w-4 h-4 mr-2" />
										Projects
									</TabsTrigger>
									<TabsTrigger value="team">
										<UserIcon className="w-4 h-4 mr-2" />
										Team
									</TabsTrigger>
									<TabsTrigger value="analytics">
										<TrendingUpIcon className="w-4 h-4 mr-2" />
										Analytics
									</TabsTrigger>
									<TabsTrigger value="activity">
										<ActivityIcon className="w-4 h-4 mr-2" />
										Activity
									</TabsTrigger>
								</TabsList>

								<TabsContent value="overview" className="space-y-6">
									<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
										<Card>
											<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
												<CardTitle className="text-sm font-medium">Total Projects</CardTitle>
												<FileTextIcon className="h-4 w-4 text-muted-foreground" />
											</CardHeader>
											<CardContent>
												<div className="text-2xl font-bold">{projectStats.totalProjects}</div>
												<p className="text-xs text-muted-foreground">
													+2 from last month
												</p>
											</CardContent>
										</Card>
										<Card>
											<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
												<CardTitle className="text-sm font-medium">Active Projects</CardTitle>
												<ActivityIcon className="h-4 w-4 text-muted-foreground" />
											</CardHeader>
											<CardContent>
												<div className="text-2xl font-bold">{projectStats.activeProjects}</div>
												<p className="text-xs text-muted-foreground">
													+1 from last week
												</p>
											</CardContent>
										</Card>
										<Card>
											<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
												<CardTitle className="text-sm font-medium">Completed</CardTitle>
												<CheckIcon className="h-4 w-4 text-muted-foreground" />
											</CardHeader>
											<CardContent>
												<div className="text-2xl font-bold">{projectStats.completedThisMonth}</div>
												<p className="text-xs text-muted-foreground">
													This month
												</p>
											</CardContent>
										</Card>
										<Card>
											<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
												<CardTitle className="text-sm font-medium">Revenue</CardTitle>
												<CreditCardIcon className="h-4 w-4 text-muted-foreground" />
											</CardHeader>
											<CardContent>
												<div className="text-2xl font-bold">${projectStats.revenue.toLocaleString()}</div>
												<p className="text-xs text-muted-foreground">
													+12% from last month
												</p>
											</CardContent>
										</Card>
									</div>

									<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
										<Card>
											<CardHeader>
												<CardTitle>Project Progress</CardTitle>
												<CardDescription>Current active projects and their completion status</CardDescription>
											</CardHeader>
											<CardContent className="space-y-4">
												{[
													{ name: 'Website Redesign', progress: 75, status: 'In Progress' },
													{ name: 'Mobile App', progress: 45, status: 'In Progress' },
													{ name: 'Dashboard UI', progress: 90, status: 'Near Completion' },
													{ name: 'API Integration', progress: 25, status: 'Started' }
												].map((project, index) => (
													<div key={index} className="space-y-2">
														<div className="flex justify-between items-center">
															<p className="text-sm font-medium">{project.name}</p>
															<span className="text-sm text-muted-foreground">{project.progress}%</span>
														</div>
														<Progress value={project.progress} />
														<p className="text-xs text-muted-foreground">{project.status}</p>
													</div>
												))}
											</CardContent>
										</Card>

										<Card>
											<CardHeader>
												<CardTitle>Recent Activity</CardTitle>
												<CardDescription>Latest updates across your projects</CardDescription>
											</CardHeader>
											<CardContent>
												<div className="space-y-4">
													{recentActivities.map((activity) => (
														<div key={activity.id} className="flex items-center gap-3">
															{getActivityIcon(activity.type)}
															<div className="flex-1">
																<p className="text-sm font-medium">{activity.action}</p>
																<p className="text-xs text-muted-foreground">{activity.time}</p>
															</div>
														</div>
													))}
												</div>
											</CardContent>
										</Card>
									</div>
								</TabsContent>

								<TabsContent value="projects" className="space-y-6">
									<div className="flex justify-between items-center">
										<div>
											<h3 className="text-lg font-semibold">Projects</h3>
											<p className="text-muted-foreground">Manage your active and completed projects</p>
										</div>
										<Button>
											<PlusIcon className="w-4 h-4 mr-2" />
											New Project
										</Button>
									</div>

									<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
										{[
											{ name: 'E-commerce Platform', status: 'active', progress: 75, dueDate: '2024-01-15', team: 4 },
											{ name: 'Mobile Banking App', status: 'active', progress: 45, dueDate: '2024-02-20', team: 6 },
											{ name: 'Dashboard Analytics', status: 'completed', progress: 100, dueDate: '2023-12-30', team: 3 },
											{ name: 'Marketing Website', status: 'active', progress: 30, dueDate: '2024-01-25', team: 2 },
											{ name: 'API Documentation', status: 'planning', progress: 10, dueDate: '2024-03-01', team: 2 },
											{ name: 'User Research Tool', status: 'active', progress: 65, dueDate: '2024-02-10', team: 5 }
										].map((project, index) => (
											<Card key={index}>
												<CardHeader>
													<div className="flex justify-between items-start">
														<CardTitle className="text-sm">{project.name}</CardTitle>
														<Badge variant={
															project.status === 'completed' ? 'default' :
															project.status === 'active' ? 'secondary' : 'outline'
														}>
															{project.status}
														</Badge>
													</div>
												</CardHeader>
												<CardContent className="space-y-3">
													<div className="space-y-1">
														<div className="flex justify-between text-sm">
															<span>Progress</span>
															<span>{project.progress}%</span>
														</div>
														<Progress value={project.progress} />
													</div>
													<div className="flex justify-between text-sm text-muted-foreground">
														<span>Due: {project.dueDate}</span>
														<span>{project.team} members</span>
													</div>
												</CardContent>
												<CardFooter className="flex gap-2">
													<Button variant="outline" size="sm">
														<EyeIcon className="w-4 h-4 mr-1" />
														View
													</Button>
													<Button variant="outline" size="sm">
														<EditIcon className="w-4 h-4 mr-1" />
														Edit
													</Button>
												</CardFooter>
											</Card>
										))}
									</div>
								</TabsContent>

								<TabsContent value="team" className="space-y-6">
									<div className="flex justify-between items-center">
										<div>
											<h3 className="text-lg font-semibold">Team Members</h3>
											<p className="text-muted-foreground">Manage your team and their permissions</p>
										</div>
										<Button>
											<PlusIcon className="w-4 h-4 mr-2" />
											Invite Member
										</Button>
									</div>

									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										{teamMembers.map((member) => (
											<Card key={member.id}>
												<CardContent className="p-6">
													<div className="flex items-center gap-4">
														<div className="relative">
															<Avatar>
																{member.avatar ? (
																	<AvatarImage src={member.avatar} />
																) : null}
																<AvatarFallback>
																	{member.name.split(' ').map(n => n[0]).join('')}
																</AvatarFallback>
															</Avatar>
															<div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${getStatusColor(member.status)}`} />
														</div>
														<div className="flex-1">
															<h4 className="font-medium">{member.name}</h4>
															<p className="text-sm text-muted-foreground">{member.role}</p>
															<p className="text-xs text-muted-foreground capitalize">{member.status}</p>
														</div>
														<div className="flex gap-2">
															<Button variant="outline" size="sm">
																<MessageSquareIcon className="w-4 h-4" />
															</Button>
															<Button variant="outline" size="sm">
																<SettingsIcon className="w-4 h-4" />
															</Button>
														</div>
													</div>
												</CardContent>
											</Card>
										))}
									</div>
								</TabsContent>

								<TabsContent value="analytics" className="space-y-6">
									<div>
										<h3 className="text-lg font-semibold">Analytics</h3>
										<p className="text-muted-foreground">Performance metrics and insights</p>
									</div>

									<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
										<Card>
											<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
												<CardTitle className="text-sm font-medium">Page Views</CardTitle>
												<TrendingUpIcon className="h-4 w-4 text-green-600" />
											</CardHeader>
											<CardContent>
												<div className="text-2xl font-bold">12,234</div>
												<p className="text-xs text-muted-foreground">
													<span className="text-green-600">+5.2%</span> from last week
												</p>
											</CardContent>
										</Card>
										<Card>
											<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
												<CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
												<TrendingUpIcon className="h-4 w-4 text-green-600" />
											</CardHeader>
											<CardContent>
												<div className="text-2xl font-bold">8,421</div>
												<p className="text-xs text-muted-foreground">
													<span className="text-green-600">+2.1%</span> from last week
												</p>
											</CardContent>
										</Card>
										<Card>
											<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
												<CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
												<TrendingDownIcon className="h-4 w-4 text-red-600" />
											</CardHeader>
											<CardContent>
												<div className="text-2xl font-bold">24.3%</div>
												<p className="text-xs text-muted-foreground">
													<span className="text-red-600">+1.2%</span> from last week
												</p>
											</CardContent>
										</Card>
									</div>

									<Card>
										<CardHeader>
											<CardTitle>Performance Metrics</CardTitle>
											<CardDescription>Key performance indicators for your projects</CardDescription>
										</CardHeader>
										<CardContent>
											<div className="space-y-4">
												{[
													{ metric: 'User Engagement', value: 78, change: '+5%', trend: 'up' },
													{ metric: 'Conversion Rate', value: 3.2, change: '+0.8%', trend: 'up' },
													{ metric: 'Load Time', value: 1.4, change: '-0.2s', trend: 'up' },
													{ metric: 'Error Rate', value: 0.8, change: '-0.3%', trend: 'up' }
												].map((item, index) => (
													<div key={index} className="flex items-center justify-between">
														<div className="space-y-1">
															<p className="text-sm font-medium">{item.metric}</p>
															<div className="flex items-center gap-2">
																<span className="text-2xl font-bold">{item.value}{item.metric === 'Load Time' ? 's' : item.metric === 'Conversion Rate' || item.metric === 'Error Rate' ? '%' : ''}</span>
																<span className={`text-sm ${item.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
																	{item.change}
																</span>
															</div>
														</div>
														{item.trend === 'up' ? (
															<TrendingUpIcon className="h-5 w-5 text-green-600" />
														) : (
															<TrendingDownIcon className="h-5 w-5 text-red-600" />
														)}
													</div>
												))}
											</div>
										</CardContent>
									</Card>
								</TabsContent>

								<TabsContent value="activity" className="space-y-6">
									<div>
										<h3 className="text-lg font-semibold">Activity Feed</h3>
										<p className="text-muted-foreground">Recent activity across all your projects</p>
									</div>

									<Card>
										<CardContent className="p-6">
											<div className="space-y-6">
												{[
													{ 
														user: 'Alice Johnson', 
														action: 'completed the mobile app wireframes', 
														time: '2 hours ago',
														type: 'complete',
														details: 'Finished all 12 wireframe screens for the iOS app'
													},
													{ 
														user: 'Bob Smith', 
														action: 'pushed new code to the repository', 
														time: '4 hours ago',
														type: 'update',
														details: 'Added authentication middleware and user sessions'
													},
													{ 
														user: 'Carol Brown', 
														action: 'created a new project milestone', 
														time: '6 hours ago',
														type: 'create',
														details: 'Sprint 3: API Integration and Testing phase'
													},
													{ 
														user: 'David Lee', 
														action: 'updated the project documentation', 
														time: '1 day ago',
														type: 'update',
														details: 'Added deployment instructions and environment setup'
													},
													{ 
														user: 'Alice Johnson', 
														action: 'commented on the design review', 
														time: '1 day ago',
														type: 'comment',
														details: 'Suggested improvements to the navigation flow'
													},
													{ 
														user: 'Bob Smith', 
														action: 'completed user authentication feature', 
														time: '2 days ago',
														type: 'complete',
														details: 'Implemented OAuth integration with Google and GitHub'
													}
												].map((activity, index) => (
													<div key={index} className="flex gap-4">
														<div className="flex-shrink-0">
															<Avatar className="h-8 w-8">
																<AvatarFallback>
																	{activity.user.split(' ').map(n => n[0]).join('')}
																</AvatarFallback>
															</Avatar>
														</div>
														<div className="flex-1 space-y-1">
															<p className="text-sm">
																<span className="font-medium">{activity.user}</span> {activity.action}
															</p>
															<p className="text-xs text-muted-foreground">{activity.details}</p>
															<p className="text-xs text-muted-foreground flex items-center gap-1">
																<ClockIcon className="w-3 h-3" />
																{activity.time}
															</p>
														</div>
														<div className="flex-shrink-0">
															{getActivityIcon(activity.type)}
														</div>
													</div>
												))}
											</div>
										</CardContent>
									</Card>
								</TabsContent>
							</Tabs>
						</div>

						{/* Vertical Tabs */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Vertical Tabs Layout</h3>
							<Tabs orientation="vertical" value={settingsTab} onValueChange={setSettingsTab} className="flex gap-6">
								<TabsList className="flex flex-col h-fit w-fit">
									<TabsTrigger value="account" className="w-full justify-start">
										<UserIcon className="w-4 h-4 mr-2" />
										Account
									</TabsTrigger>
									<TabsTrigger value="billing" className="w-full justify-start">
										<CreditCardIcon className="w-4 h-4 mr-2" />
										Billing
									</TabsTrigger>
									<TabsTrigger value="notifications" className="w-full justify-start">
										<BellIcon className="w-4 h-4 mr-2" />
										Notifications
									</TabsTrigger>
									<TabsTrigger value="privacy" className="w-full justify-start">
										<ShieldIcon className="w-4 h-4 mr-2" />
										Privacy
									</TabsTrigger>
								</TabsList>
								
								<div className="flex-1">
									<TabsContent value="account" className="mt-0">
										<Card>
											<CardHeader>
												<CardTitle>Account Settings</CardTitle>
												<CardDescription>Manage your account information and preferences.</CardDescription>
											</CardHeader>
											<CardContent className="space-y-4">
												<div className="grid grid-cols-2 gap-4">
													<div className="space-y-2">
														<Label>First Name</Label>
														<Input defaultValue="John" />
													</div>
													<div className="space-y-2">
														<Label>Last Name</Label>
														<Input defaultValue="Doe" />
													</div>
												</div>
												<div className="space-y-2">
													<Label>Email Address</Label>
													<Input type="email" defaultValue="john.doe@example.com" />
												</div>
												<div className="space-y-2">
													<Label>Phone Number</Label>
													<Input type="tel" defaultValue="+1 (555) 123-4567" />
												</div>
											</CardContent>
											<CardFooter>
												<Button>Save Changes</Button>
											</CardFooter>
										</Card>
									</TabsContent>
									
									<TabsContent value="billing" className="mt-0">
										<Card>
											<CardHeader>
												<CardTitle>Billing Information</CardTitle>
												<CardDescription>Manage your billing details and subscription.</CardDescription>
											</CardHeader>
											<CardContent className="space-y-4">
												<div className="p-4 border rounded-lg">
													<div className="flex justify-between items-center">
														<div>
															<p className="font-medium">Pro Plan</p>
															<p className="text-sm text-muted-foreground">$29/month</p>
														</div>
														<Badge>Active</Badge>
													</div>
												</div>
												<div className="space-y-2">
													<Label>Payment Method</Label>
													<div className="p-3 border rounded-lg flex items-center justify-between">
														<div className="flex items-center gap-3">
															<CreditCardIcon className="w-5 h-5" />
															<div>
																<p className="text-sm font-medium">**** **** **** 1234</p>
																<p className="text-xs text-muted-foreground">Expires 12/25</p>
															</div>
														</div>
														<Button variant="outline" size="sm">Update</Button>
													</div>
												</div>
											</CardContent>
											<CardFooter className="flex gap-2">
												<Button variant="outline">Download Invoice</Button>
												<Button variant="outline">Cancel Subscription</Button>
											</CardFooter>
										</Card>
									</TabsContent>
									
									<TabsContent value="notifications" className="mt-0">
										<Card>
											<CardHeader>
												<CardTitle>Notification Preferences</CardTitle>
												<CardDescription>Choose how you want to be notified.</CardDescription>
											</CardHeader>
											<CardContent className="space-y-6">
												{[
													{ id: 'email', label: 'Email Notifications', description: 'Receive updates via email' },
													{ id: 'push', label: 'Push Notifications', description: 'Browser push notifications' },
													{ id: 'sms', label: 'SMS Notifications', description: 'Text message alerts' },
													{ id: 'slack', label: 'Slack Integration', description: 'Notifications in Slack channels' }
												].map((notification) => (
													<div key={notification.id} className="flex items-center justify-between">
														<div className="space-y-0.5">
															<Label>{notification.label}</Label>
															<p className="text-sm text-muted-foreground">
																{notification.description}
															</p>
														</div>
														<Switch />
													</div>
												))}
											</CardContent>
										</Card>
									</TabsContent>
									
									<TabsContent value="privacy" className="mt-0">
										<Card>
											<CardHeader>
												<CardTitle>Privacy Settings</CardTitle>
												<CardDescription>Control your privacy and data sharing preferences.</CardDescription>
											</CardHeader>
											<CardContent className="space-y-4">
												<div className="space-y-4">
													{[
														{ label: 'Profile Visibility', description: 'Make your profile visible to other users' },
														{ label: 'Activity Status', description: 'Show when you\'re online or active' },
														{ label: 'Data Analytics', description: 'Allow us to use your data for analytics' },
														{ label: 'Marketing Emails', description: 'Receive marketing and promotional emails' }
													].map((item, index) => (
														<div key={index} className="flex items-center justify-between">
															<div className="space-y-0.5">
																<Label>{item.label}</Label>
																<p className="text-sm text-muted-foreground">
																	{item.description}
																</p>
															</div>
															<Switch defaultChecked={index < 2} />
														</div>
													))}
												</div>
											</CardContent>
											<CardFooter>
												<Button variant="destructive">Delete Account</Button>
											</CardFooter>
										</Card>
									</TabsContent>
								</div>
							</Tabs>
						</div>

						{/* Current State Display */}
						<div className="mt-6 p-4 bg-gray-50 rounded-lg">
							<h4 className="text-sm font-semibold text-gray-700 mb-2">Interactive State:</h4>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600">
								<div>
									<p><strong>Active Tab:</strong> {activeTab}</p>
									<p><strong>Settings Tab:</strong> {settingsTab}</p>
								</div>
								<div>
									<p><strong>Profile Name:</strong> {profileName}</p>
									<p><strong>Profile Email:</strong> {profileEmail}</p>
								</div>
								<div>
									<p><strong>Notifications:</strong> {notifications ? 'Enabled' : 'Disabled'}</p>
									<p><strong>Email Updates:</strong> {emailUpdates ? 'Enabled' : 'Disabled'}</p>
								</div>
							</div>
						</div>
					</div>
				}
			/>

			<ComponentDoc
				title="Tabs Props & Usage Guidelines"
				description="Comprehensive guide to Tabs component structure, orientation, and best practices."
				component={
					<div className="flex flex-col gap-6 w-full max-w-4xl">
						{/* Props Reference */}
						<div className="p-4 bg-blue-50 rounded-lg">
							<h4 className="text-sm font-semibold text-blue-700 mb-2">Props Reference:</h4>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-600">
								<div>
									<strong>Tabs Container:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li><code>defaultValue</code> - Initially active tab</li>
										<li><code>value</code> - Controlled active tab</li>
										<li><code>onValueChange</code> - Tab change handler</li>
										<li><code>orientation</code> - "horizontal" | "vertical"</li>
										<li><code>className</code> - Additional CSS classes</li>
									</ul>
								</div>
								<div>
									<strong>TabsList:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li><code>className</code> - List container styling</li>
										<li><code>children</code> - TabsTrigger components</li>
										<li>Automatic keyboard navigation</li>
										<li>ARIA attributes for accessibility</li>
									</ul>
								</div>
								<div>
									<strong>TabsTrigger:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li><code>value</code> - Unique tab identifier</li>
										<li><code>disabled</code> - Disable tab selection</li>
										<li><code>className</code> - Custom trigger styling</li>
										<li><code>children</code> - Tab label content</li>
									</ul>
								</div>
								<div>
									<strong>TabsContent:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li><code>value</code> - Matching tab identifier</li>
										<li><code>className</code> - Content panel styling</li>
										<li><code>children</code> - Tab panel content</li>
										<li>Automatic show/hide behavior</li>
									</ul>
								</div>
							</div>
						</div>

						{/* Usage Guidelines */}
						<div className="p-4 bg-green-50 rounded-lg">
							<h4 className="text-sm font-semibold text-green-700 mb-2">Usage Guidelines:</h4>
							<ul className="text-sm text-green-600 space-y-1 list-disc list-inside">
								<li><strong>Content Organization:</strong> Use tabs to group related content that users need to access frequently</li>
								<li><strong>Tab Labels:</strong> Keep tab labels short, descriptive, and action-oriented</li>
								<li><strong>Tab Count:</strong> Limit to 7±2 tabs for optimal cognitive load (use scrolling for more)</li>
								<li><strong>Default Selection:</strong> Always have a default active tab that makes sense for your users</li>
								<li><strong>Consistent Content:</strong> Ensure tab content is at similar levels of hierarchy and detail</li>
								<li><strong>Navigation Context:</strong> Don't use tabs for sequential flows (use stepper instead)</li>
								<li><strong>Mobile Considerations:</strong> Consider vertical tabs or different layout on smaller screens</li>
								<li><strong>State Management:</strong> Use controlled tabs when tab state needs to persist or sync with URL</li>
							</ul>
						</div>

						{/* Code Examples */}
						<div className="p-4 bg-gray-100 rounded-lg">
							<h4 className="text-sm font-semibold text-gray-700 mb-2">Code Examples:</h4>
							<pre className="text-xs text-gray-600 overflow-x-auto whitespace-pre-wrap">
{`// Basic horizontal tabs
<Tabs defaultValue="account" className="w-[400px]">
  <TabsList className="grid w-full grid-cols-2">
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    <Card>
      <CardHeader>
        <CardTitle>Account</CardTitle>
        <CardDescription>Make changes to your account.</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Account form content */}
      </CardContent>
    </Card>
  </TabsContent>
  <TabsContent value="password">
    {/* Password form content */}
  </TabsContent>
</Tabs>

// Controlled tabs with state
const [activeTab, setActiveTab] = useState('overview')

<Tabs value={activeTab} onValueChange={setActiveTab}>
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="analytics">Analytics</TabsTrigger>
    <TabsTrigger value="reports">Reports</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">
    {/* Overview content */}
  </TabsContent>
  {/* Other tab contents */}
</Tabs>

// Vertical tabs layout
<Tabs orientation="vertical" defaultValue="general" className="flex gap-6">
  <TabsList className="flex flex-col h-fit w-fit">
    <TabsTrigger value="general" className="w-full justify-start">
      General
    </TabsTrigger>
    <TabsTrigger value="security" className="w-full justify-start">
      Security
    </TabsTrigger>
  </TabsList>
  <div className="flex-1">
    <TabsContent value="general">
      {/* General settings */}
    </TabsContent>
    <TabsContent value="security">
      {/* Security settings */}
    </TabsContent>
  </div>
</Tabs>

// Tabs with icons
<TabsList>
  <TabsTrigger value="dashboard">
    <BarChart3Icon className="w-4 h-4 mr-2" />
    Dashboard
  </TabsTrigger>
  <TabsTrigger value="users">
    <UserIcon className="w-4 h-4 mr-2" />
    Users
  </TabsTrigger>
</TabsList>`}
							</pre>
						</div>

						{/* Design Guidelines */}
						<div className="p-4 bg-purple-50 rounded-lg">
							<h4 className="text-sm font-semibold text-purple-700 mb-2">Design Guidelines:</h4>
							<ul className="text-sm text-purple-600 space-y-1 list-disc list-inside">
								<li><strong>Visual Hierarchy:</strong> Use clear visual distinction between active and inactive tabs</li>
								<li><strong>Consistent Spacing:</strong> Maintain consistent padding and margins across all tab content</li>
								<li><strong>Loading States:</strong> Show loading indicators when tab content is being fetched</li>
								<li><strong>Error Handling:</strong> Provide clear error states and recovery options within tab content</li>
								<li><strong>Keyboard Navigation:</strong> Ensure full keyboard accessibility with arrow keys and Enter</li>
								<li><strong>Responsive Design:</strong> Consider tab overflow, stacking, or alternative layouts on mobile</li>
								<li><strong>Animation:</strong> Use subtle transitions when switching between tabs for smooth UX</li>
								<li><strong>Content Consistency:</strong> Maintain similar content density and layout patterns across tabs</li>
							</ul>
						</div>
					</div>
				}
			/>
		</Fragment>
	)
}