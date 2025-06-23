import { Fragment, useState } from 'react'
import {
	Button,
	Avatar,
	AvatarImage,
	AvatarFallback,
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Badge,
	Separator,
	Switch,
	Label
} from '@rs-kit/ui-kit'
import {
	BadgeCheckIcon,
	BellIcon,
	ChevronsUpDownIcon,
	CreditCardIcon,
	LogOut,
	LogOutIcon,
	MoreHorizontalIcon,
	PencilIcon,
	Settings2Icon,
	ShareIcon,
	SparklesIcon,
	TrashIcon,
	UserIcon,
	HomeIcon,
	FolderIcon,
	FileIcon,
	SearchIcon,
	DownloadIcon,
	UploadIcon,
	CopyIcon,
	CutIcon,
	ClipboardPasteIcon,
	EyeIcon,
	EyeOffIcon,
	StarIcon,
	HeartIcon,
	BookmarkIcon,
	FlagIcon,
	ArchiveIcon,
	RefreshCwIcon,
	SettingsIcon,
	HelpCircleIcon,
	InfoIcon,
	CheckIcon,
	XIcon,
	PlusIcon,
	MinusIcon,
	EditIcon,
	SaveIcon,
	FilterIcon,
	SortAscIcon,
	SortDescIcon,
	GridIcon,
	ListIcon,
	CalendarIcon,
	ClockIcon,
	MailIcon,
	PhoneIcon,
	GlobeIcon,
	LockIcon,
	UnlockIcon,
	ShieldIcon
} from 'lucide-react'
import { ComponentDoc } from '@/components/ComponentDoc'

