import { Fragment, useState } from 'react'
import {
	Button,
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
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
	ScrollArea
} from '@rs-kit/ui-kit'
import {
	MenuIcon,
	ShoppingCartIcon,
	UserIcon,
	SettingsIcon,
	BellIcon,
	SearchIcon,
	FilterIcon,
	SlidersIcon,
	PlusIcon,
	EditIcon,
	TrashIcon,
	StarIcon,
	HeartIcon,
	ShareIcon,
	MoreHorizontalIcon,
	InfoIcon,
	XIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	HomeIcon,
	PackageIcon,
	TruckIcon,
	CreditCardIcon,
	HelpCircleIcon,
	LogOutIcon,
	MapPinIcon,
	PhoneIcon,
	MailIcon,
	CalendarIcon,
	ClockIcon,
	TagIcon,
	DollarSignIcon,
	MinusIcon,
	ImageIcon,
	FileTextIcon
} from 'lucide-react'
import { ComponentDoc } from '@/components/ComponentDoc'

// Mobile Navigation Sheet
const MobileNavigationSheet = () => {
	const [isOpen, setIsOpen] = useState(false)

	const mainNavItems = [
		{ id: 'home', title: 'Home', icon: HomeIcon, href: '#' },
		{ id: 'products', title: 'Products', icon: PackageIcon, href: '#', badge: 'New' },
		{ id: 'orders', title: 'Orders', icon: TruckIcon, href: '#' },
		{ id: 'payments', title: 'Payments', icon: CreditCardIcon, href: '#' }
	]

	const accountItems = [
		{ id: 'profile', title: 'Profile', icon: UserIcon, href: '#' },
		{ id: 'settings', title: 'Settings', icon: SettingsIcon, href: '#' },
		{ id: 'help', title: 'Help & Support', icon: HelpCircleIcon, href: '#' }
	]

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold flex items-center gap-2">
					<MenuIcon className="w-5 h-5" />
					Mobile Navigation
				</Label>
				<p className="text-sm text-muted-foreground">Slide-out navigation menu for mobile interfaces with user profile and main navigation</p>
			</div>

			<div className="border rounded-lg p-4 bg-gray-50">
				<div className="flex items-center justify-between mb-4">
					<h3 className="font-semibold">Mobile App Header</h3>
					<Sheet open={isOpen} onOpenChange={setIsOpen}>
						<SheetTrigger asChild>
							<Button variant="ghost" size="sm">
								<MenuIcon className="w-5 h-5" />
							</Button>
						</SheetTrigger>
						<SheetContent side="left" className="w-80">
							<SheetHeader>
								<div className="flex items-center gap-3 text-left">
									<Avatar className="w-12 h-12">
										<AvatarImage src="https://github.com/shadcn.png" />
										<AvatarFallback>JD</AvatarFallback>
									</Avatar>
									<div>
										<SheetTitle className="text-left">John Doe</SheetTitle>
										<SheetDescription className="text-left">john.doe@example.com</SheetDescription>
									</div>
								</div>
							</SheetHeader>

							<div className="py-6">
								<div className="space-y-6">
									{/* Main Navigation */}
									<div>
										<Label className="text-sm font-medium text-muted-foreground mb-3 block">Main Menu</Label>
										<div className="space-y-1">
											{mainNavItems.map((item) => {
												const IconComponent = item.icon
												return (
													<button
														key={item.id}
														className="w-full flex items-center justify-between p-3 rounded-md hover:bg-gray-100 transition-colors"
														onClick={() => setIsOpen(false)}
													>
														<div className="flex items-center gap-3">
															<IconComponent className="w-4 h-4" />
															<span className="font-medium">{item.title}</span>
														</div>
														{item.badge && (
															<Badge variant="secondary" className="text-xs">
																{item.badge}
															</Badge>
														)}
													</button>
												)
											})}
										</div>
									</div>

									<Separator />

									{/* Account Section */}
									<div>
										<Label className="text-sm font-medium text-muted-foreground mb-3 block">Account</Label>
										<div className="space-y-1">
											{accountItems.map((item) => {
												const IconComponent = item.icon
												return (
													<button
														key={item.id}
														className="w-full flex items-center gap-3 p-3 rounded-md hover:bg-gray-100 transition-colors"
														onClick={() => setIsOpen(false)}
													>
														<IconComponent className="w-4 h-4" />
														<span className="font-medium">{item.title}</span>
													</button>
												)
											})}
										</div>
									</div>

									<Separator />

									{/* Logout */}
									<button
										className="w-full flex items-center gap-3 p-3 rounded-md hover:bg-red-50 text-red-600 transition-colors"
										onClick={() => setIsOpen(false)}
									>
										<LogOutIcon className="w-4 h-4" />
										<span className="font-medium">Sign Out</span>
									</button>
								</div>
							</div>
						</SheetContent>
					</Sheet>
				</div>
				<p className="text-sm text-muted-foreground">Click the menu button to open the navigation sheet</p>
			</div>
		</div>
	)
}

