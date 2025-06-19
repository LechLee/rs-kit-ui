import { Fragment, useState } from 'react'
import { Badge, Button } from '@rs-kit/ui-kit'
import { 
	AlertCircleIcon, 
	ArrowRightIcon, 
	CheckIcon, 
	StarIcon,
	TrendingUpIcon,
	TrendingDownIcon,
	ClockIcon,
	UsersIcon,
	TagIcon,
	GiftIcon,
	ShieldIcon,
	CrownIcon,
	ZapIcon,
	HeartIcon,
	MessageCircleIcon,
	BellIcon,
	XIcon
} from 'lucide-react'
import { ComponentDoc } from '@/components/ComponentDoc'

export default function BadgeSample() {
	// State for interactive examples
	const [notificationCount, setNotificationCount] = useState(5)
	const [cartItems, setCartItems] = useState(3)
	const [messages, setMessages] = useState(12)
	const [taskStatus, setTaskStatus] = useState<'pending' | 'in-progress' | 'completed'>('pending')
	const [userLevel, setUserLevel] = useState<'bronze' | 'silver' | 'gold'>('silver')

	// Interactive handlers
	const addNotification = () => setNotificationCount(prev => prev + 1)
	const clearNotifications = () => setNotificationCount(0)
	const addToCart = () => setCartItems(prev => prev + 1)
	const clearCart = () => setCartItems(0)
	const cycleTaskStatus = () => {
		setTaskStatus(prev => {
			if (prev === 'pending') return 'in-progress'
			if (prev === 'in-progress') return 'completed'
			return 'pending'
		})
	}
	const cycleUserLevel = () => {
		setUserLevel(prev => {
			if (prev === 'bronze') return 'silver'
			if (prev === 'silver') return 'gold'
			return 'bronze'
		})
	}

	return (
		<Fragment>
			<ComponentDoc
				title="Badge"
				description="Small count and labeling component for status indicators, notifications, categories, and metadata display."
				component={
					<div className="flex flex-col gap-8 w-full max-w-4xl">
						{/* Basic Badge Variants */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Badge Variants</h3>
							<div className="flex flex-wrap items-center gap-3">
								<Badge>Default</Badge>
								<Badge variant="secondary">Secondary</Badge>
								<Badge variant="destructive">Destructive</Badge>
								<Badge variant="outline">Outline</Badge>
							</div>
						</div>

						{/* Badges with Icons */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Badges with Icons</h3>
							<div className="space-y-4">
								<div>
									<h4 className="text-sm font-medium text-gray-600 mb-2">Icon + Text</h4>
									<div className="flex flex-wrap items-center gap-3">
										<Badge>
											<CheckIcon className="w-3 h-3 mr-1" />
											Verified
										</Badge>
										<Badge variant="secondary">
											<StarIcon className="w-3 h-3 mr-1" />
											Featured
										</Badge>
										<Badge variant="destructive">
											<AlertCircleIcon className="w-3 h-3 mr-1" />
											Error
										</Badge>
										<Badge variant="outline">
											<ClockIcon className="w-3 h-3 mr-1" />
											Pending
										</Badge>
									</div>
								</div>

								<div>
									<h4 className="text-sm font-medium text-gray-600 mb-2">Text + Icon</h4>
									<div className="flex flex-wrap items-center gap-3">
										<Badge>
											New
											<ZapIcon className="w-3 h-3 ml-1" />
										</Badge>
										<Badge variant="secondary">
											Premium
											<CrownIcon className="w-3 h-3 ml-1" />
										</Badge>
										<Badge variant="outline">
											Trending
											<TrendingUpIcon className="w-3 h-3 ml-1" />
										</Badge>
									</div>
								</div>

								<div>
									<h4 className="text-sm font-medium text-gray-600 mb-2">Icon Only</h4>
									<div className="flex flex-wrap items-center gap-3">
										<Badge className="w-8 h-8 rounded-full p-0 flex items-center justify-center">
											<CheckIcon className="w-4 h-4" />
										</Badge>
										<Badge variant="destructive" className="w-8 h-8 rounded-full p-0 flex items-center justify-center">
											<XIcon className="w-4 h-4" />
										</Badge>
										<Badge variant="secondary" className="w-8 h-8 rounded-full p-0 flex items-center justify-center">
											<StarIcon className="w-4 h-4" />
										</Badge>
									</div>
								</div>
							</div>
						</div>

						{/* Status Badges */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Status Badges</h3>
							<div className="space-y-4">
								<div>
									<h4 className="text-sm font-medium text-gray-600 mb-2">Task Status</h4>
									<div className="flex flex-wrap items-center gap-3 mb-3">
										<Badge variant="outline" className="border-amber-300 text-amber-700 bg-amber-50">
											<ClockIcon className="w-3 h-3 mr-1" />
											Pending
										</Badge>
										<Badge className="bg-blue-600 hover:bg-blue-700">
											<ZapIcon className="w-3 h-3 mr-1" />
											In Progress
										</Badge>
										<Badge className="bg-green-600 hover:bg-green-700">
											<CheckIcon className="w-3 h-3 mr-1" />
											Completed
										</Badge>
									</div>
									<Button size="sm" onClick={cycleTaskStatus}>
										Current: {taskStatus.replace('-', ' ')} (Click to cycle)
									</Button>
								</div>

								<div>
									<h4 className="text-sm font-medium text-gray-600 mb-2">Priority Levels</h4>
									<div className="flex flex-wrap items-center gap-3">
										<Badge variant="outline" className="border-gray-300 text-gray-600">
											Low Priority
										</Badge>
										<Badge className="bg-amber-500 hover:bg-amber-600">
											Medium Priority
										</Badge>
										<Badge variant="destructive">
											High Priority
										</Badge>
										<Badge className="bg-purple-600 hover:bg-purple-700">
											Critical
										</Badge>
									</div>
								</div>

								<div>
									<h4 className="text-sm font-medium text-gray-600 mb-2">System Status</h4>
									<div className="flex flex-wrap items-center gap-3">
										<Badge className="bg-green-600 hover:bg-green-700">
											<div className="w-2 h-2 bg-green-200 rounded-full mr-2"></div>
											Online
										</Badge>
										<Badge variant="destructive">
											<div className="w-2 h-2 bg-red-200 rounded-full mr-2"></div>
											Offline
										</Badge>
										<Badge className="bg-amber-500 hover:bg-amber-600">
											<div className="w-2 h-2 bg-amber-200 rounded-full mr-2"></div>
											Maintenance
										</Badge>
									</div>
								</div>
							</div>
						</div>

						{/* Count Badges */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Count & Notification Badges</h3>
							<div className="space-y-4">
								<div className="flex flex-wrap items-center gap-4">
									<div className="relative">
										<Button variant="outline">
											<BellIcon className="w-4 h-4" />
											Notifications
										</Button>
										{notificationCount > 0 && (
											<Badge className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs">
												{notificationCount > 99 ? '99+' : notificationCount}
											</Badge>
										)}
									</div>

									<div className="relative">
										<Button variant="outline">
											<TagIcon className="w-4 h-4" />
											Cart
										</Button>
										{cartItems > 0 && (
											<Badge variant="destructive" className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs">
												{cartItems}
											</Badge>
										)}
									</div>

									<div className="relative">
										<Button variant="outline">
											<MessageCircleIcon className="w-4 h-4" />
											Messages
										</Button>
										{messages > 0 && (
											<Badge className="absolute -top-2 -right-2 min-w-[24px] h-6 rounded-full px-2 flex items-center justify-center text-xs">
												{messages}
											</Badge>
										)}
									</div>
								</div>

								<div className="flex gap-2">
									<Button size="sm" onClick={addNotification}>Add Notification</Button>
									<Button size="sm" onClick={clearNotifications}>Clear Notifications</Button>
									<Button size="sm" onClick={addToCart}>Add to Cart</Button>
									<Button size="sm" onClick={clearCart}>Clear Cart</Button>
								</div>
							</div>
						</div>

						{/* Category & Tag Badges */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Category & Tag Badges</h3>
							<div className="space-y-4">
								<div>
									<h4 className="text-sm font-medium text-gray-600 mb-2">Article Categories</h4>
									<div className="flex flex-wrap items-center gap-2">
										<Badge variant="outline" className="border-blue-300 text-blue-700 bg-blue-50">
											Technology
										</Badge>
										<Badge variant="outline" className="border-green-300 text-green-700 bg-green-50">
											Design
										</Badge>
										<Badge variant="outline" className="border-purple-300 text-purple-700 bg-purple-50">
											Business
										</Badge>
										<Badge variant="outline" className="border-orange-300 text-orange-700 bg-orange-50">
											Marketing
										</Badge>
										<Badge variant="outline" className="border-pink-300 text-pink-700 bg-pink-50">
											Lifestyle
										</Badge>
									</div>
								</div>

								<div>
									<h4 className="text-sm font-medium text-gray-600 mb-2">Skill Tags</h4>
									<div className="flex flex-wrap items-center gap-2">
										<Badge variant="secondary">React</Badge>
										<Badge variant="secondary">TypeScript</Badge>
										<Badge variant="secondary">Node.js</Badge>
										<Badge variant="secondary">Python</Badge>
										<Badge variant="secondary">AWS</Badge>
										<Badge variant="secondary">Docker</Badge>
									</div>
								</div>

								<div>
									<h4 className="text-sm font-medium text-gray-600 mb-2">Product Features</h4>
									<div className="flex flex-wrap items-center gap-2">
										<Badge>
											<GiftIcon className="w-3 h-3 mr-1" />
											Free
										</Badge>
										<Badge className="bg-amber-500 hover:bg-amber-600">
											<CrownIcon className="w-3 h-3 mr-1" />
											Premium
										</Badge>
										<Badge className="bg-purple-600 hover:bg-purple-700">
											<ZapIcon className="w-3 h-3 mr-1" />
											Pro
										</Badge>
										<Badge variant="destructive">
											<HeartIcon className="w-3 h-3 mr-1" />
											Popular
										</Badge>
									</div>
								</div>
							</div>
						</div>

						{/* User Level Badges */}
						<div>
							<h3 className="text-lg font-semibold mb-4">User Level & Achievement Badges</h3>
							<div className="space-y-4">
								<div className="flex items-center gap-4">
									<div className="flex items-center gap-2">
										<span className="text-sm font-medium">Current Level:</span>
										{userLevel === 'bronze' && (
											<Badge className="bg-amber-600 hover:bg-amber-700">
												<CrownIcon className="w-3 h-3 mr-1" />
												Bronze Member
											</Badge>
										)}
										{userLevel === 'silver' && (
											<Badge className="bg-gray-500 hover:bg-gray-600">
												<CrownIcon className="w-3 h-3 mr-1" />
												Silver Member
											</Badge>
										)}
										{userLevel === 'gold' && (
											<Badge className="bg-yellow-500 hover:bg-yellow-600 text-yellow-900">
												<CrownIcon className="w-3 h-3 mr-1" />
												Gold Member
											</Badge>
										)}
									</div>
									<Button size="sm" onClick={cycleUserLevel}>
										Level Up
									</Button>
								</div>

								<div>
									<h4 className="text-sm font-medium text-gray-600 mb-2">Achievement Badges</h4>
									<div className="flex flex-wrap items-center gap-2">
										<Badge className="bg-blue-600 hover:bg-blue-700">
											<StarIcon className="w-3 h-3 mr-1" />
											First Post
										</Badge>
										<Badge className="bg-green-600 hover:bg-green-700">
											<UsersIcon className="w-3 h-3 mr-1" />
											Team Player
										</Badge>
										<Badge className="bg-purple-600 hover:bg-purple-700">
											<TrendingUpIcon className="w-3 h-3 mr-1" />
											Rising Star
										</Badge>
										<Badge className="bg-orange-500 hover:bg-orange-600">
											<ShieldIcon className="w-3 h-3 mr-1" />
											Guardian
										</Badge>
									</div>
								</div>
							</div>
						</div>

						{/* Size Variations */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Size Variations</h3>
							<div className="space-y-4">
								<div>
									<h4 className="text-sm font-medium text-gray-600 mb-2">Different Sizes</h4>
									<div className="flex flex-wrap items-center gap-3">
										<Badge className="text-xs px-2 py-1">Small</Badge>
										<Badge>Default</Badge>
										<Badge className="text-sm px-3 py-1.5">Medium</Badge>
										<Badge className="text-base px-4 py-2">Large</Badge>
									</div>
								</div>

								<div>
									<h4 className="text-sm font-medium text-gray-600 mb-2">Count Badges</h4>
									<div className="flex flex-wrap items-center gap-3">
										<Badge className="w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs font-mono">1</Badge>
										<Badge className="w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs font-mono">12</Badge>
										<Badge className="w-7 h-7 rounded-full p-0 flex items-center justify-center text-xs font-mono">99</Badge>
										<Badge className="min-w-[28px] h-7 rounded-full px-2 flex items-center justify-center text-xs font-mono">999+</Badge>
									</div>
								</div>
							</div>
						</div>

						{/* Interactive Badge Links */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Interactive Badge Links</h3>
							<div className="space-y-4">
								<div>
									<h4 className="text-sm font-medium text-gray-600 mb-2">As Links</h4>
									<div className="flex flex-wrap items-center gap-3">
										<Badge asChild>
											<a href="#" className="cursor-pointer hover:underline">
												View Profile
												<ArrowRightIcon className="w-3 h-3 ml-1" />
											</a>
										</Badge>
										<Badge asChild variant="secondary">
											<a href="#" className="cursor-pointer hover:underline">
												Documentation
												<ArrowRightIcon className="w-3 h-3 ml-1" />
											</a>
										</Badge>
										<Badge asChild variant="outline">
											<a href="#" className="cursor-pointer hover:underline">
												Learn More
												<ArrowRightIcon className="w-3 h-3 ml-1" />
											</a>
										</Badge>
									</div>
								</div>

								<div>
									<h4 className="text-sm font-medium text-gray-600 mb-2">As Buttons</h4>
									<div className="flex flex-wrap items-center gap-3">
										<Badge asChild>
											<button className="cursor-pointer hover:opacity-80">
												<TagIcon className="w-3 h-3 mr-1" />
												Add Tag
											</button>
										</Badge>
										<Badge asChild variant="destructive">
											<button className="cursor-pointer hover:opacity-80">
												<XIcon className="w-3 h-3 mr-1" />
												Remove
											</button>
										</Badge>
									</div>
								</div>
							</div>
						</div>

						{/* Current State Display */}
						<div className="mt-6 p-4 bg-gray-50 rounded-lg">
							<h4 className="text-sm font-semibold text-gray-700 mb-2">Interactive State:</h4>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
								<div>
									<p><strong>Notifications:</strong> {notificationCount}</p>
									<p><strong>Cart Items:</strong> {cartItems}</p>
									<p><strong>Messages:</strong> {messages}</p>
								</div>
								<div>
									<p><strong>Task Status:</strong> {taskStatus.replace('-', ' ')}</p>
									<p><strong>User Level:</strong> {userLevel}</p>
								</div>
							</div>
						</div>
					</div>
				}
			/>

			<ComponentDoc
				title="Badge Props & Usage Guidelines"
				description="Comprehensive guide to Badge component variants, styling, and best practices."
				component={
					<div className="flex flex-col gap-6 w-full max-w-4xl">
						{/* Props Reference */}
						<div className="p-4 bg-blue-50 rounded-lg">
							<h4 className="text-sm font-semibold text-blue-700 mb-2">Props Reference:</h4>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-600">
								<div>
									<strong>Badge Props:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li><code>variant</code> - "default" | "secondary" | "destructive" | "outline"</li>
										<li><code>className</code> - Additional CSS classes</li>
										<li><code>asChild</code> - Render as child element</li>
										<li><code>children</code> - Badge content</li>
									</ul>
								</div>
								<div>
									<strong>Common Patterns:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li>Status indicators</li>
										<li>Notification counts</li>
										<li>Category tags</li>
										<li>User levels</li>
										<li>Interactive links</li>
									</ul>
								</div>
								<div>
									<strong>Accessibility:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li>Screen reader friendly</li>
										<li>Keyboard navigable when interactive</li>
										<li>Proper color contrast</li>
										<li>Semantic HTML structure</li>
									</ul>
								</div>
								<div>
									<strong>Styling:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li>Custom colors via className</li>
										<li>Size variations with padding/text classes</li>
										<li>Icon integration</li>
										<li>Rounded variants</li>
									</ul>
								</div>
							</div>
						</div>

						{/* Usage Guidelines */}
						<div className="p-4 bg-green-50 rounded-lg">
							<h4 className="text-sm font-semibold text-green-700 mb-2">Usage Guidelines:</h4>
							<ul className="text-sm text-green-600 space-y-1 list-disc list-inside">
								<li><strong>Status Indicators:</strong> Use consistent colors - green for success, red for errors, blue for info</li>
								<li><strong>Notification Counts:</strong> Show numbers up to 99, then use "99+" for larger counts</li>
								<li><strong>Category Tags:</strong> Use outline variant with custom colors for better categorization</li>
								<li><strong>Content Length:</strong> Keep text concise - ideally 1-3 words</li>
								<li><strong>Icon Usage:</strong> Use small icons (12-16px) and maintain consistent spacing</li>
								<li><strong>Interactive Badges:</strong> Provide clear visual feedback for clickable badges</li>
								<li><strong>Color Coding:</strong> Establish consistent color meanings across your application</li>
								<li><strong>Positioning:</strong> Place notification badges in top-right corners of parent elements</li>
							</ul>
						</div>

						{/* Code Examples */}
						<div className="p-4 bg-gray-100 rounded-lg">
							<h4 className="text-sm font-semibold text-gray-700 mb-2">Code Examples:</h4>
							<pre className="text-xs text-gray-600 overflow-x-auto whitespace-pre-wrap">
{`// Basic badge
<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Error</Badge>
<Badge variant="outline">Outline</Badge>

// Badge with icon
<Badge>
  <CheckIcon className="w-3 h-3 mr-1" />
  Verified
</Badge>

// Custom colored badge
<Badge className="bg-blue-600 hover:bg-blue-700">
  Custom Color
</Badge>

// Notification count badge
<div className="relative">
  <Button>Messages</Button>
  <Badge className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs">
    {count}
  </Badge>
</div>

// Interactive badge link
<Badge asChild>
  <a href="/profile">
    View Profile
    <ArrowRightIcon className="w-3 h-3 ml-1" />
  </a>
</Badge>

// Size variations
<Badge className="text-xs px-2 py-1">Small</Badge>
<Badge>Default</Badge>
<Badge className="text-sm px-3 py-1.5">Large</Badge>

// Rounded count badge
<Badge className="w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs">
  12
</Badge>`}
							</pre>
						</div>

						{/* Design Guidelines */}
						<div className="p-4 bg-purple-50 rounded-lg">
							<h4 className="text-sm font-semibold text-purple-700 mb-2">Design Guidelines:</h4>
							<ul className="text-sm text-purple-600 space-y-1 list-disc list-inside">
								<li><strong>Visual Hierarchy:</strong> Use badges sparingly to maintain their impact and importance</li>
								<li><strong>Color System:</strong> Establish a consistent color palette for different badge types</li>
								<li><strong>Typography:</strong> Use legible font sizes and weights appropriate for the badge size</li>
								<li><strong>Spacing:</strong> Maintain adequate white space around badges for clarity</li>
								<li><strong>Grouping:</strong> When using multiple badges, group related ones together</li>
								<li><strong>Animation:</strong> Consider subtle hover effects for interactive badges</li>
								<li><strong>Responsive Design:</strong> Ensure badges remain readable on smaller screens</li>
								<li><strong>Context:</strong> Place badges near relevant content to provide clear context</li>
							</ul>
						</div>
					</div>
				}
			/>
		</Fragment>
	)
}