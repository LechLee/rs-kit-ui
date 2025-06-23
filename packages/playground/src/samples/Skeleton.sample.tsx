import { Fragment, useState, useEffect } from 'react'
import {
	Skeleton,
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
	Separator
} from '@rs-kit/ui-kit'
import {
	UserIcon,
	ShoppingCartIcon,
	FileTextIcon,
	ImageIcon,
	PlayIcon,
	ClockIcon,
	StarIcon,
	MessageSquareIcon,
	ThumbsUpIcon,
	ShareIcon,
	BookmarkIcon,
	TrendingUpIcon,
	BarChartIcon,
	DollarSignIcon,
	UsersIcon,
	PackageIcon,
	InfoIcon,
	LoaderIcon
} from 'lucide-react'
import { ComponentDoc } from '@/components/ComponentDoc'

// Social Media Feed Loading
const SocialMediaFeedSkeleton = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [posts, setPosts] = useState<any[]>([])

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false)
			setPosts([
				{
					id: 1,
					author: 'Sarah Johnson',
					avatar: 'https://github.com/shadcn.png',
					content: 'Just launched our new design system! Really excited to share this with the community.',
					likes: 24,
					comments: 8,
					shares: 3,
					timestamp: '2 hours ago'
				},
				{
					id: 2,
					author: 'Mike Chen',
					avatar: 'https://github.com/shadcn.png',
					content: 'Working on some amazing new features for our upcoming release. Stay tuned!',
					likes: 18,
					comments: 5,
					shares: 2,
					timestamp: '4 hours ago'
				}
			])
		}, 3000)

		return () => clearTimeout(timer)
	}, [])

	const toggleLoading = () => {
		setIsLoading(!isLoading)
		if (!isLoading) {
			setPosts([])
		}
	}

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold flex items-center gap-2">
					<MessageSquareIcon className="w-5 h-5" />
					Social Media Feed
				</Label>
				<p className="text-sm text-muted-foreground">Loading states for social media posts with user profiles and engagement metrics</p>
			</div>

			<div className="space-y-4">
				<div className="flex items-center gap-4">
					<Button onClick={toggleLoading} variant="outline" size="sm">
						<LoaderIcon className="w-4 h-4 mr-2" />
						{isLoading ? 'Show Content' : 'Show Loading'}
					</Button>
					<Badge variant="outline">{isLoading ? 'Loading...' : 'Loaded'}</Badge>
				</div>

				<div className="space-y-4">
					{isLoading ? (
						// Loading skeletons
						Array.from({ length: 3 }, (_, i) => (
							<Card key={i}>
								<CardContent className="p-6">
									<div className="space-y-4">
										{/* User profile */}
										<div className="flex items-center gap-3">
											<Skeleton className="h-12 w-12 rounded-full" />
											<div className="space-y-2">
												<Skeleton className="h-4 w-32" />
												<Skeleton className="h-3 w-20" />
											</div>
										</div>
										
										{/* Post content */}
										<div className="space-y-2">
											<Skeleton className="h-4 w-full" />
											<Skeleton className="h-4 w-3/4" />
											<Skeleton className="h-4 w-1/2" />
										</div>

										{/* Media placeholder */}
										<Skeleton className="h-48 w-full rounded-lg" />

										{/* Engagement buttons */}
										<div className="flex items-center gap-6 pt-2">
											<div className="flex items-center gap-2">
												<Skeleton className="h-4 w-4" />
												<Skeleton className="h-4 w-8" />
											</div>
											<div className="flex items-center gap-2">
												<Skeleton className="h-4 w-4" />
												<Skeleton className="h-4 w-8" />
											</div>
											<div className="flex items-center gap-2">
												<Skeleton className="h-4 w-4" />
												<Skeleton className="h-4 w-8" />
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
						))
					) : (
						// Actual content
						posts.map((post) => (
							<Card key={post.id}>
								<CardContent className="p-6">
									<div className="space-y-4">
										<div className="flex items-center gap-3">
											<Avatar className="w-12 h-12">
												<AvatarImage src={post.avatar} />
												<AvatarFallback>{post.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
											</Avatar>
											<div>
												<p className="font-semibold">{post.author}</p>
												<p className="text-sm text-muted-foreground">{post.timestamp}</p>
											</div>
										</div>
										
										<p className="text-sm">{post.content}</p>

										<div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
											<ImageIcon className="w-12 h-12 text-white opacity-50" />
										</div>

										<div className="flex items-center gap-6 pt-2 text-sm text-muted-foreground">
											<div className="flex items-center gap-2 hover:text-red-500 cursor-pointer">
												<ThumbsUpIcon className="w-4 h-4" />
												<span>{post.likes}</span>
											</div>
											<div className="flex items-center gap-2 hover:text-blue-500 cursor-pointer">
												<MessageSquareIcon className="w-4 h-4" />
												<span>{post.comments}</span>
											</div>
											<div className="flex items-center gap-2 hover:text-green-500 cursor-pointer">
												<ShareIcon className="w-4 h-4" />
												<span>{post.shares}</span>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
						))
					)}
				</div>
			</div>
		</div>
	)
}