// Shopping Cart Sheet
const ShoppingCartSheet = () => {
	const [cartItems, setCartItems] = useState([
		{ id: 1, name: 'Wireless Headphones', price: 199.99, quantity: 1, image: '🎧' },
		{ id: 2, name: 'Smart Watch', price: 299.99, quantity: 2, image: '⌚' },
		{ id: 3, name: 'Laptop Stand', price: 79.99, quantity: 1, image: '💻' }
	])

	const updateQuantity = (id: number, newQuantity: number) => {
		if (newQuantity === 0) {
			setCartItems(prev => prev.filter(item => item.id !== id))
		} else {
			setCartItems(prev => prev.map(item => 
				item.id === id ? { ...item, quantity: newQuantity } : item
			))
		}
	}

	const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
	const shipping = 9.99
	const tax = subtotal * 0.08
	const total = subtotal + shipping + tax

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold flex items-center gap-2">
					<ShoppingCartIcon className="w-5 h-5" />
					Shopping Cart
				</Label>
				<p className="text-sm text-muted-foreground">E-commerce cart with item management, quantity controls, and checkout summary</p>
			</div>

			<div className="border rounded-lg p-4 bg-gray-50">
				<div className="flex items-center justify-between mb-4">
					<h3 className="font-semibold">E-commerce Header</h3>
					<Sheet>
						<SheetTrigger asChild>
							<Button variant="outline" size="sm" className="relative">
								<ShoppingCartIcon className="w-4 h-4 mr-2" />
								Cart
								{cartItems.length > 0 && (
									<Badge variant="destructive" className="absolute -top-2 -right-2 text-xs">
										{cartItems.reduce((sum, item) => sum + item.quantity, 0)}
									</Badge>
								)}
							</Button>
						</SheetTrigger>
						<SheetContent className="w-full sm:max-w-lg">
							<SheetHeader>
								<SheetTitle>Shopping Cart</SheetTitle>
								<SheetDescription>
									Review your items and proceed to checkout when ready
								</SheetDescription>
							</SheetHeader>

							<div className="flex-1 py-6">
								{cartItems.length === 0 ? (
									<div className="flex flex-col items-center justify-center h-64 text-center">
										<ShoppingCartIcon className="w-16 h-16 text-muted-foreground mb-4" />
										<h3 className="font-medium text-lg mb-2">Your cart is empty</h3>
										<p className="text-muted-foreground">Add some items to get started</p>
									</div>
								) : (
									<ScrollArea className="h-96">
										<div className="space-y-4">
											{cartItems.map((item) => (
												<Card key={item.id}>
													<CardContent className="p-4">
														<div className="flex items-center gap-4">
															<div className="text-2xl">{item.image}</div>
															<div className="flex-1">
																<h4 className="font-medium">{item.name}</h4>
																<p className="text-sm text-muted-foreground">${item.price}</p>
															</div>
															<div className="flex items-center gap-2">
																<Button
																	variant="outline"
																	size="sm"
																	onClick={() => updateQuantity(item.id, item.quantity - 1)}
																>
																	<MinusIcon className="w-3 h-3" />
																</Button>
																<span className="w-8 text-center">{item.quantity}</span>
																<Button
																	variant="outline"
																	size="sm"
																	onClick={() => updateQuantity(item.id, item.quantity + 1)}
																>
																	<PlusIcon className="w-3 h-3" />
																</Button>
															</div>
															<Button
																variant="ghost"
																size="sm"
																onClick={() => updateQuantity(item.id, 0)}
															>
																<TrashIcon className="w-4 h-4" />
															</Button>
														</div>
													</CardContent>
												</Card>
											))}
										</div>
									</ScrollArea>
								)}
							</div>

							{cartItems.length > 0 && (
								<SheetFooter className="flex-col space-y-4">
									<div className="space-y-2 w-full">
										<div className="flex justify-between text-sm">
											<span>Subtotal</span>
											<span>${subtotal.toFixed(2)}</span>
										</div>
										<div className="flex justify-between text-sm">
											<span>Shipping</span>
											<span>${shipping.toFixed(2)}</span>
										</div>
										<div className="flex justify-between text-sm">
											<span>Tax</span>
											<span>${tax.toFixed(2)}</span>
										</div>
										<Separator />
										<div className="flex justify-between font-medium">
											<span>Total</span>
											<span>${total.toFixed(2)}</span>
										</div>
									</div>
									<div className="flex gap-2 w-full">
										<SheetClose asChild>
											<Button variant="outline" className="flex-1">Continue Shopping</Button>
										</SheetClose>
										<SheetClose asChild>
											<Button className="flex-1">Checkout</Button>
										</SheetClose>
									</div>
								</SheetFooter>
							)}
						</SheetContent>
					</Sheet>
				</div>
				<p className="text-sm text-muted-foreground">Click the cart button to view and manage items</p>
			</div>
		</div>
	)
}

