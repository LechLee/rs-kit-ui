import { Fragment, useState, useEffect } from 'react'
import { 
	Carousel, 
	CarouselContent, 
	CarouselItem, 
	CarouselNext, 
	CarouselPrevious, 
	Card, 
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Badge,
	Button,
	Avatar,
	AvatarFallback,
	AvatarImage
} from '@rs-kit/ui-kit'
import { 
	PlayIcon,
	PauseIcon,
	StarIcon,
	HeartIcon,
	ShoppingCartIcon,
	EyeIcon,
	MapPinIcon,
	CalendarIcon,
	ImageIcon,
	VideoIcon,
	MusicIcon,
	BookOpenIcon,
	TrendingUpIcon,
	AwardIcon,
	ZapIcon,
	SparklesIcon
} from 'lucide-react'
import { ComponentDoc } from '@/components/ComponentDoc'

// Sample data for different carousel types
const heroSlides = [
	{ 
		id: 1, 
		title: 'Summer Collection 2024', 
		description: 'Discover the latest trends in fashion and style', 
		image: '🌟', 
		badge: 'New',
		color: 'from-blue-500 to-purple-600'
	},
	{ 
		id: 2, 
		title: 'Tech Innovation', 
		description: 'Revolutionary products that change everything', 
		image: '🚀', 
		badge: 'Featured',
		color: 'from-green-500 to-blue-600'
	},
	{ 
		id: 3, 
		title: 'Limited Edition', 
		description: 'Exclusive items available for a short time', 
		image: '💎', 
		badge: 'Limited',
		color: 'from-purple-500 to-pink-600'
	},
	{ 
		id: 4, 
		title: 'Best Sellers', 
		description: 'Most popular items loved by customers', 
		image: '🔥', 
		badge: 'Popular',
		color: 'from-orange-500 to-red-600'
	}
]

const products = [
	{ id: 1, name: 'Wireless Headphones', price: '$199', rating: 4.8, image: '🎧', category: 'Audio', inStock: true },
	{ id: 2, name: 'Smart Watch', price: '$299', rating: 4.6, image: '⌚', category: 'Wearables', inStock: true },
	{ id: 3, name: 'Laptop Stand', price: '$79', rating: 4.9, image: '💻', category: 'Accessories', inStock: false },
	{ id: 4, name: 'Bluetooth Speaker', price: '$149', rating: 4.7, image: '🔊', category: 'Audio', inStock: true },
	{ id: 5, name: 'Tablet', price: '$499', rating: 4.5, image: '📱', category: 'Electronics', inStock: true },
	{ id: 6, name: 'Gaming Mouse', price: '$89', rating: 4.8, image: '🖱️', category: 'Gaming', inStock: true }
]

const testimonials = [
	{ 
		id: 1, 
		name: 'Sarah Johnson', 
		role: 'Designer', 
		company: 'Creative Studio', 
		image: 'https://github.com/shadcn.png',
		rating: 5,
		content: 'Amazing product! The quality exceeded my expectations and the customer service was outstanding.'
	},
	{ 
		id: 2, 
		name: 'Mike Chen', 
		role: 'Developer', 
		company: 'Tech Corp', 
		image: null,
		rating: 5,
		content: 'Incredible performance and reliability. This has become an essential part of my daily workflow.'
	},
	{ 
		id: 3, 
		name: 'Emily Davis', 
		role: 'Marketing Manager', 
		company: 'Growth Inc', 
		image: 'https://github.com/leerob.png',
		rating: 4,
		content: 'Great value for money. The features are exactly what we needed for our team collaboration.'
	}
]

const mediaItems = [
	{ id: 1, type: 'image', title: 'Mountain Landscape', description: 'Breathtaking mountain views', icon: <ImageIcon className="w-6 h-6" /> },
	{ id: 2, type: 'video', title: 'Product Demo', description: 'See it in action', icon: <VideoIcon className="w-6 h-6" /> },
	{ id: 3, type: 'audio', title: 'Podcast Episode', description: 'Latest industry insights', icon: <MusicIcon className="w-6 h-6" /> },
	{ id: 4, type: 'document', title: 'User Guide', description: 'Complete documentation', icon: <BookOpenIcon className="w-6 h-6" /> }
]

