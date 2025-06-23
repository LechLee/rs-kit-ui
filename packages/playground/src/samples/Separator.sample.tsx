import { Fragment, useState } from 'react'
import {
	Separator,
	Label,
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Badge,
	Switch,
	Avatar,
	AvatarFallback,
	AvatarImage
} from '@rs-kit/ui-kit'
import {
	UserIcon,
	MailIcon,
	PhoneIcon,
	MapPinIcon,
	CalendarIcon,
	StarIcon,
	DollarSignIcon,
	ShoppingCartIcon,
	CreditCardIcon,
	TruckIcon,
	InfoIcon,
	SettingsIcon,
	BellIcon,
	ShieldIcon,
	MenuIcon,
	HomeIcon,
	SearchIcon,
	BookOpenIcon,
	HelpCircleIcon,
	MessageSquareIcon,
	UsersIcon,
	BarChartIcon,
	FileTextIcon,
	HashIcon,
	GlobeIcon,
	LinkedinIcon,
	TwitterIcon,
	FacebookIcon,
	InstagramIcon
} from 'lucide-react'
import { ComponentDoc } from '@/components/ComponentDoc'

// Content Organization with Separators
const ContentOrganization = () => {
	const [showDetails, setShowDetails] = useState(true)

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold flex items-center gap-2">
					<FileTextIcon className="w-5 h-5" />
					Article Layout
				</Label>
				<p className="text-sm text-muted-foreground">Using separators to organize content sections and improve readability</p>
			</div>

			<div className="max-w-2xl space-y-4">
				<div>
					<h2 className="text-xl font-bold mb-2">Getting Started with React Hooks</h2>
					<div className="flex items-center gap-4 text-sm text-muted-foreground">
						<span>Published: March 15, 2024</span>
						<Separator orientation="vertical" className="h-4" />
						<span>5 min read</span>
						<Separator orientation="vertical" className="h-4" />
						<span>React, JavaScript</span>
					</div>
				</div>

				<Separator />

				<div className="space-y-4">
					<p className="text-muted-foreground">
						React Hooks have revolutionized the way we write React components. They allow us to use state and other React features in functional components.
					</p>

					{showDetails && (
						<>
							<h3 className="text-lg font-semibold">What You'll Learn</h3>
							<ul className="space-y-2 text-sm">
								<li>• Understanding useState Hook</li>
								<li>• Working with useEffect</li>
								<li>• Custom Hook patterns</li>
								<li>• Performance optimization</li>
							</ul>

							<Separator className="my-6" />

							<h3 className="text-lg font-semibold">Prerequisites</h3>
							<ul className="space-y-2 text-sm text-muted-foreground">
								<li>• Basic JavaScript knowledge</li>
								<li>• React fundamentals</li>
								<li>• ES6+ syntax familiarity</li>
							</ul>
						</>
					)}
				</div>

				<Separator />

				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Button variant="outline" size="sm">
							<StarIcon className="w-4 h-4 mr-1" />
							Bookmark
						</Button>
						<Button variant="outline" size="sm">
							Share
						</Button>
					</div>
					<Button variant="ghost" size="sm" onClick={() => setShowDetails(!showDetails)}>
						{showDetails ? 'Hide' : 'Show'} Details
					</Button>
				</div>
			</div>
		</div>
	)
}

