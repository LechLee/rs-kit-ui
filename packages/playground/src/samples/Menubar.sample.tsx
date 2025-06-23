import { Fragment, useState } from 'react'
import {
	Menubar,
	MenubarCheckboxItem,
	MenubarContent,
	MenubarGroup,
	MenubarItem,
	MenubarMenu,
	MenubarRadioGroup,
	MenubarRadioItem,
	MenubarSeparator,
	MenubarShortcut,
	MenubarSub,
	MenubarSubContent,
	MenubarSubTrigger,
	MenubarTrigger,
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
	FileIcon,
	EditIcon,
	EyeIcon,
	UserIcon,
	MoreHorizontalIcon,
	HelpCircleIcon,
	SettingsIcon,
	Trash2Icon,
	FolderIcon,
	FileTextIcon,
	ImageIcon,
	VideoIcon,
	DownloadIcon,
	ShareIcon,
	PrinterIcon,
	CopyIcon,
	ClipboardPaste,
	ScissorsIcon,
	UndoIcon,
	RedoIcon,
	SearchIcon,
	ZoomInIcon,
	ZoomOutIcon,
	MaximizeIcon,
	RefreshCwIcon,
	SidebarIcon,
	BookmarkIcon,
	LinkIcon,
	MailIcon,
	MessageSquareIcon,
	PlusIcon,
	SaveIcon,
	UploadIcon,
	DatabaseIcon,
	CodeIcon,
	BrushIcon,
	LayoutIcon,
	InfoIcon,
	MenuIcon,
	MonitorIcon,
	CheckIcon
} from 'lucide-react'
import { ComponentDoc } from '@/components/ComponentDoc'

