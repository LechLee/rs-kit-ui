import { Fragment, useState } from 'react'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
	Button,
	Label,
	Input,
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
	Textarea,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Checkbox,
	Separator,
	Progress,
	Slider
} from '@rs-kit/ui-kit'
import {
	SettingsIcon,
	UserIcon,
	InfoIcon,
	ShareIcon,
	CalendarIcon,
	MessageSquareIcon,
	BellIcon,
	HelpCircleIcon,
	BookmarkIcon,
	PlusIcon,
	EditIcon,
	TrashIcon,
	StarIcon,
	HeartIcon,
	ExternalLinkIcon,
	ClockIcon,
	MapPinIcon,
	PhoneIcon,
	MailIcon,
	TwitterIcon,
	LinkedinIcon,
	GithubIcon,
	DollarSignIcon,
	TrendingUpIcon,
	BarChartIcon,
	UsersIcon,
	PackageIcon,
	ShoppingCartIcon,
	ImageIcon,
	FilterIcon,
	SlidersIcon,
	CopyIcon,
	CheckIcon,
	AlertCircleIcon,
	XIcon,
	ChevronDownIcon,
	MenuIcon,
	MoreHorizontalIcon
} from 'lucide-react'
import { ComponentDoc } from '@/components/ComponentDoc'