export default function CarouselSample() {
	// State for interactive examples
	const [autoplay, setAutoplay] = useState(false)
	const [currentSlide, setCurrentSlide] = useState(0)
	const [likedProducts, setLikedProducts] = useState<Set<number>>(new Set())
	const [viewedItems, setViewedItems] = useState<Set<number>>(new Set())

	// Auto-advance carousel effect
	useEffect(() => {
		if (!autoplay) return
		const interval = setInterval(() => {
			setCurrentSlide(prev => (prev + 1) % heroSlides.length)
		}, 3000)
		return () => clearInterval(interval)
	}, [autoplay])

	// Handlers
	const toggleLike = (productId: number) => {
		const newLiked = new Set(likedProducts)
		if (newLiked.has(productId)) {
			newLiked.delete(productId)
		} else {
			newLiked.add(productId)
		}
		setLikedProducts(newLiked)
	}

	const markAsViewed = (itemId: number) => {
		setViewedItems(new Set([...viewedItems, itemId]))
	}

	// Helper functions
	const renderStars = (rating: number) => {
		return Array.from({ length: 5 }, (_, i) => (
			<StarIcon 
				key={i} 
				className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
			/>
		))
	}

	return (
		<Fragment>
			<ComponentDoc
				title="Carousel"
				description="A versatile carousel component for cycling through elements with touch support, keyboard navigation, and customizable layouts. Perfect for showcasing content, products, and media."
				component={
					<div className="flex flex-col gap-8 w-full max-w-6xl">
						{/* Basic Carousel */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Basic Carousel</h3>
							<Carousel className="max-w-sm mx-auto">
								<CarouselContent>
									{Array.from({ length: 5 }).map((_, index) => (
										<CarouselItem key={index}>
											<div className="p-1">
												<Card>
													<CardContent className="flex aspect-square items-center justify-center p-6">
														<span className="text-4xl font-semibold">{index + 1}</span>
													</CardContent>
												</Card>
											</div>
										</CarouselItem>
									))}
								</CarouselContent>
								<CarouselPrevious />
								<CarouselNext />
							</Carousel>
						</div>

						{/* Hero Carousel with Auto-play */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Hero Carousel with Auto-play</h3>
							<div className="mb-4">
								<Button 
									variant={autoplay ? "default" : "outline"}
									size="sm"
									onClick={() => setAutoplay(!autoplay)}
									className="flex items-center gap-2"
								>
									{autoplay ? <PauseIcon className="w-4 h-4" /> : <PlayIcon className="w-4 h-4" />}
									{autoplay ? 'Pause' : 'Play'} Auto-advance
								</Button>
							</div>
							<Carousel className="max-w-4xl mx-auto">
								<CarouselContent>
									{heroSlides.map((slide) => (
										<CarouselItem key={slide.id}>
											<Card className="border-0">
												<CardContent className={`p-0 h-64 bg-gradient-to-r ${slide.color} rounded-lg relative overflow-hidden`}>
													<div className="absolute inset-0 bg-black/20" />
													<div className="relative z-10 h-full flex items-center justify-between p-8 text-white">
														<div className="flex-1">
															<Badge variant="secondary" className="mb-4">
																{slide.badge}
															</Badge>
															<h2 className="text-3xl font-bold mb-2">{slide.title}</h2>
															<p className="text-lg opacity-90 mb-4">{slide.description}</p>
															<Button variant="secondary" size="lg">
																Shop Now
															</Button>
														</div>
														<div className="text-8xl opacity-30">
															{slide.image}
														</div>
													</div>
												</CardContent>
											</Card>
										</CarouselItem>
									))}
								</CarouselContent>
								<CarouselPrevious className="left-4" />
								<CarouselNext className="right-4" />
							</Carousel>
						</div>

						{/* Product Carousel */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Product Showcase Carousel</h3>
							<Carousel 
								className="max-w-5xl mx-auto"
								opts={{
									align: 'start',
									loop: true
								}}
							>
								<CarouselContent className="-ml-2">
									{products.map((product) => (
										<CarouselItem key={product.id} className="pl-2 md:basis-1/2 lg:basis-1/3">
											<Card className="h-full hover:shadow-lg transition-shadow">
												<CardContent className="p-4">
													<div className="relative mb-4">
														<div className="text-6xl text-center py-8">
															{product.image}
														</div>
														<div className="absolute top-2 right-2 flex gap-2">
															<Button
																size="sm"
																variant={likedProducts.has(product.id) ? "default" : "outline"}
																className="h-8 w-8 p-0"
																onClick={() => toggleLike(product.id)}
															>
																<HeartIcon className={`w-4 h-4 ${likedProducts.has(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
															</Button>
															{!product.inStock && (
																<Badge variant="destructive" className="text-xs">
																	Out of Stock
																</Badge>
															)}
														</div>
													</div>
													
													<div className="space-y-3">
														<div>
															<h3 className="font-semibold">{product.name}</h3>
															<Badge variant="outline" className="text-xs mt-1">
																{product.category}
															</Badge>
														</div>
														
														<div className="flex items-center gap-2">
															<div className="flex items-center">
																{renderStars(product.rating)}
															</div>
															<span className="text-sm text-gray-600">({product.rating})</span>
														</div>
														
														<div className="flex items-center justify-between">
															<span className="text-xl font-bold">{product.price}</span>
															<Button 
																size="sm" 
																disabled={!product.inStock}
																className="flex items-center gap-2"
															>
																<ShoppingCartIcon className="w-4 h-4" />
																Add
															</Button>
														</div>
													</div>
												</CardContent>
											</Card>
										</CarouselItem>
									))}
								</CarouselContent>
								<CarouselPrevious className="-left-12" />
								<CarouselNext className="-right-12" />
							</Carousel>
						</div>

						{/* Testimonials Carousel */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Customer Testimonials</h3>
							<Carousel className="max-w-4xl mx-auto">
								<CarouselContent>
									{testimonials.map((testimonial) => (
										<CarouselItem key={testimonial.id}>
											<Card className="text-center">
												<CardContent className="p-8">
													<div className="mb-6">
														<Avatar className="w-16 h-16 mx-auto mb-4">
															{testimonial.image ? (
																<AvatarImage src={testimonial.image} alt={testimonial.name} />
															) : (
																<AvatarFallback>
																	{testimonial.name.split(' ').map(n => n[0]).join('')}
																</AvatarFallback>
															)}
														</Avatar>
														<div className="flex justify-center mb-4">
															{renderStars(testimonial.rating)}
														</div>
													</div>
													
													<blockquote className="text-lg italic text-gray-600 mb-6">
														"{testimonial.content}"
													</blockquote>
													
													<div>
														<div className="font-semibold">{testimonial.name}</div>
														<div className="text-sm text-gray-500">
															{testimonial.role} at {testimonial.company}
														</div>
													</div>
												</CardContent>
											</Card>
										</CarouselItem>
									))}
								</CarouselContent>
								<CarouselPrevious />
								<CarouselNext />
							</Carousel>
						</div>

						{/* Media Carousel */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Media Gallery Carousel</h3>
							<Carousel 
								className="max-w-3xl mx-auto"
								opts={{
									align: 'center',
									loop: false
								}}
							>
								<CarouselContent className="-ml-4">
									{mediaItems.map((item) => (
										<CarouselItem key={item.id} className="pl-4 md:basis-1/2">
											<Card 
												className={`cursor-pointer transition-all hover:shadow-lg ${
													viewedItems.has(item.id) ? 'ring-2 ring-blue-500' : ''
												}`}
												onClick={() => markAsViewed(item.id)}
											>
												<CardContent className="p-6 text-center">
													<div className="mb-4 flex justify-center text-blue-600">
														{item.icon}
													</div>
													<h3 className="font-semibold mb-2">{item.title}</h3>
													<p className="text-sm text-gray-600 mb-4">{item.description}</p>
													<div className="flex items-center justify-center gap-2">
														<Badge variant="outline" className="text-xs">
															{item.type}
														</Badge>
														{viewedItems.has(item.id) && (
															<Badge variant="default" className="text-xs">
																<EyeIcon className="w-3 h-3 mr-1" />
																Viewed
															</Badge>
														)}
													</div>
												</CardContent>
											</Card>
										</CarouselItem>
									))}
								</CarouselContent>
								<CarouselPrevious />
								<CarouselNext />
							</Carousel>
						</div>

						{/* Responsive Multiple Items */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Responsive Multiple Items</h3>
							<Carousel 
								className="max-w-5xl mx-auto"
								opts={{
									align: 'start',
									loop: true
								}}
							>
								<CarouselContent className="-ml-2">
									{Array.from({ length: 8 }).map((_, index) => (
										<CarouselItem key={index} className="pl-2 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
											<Card>
												<CardContent className="p-4 text-center">
													<div className="text-4xl mb-2">
														{['🎯', '⚡', '🚀', '💫', '🎨', '🔥', '✨', '🌟'][index]}
													</div>
													<h3 className="font-semibold mb-1">Feature {index + 1}</h3>
													<p className="text-sm text-gray-600">Description text here</p>
												</CardContent>
											</Card>
										</CarouselItem>
									))}
								</CarouselContent>
								<CarouselPrevious className="-left-12" />
								<CarouselNext className="-right-12" />
							</Carousel>
						</div>

						{/* Current State Display */}
						<div className="mt-6 p-4 bg-gray-50 rounded-lg">
							<h4 className="text-sm font-semibold text-gray-700 mb-2">Interactive State:</h4>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
								<div>
									<p><strong>Auto-play:</strong> {autoplay ? '▶️ Active' : '⏸️ Paused'}</p>
									<p><strong>Current Slide:</strong> {currentSlide + 1}/{heroSlides.length}</p>
								</div>
								<div>
									<p><strong>Liked Products:</strong> {likedProducts.size}</p>
									<p><strong>Viewed Media:</strong> {viewedItems.size}/{mediaItems.length}</p>
								</div>
								<div>
									<p><strong>In-Stock Products:</strong> {products.filter(p => p.inStock).length}/{products.length}</p>
									<p><strong>Avg Rating:</strong> {(products.reduce((acc, p) => acc + p.rating, 0) / products.length).toFixed(1)} ⭐</p>
								</div>
							</div>
						</div>
					</div>
				}
			/>

			<ComponentDoc
				title="Carousel Props & Usage Guidelines"
				description="Comprehensive guide to Carousel component configuration, responsive layouts, and best practices."
				component={
					<div className="flex flex-col gap-6 w-full max-w-4xl">
						{/* Props Reference */}
						<div className="p-4 bg-blue-50 rounded-lg">
							<h4 className="text-sm font-semibold text-blue-700 mb-2">Props Reference:</h4>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-600">
								<div>
									<strong>Carousel:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li><code>className</code> - Additional CSS classes</li>
										<li><code>opts</code> - Embla carousel options</li>
										<li><code>plugins</code> - Embla carousel plugins</li>
										<li><code>orientation</code> - horizontal | vertical</li>
									</ul>
								</div>
								<div>
									<strong>CarouselContent:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li><code>className</code> - Content container styling</li>
										<li><code>children</code> - CarouselItem components</li>
										<li>Manages scroll container and items</li>
									</ul>
								</div>
								<div>
									<strong>CarouselItem:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li><code>className</code> - Item styling and sizing</li>
										<li><code>basis-*</code> - Responsive item widths</li>
										<li>Individual carousel slide container</li>
									</ul>
								</div>
								<div>
									<strong>CarouselPrevious/Next:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li><code>className</code> - Button positioning</li>
										<li><code>variant</code> - Button styling variant</li>
										<li><code>size</code> - Button size</li>
										<li>Navigation controls</li>
									</ul>
								</div>
								<div>
									<strong>Common Options (opts):</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li><code>align: 'start' | 'center' | 'end'</code></li>
										<li><code>loop: boolean</code> - Infinite scroll</li>
										<li><code>skipSnaps: boolean</code></li>
										<li><code>dragFree: boolean</code></li>
									</ul>
								</div>
								<div>
									<strong>Responsive Classes:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li><code>basis-full</code> - 100% width</li>
										<li><code>md:basis-1/2</code> - 50% on medium+</li>
										<li><code>lg:basis-1/3</code> - 33% on large+</li>
										<li><code>xl:basis-1/4</code> - 25% on xl+</li>
									</ul>
								</div>
								<div>
									<strong>Touch & Accessibility:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li>Touch/swipe gestures built-in</li>
										<li>Keyboard navigation support</li>
										<li>ARIA labels and roles</li>
										<li>Focus management</li>
									</ul>
								</div>
								<div>
									<strong>Performance:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li>Virtualization support</li>
										<li>Lazy loading compatible</li>
										<li>Smooth animations</li>
										<li>Minimal re-renders</li>
									</ul>
								</div>
							</div>
						</div>

						{/* Usage Guidelines */}
						<div className="p-4 bg-green-50 rounded-lg">
							<h4 className="text-sm font-semibold text-green-700 mb-2">Usage Guidelines:</h4>
							<ul className="text-sm text-green-600 space-y-1 list-disc list-inside">
								<li><strong>Content Types:</strong> Use for hero sections, product showcases, testimonials, image galleries</li>
								<li><strong>Item Count:</strong> Works best with 3+ items; consider other layouts for fewer items</li>
								<li><strong>Mobile First:</strong> Design for mobile gestures and touch interactions</li>
								<li><strong>Navigation:</strong> Always provide clear navigation controls and indicators</li>
								<li><strong>Auto-advance:</strong> Use sparingly and provide pause controls for accessibility</li>
								<li><strong>Loading States:</strong> Show placeholders or skeleton loaders for async content</li>
								<li><strong>Responsive Design:</strong> Adjust item count and sizing across breakpoints</li>
								<li><strong>Performance:</strong> Optimize images and consider lazy loading for large carousels</li>
							</ul>
						</div>

						{/* Code Examples */}
						<div className="p-4 bg-gray-100 rounded-lg">
							<h4 className="text-sm font-semibold text-gray-700 mb-2">Code Examples:</h4>
							<pre className="text-xs text-gray-600 overflow-x-auto whitespace-pre-wrap">
{`// Basic carousel
<Carousel className="max-w-sm">
  <CarouselContent>
    {items.map((item, index) => (
      <CarouselItem key={index}>
        <Card>
          <CardContent className="p-6">
            {item.content}
          </CardContent>
        </Card>
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>

// Responsive multi-item carousel
<Carousel
  className="max-w-5xl"
  opts={{
    align: "start",
    loop: true
  }}
>
  <CarouselContent className="-ml-2">
    {products.map((product) => (
      <CarouselItem 
        key={product.id} 
        className="pl-2 md:basis-1/2 lg:basis-1/3"
      >
        <ProductCard product={product} />
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious className="-left-12" />
  <CarouselNext className="-right-12" />
</Carousel>

// Carousel with custom navigation positioning
<Carousel className="relative">
  <CarouselContent>
    {/* items */}
  </CarouselContent>
  <CarouselPrevious className="absolute left-4 top-1/2" />
  <CarouselNext className="absolute right-4 top-1/2" />
</Carousel>

// Auto-advance carousel with pause
const [autoplay, setAutoplay] = useState(false)

useEffect(() => {
  if (!autoplay) return
  const interval = setInterval(() => {
    // Advance to next slide
  }, 3000)
  return () => clearInterval(interval)
}, [autoplay])`}
							</pre>
						</div>

						{/* Design Guidelines */}
						<div className="p-4 bg-purple-50 rounded-lg">
							<h4 className="text-sm font-semibold text-purple-700 mb-2">Design Guidelines:</h4>
							<ul className="text-sm text-purple-600 space-y-1 list-disc list-inside">
								<li><strong>Visual Consistency:</strong> Maintain consistent item heights and spacing throughout</li>
								<li><strong>Navigation Clarity:</strong> Make navigation buttons clearly visible and accessible</li>
								<li><strong>Content Priority:</strong> Place most important content in the first few slides</li>
								<li><strong>Loading States:</strong> Use skeleton loaders that match final content dimensions</li>
								<li><strong>Touch Targets:</strong> Ensure navigation buttons are at least 44px on mobile</li>
								<li><strong>Indicators:</strong> Consider adding dots or progress indicators for longer carousels</li>
								<li><strong>Animation Timing:</strong> Use smooth, not-too-fast transitions for better UX</li>
								<li><strong>Fallback Content:</strong> Ensure content is accessible when JavaScript is disabled</li>
							</ul>
						</div>
					</div>
				}
			/>
		</Fragment>
	)
}