// Code Editor Menubar
const CodeEditorMenubar = () => {
	const [preferences, setPreferences] = useState({
		wordWrap: true,
		lineNumbers: true,
		minimap: false,
		autoSave: true,
		theme: 'dark'
	})

	const updatePreference = (key: string, value: boolean | string) => {
		setPreferences((prev) => ({ ...prev, [key]: value }))
	}

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold flex items-center gap-2">
					<CodeIcon className="w-5 h-5" />
					Code Editor Interface
				</Label>
				<p className="text-sm text-muted-foreground">Professional development environment with comprehensive menu system</p>
			</div>

			<div className="space-y-4">
				<Menubar>
					<MenubarMenu>
						<MenubarTrigger>File</MenubarTrigger>
						<MenubarContent>
							<MenubarItem>
								<PlusIcon className="w-4 h-4 mr-2" />
								New File <MenubarShortcut>⌘N</MenubarShortcut>
							</MenubarItem>
							<MenubarItem>
								<FolderIcon className="w-4 h-4 mr-2" />
								New Folder <MenubarShortcut>⇧⌘N</MenubarShortcut>
							</MenubarItem>
							<MenubarSeparator />
							<MenubarItem>
								<FolderIcon className="w-4 h-4 mr-2" />
								Open Folder... <MenubarShortcut>⌘O</MenubarShortcut>
							</MenubarItem>
							<MenubarItem>
								<FileIcon className="w-4 h-4 mr-2" />
								Open File... <MenubarShortcut>⇧⌘O</MenubarShortcut>
							</MenubarItem>
							<MenubarSeparator />
							<MenubarSub>
								<MenubarSubTrigger>
									<FileTextIcon className="w-4 h-4 mr-2" />
									Open Recent
								</MenubarSubTrigger>
								<MenubarSubContent>
									<MenubarItem>my-project</MenubarItem>
									<MenubarItem>ui-components</MenubarItem>
									<MenubarItem>api-server</MenubarItem>
									<MenubarSeparator />
									<MenubarItem>Clear Recent Files</MenubarItem>
								</MenubarSubContent>
							</MenubarSub>
							<MenubarSeparator />
							<MenubarItem>
								<SaveIcon className="w-4 h-4 mr-2" />
								Save <MenubarShortcut>⌘S</MenubarShortcut>
							</MenubarItem>
							<MenubarItem>
								<SaveIcon className="w-4 h-4 mr-2" />
								Save As... <MenubarShortcut>⇧⌘S</MenubarShortcut>
							</MenubarItem>
							<MenubarItem>
								<UploadIcon className="w-4 h-4 mr-2" />
								Save All <MenubarShortcut>⌥⌘S</MenubarShortcut>
							</MenubarItem>
						</MenubarContent>
					</MenubarMenu>

					<MenubarMenu>
						<MenubarTrigger>Edit</MenubarTrigger>
						<MenubarContent>
							<MenubarItem>
								<UndoIcon className="w-4 h-4 mr-2" />
								Undo <MenubarShortcut>⌘Z</MenubarShortcut>
							</MenubarItem>
							<MenubarItem>
								<RedoIcon className="w-4 h-4 mr-2" />
								Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
							</MenubarItem>
							<MenubarSeparator />
							<MenubarItem>
								<ScissorsIcon className="w-4 h-4 mr-2" />
								Cut <MenubarShortcut>⌘X</MenubarShortcut>
							</MenubarItem>
							<MenubarItem>
								<CopyIcon className="w-4 h-4 mr-2" />
								Copy <MenubarShortcut>⌘C</MenubarShortcut>
							</MenubarItem>
							<MenubarItem>
								<ClipboardPaste className="w-4 h-4 mr-2" />
								Paste <MenubarShortcut>⌘V</MenubarShortcut>
							</MenubarItem>
							<MenubarSeparator />
							<MenubarSub>
								<MenubarSubTrigger>
									<SearchIcon className="w-4 h-4 mr-2" />
									Find & Replace
								</MenubarSubTrigger>
								<MenubarSubContent>
									<MenubarItem>
										Find <MenubarShortcut>⌘F</MenubarShortcut>
									</MenubarItem>
									<MenubarItem>
										Replace <MenubarShortcut>⌥⌘F</MenubarShortcut>
									</MenubarItem>
									<MenubarItem>
										Find in Files <MenubarShortcut>⇧⌘F</MenubarShortcut>
									</MenubarItem>
									<MenubarItem>
										Replace in Files <MenubarShortcut>⇧⌘H</MenubarShortcut>
									</MenubarItem>
								</MenubarSubContent>
							</MenubarSub>
							<MenubarSeparator />
							<MenubarItem>
								<BrushIcon className="w-4 h-4 mr-2" />
								Format Document <MenubarShortcut>⇧⌥F</MenubarShortcut>
							</MenubarItem>
						</MenubarContent>
					</MenubarMenu>

					<MenubarMenu>
						<MenubarTrigger>View</MenubarTrigger>
						<MenubarContent>
							<MenubarCheckboxItem checked={preferences.lineNumbers} onCheckedChange={(checked) => updatePreference('lineNumbers', checked)}>
								Line Numbers
							</MenubarCheckboxItem>
							<MenubarCheckboxItem checked={preferences.wordWrap} onCheckedChange={(checked) => updatePreference('wordWrap', checked)}>
								Word Wrap
							</MenubarCheckboxItem>
							<MenubarCheckboxItem checked={preferences.minimap} onCheckedChange={(checked) => updatePreference('minimap', checked)}>
								Show Minimap
							</MenubarCheckboxItem>
							<MenubarSeparator />
							<MenubarItem>
								<ZoomInIcon className="w-4 h-4 mr-2" />
								Zoom In <MenubarShortcut>⌘+</MenubarShortcut>
							</MenubarItem>
							<MenubarItem>
								<ZoomOutIcon className="w-4 h-4 mr-2" />
								Zoom Out <MenubarShortcut>⌘-</MenubarShortcut>
							</MenubarItem>
							<MenubarSeparator />
							<MenubarItem>
								<SidebarIcon className="w-4 h-4 mr-2" />
								Toggle Sidebar <MenubarShortcut>⌘B</MenubarShortcut>
							</MenubarItem>
							<MenubarItem>
								<LayoutIcon className="w-4 h-4 mr-2" />
								Toggle Panel <MenubarShortcut>⌘J</MenubarShortcut>
							</MenubarItem>
						</MenubarContent>
					</MenubarMenu>

					<MenubarMenu>
						<MenubarTrigger>Settings</MenubarTrigger>
						<MenubarContent>
							<MenubarRadioGroup value={preferences.theme} onValueChange={(value) => updatePreference('theme', value)}>
								<MenubarRadioItem value="light">Light Theme</MenubarRadioItem>
								<MenubarRadioItem value="dark">Dark Theme</MenubarRadioItem>
								<MenubarRadioItem value="auto">Auto (System)</MenubarRadioItem>
							</MenubarRadioGroup>
							<MenubarSeparator />
							<MenubarCheckboxItem checked={preferences.autoSave} onCheckedChange={(checked) => updatePreference('autoSave', checked)}>
								Auto Save
							</MenubarCheckboxItem>
							<MenubarSeparator />
							<MenubarItem>
								<SettingsIcon className="w-4 h-4 mr-2" />
								Preferences...
							</MenubarItem>
						</MenubarContent>
					</MenubarMenu>

					<MenubarMenu>
						<MenubarTrigger>Help</MenubarTrigger>
						<MenubarContent>
							<MenubarItem>
								<HelpCircleIcon className="w-4 h-4 mr-2" />
								Documentation
							</MenubarItem>
							<MenubarItem>
								<InfoIcon className="w-4 h-4 mr-2" />
								About
							</MenubarItem>
						</MenubarContent>
					</MenubarMenu>
				</Menubar>

				<div className="p-4 bg-gray-50 rounded-lg">
					<h4 className="text-sm font-semibold text-gray-700 mb-2">Current Preferences:</h4>
					<div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
						<div>
							<p>
								<strong>Theme:</strong> {preferences.theme}
							</p>
							<p>
								<strong>Line Numbers:</strong> {preferences.lineNumbers ? 'On' : 'Off'}
							</p>
							<p>
								<strong>Word Wrap:</strong> {preferences.wordWrap ? 'On' : 'Off'}
							</p>
						</div>
						<div>
							<p>
								<strong>Minimap:</strong> {preferences.minimap ? 'On' : 'Off'}
							</p>
							<p>
								<strong>Auto Save:</strong> {preferences.autoSave ? 'On' : 'Off'}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

// Media Player Menubar
const MediaPlayerMenubar = () => {
	const [playerSettings, setPlayerSettings] = useState({
		shuffle: false,
		repeat: 'off',
		showVisualization: true,
		showPlaylist: true,
		quality: '1080p'
	})

	const updateSetting = (key: string, value: any) => {
		setPlayerSettings((prev) => ({ ...prev, [key]: value }))
	}

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold flex items-center gap-2">
					<VideoIcon className="w-5 h-5" />
					Media Player Controls
				</Label>
				<p className="text-sm text-muted-foreground">Comprehensive media application with playback and library management</p>
			</div>

			<div className="space-y-4">
				<Menubar>
					<MenubarMenu>
						<MenubarTrigger>Library</MenubarTrigger>
						<MenubarContent>
							<MenubarItem>
								<PlusIcon className="w-4 h-4 mr-2" />
								Add Media... <MenubarShortcut>⌘O</MenubarShortcut>
							</MenubarItem>
							<MenubarItem>
								<FolderIcon className="w-4 h-4 mr-2" />
								Add Folder... <MenubarShortcut>⇧⌘O</MenubarShortcut>
							</MenubarItem>
							<MenubarSeparator />
							<MenubarSub>
								<MenubarSubTrigger>
									<DatabaseIcon className="w-4 h-4 mr-2" />
									Recent Libraries
								</MenubarSubTrigger>
								<MenubarSubContent>
									<MenubarItem>Music Collection</MenubarItem>
									<MenubarItem>Podcast Library</MenubarItem>
									<MenubarItem>Video Library</MenubarItem>
									<MenubarSeparator />
									<MenubarItem>Create New Library...</MenubarItem>
								</MenubarSubContent>
							</MenubarSub>
							<MenubarSeparator />
							<MenubarItem>
								<RefreshCwIcon className="w-4 h-4 mr-2" />
								Scan for Changes
							</MenubarItem>
						</MenubarContent>
					</MenubarMenu>

					<MenubarMenu>
						<MenubarTrigger>Playback</MenubarTrigger>
						<MenubarContent>
							<MenubarRadioGroup value={playerSettings.repeat} onValueChange={(value) => updateSetting('repeat', value)}>
								<MenubarRadioItem value="off">No Repeat</MenubarRadioItem>
								<MenubarRadioItem value="all">Repeat All</MenubarRadioItem>
								<MenubarRadioItem value="one">Repeat One</MenubarRadioItem>
							</MenubarRadioGroup>
							<MenubarSeparator />
							<MenubarCheckboxItem checked={playerSettings.shuffle} onCheckedChange={(checked) => updateSetting('shuffle', checked)}>
								Shuffle
							</MenubarCheckboxItem>
							<MenubarSeparator />
							<MenubarRadioGroup value={playerSettings.quality} onValueChange={(value) => updateSetting('quality', value)}>
								<MenubarRadioItem value="480p">480p</MenubarRadioItem>
								<MenubarRadioItem value="720p">720p</MenubarRadioItem>
								<MenubarRadioItem value="1080p">1080p</MenubarRadioItem>
								<MenubarRadioItem value="4k">4K</MenubarRadioItem>
							</MenubarRadioGroup>
						</MenubarContent>
					</MenubarMenu>

					<MenubarMenu>
						<MenubarTrigger>View</MenubarTrigger>
						<MenubarContent>
							<MenubarCheckboxItem checked={playerSettings.showPlaylist} onCheckedChange={(checked) => updateSetting('showPlaylist', checked)}>
								Show Playlist
							</MenubarCheckboxItem>
							<MenubarCheckboxItem checked={playerSettings.showVisualization} onCheckedChange={(checked) => updateSetting('showVisualization', checked)}>
								Show Visualization
							</MenubarCheckboxItem>
							<MenubarSeparator />
							<MenubarItem>
								<MaximizeIcon className="w-4 h-4 mr-2" />
								Fullscreen <MenubarShortcut>F</MenubarShortcut>
							</MenubarItem>
							<MenubarSeparator />
							<MenubarSub>
								<MenubarSubTrigger>Window Size</MenubarSubTrigger>
								<MenubarSubContent>
									<MenubarItem>Compact</MenubarItem>
									<MenubarItem>Standard</MenubarItem>
									<MenubarItem>Large</MenubarItem>
								</MenubarSubContent>
							</MenubarSub>
						</MenubarContent>
					</MenubarMenu>

					<MenubarMenu>
						<MenubarTrigger>Tools</MenubarTrigger>
						<MenubarContent>
							<MenubarItem>
								<DownloadIcon className="w-4 h-4 mr-2" />
								Download Manager
							</MenubarItem>
							<MenubarItem>
								<ShareIcon className="w-4 h-4 mr-2" />
								Share Current Track
							</MenubarItem>
							<MenubarSeparator />
							<MenubarItem>
								<SettingsIcon className="w-4 h-4 mr-2" />
								Preferences...
							</MenubarItem>
						</MenubarContent>
					</MenubarMenu>
				</Menubar>

				<div className="p-4 bg-gray-50 rounded-lg">
					<h4 className="text-sm font-semibold text-gray-700 mb-2">Playback Settings:</h4>
					<div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
						<div>
							<p>
								<strong>Repeat:</strong> {playerSettings.repeat}
							</p>
							<p>
								<strong>Shuffle:</strong> {playerSettings.shuffle ? 'On' : 'Off'}
							</p>
							<p>
								<strong>Quality:</strong> {playerSettings.quality}
							</p>
						</div>
						<div>
							<p>
								<strong>Playlist:</strong> {playerSettings.showPlaylist ? 'Visible' : 'Hidden'}
							</p>
							<p>
								<strong>Visualization:</strong> {playerSettings.showVisualization ? 'On' : 'Off'}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

// Browser Application Menubar
const BrowserMenubar = () => {
	const [browserSettings, setBrowserSettings] = useState({
		showBookmarksBar: true,
		showFullUrls: false,
		enableJavaScript: true,
		blockPopups: true,
		selectedProfile: 'personal'
	})

	const updateSetting = (key: string, value: any) => {
		setBrowserSettings((prev) => ({ ...prev, [key]: value }))
	}

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold flex items-center gap-2">
					<MonitorIcon className="w-5 h-5" />
					Web Browser Interface
				</Label>
				<p className="text-sm text-muted-foreground">Modern browser with tab management, bookmarks, and privacy controls</p>
			</div>

			<div className="space-y-4">
				<Menubar>
					<MenubarMenu>
						<MenubarTrigger>File</MenubarTrigger>
						<MenubarContent>
							<MenubarItem>
								<PlusIcon className="w-4 h-4 mr-2" />
								New Tab <MenubarShortcut>⌘T</MenubarShortcut>
							</MenubarItem>
							<MenubarItem>
								<MonitorIcon className="w-4 h-4 mr-2" />
								New Window <MenubarShortcut>⌘N</MenubarShortcut>
							</MenubarItem>
							<MenubarItem>
								<EyeIcon className="w-4 h-4 mr-2" />
								New Incognito Window <MenubarShortcut>⇧⌘N</MenubarShortcut>
							</MenubarItem>
							<MenubarSeparator />
							<MenubarSub>
								<MenubarSubTrigger>
									<ShareIcon className="w-4 h-4 mr-2" />
									Share
								</MenubarSubTrigger>
								<MenubarSubContent>
									<MenubarItem>
										<MailIcon className="w-4 h-4 mr-2" />
										Email Link
									</MenubarItem>
									<MenubarItem>
										<MessageSquareIcon className="w-4 h-4 mr-2" />
										Copy Link
									</MenubarItem>
									<MenubarItem>
										<CopyIcon className="w-4 h-4 mr-2" />
										Copy as Markdown
									</MenubarItem>
								</MenubarSubContent>
							</MenubarSub>
							<MenubarSeparator />
							<MenubarItem>
								<PrinterIcon className="w-4 h-4 mr-2" />
								Print... <MenubarShortcut>⌘P</MenubarShortcut>
							</MenubarItem>
						</MenubarContent>
					</MenubarMenu>

					<MenubarMenu>
						<MenubarTrigger>Edit</MenubarTrigger>
						<MenubarContent>
							<MenubarItem>
								<UndoIcon className="w-4 h-4 mr-2" />
								Undo <MenubarShortcut>⌘Z</MenubarShortcut>
							</MenubarItem>
							<MenubarItem>
								<RedoIcon className="w-4 h-4 mr-2" />
								Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
							</MenubarItem>
							<MenubarSeparator />
							<MenubarItem>
								<SearchIcon className="w-4 h-4 mr-2" />
								Find... <MenubarShortcut>⌘F</MenubarShortcut>
							</MenubarItem>
							<MenubarItem>
								<SearchIcon className="w-4 h-4 mr-2" />
								Find Next <MenubarShortcut>⌘G</MenubarShortcut>
							</MenubarItem>
							<MenubarSeparator />
							<MenubarItem>
								<ScissorsIcon className="w-4 h-4 mr-2" />
								Cut <MenubarShortcut>⌘X</MenubarShortcut>
							</MenubarItem>
							<MenubarItem>
								<CopyIcon className="w-4 h-4 mr-2" />
								Copy <MenubarShortcut>⌘C</MenubarShortcut>
							</MenubarItem>
							<MenubarItem>
								<ClipboardPaste className="w-4 h-4 mr-2" />
								Paste <MenubarShortcut>⌘V</MenubarShortcut>
							</MenubarItem>
						</MenubarContent>
					</MenubarMenu>

					<MenubarMenu>
						<MenubarTrigger>View</MenubarTrigger>
						<MenubarContent>
							<MenubarCheckboxItem checked={browserSettings.showBookmarksBar} onCheckedChange={(checked) => updateSetting('showBookmarksBar', checked)}>
								Show Bookmarks Bar
							</MenubarCheckboxItem>
							<MenubarCheckboxItem checked={browserSettings.showFullUrls} onCheckedChange={(checked) => updateSetting('showFullUrls', checked)}>
								Show Full URLs
							</MenubarCheckboxItem>
							<MenubarSeparator />
							<MenubarItem>
								<RefreshCwIcon className="w-4 h-4 mr-2" />
								Reload <MenubarShortcut>⌘R</MenubarShortcut>
							</MenubarItem>
							<MenubarItem>
								<RefreshCwIcon className="w-4 h-4 mr-2" />
								Hard Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
							</MenubarItem>
							<MenubarSeparator />
							<MenubarItem>
								<ZoomInIcon className="w-4 h-4 mr-2" />
								Zoom In <MenubarShortcut>⌘+</MenubarShortcut>
							</MenubarItem>
							<MenubarItem>
								<ZoomOutIcon className="w-4 h-4 mr-2" />
								Zoom Out <MenubarShortcut>⌘-</MenubarShortcut>
							</MenubarItem>
							<MenubarSeparator />
							<MenubarItem>
								<MaximizeIcon className="w-4 h-4 mr-2" />
								Enter Full Screen
							</MenubarItem>
						</MenubarContent>
					</MenubarMenu>

					<MenubarMenu>
						<MenubarTrigger>Bookmarks</MenubarTrigger>
						<MenubarContent>
							<MenubarItem>
								<BookmarkIcon className="w-4 h-4 mr-2" />
								Bookmark This Page <MenubarShortcut>⌘D</MenubarShortcut>
							</MenubarItem>
							<MenubarItem>
								<FolderIcon className="w-4 h-4 mr-2" />
								Bookmark All Tabs <MenubarShortcut>⇧⌘D</MenubarShortcut>
							</MenubarItem>
							<MenubarSeparator />
							<MenubarItem>
								<SettingsIcon className="w-4 h-4 mr-2" />
								Bookmark Manager
							</MenubarItem>
						</MenubarContent>
					</MenubarMenu>

					<MenubarMenu>
						<MenubarTrigger>Profiles</MenubarTrigger>
						<MenubarContent>
							<MenubarRadioGroup value={browserSettings.selectedProfile} onValueChange={(value) => updateSetting('selectedProfile', value)}>
								<MenubarRadioItem value="personal">
									<Avatar className="w-4 h-4 mr-2">
										<AvatarFallback className="text-xs">P</AvatarFallback>
									</Avatar>
									Personal
								</MenubarRadioItem>
								<MenubarRadioItem value="work">
									<Avatar className="w-4 h-4 mr-2">
										<AvatarFallback className="text-xs">W</AvatarFallback>
									</Avatar>
									Work
								</MenubarRadioItem>
								<MenubarRadioItem value="guest">
									<Avatar className="w-4 h-4 mr-2">
										<AvatarFallback className="text-xs">G</AvatarFallback>
									</Avatar>
									Guest
								</MenubarRadioItem>
							</MenubarRadioGroup>
							<MenubarSeparator />
							<MenubarItem>
								<PlusIcon className="w-4 h-4 mr-2" />
								Add Profile...
							</MenubarItem>
							<MenubarItem>
								<SettingsIcon className="w-4 h-4 mr-2" />
								Manage Profiles...
							</MenubarItem>
						</MenubarContent>
					</MenubarMenu>
				</Menubar>

				<div className="p-4 bg-gray-50 rounded-lg">
					<h4 className="text-sm font-semibold text-gray-700 mb-2">Browser Settings:</h4>
					<div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
						<div>
							<p>
								<strong>Profile:</strong> {browserSettings.selectedProfile}
							</p>
							<p>
								<strong>Bookmarks Bar:</strong> {browserSettings.showBookmarksBar ? 'Visible' : 'Hidden'}
							</p>
							<p>
								<strong>Full URLs:</strong> {browserSettings.showFullUrls ? 'On' : 'Off'}
							</p>
						</div>
						<div>
							<p>
								<strong>JavaScript:</strong> {browserSettings.enableJavaScript ? 'Enabled' : 'Disabled'}
							</p>
							<p>
								<strong>Popup Blocker:</strong> {browserSettings.blockPopups ? 'On' : 'Off'}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

// Basic Menubar Examples
const BasicMenubarExamples = () => {
	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold">Basic Menubar Examples</Label>
				<p className="text-sm text-muted-foreground">Simple menubar configurations with common patterns</p>
			</div>

			<div className="space-y-8">
				<div>
					<Label className="font-medium mb-3 block">Simple Text Editor</Label>
					<Menubar>
						<MenubarMenu>
							<MenubarTrigger>File</MenubarTrigger>
							<MenubarContent>
								<MenubarItem>
									New <MenubarShortcut>⌘N</MenubarShortcut>
								</MenubarItem>
								<MenubarItem>
									Open <MenubarShortcut>⌘O</MenubarShortcut>
								</MenubarItem>
								<MenubarItem>
									Save <MenubarShortcut>⌘S</MenubarShortcut>
								</MenubarItem>
								<MenubarSeparator />
								<MenubarItem>
									Print <MenubarShortcut>⌘P</MenubarShortcut>
								</MenubarItem>
							</MenubarContent>
						</MenubarMenu>
						<MenubarMenu>
							<MenubarTrigger>Edit</MenubarTrigger>
							<MenubarContent>
								<MenubarItem>
									Undo <MenubarShortcut>⌘Z</MenubarShortcut>
								</MenubarItem>
								<MenubarItem>
									Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
								</MenubarItem>
								<MenubarSeparator />
								<MenubarItem>
									Cut <MenubarShortcut>⌘X</MenubarShortcut>
								</MenubarItem>
								<MenubarItem>
									Copy <MenubarShortcut>⌘C</MenubarShortcut>
								</MenubarItem>
								<MenubarItem>
									Paste <MenubarShortcut>⌘V</MenubarShortcut>
								</MenubarItem>
							</MenubarContent>
						</MenubarMenu>
						<MenubarMenu>
							<MenubarTrigger>Help</MenubarTrigger>
							<MenubarContent>
								<MenubarItem>Documentation</MenubarItem>
								<MenubarItem>About</MenubarItem>
							</MenubarContent>
						</MenubarMenu>
					</Menubar>
				</div>

				<div>
					<Label className="font-medium mb-3 block">With Checkboxes and Radio Groups</Label>
					<Menubar>
						<MenubarMenu>
							<MenubarTrigger>View</MenubarTrigger>
							<MenubarContent>
								<MenubarCheckboxItem>Show Toolbar</MenubarCheckboxItem>
								<MenubarCheckboxItem checked>Show Status Bar</MenubarCheckboxItem>
								<MenubarCheckboxItem>Show Rulers</MenubarCheckboxItem>
								<MenubarSeparator />
								<MenubarRadioGroup value="medium">
									<MenubarRadioItem value="small">Small</MenubarRadioItem>
									<MenubarRadioItem value="medium">Medium</MenubarRadioItem>
									<MenubarRadioItem value="large">Large</MenubarRadioItem>
								</MenubarRadioGroup>
							</MenubarContent>
						</MenubarMenu>
						<MenubarMenu>
							<MenubarTrigger>Window</MenubarTrigger>
							<MenubarContent>
								<MenubarItem>Minimize</MenubarItem>
								<MenubarItem>Zoom</MenubarItem>
								<MenubarSeparator />
								<MenubarItem>Bring All to Front</MenubarItem>
							</MenubarContent>
						</MenubarMenu>
					</Menubar>
				</div>

				<div>
					<Label className="font-medium mb-3 block">With Submenus</Label>
					<Menubar>
						<MenubarMenu>
							<MenubarTrigger>Format</MenubarTrigger>
							<MenubarContent>
								<MenubarSub>
									<MenubarSubTrigger>Text</MenubarSubTrigger>
									<MenubarSubContent>
										<MenubarItem>Bold</MenubarItem>
										<MenubarItem>Italic</MenubarItem>
										<MenubarItem>Underline</MenubarItem>
									</MenubarSubContent>
								</MenubarSub>
								<MenubarSub>
									<MenubarSubTrigger>Alignment</MenubarSubTrigger>
									<MenubarSubContent>
										<MenubarItem>Left</MenubarItem>
										<MenubarItem>Center</MenubarItem>
										<MenubarItem>Right</MenubarItem>
										<MenubarItem>Justify</MenubarItem>
									</MenubarSubContent>
								</MenubarSub>
								<MenubarSeparator />
								<MenubarItem>Clear Formatting</MenubarItem>
							</MenubarContent>
						</MenubarMenu>
					</Menubar>
				</div>
			</div>
		</div>
	)
}

export default function MenubarSample() {
	const [showAdvanced, setShowAdvanced] = useState(false)

	return (
		<Fragment>
			<ComponentDoc
				title="Menubar"
				description="Horizontal menu bars common in desktop applications. Perfect for organizing commands, tools, and settings in professional software interfaces."
				component={
					<div className="flex flex-col gap-8 w-full max-w-5xl">
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
							<h3 className="text-lg font-semibold mb-4">Application Interfaces</h3>
							<div className="grid grid-cols-1 gap-8">
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<CodeIcon className="w-5 h-5" />
											Code Editor
										</CardTitle>
										<CardDescription>Professional development environment with comprehensive menu system</CardDescription>
									</CardHeader>
									<CardContent>
										<CodeEditorMenubar />
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<VideoIcon className="w-5 h-5" />
											Media Player
										</CardTitle>
										<CardDescription>Media application with playback controls and library management</CardDescription>
									</CardHeader>
									<CardContent>
										<MediaPlayerMenubar />
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<MonitorIcon className="w-5 h-5" />
											Web Browser
										</CardTitle>
										<CardDescription>Modern browser interface with tab management and settings</CardDescription>
									</CardHeader>
									<CardContent>
										<BrowserMenubar />
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
											Basic Patterns
										</CardTitle>
										<CardDescription>Simple menubar configurations with common menu patterns</CardDescription>
									</CardHeader>
									<CardContent>
										<BasicMenubarExamples />
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
								<CardDescription>Best practices for implementing menubar navigation</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div>
										<h4 className="font-semibold mb-2">When to Use</h4>
										<ul className="space-y-1 text-sm text-muted-foreground">
											<li>• For desktop-style applications with complex functionality</li>
											<li>• When organizing commands into logical categories</li>
											<li>• For professional software requiring extensive menus</li>
											<li>• When keyboard shortcuts and accessibility are important</li>
											<li>• For applications with multiple tools and settings</li>
										</ul>
									</div>
									<MenubarSeparator />
									<div>
										<h4 className="font-semibold mb-2">Design Principles</h4>
										<ul className="space-y-1 text-sm text-muted-foreground">
											<li>• Group related commands under logical menu categories</li>
											<li>• Use consistent naming conventions across all menus</li>
											<li>• Provide keyboard shortcuts for frequently used actions</li>
											<li>• Use separators to group related menu items</li>
											<li>• Include icons for better visual recognition</li>
											<li>• Consider submenu depth - avoid going too deep</li>
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
										<strong>Applications:</strong> Code Editor, Media Player, Browser{showAdvanced ? ', Basic' : ''}
									</p>
									<p>
										<strong>Features:</strong> Shortcuts, Submenus, State Management, Icons
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
