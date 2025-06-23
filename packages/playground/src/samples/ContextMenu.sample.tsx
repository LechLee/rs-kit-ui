import { Fragment, useState } from 'react'
import {
	FileIcon,
	FolderIcon,
	ImageIcon,
	VideoIcon,
	MoreHorizontalIcon,
	CopyIcon,
	Scissors,
	ClipboardPaste,
	TrashIcon,
	EditIcon,
	ShareIcon,
	DownloadIcon,
	InfoIcon,
	ZoomInIcon,
	ZoomOutIcon,
	RotateCcwIcon,
	RotateCwIcon,
	PlusIcon,
	UsersIcon,
	SettingsIcon,
	HelpCircleIcon,
	HeartIcon,
	StarIcon,
	BookmarkIcon,
	TagIcon,
	MapPinIcon,
	CalendarIcon,
	ClockIcon,
	RefreshCwIcon,
	PrinterIcon,
	MailIcon,
	MessageCircleIcon,
	PhoneIcon,
	UserPlusIcon,
	LinkIcon,
	ExternalLinkIcon,
	ArchiveIcon,
	LockIcon,
	EyeIcon,
	EyeOffIcon,
	Volume2Icon,
	VolumeXIcon,
	PlayIcon,
	PauseIcon,
	SkipForwardIcon,
	SkipBackIcon,
	MonitorIcon,
	SmartphoneIcon,
	CheckIcon,
	XIcon
} from 'lucide-react'
import {
	ContextMenu,
	ContextMenuCheckboxItem,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuLabel,
	ContextMenuRadioGroup,
	ContextMenuRadioItem,
	ContextMenuSeparator,
	ContextMenuShortcut,
	ContextMenuSub,
	ContextMenuSubContent,
	ContextMenuSubTrigger,
	ContextMenuTrigger,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Badge,
	Button,
	Switch,
	Label,
	Separator,
	Avatar,
	AvatarFallback,
	AvatarImage
} from '@rs-kit/ui-kit'
import { ComponentDoc } from '@/components/ComponentDoc'

// Sample data for different context menu scenarios
const fileItems = [
	{ id: 1, name: 'Document.pdf', type: 'pdf', size: '2.4 MB', modified: '2 hours ago' },
	{ id: 2, name: 'Presentation.pptx', type: 'presentation', size: '15.7 MB', modified: '1 day ago' },
	{ id: 3, name: 'Image.jpg', type: 'image', size: '3.2 MB', modified: '3 days ago' },
	{ id: 4, name: 'Video.mp4', type: 'video', size: '125.8 MB', modified: '1 week ago' }
]

const userProfiles = [
	{ id: 1, name: 'Alice Johnson', role: 'Frontend Developer', avatar: '/avatars/alice.jpg', status: 'online' },
	{ id: 2, name: 'Bob Smith', role: 'Backend Developer', avatar: '/avatars/bob.jpg', status: 'away' },
	{ id: 3, name: 'Carol Williams', role: 'Designer', avatar: '/avatars/carol.jpg', status: 'offline' }
]