// Product Details Sheet
const ProductDetailsSheet = () => {
	const [selectedSize, setSelectedSize] = useState('M')
	const [selectedColor, setSelectedColor] = useState('Navy')
	const [quantity, setQuantity] = useState(1)

	const product = {
		name: 'Premium Cotton T-Shirt',
		price: 29.99,
		originalPrice: 39.99,
		rating: 4.5,
		reviews: 128,
		description: 'Made from 100% organic cotton, this premium t-shirt offers exceptional comfort and durability. Perfect for everyday wear.',
		sizes: ['XS', 'S', 'M', 'L', 'XL'],
		colors: ['Navy', 'White', 'Gray', 'Black'],
		features: ['100% Organic Cotton', 'Machine Washable', 'Pre-shrunk', 'Sustainable']
	}

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold flex items-center gap-2">
					<PackageIcon className="w-5 h-5" />
					Product Details
				</Label>
				<p className="text-sm text-muted-foreground">Detailed product view with size selection, color options, and purchase controls</p>
			</div>

			<div className="border rounded-lg p-4 bg-gray-50">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
					{Array.from({ length: 4 }, (_, i) => (
						<Card key={i} className="hover:shadow-md transition-shadow cursor-pointer">
							<CardContent className="p-4">
								<div className="text-center space-y-2">
									<div className="text-4xl">👕</div>
									<p className="font-medium text-sm">Cotton Tee</p>
									<p className="text-sm text-muted-foreground">$29.99</p>
									<Sheet>
										<SheetTrigger asChild>
											<Button size="sm" className="w-full">
												View Details
											</Button>
										</SheetTrigger>
										<SheetContent className="w-full sm:max-w-lg">
											<SheetHeader>
												<SheetTitle>{product.name}</SheetTitle>
												<SheetDescription>
													Product details and purchase options
												</SheetDescription>
											</SheetHeader>

											<ScrollArea className="h-96 py-6">
												<div className="space-y-6">
													{/* Product Image */}
													<div className="text-center">
														<div className="text-8xl mb-4">👕</div>
														<div className="flex items-center justify-center gap-2 mb-2">
															<div className="flex text-yellow-400">
																{'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}
															</div>
															<span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
														</div>
													</div>

													{/* Price */}
													<div className="text-center space-y-1">
														<div className="flex items-center justify-center gap-2">
															<span className="text-2xl font-bold text-green-600">${product.price}</span>
															<span className="text-lg text-muted-foreground line-through">${product.originalPrice}</span>
														</div>
														<Badge variant="destructive">25% OFF</Badge>
													</div>

													{/* Description */}
													<div>
														<h4 className="font-medium mb-2">Description</h4>
														<p className="text-sm text-muted-foreground">{product.description}</p>
													</div>

													{/* Size Selection */}
													<div>
														<h4 className="font-medium mb-3">Size</h4>
														<div className="flex gap-2">
															{product.sizes.map((size) => (
																<Button
																	key={size}
																	variant={selectedSize === size ? "default" : "outline"}
																	size="sm"
																	onClick={() => setSelectedSize(size)}
																>
																	{size}
																</Button>
															))}
														</div>
													</div>

													{/* Color Selection */}
													<div>
														<h4 className="font-medium mb-3">Color</h4>
														<div className="flex gap-2">
															{product.colors.map((color) => (
																<Button
																	key={color}
																	variant={selectedColor === color ? "default" : "outline"}
																	size="sm"
																	onClick={() => setSelectedColor(color)}
																>
																	{color}
																</Button>
															))}
														</div>
													</div>

													{/* Quantity */}
													<div>
														<h4 className="font-medium mb-3">Quantity</h4>
														<div className="flex items-center gap-2">
															<Button
																variant="outline"
																size="sm"
																onClick={() => setQuantity(Math.max(1, quantity - 1))}
															>
																<MinusIcon className="w-3 h-3" />
															</Button>
															<span className="w-12 text-center">{quantity}</span>
															<Button
																variant="outline"
																size="sm"
																onClick={() => setQuantity(quantity + 1)}
															>
																<PlusIcon className="w-3 h-3" />
															</Button>
														</div>
													</div>

													{/* Features */}
													<div>
														<h4 className="font-medium mb-3">Features</h4>
														<div className="space-y-1">
															{product.features.map((feature) => (
																<div key={feature} className="flex items-center gap-2 text-sm">
																	<div className="w-1 h-1 bg-gray-400 rounded-full"></div>
																	<span>{feature}</span>
																</div>
															))}
														</div>
													</div>
												</div>
											</ScrollArea>

											<SheetFooter className="flex-col space-y-3">
												<div className="flex gap-2 w-full">
													<Button variant="outline" className="flex-1">
														<HeartIcon className="w-4 h-4 mr-2" />
														Wishlist
													</Button>
													<Button variant="outline" className="flex-1">
														<ShareIcon className="w-4 h-4 mr-2" />
														Share
													</Button>
												</div>
												<div className="flex gap-2 w-full">
													<SheetClose asChild>
														<Button variant="outline" className="flex-1">Add to Cart</Button>
													</SheetClose>
													<SheetClose asChild>
														<Button className="flex-1">Buy Now</Button>
													</SheetClose>
												</div>
											</SheetFooter>
										</SheetContent>
									</Sheet>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
				<p className="text-sm text-muted-foreground">Click "View Details" on any product to see the detailed sheet</p>
			</div>
		</div>
	)
}

// Basic Sheet Examples
const BasicSheetExamples = () => {
	const [formData, setFormData] = useState({
		name: 'John Doe',
		email: 'john@example.com',
		bio: 'Software developer passionate about creating great user experiences.'
	})

	const sides = ['top', 'right', 'bottom', 'left'] as const

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold">Basic Sheet Examples</Label>
				<p className="text-sm text-muted-foreground">Different sheet configurations and side positions</p>
			</div>

			<div className="space-y-8">
				<div>
					<Label className="font-medium mb-3 block">Different Sides</Label>
					<div className="flex gap-2">
						{sides.map((side) => (
							<Sheet key={side}>
								<SheetTrigger asChild>
									<Button variant="outline" size="sm">
										{side.charAt(0).toUpperCase() + side.slice(1)}
									</Button>
								</SheetTrigger>
								<SheetContent side={side}>
									<SheetHeader>
										<SheetTitle>Sheet from {side}</SheetTitle>
										<SheetDescription>
											This sheet slides in from the {side} side of the screen.
										</SheetDescription>
									</SheetHeader>
									<div className="py-6">
										<p className="text-sm text-muted-foreground">
											This is a {side}-side sheet. You can place any content here, including forms, navigation, or detailed information.
										</p>
									</div>
									<SheetFooter>
										<SheetClose asChild>
											<Button>Close</Button>
										</SheetClose>
									</SheetFooter>
								</SheetContent>
							</Sheet>
						))}
					</div>
				</div>

				<div>
					<Label className="font-medium mb-3 block">Profile Edit Form</Label>
					<Sheet>
						<SheetTrigger asChild>
							<Button variant="outline">
								<EditIcon className="w-4 h-4 mr-2" />
								Edit Profile
							</Button>
						</SheetTrigger>
						<SheetContent>
							<SheetHeader>
								<SheetTitle>Edit Profile</SheetTitle>
								<SheetDescription>
									Make changes to your profile here. Click save when you're done.
								</SheetDescription>
							</SheetHeader>
							<div className="py-6 space-y-4">
								<div className="space-y-2">
									<Label htmlFor="name">Name</Label>
									<Input 
										id="name" 
										value={formData.name}
										onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="email">Email</Label>
									<Input 
										id="email" 
										type="email"
										value={formData.email}
										onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="bio">Bio</Label>
									<Textarea 
										id="bio" 
										value={formData.bio}
										onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
										rows={3}
									/>
								</div>
							</div>
							<SheetFooter>
								<SheetClose asChild>
									<Button variant="outline">Cancel</Button>
								</SheetClose>
								<SheetClose asChild>
									<Button>Save Changes</Button>
								</SheetClose>
							</SheetFooter>
						</SheetContent>
					</Sheet>
				</div>

				<div>
					<Label className="font-medium mb-3 block">Filters Panel</Label>
					<Sheet>
						<SheetTrigger asChild>
							<Button variant="outline">
								<FilterIcon className="w-4 h-4 mr-2" />
								Filters
							</Button>
						</SheetTrigger>
						<SheetContent side="left" className="w-80">
							<SheetHeader>
								<SheetTitle>Filter Products</SheetTitle>
								<SheetDescription>
									Apply filters to find exactly what you're looking for.
								</SheetDescription>
							</SheetHeader>
							<div className="py-6 space-y-6">
								<div>
									<Label className="font-medium mb-3 block">Category</Label>
									<Select>
										<SelectTrigger>
											<SelectValue placeholder="Select category" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="electronics">Electronics</SelectItem>
											<SelectItem value="clothing">Clothing</SelectItem>
											<SelectItem value="books">Books</SelectItem>
											<SelectItem value="home">Home & Garden</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div>
									<Label className="font-medium mb-3 block">Price Range</Label>
									<div className="space-y-2">
										<div className="flex gap-2">
											<Input placeholder="Min" />
											<Input placeholder="Max" />
										</div>
									</div>
								</div>
								<div>
									<Label className="font-medium mb-3 block">Features</Label>
									<div className="space-y-2">
										{['Free Shipping', 'On Sale', 'In Stock', 'Highly Rated'].map((feature) => (
											<div key={feature} className="flex items-center space-x-2">
												<Checkbox id={feature} />
												<Label htmlFor={feature} className="text-sm">{feature}</Label>
											</div>
										))}
									</div>
								</div>
							</div>
							<SheetFooter>
								<SheetClose asChild>
									<Button variant="outline" className="flex-1">Clear All</Button>
								</SheetClose>
								<SheetClose asChild>
									<Button className="flex-1">Apply Filters</Button>
								</SheetClose>
							</SheetFooter>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</div>
	)
}

export default function SheetSample() {
	const [showAdvanced, setShowAdvanced] = useState(false)

	return (
		<Fragment>
			<ComponentDoc
				title="Sheet"
				description="Slide-out panels that complement main content with contextual information and actions. Perfect for navigation, shopping carts, product details, and any secondary content requiring focus."
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
							<h3 className="text-lg font-semibold mb-4">Sheet Applications</h3>
							<div className="grid grid-cols-1 gap-8">
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<MenuIcon className="w-5 h-5" />
											Mobile Navigation
										</CardTitle>
										<CardDescription>Responsive navigation drawer with user profile and organized menu sections</CardDescription>
									</CardHeader>
									<CardContent>
										<MobileNavigationSheet />
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<ShoppingCartIcon className="w-5 h-5" />
											Shopping Cart
										</CardTitle>
										<CardDescription>E-commerce cart with item management and checkout summary</CardDescription>
									</CardHeader>
									<CardContent>
										<ShoppingCartSheet />
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<PackageIcon className="w-5 h-5" />
											Product Details
										</CardTitle>
										<CardDescription>Detailed product view with options selection and purchase controls</CardDescription>
									</CardHeader>
									<CardContent>
										<ProductDetailsSheet />
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
											Simple Sheets
										</CardTitle>
										<CardDescription>Basic sheet configurations from different sides and use cases</CardDescription>
									</CardHeader>
									<CardContent>
										<BasicSheetExamples />
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
								<CardDescription>Best practices for implementing sheet components</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div>
										<h4 className="font-semibold mb-2">When to Use</h4>
										<ul className="space-y-1 text-sm text-muted-foreground">
											<li>• For secondary content that complements the main view</li>
											<li>• In mobile navigation and responsive menu systems</li>
											<li>• For shopping carts and checkout processes</li>
											<li>• When displaying detailed information without leaving the current page</li>
											<li>• For forms and configuration panels that need context</li>
										</ul>
									</div>
									<Separator />
									<div>
										<h4 className="font-semibold mb-2">Design Principles</h4>
										<ul className="space-y-1 text-sm text-muted-foreground">
											<li>• Choose appropriate slide direction based on content hierarchy</li>
											<li>• Include clear headers and descriptions for context</li>
											<li>• Provide easy close actions (button, backdrop click, escape key)</li>
											<li>• Consider sheet width based on content requirements</li>
											<li>• Use consistent animations and transitions</li>
											<li>• Ensure accessibility with proper focus management</li>
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
										<strong>Use Cases:</strong> Navigation, Cart, Product Details{showAdvanced ? ', Basic' : ''}
									</p>
									<p>
										<strong>Features:</strong> Multiple Sides, Scrolling, Forms, Interactive Content
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
