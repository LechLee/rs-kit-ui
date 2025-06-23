import { Fragment, useState, useEffect } from 'react'
import {
	Calculator,
	Calendar,
	CreditCard,
	Settings,
	Smile,
	User,
	Search,
	File,
	FileText,
	Folder,
	Mail,
	MessageCircle,
	Phone,
	Video,
	Users,
	Home,
	Dashboard,
	BarChart3,
	PieChart,
	TrendingUp,
	Database,
	Server,
	Globe,
	Zap,
	Shield,
	Lock,
	Key,
	Bell,
	Bookmark,
	Heart,
	Star,
	Tag,
	Hash,
	AtSign,
	Clock,
	MapPin,
	Camera,
	Image,
	Music,
	Play,
	Pause,
	SkipForward,
	SkipBack,
	Volume2,
	Download,
	Upload,
	Share,
	Link,
	Copy,
	Edit,
	Trash,
	Archive,
	Plus,
	Minus,
	X,
	Check,
	ChevronRight,
	Filter,
	Sort,
	RefreshCw,
	Terminal,
	Code,
	GitBranch,
	Github,
	Palette,
	Monitor,
	Smartphone,
	Tablet,
	SunIcon,
	MoonIcon,
	Command as CommandIcon
} from 'lucide-react'
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
	Command,
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Badge,
	Switch,
	Label,
	Separator,
	Avatar,
	AvatarFallback,
	AvatarImage,
	Input
} from '@rs-kit/ui-kit'
import { ComponentDoc } from '@/components/ComponentDoc'

// Sample data for command items
const suggestions = [
	{ icon: Calendar, label: 'Calendar', description: 'View and manage your calendar', shortcut: '⌘K C' },
	{ icon: Mail, label: 'Email', description: 'Check your email inbox', shortcut: '⌘K E' },
	{ icon: MessageCircle, label: 'Messages', description: 'View recent messages', shortcut: '⌘K M' },
	{ icon: Phone, label: 'Phone', description: 'Make a phone call', shortcut: '⌘K P' },
	{ icon: Video, label: 'Video Call', description: 'Start a video conference', shortcut: '⌘K V' },
	{ icon: Calculator, label: 'Calculator', description: 'Open calculator', shortcut: '⌘K A' },
	{ icon: Smile, label: 'Emoji Picker', description: 'Search and insert emojis', shortcut: '⌘K ⌘E' }
]

const navigation = [
	{ icon: Home, label: 'Dashboard', description: 'Go to main dashboard', shortcut: '⌘H' },
	{ icon: BarChart3, label: 'Analytics', description: 'View analytics and reports', shortcut: '⌘A' },
	{ icon: Users, label: 'Team', description: 'Manage team members', shortcut: '⌘T' },
	{ icon: Database, label: 'Database', description: 'Database management', shortcut: '⌘D' },
	{ icon: Settings, label: 'Settings', description: 'Application settings', shortcut: '⌘,' },
	{ icon: Bell, label: 'Notifications', description: 'View notifications', shortcut: '⌘N' }
]

const files = [
	{ icon: FileText, label: 'README.md', path: '/docs/README.md', size: '2.4 KB', modified: '2 hours ago' },
	{ icon: File, label: 'package.json', path: '/package.json', size: '1.8 KB', modified: '1 day ago' },
	{ icon: Folder, label: 'src', path: '/src', size: '—', modified: '3 hours ago' },
	{ icon: FileText, label: 'tsconfig.json', path: '/tsconfig.json', size: '856 B', modified: '1 week ago' },
	{ icon: File, label: 'tailwind.config.js', path: '/tailwind.config.js', size: '1.2 KB', modified: '2 days ago' },
	{ icon: Folder, label: 'components', path: '/src/components', size: '—', modified: '1 hour ago' }
]

const recentActions = [
	{ icon: Edit, label: 'Edit Profile', description: 'Last updated 10 minutes ago' },
	{ icon: Share, label: 'Share Document', description: 'Shared "Project Proposal" with team' },
	{ icon: Download, label: 'Download Report', description: 'Analytics report Q4 2023' },
	{ icon: Copy, label: 'Copy API Key', description: 'Development environment key' },
	{ icon: Archive, label: 'Archive Project', description: 'Moved "Old Website" to archive' }
]