// Basic Context Menu
const BasicContextMenu = () => {
	const [showShortcuts, setShowShortcuts] = useState(true)
	
	return (
		<div className="space-y-4">
			<div className="flex items-center gap-2">
				<Switch id="show-shortcuts" checked={showShortcuts} onCheckedChange={setShowShortcuts} />
				<Label htmlFor="show-shortcuts" className="text-sm">Show keyboard shortcuts</Label>
			</div>
			<ContextMenu>
				<ContextMenuTrigger className="flex h-[120px] w-full items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 text-sm text-muted-foreground hover:bg-gray-100 cursor-pointer">
					Right-click here for basic menu
				</ContextMenuTrigger>
				<ContextMenuContent className="w-64">
					<ContextMenuItem>
						<CopyIcon className="w-4 h-4 mr-2" />
						Copy
						{showShortcuts && <ContextMenuShortcut>⌘C</ContextMenuShortcut>}
					</ContextMenuItem>
					<ContextMenuItem>
						<Scissors className="w-4 h-4 mr-2" />
						Cut
						{showShortcuts && <ContextMenuShortcut>⌘X</ContextMenuShortcut>}
					</ContextMenuItem>
					<ContextMenuItem>
						<ClipboardPaste className="w-4 h-4 mr-2" />
						Paste
						{showShortcuts && <ContextMenuShortcut>⌘V</ContextMenuShortcut>}
					</ContextMenuItem>
					<ContextMenuSeparator />
					<ContextMenuItem>
						<EditIcon className="w-4 h-4 mr-2" />
						Edit
						{showShortcuts && <ContextMenuShortcut>⌘E</ContextMenuShortcut>}
					</ContextMenuItem>
					<ContextMenuItem>
						<ShareIcon className="w-4 h-4 mr-2" />
						Share
					</ContextMenuItem>
					<ContextMenuSeparator />
					<ContextMenuItem variant="destructive">
						<TrashIcon className="w-4 h-4 mr-2" />
						Delete
						{showShortcuts && <ContextMenuShortcut>⌘⌫</ContextMenuShortcut>}
					</ContextMenuItem>
				</ContextMenuContent>
			</ContextMenu>
		</div>
	)
}