// Action Menu for items
const ActionMenu = ({ itemName = "Item" }: { itemName?: string }) => {
	const [isBookmarked, setIsBookmarked] = useState(false)
	const [isStarred, setIsStarred] = useState(false)

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon">
					<MoreHorizontalIcon className="w-4 h-4" />
					<span className="sr-only">Open menu</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-56">
				<DropdownMenuLabel>{itemName} Actions</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<EyeIcon className="w-4 h-4 mr-2" />
						View Details
					</DropdownMenuItem>
					<DropdownMenuItem>
						<EditIcon className="w-4 h-4 mr-2" />
						Edit
						<DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<CopyIcon className="w-4 h-4 mr-2" />
						Duplicate
						<DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuCheckboxItem checked={isStarred} onCheckedChange={setIsStarred}>
						<StarIcon className="w-4 h-4 mr-2" />
						Add to Favorites
					</DropdownMenuCheckboxItem>
					<DropdownMenuCheckboxItem checked={isBookmarked} onCheckedChange={setIsBookmarked}>
						<BookmarkIcon className="w-4 h-4 mr-2" />
						Bookmark
					</DropdownMenuCheckboxItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<ShareIcon className="w-4 h-4 mr-2" />
						Share
					</DropdownMenuItem>
					<DropdownMenuSub>
						<DropdownMenuSubTrigger>
							<DownloadIcon className="w-4 h-4 mr-2" />
							Export
						</DropdownMenuSubTrigger>
						<DropdownMenuPortal>
							<DropdownMenuSubContent>
								<DropdownMenuItem>
									<FileIcon className="w-4 h-4 mr-2" />
									PDF
								</DropdownMenuItem>
								<DropdownMenuItem>
									<FileIcon className="w-4 h-4 mr-2" />
									CSV
								</DropdownMenuItem>
								<DropdownMenuItem>
									<FileIcon className="w-4 h-4 mr-2" />
									JSON
								</DropdownMenuItem>
							</DropdownMenuSubContent>
						</DropdownMenuPortal>
					</DropdownMenuSub>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem variant="destructive">
					<TrashIcon className="w-4 h-4 mr-2" />
					Delete
					<DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

// Filter Menu
const FilterMenu = () => {
	const [filters, setFilters] = useState({
		status: 'all',
		priority: 'all',
		assignee: 'all',
		showCompleted: true,
		showArchived: false,
		onlyStarred: false
	})

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">
					<FilterIcon className="w-4 h-4 mr-2" />
					Filters
					<Badge variant="secondary" className="ml-2">
						{Object.values(filters).filter(v => v !== 'all' && v !== true).length}
					</Badge>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-64" align="start">
				<DropdownMenuLabel>Filter Options</DropdownMenuLabel>
				<DropdownMenuSeparator />
				
				{/* Status Filter */}
				<DropdownMenuGroup>
					<DropdownMenuLabel className="text-xs font-semibold text-muted-foreground">STATUS</DropdownMenuLabel>
					<DropdownMenuRadioGroup value={filters.status} onValueChange={(value) => setFilters({...filters, status: value})}>
						<DropdownMenuRadioItem value="all">All Status</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="active">Active</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="pending">Pending</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="completed">Completed</DropdownMenuRadioItem>
					</DropdownMenuRadioGroup>
				</DropdownMenuGroup>
				
				<DropdownMenuSeparator />
				
				{/* Priority Filter */}
				<DropdownMenuGroup>
					<DropdownMenuLabel className="text-xs font-semibold text-muted-foreground">PRIORITY</DropdownMenuLabel>
					<DropdownMenuRadioGroup value={filters.priority} onValueChange={(value) => setFilters({...filters, priority: value})}>
						<DropdownMenuRadioItem value="all">All Priorities</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="high">High</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="medium">Medium</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="low">Low</DropdownMenuRadioItem>
					</DropdownMenuRadioGroup>
				</DropdownMenuGroup>
				
				<DropdownMenuSeparator />
				
				{/* View Options */}
				<DropdownMenuGroup>
					<DropdownMenuLabel className="text-xs font-semibold text-muted-foreground">VIEW OPTIONS</DropdownMenuLabel>
					<DropdownMenuCheckboxItem 
						checked={filters.showCompleted} 
						onCheckedChange={(checked) => setFilters({...filters, showCompleted: checked})}
					>
						<CheckIcon className="w-4 h-4 mr-2" />
						Show Completed
					</DropdownMenuCheckboxItem>
					<DropdownMenuCheckboxItem 
						checked={filters.showArchived} 
						onCheckedChange={(checked) => setFilters({...filters, showArchived: checked})}
					>
						<ArchiveIcon className="w-4 h-4 mr-2" />
						Show Archived
					</DropdownMenuCheckboxItem>
					<DropdownMenuCheckboxItem 
						checked={filters.onlyStarred} 
						onCheckedChange={(checked) => setFilters({...filters, onlyStarred: checked})}
					>
						<StarIcon className="w-4 h-4 mr-2" />
						Only Starred
					</DropdownMenuCheckboxItem>
				</DropdownMenuGroup>
				
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={() => setFilters({
					status: 'all',
					priority: 'all',
					assignee: 'all',
					showCompleted: true,
					showArchived: false,
					onlyStarred: false
				})}>
					<RefreshCwIcon className="w-4 h-4 mr-2" />
					Reset Filters
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

// Sort Menu
const SortMenu = () => {
	const [sortBy, setSortBy] = useState('name')
	const [sortOrder, setSortOrder] = useState('asc')

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">
					{sortOrder === 'asc' ? 
						<SortAscIcon className="w-4 h-4 mr-2" /> : 
						<SortDescIcon className="w-4 h-4 mr-2" />
					}
					Sort
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-48" align="start">
				<DropdownMenuLabel>Sort Options</DropdownMenuLabel>
				<DropdownMenuSeparator />
				
				<DropdownMenuGroup>
					<DropdownMenuLabel className="text-xs font-semibold text-muted-foreground">SORT BY</DropdownMenuLabel>
					<DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
						<DropdownMenuRadioItem value="name">Name</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="date">Date Created</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="modified">Last Modified</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="size">Size</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="priority">Priority</DropdownMenuRadioItem>
					</DropdownMenuRadioGroup>
				</DropdownMenuGroup>
				
				<DropdownMenuSeparator />
				
				<DropdownMenuGroup>
					<DropdownMenuLabel className="text-xs font-semibold text-muted-foreground">ORDER</DropdownMenuLabel>
					<DropdownMenuRadioGroup value={sortOrder} onValueChange={setSortOrder}>
						<DropdownMenuRadioItem value="asc">
							<SortAscIcon className="w-4 h-4 mr-2" />
							Ascending
						</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="desc">
							<SortDescIcon className="w-4 h-4 mr-2" />
							Descending
						</DropdownMenuRadioItem>
					</DropdownMenuRadioGroup>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

// View Menu
const ViewMenu = () => {
	const [viewMode, setViewMode] = useState('grid')
	const [showPreview, setShowPreview] = useState(true)
	const [showSidebar, setShowSidebar] = useState(false)
	const [density, setDensity] = useState('comfortable')

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">
					{viewMode === 'grid' ? 
						<GridIcon className="w-4 h-4 mr-2" /> : 
						<ListIcon className="w-4 h-4 mr-2" />
					}
					View
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-48" align="start">
				<DropdownMenuLabel>View Options</DropdownMenuLabel>
				<DropdownMenuSeparator />
				
				<DropdownMenuGroup>
					<DropdownMenuLabel className="text-xs font-semibold text-muted-foreground">LAYOUT</DropdownMenuLabel>
					<DropdownMenuRadioGroup value={viewMode} onValueChange={setViewMode}>
						<DropdownMenuRadioItem value="grid">
							<GridIcon className="w-4 h-4 mr-2" />
							Grid View
						</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="list">
							<ListIcon className="w-4 h-4 mr-2" />
							List View
						</DropdownMenuRadioItem>
					</DropdownMenuRadioGroup>
				</DropdownMenuGroup>
				
				<DropdownMenuSeparator />
				
				<DropdownMenuGroup>
					<DropdownMenuLabel className="text-xs font-semibold text-muted-foreground">DENSITY</DropdownMenuLabel>
					<DropdownMenuRadioGroup value={density} onValueChange={setDensity}>
						<DropdownMenuRadioItem value="compact">Compact</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="comfortable">Comfortable</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="spacious">Spacious</DropdownMenuRadioItem>
					</DropdownMenuRadioGroup>
				</DropdownMenuGroup>
				
				<DropdownMenuSeparator />
				
				<DropdownMenuGroup>
					<DropdownMenuLabel className="text-xs font-semibold text-muted-foreground">PANELS</DropdownMenuLabel>
					<DropdownMenuCheckboxItem checked={showPreview} onCheckedChange={setShowPreview}>
						<EyeIcon className="w-4 h-4 mr-2" />
						Show Preview
					</DropdownMenuCheckboxItem>
					<DropdownMenuCheckboxItem checked={showSidebar} onCheckedChange={setShowSidebar}>
						<FolderIcon className="w-4 h-4 mr-2" />
						Show Sidebar
					</DropdownMenuCheckboxItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default function DropdownMenuSample() {
	const [showAdvanced, setShowAdvanced] = useState(false)

	return (
		<Fragment>
			<ComponentDoc
				title="Dropdown Menu"
				description="Context menus and action lists that appear on demand. Perfect for providing quick access to actions, filters, and settings without cluttering the interface."
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
							<Badge variant="outline">{showAdvanced ? '9' : '6'} Examples</Badge>
						</div>

						{/* Basic Menu Examples */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Basic Menus</h3>
							<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<MoreHorizontalIcon className="w-5 h-5" />
											Action Menu
										</CardTitle>
										<CardDescription>Context actions for items with sub-menus</CardDescription>
									</CardHeader>
									<CardContent>
										<ActionMenu itemName="Project File" />
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<FilterIcon className="w-5 h-5" />
											Filter Menu
										</CardTitle>
										<CardDescription>Complex filtering with radio groups and checkboxes</CardDescription>
									</CardHeader>
									<CardContent>
										<FilterMenu />
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<SortAscIcon className="w-5 h-5" />
											Sort Menu
										</CardTitle>
										<CardDescription>Sorting options with dynamic icons</CardDescription>
									</CardHeader>
									<CardContent>
										<SortMenu />
									</CardContent>
								</Card>
							</div>
						</div>

						{/* User Menus */}
						<div>
							<h3 className="text-lg font-semibold mb-4">User Menus</h3>
							<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<UserIcon className="w-5 h-5" />
											Profile Menu
										</CardTitle>
										<CardDescription>User account menu with avatar and details</CardDescription>
									</CardHeader>
									<CardContent>
										<DropdownMenuWithAvatar />
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<UserIcon className="w-5 h-5" />
											Avatar Only
										</CardTitle>
										<CardDescription>Compact avatar-only trigger</CardDescription>
									</CardHeader>
									<CardContent>
										<DropdownMenuAvatarOnly />
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<GridIcon className="w-5 h-5" />
											View Menu
										</CardTitle>
										<CardDescription>Layout and display options</CardDescription>
									</CardHeader>
									<CardContent>
										<ViewMenu />
									</CardContent>
								</Card>
							</div>
						</div>

						{/* Advanced Examples */}
						{showAdvanced && (
							<>
								<div>
									<h3 className="text-lg font-semibold mb-4">Advanced Examples</h3>
									<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
										<Card>
											<CardHeader>
												<CardTitle className="flex items-center gap-2">
													<SettingsIcon className="w-5 h-5" />
													Basic Menu
												</CardTitle>
												<CardDescription>Simple menu with shortcuts and groups</CardDescription>
											</CardHeader>
											<CardContent>
												<DropdownMenuSimple />
											</CardContent>
										</Card>

										<Card>
											<CardHeader>
												<CardTitle className="flex items-center gap-2">
													<CheckIcon className="w-5 h-5" />
													Checkbox Menu
												</CardTitle>
												<CardDescription>Menu with checkbox and radio items</CardDescription>
											</CardHeader>
											<CardContent>
												<DropdownMenuCheckboxes />
											</CardContent>
										</Card>

										<Card>
											<CardHeader>
												<CardTitle className="flex items-center gap-2">
													<TrashIcon className="w-5 h-5" />
													Destructive Menu
												</CardTitle>
												<CardDescription>Menu with destructive action styling</CardDescription>
											</CardHeader>
											<CardContent>
												<DropdownMenuIconColor />
											</CardContent>
										</Card>
									</div>
								</div>
							</>
						)}

						{/* Usage Guidelines */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<InfoIcon className="w-5 h-5" />
									Usage Guidelines
								</CardTitle>
								<CardDescription>Best practices for implementing dropdown menus</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div>
										<h4 className="font-semibold mb-2">When to Use</h4>
										<ul className="space-y-1 text-sm text-muted-foreground">
											<li>• For contextual actions on specific items</li>
											<li>• When you need to save space in the interface</li>
											<li>• For filtering and sorting large datasets</li>
											<li>• To provide secondary actions without page navigation</li>
											<li>• For user account and profile management</li>
										</ul>
									</div>
									<Separator />
									<div>
										<h4 className="font-semibold mb-2">Design Principles</h4>
										<ul className="space-y-1 text-sm text-muted-foreground">
											<li>• Group related actions with separators</li>
											<li>• Use icons consistently for better recognition</li>
											<li>• Place destructive actions at the bottom</li>
											<li>• Include keyboard shortcuts for power users</li>
											<li>• Provide clear visual hierarchy with labels</li>
											<li>• Keep menu items concise and actionable</li>
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
									<p><strong>Total Examples:</strong> {showAdvanced ? '9' : '6'}</p>
								</div>
								<div>
									<p><strong>Menu Types:</strong> Action, Filter, Sort, View, User{showAdvanced ? ', Basic, Checkbox, Radio' : ''}</p>
									<p><strong>Features:</strong> Sub-menus, Icons, Shortcuts, State Management</p>
								</div>
							</div>
						</div>
					</div>
				}
			/>
		</Fragment>
	)
}

// Basic Menu with Icons and Shortcuts (preserved from original)
function DropdownMenuSimple() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">
					<SettingsIcon className="w-4 h-4 mr-2" />
					Account Menu
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start" className="w-56">
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<UserIcon className="w-4 h-4 mr-2" />
						Profile
						<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<CreditCardIcon className="w-4 h-4 mr-2" />
						Billing
						<DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<SettingsIcon className="w-4 h-4 mr-2" />
						Settings
						<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<HelpCircleIcon className="w-4 h-4 mr-2" />
						Keyboard shortcuts
						<DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<UserIcon className="w-4 h-4 mr-2" />
						Team
					</DropdownMenuItem>
					<DropdownMenuSub>
						<DropdownMenuSubTrigger>
							<MailIcon className="w-4 h-4 mr-2" />
							Invite users
						</DropdownMenuSubTrigger>
						<DropdownMenuPortal>
							<DropdownMenuSubContent>
								<DropdownMenuItem>
									<MailIcon className="w-4 h-4 mr-2" />
									Email
								</DropdownMenuItem>
								<DropdownMenuItem>
									<PhoneIcon className="w-4 h-4 mr-2" />
									Message
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem>
									<PlusIcon className="w-4 h-4 mr-2" />
									More...
								</DropdownMenuItem>
							</DropdownMenuSubContent>
						</DropdownMenuPortal>
					</DropdownMenuSub>
					<DropdownMenuItem>
						<PlusIcon className="w-4 h-4 mr-2" />
						New Team
						<DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<GlobeIcon className="w-4 h-4 mr-2" />
					GitHub
				</DropdownMenuItem>
				<DropdownMenuItem>
					<HelpCircleIcon className="w-4 h-4 mr-2" />
					Support
				</DropdownMenuItem>
				<DropdownMenuItem disabled>
					<LockIcon className="w-4 h-4 mr-2" />
					API
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<LogOut className="w-4 h-4 mr-2" />
					Log out
					<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

// Enhanced Checkbox Menu (preserved from original but enhanced)
function DropdownMenuCheckboxes() {
	const [showStatusBar, setShowStatusBar] = useState(true)
	const [showActivityBar, setShowActivityBar] = useState(false)
	const [showPanel, setShowPanel] = useState(false)

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">
					<CheckIcon className="w-4 h-4 mr-2" />
					Settings
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start" className="w-56">
				<DropdownMenuGroup>
					<DropdownMenuLabel>Account</DropdownMenuLabel>
					<DropdownMenuItem>
						<UserIcon className="w-4 h-4 mr-2" /> 
						Profile
					</DropdownMenuItem>
					<DropdownMenuItem>
						<CreditCardIcon className="w-4 h-4 mr-2" /> 
						Billing
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Settings2Icon className="w-4 h-4 mr-2" /> 
						Settings
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuLabel>Interface</DropdownMenuLabel>
					<DropdownMenuCheckboxItem checked={showStatusBar} onCheckedChange={setShowStatusBar}>
						Status Bar
					</DropdownMenuCheckboxItem>
					<DropdownMenuCheckboxItem checked={showActivityBar} onCheckedChange={setShowActivityBar} disabled>
						Activity Bar
					</DropdownMenuCheckboxItem>
					<DropdownMenuCheckboxItem checked={showPanel} onCheckedChange={setShowPanel}>
						Panel
					</DropdownMenuCheckboxItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<LogOutIcon className="w-4 h-4 mr-2" /> 
						Sign Out
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

// Enhanced Radio Group Menu (preserved from original but enhanced)
function DropdownMenuRadioGroupDemo() {
	const [position, setPosition] = useState('bottom')

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">
					<SettingsIcon className="w-4 h-4 mr-2" />
					Position: {position}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start" className="w-56">
				<DropdownMenuLabel>Panel Position</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
						<DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="left">Left</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="right" disabled>
							Right (Coming Soon)
						</DropdownMenuRadioItem>
					</DropdownMenuRadioGroup>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

// User Profile Menu with Avatar (preserved from original but enhanced)
function DropdownMenuWithAvatar() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" className="h-12 justify-start px-2 md:max-w-[240px]">
					<Avatar className="h-8 w-8">
						<AvatarImage src="https://github.com/shadcn.png" alt="Shadcn" />
						<AvatarFallback className="rounded-lg">CN</AvatarFallback>
					</Avatar>
					<div className="grid flex-1 text-left text-sm leading-tight">
						<span className="truncate font-semibold">Chris Newton</span>
						<span className="text-muted-foreground truncate text-xs">chris@example.com</span>
					</div>
					<ChevronsUpDownIcon className="text-muted-foreground ml-auto w-4 h-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-64" align="start">
				<DropdownMenuLabel className="p-0 font-normal">
					<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
						<Avatar className="h-8 w-8">
							<AvatarImage src="https://github.com/shadcn.png" alt="Shadcn" />
							<AvatarFallback className="rounded-lg">CN</AvatarFallback>
						</Avatar>
						<div className="grid flex-1 text-left text-sm leading-tight">
							<span className="truncate font-semibold">Chris Newton</span>
							<span className="text-muted-foreground truncate text-xs">chris@example.com</span>
							<Badge variant="outline" className="mt-1 w-fit text-xs">Pro Plan</Badge>
						</div>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<SparklesIcon className="w-4 h-4 mr-2" />
						Upgrade to Pro
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<BadgeCheckIcon className="w-4 h-4 mr-2" />
						Account
					</DropdownMenuItem>
					<DropdownMenuItem>
						<CreditCardIcon className="w-4 h-4 mr-2" />
						Billing
					</DropdownMenuItem>
					<DropdownMenuItem>
						<BellIcon className="w-4 h-4 mr-2" />
						Notifications
					</DropdownMenuItem>
					<DropdownMenuItem>
						<ShieldIcon className="w-4 h-4 mr-2" />
						Security
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<HelpCircleIcon className="w-4 h-4 mr-2" />
					Help & Support
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<LogOut className="w-4 h-4 mr-2" />
					Sign Out
					<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

// Compact Avatar Menu (preserved from original but enhanced)
function DropdownMenuAvatarOnly() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="size-10 rounded-full p-0 hover:bg-gray-100">
					<Avatar className="h-8 w-8">
						<AvatarImage src="https://github.com/leerob.png" alt="Lee Robinson" />
						<AvatarFallback className="rounded-full">LR</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="end">
				<DropdownMenuLabel className="p-0 font-normal">
					<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
						<Avatar className="h-8 w-8">
							<AvatarImage src="https://github.com/leerob.png" alt="Lee Robinson" />
							<AvatarFallback className="rounded-full">LR</AvatarFallback>
						</Avatar>
						<div className="grid flex-1 text-left text-sm leading-tight">
							<span className="truncate font-semibold">Lee Robinson</span>
							<span className="text-muted-foreground truncate text-xs">lee@vercel.com</span>
						</div>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<UserIcon className="w-4 h-4 mr-2" />
						View Profile
					</DropdownMenuItem>
					<DropdownMenuItem>
						<EditIcon className="w-4 h-4 mr-2" />
						Edit Profile
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<BadgeCheckIcon className="w-4 h-4 mr-2" />
						Account Settings
					</DropdownMenuItem>
					<DropdownMenuItem>
						<BellIcon className="w-4 h-4 mr-2" />
						Notifications
					</DropdownMenuItem>
					<DropdownMenuItem>
						<ShieldIcon className="w-4 h-4 mr-2" />
						Privacy
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<HelpCircleIcon className="w-4 h-4 mr-2" />
					Help Center
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<LogOut className="w-4 h-4 mr-2" />
					Sign Out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

// Destructive Action Menu (preserved from original but enhanced)
function DropdownMenuIconColor() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon">
					<MoreHorizontalIcon className="w-4 h-4" />
					<span className="sr-only">Open options menu</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-48">
				<DropdownMenuLabel>Item Actions</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<EyeIcon className="w-4 h-4 mr-2" />
						View
					</DropdownMenuItem>
					<DropdownMenuItem>
						<PencilIcon className="w-4 h-4 mr-2" />
						Edit
						<DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<CopyIcon className="w-4 h-4 mr-2" />
						Duplicate
						<DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<ShareIcon className="w-4 h-4 mr-2" />
						Share
					</DropdownMenuItem>
					<DropdownMenuItem>
						<ArchiveIcon className="w-4 h-4 mr-2" />
						Archive
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem variant="destructive">
					<TrashIcon className="w-4 h-4 mr-2" />
					Delete
					<DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