// Navigation with Separators
const NavigationWithSeparators = () => {
	const [activeSection, setActiveSection] = useState('home')

	const navigationItems = [
		{ id: 'home', label: 'Home', icon: HomeIcon },
		{ id: 'search', label: 'Search', icon: SearchIcon },
		{ id: 'library', label: 'Library', icon: BookOpenIcon },
		{ id: 'help', label: 'Help', icon: HelpCircleIcon }
	]

	const accountItems = [
		{ id: 'profile', label: 'Profile', icon: UserIcon },
		{ id: 'settings', label: 'Settings', icon: SettingsIcon },
		{ id: 'notifications', label: 'Notifications', icon: BellIcon }
	]

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold flex items-center gap-2">
					<MenuIcon className="w-5 h-5" />
					Navigation Menu
				</Label>
				<p className="text-sm text-muted-foreground">Organizing navigation with logical groupings and separators</p>
			</div>

			<div className="max-w-xs">
				<Card>
					<CardContent className="p-4">
						<div className="space-y-2">
							<div className="space-y-1">
								{navigationItems.map((item) => {
									const IconComponent = item.icon
									return (
										<button
											key={item.id}
											onClick={() => setActiveSection(item.id)}
											className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
												activeSection === item.id
													? 'bg-blue-100 text-blue-700'
													: 'hover:bg-gray-100'
											}`}
										>
											<IconComponent className="w-4 h-4" />
											{item.label}
										</button>
									)
								})}
							</div>

							<Separator className="my-3" />

							<div className="space-y-1">
								{accountItems.map((item) => {
									const IconComponent = item.icon
									return (
										<button
											key={item.id}
											onClick={() => setActiveSection(item.id)}
											className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
												activeSection === item.id
													? 'bg-blue-100 text-blue-700'
													: 'hover:bg-gray-100'
											}`}
										>
											<IconComponent className="w-4 h-4" />
											{item.label}
										</button>
									)
								})}
							</div>

							<Separator className="my-3" />

							<button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-red-600 hover:bg-red-50">
								<div className="w-4 h-4" />
								Sign Out
							</button>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}