const quickActions = [
	{ icon: Plus, label: 'Create New', description: 'Create a new project or document', action: 'create' },
	{ icon: Upload, label: 'Upload File', description: 'Upload files or images', action: 'upload' },
	{ icon: Users, label: 'Invite Team', description: 'Invite new team members', action: 'invite' },
	{ icon: Link, label: 'Generate Link', description: 'Create shareable link', action: 'link' },
	{ icon: RefreshCw, label: 'Sync Data', description: 'Sync with external services', action: 'sync' }
]

const themes = [
	{ icon: SunIcon, label: 'Light Theme', description: 'Switch to light mode', value: 'light' },
	{ icon: MoonIcon, label: 'Dark Theme', description: 'Switch to dark mode', value: 'dark' },
	{ icon: Monitor, label: 'System Theme', description: 'Use system preference', value: 'system' }
]

// Basic Command Dialog
const BasicCommandDialog = ({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) => {
	return (
		<CommandDialog open={open} onOpenChange={onOpenChange}>
			<CommandInput placeholder="Type a command or search..." />
			<CommandList>
				<CommandEmpty>No results found.</CommandEmpty>
				<CommandGroup heading="Suggestions">
					{suggestions.slice(0, 4).map((item, index) => (
						<CommandItem key={index} onSelect={() => onOpenChange(false)}>
							<item.icon className="mr-2 h-4 w-4" />
							<span>{item.label}</span>
							<CommandShortcut>{item.shortcut}</CommandShortcut>
						</CommandItem>
					))}
				</CommandGroup>
				<CommandSeparator />
				<CommandGroup heading="Navigation">
					{navigation.slice(0, 3).map((item, index) => (
						<CommandItem key={index} onSelect={() => onOpenChange(false)}>
							<item.icon className="mr-2 h-4 w-4" />
							<span>{item.label}</span>
							<CommandShortcut>{item.shortcut}</CommandShortcut>
						</CommandItem>
					))}
				</CommandGroup>
			</CommandList>
		</CommandDialog>
	)
}

// Advanced Command Dialog
const AdvancedCommandDialog = ({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) => {
	const [searchTerm, setSearchTerm] = useState('')
	
	return (
		<CommandDialog open={open} onOpenChange={onOpenChange}>
			<CommandInput 
				placeholder="Search files, actions, or navigate..." 
				value={searchTerm}
				onValueChange={setSearchTerm}
			/>
			<CommandList>
				<CommandEmpty>
					<div className="flex flex-col items-center gap-2 py-6">
						<Search className="h-8 w-8 text-muted-foreground" />
						<p className="text-sm text-muted-foreground">No results found for "{searchTerm}"</p>
						<p className="text-xs text-muted-foreground">Try searching for files, actions, or navigation</p>
					</div>
				</CommandEmpty>
				
				<CommandGroup heading="Quick Actions">
					{quickActions.map((action, index) => (
						<CommandItem key={index} onSelect={() => onOpenChange(false)}>
							<action.icon className="mr-2 h-4 w-4" />
							<div className="flex flex-col">
								<span className="font-medium">{action.label}</span>
								<span className="text-xs text-muted-foreground">{action.description}</span>
							</div>
						</CommandItem>
					))}
				</CommandGroup>

				<CommandSeparator />
				
				<CommandGroup heading="Recent Files">
					{files.map((file, index) => (
						<CommandItem key={index} onSelect={() => onOpenChange(false)}>
							<file.icon className="mr-2 h-4 w-4" />
							<div className="flex flex-col flex-1">
								<span className="font-medium">{file.label}</span>
								<span className="text-xs text-muted-foreground">{file.path}</span>
							</div>
							<div className="flex flex-col items-end text-xs text-muted-foreground">
								<span>{file.size}</span>
								<span>{file.modified}</span>
							</div>
						</CommandItem>
					))}
				</CommandGroup>

				<CommandSeparator />
				
				<CommandGroup heading="Recent Actions">
					{recentActions.map((action, index) => (
						<CommandItem key={index} onSelect={() => onOpenChange(false)}>
							<action.icon className="mr-2 h-4 w-4" />
							<div className="flex flex-col">
								<span className="font-medium">{action.label}</span>
								<span className="text-xs text-muted-foreground">{action.description}</span>
							</div>
							<Clock className="ml-auto h-3 w-3 text-muted-foreground" />
						</CommandItem>
					))}
				</CommandGroup>

				<CommandSeparator />
				
				<CommandGroup heading="Appearance">
					{themes.map((theme, index) => (
						<CommandItem key={index} onSelect={() => onOpenChange(false)}>
							<theme.icon className="mr-2 h-4 w-4" />
							<div className="flex flex-col">
								<span className="font-medium">{theme.label}</span>
								<span className="text-xs text-muted-foreground">{theme.description}</span>
							</div>
						</CommandItem>
					))}
				</CommandGroup>
			</CommandList>
		</CommandDialog>
	)
}

// Inline Command Component
const InlineCommand = () => {
	const [value, setValue] = useState('')

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Terminal className="w-5 h-5" />
					Inline Command
				</CardTitle>
				<CardDescription>Command component embedded directly in the page</CardDescription>
			</CardHeader>
			<CardContent>
				<Command className="rounded-lg border shadow-md">
					<CommandInput 
						placeholder="Search commands..." 
						value={value}
						onValueChange={setValue}
					/>
					<CommandList>
						<CommandEmpty>No results found.</CommandEmpty>
						<CommandGroup heading="Git Commands">
							<CommandItem>
								<GitBranch className="mr-2 h-4 w-4" />
								<span>git status</span>
								<CommandShortcut>⌘G S</CommandShortcut>
							</CommandItem>
							<CommandItem>
								<GitBranch className="mr-2 h-4 w-4" />
								<span>git commit</span>
								<CommandShortcut>⌘G C</CommandShortcut>
							</CommandItem>
							<CommandItem>
								<GitBranch className="mr-2 h-4 w-4" />
								<span>git push</span>
								<CommandShortcut>⌘G P</CommandShortcut>
							</CommandItem>
						</CommandGroup>
						<CommandSeparator />
						<CommandGroup heading="Development">
							<CommandItem>
								<Code className="mr-2 h-4 w-4" />
								<span>Open Terminal</span>
								<CommandShortcut>⌘T</CommandShortcut>
							</CommandItem>
							<CommandItem>
								<Terminal className="mr-2 h-4 w-4" />
								<span>Run Build</span>
								<CommandShortcut>⌘R</CommandShortcut>
							</CommandItem>
							<CommandItem>
								<RefreshCw className="mr-2 h-4 w-4" />
								<span>Restart Server</span>
								<CommandShortcut>⌘⇧R</CommandShortcut>
							</CommandItem>
						</CommandGroup>
					</CommandList>
				</Command>
			</CardContent>
		</Card>
	)
}

// Team Command Dialog
const TeamCommandDialog = ({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) => {
	const teamMembers = [
		{ id: 1, name: 'Alice Johnson', role: 'Designer', status: 'online', avatar: '/avatars/alice.jpg' },
		{ id: 2, name: 'Bob Smith', role: 'Developer', status: 'away', avatar: '/avatars/bob.jpg' },
		{ id: 3, name: 'Carol Williams', role: 'Product Manager', status: 'online', avatar: '/avatars/carol.jpg' },
		{ id: 4, name: 'David Brown', role: 'Developer', status: 'offline', avatar: '/avatars/david.jpg' }
	]

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'online': return 'bg-green-500'
			case 'away': return 'bg-yellow-500'
			case 'offline': return 'bg-gray-400'
			default: return 'bg-gray-400'
		}
	}

	return (
		<CommandDialog open={open} onOpenChange={onOpenChange}>
			<CommandInput placeholder="Search team members, send messages..." />
			<CommandList>
				<CommandEmpty>No team members found.</CommandEmpty>
				
				<CommandGroup heading="Quick Actions">
					<CommandItem onSelect={() => onOpenChange(false)}>
						<MessageCircle className="mr-2 h-4 w-4" />
						<span>Start Group Chat</span>
						<CommandShortcut>⌘G</CommandShortcut>
					</CommandItem>
					<CommandItem onSelect={() => onOpenChange(false)}>
						<Video className="mr-2 h-4 w-4" />
						<span>Start Video Call</span>
						<CommandShortcut>⌘V</CommandShortcut>
					</CommandItem>
					<CommandItem onSelect={() => onOpenChange(false)}>
						<Users className="mr-2 h-4 w-4" />
						<span>Create Meeting</span>
						<CommandShortcut>⌘M</CommandShortcut>
					</CommandItem>
				</CommandGroup>

				<CommandSeparator />
				
				<CommandGroup heading="Team Members">
					{teamMembers.map((member) => (
						<CommandItem key={member.id} onSelect={() => onOpenChange(false)}>
							<div className="flex items-center gap-3 flex-1">
								<div className="relative">
									<Avatar className="h-8 w-8">
										<AvatarImage src={member.avatar} alt={member.name} />
										<AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
									</Avatar>
									<div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(member.status)}`} />
								</div>
								<div className="flex flex-col">
									<span className="font-medium">{member.name}</span>
									<span className="text-xs text-muted-foreground">{member.role}</span>
								</div>
							</div>
							<Badge variant="outline" className="text-xs">
								{member.status}
							</Badge>
						</CommandItem>
					))}
				</CommandGroup>
			</CommandList>
		</CommandDialog>
	)
}

export default function CommandSample() {
	const [basicOpen, setBasicOpen] = useState(false)
	const [advancedOpen, setAdvancedOpen] = useState(false)
	const [teamOpen, setTeamOpen] = useState(false)
	const [enableShortcuts, setEnableShortcuts] = useState(true)
	const [showDescriptions, setShowDescriptions] = useState(true)

	// Global keyboard shortcuts
	useEffect(() => {
		if (!enableShortcuts) return

		const handleKeyDown = (e: KeyboardEvent) => {
			// Cmd/Ctrl + K for basic command
			if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault()
				setBasicOpen(true)
			}
			// Cmd/Ctrl + Shift + K for advanced command
			if (e.key === 'K' && (e.metaKey || e.ctrlKey) && e.shiftKey) {
				e.preventDefault()
				setAdvancedOpen(true)
			}
			// Cmd/Ctrl + T for team command
			if (e.key === 't' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault()
				setTeamOpen(true)
			}
		}

		document.addEventListener('keydown', handleKeyDown)
		return () => document.removeEventListener('keydown', handleKeyDown)
	}, [enableShortcuts])

	return (
		<Fragment>
			<ComponentDoc
				title="Command"
				description="Fast, composable command menu components for building command palettes, quick actions, and search interfaces. Supports keyboard navigation, shortcuts, and rich content."
				component={
					<div className="flex flex-col gap-8 w-full max-w-4xl">
						{/* Controls */}
						<div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
							<div className="flex items-center gap-4">
								<div className="flex items-center space-x-2">
									<Switch
										id="enable-shortcuts"
										checked={enableShortcuts}
										onCheckedChange={setEnableShortcuts}
									/>
									<Label htmlFor="enable-shortcuts" className="text-sm">Enable Keyboard Shortcuts</Label>
								</div>
								<div className="flex items-center space-x-2">
									<Switch
										id="show-descriptions"
										checked={showDescriptions}
										onCheckedChange={setShowDescriptions}
									/>
									<Label htmlFor="show-descriptions" className="text-sm">Show Descriptions</Label>
								</div>
							</div>
							<Badge variant="outline">4 Examples</Badge>
						</div>

						{/* Command Dialogs */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Command Dialogs</h3>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<CommandIcon className="w-5 h-5" />
											Basic Command
										</CardTitle>
										<CardDescription>Simple command palette with shortcuts</CardDescription>
									</CardHeader>
									<CardContent className="space-y-3">
										<Button onClick={() => setBasicOpen(true)} className="w-full">
											Open Basic Command
										</Button>
										{enableShortcuts && (
											<p className="text-xs text-muted-foreground">
												Press <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">⌘K</kbd> to open
											</p>
										)}
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<Search className="w-5 h-5" />
											Advanced Search
										</CardTitle>
										<CardDescription>Rich command palette with file search</CardDescription>
									</CardHeader>
									<CardContent className="space-y-3">
										<Button onClick={() => setAdvancedOpen(true)} className="w-full">
											Open Advanced Command
										</Button>
										{enableShortcuts && (
											<p className="text-xs text-muted-foreground">
												Press <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">⌘⇧K</kbd> to open
											</p>
										)}
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<Users className="w-5 h-5" />
											Team Command
										</CardTitle>
										<CardDescription>Team-focused command with member search</CardDescription>
									</CardHeader>
									<CardContent className="space-y-3">
										<Button onClick={() => setTeamOpen(true)} className="w-full">
											Open Team Command
										</Button>
										{enableShortcuts && (
											<p className="text-xs text-muted-foreground">
												Press <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">⌘T</kbd> to open
											</p>
										)}
									</CardContent>
								</Card>
							</div>
						</div>

						{/* Inline Command */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Inline Command</h3>
							<InlineCommand />
						</div>

						{/* Command Features */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Command Features</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<Card>
									<CardHeader>
										<CardTitle>Keyboard Navigation</CardTitle>
										<CardDescription>Full keyboard support for efficient navigation</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="space-y-3">
											<div className="flex items-center justify-between">
												<span className="text-sm">Arrow Keys</span>
												<Badge variant="outline">Navigate items</Badge>
											</div>
											<div className="flex items-center justify-between">
												<span className="text-sm">Enter</span>
												<Badge variant="outline">Select item</Badge>
											</div>
											<div className="flex items-center justify-between">
												<span className="text-sm">Escape</span>
												<Badge variant="outline">Close dialog</Badge>
											</div>
											<div className="flex items-center justify-between">
												<span className="text-sm">Tab</span>
												<Badge variant="outline">Navigate groups</Badge>
											</div>
										</div>
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle>Search Capabilities</CardTitle>
										<CardDescription>Powerful search and filtering features</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="space-y-3">
											<div className="flex items-center justify-between">
												<span className="text-sm">Fuzzy Search</span>
												<Check className="h-4 w-4 text-green-600" />
											</div>
											<div className="flex items-center justify-between">
												<span className="text-sm">Multiple Groups</span>
												<Check className="h-4 w-4 text-green-600" />
											</div>
											<div className="flex items-center justify-between">
												<span className="text-sm">Custom Filtering</span>
												<Check className="h-4 w-4 text-green-600" />
											</div>
											<div className="flex items-center justify-between">
												<span className="text-sm">Empty States</span>
												<Check className="h-4 w-4 text-green-600" />
											</div>
										</div>
									</CardContent>
								</Card>
							</div>
						</div>

						{/* Usage Guidelines */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Settings className="w-5 h-5" />
									Usage Guidelines
								</CardTitle>
								<CardDescription>Best practices for implementing command components</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div>
										<h4 className="font-semibold mb-2">When to Use</h4>
										<ul className="space-y-1 text-sm text-muted-foreground">
											<li>• For quick navigation and action discovery</li>
											<li>• When you have many features or pages to access</li>
											<li>• For power users who prefer keyboard workflows</li>
											<li>• As a search interface for complex applications</li>
										</ul>
									</div>
									<Separator />
									<div>
										<h4 className="font-semibold mb-2">Design Principles</h4>
										<ul className="space-y-1 text-sm text-muted-foreground">
											<li>• Keep item labels clear and concise</li>
											<li>• Group related items together</li>
											<li>• Use consistent iconography</li>
											<li>• Provide keyboard shortcuts for frequent actions</li>
											<li>• Include helpful descriptions for complex actions</li>
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
									<p><strong>Keyboard Shortcuts:</strong> {enableShortcuts ? 'Enabled' : 'Disabled'}</p>
									<p><strong>Show Descriptions:</strong> {showDescriptions ? 'Yes' : 'No'}</p>
								</div>
								<div>
									<p><strong>Available Commands:</strong> {suggestions.length + navigation.length + quickActions.length}</p>
									<p><strong>Shortcut Keys:</strong> ⌘K, ⌘⇧K, ⌘T</p>
								</div>
							</div>
						</div>

						{/* Command Dialog Components */}
						<BasicCommandDialog open={basicOpen} onOpenChange={setBasicOpen} />
						<AdvancedCommandDialog open={advancedOpen} onOpenChange={setAdvancedOpen} />
						<TeamCommandDialog open={teamOpen} onOpenChange={setTeamOpen} />
					</div>
				}
			/>
		</Fragment>
	)
}