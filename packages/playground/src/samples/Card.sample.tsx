import { Fragment, useState } from 'react'
import { 
	BedIcon, 
	BathIcon, 
	LandPlotIcon, 
	StarIcon,
	HeartIcon,
	ShareIcon,
	BookmarkIcon,
	MapPinIcon,
	CalendarIcon,
	ClockIcon,
	EyeIcon,
	MessageCircleIcon,
	TrendingUpIcon,
	UserIcon,
	SettingsIcon,
	CreditCardIcon,
	CheckIcon,
	XIcon,
	AlertTriangleIcon,
	InfoIcon,
	PlusIcon,
	ArrowRightIcon,
	ExternalLinkIcon,
	DownloadIcon,
	EditIcon
} from 'lucide-react'
import { 
	Button, 
	Card, 
	CardContent, 
	CardDescription, 
	CardFooter, 
	CardHeader, 
	CardTitle, 
	Avatar, 
	AvatarFallback, 
	AvatarImage, 
	Label, 
	Input, 
	Badge,
	Checkbox,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@rs-kit/ui-kit'
import { ComponentDoc } from '@/components/ComponentDoc'

export default function CardSample() {
	// State for interactive examples
	const [likedCards, setLikedCards] = useState<Set<string>>(new Set())
	const [bookmarkedCards, setBookmarkedCards] = useState<Set<string>>(new Set())
	const [selectedCard, setSelectedCard] = useState<string | null>(null)
	const [expandedCard, setExpandedCard] = useState<string | null>(null)

	// Interactive handlers
	const toggleLike = (cardId: string) => {
		setLikedCards(prev => {
			const newSet = new Set(prev)
			if (newSet.has(cardId)) {
				newSet.delete(cardId)
			} else {
				newSet.add(cardId)
			}
			return newSet
		})
	}

	const toggleBookmark = (cardId: string) => {
		setBookmarkedCards(prev => {
			const newSet = new Set(prev)
			if (newSet.has(cardId)) {
				newSet.delete(cardId)
			} else {
				newSet.add(cardId)
			}
			return newSet
		})
	}

	const toggleExpand = (cardId: string) => {
		setExpandedCard(prev => prev === cardId ? null : cardId)
	}

	return (
		<Fragment>
			<ComponentDoc
				title="Card"
				description="Flexible content containers for organizing and presenting information. Perfect for dashboards, product listings, user profiles, and content previews."
				component={
					<div className="flex flex-col gap-8 w-full max-w-4xl">
						{/* Basic Card Layouts */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Basic Card Layouts</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
								{/* Simple Card */}
								<Card>
									<CardHeader>
										<CardTitle>Simple Card</CardTitle>
										<CardDescription>Basic card with header and content</CardDescription>
									</CardHeader>
									<CardContent>
										<p className="text-sm text-muted-foreground">
											This is a basic card example showing the fundamental structure with header, content, and proper spacing.
										</p>
									</CardContent>
								</Card>

								{/* Header Only Card */}
								<Card>
									<CardHeader>
										<CardTitle>Header Only</CardTitle>
										<CardDescription>Card with just header content</CardDescription>
									</CardHeader>
								</Card>

								{/* Footer Card */}
								<Card>
									<CardHeader>
										<CardTitle>With Footer</CardTitle>
										<CardDescription>Card including footer actions</CardDescription>
									</CardHeader>
									<CardContent>
										<p className="text-sm">Content area with footer actions below.</p>
									</CardContent>
									<CardFooter>
										<Button size="sm" className="w-full">Action</Button>
									</CardFooter>
								</Card>
							</div>
						</div>

						{/* Form Cards */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Form Cards</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{/* Login Card */}
								<Card className="w-full max-w-md">
									<CardHeader>
										<CardTitle>Login to your account</CardTitle>
										<CardDescription>Enter your email below to login to your account</CardDescription>
									</CardHeader>
									<CardContent className="space-y-4">
										<div className="space-y-2">
											<Label htmlFor="login-email">Email</Label>
											<Input id="login-email" type="email" placeholder="m@example.com" />
										</div>
										<div className="space-y-2">
											<div className="flex items-center justify-between">
												<Label htmlFor="login-password">Password</Label>
												<Button variant="link" size="sm" className="px-0 h-auto">
													Forgot password?
												</Button>
											</div>
											<Input id="login-password" type="password" />
										</div>
									</CardContent>
									<CardFooter className="flex-col space-y-2">
										<Button className="w-full">Login</Button>
										<Button variant="outline" className="w-full">Login with Google</Button>
									</CardFooter>
								</Card>

								{/* Settings Card */}
								<Card className="w-full max-w-md">
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<SettingsIcon className="w-5 h-5" />
											Notification Settings
										</CardTitle>
										<CardDescription>Manage your notification preferences</CardDescription>
									</CardHeader>
									<CardContent className="space-y-4">
										<div className="flex items-center justify-between">
											<Label htmlFor="email-notif" className="text-sm font-medium">Email notifications</Label>
											<Checkbox id="email-notif" defaultChecked />
										</div>
										<div className="flex items-center justify-between">
											<Label htmlFor="push-notif" className="text-sm font-medium">Push notifications</Label>
											<Checkbox id="push-notif" />
										</div>
										<div className="space-y-2">
											<Label className="text-sm font-medium">Frequency</Label>
											<Select defaultValue="daily">
												<SelectTrigger>
													<SelectValue />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="realtime">Real-time</SelectItem>
													<SelectItem value="daily">Daily</SelectItem>
													<SelectItem value="weekly">Weekly</SelectItem>
												</SelectContent>
											</Select>
										</div>
									</CardContent>
									<CardFooter>
										<Button className="w-full">Save Preferences</Button>
									</CardFooter>
								</Card>
							</div>
						</div>

						{/* Content Cards */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Content Cards</h3>
							<div className="space-y-6">
								{/* Article Card */}
								<Card className="max-w-2xl">
									<CardHeader>
										<div className="flex items-center gap-3">
											<Avatar>
												<AvatarImage src="https://github.com/shadcn.png" />
												<AvatarFallback>JD</AvatarFallback>
											</Avatar>
											<div className="flex-1">
												<CardTitle className="text-base">John Doe</CardTitle>
												<CardDescription className="flex items-center gap-2">
													<CalendarIcon className="w-3 h-3" />
													Published 2 days ago
												</CardDescription>
											</div>
											<Button 
												variant="ghost" 
												size="sm" 
												onClick={() => toggleBookmark('article-1')}
												className="px-2"
											>
												<BookmarkIcon className={`w-4 h-4 ${bookmarkedCards.has('article-1') ? 'fill-current' : ''}`} />
											</Button>
										</div>
										<CardTitle className="mt-3">10 Essential React Performance Tips</CardTitle>
										<CardDescription>
											Learn how to optimize your React applications for better performance and user experience.
										</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="flex flex-wrap gap-2 mb-4">
											<Badge variant="secondary">React</Badge>
											<Badge variant="secondary">Performance</Badge>
											<Badge variant="secondary">JavaScript</Badge>
										</div>
										<p className="text-sm text-muted-foreground line-clamp-3">
											Performance optimization is crucial for modern web applications. In this comprehensive guide, we'll explore the most effective techniques for improving React application performance, from component optimization to bundle splitting strategies.
										</p>
									</CardContent>
									<CardFooter className="flex items-center justify-between">
										<div className="flex items-center gap-4 text-sm text-muted-foreground">
											<div className="flex items-center gap-1">
												<EyeIcon className="w-4 h-4" />
												1.2k views
											</div>
											<div className="flex items-center gap-1">
												<ClockIcon className="w-4 h-4" />
												8 min read
											</div>
										</div>
										<div className="flex gap-2">
											<Button 
												variant="ghost" 
												size="sm"
												onClick={() => toggleLike('article-1')}
											>
												<HeartIcon className={`w-4 h-4 ${likedCards.has('article-1') ? 'fill-current text-red-500' : ''}`} />
												{likedCards.has('article-1') ? '43' : '42'}
											</Button>
											<Button variant="ghost" size="sm">
												<MessageCircleIcon className="w-4 h-4" />
												12
											</Button>
											<Button variant="ghost" size="sm">
												<ShareIcon className="w-4 h-4" />
											</Button>
											<Button size="sm">
												Read More
												<ArrowRightIcon className="w-4 h-4" />
											</Button>
										</div>
									</CardFooter>
								</Card>

								{/* Team Member Card */}
								<Card className="max-w-md">
									<CardHeader>
										<div className="flex items-center gap-4">
											<Avatar className="w-16 h-16">
												<AvatarImage src="https://github.com/leerob.png" />
												<AvatarFallback>LR</AvatarFallback>
											</Avatar>
											<div>
												<CardTitle>Lee Robinson</CardTitle>
												<CardDescription>VP of Developer Experience at Vercel</CardDescription>
												<div className="flex items-center gap-1 mt-1">
													<MapPinIcon className="w-3 h-3" />
													<span className="text-xs text-muted-foreground">San Francisco, CA</span>
												</div>
											</div>
										</div>
									</CardHeader>
									<CardContent>
										<p className="text-sm text-muted-foreground mb-4">
											Full-stack developer passionate about React, Next.js, and web performance. Building the future of web development.
										</p>
										<div className="flex flex-wrap gap-2">
											<Badge variant="outline">React</Badge>
											<Badge variant="outline">Next.js</Badge>
											<Badge variant="outline">TypeScript</Badge>
											<Badge variant="outline">Vercel</Badge>
										</div>
									</CardContent>
									<CardFooter className="flex gap-2">
										<Button className="flex-1">Connect</Button>
										<Button variant="outline" size="icon">
											<MessageCircleIcon className="w-4 h-4" />
										</Button>
									</CardFooter>
								</Card>
							</div>
						</div>

						{/* Product/E-commerce Cards */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Product & E-commerce Cards</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
								{/* Property Card */}
								<Card className="overflow-hidden">
									<div className="relative">
										<img
											src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
											alt="Modern house"
											className="aspect-video object-cover w-full"
										/>
										<Badge className="absolute top-3 left-3">For Sale</Badge>
										<Button 
											variant="ghost" 
											size="sm" 
											onClick={() => toggleLike('property-1')}
											className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm hover:bg-white/90"
										>
											<HeartIcon className={`w-4 h-4 ${likedCards.has('property-1') ? 'fill-current text-red-500' : ''}`} />
										</Button>
									</div>
									<CardHeader>
										<div className="flex items-center justify-between">
											<CardTitle className="text-xl font-bold">$485,000</CardTitle>
											<div className="flex items-center gap-1">
												<StarIcon className="w-4 h-4 fill-current text-yellow-400" />
												<span className="text-sm font-medium">4.8</span>
											</div>
										</div>
										<CardDescription className="flex items-center gap-1">
											<MapPinIcon className="w-3 h-3" />
											123 Maple Street, San Francisco, CA
										</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="flex gap-4">
											<div className="flex items-center gap-1">
												<BedIcon className="w-4 h-4 text-muted-foreground" />
												<span className="text-sm">4 beds</span>
											</div>
											<div className="flex items-center gap-1">
												<BathIcon className="w-4 h-4 text-muted-foreground" />
												<span className="text-sm">2 baths</span>
											</div>
											<div className="flex items-center gap-1">
												<LandPlotIcon className="w-4 h-4 text-muted-foreground" />
												<span className="text-sm">2,400 sqft</span>
											</div>
										</div>
									</CardContent>
									<CardFooter className="flex gap-2">
										<Button className="flex-1">View Details</Button>
										<Button variant="outline" size="icon">
											<ShareIcon className="w-4 h-4" />
										</Button>
									</CardFooter>
								</Card>

								{/* Product Card */}
								<Card className="overflow-hidden">
									<div className="relative">
										<img
											src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80"
											alt="Wireless Headphones"
											className="aspect-square object-cover w-full"
										/>
										<Badge variant="destructive" className="absolute top-3 left-3">Sale</Badge>
									</div>
									<CardHeader>
										<CardTitle className="line-clamp-2">Premium Wireless Headphones</CardTitle>
										<CardDescription>High-quality audio with noise cancellation</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="flex items-center justify-between">
											<div className="flex items-center gap-2">
												<span className="text-2xl font-bold">$89</span>
												<span className="text-sm text-muted-foreground line-through">$129</span>
											</div>
											<div className="flex items-center gap-1">
												<StarIcon className="w-4 h-4 fill-current text-yellow-400" />
												<span className="text-sm">4.5 (128)</span>
											</div>
										</div>
										<div className="flex flex-wrap gap-1 mt-2">
											<Badge variant="outline" className="text-xs">Wireless</Badge>
											<Badge variant="outline" className="text-xs">Bluetooth 5.0</Badge>
											<Badge variant="outline" className="text-xs">30h Battery</Badge>
										</div>
									</CardContent>
									<CardFooter className="flex gap-2">
										<Button className="flex-1">
											<PlusIcon className="w-4 h-4" />
											Add to Cart
										</Button>
										<Button 
											variant="outline" 
											size="icon"
											onClick={() => toggleLike('product-1')}
										>
											<HeartIcon className={`w-4 h-4 ${likedCards.has('product-1') ? 'fill-current text-red-500' : ''}`} />
										</Button>
									</CardFooter>
								</Card>

								{/* Service Card */}
								<Card>
									<CardHeader>
										<div className="flex items-center justify-between">
											<CardTitle>Pro Plan</CardTitle>
											<Badge>Most Popular</Badge>
										</div>
										<CardDescription>Perfect for growing businesses</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="text-center mb-4">
											<div className="text-3xl font-bold">$29</div>
											<div className="text-sm text-muted-foreground">per month</div>
										</div>
										<ul className="space-y-2 text-sm">
											<li className="flex items-center gap-2">
												<CheckIcon className="w-4 h-4 text-green-500" />
												Unlimited projects
											</li>
											<li className="flex items-center gap-2">
												<CheckIcon className="w-4 h-4 text-green-500" />
												100GB storage
											</li>
											<li className="flex items-center gap-2">
												<CheckIcon className="w-4 h-4 text-green-500" />
												Priority support
											</li>
											<li className="flex items-center gap-2">
												<CheckIcon className="w-4 h-4 text-green-500" />
												Advanced analytics
											</li>
											<li className="flex items-center gap-2 opacity-50">
												<XIcon className="w-4 h-4" />
												Custom integrations
											</li>
										</ul>
									</CardContent>
									<CardFooter>
										<Button className="w-full">Get Started</Button>
									</CardFooter>
								</Card>
							</div>
						</div>

						{/* Dashboard Cards */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Dashboard & Metric Cards</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
								{/* Metric Card 1 */}
								<Card>
									<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
										<CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
										<CreditCardIcon className="h-4 w-4 text-muted-foreground" />
									</CardHeader>
									<CardContent>
										<div className="text-2xl font-bold">$45,231.89</div>
										<p className="text-xs text-muted-foreground flex items-center gap-1">
											<TrendingUpIcon className="w-3 h-3 text-green-500" />
											+20.1% from last month
										</p>
									</CardContent>
								</Card>

								{/* Metric Card 2 */}
								<Card>
									<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
										<CardTitle className="text-sm font-medium">Active Users</CardTitle>
										<UserIcon className="h-4 w-4 text-muted-foreground" />
									</CardHeader>
									<CardContent>
										<div className="text-2xl font-bold">2,350</div>
										<p className="text-xs text-muted-foreground">
											+180.1% from last month
										</p>
									</CardContent>
								</Card>

								{/* Metric Card 3 */}
								<Card>
									<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
										<CardTitle className="text-sm font-medium">Downloads</CardTitle>
										<DownloadIcon className="h-4 w-4 text-muted-foreground" />
									</CardHeader>
									<CardContent>
										<div className="text-2xl font-bold">12,234</div>
										<p className="text-xs text-muted-foreground">
											+19% from last month
										</p>
									</CardContent>
								</Card>

								{/* Metric Card 4 */}
								<Card>
									<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
										<CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
										<TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
									</CardHeader>
									<CardContent>
										<div className="text-2xl font-bold">3.2%</div>
										<p className="text-xs text-muted-foreground">
											+0.1% from last month
										</p>
									</CardContent>
								</Card>
							</div>
						</div>

						{/* Interactive Cards */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Interactive Cards</h3>
							<div className="space-y-4">
								{/* Expandable Card */}
								<Card className="max-w-2xl">
									<CardHeader>
										<div className="flex items-center justify-between">
											<div>
												<CardTitle>Project Status Report</CardTitle>
												<CardDescription>Weekly development progress overview</CardDescription>
											</div>
											<Button 
												variant="ghost" 
												size="sm"
												onClick={() => toggleExpand('project-1')}
											>
												{expandedCard === 'project-1' ? 'Collapse' : 'Expand'}
											</Button>
										</div>
									</CardHeader>
									<CardContent>
										<div className="grid grid-cols-3 gap-4 mb-4">
											<div className="text-center">
												<div className="text-2xl font-bold text-green-600">85%</div>
												<div className="text-xs text-muted-foreground">Completed</div>
											</div>
											<div className="text-center">
												<div className="text-2xl font-bold text-blue-600">12</div>
												<div className="text-xs text-muted-foreground">Tasks Left</div>
											</div>
											<div className="text-center">
												<div className="text-2xl font-bold text-orange-600">3</div>
												<div className="text-xs text-muted-foreground">Days Left</div>
											</div>
										</div>
										{expandedCard === 'project-1' && (
											<div className="space-y-3 pt-4 border-t">
												<h4 className="text-sm font-medium">Recent Activity</h4>
												<ul className="space-y-2 text-sm">
													<li className="flex items-center gap-2">
														<CheckIcon className="w-4 h-4 text-green-500" />
														Completed user authentication module
													</li>
													<li className="flex items-center gap-2">
														<CheckIcon className="w-4 h-4 text-green-500" />
														Fixed responsive design issues
													</li>
													<li className="flex items-center gap-2">
														<ClockIcon className="w-4 h-4 text-orange-500" />
														In progress: Payment integration
													</li>
													<li className="flex items-center gap-2">
														<ClockIcon className="w-4 h-4 text-orange-500" />
														Pending: Admin dashboard
													</li>
												</ul>
												<div className="flex gap-2 pt-2">
													<Button size="sm" variant="outline">
														<ExternalLinkIcon className="w-4 h-4" />
														View Full Report
													</Button>
													<Button size="sm" variant="outline">
														<EditIcon className="w-4 h-4" />
														Edit Project
													</Button>
												</div>
											</div>
										)}
									</CardContent>
								</Card>

								{/* Selectable Card */}
								<Card 
									className={`max-w-md cursor-pointer transition-all ${
										selectedCard === 'plan-pro' 
											? 'ring-2 ring-blue-500 bg-blue-50/50' 
											: 'hover:shadow-md'
									}`}
									onClick={() => setSelectedCard(selectedCard === 'plan-pro' ? null : 'plan-pro')}
								>
									<CardHeader>
										<div className="flex items-center justify-between">
											<CardTitle>Professional Plan</CardTitle>
											<Checkbox 
												checked={selectedCard === 'plan-pro'}
												readOnly
											/>
										</div>
										<CardDescription>Click to select this plan</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="text-2xl font-bold">$49/month</div>
										<p className="text-sm text-muted-foreground mt-2">
											Everything you need for a growing business
										</p>
									</CardContent>
								</Card>
							</div>
						</div>

						{/* Alert & Status Cards */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Alert & Status Cards</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								{/* Success Card */}
								<Card className="border-green-200 bg-green-50">
									<CardHeader>
										<CardTitle className="flex items-center gap-2 text-green-800">
											<CheckIcon className="w-5 h-5" />
											Deployment Successful
										</CardTitle>
										<CardDescription className="text-green-700">
											Your application has been deployed successfully
										</CardDescription>
									</CardHeader>
									<CardContent>
										<p className="text-sm text-green-700">
											Deployed at: https://myapp.vercel.app
										</p>
										<p className="text-xs text-green-600 mt-1">
											Completed in 2m 34s
										</p>
									</CardContent>
									<CardFooter>
										<Button size="sm" className="bg-green-600 hover:bg-green-700">
											<ExternalLinkIcon className="w-4 h-4" />
											View Live Site
										</Button>
									</CardFooter>
								</Card>

								{/* Warning Card */}
								<Card className="border-amber-200 bg-amber-50">
									<CardHeader>
										<CardTitle className="flex items-center gap-2 text-amber-800">
											<AlertTriangleIcon className="w-5 h-5" />
											System Maintenance
										</CardTitle>
										<CardDescription className="text-amber-700">
											Scheduled maintenance window approaching
										</CardDescription>
									</CardHeader>
									<CardContent>
										<p className="text-sm text-amber-700">
											Maintenance will begin at 2:00 AM EST and last approximately 2 hours.
										</p>
										<p className="text-xs text-amber-600 mt-1">
											Scheduled for: March 15, 2024
										</p>
									</CardContent>
									<CardFooter className="flex gap-2">
										<Button size="sm" variant="outline" className="border-amber-300 text-amber-800">
											<InfoIcon className="w-4 h-4" />
											More Info
										</Button>
										<Button size="sm" variant="ghost" className="text-amber-800">
											Dismiss
										</Button>
									</CardFooter>
								</Card>
							</div>
						</div>

						{/* Current State Display */}
						<div className="mt-6 p-4 bg-gray-50 rounded-lg">
							<h4 className="text-sm font-semibold text-gray-700 mb-2">Interactive State:</h4>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
								<div>
									<p><strong>Liked Cards:</strong> {likedCards.size}</p>
									<p><strong>Bookmarked Cards:</strong> {bookmarkedCards.size}</p>
									<p><strong>Selected Card:</strong> {selectedCard || 'None'}</p>
								</div>
								<div>
									<p><strong>Expanded Card:</strong> {expandedCard || 'None'}</p>
									<p><strong>Liked List:</strong> {Array.from(likedCards).join(', ') || 'None'}</p>
									<p><strong>Bookmarked List:</strong> {Array.from(bookmarkedCards).join(', ') || 'None'}</p>
								</div>
							</div>
						</div>
					</div>
				}
			/>

			<ComponentDoc
				title="Card Props & Usage Guidelines"
				description="Comprehensive guide to Card component structure, styling, and best practices."
				component={
					<div className="flex flex-col gap-6 w-full max-w-4xl">
						{/* Props Reference */}
						<div className="p-4 bg-blue-50 rounded-lg">
							<h4 className="text-sm font-semibold text-blue-700 mb-2">Props Reference:</h4>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-600">
								<div>
									<strong>Card Component:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li><code>className</code> - Additional CSS classes</li>
										<li><code>children</code> - Card content components</li>
										<li>All standard div attributes</li>
									</ul>
								</div>
								<div>
									<strong>CardHeader:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li><code>className</code> - Custom header styling</li>
										<li>Contains CardTitle and CardDescription</li>
										<li>Optional - can be omitted</li>
									</ul>
								</div>
								<div>
									<strong>CardTitle:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li><code>className</code> - Custom title styling</li>
										<li>Renders as h3 by default</li>
										<li>Can contain text or React elements</li>
									</ul>
								</div>
								<div>
									<strong>CardDescription:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li><code>className</code> - Custom description styling</li>
										<li>Renders as p with muted styling</li>
										<li>Can contain text or React elements</li>
									</ul>
								</div>
								<div>
									<strong>CardContent:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li><code>className</code> - Custom content styling</li>
										<li>Main content area with padding</li>
										<li>Can contain any React elements</li>
									</ul>
								</div>
								<div>
									<strong>CardFooter:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li><code>className</code> - Custom footer styling</li>
										<li>Typically contains action buttons</li>
										<li>Optional - can be omitted</li>
									</ul>
								</div>
							</div>
						</div>

						{/* Usage Guidelines */}
						<div className="p-4 bg-green-50 rounded-lg">
							<h4 className="text-sm font-semibold text-green-700 mb-2">Usage Guidelines:</h4>
							<ul className="text-sm text-green-600 space-y-1 list-disc list-inside">
								<li><strong>Structure:</strong> Use logical card sections - header for titles, content for main information, footer for actions</li>
								<li><strong>Content Hierarchy:</strong> Keep titles concise, use descriptions for context, organize content logically</li>
								<li><strong>Actions:</strong> Place primary actions in footer, secondary actions can go in header or content</li>
								<li><strong>Images:</strong> Use CardContent with p-0 class for full-width images</li>
								<li><strong>Interactive Cards:</strong> Add hover states, click handlers, and proper focus management</li>
								<li><strong>Responsive Design:</strong> Cards stack naturally on smaller screens, consider mobile touch targets</li>
								<li><strong>Loading States:</strong> Show skeleton content or loading indicators within card structure</li>
								<li><strong>Accessibility:</strong> Ensure proper heading hierarchy and keyboard navigation for interactive cards</li>
							</ul>
						</div>

						{/* Code Examples */}
						<div className="p-4 bg-gray-100 rounded-lg">
							<h4 className="text-sm font-semibold text-gray-700 mb-2">Code Examples:</h4>
							<pre className="text-xs text-gray-600 overflow-x-auto whitespace-pre-wrap">
{`// Basic card structure
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Brief description of the card content</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Main content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>

// Card with image
<Card className="overflow-hidden">
  <div className="relative">
    <img src="..." alt="..." className="aspect-video object-cover" />
    <Badge className="absolute top-3 left-3">Featured</Badge>
  </div>
  <CardHeader>
    <CardTitle>Image Card</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Content below image</p>
  </CardContent>
</Card>

// Interactive card
<Card 
  className="cursor-pointer hover:shadow-md transition-shadow"
  onClick={handleClick}
>
  <CardHeader>
    <CardTitle>Clickable Card</CardTitle>
  </CardHeader>
  <CardContent>
    <p>This entire card is clickable</p>
  </CardContent>
</Card>

// Dashboard metric card
<Card>
  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
    <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
  </CardHeader>
  <CardContent>
    <div className="text-2xl font-bold">$45,231.89</div>
    <p className="text-xs text-muted-foreground">
      +20.1% from last month
    </p>
  </CardContent>
</Card>`}
							</pre>
						</div>

						{/* Design Guidelines */}
						<div className="p-4 bg-purple-50 rounded-lg">
							<h4 className="text-sm font-semibold text-purple-700 mb-2">Design Guidelines:</h4>
							<ul className="text-sm text-purple-600 space-y-1 list-disc list-inside">
								<li><strong>Visual Hierarchy:</strong> Use consistent typography scale, maintain proper spacing between sections</li>
								<li><strong>Content Density:</strong> Balance information density - not too cluttered, not too sparse</li>
								<li><strong>Action Placement:</strong> Primary actions in bottom-right, secondary actions top-right or contextual</li>
								<li><strong>Color Usage:</strong> Use subtle background colors for status cards, maintain good contrast</li>
								<li><strong>Border & Shadow:</strong> Consistent elevation, subtle borders, appropriate shadow depths</li>
								<li><strong>Spacing:</strong> Consistent margins between cards, proper internal padding for readability</li>
								<li><strong>Grid Layouts:</strong> Use consistent card sizes within grid layouts, consider aspect ratios</li>
								<li><strong>Mobile Considerations:</strong> Ensure touch targets are adequate, stack cards appropriately</li>
							</ul>
						</div>
					</div>
				}
			/>
		</Fragment>
	)
}