// Data Display with Separators
const DataDisplayWithSeparators = () => {
	const userProfile = {
		name: 'Sarah Johnson',
		email: 'sarah.johnson@example.com',
		phone: '+1 (555) 123-4567',
		location: 'San Francisco, CA',
		joinDate: 'January 2023',
		totalOrders: 24,
		totalSpent: 1299.50,
		favoriteCategory: 'Electronics'
	}

	const recentOrders = [
		{ id: '1001', date: '2024-03-15', amount: 89.99, status: 'Delivered' },
		{ id: '1002', date: '2024-03-10', amount: 149.50, status: 'Shipped' },
		{ id: '1003', date: '2024-03-05', amount: 29.99, status: 'Processing' }
	]

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold flex items-center gap-2">
					<UserIcon className="w-5 h-5" />
					Customer Profile
				</Label>
				<p className="text-sm text-muted-foreground">Displaying user information with clear section separation</p>
			</div>

			<Card className="max-w-md">
				<CardContent className="p-6">
					<div className="space-y-6">
						{/* Profile Header */}
						<div className="flex items-center gap-4">
							<Avatar className="w-16 h-16">
								<AvatarImage src="https://github.com/shadcn.png" />
								<AvatarFallback>SJ</AvatarFallback>
							</Avatar>
							<div>
								<h3 className="font-semibold text-lg">{userProfile.name}</h3>
								<p className="text-sm text-muted-foreground">Customer since {userProfile.joinDate}</p>
							</div>
						</div>

						<Separator />

						{/* Contact Information */}
						<div className="space-y-3">
							<h4 className="font-medium text-sm text-gray-700">Contact Information</h4>
							<div className="space-y-2">
								<div className="flex items-center gap-3 text-sm">
									<MailIcon className="w-4 h-4 text-muted-foreground" />
									<span>{userProfile.email}</span>
								</div>
								<div className="flex items-center gap-3 text-sm">
									<PhoneIcon className="w-4 h-4 text-muted-foreground" />
									<span>{userProfile.phone}</span>
								</div>
								<div className="flex items-center gap-3 text-sm">
									<MapPinIcon className="w-4 h-4 text-muted-foreground" />
									<span>{userProfile.location}</span>
								</div>
							</div>
						</div>

						<Separator />

						{/* Statistics */}
						<div className="space-y-3">
							<h4 className="font-medium text-sm text-gray-700">Account Summary</h4>
							<div className="grid grid-cols-2 gap-4 text-sm">
								<div>
									<div className="flex items-center gap-2">
										<ShoppingCartIcon className="w-4 h-4 text-muted-foreground" />
										<span className="text-muted-foreground">Orders</span>
									</div>
									<p className="font-semibold">{userProfile.totalOrders}</p>
								</div>
								<div>
									<div className="flex items-center gap-2">
										<DollarSignIcon className="w-4 h-4 text-muted-foreground" />
										<span className="text-muted-foreground">Total Spent</span>
									</div>
									<p className="font-semibold">${userProfile.totalSpent}</p>
								</div>
							</div>
						</div>

						<Separator />

						{/* Recent Activity */}
						<div className="space-y-3">
							<h4 className="font-medium text-sm text-gray-700">Recent Orders</h4>
							<div className="space-y-2">
								{recentOrders.map((order) => (
									<div key={order.id} className="flex items-center justify-between text-sm">
										<div>
											<p className="font-medium">#{order.id}</p>
											<p className="text-muted-foreground text-xs">{order.date}</p>
										</div>
										<div className="text-right">
											<p className="font-medium">${order.amount}</p>
											<Badge variant="outline" className="text-xs">
												{order.status}
											</Badge>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}

// Social Media Profile with Separators
const SocialMediaProfile = () => {
	const profileStats = {
		followers: '12.5K',
		following: '892',
		posts: '347',
		likes: '45.2K'
	}

	const socialLinks = [
		{ platform: 'LinkedIn', icon: LinkedinIcon, username: '@sarahjohnson', color: 'text-blue-600' },
		{ platform: 'Twitter', icon: TwitterIcon, username: '@sarah_j_dev', color: 'text-blue-400' },
		{ platform: 'Instagram', icon: InstagramIcon, username: '@sarahcodes', color: 'text-pink-600' },
		{ platform: 'Website', icon: GlobeIcon, username: 'sarahjohnson.dev', color: 'text-green-600' }
	]

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold flex items-center gap-2">
					<UsersIcon className="w-5 h-5" />
					Social Profile
				</Label>
				<p className="text-sm text-muted-foreground">Professional profile layout with social media integration</p>
			</div>

			<Card className="max-w-sm">
				<CardContent className="p-6">
					<div className="space-y-6">
						{/* Profile Header */}
						<div className="text-center">
							<Avatar className="w-20 h-20 mx-auto mb-4">
								<AvatarImage src="https://github.com/shadcn.png" />
								<AvatarFallback>SJ</AvatarFallback>
							</Avatar>
							<h3 className="font-semibold text-lg">Sarah Johnson</h3>
							<p className="text-muted-foreground">Full Stack Developer</p>
							<p className="text-sm text-muted-foreground mt-1">Building beautiful web experiences</p>
						</div>

						<Separator />

						{/* Stats */}
						<div className="grid grid-cols-4 gap-4 text-center">
							{Object.entries(profileStats).map(([key, value]) => (
								<div key={key}>
									<p className="font-semibold text-lg">{value}</p>
									<p className="text-xs text-muted-foreground capitalize">{key}</p>
								</div>
							))}
						</div>

						<Separator />

						{/* Social Links */}
						<div className="space-y-3">
							<h4 className="font-medium text-sm text-gray-700">Connect</h4>
							<div className="space-y-2">
								{socialLinks.map((link) => {
									const IconComponent = link.icon
									return (
										<div key={link.platform} className="flex items-center gap-3 text-sm">
											<IconComponent className={`w-4 h-4 ${link.color}`} />
											<div>
												<p className="font-medium">{link.platform}</p>
												<p className="text-muted-foreground text-xs">{link.username}</p>
											</div>
										</div>
									)
								})}
							</div>
						</div>

						<Separator />

						<div className="flex gap-2">
							<Button size="sm" className="flex-1">
								Follow
							</Button>
							<Button variant="outline" size="sm" className="flex-1">
								Message
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}

// Basic Separator Examples
const BasicSeparatorExamples = () => {
	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold">Basic Separator Examples</Label>
				<p className="text-sm text-muted-foreground">Simple horizontal and vertical separators for content organization</p>
			</div>

			<div className="space-y-8">
				<div>
					<Label className="font-medium mb-3 block">Horizontal Separator</Label>
					<div className="space-y-4">
						<div>
							<h4 className="text-sm font-medium">Section One</h4>
							<p className="text-sm text-muted-foreground">This is the first section with some content.</p>
						</div>
						<Separator />
						<div>
							<h4 className="text-sm font-medium">Section Two</h4>
							<p className="text-sm text-muted-foreground">This is the second section after the separator.</p>
						</div>
					</div>
				</div>

				<div>
					<Label className="font-medium mb-3 block">Vertical Separator</Label>
					<div className="flex items-center space-x-4 text-sm">
						<span>Home</span>
						<Separator orientation="vertical" className="h-4" />
						<span>About</span>
						<Separator orientation="vertical" className="h-4" />
						<span>Services</span>
						<Separator orientation="vertical" className="h-4" />
						<span>Contact</span>
					</div>
				</div>

				<div>
					<Label className="font-medium mb-3 block">Breadcrumb Navigation</Label>
					<div className="flex items-center space-x-2 text-sm">
						<span className="text-blue-600 hover:underline cursor-pointer">Dashboard</span>
						<Separator orientation="vertical" className="h-4" />
						<span className="text-blue-600 hover:underline cursor-pointer">Projects</span>
						<Separator orientation="vertical" className="h-4" />
						<span className="text-blue-600 hover:underline cursor-pointer">Web App</span>
						<Separator orientation="vertical" className="h-4" />
						<span className="text-muted-foreground">Settings</span>
					</div>
				</div>

				<div>
					<Label className="font-medium mb-3 block">Metadata Display</Label>
					<div className="space-y-2">
						<h4 className="font-medium">React Component Best Practices</h4>
						<div className="flex items-center space-x-3 text-xs text-muted-foreground">
							<span>March 15, 2024</span>
							<Separator orientation="vertical" className="h-3" />
							<span>8 min read</span>
							<Separator orientation="vertical" className="h-3" />
							<span>142 views</span>
							<Separator orientation="vertical" className="h-3" />
							<span>5 comments</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default function SeparatorSample() {
	const [showAdvanced, setShowAdvanced] = useState(false)

	return (
		<Fragment>
			<ComponentDoc
				title="Separator"
				description="Visual and semantic content dividers for organizing interface elements. Perfect for sections, navigation, lists, and any content requiring logical separation."
				component={
					<div className="flex flex-col gap-8 w-full max-w-4xl">
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
							<h3 className="text-lg font-semibold mb-4">Layout Applications</h3>
							<div className="grid grid-cols-1 gap-8">
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<FileTextIcon className="w-5 h-5" />
											Content Organization
										</CardTitle>
										<CardDescription>Article and blog post layouts with proper content separation</CardDescription>
									</CardHeader>
									<CardContent>
										<ContentOrganization />
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<MenuIcon className="w-5 h-5" />
											Navigation Structure
										</CardTitle>
										<CardDescription>Menu and navigation layouts with logical groupings</CardDescription>
									</CardHeader>
									<CardContent>
										<NavigationWithSeparators />
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<BarChartIcon className="w-5 h-5" />
											Data Display
										</CardTitle>
										<CardDescription>Customer profiles and information displays with clear sections</CardDescription>
									</CardHeader>
									<CardContent>
										<DataDisplayWithSeparators />
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
											<HashIcon className="w-5 h-5" />
											Basic Separators
										</CardTitle>
										<CardDescription>Simple horizontal and vertical separators for content organization</CardDescription>
									</CardHeader>
									<CardContent>
										<BasicSeparatorExamples />
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
								<CardDescription>Best practices for implementing separator elements</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div>
										<h4 className="font-semibold mb-2">When to Use</h4>
										<ul className="space-y-1 text-sm text-muted-foreground">
											<li>• To create visual breaks between content sections</li>
											<li>• For organizing navigation items into logical groups</li>
											<li>• To separate metadata and auxiliary information</li>
											<li>• In lists and menus to group related items</li>
											<li>• For breadcrumb navigation and inline lists</li>
										</ul>
									</div>
									<Separator />
									<div>
										<h4 className="font-semibold mb-2">Design Principles</h4>
										<ul className="space-y-1 text-sm text-muted-foreground">
											<li>• Use consistent spacing before and after separators</li>
											<li>• Choose appropriate orientation (horizontal vs vertical)</li>
											<li>• Maintain visual hierarchy with proper contrast</li>
											<li>• Group related content logically before separating</li>
											<li>• Consider semantic meaning, not just visual appearance</li>
											<li>• Avoid overuse - too many separators can create noise</li>
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
										<strong>Use Cases:</strong> Content, Navigation, Data{showAdvanced ? ', Basic' : ''}
									</p>
									<p>
										<strong>Orientations:</strong> Horizontal, Vertical, Contextual
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
