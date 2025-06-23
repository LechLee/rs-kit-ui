import { Fragment, useState, useMemo } from 'react'
import {
	CheckIcon,
	ChevronDownIcon,
	ChevronsUpDown,
	PlusCircleIcon,
	SearchIcon,
	UserIcon,
	BuildingIcon,
	MapPinIcon,
	GlobeIcon,
	TagIcon,
	StarIcon,
	HashIcon,
	CalendarIcon,
	ClockIcon,
	TrendingUpIcon,
	XIcon,
	FilterIcon
} from 'lucide-react'
import {
	Button,
	Avatar,
	AvatarFallback,
	AvatarImage,
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Badge,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Label,
	Switch,
	Separator,
	cn
} from '@rs-kit/ui-kit'
import { ComponentDoc } from '@/components/ComponentDoc'

// Sample data
const frameworks = [
	{ value: 'next.js', label: 'Next.js', description: 'React framework for production', category: 'React' },
	{ value: 'react', label: 'React', description: 'JavaScript library for building UIs', category: 'React' },
	{ value: 'sveltekit', label: 'SvelteKit', description: 'Full-stack Svelte framework', category: 'Svelte' },
	{ value: 'nuxt.js', label: 'Nuxt.js', description: 'Vue.js framework', category: 'Vue' },
	{ value: 'remix', label: 'Remix', description: 'Full stack web framework', category: 'React' },
	{ value: 'astro', label: 'Astro', description: 'Static site builder', category: 'Static' },
	{ value: 'vue', label: 'Vue.js', description: 'Progressive JavaScript framework', category: 'Vue' },
	{ value: 'angular', label: 'Angular', description: 'Platform for building mobile and desktop web apps', category: 'Angular' }
]

const users = [
	{ id: '1', username: 'shadcn', email: 'shadcn@example.com', role: 'Developer', status: 'active' },
	{ id: '2', username: 'leerob', email: 'leerob@example.com', role: 'Manager', status: 'active' },
	{ id: '3', username: 'evilrabbit', email: 'evilrabbit@example.com', role: 'Designer', status: 'inactive' },
	{ id: '4', username: 'delba', email: 'delba@example.com', role: 'Developer', status: 'active' },
	{ id: '5', username: 'rauchg', email: 'rauchg@example.com', role: 'CEO', status: 'active' }
]

const countries = [
	{ code: 'US', name: 'United States', flag: '🇺🇸', continent: 'North America' },
	{ code: 'CA', name: 'Canada', flag: '🇨🇦', continent: 'North America' },
	{ code: 'UK', name: 'United Kingdom', flag: '🇬🇧', continent: 'Europe' },
	{ code: 'DE', name: 'Germany', flag: '🇩🇪', continent: 'Europe' },
	{ code: 'FR', name: 'France', flag: '🇫🇷', continent: 'Europe' },
	{ code: 'JP', name: 'Japan', flag: '🇯🇵', continent: 'Asia' },
	{ code: 'CN', name: 'China', flag: '🇨🇳', continent: 'Asia' },
	{ code: 'AU', name: 'Australia', flag: '🇦🇺', continent: 'Oceania' },
	{ code: 'BR', name: 'Brazil', flag: '🇧🇷', continent: 'South America' },
	{ code: 'IN', name: 'India', flag: '🇮🇳', continent: 'Asia' }
]

const tags = [
	{ id: '1', name: 'Frontend', color: 'blue', count: 45 },
	{ id: '2', name: 'Backend', color: 'green', count: 32 },
	{ id: '3', name: 'Design', color: 'purple', count: 28 },
	{ id: '4', name: 'DevOps', color: 'orange', count: 18 },
	{ id: '5', name: 'Mobile', color: 'pink', count: 24 },
	{ id: '6', name: 'Testing', color: 'yellow', count: 15 },
	{ id: '7', name: 'Security', color: 'red', count: 12 },
	{ id: '8', name: 'API', color: 'cyan', count: 38 }
]

