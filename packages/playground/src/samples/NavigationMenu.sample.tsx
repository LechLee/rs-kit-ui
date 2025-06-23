import { Fragment, useState } from 'react'
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
	cn,
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
	AvatarImage
} from '@rs-kit/ui-kit'
import {
	HomeIcon,
	ShoppingBagIcon,
	InfoIcon,
	MailIcon,
	PhoneIcon,
	MapPinIcon,
	BookOpenIcon,
	CodeIcon,
	PaletteIcon,
	SettingsIcon,
	HelpCircleIcon,
	UserIcon,
	CreditCardIcon,
	ShieldIcon,
	TruckIcon,
	StarIcon,
	MenuIcon,
	GlobeIcon,
	BuildingIcon,
	BriefcaseIcon,
	GraduationCapIcon,
	HeartIcon,
	ChevronRightIcon,
	ExternalLinkIcon,
	CalendarIcon,
	MessageSquareIcon,
	FileTextIcon,
	BarChartIcon,
	TrendingUpIcon,
	UsersIcon,
	DatabaseIcon,
	CloudIcon,
	ShoppingCartIcon,
	CameraIcon,
	MusicIcon,
	GamepadIcon,
	MonitorIcon,
	WifiIcon,
	BatteryIcon
} from 'lucide-react'
import { ComponentDoc } from '@/components/ComponentDoc'