// Product Grid Loading
const ProductGridSkeleton = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [products, setProducts] = useState<any[]>([])

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false)
			setProducts([
				{ id: 1, name: 'Wireless Headphones', price: 199.99, rating: 4.5, reviews: 234, image: '🎧' },
				{ id: 2, name: 'Smart Watch', price: 299.99, rating: 4.2, reviews: 189, image: '⌚' },
				{ id: 3, name: 'Laptop Stand', price: 79.99, rating: 4.8, reviews: 456, image: '💻' },
				{ id: 4, name: 'Bluetooth Speaker', price: 89.99, rating: 4.3, reviews: 167, image: '🔊' },
				{ id: 5, name: 'Phone Case', price: 24.99, rating: 4.1, reviews: 78, image: '📱' },
				{ id: 6, name: 'Desk Lamp', price: 149.99, rating: 4.6, reviews: 234, image: '💡' }
			])
		}, 2500)

		return () => clearTimeout(timer)
	}, [])

	const toggleLoading = () => {
		setIsLoading(!isLoading)
		if (!isLoading) {
			setProducts([])
		}
	}

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold flex items-center gap-2">
					<ShoppingCartIcon className="w-5 h-5" />
					Product Catalog
				</Label>
				<p className="text-sm text-muted-foreground">E-commerce product grid with pricing, ratings, and product details loading states</p>
			</div>

			<div className="space-y-4">
				<div className="flex items-center gap-4">
					<Button onClick={toggleLoading} variant="outline" size="sm">
						<LoaderIcon className="w-4 h-4 mr-2" />
						{isLoading ? 'Show Products' : 'Show Loading'}
					</Button>
					<Badge variant="outline">{isLoading ? 'Loading Products...' : `${products.length} Products Loaded`}</Badge>
				</div>

				<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
					{isLoading ? (
						Array.from({ length: 6 }, (_, i) => (
							<Card key={i} className="overflow-hidden">
								<CardContent className="p-4">
									<div className="space-y-3">
										{/* Product image */}
										<Skeleton className="h-32 w-full rounded-lg" />
										
										{/* Product name */}
										<Skeleton className="h-4 w-3/4" />
										
										{/* Rating */}
										<div className="flex items-center gap-2">
											<Skeleton className="h-4 w-20" />
											<Skeleton className="h-3 w-12" />
										</div>
										
										{/* Price */}
										<Skeleton className="h-5 w-16" />
										
										{/* Add to cart button */}
										<Skeleton className="h-8 w-full" />
									</div>
								</CardContent>
							</Card>
						))
					) : (
						products.map((product) => (
							<Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow">
								<CardContent className="p-4">
									<div className="space-y-3">
										<div className="h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center text-4xl">
											{product.image}
										</div>
										
										<h3 className="font-semibold text-sm line-clamp-2">{product.name}</h3>
										
										<div className="flex items-center gap-2">
											<div className="flex text-yellow-400">
												{'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}
											</div>
											<span className="text-xs text-muted-foreground">({product.reviews})</span>
										</div>
										
										<div className="font-bold text-lg text-green-600">${product.price}</div>
										
										<Button size="sm" className="w-full">Add to Cart</Button>
									</div>
								</CardContent>
							</Card>
						))
					)}
				</div>
			</div>
		</div>
	)
}