const projects = [
	{ id: '1', name: 'E-commerce Platform', status: 'active', priority: 'high', team: 'Frontend' },
	{ id: '2', name: 'Mobile App', status: 'planning', priority: 'medium', team: 'Mobile' },
	{ id: '3', name: 'Analytics Dashboard', status: 'completed', priority: 'low', team: 'Backend' },
	{ id: '4', name: 'Design System', status: 'active', priority: 'high', team: 'Design' },
	{ id: '5', name: 'API Gateway', status: 'active', priority: 'medium', team: 'Backend' }
]

// Basic Combobox Component
const BasicCombobox = () => {
	const [open, setOpen] = useState(false)
	const [value, setValue] = useState('')

	return (
		<div className="space-y-2">
			<Label>Framework</Label>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className="w-full justify-between"
					>
						{value ? frameworks.find((framework) => framework.value === value)?.label : 'Select framework...'}
						<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[300px] p-0">
					<Command>
						<CommandInput placeholder="Search framework..." />
						<CommandList>
							<CommandEmpty>No framework found.</CommandEmpty>
							<CommandGroup>
								{frameworks.map((framework) => (
									<CommandItem
										key={framework.value}
										value={framework.value}
										onSelect={(currentValue) => {
											setValue(currentValue === value ? '' : currentValue)
											setOpen(false)
										}}
									>
										<CheckIcon
											className={cn(
												'mr-2 h-4 w-4',
												value === framework.value ? 'opacity-100' : 'opacity-0'
											)}
										/>
										{framework.label}
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	)
}

// Multi-Select Combobox
const MultiSelectCombobox = () => {
	const [open, setOpen] = useState(false)
	const [selectedTags, setSelectedTags] = useState<string[]>([])

	const selectedTagObjects = useMemo(() => 
		tags.filter(tag => selectedTags.includes(tag.id)), 
		[selectedTags]
	)

	const handleSelect = (tagId: string) => {
		setSelectedTags(prev => 
			prev.includes(tagId) 
				? prev.filter(id => id !== tagId)
				: [...prev, tagId]
		)
	}

	const removeTag = (tagId: string) => {
		setSelectedTags(prev => prev.filter(id => id !== tagId))
	}

	return (
		<div className="space-y-2">
			<Label>Tags</Label>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className="w-full justify-between min-h-[40px] h-auto"
					>
						<div className="flex flex-wrap gap-1">
							{selectedTagObjects.length > 0 ? (
								selectedTagObjects.map((tag) => (
									<Badge key={tag.id} variant="secondary" className="text-xs">
										<TagIcon className="w-3 h-3 mr-1" />
										{tag.name}
										<XIcon 
											className="w-3 h-3 ml-1 cursor-pointer" 
											onClick={(e) => {
												e.stopPropagation()
												removeTag(tag.id)
											}}
										/>
									</Badge>
								))
							) : (
								<span className="text-muted-foreground">Select tags...</span>
							)}
						</div>
						<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[300px] p-0">
					<Command>
						<CommandInput placeholder="Search tags..." />
						<CommandList>
							<CommandEmpty>No tags found.</CommandEmpty>
							<CommandGroup>
								{tags.map((tag) => (
									<CommandItem
										key={tag.id}
										value={tag.id}
										onSelect={() => handleSelect(tag.id)}
									>
										<CheckIcon
											className={cn(
												'mr-2 h-4 w-4',
												selectedTags.includes(tag.id) ? 'opacity-100' : 'opacity-0'
											)}
										/>
										<div className="flex items-center gap-2 flex-1">
											<TagIcon className="w-4 h-4" />
											<span>{tag.name}</span>
											<Badge variant="outline" className="ml-auto text-xs">
												{tag.count}
											</Badge>
										</div>
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	)
}

// User Combobox with Avatars
const UserCombobox = () => {
	const [open, setOpen] = useState(false)
	const [value, setValue] = useState('')
	
	const selectedUser = useMemo(() => 
		users.find((user) => user.id === value), 
		[value]
	)

	return (
		<div className="space-y-2">
			<Label>Assign User</Label>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className="w-full justify-start"
					>
						{selectedUser ? (
							<div className="flex items-center gap-2">
								<Avatar className="h-6 w-6">
									<AvatarImage src={`https://github.com/${selectedUser.username}.png`} />
									<AvatarFallback>{selectedUser.username[0].toUpperCase()}</AvatarFallback>
								</Avatar>
								<div className="flex flex-col items-start">
									<span className="text-sm font-medium">{selectedUser.username}</span>
									<span className="text-xs text-muted-foreground">{selectedUser.role}</span>
								</div>
							</div>
						) : (
							<div className="flex items-center gap-2">
								<UserIcon className="h-4 w-4 opacity-50" />
								<span>Select user...</span>
							</div>
						)}
						<ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[300px] p-0">
					<Command>
						<CommandInput placeholder="Search users..." />
						<CommandList>
							<CommandEmpty>No user found.</CommandEmpty>
							<CommandGroup heading="Active Users">
								{users.filter(user => user.status === 'active').map((user) => (
									<CommandItem
										key={user.id}
										value={user.id}
										onSelect={(currentValue) => {
											setValue(currentValue === value ? '' : currentValue)
											setOpen(false)
										}}
									>
										<CheckIcon
											className={cn(
												'mr-2 h-4 w-4',
												value === user.id ? 'opacity-100' : 'opacity-0'
											)}
										/>
										<Avatar className="h-6 w-6 mr-2">
											<AvatarImage src={`https://github.com/${user.username}.png`} />
											<AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
										</Avatar>
										<div className="flex flex-col">
											<span className="text-sm font-medium">{user.username}</span>
											<span className="text-xs text-muted-foreground">{user.email}</span>
										</div>
										<Badge variant="outline" className="ml-auto text-xs">
											{user.role}
										</Badge>
									</CommandItem>
								))}
							</CommandGroup>
							{users.some(user => user.status === 'inactive') && (
								<>
									<CommandSeparator />
									<CommandGroup heading="Inactive Users">
										{users.filter(user => user.status === 'inactive').map((user) => (
											<CommandItem
												key={user.id}
												value={user.id}
												onSelect={(currentValue) => {
													setValue(currentValue === value ? '' : currentValue)
													setOpen(false)
												}}
												className="opacity-50"
											>
												<CheckIcon
													className={cn(
														'mr-2 h-4 w-4',
														value === user.id ? 'opacity-100' : 'opacity-0'
													)}
												/>
												<Avatar className="h-6 w-6 mr-2">
													<AvatarImage src={`https://github.com/${user.username}.png`} />
													<AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
												</Avatar>
												<div className="flex flex-col">
													<span className="text-sm font-medium">{user.username}</span>
													<span className="text-xs text-muted-foreground">{user.email}</span>
												</div>
												<Badge variant="secondary" className="ml-auto text-xs">
													Inactive
												</Badge>
											</CommandItem>
										))}
									</CommandGroup>
								</>
							)}
							<CommandSeparator />
							<CommandGroup>
								<CommandItem>
									<PlusCircleIcon className="mr-2 h-4 w-4" />
									Invite new user
								</CommandItem>
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	)
}

// Grouped Combobox
const GroupedCombobox = () => {
	const [open, setOpen] = useState(false)
	const [value, setValue] = useState('')

	const selectedCountry = useMemo(() => 
		countries.find((country) => country.code === value), 
		[value]
	)

	const groupedCountries = useMemo(() => {
		const groups: Record<string, typeof countries> = {}
		countries.forEach(country => {
			if (!groups[country.continent]) {
				groups[country.continent] = []
			}
			groups[country.continent].push(country)
		})
		return groups
	}, [])

	return (
		<div className="space-y-2">
			<Label>Country</Label>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className="w-full justify-between"
					>
						{selectedCountry ? (
							<div className="flex items-center gap-2">
								<span className="text-lg">{selectedCountry.flag}</span>
								<span>{selectedCountry.name}</span>
							</div>
						) : (
							<div className="flex items-center gap-2">
								<GlobeIcon className="h-4 w-4 opacity-50" />
								<span>Select country...</span>
							</div>
						)}
						<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[300px] p-0">
					<Command>
						<CommandInput placeholder="Search country..." />
						<CommandList>
							<CommandEmpty>No country found.</CommandEmpty>
							{Object.entries(groupedCountries).map(([continent, countryList]) => (
								<CommandGroup key={continent} heading={continent}>
									{countryList.map((country) => (
										<CommandItem
											key={country.code}
											value={country.code}
											onSelect={(currentValue) => {
												setValue(currentValue === value ? '' : currentValue)
												setOpen(false)
											}}
										>
											<CheckIcon
												className={cn(
													'mr-2 h-4 w-4',
													value === country.code ? 'opacity-100' : 'opacity-0'
												)}
											/>
											<span className="mr-2 text-lg">{country.flag}</span>
											<span>{country.name}</span>
										</CommandItem>
									))}
								</CommandGroup>
							))}
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	)
}

// Advanced Combobox with Custom Rendering
const AdvancedCombobox = () => {
	const [open, setOpen] = useState(false)
	const [value, setValue] = useState('')
	const [showDescription, setShowDescription] = useState(true)

	const selectedFramework = useMemo(() => 
		frameworks.find((framework) => framework.value === value), 
		[value]
	)

	const groupedFrameworks = useMemo(() => {
		const groups: Record<string, typeof frameworks> = {}
		frameworks.forEach(framework => {
			if (!groups[framework.category]) {
				groups[framework.category] = []
			}
			groups[framework.category].push(framework)
		})
		return groups
	}, [])

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<Label>Framework (Advanced)</Label>
				<div className="flex items-center space-x-2">
					<Switch
						id="show-description"
						checked={showDescription}
						onCheckedChange={setShowDescription}
					/>
					<Label htmlFor="show-description" className="text-sm">Show descriptions</Label>
				</div>
			</div>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className="w-full justify-between h-auto min-h-[60px] p-3"
					>
						{selectedFramework ? (
							<div className="flex flex-col items-start gap-1">
								<div className="flex items-center gap-2">
									<Badge variant="outline" className="text-xs">
										{selectedFramework.category}
									</Badge>
									<span className="font-medium">{selectedFramework.label}</span>
								</div>
								{showDescription && (
									<span className="text-xs text-muted-foreground text-left">
										{selectedFramework.description}
									</span>
								)}
							</div>
						) : (
							<div className="flex items-center gap-2">
								<SearchIcon className="h-4 w-4 opacity-50" />
								<span>Search frameworks...</span>
							</div>
						)}
						<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[400px] p-0">
					<Command>
						<CommandInput placeholder="Search frameworks..." />
						<CommandList>
							<CommandEmpty>No framework found.</CommandEmpty>
							{Object.entries(groupedFrameworks).map(([category, frameworkList]) => (
								<CommandGroup key={category} heading={category}>
									{frameworkList.map((framework) => (
										<CommandItem
											key={framework.value}
											value={framework.value}
											onSelect={(currentValue) => {
												setValue(currentValue === value ? '' : currentValue)
												setOpen(false)
											}}
											className="flex flex-col items-start gap-1 p-3"
										>
											<div className="flex items-center gap-2 w-full">
												<CheckIcon
													className={cn(
														'h-4 w-4',
														value === framework.value ? 'opacity-100' : 'opacity-0'
													)}
												/>
												<span className="font-medium">{framework.label}</span>
												<Badge variant="outline" className="ml-auto text-xs">
													{framework.category}
												</Badge>
											</div>
											{showDescription && (
												<span className="text-xs text-muted-foreground ml-6">
													{framework.description}
												</span>
											)}
										</CommandItem>
									))}
								</CommandGroup>
							))}
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	)
}

// Search and Filter Combobox
const SearchFilterCombobox = () => {
	const [open, setOpen] = useState(false)
	const [value, setValue] = useState('')
	const [statusFilter, setStatusFilter] = useState<string>('all')

	const selectedProject = useMemo(() => 
		projects.find((project) => project.id === value), 
		[value]
	)

	const filteredProjects = useMemo(() => {
		return statusFilter === 'all' 
			? projects 
			: projects.filter(project => project.status === statusFilter)
	}, [statusFilter])

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'active': return 'bg-green-500'
			case 'planning': return 'bg-yellow-500'
			case 'completed': return 'bg-blue-500'
			default: return 'bg-gray-500'
		}
	}

	const getPriorityColor = (priority: string) => {
		switch (priority) {
			case 'high': return 'text-red-600'
			case 'medium': return 'text-yellow-600'
			case 'low': return 'text-green-600'
			default: return 'text-gray-600'
		}
	}

	return (
		<div className="space-y-4">
			<Label>Project</Label>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className="w-full justify-between h-auto min-h-[50px] p-3"
					>
						{selectedProject ? (
							<div className="flex items-center gap-3">
								<div className={`w-3 h-3 rounded-full ${getStatusColor(selectedProject.status)}`} />
								<div className="flex flex-col items-start">
									<span className="font-medium">{selectedProject.name}</span>
									<div className="flex items-center gap-2">
										<Badge variant="outline" className="text-xs">
											{selectedProject.team}
										</Badge>
										<span className={`text-xs font-medium ${getPriorityColor(selectedProject.priority)}`}>
											{selectedProject.priority}
										</span>
									</div>
								</div>
							</div>
						) : (
							<div className="flex items-center gap-2">
								<HashIcon className="h-4 w-4 opacity-50" />
								<span>Select project...</span>
							</div>
						)}
						<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[400px] p-0">
					<Command>
						<CommandInput placeholder="Search projects..." />
						<div className="p-2 border-b">
							<div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
								<FilterIcon className="h-3 w-3" />
								Filter by status:
							</div>
							<div className="flex gap-1">
								{['all', 'active', 'planning', 'completed'].map((status) => (
									<Button
										key={status}
										variant={statusFilter === status ? 'default' : 'outline'}
										size="sm"
										className="text-xs h-6"
										onClick={() => setStatusFilter(status)}
									>
										{status}
									</Button>
								))}
							</div>
						</div>
						<CommandList>
							<CommandEmpty>No project found.</CommandEmpty>
							<CommandGroup>
								{filteredProjects.map((project) => (
									<CommandItem
										key={project.id}
										value={project.id}
										onSelect={(currentValue) => {
											setValue(currentValue === value ? '' : currentValue)
											setOpen(false)
										}}
										className="flex items-center gap-3 p-3"
									>
										<CheckIcon
											className={cn(
												'h-4 w-4',
												value === project.id ? 'opacity-100' : 'opacity-0'
											)}
										/>
										<div className={`w-3 h-3 rounded-full ${getStatusColor(project.status)}`} />
										<div className="flex flex-col flex-1">
											<span className="font-medium">{project.name}</span>
											<div className="flex items-center gap-2">
												<Badge variant="outline" className="text-xs">
													{project.team}
												</Badge>
												<span className={`text-xs font-medium ${getPriorityColor(project.priority)}`}>
													{project.priority} priority
												</span>
											</div>
										</div>
									</CommandItem>
								))}
							</CommandGroup>
							<CommandSeparator />
							<CommandGroup>
								<CommandItem>
									<PlusCircleIcon className="mr-2 h-4 w-4" />
									Create new project
								</CommandItem>
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	)
}

export default function ComboboxSample() {
	const [showAdvanced, setShowAdvanced] = useState(false)

	return (
		<Fragment>
			<ComponentDoc
				title="Combobox"
				description="Flexible searchable select components with support for single selection, multi-selection, grouping, and custom rendering. Perfect for forms, filters, and complex data selection."
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
							<Badge variant="outline">6 Examples</Badge>
						</div>

						{/* Basic Examples */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Basic Combobox</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<SearchIcon className="w-5 h-5" />
											Simple Selection
										</CardTitle>
										<CardDescription>Basic combobox with search functionality</CardDescription>
									</CardHeader>
									<CardContent>
										<BasicCombobox />
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<UserIcon className="w-5 h-5" />
											User Selection with Avatars
										</CardTitle>
										<CardDescription>Combobox with rich user data and avatars</CardDescription>
									</CardHeader>
									<CardContent>
										<UserCombobox />
									</CardContent>
								</Card>
							</div>
						</div>

						{/* Multi-Select and Grouped */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Multi-Select & Grouped</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<TagIcon className="w-5 h-5" />
											Multi-Select Tags
										</CardTitle>
										<CardDescription>Select multiple options with removable badges</CardDescription>
									</CardHeader>
									<CardContent>
										<MultiSelectCombobox />
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<GlobeIcon className="w-5 h-5" />
											Grouped Options
										</CardTitle>
										<CardDescription>Options grouped by categories with flags</CardDescription>
									</CardHeader>
									<CardContent>
										<GroupedCombobox />
									</CardContent>
								</Card>
							</div>
						</div>

						{/* Advanced Examples */}
						{showAdvanced && (
							<div>
								<h3 className="text-lg font-semibold mb-4">Advanced Examples</h3>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<Card>
										<CardHeader>
											<CardTitle className="flex items-center gap-2">
												<StarIcon className="w-5 h-5" />
												Custom Rendering
											</CardTitle>
											<CardDescription>Advanced combobox with custom item rendering</CardDescription>
										</CardHeader>
										<CardContent>
											<AdvancedCombobox />
										</CardContent>
									</Card>

									<Card>
										<CardHeader>
											<CardTitle className="flex items-center gap-2">
												<FilterIcon className="w-5 h-5" />
												Search & Filter
											</CardTitle>
											<CardDescription>Combobox with built-in filtering and status indicators</CardDescription>
										</CardHeader>
										<CardContent>
											<SearchFilterCombobox />
										</CardContent>
									</Card>
								</div>
							</div>
						)}

						{/* Usage Guidelines */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<BuildingIcon className="w-5 h-5" />
									Usage Guidelines
								</CardTitle>
								<CardDescription>Best practices for implementing combobox components</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div>
										<h4 className="font-semibold mb-2">When to Use</h4>
										<ul className="space-y-1 text-sm text-muted-foreground">
											<li>• When you have a large list of options (&gt;10 items)</li>
											<li>• When users need to search through options</li>
											<li>• For autocomplete functionality</li>
											<li>• When you need multi-select capabilities</li>
										</ul>
									</div>
									<Separator />
									<div>
										<h4 className="font-semibold mb-2">Accessibility Features</h4>
										<ul className="space-y-1 text-sm text-muted-foreground">
											<li>• Keyboard navigation (Arrow keys, Enter, Escape)</li>
											<li>• Screen reader support with ARIA labels</li>
											<li>• Focus management and trap</li>
											<li>• Proper role and state announcements</li>
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
									<p><strong>Show Advanced Examples:</strong> {showAdvanced ? 'Yes' : 'No'}</p>
									<p><strong>Total Examples:</strong> {showAdvanced ? '6' : '4'}</p>
								</div>
								<div>
									<p><strong>Example Types:</strong> Basic, Multi-select, Grouped{showAdvanced ? ', Advanced' : ''}</p>
									<p><strong>Features:</strong> Search, Avatars, Badges, Filters</p>
								</div>
							</div>
						</div>
					</div>
				}
			/>
		</Fragment>
	)
}