// E-commerce Website Navigation
const EcommerceNavigation = () => {
	const productCategories = [
		{
			title: 'Electronics',
			icon: MonitorIcon,
			description: 'Latest tech gadgets and devices',
			items: [
				{ name: 'Laptops & Computers', href: '/electronics/computers', description: 'High-performance laptops and desktops' },
				{ name: 'Smartphones & Tablets', href: '/electronics/mobile', description: 'Latest mobile devices and accessories' },
				{ name: 'Audio & Headphones', href: '/electronics/audio', description: 'Premium sound equipment' },
				{ name: 'Gaming', href: '/electronics/gaming', description: 'Consoles, games, and accessories' }
			]
		},
		{
			title: 'Fashion & Clothing',
			icon: ShoppingBagIcon,
			description: 'Trendy apparel and accessories',
			items: [
				{ name: "Men's Clothing", href: '/fashion/mens', description: 'Stylish clothes for men' },
				{ name: "Women's Clothing", href: '/fashion/womens', description: 'Fashion-forward women\'s wear' },
				{ name: 'Shoes & Accessories', href: '/fashion/accessories', description: 'Complete your look' },
				{ name: 'Sports & Activewear', href: '/fashion/sports', description: 'Athletic and casual wear' }
			]
		},
		{
			title: 'Home & Garden',
			icon: HomeIcon,
			description: 'Everything for your living space',
			items: [
				{ name: 'Furniture', href: '/home/furniture', description: 'Quality furniture for every room' },
				{ name: 'Kitchen & Dining', href: '/home/kitchen', description: 'Cookware and dining essentials' },
				{ name: 'Garden & Outdoor', href: '/home/garden', description: 'Plants, tools, and outdoor furniture' },
				{ name: 'Home Decor', href: '/home/decor', description: 'Decorative items and accessories' }
			]
		}
	]

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold flex items-center gap-2">
					<ShoppingCartIcon className="w-5 h-5" />
					E-commerce Navigation
				</Label>
				<p className="text-sm text-muted-foreground">Comprehensive product navigation with categorized mega menus</p>
			</div>

			<div className="space-y-4">
				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuLink className={navigationMenuTriggerStyle()} href="/">
								<HomeIcon className="w-4 h-4 mr-2" />
								Home
							</NavigationMenuLink>
						</NavigationMenuItem>

						{productCategories.map((category) => {
							const IconComponent = category.icon
							return (
								<NavigationMenuItem key={category.title}>
									<NavigationMenuTrigger>
										<IconComponent className="w-4 h-4 mr-2" />
										{category.title}
									</NavigationMenuTrigger>
									<NavigationMenuContent>
										<div className="grid gap-3 p-6 md:w-[500px] lg:w-[600px] lg:grid-cols-[.75fr_1fr]">
											<div className="row-span-3">
												<NavigationMenuLink asChild>
													<div className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-blue-50 to-blue-100 p-6 no-underline outline-none focus:shadow-md">
														<IconComponent className="h-8 w-8 text-blue-600 mb-2" />
														<div className="mb-2 mt-4 text-lg font-medium">{category.title}</div>
														<p className="text-sm leading-tight text-muted-foreground">{category.description}</p>
														<div className="mt-4">
															<Badge variant="secondary">Featured Category</Badge>
														</div>
													</div>
												</NavigationMenuLink>
											</div>
											<div className="grid gap-1">
												{category.items.map((item) => (
													<NavigationMenuLink key={item.name} asChild>
														<a
															href={item.href}
															className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
														>
															<div className="text-sm font-medium leading-none">{item.name}</div>
															<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{item.description}</p>
														</a>
													</NavigationMenuLink>
												))}
											</div>
										</div>
									</NavigationMenuContent>
								</NavigationMenuItem>
							)
						})}

						<NavigationMenuItem>
							<NavigationMenuLink className={navigationMenuTriggerStyle()}>
								<TruckIcon className="w-4 h-4 mr-2" />
								Shipping
							</NavigationMenuLink>
						</NavigationMenuItem>

						<NavigationMenuItem>
							<NavigationMenuLink className={navigationMenuTriggerStyle()}>
								<HelpCircleIcon className="w-4 h-4 mr-2" />
								Support
							</NavigationMenuLink>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>

				<div className="p-4 bg-gray-50 rounded-lg">
					<h4 className="text-sm font-semibold text-gray-700 mb-2">Navigation Features:</h4>
					<div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
						<div>
							<p><strong>Categories:</strong> 3 main product categories</p>
							<p><strong>Structure:</strong> Featured sections with sub-items</p>
						</div>
						<div>
							<p><strong>Icons:</strong> Visual category identification</p>
							<p><strong>Layout:</strong> Mega menu with grid layout</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

// Corporate Website Navigation
const CorporateNavigation = () => {
	const aboutItems = [
		{ title: 'Company History', href: '/about/history', description: 'Our journey and milestones since inception' },
		{ title: 'Leadership Team', href: '/about/leadership', description: 'Meet our executive team and board' },
		{ title: 'Mission & Values', href: '/about/mission', description: 'Our core beliefs and principles' },
		{ title: 'Careers', href: '/about/careers', description: 'Join our growing team' }
	]

	const servicesItems = [
		{ title: 'Consulting', href: '/services/consulting', description: 'Strategic business consulting services' },
		{ title: 'Implementation', href: '/services/implementation', description: 'End-to-end solution implementation' },
		{ title: 'Support & Maintenance', href: '/services/support', description: '24/7 technical support services' },
		{ title: 'Training', href: '/services/training', description: 'Professional training programs' }
	]

	const solutionsItems = [
		{ title: 'Enterprise Software', href: '/solutions/enterprise', description: 'Scalable enterprise solutions' },
		{ title: 'Cloud Services', href: '/solutions/cloud', description: 'Modern cloud infrastructure' },
		{ title: 'Data Analytics', href: '/solutions/analytics', description: 'Business intelligence and analytics' },
		{ title: 'Security Solutions', href: '/solutions/security', description: 'Comprehensive security services' }
	]

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold flex items-center gap-2">
					<BuildingIcon className="w-5 h-5" />
					Corporate Website
				</Label>
				<p className="text-sm text-muted-foreground">Professional business navigation with services and company information</p>
			</div>

			<div className="space-y-4">
				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuLink className={navigationMenuTriggerStyle()} href="/">
								<HomeIcon className="w-4 h-4 mr-2" />
								Home
							</NavigationMenuLink>
						</NavigationMenuItem>

						<NavigationMenuItem>
							<NavigationMenuTrigger>About Us</NavigationMenuTrigger>
							<NavigationMenuContent>
								<ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
									<li className="row-span-3">
										<NavigationMenuLink asChild>
											<div className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-green-50 to-green-100 p-6 no-underline outline-none focus:shadow-md">
												<BuildingIcon className="h-8 w-8 text-green-600 mb-2" />
												<div className="mb-2 mt-4 text-lg font-medium">About TechCorp</div>
												<p className="text-sm leading-tight text-muted-foreground">
													Leading technology solutions provider with over 20 years of experience in digital transformation.
												</p>
												<div className="mt-4 flex gap-2">
													<Badge variant="secondary">Est. 2003</Badge>
													<Badge variant="outline">500+ Employees</Badge>
												</div>
											</div>
										</NavigationMenuLink>
									</li>
									{aboutItems.map((item) => (
										<li key={item.title}>
											<NavigationMenuLink asChild>
												<a
													href={item.href}
													className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
												>
													<div className="text-sm font-medium leading-none">{item.title}</div>
													<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{item.description}</p>
												</a>
											</NavigationMenuLink>
										</li>
									))}
								</ul>
							</NavigationMenuContent>
						</NavigationMenuItem>

						<NavigationMenuItem>
							<NavigationMenuTrigger>Services</NavigationMenuTrigger>
							<NavigationMenuContent>
								<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
									{servicesItems.map((service) => (
										<li key={service.title}>
											<NavigationMenuLink asChild>
												<a
													href={service.href}
													className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
												>
													<div className="text-sm font-medium leading-none flex items-center gap-2">
														{service.title}
														<ChevronRightIcon className="w-3 h-3" />
													</div>
													<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{service.description}</p>
												</a>
											</NavigationMenuLink>
										</li>
									))}
								</ul>
							</NavigationMenuContent>
						</NavigationMenuItem>

						<NavigationMenuItem>
							<NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
							<NavigationMenuContent>
								<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
									{solutionsItems.map((solution) => (
										<li key={solution.title}>
											<NavigationMenuLink asChild>
												<a
													href={solution.href}
													className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
												>
													<div className="text-sm font-medium leading-none">{solution.title}</div>
													<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{solution.description}</p>
												</a>
											</NavigationMenuLink>
										</li>
									))}
								</ul>
							</NavigationMenuContent>
						</NavigationMenuItem>

						<NavigationMenuItem>
							<NavigationMenuLink className={navigationMenuTriggerStyle()}>
								<MailIcon className="w-4 h-4 mr-2" />
								Contact
							</NavigationMenuLink>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>

				<div className="p-4 bg-gray-50 rounded-lg">
					<h4 className="text-sm font-semibold text-gray-700 mb-2">Business Navigation Features:</h4>
					<div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
						<div>
							<p><strong>Sections:</strong> About, Services, Solutions</p>
							<p><strong>Content:</strong> Company information and offerings</p>
						</div>
						<div>
							<p><strong>Layout:</strong> Grid-based mega menus</p>
							<p><strong>Branding:</strong> Featured company highlights</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

// Documentation Site Navigation
const DocumentationNavigation = () => {
	const gettingStartedItems = [
		{ title: 'Installation', href: '/docs/installation', description: 'Get up and running in under a minute' },
		{ title: 'Quick Start', href: '/docs/quickstart', description: 'Build your first application' },
		{ title: 'Configuration', href: '/docs/configuration', description: 'Configure your development environment' },
		{ title: 'Deployment', href: '/docs/deployment', description: 'Deploy to production' }
	]

	const componentsItems = [
		{ title: 'Button', href: '/docs/components/button', description: 'Clickable button component' },
		{ title: 'Form', href: '/docs/components/form', description: 'Form inputs and validation' },
		{ title: 'Navigation', href: '/docs/components/navigation', description: 'Site navigation components' },
		{ title: 'Data Display', href: '/docs/components/data', description: 'Tables, lists, and cards' },
		{ title: 'Feedback', href: '/docs/components/feedback', description: 'Alerts, toasts, and notifications' },
		{ title: 'Layout', href: '/docs/components/layout', description: 'Grids, containers, and spacing' }
	]

	const guidesItems = [
		{ title: 'Theming', href: '/docs/guides/theming', description: 'Customize colors and styling' },
		{ title: 'Accessibility', href: '/docs/guides/accessibility', description: 'Building accessible interfaces' },
		{ title: 'Performance', href: '/docs/guides/performance', description: 'Optimization best practices' },
		{ title: 'Testing', href: '/docs/guides/testing', description: 'Testing strategies and tools' }
	]

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold flex items-center gap-2">
					<BookOpenIcon className="w-5 h-5" />
					Documentation Site
				</Label>
				<p className="text-sm text-muted-foreground">Comprehensive documentation navigation with guides and API references</p>
			</div>

			<div className="space-y-4">
				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuLink className={navigationMenuTriggerStyle()} href="/">
								<HomeIcon className="w-4 h-4 mr-2" />
								Home
							</NavigationMenuLink>
						</NavigationMenuItem>

						<NavigationMenuItem>
							<NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
							<NavigationMenuContent>
								<ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
									<li className="row-span-3">
										<NavigationMenuLink asChild>
											<div className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-purple-50 to-purple-100 p-6 no-underline outline-none focus:shadow-md">
												<CodeIcon className="h-8 w-8 text-purple-600 mb-2" />
												<div className="mb-2 mt-4 text-lg font-medium">UI Library</div>
												<p className="text-sm leading-tight text-muted-foreground">
													Modern React component library built with TypeScript and Tailwind CSS.
												</p>
												<div className="mt-4">
													<Badge variant="secondary">v2.0.0</Badge>
												</div>
											</div>
										</NavigationMenuLink>
									</li>
									{gettingStartedItems.map((item) => (
										<li key={item.title}>
											<NavigationMenuLink asChild>
												<a
													href={item.href}
													className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
												>
													<div className="text-sm font-medium leading-none">{item.title}</div>
													<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{item.description}</p>
												</a>
											</NavigationMenuLink>
										</li>
									))}
								</ul>
							</NavigationMenuContent>
						</NavigationMenuItem>

						<NavigationMenuItem>
							<NavigationMenuTrigger>Components</NavigationMenuTrigger>
							<NavigationMenuContent>
								<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
									{componentsItems.map((component) => (
										<li key={component.title}>
											<NavigationMenuLink asChild>
												<a
													href={component.href}
													className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
												>
													<div className="text-sm font-medium leading-none">{component.title}</div>
													<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{component.description}</p>
												</a>
											</NavigationMenuLink>
										</li>
									))}
								</ul>
							</NavigationMenuContent>
						</NavigationMenuItem>

						<NavigationMenuItem>
							<NavigationMenuTrigger>Guides</NavigationMenuTrigger>
							<NavigationMenuContent>
								<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
									{guidesItems.map((guide) => (
										<li key={guide.title}>
											<NavigationMenuLink asChild>
												<a
													href={guide.href}
													className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
												>
													<div className="text-sm font-medium leading-none">{guide.title}</div>
													<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{guide.description}</p>
												</a>
											</NavigationMenuLink>
										</li>
									))}
								</ul>
							</NavigationMenuContent>
						</NavigationMenuItem>

						<NavigationMenuItem>
							<NavigationMenuLink className={navigationMenuTriggerStyle()}>
								<ExternalLinkIcon className="w-4 h-4 mr-2" />
								API Reference
							</NavigationMenuLink>
						</NavigationMenuItem>

						<NavigationMenuItem>
							<NavigationMenuLink className={navigationMenuTriggerStyle()}>
								<MessageSquareIcon className="w-4 h-4 mr-2" />
								Community
							</NavigationMenuLink>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>

				<div className="p-4 bg-gray-50 rounded-lg">
					<h4 className="text-sm font-semibold text-gray-700 mb-2">Documentation Features:</h4>
					<div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
						<div>
							<p><strong>Sections:</strong> Getting Started, Components, Guides</p>
							<p><strong>Organization:</strong> Logical content grouping</p>
						</div>
						<div>
							<p><strong>Links:</strong> Direct access to API and community</p>
							<p><strong>Version:</strong> Clear version information</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

// Basic Navigation Examples
const BasicNavigationExamples = () => {
	const simpleLinks = [
		{ title: 'Home', href: '/' },
		{ title: 'About', href: '/about' },
		{ title: 'Services', href: '/services' },
		{ title: 'Contact', href: '/contact' }
	]

	const dropdownItems = [
		{ title: 'Product Overview', href: '/products', description: 'Learn about our products' },
		{ title: 'Features', href: '/products/features', description: 'Detailed feature breakdown' },
		{ title: 'Pricing', href: '/products/pricing', description: 'Simple, transparent pricing' },
		{ title: 'Enterprise', href: '/products/enterprise', description: 'Solutions for large teams' }
	]

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold">Basic Navigation Examples</Label>
				<p className="text-sm text-muted-foreground">Simple navigation patterns with links and dropdowns</p>
			</div>

			<div className="space-y-8">
				<div>
					<Label className="font-medium mb-3 block">Simple Link Navigation</Label>
					<NavigationMenu>
						<NavigationMenuList>
							{simpleLinks.map((link) => (
								<NavigationMenuItem key={link.title}>
									<NavigationMenuLink className={navigationMenuTriggerStyle()} href={link.href}>
										{link.title}
									</NavigationMenuLink>
								</NavigationMenuItem>
							))}
						</NavigationMenuList>
					</NavigationMenu>
				</div>

				<div>
					<Label className="font-medium mb-3 block">With Dropdown Menu</Label>
					<NavigationMenu>
						<NavigationMenuList>
							<NavigationMenuItem>
								<NavigationMenuLink className={navigationMenuTriggerStyle()}>
									Home
								</NavigationMenuLink>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<NavigationMenuTrigger>Products</NavigationMenuTrigger>
								<NavigationMenuContent>
									<ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px]">
										{dropdownItems.map((item) => (
											<li key={item.title}>
												<NavigationMenuLink asChild>
													<a
														href={item.href}
														className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
													>
														<div className="text-sm font-medium leading-none">{item.title}</div>
														<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{item.description}</p>
													</a>
												</NavigationMenuLink>
											</li>
										))}
									</ul>
								</NavigationMenuContent>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<NavigationMenuLink className={navigationMenuTriggerStyle()}>
									About
								</NavigationMenuLink>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<NavigationMenuLink className={navigationMenuTriggerStyle()}>
									Contact
								</NavigationMenuLink>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>
				</div>

				<div>
					<Label className="font-medium mb-3 block">With Icons</Label>
					<NavigationMenu>
						<NavigationMenuList>
							<NavigationMenuItem>
								<NavigationMenuLink className={navigationMenuTriggerStyle()}>
									<HomeIcon className="w-4 h-4 mr-2" />
									Home
								</NavigationMenuLink>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<NavigationMenuLink className={navigationMenuTriggerStyle()}>
									<InfoIcon className="w-4 h-4 mr-2" />
									About
								</NavigationMenuLink>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<NavigationMenuLink className={navigationMenuTriggerStyle()}>
									<MailIcon className="w-4 h-4 mr-2" />
									Contact
								</NavigationMenuLink>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>
				</div>
			</div>
		</div>
	)
}

export default function NavigationMenuSample() {
	const [showAdvanced, setShowAdvanced] = useState(false)

	return (
		<Fragment>
			<ComponentDoc
				title="Navigation Menu"
				description="Responsive navigation menus with dropdown content for organizing site structure. Perfect for websites, applications, and documentation sites requiring structured navigation."
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
							<h3 className="text-lg font-semibold mb-4">Website Navigation</h3>
							<div className="grid grid-cols-1 gap-8">
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<ShoppingCartIcon className="w-5 h-5" />
											E-commerce Site
										</CardTitle>
										<CardDescription>Product categorization with mega menu navigation for online stores</CardDescription>
									</CardHeader>
									<CardContent>
										<EcommerceNavigation />
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<BuildingIcon className="w-5 h-5" />
											Corporate Website
										</CardTitle>
										<CardDescription>Professional business navigation with services and company information</CardDescription>
									</CardHeader>
									<CardContent>
										<CorporateNavigation />
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<BookOpenIcon className="w-5 h-5" />
											Documentation Site
										</CardTitle>
										<CardDescription>Technical documentation with organized guides and API references</CardDescription>
									</CardHeader>
									<CardContent>
										<DocumentationNavigation />
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
											<MenuIcon className="w-5 h-5" />
											Simple Navigation
										</CardTitle>
										<CardDescription>Basic navigation patterns with links and dropdowns</CardDescription>
									</CardHeader>
									<CardContent>
										<BasicNavigationExamples />
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
								<CardDescription>Best practices for implementing navigation menus</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div>
										<h4 className="font-semibold mb-2">When to Use</h4>
										<ul className="space-y-1 text-sm text-muted-foreground">
											<li>• For main site navigation with multiple sections</li>
											<li>• When organizing content into logical categories</li>
											<li>• For e-commerce sites with product categorization</li>
											<li>• In documentation sites with multiple guides</li>
											<li>• For corporate websites with service offerings</li>
										</ul>
									</div>
									<div className="border-t pt-4">
										<h4 className="font-semibold mb-2">Design Principles</h4>
										<ul className="space-y-1 text-sm text-muted-foreground">
											<li>• Keep navigation hierarchy logical and intuitive</li>
											<li>• Use consistent labeling and terminology</li>
											<li>• Provide clear visual feedback for active states</li>
											<li>• Consider mobile responsiveness and touch targets</li>
											<li>• Include breadcrumbs for deep navigation structures</li>
											<li>• Test navigation paths with real users</li>
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
										<strong>Navigation Types:</strong> E-commerce, Corporate, Documentation{showAdvanced ? ', Basic' : ''}
									</p>
									<p>
										<strong>Features:</strong> Mega Menus, Dropdowns, Icons, Grid Layouts
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
