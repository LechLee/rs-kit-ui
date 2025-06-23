import { Fragment, useState } from 'react'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
	Label,
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Badge,
	Separator,
	Switch,
	Alert,
	AlertDescription,
	Input,
	Avatar,
	AvatarFallback,
	AvatarImage
} from '@rs-kit/ui-kit'
import {
	GlobeIcon,
	MapPinIcon,
	CalendarIcon,
	ClockIcon,
	UserIcon,
	SettingsIcon,
	PaletteIcon,
	MonitorIcon,
	SmartphoneIcon,
	LaptopIcon,
	CreditCardIcon,
	BuildingIcon,
	StarIcon,
	FlagIcon,
	TruckIcon,
	ShieldIcon,
	ZapIcon,
	ChevronDownIcon,
	CheckIcon,
	InfoIcon,
	SearchIcon,
	FilterIcon,
	SortAscIcon,
	UsersIcon,
	BookmarkIcon,
	TagIcon,
	FolderIcon,
	FileIcon
} from 'lucide-react'
import { ComponentDoc } from '@/components/ComponentDoc'

// Location and Time Selector
const LocationTimeSelector = () => {
	const [country, setCountry] = useState('us')
	const [timezone, setTimezone] = useState('america/new_york')
	const [language, setLanguage] = useState('en')

	const countries = [
		{ code: 'us', name: 'United States', flag: '🇺🇸' },
		{ code: 'uk', name: 'United Kingdom', flag: '🇬🇧' },
		{ code: 'ca', name: 'Canada', flag: '🇨🇦' },
		{ code: 'de', name: 'Germany', flag: '🇩🇪' },
		{ code: 'fr', name: 'France', flag: '🇫🇷' },
		{ code: 'jp', name: 'Japan', flag: '🇯🇵' },
		{ code: 'au', name: 'Australia', flag: '🇦🇺' },
		{ code: 'br', name: 'Brazil', flag: '🇧🇷' }
	]

	const timezones = {
		us: [
			{ value: 'america/new_york', label: 'Eastern Time (EST/EDT)', offset: 'UTC-5/-4' },
			{ value: 'america/chicago', label: 'Central Time (CST/CDT)', offset: 'UTC-6/-5' },
			{ value: 'america/denver', label: 'Mountain Time (MST/MDT)', offset: 'UTC-7/-6' },
			{ value: 'america/los_angeles', label: 'Pacific Time (PST/PDT)', offset: 'UTC-8/-7' }
		],
		uk: [
			{ value: 'europe/london', label: 'Greenwich Mean Time (GMT)', offset: 'UTC+0/+1' }
		],
		default: [
			{ value: 'utc', label: 'Coordinated Universal Time (UTC)', offset: 'UTC+0' }
		]
	}

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold">Location & Time Settings</Label>
				<p className="text-sm text-muted-foreground">Configure your location and timezone preferences</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="space-y-3">
					<Label htmlFor="country-select" className="flex items-center gap-2">
						<GlobeIcon className="w-4 h-4" />
						Country
					</Label>
					<Select value={country} onValueChange={setCountry}>
						<SelectTrigger id="country-select">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Select Country</SelectLabel>
								{countries.map((country) => (
									<SelectItem key={country.code} value={country.code}>
										<div className="flex items-center gap-2">
											<span>{country.flag}</span>
											<span>{country.name}</span>
										</div>
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>

				<div className="space-y-3">
					<Label htmlFor="timezone-select" className="flex items-center gap-2">
						<ClockIcon className="w-4 h-4" />
						Timezone
					</Label>
					<Select value={timezone} onValueChange={setTimezone}>
						<SelectTrigger id="timezone-select">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Available Timezones</SelectLabel>
								{(timezones[country as keyof typeof timezones] || timezones.default).map((tz) => (
									<SelectItem key={tz.value} value={tz.value}>
										<div className="flex flex-col">
											<span>{tz.label}</span>
											<span className="text-xs text-muted-foreground">{tz.offset}</span>
										</div>
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
			</div>

			<div className="space-y-3">
				<Label htmlFor="language-select" className="flex items-center gap-2">
					<GlobeIcon className="w-4 h-4" />
					Language
				</Label>
				<Select value={language} onValueChange={setLanguage}>
					<SelectTrigger id="language-select" className="w-full">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Popular Languages</SelectLabel>
							<SelectItem value="en">English</SelectItem>
							<SelectItem value="es">Español</SelectItem>
							<SelectItem value="fr">Français</SelectItem>
							<SelectItem value="de">Deutsch</SelectItem>
						</SelectGroup>
						<SelectGroup>
							<SelectLabel>Other Languages</SelectLabel>
							<SelectItem value="zh">中文</SelectItem>
							<SelectItem value="ja">日本語</SelectItem>
							<SelectItem value="ko">한국어</SelectItem>
							<SelectItem value="pt">Português</SelectItem>
							<SelectItem value="ru">Русский</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>

			<Alert>
				<InfoIcon className="h-4 w-4" />
				<AlertDescription>
					Current selection: {countries.find(c => c.code === country)?.name}, {(timezones[country as keyof typeof timezones] || timezones.default).find(tz => tz.value === timezone)?.label}
				</AlertDescription>
			</Alert>
		</div>
	)
}

// Team Member Assignment
const TeamMemberAssignment = () => {
	const [assignee, setAssignee] = useState('')
	const [priority, setPriority] = useState('medium')
	const [department, setDepartment] = useState('')
	const [status, setStatus] = useState('active')

	const teamMembers = [
		{ id: '1', name: 'Alice Johnson', role: 'Frontend Developer', avatar: '/avatars/alice.jpg', department: 'engineering' },
		{ id: '2', name: 'Bob Smith', role: 'Backend Developer', avatar: '/avatars/bob.jpg', department: 'engineering' },
		{ id: '3', name: 'Carol Williams', role: 'UI/UX Designer', avatar: '/avatars/carol.jpg', department: 'design' },
		{ id: '4', name: 'David Brown', role: 'Product Manager', avatar: '/avatars/david.jpg', department: 'product' },
		{ id: '5', name: 'Eva Davis', role: 'DevOps Engineer', avatar: '/avatars/eva.jpg', department: 'engineering' },
		{ id: '6', name: 'Frank Miller', role: 'QA Engineer', avatar: '/avatars/frank.jpg', department: 'engineering' }
	]

	const departments = [
		{ value: 'engineering', label: 'Engineering', icon: '⚙️', count: 4 },
		{ value: 'design', label: 'Design', icon: '🎨', count: 1 },
		{ value: 'product', label: 'Product', icon: '📊', count: 1 },
		{ value: 'marketing', label: 'Marketing', icon: '📢', count: 0 },
		{ value: 'sales', label: 'Sales', icon: '💼', count: 0 }
	]

	const filteredMembers = department ? teamMembers.filter(member => member.department === department) : teamMembers

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold">Project Assignment</Label>
				<p className="text-sm text-muted-foreground">Assign team members and set project parameters</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="space-y-3">
					<Label htmlFor="department-select" className="flex items-center gap-2">
						<BuildingIcon className="w-4 h-4" />
						Department Filter
					</Label>
					<Select value={department} onValueChange={setDepartment}>
						<SelectTrigger id="department-select">
							<SelectValue placeholder="All departments" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="">All Departments</SelectItem>
							{departments.map((dept) => (
								<SelectItem key={dept.value} value={dept.value}>
									<div className="flex items-center justify-between w-full">
										<div className="flex items-center gap-2">
											<span>{dept.icon}</span>
											<span>{dept.label}</span>
										</div>
										<Badge variant="secondary" className="text-xs">{dept.count}</Badge>
									</div>
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				<div className="space-y-3">
					<Label htmlFor="assignee-select" className="flex items-center gap-2">
						<UserIcon className="w-4 h-4" />
						Assign to
					</Label>
					<Select value={assignee} onValueChange={setAssignee}>
						<SelectTrigger id="assignee-select">
							<SelectValue placeholder="Select team member" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Available Team Members ({filteredMembers.length})</SelectLabel>
								{filteredMembers.map((member) => (
									<SelectItem key={member.id} value={member.id}>
										<div className="flex items-center gap-3">
											<Avatar className="h-6 w-6">
												<AvatarImage src={member.avatar} alt={member.name} />
												<AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
											</Avatar>
											<div>
												<div className="font-medium">{member.name}</div>
												<div className="text-xs text-muted-foreground">{member.role}</div>
											</div>
										</div>
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="space-y-3">
					<Label htmlFor="priority-select" className="flex items-center gap-2">
						<FlagIcon className="w-4 h-4" />
						Priority Level
					</Label>
					<Select value={priority} onValueChange={setPriority}>
						<SelectTrigger id="priority-select">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Priority Levels</SelectLabel>
								<SelectItem value="low">
									<div className="flex items-center gap-2">
										<div className="w-2 h-2 bg-green-500 rounded-full"></div>
										<span>Low Priority</span>
									</div>
								</SelectItem>
								<SelectItem value="medium">
									<div className="flex items-center gap-2">
										<div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
										<span>Medium Priority</span>
									</div>
								</SelectItem>
								<SelectItem value="high">
									<div className="flex items-center gap-2">
										<div className="w-2 h-2 bg-red-500 rounded-full"></div>
										<span>High Priority</span>
									</div>
								</SelectItem>
								<SelectItem value="urgent">
									<div className="flex items-center gap-2">
										<div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
										<span>Urgent</span>
									</div>
								</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>

				<div className="space-y-3">
					<Label htmlFor="status-select" className="flex items-center gap-2">
						<SettingsIcon className="w-4 h-4" />
						Project Status
					</Label>
					<Select value={status} onValueChange={setStatus}>
						<SelectTrigger id="status-select">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Status Options</SelectLabel>
								<SelectItem value="planning">📋 Planning</SelectItem>
								<SelectItem value="active">🚀 Active</SelectItem>
								<SelectItem value="review">👀 In Review</SelectItem>
								<SelectItem value="completed">✅ Completed</SelectItem>
								<SelectItem value="paused">⏸️ Paused</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
			</div>

			{assignee && (
				<Alert>
					<CheckIcon className="h-4 w-4" />
					<AlertDescription>
						Assigned to: <strong>{teamMembers.find(m => m.id === assignee)?.name}</strong> with <strong>{priority}</strong> priority
					</AlertDescription>
				</Alert>
			)}
		</div>
	)
}

// E-commerce Product Filter
const ProductFilterSelector = () => {
	const [category, setCategory] = useState('')
	const [brand, setBrand] = useState('')
	const [priceRange, setPriceRange] = useState('')
	const [rating, setRating] = useState('')
	const [sortBy, setSortBy] = useState('popularity')

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold">Product Filters</Label>
				<p className="text-sm text-muted-foreground">Refine your search to find the perfect product</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div className="space-y-3">
					<Label htmlFor="category-select" className="flex items-center gap-2">
						<TagIcon className="w-4 h-4" />
						Category
					</Label>
					<Select value={category} onValueChange={setCategory}>
						<SelectTrigger id="category-select">
							<SelectValue placeholder="All categories" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="">All Categories</SelectItem>
							<SelectGroup>
								<SelectLabel>Electronics</SelectLabel>
								<SelectItem value="laptops">💻 Laptops</SelectItem>
								<SelectItem value="phones">📱 Smartphones</SelectItem>
								<SelectItem value="tablets">📊 Tablets</SelectItem>
								<SelectItem value="accessories">🎧 Accessories</SelectItem>
							</SelectGroup>
							<SelectGroup>
								<SelectLabel>Fashion</SelectLabel>
								<SelectItem value="clothing">👕 Clothing</SelectItem>
								<SelectItem value="shoes">👟 Shoes</SelectItem>
								<SelectItem value="bags">👜 Bags</SelectItem>
							</SelectGroup>
							<SelectGroup>
								<SelectLabel>Home & Garden</SelectLabel>
								<SelectItem value="furniture">🪑 Furniture</SelectItem>
								<SelectItem value="decor">🖼️ Decor</SelectItem>
								<SelectItem value="kitchen">🍳 Kitchen</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>

				<div className="space-y-3">
					<Label htmlFor="brand-select" className="flex items-center gap-2">
						<StarIcon className="w-4 h-4" />
						Brand
					</Label>
					<Select value={brand} onValueChange={setBrand}>
						<SelectTrigger id="brand-select">
							<SelectValue placeholder="All brands" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="">All Brands</SelectItem>
							<SelectGroup>
								<SelectLabel>Popular Brands</SelectLabel>
								<SelectItem value="apple">🍎 Apple</SelectItem>
								<SelectItem value="samsung">📱 Samsung</SelectItem>
								<SelectItem value="sony">🎵 Sony</SelectItem>
								<SelectItem value="nike">👟 Nike</SelectItem>
								<SelectItem value="adidas">⚡ Adidas</SelectItem>
							</SelectGroup>
							<SelectGroup>
								<SelectLabel>Other Brands</SelectLabel>
								<SelectItem value="hp">💻 HP</SelectItem>
								<SelectItem value="dell">🖥️ Dell</SelectItem>
								<SelectItem value="lenovo">⌨️ Lenovo</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>

				<div className="space-y-3">
					<Label htmlFor="price-select" className="flex items-center gap-2">
						<CreditCardIcon className="w-4 h-4" />
						Price Range
					</Label>
					<Select value={priceRange} onValueChange={setPriceRange}>
						<SelectTrigger id="price-select">
							<SelectValue placeholder="Any price" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="">Any Price</SelectItem>
							<SelectItem value="0-25">Under $25</SelectItem>
							<SelectItem value="25-50">$25 - $50</SelectItem>
							<SelectItem value="50-100">$50 - $100</SelectItem>
							<SelectItem value="100-250">$100 - $250</SelectItem>
							<SelectItem value="250-500">$250 - $500</SelectItem>
							<SelectItem value="500+">$500+</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="space-y-3">
					<Label htmlFor="rating-select" className="flex items-center gap-2">
						<StarIcon className="w-4 h-4" />
						Customer Rating
					</Label>
					<Select value={rating} onValueChange={setRating}>
						<SelectTrigger id="rating-select">
							<SelectValue placeholder="Any rating" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="">Any Rating</SelectItem>
							<SelectItem value="4+">
								<div className="flex items-center gap-1">
									<span>⭐⭐⭐⭐</span>
									<span>& up</span>
								</div>
							</SelectItem>
							<SelectItem value="3+">
								<div className="flex items-center gap-1">
									<span>⭐⭐⭐</span>
									<span>& up</span>
								</div>
							</SelectItem>
							<SelectItem value="2+">
								<div className="flex items-center gap-1">
									<span>⭐⭐</span>
									<span>& up</span>
								</div>
							</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div className="space-y-3">
					<Label htmlFor="sort-select" className="flex items-center gap-2">
						<SortAscIcon className="w-4 h-4" />
						Sort By
					</Label>
					<Select value={sortBy} onValueChange={setSortBy}>
						<SelectTrigger id="sort-select">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Sort Options</SelectLabel>
								<SelectItem value="popularity">🔥 Most Popular</SelectItem>
								<SelectItem value="price-low">💰 Price: Low to High</SelectItem>
								<SelectItem value="price-high">💎 Price: High to Low</SelectItem>
								<SelectItem value="rating">⭐ Highest Rated</SelectItem>
								<SelectItem value="newest">🆕 Newest First</SelectItem>
								<SelectItem value="reviews">💬 Most Reviews</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
			</div>

			<div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
				<h4 className="font-medium text-blue-900 mb-2">Active Filters</h4>
				<div className="flex flex-wrap gap-2">
					{category && <Badge variant="secondary">Category: {category}</Badge>}
					{brand && <Badge variant="secondary">Brand: {brand}</Badge>}
					{priceRange && <Badge variant="secondary">Price: ${priceRange}</Badge>}
					{rating && <Badge variant="secondary">Rating: {rating}</Badge>}
					<Badge variant="outline">Sort: {sortBy}</Badge>
				</div>
			</div>
		</div>
	)
}

// Basic Select (preserved from original)
const BasicSelectExample = () => {
	return (
		<div className="space-y-3">
			<Label className="text-lg font-semibold">Basic Selection</Label>
			<Select>
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder="Select a fruit" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectLabel>Fruits</SelectLabel>
						<SelectItem value="apple">🍎 Apple</SelectItem>
						<SelectItem value="banana">🍌 Banana</SelectItem>
						<SelectItem value="blueberry">🫐 Blueberry</SelectItem>
						<SelectItem value="grapes">🍇 Grapes</SelectItem>
						<SelectItem value="pineapple">🍍 Pineapple</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	)
}

export default function SelectSample() {
	const [showAdvanced, setShowAdvanced] = useState(false)

	return (
		<Fragment>
			<ComponentDoc
				title="Select"
				description="Dropdown selection components for choosing from multiple options. Supports grouping, search, icons, and complex data structures for enhanced user experience."
				component={
					<div className="flex flex-col gap-8 w-full max-w-4xl">
						{/* Controls */}
						<div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
							<div className="flex items-center gap-4">
								<div className="flex items-center space-x-2">
									<Switch
										id="show-advanced"
										checked={showAdvanced}
										onCheckedChange={setShowAdvanced}
									/>
									<Label htmlFor="show-advanced" className="text-sm">Show Advanced Examples</Label>
								</div>
							</div>
							<Badge variant="outline">{showAdvanced ? '4' : '3'} Examples</Badge>
						</div>

						{/* Real-World Examples */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Real-World Applications</h3>
							<div className="grid grid-cols-1 gap-8">
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<GlobeIcon className="w-5 h-5" />
											Location & Time Settings
										</CardTitle>
										<CardDescription>Country, timezone, and language selection with dynamic options</CardDescription>
									</CardHeader>
									<CardContent>
										<LocationTimeSelector />
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<UsersIcon className="w-5 h-5" />
											Team Assignment
										</CardTitle>
										<CardDescription>Project assignment with team member filtering and status management</CardDescription>
									</CardHeader>
									<CardContent>
										<TeamMemberAssignment />
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<FilterIcon className="w-5 h-5" />
											Product Filters
										</CardTitle>
										<CardDescription>E-commerce filtering with categories, brands, pricing, and sorting</CardDescription>
									</CardHeader>
									<CardContent>
										<ProductFilterSelector />
									</CardContent>
								</Card>
							</div>
						</div>

						{/* Basic Example */}
						{showAdvanced && (
							<div>
								<h3 className="text-lg font-semibold mb-4">Basic Example</h3>
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<TagIcon className="w-5 h-5" />
											Basic Select
										</CardTitle>
										<CardDescription>Simple selection with grouped options</CardDescription>
									</CardHeader>
									<CardContent>
										<BasicSelectExample />
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
								<CardDescription>Best practices for implementing select components</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div>
										<h4 className="font-semibold mb-2">When to Use</h4>
										<ul className="space-y-1 text-sm text-muted-foreground">
											<li>• For 4 or more options where radio buttons would take too much space</li>
											<li>• When options can be grouped logically into categories</li>
											<li>• For filtering and sorting large datasets</li>
											<li>• When you need to display additional context with options</li>
											<li>• For location, time, and preference selections</li>
										</ul>
									</div>
									<Separator />
									<div>
										<h4 className="font-semibold mb-2">Design Principles</h4>
										<ul className="space-y-1 text-sm text-muted-foreground">
											<li>• Use clear, descriptive labels and placeholder text</li>
											<li>• Group related options with section headers</li>
											<li>• Include icons or visual indicators when helpful</li>
											<li>• Provide appropriate default selections when possible</li>
											<li>• Consider search functionality for long lists</li>
											<li>• Ensure proper keyboard navigation and accessibility</li>
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
									<p><strong>Show Advanced:</strong> {showAdvanced ? 'Yes' : 'No'}</p>
									<p><strong>Total Examples:</strong> {showAdvanced ? '4' : '3'}</p>
								</div>
								<div>
									<p><strong>Selection Types:</strong> Location, Team, Products{showAdvanced ? ', Basic' : ''}</p>
									<p><strong>Features:</strong> Grouping, Icons, Filtering, Dynamic Options</p>
								</div>
							</div>
						</div>
					</div>
				}
			/>
		</Fragment>
	)
}
