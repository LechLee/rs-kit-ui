import { Fragment, useState } from 'react'
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
	Avatar,
	AvatarFallback,
	AvatarImage,
	Button,
	Label,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Badge,
	Switch,
	Separator,
	Progress
} from '@rs-kit/ui-kit'
import {
	CalendarIcon,
	MapPinIcon,
	LinkIcon,
	UsersIcon,
	StarIcon,
	GitForkIcon,
	EyeIcon,
	UserIcon,
	MailIcon,
	PhoneIcon,
	BuildingIcon,
	GlobeIcon,
	TwitterIcon,
	GithubIcon,
	LinkedinIcon,
	TrendingUpIcon,
	BarChartIcon,
	DollarSignIcon,
	PackageIcon,
	ShoppingCartIcon,
	HeartIcon,
	MessageSquareIcon,
	ExternalLinkIcon,
	InfoIcon,
	ClockIcon,
	AwardIcon,
	TargetIcon
} from 'lucide-react'
import { ComponentDoc } from '@/components/ComponentDoc'

// User Profile Cards
const UserProfileCards = () => {
	const users = [
		{
			id: 1,
			username: '@sarah_j',
			name: 'Sarah Johnson',
			avatar: 'https://github.com/shadcn.png',
			bio: 'Product Designer passionate about creating intuitive user experiences. Currently building design systems at TechCorp.',
			location: 'San Francisco, CA',
			joined: 'March 2022',
			followers: 2847,
			following: 156,
			verified: true,
			company: 'TechCorp Inc.',
			website: 'sarahjohnson.design'
		},
		{
			id: 2,
			username: '@mike_dev',
			name: 'Mike Chen',
			avatar: 'https://github.com/shadcn.png',
			bio: 'Full-stack developer and open source contributor. Building the future of web development.',
			location: 'Seattle, WA',
			joined: 'January 2021',
			followers: 1234,
			following: 89,
			verified: false,
			company: 'Startup Labs',
			website: 'mikecodes.dev'
		},
		{
			id: 3,
			username: '@emily_ux',
			name: 'Emily Davis',
			avatar: 'https://github.com/shadcn.png',
			bio: 'UX Researcher focused on accessibility and inclusive design. Making technology work for everyone.',
			location: 'Austin, TX',
			joined: 'June 2023',
			followers: 892,
			following: 234,
			verified: true,
			company: 'Design Studio',
			website: 'emilyux.com'
		}
	]

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold flex items-center gap-2">
					<UserIcon className="w-5 h-5" />
					User Profiles
				</Label>
				<p className="text-sm text-muted-foreground">Social media style user profile previews with detailed information</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>User Directory</CardTitle>
					<CardDescription>Hover over usernames to see detailed profiles</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						{users.map((user) => (
							<div key={user.id} className="flex items-center gap-4">
								<Avatar className="w-10 h-10">
									<AvatarImage src={user.avatar} />
									<AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
								</Avatar>
								<div className="flex-1">
									<div className="flex items-center gap-2">
										<HoverCard>
											<HoverCardTrigger asChild>
												<Button variant="link" className="p-0 h-auto font-medium text-blue-600 hover:text-blue-800">
													{user.username}
												</Button>
											</HoverCardTrigger>
											<HoverCardContent className="w-80" side="top">
												<div className="space-y-4">
													<div className="flex items-start gap-4">
														<Avatar className="w-16 h-16">
															<AvatarImage src={user.avatar} />
															<AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
														</Avatar>
														<div className="flex-1">
															<div className="flex items-center gap-2 mb-1">
																<h4 className="font-semibold">{user.name}</h4>
																{user.verified && (
																	<Badge variant="secondary" className="text-xs">
																		<AwardIcon className="w-3 h-3 mr-1" />
																		Verified
																	</Badge>
																)}
															</div>
															<p className="text-sm text-muted-foreground mb-2">{user.username}</p>
															<div className="flex gap-4 text-sm">
																<span><strong>{user.followers.toLocaleString()}</strong> followers</span>
																<span><strong>{user.following}</strong> following</span>
															</div>
														</div>
													</div>

													<p className="text-sm">{user.bio}</p>

													<div className="space-y-2 text-sm text-muted-foreground">
														<div className="flex items-center gap-2">
															<BuildingIcon className="w-4 h-4" />
															<span>{user.company}</span>
														</div>
														<div className="flex items-center gap-2">
															<MapPinIcon className="w-4 h-4" />
															<span>{user.location}</span>
														</div>
														<div className="flex items-center gap-2">
															<GlobeIcon className="w-4 h-4" />
															<span>{user.website}</span>
														</div>
														<div className="flex items-center gap-2">
															<CalendarIcon className="w-4 h-4" />
															<span>Joined {user.joined}</span>
														</div>
													</div>

													<div className="flex gap-2">
														<Button size="sm" className="flex-1">
															<UsersIcon className="w-4 h-4 mr-2" />
															Follow
														</Button>
														<Button variant="outline" size="sm" className="flex-1">
															<MessageSquareIcon className="w-4 h-4 mr-2" />
															Message
														</Button>
													</div>
												</div>
											</HoverCardContent>
										</HoverCard>
										{user.verified && (
											<AwardIcon className="w-4 h-4 text-blue-600" />
										)}
									</div>
									<p className="text-sm text-muted-foreground">{user.name}</p>
								</div>
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	)
}

// Repository Cards
const RepositoryCards = () => {
	const repositories = [
		{
			id: 1,
			name: 'react-components',
			owner: 'techcorp',
			description: 'A comprehensive collection of reusable React components with TypeScript support and Storybook documentation.',
			language: 'TypeScript',
			stars: 2847,
			forks: 412,
			size: '2.3 MB',
			lastUpdated: '2 days ago',
			license: 'MIT',
			topics: ['react', 'typescript', 'components', 'ui-library'],
			contributors: 23,
			issues: 12,
			pullRequests: 5
		},
		{
			id: 2,
			name: 'api-gateway',
			owner: 'startup-labs',
			description: 'High-performance API gateway built with Node.js and Express. Includes rate limiting, authentication, and monitoring.',
			language: 'JavaScript',
			stars: 1234,
			forks: 189,
			size: '1.8 MB',
			lastUpdated: '5 hours ago',
			license: 'Apache-2.0',
			topics: ['nodejs', 'api', 'gateway', 'microservices'],
			contributors: 8,
			issues: 24,
			pullRequests: 3
		},
		{
			id: 3,
			name: 'design-system',
			owner: 'design-studio',
			description: 'Comprehensive design system with tokens, components, and guidelines for building consistent user experiences.',
			language: 'CSS',
			stars: 892,
			forks: 156,
			size: '4.1 MB',
			lastUpdated: '1 week ago',
			license: 'Creative Commons',
			topics: ['design-system', 'css', 'figma', 'tokens'],
			contributors: 12,
			issues: 8,
			pullRequests: 2
		}
	]

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold flex items-center gap-2">
					<GithubIcon className="w-5 h-5" />
					Code Repositories
				</Label>
				<p className="text-sm text-muted-foreground">GitHub-style repository cards with detailed project information</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Popular Repositories</CardTitle>
					<CardDescription>Hover over repository names for detailed information</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						{repositories.map((repo) => (
							<div key={repo.id} className="flex items-center justify-between p-4 border rounded-lg">
								<div className="flex-1">
									<div className="flex items-center gap-2 mb-2">
										<HoverCard>
											<HoverCardTrigger asChild>
												<Button variant="link" className="p-0 h-auto font-semibold text-blue-600 hover:text-blue-800">
													{repo.owner}/{repo.name}
												</Button>
											</HoverCardTrigger>
											<HoverCardContent className="w-96" side="right">
												<div className="space-y-4">
													<div className="flex items-start gap-3">
														<div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
															<GithubIcon className="w-6 h-6" />
														</div>
														<div className="flex-1">
															<h4 className="font-semibold text-lg">{repo.name}</h4>
															<p className="text-sm text-muted-foreground">by {repo.owner}</p>
														</div>
													</div>

													<p className="text-sm">{repo.description}</p>

													<div className="flex flex-wrap gap-1">
														{repo.topics.map((topic) => (
															<Badge key={topic} variant="secondary" className="text-xs">
																{topic}
															</Badge>
														))}
													</div>

													<div className="grid grid-cols-2 gap-4 text-sm">
														<div className="space-y-2">
															<div className="flex items-center gap-2">
																<StarIcon className="w-4 h-4 text-yellow-500" />
																<span>{repo.stars.toLocaleString()} stars</span>
															</div>
															<div className="flex items-center gap-2">
																<GitForkIcon className="w-4 h-4 text-blue-500" />
																<span>{repo.forks} forks</span>
															</div>
															<div className="flex items-center gap-2">
																<UsersIcon className="w-4 h-4 text-green-500" />
																<span>{repo.contributors} contributors</span>
															</div>
														</div>
														<div className="space-y-2">
															<div className="flex items-center gap-2">
																<div className="w-3 h-3 bg-blue-500 rounded-full"></div>
																<span>{repo.language}</span>
															</div>
															<div className="flex items-center gap-2">
																<PackageIcon className="w-4 h-4 text-gray-500" />
																<span>{repo.size}</span>
															</div>
															<div className="flex items-center gap-2">
																<ClockIcon className="w-4 h-4 text-gray-500" />
																<span>Updated {repo.lastUpdated}</span>
															</div>
														</div>
													</div>

													<Separator />

													<div className="flex items-center justify-between text-sm text-muted-foreground">
														<span>License: {repo.license}</span>
														<div className="flex gap-3">
															<span>{repo.issues} issues</span>
															<span>{repo.pullRequests} PRs</span>
														</div>
													</div>

													<div className="flex gap-2">
														<Button size="sm" className="flex-1">
															<StarIcon className="w-4 h-4 mr-2" />
															Star
														</Button>
														<Button variant="outline" size="sm" className="flex-1">
															<GitForkIcon className="w-4 h-4 mr-2" />
															Fork
														</Button>
													</div>
												</div>
											</HoverCardContent>
										</HoverCard>
										<Badge variant="outline" className="text-xs">
											{repo.language}
										</Badge>
									</div>
									<p className="text-sm text-muted-foreground line-clamp-2">{repo.description}</p>
								</div>
								<div className="flex items-center gap-4 text-sm text-muted-foreground">
									<div className="flex items-center gap-1">
										<StarIcon className="w-4 h-4" />
										<span>{repo.stars.toLocaleString()}</span>
									</div>
									<div className="flex items-center gap-1">
										<GitForkIcon className="w-4 h-4" />
										<span>{repo.forks}</span>
									</div>
								</div>
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	)
}

// Product Cards
const ProductCards = () => {
	const products = [
		{
			id: 1,
			name: 'Wireless Headphones Pro',
			brand: 'AudioTech',
			price: 299.99,
			originalPrice: 399.99,
			rating: 4.8,
			reviews: 1247,
			image: '🎧',
			description: 'Premium wireless headphones with active noise cancellation, 30-hour battery life, and studio-quality sound.',
			features: ['Noise Cancellation', '30hr Battery', 'Wireless Charging', 'Hi-Res Audio'],
			category: 'Electronics',
			sku: 'ATH-WH-001',
			stock: 156,
			shipping: 'Free shipping',
			warranty: '2 years'
		},
		{
			id: 2,
			name: 'Smart Fitness Watch',
			brand: 'FitTech',
			price: 199.99,
			originalPrice: 249.99,
			rating: 4.6,
			reviews: 892,
			image: '⌚',
			description: 'Advanced fitness tracking with heart rate monitoring, GPS, and 7-day battery life. Perfect for active lifestyles.',
			features: ['Heart Rate Monitor', 'GPS Tracking', '7-day Battery', 'Water Resistant'],
			category: 'Wearables',
			sku: 'FT-SW-002',
			stock: 89,
			shipping: 'Free shipping',
			warranty: '1 year'
		},
		{
			id: 3,
			name: 'Ergonomic Laptop Stand',
			brand: 'DeskPro',
			price: 79.99,
			originalPrice: 99.99,
			rating: 4.9,
			reviews: 456,
			image: '💻',
			description: 'Adjustable aluminum laptop stand that improves posture and increases productivity. Compatible with all laptop sizes.',
			features: ['Adjustable Height', 'Aluminum Build', 'Heat Dissipation', 'Cable Management'],
			category: 'Accessories',
			sku: 'DP-LS-003',
			stock: 234,
			shipping: 'Free shipping',
			warranty: '5 years'
		}
	]

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold flex items-center gap-2">
					<ShoppingCartIcon className="w-5 h-5" />
					Product Catalog
				</Label>
				<p className="text-sm text-muted-foreground">E-commerce product cards with detailed specifications and purchase information</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Featured Products</CardTitle>
					<CardDescription>Hover over products for detailed information and specifications</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						{products.map((product) => (
							<Card key={product.id} className="hover:shadow-md transition-shadow">
								<CardContent className="p-4">
									<div className="text-center space-y-3">
										<div className="text-4xl">{product.image}</div>
										<div>
											<HoverCard>
												<HoverCardTrigger asChild>
													<h3 className="font-semibold text-sm cursor-pointer hover:text-blue-600 transition-colors">
														{product.name}
													</h3>
												</HoverCardTrigger>
												<HoverCardContent className="w-96" side="top">
													<div className="space-y-4">
														<div className="flex items-start gap-4">
															<div className="text-6xl">{product.image}</div>
															<div className="flex-1">
																<h4 className="font-semibold text-lg">{product.name}</h4>
																<p className="text-sm text-muted-foreground mb-2">by {product.brand}</p>
																<div className="flex items-center gap-2 mb-2">
																	<div className="flex text-yellow-400">
																		{'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}
																	</div>
																	<span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
																</div>
																<div className="flex items-center gap-2">
																	<span className="text-xl font-bold text-green-600">${product.price}</span>
																	<span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
																	<Badge variant="destructive" className="text-xs">
																		{Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
																	</Badge>
																</div>
															</div>
														</div>

														<p className="text-sm">{product.description}</p>

														<div>
															<h5 className="font-medium mb-2">Key Features</h5>
															<div className="flex flex-wrap gap-1">
																{product.features.map((feature) => (
																	<Badge key={feature} variant="secondary" className="text-xs">
																		{feature}
																	</Badge>
																))}
															</div>
														</div>

														<div className="grid grid-cols-2 gap-4 text-sm">
															<div className="space-y-1">
																<p><strong>SKU:</strong> {product.sku}</p>
																<p><strong>Category:</strong> {product.category}</p>
																<p><strong>Stock:</strong> {product.stock} available</p>
															</div>
															<div className="space-y-1">
																<p><strong>Shipping:</strong> {product.shipping}</p>
																<p><strong>Warranty:</strong> {product.warranty}</p>
																<p className="text-green-600"><strong>In Stock</strong></p>
															</div>
														</div>

														<div className="flex gap-2">
															<Button size="sm" className="flex-1">
																<ShoppingCartIcon className="w-4 h-4 mr-2" />
																Add to Cart
															</Button>
															<Button variant="outline" size="sm">
																<HeartIcon className="w-4 h-4" />
															</Button>
														</div>
													</div>
												</HoverCardContent>
											</HoverCard>
											<p className="text-xs text-muted-foreground">{product.brand}</p>
										</div>
										<div className="flex items-center justify-center gap-1 mb-2">
											<div className="flex text-yellow-400">
												{'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}
											</div>
											<span className="text-xs text-muted-foreground">({product.reviews})</span>
										</div>
										<div className="flex items-center justify-center gap-2">
											<span className="font-bold text-green-600">${product.price}</span>
											<span className="text-xs text-muted-foreground line-through">${product.originalPrice}</span>
										</div>
										<Button size="sm" className="w-full">
											Add to Cart
										</Button>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	)
}

export default function HoverCardSample() {
	const [showAdvanced, setShowAdvanced] = useState(false)

	return (
		<Fragment>
			<ComponentDoc
				title="Hover Card"
				description="Rich content previews that appear on hover, providing detailed information without navigation. Perfect for user profiles, product details, repository info, and any content requiring contextual previews."
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
							<Badge variant="outline">{showAdvanced ? '3' : '2'} Examples</Badge>
						</div>

						{/* Real-World Examples */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Hover Card Applications</h3>
							<div className="grid grid-cols-1 gap-8">
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<UserIcon className="w-5 h-5" />
											User Profiles
										</CardTitle>
										<CardDescription>Social media style user profile previews with comprehensive information</CardDescription>
									</CardHeader>
									<CardContent>
										<UserProfileCards />
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<GithubIcon className="w-5 h-5" />
											Code Repositories
										</CardTitle>
										<CardDescription>GitHub-style repository information with stats and details</CardDescription>
									</CardHeader>
									<CardContent>
										<RepositoryCards />
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
											<ShoppingCartIcon className="w-5 h-5" />
											Product Catalog
										</CardTitle>
										<CardDescription>E-commerce product previews with detailed specifications</CardDescription>
									</CardHeader>
									<CardContent>
										<ProductCards />
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
								<CardDescription>Best practices for implementing hover card previews</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div>
										<h4 className="font-semibold mb-2">When to Use</h4>
										<ul className="space-y-1 text-sm text-muted-foreground">
											<li>• For previewing content behind links without navigation</li>
											<li>• To show detailed information about users, products, or entities</li>
											<li>• When you need to display rich content on hover</li>
											<li>• For providing context without cluttering the main interface</li>
											<li>• In data-heavy interfaces where space is limited</li>
										</ul>
									</div>
									<Separator />
									<div>
										<h4 className="font-semibold mb-2">Design Principles</h4>
										<ul className="space-y-1 text-sm text-muted-foreground">
											<li>• Keep content scannable with clear hierarchy</li>
											<li>• Position cards to avoid covering important content</li>
											<li>• Include actionable elements when appropriate</li>
											<li>• Use consistent timing for show/hide animations</li>
											<li>• Ensure cards work well with keyboard navigation</li>
											<li>• Consider mobile alternatives since hover isn't available</li>
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
										<strong>Total Examples:</strong> {showAdvanced ? '3' : '2'}
									</p>
								</div>
								<div>
									<p>
										<strong>Use Cases:</strong> User Profiles, Repositories{showAdvanced ? ', Products' : ''}
									</p>
									<p>
										<strong>Features:</strong> Rich Content, Multiple Positions, Interactive Elements
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