// Dashboard Analytics Loading
const DashboardAnalyticsSkeleton = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [analytics, setAnalytics] = useState<any>(null)

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false)
			setAnalytics({
				revenue: '$45,231',
				orders: '1,234',
				customers: '5,678',
				growth: '+12.5%'
			})
		}, 2000)

		return () => clearTimeout(timer)
	}, [])

	const toggleLoading = () => {
		setIsLoading(!isLoading)
		if (!isLoading) {
			setAnalytics(null)
		}
	}

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold flex items-center gap-2">
					<BarChartIcon className="w-5 h-5" />
					Analytics Dashboard
				</Label>
				<p className="text-sm text-muted-foreground">Business metrics and analytics with chart and KPI loading states</p>
			</div>

			<div className="space-y-4">
				<div className="flex items-center gap-4">
					<Button onClick={toggleLoading} variant="outline" size="sm">
						<LoaderIcon className="w-4 h-4 mr-2" />
						{isLoading ? 'Load Data' : 'Show Loading'}
					</Button>
					<Badge variant="outline">{isLoading ? 'Fetching Analytics...' : 'Data Loaded'}</Badge>
				</div>

				{/* KPI Cards */}
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
					{isLoading ? (
						Array.from({ length: 4 }, (_, i) => (
							<Card key={i}>
								<CardContent className="p-6">
									<div className="space-y-3">
										<div className="flex items-center justify-between">
											<Skeleton className="h-4 w-20" />
											<Skeleton className="h-8 w-8 rounded-full" />
										</div>
										<Skeleton className="h-8 w-24" />
										<Skeleton className="h-3 w-16" />
									</div>
								</CardContent>
							</Card>
						))
					) : (
						[
							{ label: 'Revenue', value: analytics.revenue, icon: DollarSignIcon, color: 'text-green-600' },
							{ label: 'Orders', value: analytics.orders, icon: PackageIcon, color: 'text-blue-600' },
							{ label: 'Customers', value: analytics.customers, icon: UsersIcon, color: 'text-purple-600' },
							{ label: 'Growth', value: analytics.growth, icon: TrendingUpIcon, color: 'text-orange-600' }
						].map((metric, i) => (
							<Card key={i}>
								<CardContent className="p-6">
									<div className="space-y-3">
										<div className="flex items-center justify-between">
											<span className="text-sm font-medium text-muted-foreground">{metric.label}</span>
											<div className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center ${metric.color}`}>
												<metric.icon className="w-4 h-4" />
											</div>
										</div>
										<div className="text-2xl font-bold">{metric.value}</div>
										<div className="text-xs text-green-600">↗ +2.1% from last month</div>
									</div>
								</CardContent>
							</Card>
						))
					)}
				</div>

				{/* Chart Area */}
				<Card>
					<CardHeader>
						<CardTitle>Revenue Trend</CardTitle>
						<CardDescription>Monthly revenue over the past year</CardDescription>
					</CardHeader>
					<CardContent>
						{isLoading ? (
							<div className="space-y-4">
								<div className="flex items-end gap-2 h-48">
									{Array.from({ length: 12 }, (_, i) => (
										<Skeleton 
											key={i} 
											className="flex-1" 
											style={{ height: `${Math.random() * 100 + 50}px` }}
										/>
									))}
								</div>
								<div className="flex justify-between">
									{Array.from({ length: 6 }, (_, i) => (
										<Skeleton key={i} className="h-3 w-8" />
									))}
								</div>
							</div>
						) : (
							<div className="space-y-4">
								<div className="flex items-end gap-2 h-48">
									{[45, 52, 48, 61, 55, 67, 72, 69, 75, 82, 78, 86].map((height, i) => (
										<div 
											key={i} 
											className="flex-1 bg-blue-500 rounded-t"
											style={{ height: `${height * 2}px` }}
										/>
									))}
								</div>
								<div className="flex justify-between text-xs text-muted-foreground">
									{['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov'].map((month) => (
										<span key={month}>{month}</span>
									))}
								</div>
							</div>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	)
}

// Basic Skeleton Examples
const BasicSkeletonExamples = () => {
	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold">Basic Skeleton Examples</Label>
				<p className="text-sm text-muted-foreground">Different skeleton shapes and sizes for various content types</p>
			</div>

			<div className="space-y-8">
				<div>
					<Label className="font-medium mb-3 block">User Profile</Label>
					<div className="flex items-center space-x-4">
						<Skeleton className="h-12 w-12 rounded-full" />
						<div className="space-y-2">
							<Skeleton className="h-4 w-[200px]" />
							<Skeleton className="h-4 w-[160px]" />
						</div>
					</div>
				</div>

				<div>
					<Label className="font-medium mb-3 block">Article Card</Label>
					<Card className="w-80">
						<CardContent className="p-4">
							<div className="space-y-3">
								<Skeleton className="h-40 w-full rounded-lg" />
								<Skeleton className="h-6 w-3/4" />
								<Skeleton className="h-4 w-full" />
								<Skeleton className="h-4 w-2/3" />
								<div className="flex items-center space-x-2">
									<Skeleton className="h-6 w-6 rounded-full" />
									<Skeleton className="h-4 w-20" />
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				<div>
					<Label className="font-medium mb-3 block">Data Table Rows</Label>
					<div className="space-y-2">
						{Array.from({ length: 4 }, (_, i) => (
							<div key={i} className="flex items-center space-x-4 p-3 border rounded">
								<Skeleton className="h-8 w-8 rounded" />
								<Skeleton className="h-4 w-32" />
								<Skeleton className="h-4 w-24" />
								<Skeleton className="h-4 w-16" />
								<Skeleton className="h-6 w-20" />
							</div>
						))}
					</div>
				</div>

				<div>
					<Label className="font-medium mb-3 block">Different Shapes</Label>
					<div className="flex items-center gap-4">
						<div className="space-y-2">
							<Label className="text-xs text-muted-foreground">Circle</Label>
							<Skeleton className="h-16 w-16 rounded-full" />
						</div>
						<div className="space-y-2">
							<Label className="text-xs text-muted-foreground">Square</Label>
							<Skeleton className="h-16 w-16" />
						</div>
						<div className="space-y-2">
							<Label className="text-xs text-muted-foreground">Rectangle</Label>
							<Skeleton className="h-16 w-32" />
						</div>
						<div className="space-y-2">
							<Label className="text-xs text-muted-foreground">Rounded</Label>
							<Skeleton className="h-16 w-32 rounded-lg" />
						</div>
					</div>
				</div>

				<div>
					<Label className="font-medium mb-3 block">Text Lines</Label>
					<div className="space-y-2">
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-5/6" />
						<Skeleton className="h-4 w-4/6" />
						<Skeleton className="h-4 w-3/6" />
						<Skeleton className="h-4 w-2/6" />
					</div>
				</div>
			</div>
		</div>
	)
}

export default function SkeletonSample() {
	const [showAdvanced, setShowAdvanced] = useState(false)

	return (
		<Fragment>
			<ComponentDoc
				title="Skeleton"
				description="Loading placeholders that maintain layout structure while content loads. Perfect for social feeds, product grids, dashboards, and any content requiring progressive loading states."
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
							<h3 className="text-lg font-semibold mb-4">Loading States</h3>
							<div className="grid grid-cols-1 gap-8">
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<MessageSquareIcon className="w-5 h-5" />
											Social Media Feed
										</CardTitle>
										<CardDescription>Social media posts with user profiles and engagement metrics</CardDescription>
									</CardHeader>
									<CardContent>
										<SocialMediaFeedSkeleton />
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<ShoppingCartIcon className="w-5 h-5" />
											Product Catalog
										</CardTitle>
										<CardDescription>E-commerce product grid with pricing and ratings</CardDescription>
									</CardHeader>
									<CardContent>
										<ProductGridSkeleton />
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<BarChartIcon className="w-5 h-5" />
											Analytics Dashboard
										</CardTitle>
										<CardDescription>Business metrics and charts with KPI loading states</CardDescription>
									</CardHeader>
									<CardContent>
										<DashboardAnalyticsSkeleton />
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
											<TrendingUpIcon className="w-5 h-5" />
											Simple Patterns
										</CardTitle>
										<CardDescription>Basic skeleton shapes for different content types</CardDescription>
									</CardHeader>
									<CardContent>
										<BasicSkeletonExamples />
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
								<CardDescription>Best practices for implementing skeleton loading states</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div>
										<h4 className="font-semibold mb-2">When to Use</h4>
										<ul className="space-y-1 text-sm text-muted-foreground">
											<li>• For content that takes time to load (images, data, API responses)</li>
											<li>• In place of loading spinners when you want to maintain layout structure</li>
											<li>• For progressive loading where different parts load at different times</li>
											<li>• When you want to give users a preview of content structure</li>
											<li>• In infinite scroll or pagination scenarios</li>
										</ul>
									</div>
									<Separator />
									<div>
										<h4 className="font-semibold mb-2">Design Principles</h4>
										<ul className="space-y-1 text-sm text-muted-foreground">
											<li>• Match the skeleton shape and size to the actual content</li>
											<li>• Use subtle animation to indicate loading progress</li>
											<li>• Maintain the same layout structure as loaded content</li>
											<li>• Consider different loading states for different content types</li>
											<li>• Provide fallbacks for failed loading states</li>
											<li>• Keep skeleton designs simple and unobtrusive</li>
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
										<strong>Use Cases:</strong> Social Media, E-commerce, Analytics{showAdvanced ? ', Basic' : ''}
									</p>
									<p>
										<strong>Features:</strong> Interactive Loading, Multiple Shapes, Real-time States
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