// File Manager Context Menu
const FileManagerContextMenu = () => {
	const [selectedFile, setSelectedFile] = useState(fileItems[0])
	const [favoriteItems, setFavoriteItems] = useState(new Set(['Document.pdf']))
	
	const getFileIcon = (type: string) => {
		switch (type) {
			case 'pdf': return <FileIcon className="w-4 h-4 text-red-600" />
			case 'presentation': return <FileIcon className="w-4 h-4 text-orange-600" />
			case 'image': return <ImageIcon className="w-4 h-4 text-green-600" />
			case 'video': return <VideoIcon className="w-4 h-4 text-blue-600" />
			default: return <FileIcon className="w-4 h-4 text-gray-600" />
		}
	}
	
	const toggleFavorite = (fileName: string) => {
		setFavoriteItems(prev => {
			const newSet = new Set(prev)
			if (newSet.has(fileName)) {
				newSet.delete(fileName)
			} else {
				newSet.add(fileName)
			}
			return newSet
		})
	}
	
	return (
		<div className="space-y-4">
			<div className="grid grid-cols-2 gap-3">
				{fileItems.map((file) => (
					<ContextMenu key={file.id}>
						<ContextMenuTrigger asChild>
							<div 
								className={`p-3 border rounded-lg cursor-pointer hover:bg-gray-50 ${selectedFile.id === file.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
								onClick={() => setSelectedFile(file)}
							>
								<div className="flex items-center gap-2 mb-2">
									{getFileIcon(file.type)}
									<span className="text-sm font-medium truncate">{file.name}</span>
									{favoriteItems.has(file.name) && <StarIcon className="w-3 h-3 text-yellow-500 fill-current" />}
								</div>
								<div className="text-xs text-muted-foreground">
									<div>{file.size}</div>
									<div>{file.modified}</div>
								</div>
							</div>
						</ContextMenuTrigger>
						<ContextMenuContent className="w-56">
							<ContextMenuItem>
								<EyeIcon className="w-4 h-4 mr-2" />
								Open
								<ContextMenuShortcut>↵</ContextMenuShortcut>
							</ContextMenuItem>
							<ContextMenuItem>
								<ExternalLinkIcon className="w-4 h-4 mr-2" />
								Open with...
							</ContextMenuItem>
							<ContextMenuSeparator />
							<ContextMenuItem>
								<CopyIcon className="w-4 h-4 mr-2" />
								Copy
								<ContextMenuShortcut>⌘C</ContextMenuShortcut>
							</ContextMenuItem>
							<ContextMenuItem>
								<Scissors className="w-4 h-4 mr-2" />
								Cut
								<ContextMenuShortcut>⌘X</ContextMenuShortcut>
							</ContextMenuItem>
							<ContextMenuItem>
								<EditIcon className="w-4 h-4 mr-2" />
								Rename
								<ContextMenuShortcut>F2</ContextMenuShortcut>
							</ContextMenuItem>
							<ContextMenuSeparator />
							<ContextMenuSub>
								<ContextMenuSubTrigger>
									<ShareIcon className="w-4 h-4 mr-2" />
									Share
								</ContextMenuSubTrigger>
								<ContextMenuSubContent className="w-48">
									<ContextMenuItem>
										<MailIcon className="w-4 h-4 mr-2" />
										Send via Email
									</ContextMenuItem>
									<ContextMenuItem>
										<LinkIcon className="w-4 h-4 mr-2" />
										Copy Link
									</ContextMenuItem>
									<ContextMenuItem>
										<UsersIcon className="w-4 h-4 mr-2" />
										Share with Team
									</ContextMenuItem>
								</ContextMenuSubContent>
							</ContextMenuSub>
							<ContextMenuItem>
								<DownloadIcon className="w-4 h-4 mr-2" />
								Download
								<ContextMenuShortcut>⌘D</ContextMenuShortcut>
							</ContextMenuItem>
							<ContextMenuSeparator />
							<ContextMenuItem onClick={() => toggleFavorite(file.name)}>
								{favoriteItems.has(file.name) ? (
									<>
										<StarIcon className="w-4 h-4 mr-2 text-yellow-500 fill-current" />
										Remove from Favorites
									</>
								) : (
									<>
										<StarIcon className="w-4 h-4 mr-2" />
										Add to Favorites
									</>
								)}
							</ContextMenuItem>
							<ContextMenuItem>
								<TagIcon className="w-4 h-4 mr-2" />
								Add Tags
							</ContextMenuItem>
							<ContextMenuSeparator />
							<ContextMenuItem>
								<InfoIcon className="w-4 h-4 mr-2" />
								Properties
								<ContextMenuShortcut>⌘I</ContextMenuShortcut>
							</ContextMenuItem>
							<ContextMenuSeparator />
							<ContextMenuItem variant="destructive">
								<TrashIcon className="w-4 h-4 mr-2" />
								Move to Trash
								<ContextMenuShortcut>⌘⌫</ContextMenuShortcut>
							</ContextMenuItem>
						</ContextMenuContent>
					</ContextMenu>
				))}
			</div>
		</div>
	)
}

// Image Viewer Context Menu
const ImageViewerContextMenu = () => {
	const [rotation, setRotation] = useState(0)
	const [zoom, setZoom] = useState(100)
	const [isFavorite, setIsFavorite] = useState(false)
	
	const rotateImage = (degrees: number) => {
		setRotation(prev => (prev + degrees) % 360)
	}
	
	const zoomImage = (factor: number) => {
		setZoom(prev => Math.max(25, Math.min(400, prev + factor)))
	}
	
	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between text-sm text-muted-foreground">
				<span>Zoom: {zoom}%</span>
				<span>Rotation: {rotation}°</span>
			</div>
			<ContextMenu>
				<ContextMenuTrigger asChild>
					<div className="relative h-48 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg border border-gray-200 overflow-hidden cursor-pointer">
						<div 
							className="absolute inset-4 bg-white rounded shadow-lg flex items-center justify-center text-gray-400 text-sm"
							style={{ 
								transform: `rotate(${rotation}deg) scale(${zoom / 100})`,
								transition: 'transform 0.3s ease'
							}}
						>
							<div className="text-center">
								<ImageIcon className="w-8 h-8 mx-auto mb-2" />
								Sample Image
								<br />
								Right-click for options
							</div>
						</div>
						{isFavorite && (
							<HeartIcon className="absolute top-2 right-2 w-5 h-5 text-red-500 fill-current" />
						)}
					</div>
				</ContextMenuTrigger>
				<ContextMenuContent className="w-56">
					<ContextMenuItem>
						<CopyIcon className="w-4 h-4 mr-2" />
						Copy Image
						<ContextMenuShortcut>⌘C</ContextMenuShortcut>
					</ContextMenuItem>
					<ContextMenuItem>
						<DownloadIcon className="w-4 h-4 mr-2" />
						Save Image As...
						<ContextMenuShortcut>⌘S</ContextMenuShortcut>
					</ContextMenuItem>
					<ContextMenuSeparator />
					<ContextMenuSub>
						<ContextMenuSubTrigger>
							<ZoomInIcon className="w-4 h-4 mr-2" />
							Zoom
						</ContextMenuSubTrigger>
						<ContextMenuSubContent className="w-40">
							<ContextMenuItem onClick={() => zoomImage(25)}>
								<ZoomInIcon className="w-4 h-4 mr-2" />
								Zoom In
								<ContextMenuShortcut>+</ContextMenuShortcut>
							</ContextMenuItem>
							<ContextMenuItem onClick={() => zoomImage(-25)}>
								<ZoomOutIcon className="w-4 h-4 mr-2" />
								Zoom Out
								<ContextMenuShortcut>-</ContextMenuShortcut>
							</ContextMenuItem>
							<ContextMenuSeparator />
							<ContextMenuItem onClick={() => setZoom(100)}>
								Reset Zoom
								<ContextMenuShortcut>⌘0</ContextMenuShortcut>
							</ContextMenuItem>
						</ContextMenuSubContent>
					</ContextMenuSub>
					<ContextMenuSub>
						<ContextMenuSubTrigger>
							<RotateCwIcon className="w-4 h-4 mr-2" />
							Rotate
						</ContextMenuSubTrigger>
						<ContextMenuSubContent className="w-44">
							<ContextMenuItem onClick={() => rotateImage(90)}>
								<RotateCwIcon className="w-4 h-4 mr-2" />
								Rotate Right
								<ContextMenuShortcut>⌘→</ContextMenuShortcut>
							</ContextMenuItem>
							<ContextMenuItem onClick={() => rotateImage(-90)}>
								<RotateCcwIcon className="w-4 h-4 mr-2" />
								Rotate Left
								<ContextMenuShortcut>⌘←</ContextMenuShortcut>
							</ContextMenuItem>
							<ContextMenuSeparator />
							<ContextMenuItem onClick={() => setRotation(0)}>
								Reset Rotation
							</ContextMenuItem>
						</ContextMenuSubContent>
					</ContextMenuSub>
					<ContextMenuSeparator />
					<ContextMenuItem onClick={() => setIsFavorite(!isFavorite)}>
						<HeartIcon className={`w-4 h-4 mr-2 ${isFavorite ? 'text-red-500 fill-current' : ''}`} />
						{isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
					</ContextMenuItem>
					<ContextMenuItem>
						<ShareIcon className="w-4 h-4 mr-2" />
						Share Image
					</ContextMenuItem>
					<ContextMenuSeparator />
					<ContextMenuItem>
						<EditIcon className="w-4 h-4 mr-2" />
						Edit in External App
					</ContextMenuItem>
					<ContextMenuItem>
						<InfoIcon className="w-4 h-4 mr-2" />
						Image Properties
					</ContextMenuItem>
				</ContextMenuContent>
			</ContextMenu>
		</div>
	)
}

// User Profile Context Menu
const UserProfileContextMenu = () => {
	const [selectedUser, setSelectedUser] = useState(userProfiles[0])
	const [blockedUsers, setBlockedUsers] = useState(new Set())
	const [mutedUsers, setMutedUsers] = useState(new Set())
	
	const getStatusColor = (status: string) => {
		switch (status) {
			case 'online': return 'bg-green-500'
			case 'away': return 'bg-yellow-500'
			case 'offline': return 'bg-gray-400'
			default: return 'bg-gray-400'
		}
	}
	
	const toggleBlock = (userId: number) => {
		setBlockedUsers(prev => {
			const newSet = new Set(prev)
			if (newSet.has(userId)) {
				newSet.delete(userId)
			} else {
				newSet.add(userId)
			}
			return newSet
		})
	}
	
	const toggleMute = (userId: number) => {
		setMutedUsers(prev => {
			const newSet = new Set(prev)
			if (newSet.has(userId)) {
				newSet.delete(userId)
			} else {
				newSet.add(userId)
			}
			return newSet
		})
	}
	
	return (
		<div className="space-y-4">
			<div className="grid grid-cols-1 gap-3">
				{userProfiles.map((user) => (
					<ContextMenu key={user.id}>
						<ContextMenuTrigger asChild>
							<div 
								className={`p-3 border rounded-lg cursor-pointer hover:bg-gray-50 ${selectedUser.id === user.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
								onClick={() => setSelectedUser(user)}
							>
								<div className="flex items-center gap-3">
									<div className="relative">
										<Avatar className="h-10 w-10">
											<AvatarImage src={user.avatar} alt={user.name} />
											<AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
										</Avatar>
										<div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(user.status)}`} />
									</div>
									<div className="flex-1">
										<div className="font-medium text-sm">{user.name}</div>
										<div className="text-xs text-muted-foreground">{user.role}</div>
									</div>
									<div className="flex gap-1">
										{blockedUsers.has(user.id) && <Badge variant="destructive" className="text-xs">Blocked</Badge>}
										{mutedUsers.has(user.id) && <Badge variant="secondary" className="text-xs">Muted</Badge>}
									</div>
								</div>
							</div>
						</ContextMenuTrigger>
						<ContextMenuContent className="w-52">
							<ContextMenuItem>
								<MessageCircleIcon className="w-4 h-4 mr-2" />
								Send Message
								<ContextMenuShortcut>⌘M</ContextMenuShortcut>
							</ContextMenuItem>
							<ContextMenuItem>
								<PhoneIcon className="w-4 h-4 mr-2" />
								Voice Call
								<ContextMenuShortcut>⌘K</ContextMenuShortcut>
							</ContextMenuItem>
							<ContextMenuItem>
								<VideoIcon className="w-4 h-4 mr-2" />
								Video Call
								<ContextMenuShortcut>⌘⇧K</ContextMenuShortcut>
							</ContextMenuItem>
							<ContextMenuSeparator />
							<ContextMenuItem>
								<EyeIcon className="w-4 h-4 mr-2" />
								View Profile
							</ContextMenuItem>
							<ContextMenuItem>
								<UserPlusIcon className="w-4 h-4 mr-2" />
								Add to Team
							</ContextMenuItem>
							<ContextMenuSeparator />
							<ContextMenuItem onClick={() => toggleMute(user.id)}>
								{mutedUsers.has(user.id) ? (
									<>
										<Volume2Icon className="w-4 h-4 mr-2" />
										Unmute
									</>
								) : (
									<>
										<VolumeXIcon className="w-4 h-4 mr-2" />
										Mute
									</>
								)}
							</ContextMenuItem>
							<ContextMenuSeparator />
							<ContextMenuSub>
								<ContextMenuSubTrigger>
									<SettingsIcon className="w-4 h-4 mr-2" />
									Manage
								</ContextMenuSubTrigger>
								<ContextMenuSubContent className="w-44">
									<ContextMenuItem>
										<TagIcon className="w-4 h-4 mr-2" />
										Add Label
									</ContextMenuItem>
									<ContextMenuItem>
										<MapPinIcon className="w-4 h-4 mr-2" />
										Set Location
									</ContextMenuItem>
									<ContextMenuItem>
										<CalendarIcon className="w-4 h-4 mr-2" />
										Schedule Meeting
									</ContextMenuItem>
									<ContextMenuSeparator />
									<ContextMenuItem>
										<ArchiveIcon className="w-4 h-4 mr-2" />
										Archive Chat
									</ContextMenuItem>
								</ContextMenuSubContent>
							</ContextMenuSub>
							<ContextMenuSeparator />
							<ContextMenuItem variant="destructive" onClick={() => toggleBlock(user.id)}>
								{blockedUsers.has(user.id) ? (
									<>
										<CheckIcon className="w-4 h-4 mr-2" />
										Unblock User
									</>
								) : (
									<>
										<XIcon className="w-4 h-4 mr-2" />
										Block User
									</>
								)}
							</ContextMenuItem>
						</ContextMenuContent>
					</ContextMenu>
				))}
			</div>
		</div>
	)
}

// Advanced Context Menu with Nested Options
const AdvancedContextMenu = () => {
	const [viewMode, setViewMode] = useState('list')
	const [sortBy, setSortBy] = useState('name')
	const [showHidden, setShowHidden] = useState(false)
	const [theme, setTheme] = useState('system')
	
	return (
		<ContextMenu>
			<ContextMenuTrigger className="flex h-[200px] w-full items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gradient-to-br from-blue-50 to-purple-50 text-sm text-muted-foreground hover:from-blue-100 hover:to-purple-100 cursor-pointer">
				<div className="text-center">
					<SettingsIcon className="w-8 h-8 mx-auto mb-2 text-gray-400" />
					Right-click for advanced options
					<div className="text-xs mt-2">
						View: {viewMode} | Sort: {sortBy} | Theme: {theme}
					</div>
				</div>
			</ContextMenuTrigger>
			<ContextMenuContent className="w-64">
				<ContextMenuLabel>View Options</ContextMenuLabel>
				<ContextMenuRadioGroup value={viewMode} onValueChange={setViewMode}>
					<ContextMenuRadioItem value="list">
						<FileIcon className="w-4 h-4 mr-2" />
						List View
					</ContextMenuRadioItem>
					<ContextMenuRadioItem value="grid">
						<MonitorIcon className="w-4 h-4 mr-2" />
						Grid View
					</ContextMenuRadioItem>
					<ContextMenuRadioItem value="card">
						<SmartphoneIcon className="w-4 h-4 mr-2" />
						Card View
					</ContextMenuRadioItem>
				</ContextMenuRadioGroup>
				<ContextMenuSeparator />
				<ContextMenuSub>
					<ContextMenuSubTrigger>
						<RefreshCwIcon className="w-4 h-4 mr-2" />
						Sort By
					</ContextMenuSubTrigger>
					<ContextMenuSubContent className="w-44">
						<ContextMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
							<ContextMenuRadioItem value="name">Name</ContextMenuRadioItem>
							<ContextMenuRadioItem value="size">Size</ContextMenuRadioItem>
							<ContextMenuRadioItem value="date">Date Modified</ContextMenuRadioItem>
							<ContextMenuRadioItem value="type">File Type</ContextMenuRadioItem>
						</ContextMenuRadioGroup>
					</ContextMenuSubContent>
				</ContextMenuSub>
				<ContextMenuSeparator />
				<ContextMenuCheckboxItem checked={showHidden} onCheckedChange={setShowHidden}>
					<EyeIcon className="w-4 h-4 mr-2" />
					Show Hidden Files
					<ContextMenuShortcut>⌘⇧.</ContextMenuShortcut>
				</ContextMenuCheckboxItem>
				<ContextMenuSeparator />
				<ContextMenuSub>
					<ContextMenuSubTrigger>
						<SettingsIcon className="w-4 h-4 mr-2" />
						Preferences
					</ContextMenuSubTrigger>
					<ContextMenuSubContent className="w-48">
						<ContextMenuLabel>Theme</ContextMenuLabel>
						<ContextMenuRadioGroup value={theme} onValueChange={setTheme}>
							<ContextMenuRadioItem value="light">Light</ContextMenuRadioItem>
							<ContextMenuRadioItem value="dark">Dark</ContextMenuRadioItem>
							<ContextMenuRadioItem value="system">System</ContextMenuRadioItem>
						</ContextMenuRadioGroup>
						<ContextMenuSeparator />
						<ContextMenuItem>
							<PrinterIcon className="w-4 h-4 mr-2" />
							Print Settings
						</ContextMenuItem>
						<ContextMenuItem>
							<HelpCircleIcon className="w-4 h-4 mr-2" />
							Keyboard Shortcuts
						</ContextMenuItem>
					</ContextMenuSubContent>
				</ContextMenuSub>
				<ContextMenuSeparator />
				<ContextMenuItem>
					<PlusIcon className="w-4 h-4 mr-2" />
					New Item
					<ContextMenuShortcut>⌘N</ContextMenuShortcut>
				</ContextMenuItem>
				<ContextMenuItem>
					<RefreshCwIcon className="w-4 h-4 mr-2" />
					Refresh
					<ContextMenuShortcut>F5</ContextMenuShortcut>
				</ContextMenuItem>
				<ContextMenuSeparator />
				<ContextMenuItem>
					<InfoIcon className="w-4 h-4 mr-2" />
					About
				</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
	)
}

export default function ContextMenuSample() {
	const [showAdvanced, setShowAdvanced] = useState(false)
	
	return (
		<Fragment>
			<ComponentDoc
				title="Context Menu"
				description="Interactive right-click menus that provide contextual actions and options. Perfect for file managers, image viewers, user interfaces, and complex applications with rich interactions."
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
									<Label htmlFor="show-advanced" className="text-sm">Show Advanced Example</Label>
								</div>
							</div>
							<Badge variant="outline">{showAdvanced ? '5' : '4'} Examples</Badge>
						</div>

						{/* Basic Context Menu */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Basic Context Menu</h3>
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<MoreHorizontalIcon className="w-5 h-5" />
										Basic Actions
									</CardTitle>
									<CardDescription>Standard context menu with common actions and keyboard shortcuts</CardDescription>
								</CardHeader>
								<CardContent>
									<BasicContextMenu />
								</CardContent>
							</Card>
						</div>

						{/* File Manager Context Menu */}
						<div>
							<h3 className="text-lg font-semibold mb-4">File Manager</h3>
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<FolderIcon className="w-5 h-5" />
										File Operations
									</CardTitle>
									<CardDescription>Rich file management context menus with nested actions and favorites</CardDescription>
								</CardHeader>
								<CardContent>
									<FileManagerContextMenu />
								</CardContent>
							</Card>
						</div>

						{/* Image Viewer Context Menu */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Image Viewer</h3>
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<ImageIcon className="w-5 h-5" />
										Image Actions
									</CardTitle>
									<CardDescription>Interactive image context menu with zoom, rotation, and favorites</CardDescription>
								</CardHeader>
								<CardContent>
									<ImageViewerContextMenu />
								</CardContent>
							</Card>
						</div>

						{/* User Profile Context Menu */}
						<div>
							<h3 className="text-lg font-semibold mb-4">User Profiles</h3>
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<UsersIcon className="w-5 h-5" />
										User Management
									</CardTitle>
									<CardDescription>User profile context menus with communication and management options</CardDescription>
								</CardHeader>
								<CardContent>
									<UserProfileContextMenu />
								</CardContent>
							</Card>
						</div>

						{/* Advanced Context Menu */}
						{showAdvanced && (
							<div>
								<h3 className="text-lg font-semibold mb-4">Advanced Configuration</h3>
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<SettingsIcon className="w-5 h-5" />
											Complex Options
										</CardTitle>
										<CardDescription>Advanced context menu with nested options, radio groups, and preferences</CardDescription>
									</CardHeader>
									<CardContent>
										<AdvancedContextMenu />
									</CardContent>
								</Card>
							</div>
						)}

						{/* Usage Guidelines */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<HelpCircleIcon className="w-5 h-5" />
									Usage Guidelines
								</CardTitle>
								<CardDescription>Best practices for implementing context menus</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div>
										<h4 className="font-semibold mb-2">When to Use</h4>
										<ul className="space-y-1 text-sm text-muted-foreground">
											<li>• For contextual actions on specific items or areas</li>
											<li>• When you need to save screen space</li>
											<li>• For power user workflows and shortcuts</li>
											<li>• When primary actions are already visible elsewhere</li>
										</ul>
									</div>
									<Separator />
									<div>
										<h4 className="font-semibold mb-2">Design Principles</h4>
										<ul className="space-y-1 text-sm text-muted-foreground">
											<li>• Keep menus focused and relevant to the context</li>
											<li>• Group related actions with separators</li>
											<li>• Use consistent iconography and terminology</li>
											<li>• Provide keyboard shortcuts for frequent actions</li>
											<li>• Place destructive actions at the bottom with visual distinction</li>
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
									<p><strong>Total Examples:</strong> {showAdvanced ? '5' : '4'}</p>
								</div>
								<div>
									<p><strong>Context Types:</strong> Basic, File Manager, Image Viewer, User Profiles{showAdvanced ? ', Advanced' : ''}</p>
									<p><strong>Features:</strong> Shortcuts, Icons, Nested Menus, State Management</p>
								</div>
							</div>
						</div>
					</div>
				}
			/>
		</Fragment>
	)
}