// User Profile Popover
const UserProfilePopover = () => {
	const [showNotifications, setShowNotifications] = useState(true)
	const [autoSave, setAutoSave] = useState(false)

	const user = {
		name: 'Sarah Johnson',
		email: 'sarah@example.com',
		role: 'Product Designer',
		avatar: 'https://github.com/shadcn.png',
		status: 'online',
		lastSeen: '2 minutes ago'
	}

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold flex items-center gap-2">
					<UserIcon className="w-5 h-5" />
					User Profiles
				</Label>
				<p className="text-sm text-muted-foreground">User profile cards with settings, status, and quick actions</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Team Members</CardTitle>
					<CardDescription>Click on any user to see their profile and options</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						{[
							{ name: 'Sarah Johnson', role: 'Product Designer', status: 'online' },
							{ name: 'Mike Chen', role: 'Frontend Developer', status: 'away' },
							{ name: 'Emily Davis', role: 'UX Researcher', status: 'busy' }
						].map((member, index) => (
							<div key={index} className="flex items-center gap-4">
								<Avatar className="w-10 h-10">
									<AvatarImage src={user.avatar} />
									<AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
								</Avatar>
								<div className="flex-1">
									<Popover>
										<PopoverTrigger asChild>
											<Button variant="link" className="p-0 h-auto font-medium text-left">
												{member.name}
											</Button>
										</PopoverTrigger>
										<PopoverContent className="w-80" side="right">
											<div className="space-y-4">
												<div className="flex items-start gap-4">
													<Avatar className="w-16 h-16">
														<AvatarImage src={user.avatar} />
														<AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
													</Avatar>
													<div className="flex-1">
														<div className="flex items-center gap-2 mb-1">
															<h4 className="font-semibold">{member.name}</h4>
															<div className={`w-2 h-2 rounded-full ${
																member.status === 'online' ? 'bg-green-500' : 
																member.status === 'away' ? 'bg-yellow-500' : 'bg-red-500'
															}`}></div>
														</div>
														<p className="text-sm text-muted-foreground mb-1">{member.role}</p>
														<p className="text-xs text-muted-foreground">{user.lastSeen}</p>
													</div>
												</div>

												<div className="space-y-3 text-sm">
													<div className="flex items-center gap-2">
														<MailIcon className="w-4 h-4" />
														<span>{user.email}</span>
													</div>
													<div className="flex items-center gap-2">
														<ClockIcon className="w-4 h-4" />
														<span>PST (UTC-8)</span>
													</div>
													<div className="flex items-center gap-2">
														<MapPinIcon className="w-4 h-4" />
														<span>San Francisco, CA</span>
													</div>
												</div>

												<Separator />

												<div className="space-y-3">
													<div className="flex items-center justify-between">
														<Label htmlFor="notifications" className="text-sm">Notifications</Label>
														<Switch 
															id="notifications" 
															checked={showNotifications} 
															onCheckedChange={setShowNotifications}
															size="sm"
														/>
													</div>
													<div className="flex items-center justify-between">
														<Label htmlFor="autosave" className="text-sm">Auto-save</Label>
														<Switch 
															id="autosave" 
															checked={autoSave} 
															onCheckedChange={setAutoSave}
															size="sm"
														/>
													</div>
												</div>

												<div className="flex gap-2">
													<Button size="sm" className="flex-1">
														<MessageSquareIcon className="w-4 h-4 mr-2" />
														Message
													</Button>
													<Button variant="outline" size="sm" className="flex-1">
														<CalendarIcon className="w-4 h-4 mr-2" />
														Schedule
													</Button>
												</div>
											</div>
										</PopoverContent>
									</Popover>
									<p className="text-sm text-muted-foreground">{member.role}</p>
								</div>
								<Badge variant={member.status === 'online' ? 'default' : 'secondary'} className="text-xs">
									{member.status}
								</Badge>
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	)
}

// Action Menu Popover
const ActionMenuPopover = () => {
	const [copied, setCopied] = useState(false)

	const handleCopy = () => {
		setCopied(true)
		setTimeout(() => setCopied(false), 2000)
	}

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold flex items-center gap-2">
					<MoreHorizontalIcon className="w-5 h-5" />
					Action Menus
				</Label>
				<p className="text-sm text-muted-foreground">Context-sensitive action menus with grouped options and quick actions</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Content Items</CardTitle>
					<CardDescription>Right-aligned action menus for different content types</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						{[
							{ type: 'Document', name: 'Project Proposal.pdf', size: '2.4 MB', icon: '📄' },
							{ type: 'Image', name: 'Design Mockup.png', size: '1.8 MB', icon: '🖼️' },
							{ type: 'Spreadsheet', name: 'Budget Analysis.xlsx', size: '856 KB', icon: '📊' }
						].map((item, index) => (
							<div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
								<div className="text-2xl">{item.icon}</div>
								<div className="flex-1">
									<p className="font-medium">{item.name}</p>
									<p className="text-sm text-muted-foreground">{item.type} • {item.size}</p>
								</div>
								<Popover>
									<PopoverTrigger asChild>
										<Button variant="ghost" size="sm">
											<MoreHorizontalIcon className="w-4 h-4" />
										</Button>
									</PopoverTrigger>
									<PopoverContent className="w-48" align="end">
										<div className="space-y-1">
											<button className="w-full flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-gray-100 rounded">
												<ExternalLinkIcon className="w-4 h-4" />
												Open
											</button>
											<button className="w-full flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-gray-100 rounded">
												<EditIcon className="w-4 h-4" />
												Rename
											</button>
											<button 
												className="w-full flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-gray-100 rounded"
												onClick={handleCopy}
											>
												{copied ? <CheckIcon className="w-4 h-4" /> : <CopyIcon className="w-4 h-4" />}
												{copied ? 'Copied!' : 'Copy Link'}
											</button>
											<button className="w-full flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-gray-100 rounded">
												<StarIcon className="w-4 h-4" />
												Add to Favorites
											</button>
											<Separator className="my-1" />
											<button className="w-full flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-gray-100 rounded">
												<ShareIcon className="w-4 h-4" />
												Share
											</button>
											<Separator className="my-1" />
											<button className="w-full flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-red-50 text-red-600 rounded">
												<TrashIcon className="w-4 h-4" />
												Delete
											</button>
										</div>
									</PopoverContent>
								</Popover>
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	)
}

// Settings and Forms Popover
const SettingsFormsPopover = () => {
	const [theme, setTheme] = useState('system')
	const [language, setLanguage] = useState('en')
	const [volume, setVolume] = useState([75])
	const [emailNotifications, setEmailNotifications] = useState(true)
	const [pushNotifications, setPushNotifications] = useState(false)

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold flex items-center gap-2">
					<SettingsIcon className="w-5 h-5" />
					Settings & Forms
				</Label>
				<p className="text-sm text-muted-foreground">Complex forms and settings panels with multiple input types and controls</p>
			</div>

			<div className="space-y-6">
				{/* Quick Settings */}
				<Card>
					<CardHeader>
						<CardTitle>Application Settings</CardTitle>
						<CardDescription>Quick access to common application preferences</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="flex items-center gap-4">
							<Popover>
								<PopoverTrigger asChild>
									<Button variant="outline">
										<SettingsIcon className="w-4 h-4 mr-2" />
										Preferences
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-80">
									<div className="space-y-4">
										<div>
											<h4 className="font-medium mb-3">Appearance</h4>
											<div className="space-y-3">
												<div className="space-y-2">
													<Label className="text-sm">Theme</Label>
													<Select value={theme} onValueChange={setTheme}>
														<SelectTrigger>
															<SelectValue />
														</SelectTrigger>
														<SelectContent>
															<SelectItem value="light">Light</SelectItem>
															<SelectItem value="dark">Dark</SelectItem>
															<SelectItem value="system">System</SelectItem>
														</SelectContent>
													</Select>
												</div>
												<div className="space-y-2">
													<Label className="text-sm">Language</Label>
													<Select value={language} onValueChange={setLanguage}>
														<SelectTrigger>
															<SelectValue />
														</SelectTrigger>
														<SelectContent>
															<SelectItem value="en">English</SelectItem>
															<SelectItem value="es">Español</SelectItem>
															<SelectItem value="fr">Français</SelectItem>
															<SelectItem value="de">Deutsch</SelectItem>
														</SelectContent>
													</Select>
												</div>
											</div>
										</div>

										<Separator />

										<div>
											<h4 className="font-medium mb-3">Audio</h4>
											<div className="space-y-3">
												<div className="space-y-2">
													<div className="flex justify-between">
														<Label className="text-sm">Volume</Label>
														<span className="text-sm text-muted-foreground">{volume[0]}%</span>
													</div>
													<Slider
														value={volume}
														onValueChange={setVolume}
														max={100}
														step={1}
														className="w-full"
													/>
												</div>
											</div>
										</div>

										<Separator />

										<div>
											<h4 className="font-medium mb-3">Notifications</h4>
											<div className="space-y-3">
												<div className="flex items-center justify-between">
													<Label htmlFor="email-notif" className="text-sm">Email notifications</Label>
													<Switch 
														id="email-notif"
														checked={emailNotifications} 
														onCheckedChange={setEmailNotifications}
														size="sm"
													/>
												</div>
												<div className="flex items-center justify-between">
													<Label htmlFor="push-notif" className="text-sm">Push notifications</Label>
													<Switch 
														id="push-notif"
														checked={pushNotifications} 
														onCheckedChange={setPushNotifications}
														size="sm"
													/>
												</div>
											</div>
										</div>

										<div className="flex gap-2 pt-2">
											<Button size="sm" className="flex-1">Save</Button>
											<Button variant="outline" size="sm" className="flex-1">Reset</Button>
										</div>
									</div>
								</PopoverContent>
							</Popover>

							<Popover>
								<PopoverTrigger asChild>
									<Button variant="outline">
										<FilterIcon className="w-4 h-4 mr-2" />
										Filters
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-72">
									<div className="space-y-4">
										<div>
											<h4 className="font-medium mb-3">Filter Options</h4>
											<div className="space-y-3">
												<div className="space-y-2">
													<Label className="text-sm">Date Range</Label>
													<Select>
														<SelectTrigger>
															<SelectValue placeholder="Select period" />
														</SelectTrigger>
														<SelectContent>
															<SelectItem value="today">Today</SelectItem>
															<SelectItem value="week">This Week</SelectItem>
															<SelectItem value="month">This Month</SelectItem>
															<SelectItem value="year">This Year</SelectItem>
														</SelectContent>
													</Select>
												</div>
												<div className="space-y-2">
													<Label className="text-sm">Status</Label>
													<div className="space-y-2">
														{['Active', 'Pending', 'Completed', 'Cancelled'].map((status) => (
															<div key={status} className="flex items-center space-x-2">
																<Checkbox id={status} />
																<Label htmlFor={status} className="text-sm">{status}</Label>
															</div>
														))}
													</div>
												</div>
											</div>
										</div>

										<div className="flex gap-2">
											<Button size="sm" className="flex-1">Apply</Button>
											<Button variant="outline" size="sm" className="flex-1">Clear</Button>
										</div>
									</div>
								</PopoverContent>
							</Popover>

							<Popover>
								<PopoverTrigger asChild>
									<Button variant="outline">
										<InfoIcon className="w-4 h-4 mr-2" />
										Help
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-80">
									<div className="space-y-4">
										<div>
											<h4 className="font-medium mb-2">Need Help?</h4>
											<p className="text-sm text-muted-foreground mb-3">
												Get quick assistance with common questions and features.
											</p>
										</div>

										<div className="space-y-2">
											<button className="w-full flex items-center gap-2 px-2 py-2 text-sm hover:bg-gray-100 rounded">
												<HelpCircleIcon className="w-4 h-4" />
												Getting Started Guide
											</button>
											<button className="w-full flex items-center gap-2 px-2 py-2 text-sm hover:bg-gray-100 rounded">
												<BookmarkIcon className="w-4 h-4" />
												Keyboard Shortcuts
											</button>
											<button className="w-full flex items-center gap-2 px-2 py-2 text-sm hover:bg-gray-100 rounded">
												<MessageSquareIcon className="w-4 h-4" />
												Contact Support
											</button>
										</div>

										<Separator />

										<div className="text-center">
											<p className="text-xs text-muted-foreground mb-2">Follow us for updates</p>
											<div className="flex justify-center gap-2">
												<Button variant="ghost" size="sm">
													<TwitterIcon className="w-4 h-4" />
												</Button>
												<Button variant="ghost" size="sm">
													<LinkedinIcon className="w-4 h-4" />
												</Button>
												<Button variant="ghost" size="sm">
													<GithubIcon className="w-4 h-4" />
												</Button>
											</div>
										</div>
									</div>
								</PopoverContent>
							</Popover>
						</div>
					</CardContent>
				</Card>

				{/* Contact Form */}
				<Card>
					<CardHeader>
						<CardTitle>Quick Contact</CardTitle>
						<CardDescription>Inline contact form with validation and submission</CardDescription>
					</CardHeader>
					<CardContent>
						<Popover>
							<PopoverTrigger asChild>
								<Button>
									<MessageSquareIcon className="w-4 h-4 mr-2" />
									Send Feedback
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-80">
								<div className="space-y-4">
									<div>
										<h4 className="font-medium mb-2">Send us your feedback</h4>
										<p className="text-sm text-muted-foreground">
											We'd love to hear from you. Send us a message and we'll respond as soon as possible.
										</p>
									</div>

									<div className="space-y-3">
										<div className="space-y-2">
											<Label htmlFor="feedback-name" className="text-sm">Name</Label>
											<Input id="feedback-name" placeholder="Your name" />
										</div>
										<div className="space-y-2">
											<Label htmlFor="feedback-email" className="text-sm">Email</Label>
											<Input id="feedback-email" type="email" placeholder="your@email.com" />
										</div>
										<div className="space-y-2">
											<Label htmlFor="feedback-message" className="text-sm">Message</Label>
											<Textarea 
												id="feedback-message" 
												placeholder="Tell us what you think..."
												rows={3}
											/>
										</div>
									</div>

									<div className="flex gap-2">
										<Button size="sm" className="flex-1">Send Message</Button>
										<Button variant="outline" size="sm" className="flex-1">Cancel</Button>
									</div>
								</div>
							</PopoverContent>
						</Popover>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}

// Basic Popover Examples
const BasicPopoverExamples = () => {
	const sides = ['top', 'right', 'bottom', 'left'] as const
	const aligns = ['start', 'center', 'end'] as const

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold">Basic Popover Examples</Label>
				<p className="text-sm text-muted-foreground">Different popover positions, alignments, and simple configurations</p>
			</div>

			<div className="space-y-8">
				<div>
					<Label className="font-medium mb-3 block">Different Sides</Label>
					<div className="flex gap-2 justify-center">
						{sides.map((side) => (
							<Popover key={side}>
								<PopoverTrigger asChild>
									<Button variant="outline" size="sm">
										{side.charAt(0).toUpperCase() + side.slice(1)}
									</Button>
								</PopoverTrigger>
								<PopoverContent side={side} className="w-64">
									<div className="space-y-2">
										<h4 className="font-medium">Popover from {side}</h4>
										<p className="text-sm text-muted-foreground">
											This popover appears on the {side} side of the trigger.
										</p>
									</div>
								</PopoverContent>
							</Popover>
						))}
					</div>
				</div>

				<div>
					<Label className="font-medium mb-3 block">Different Alignments</Label>
					<div className="flex gap-2 justify-center">
						{aligns.map((align) => (
							<Popover key={align}>
								<PopoverTrigger asChild>
									<Button variant="outline" size="sm">
										{align.charAt(0).toUpperCase() + align.slice(1)}
									</Button>
								</PopoverTrigger>
								<PopoverContent align={align} className="w-64">
									<div className="space-y-2">
										<h4 className="font-medium">{align} aligned</h4>
										<p className="text-sm text-muted-foreground">
											This popover is aligned to the {align} of the trigger.
										</p>
									</div>
								</PopoverContent>
							</Popover>
						))}
					</div>
				</div>

				<div>
					<Label className="font-medium mb-3 block">Simple Form</Label>
					<Popover>
						<PopoverTrigger asChild>
							<Button variant="outline">
								<PlusIcon className="w-4 h-4 mr-2" />
								Add Item
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-80">
							<div className="space-y-4">
								<div>
									<h4 className="font-medium mb-2">Add new item</h4>
									<p className="text-sm text-muted-foreground">
										Enter the details for your new item below.
									</p>
								</div>
								<div className="space-y-3">
									<div className="space-y-2">
										<Label htmlFor="item-name" className="text-sm">Name</Label>
										<Input id="item-name" placeholder="Item name" />
									</div>
									<div className="space-y-2">
										<Label htmlFor="item-description" className="text-sm">Description</Label>
										<Textarea id="item-description" placeholder="Brief description" rows={2} />
									</div>
								</div>
								<div className="flex gap-2">
									<Button size="sm" className="flex-1">Add Item</Button>
									<Button variant="outline" size="sm" className="flex-1">Cancel</Button>
								</div>
							</div>
						</PopoverContent>
					</Popover>
				</div>

				<div>
					<Label className="font-medium mb-3 block">Information Panel</Label>
					<div className="p-4 border rounded-lg">
						<div className="flex items-center justify-between">
							<div>
								<h3 className="font-medium">Premium Feature</h3>
								<p className="text-sm text-muted-foreground">Advanced analytics and reporting</p>
							</div>
							<Popover>
								<PopoverTrigger asChild>
									<Button variant="ghost" size="sm">
										<InfoIcon className="w-4 h-4" />
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-72">
									<div className="space-y-3">
										<div>
											<h4 className="font-medium flex items-center gap-2">
												<StarIcon className="w-4 h-4 text-yellow-500" />
												Premium Features
											</h4>
											<p className="text-sm text-muted-foreground mt-1">
												Unlock advanced capabilities with our premium plan.
											</p>
										</div>
										<div className="space-y-2">
											<div className="flex items-center gap-2 text-sm">
												<CheckIcon className="w-3 h-3 text-green-500" />
												<span>Advanced Analytics</span>
											</div>
											<div className="flex items-center gap-2 text-sm">
												<CheckIcon className="w-3 h-3 text-green-500" />
												<span>Custom Reports</span>
											</div>
											<div className="flex items-center gap-2 text-sm">
												<CheckIcon className="w-3 h-3 text-green-500" />
												<span>Priority Support</span>
											</div>
											<div className="flex items-center gap-2 text-sm">
												<CheckIcon className="w-3 h-3 text-green-500" />
												<span>API Access</span>
											</div>
										</div>
										<Button size="sm" className="w-full">
											Upgrade Now
										</Button>
									</div>
								</PopoverContent>
							</Popover>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default function PopoverSample() {
	const [showAdvanced, setShowAdvanced] = useState(false)

	return (
		<Fragment>
			<ComponentDoc
				title="Popover"
				description="Contextual overlay panels that display rich content triggered by user interaction. Perfect for user profiles, settings, forms, menus, and any content requiring focused attention without navigation."
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
							<h3 className="text-lg font-semibold mb-4">Popover Applications</h3>
							<div className="grid grid-cols-1 gap-8">
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<UserIcon className="w-5 h-5" />
											User Profiles
										</CardTitle>
										<CardDescription>Interactive user profile cards with settings and quick actions</CardDescription>
									</CardHeader>
									<CardContent>
										<UserProfilePopover />
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<MoreHorizontalIcon className="w-5 h-5" />
											Action Menus
										</CardTitle>
										<CardDescription>Context-sensitive action menus with grouped operations</CardDescription>
									</CardHeader>
									<CardContent>
										<ActionMenuPopover />
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<SettingsIcon className="w-5 h-5" />
											Settings & Forms
										</CardTitle>
										<CardDescription>Complex forms and settings panels with multiple controls</CardDescription>
									</CardHeader>
									<CardContent>
										<SettingsFormsPopover />
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
											<SlidersIcon className="w-5 h-5" />
											Simple Configurations
										</CardTitle>
										<CardDescription>Basic popover positions, alignments, and simple use cases</CardDescription>
									</CardHeader>
									<CardContent>
										<BasicPopoverExamples />
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
								<CardDescription>Best practices for implementing popover components</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div>
										<h4 className="font-semibold mb-2">When to Use</h4>
										<ul className="space-y-1 text-sm text-muted-foreground">
											<li>• For displaying additional information without navigation</li>
											<li>• In action menus and context-sensitive options</li>
											<li>• For quick forms and settings that don't require full pages</li>
											<li>• When you need to show rich content in a focused overlay</li>
											<li>• For user profiles, help content, and explanatory information</li>
										</ul>
									</div>
									<Separator />
									<div>
										<h4 className="font-semibold mb-2">Design Principles</h4>
										<ul className="space-y-1 text-sm text-muted-foreground">
											<li>• Position popovers to avoid covering important content</li>
											<li>• Use appropriate sizing based on content requirements</li>
											<li>• Include clear headers and descriptions for context</li>
											<li>• Provide easy dismissal methods (click outside, escape key)</li>
											<li>• Consider mobile responsiveness and touch interactions</li>
											<li>• Group related actions and maintain visual hierarchy</li>
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
										<strong>Use Cases:</strong> User Profiles, Action Menus, Settings{showAdvanced ? ', Basic' : ''}
									</p>
									<p>
										<strong>Features:</strong> Positioning, Forms, Interactive Content, Context Menus
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