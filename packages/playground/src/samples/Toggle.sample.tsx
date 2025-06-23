import { createElement, Fragment, useState } from 'react'
import { Toggle, Label, Card, CardContent, CardDescription, CardHeader, CardTitle, Badge, Switch, Button, Separator } from '@rs-kit/ui-kit'
import {
	BoldIcon,
	ItalicIcon,
	UnderlineIcon,
	StrikethroughIcon,
	AlignLeftIcon,
	AlignCenterIcon,
	AlignRightIcon,
	AlignJustifyIcon,
	ListIcon,
	ListOrderedIcon,
	QuoteIcon,
	CodeIcon,
	LinkIcon,
	ImageIcon,
	TableIcon,
	PlayIcon,
	PauseIcon,
	SkipForwardIcon,
	SkipBackIcon,
	VolumeIcon,
	Volume1Icon,
	Volume2Icon,
	VolumeXIcon,
	ShuffleIcon,
	RepeatIcon,
	HeartIcon,
	StarIcon,
	BookmarkIcon,
	ShareIcon,
	ThumbsUpIcon,
	MessageSquareIcon,
	EyeIcon,
	EyeOffIcon,
	BellIcon,
	BellOffIcon,
	SettingsIcon,
	InfoIcon,
	ToggleLeftIcon,
	ToggleRightIcon,
	SunIcon,
	MoonIcon,
	GridIcon,
	LayoutListIcon,
	MapIcon,
	FilterIcon,
	SortAscIcon,
	CalendarIcon,
	ClockIcon
} from 'lucide-react'
import { ComponentDoc } from '@/components/ComponentDoc'

// Text Formatting Toggles
const TextFormattingToggles = () => {
	const [formatting, setFormatting] = useState({
		bold: false,
		italic: false,
		underline: false,
		strikethrough: false
	})

	const [alignment, setAlignment] = useState('left')
	const [listType, setListType] = useState('')

	const toggleFormatting = (type: keyof typeof formatting) => {
		setFormatting((prev) => ({ ...prev, [type]: !prev[type] }))
	}

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold flex items-center gap-2">
					<BoldIcon className="w-5 h-5" />
					Text Formatting
				</Label>
				<p className="text-sm text-muted-foreground">Rich text editor toolbar with formatting and alignment controls</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Text Editor Toolbar</CardTitle>
					<CardDescription>Toggle various text formatting options and alignment settings</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-6">
						{/* Text Formatting */}
						<div>
							<Label className="font-medium mb-3 block">Text Style</Label>
							<div className="flex gap-1">
								<Toggle pressed={formatting.bold} onPressedChange={() => toggleFormatting('bold')} aria-label="Bold" size="sm">
									<BoldIcon className="w-4 h-4" />
								</Toggle>
								<Toggle pressed={formatting.italic} onPressedChange={() => toggleFormatting('italic')} aria-label="Italic" size="sm">
									<ItalicIcon className="w-4 h-4" />
								</Toggle>
								<Toggle pressed={formatting.underline} onPressedChange={() => toggleFormatting('underline')} aria-label="Underline" size="sm">
									<UnderlineIcon className="w-4 h-4" />
								</Toggle>
								<Toggle pressed={formatting.strikethrough} onPressedChange={() => toggleFormatting('strikethrough')} aria-label="Strikethrough" size="sm">
									<StrikethroughIcon className="w-4 h-4" />
								</Toggle>
							</div>
						</div>

						{/* Text Alignment */}
						<div>
							<Label className="font-medium mb-3 block">Text Alignment</Label>
							<div className="flex gap-1">
								<Toggle pressed={alignment === 'left'} onPressedChange={() => setAlignment(alignment === 'left' ? '' : 'left')} aria-label="Align Left" size="sm">
									<AlignLeftIcon className="w-4 h-4" />
								</Toggle>
								<Toggle pressed={alignment === 'center'} onPressedChange={() => setAlignment(alignment === 'center' ? '' : 'center')} aria-label="Align Center" size="sm">
									<AlignCenterIcon className="w-4 h-4" />
								</Toggle>
								<Toggle pressed={alignment === 'right'} onPressedChange={() => setAlignment(alignment === 'right' ? '' : 'right')} aria-label="Align Right" size="sm">
									<AlignRightIcon className="w-4 h-4" />
								</Toggle>
								<Toggle pressed={alignment === 'justify'} onPressedChange={() => setAlignment(alignment === 'justify' ? '' : 'justify')} aria-label="Justify" size="sm">
									<AlignJustifyIcon className="w-4 h-4" />
								</Toggle>
							</div>
						</div>

						{/* Lists and Special Formatting */}
						<div>
							<Label className="font-medium mb-3 block">Lists & Special</Label>
							<div className="flex gap-1">
								<Toggle pressed={listType === 'bullet'} onPressedChange={() => setListType(listType === 'bullet' ? '' : 'bullet')} aria-label="Bullet List" size="sm">
									<ListIcon className="w-4 h-4" />
								</Toggle>
								<Toggle pressed={listType === 'numbered'} onPressedChange={() => setListType(listType === 'numbered' ? '' : 'numbered')} aria-label="Numbered List" size="sm">
									<ListOrderedIcon className="w-4 h-4" />
								</Toggle>
								<Toggle aria-label="Quote" size="sm">
									<QuoteIcon className="w-4 h-4" />
								</Toggle>
								<Toggle aria-label="Code" size="sm">
									<CodeIcon className="w-4 h-4" />
								</Toggle>
								<Toggle aria-label="Link" size="sm">
									<LinkIcon className="w-4 h-4" />
								</Toggle>
							</div>
						</div>

						{/* Preview */}
						<div className="p-4 border rounded-lg bg-gray-50">
							<p
								className={`text-sm ${formatting.bold ? 'font-bold' : ''} ${formatting.italic ? 'italic' : ''} ${formatting.underline ? 'underline' : ''} ${
									formatting.strikethrough ? 'line-through' : ''
								} ${alignment === 'center' ? 'text-center' : alignment === 'right' ? 'text-right' : alignment === 'justify' ? 'text-justify' : 'text-left'}`}
							>
								This is a preview of your formatted text with the selected styling options applied.
							</p>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}

// Media Player Controls
const MediaPlayerToggles = () => {
	const [playerState, setPlayerState] = useState({
		isPlaying: false,
		isShuffle: false,
		isRepeat: false,
		isMuted: false,
		volume: 'medium'
	})

	const [favorites, setFavorites] = useState({
		liked: false,
		starred: false,
		bookmarked: false
	})

	const updatePlayerState = (key: keyof typeof playerState, value: any) => {
		setPlayerState((prev) => ({ ...prev, [key]: value }))
	}

	const toggleFavorite = (type: keyof typeof favorites) => {
		setFavorites((prev) => ({ ...prev, [type]: !prev[type] }))
	}

	const getVolumeIcon = () => {
		if (playerState.isMuted) return VolumeXIcon
		switch (playerState.volume) {
			case 'low':
				return Volume1Icon
			case 'high':
				return Volume2Icon
			default:
				return Volume2Icon
		}
	}

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold flex items-center gap-2">
					<PlayIcon className="w-5 h-5" />
					Media Player
				</Label>
				<p className="text-sm text-muted-foreground">Audio/video player controls with playback and preference toggles</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Music Player</CardTitle>
					<CardDescription>Control playback and manage your music preferences</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-6">
						{/* Now Playing */}
						<div className="text-center space-y-2">
							<div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg mx-auto flex items-center justify-center text-white text-4xl">🎵</div>
							<h3 className="font-medium">Beautiful Song Title</h3>
							<p className="text-sm text-muted-foreground">Artist Name</p>
						</div>

						{/* Playback Controls */}
						<div>
							<Label className="font-medium mb-3 block">Playback Controls</Label>
							<div className="flex items-center justify-center gap-2">
								<Toggle pressed={playerState.isShuffle} onPressedChange={(pressed) => updatePlayerState('isShuffle', pressed)} aria-label="Shuffle" size="sm">
									<ShuffleIcon className="w-4 h-4" />
								</Toggle>
								<Button variant="outline" size="sm">
									<SkipBackIcon className="w-4 h-4" />
								</Button>
								<Toggle
									pressed={playerState.isPlaying}
									onPressedChange={(pressed) => updatePlayerState('isPlaying', pressed)}
									aria-label={playerState.isPlaying ? 'Pause' : 'Play'}
									size="lg"
								>
									{playerState.isPlaying ? <PauseIcon className="w-6 h-6" /> : <PlayIcon className="w-6 h-6" />}
								</Toggle>
								<Button variant="outline" size="sm">
									<SkipForwardIcon className="w-4 h-4" />
								</Button>
								<Toggle pressed={playerState.isRepeat} onPressedChange={(pressed) => updatePlayerState('isRepeat', pressed)} aria-label="Repeat" size="sm">
									<RepeatIcon className="w-4 h-4" />
								</Toggle>
							</div>
						</div>

						{/* Volume Control */}
						<div>
							<Label className="font-medium mb-3 block">Volume</Label>
							<div className="flex items-center justify-center gap-2">
								<Toggle pressed={playerState.isMuted} onPressedChange={(pressed) => updatePlayerState('isMuted', pressed)} aria-label="Mute" size="sm">
									{createElement(getVolumeIcon(), { className: 'w-4 h-4' })}
								</Toggle>
								<div className="flex gap-1">
									<Toggle
										pressed={playerState.volume === 'low'}
										onPressedChange={() => updatePlayerState('volume', playerState.volume === 'low' ? 'medium' : 'low')}
										aria-label="Low Volume"
										size="sm"
										variant="outline"
									>
										Low
									</Toggle>
									<Toggle pressed={playerState.volume === 'medium'} onPressedChange={() => updatePlayerState('volume', 'medium')} aria-label="Medium Volume" size="sm" variant="outline">
										Med
									</Toggle>
									<Toggle
										pressed={playerState.volume === 'high'}
										onPressedChange={() => updatePlayerState('volume', playerState.volume === 'high' ? 'medium' : 'high')}
										aria-label="High Volume"
										size="sm"
										variant="outline"
									>
										High
									</Toggle>
								</div>
							</div>
						</div>

						{/* Favorites & Actions */}
						<div>
							<Label className="font-medium mb-3 block">Favorites & Actions</Label>
							<div className="flex items-center justify-center gap-2">
								<Toggle pressed={favorites.liked} onPressedChange={() => toggleFavorite('liked')} aria-label="Like" size="sm">
									<HeartIcon className={`w-4 h-4 ${favorites.liked ? 'fill-red-500 text-red-500' : ''}`} />
								</Toggle>
								<Toggle pressed={favorites.starred} onPressedChange={() => toggleFavorite('starred')} aria-label="Star" size="sm">
									<StarIcon className={`w-4 h-4 ${favorites.starred ? 'fill-yellow-500 text-yellow-500' : ''}`} />
								</Toggle>
								<Toggle pressed={favorites.bookmarked} onPressedChange={() => toggleFavorite('bookmarked')} aria-label="Bookmark" size="sm">
									<BookmarkIcon className={`w-4 h-4 ${favorites.bookmarked ? 'fill-blue-500 text-blue-500' : ''}`} />
								</Toggle>
								<Toggle aria-label="Share" size="sm">
									<ShareIcon className="w-4 h-4" />
								</Toggle>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}

// Interface Settings Toggles
const InterfaceSettingsToggles = () => {
	const [settings, setSettings] = useState({
		darkMode: false,
		notifications: true,
		privacy: false,
		viewMode: 'grid',
		sortOrder: 'asc',
		showFilters: false
	})

	const updateSetting = (key: keyof typeof settings, value: any) => {
		setSettings((prev) => ({ ...prev, [key]: value }))
	}

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold flex items-center gap-2">
					<SettingsIcon className="w-5 h-5" />
					Interface Settings
				</Label>
				<p className="text-sm text-muted-foreground">Application settings and interface preferences with toggle controls</p>
			</div>

			<div className="space-y-6">
				{/* App Preferences */}
				<Card>
					<CardHeader>
						<CardTitle>App Preferences</CardTitle>
						<CardDescription>Customize your application experience</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<div>
									<Label className="font-medium">Dark Mode</Label>
									<p className="text-sm text-muted-foreground">Switch between light and dark themes</p>
								</div>
								<Toggle pressed={settings.darkMode} onPressedChange={(pressed) => updateSetting('darkMode', pressed)} aria-label="Dark Mode">
									{settings.darkMode ? <MoonIcon className="w-4 h-4" /> : <SunIcon className="w-4 h-4" />}
								</Toggle>
							</div>

							<Separator />

							<div className="flex items-center justify-between">
								<div>
									<Label className="font-medium">Notifications</Label>
									<p className="text-sm text-muted-foreground">Receive app notifications</p>
								</div>
								<Toggle pressed={settings.notifications} onPressedChange={(pressed) => updateSetting('notifications', pressed)} aria-label="Notifications">
									{settings.notifications ? <BellIcon className="w-4 h-4" /> : <BellOffIcon className="w-4 h-4" />}
								</Toggle>
							</div>

							<Separator />

							<div className="flex items-center justify-between">
								<div>
									<Label className="font-medium">Privacy Mode</Label>
									<p className="text-sm text-muted-foreground">Hide sensitive information</p>
								</div>
								<Toggle pressed={settings.privacy} onPressedChange={(pressed) => updateSetting('privacy', pressed)} aria-label="Privacy Mode">
									{settings.privacy ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
								</Toggle>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* View Options */}
				<Card>
					<CardHeader>
						<CardTitle>View Options</CardTitle>
						<CardDescription>Customize how content is displayed</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div>
								<Label className="font-medium mb-3 block">Layout Mode</Label>
								<div className="flex gap-1">
									<Toggle
										pressed={settings.viewMode === 'grid'}
										onPressedChange={() => updateSetting('viewMode', settings.viewMode === 'grid' ? 'list' : 'grid')}
										aria-label="Grid View"
										size="sm"
									>
										<GridIcon className="w-4 h-4" />
									</Toggle>
									<Toggle
										pressed={settings.viewMode === 'list'}
										onPressedChange={() => updateSetting('viewMode', settings.viewMode === 'list' ? 'grid' : 'list')}
										aria-label="List View"
										size="sm"
									>
										<LayoutListIcon className="w-4 h-4" />
									</Toggle>
									<Toggle
										pressed={settings.viewMode === 'map'}
										onPressedChange={() => updateSetting('viewMode', settings.viewMode === 'map' ? 'grid' : 'map')}
										aria-label="Map View"
										size="sm"
									>
										<MapIcon className="w-4 h-4" />
									</Toggle>
								</div>
							</div>

							<div>
								<Label className="font-medium mb-3 block">Sort & Filter</Label>
								<div className="flex gap-2">
									<Toggle
										pressed={settings.sortOrder === 'asc'}
										onPressedChange={() => updateSetting('sortOrder', settings.sortOrder === 'asc' ? 'desc' : 'asc')}
										aria-label="Sort Ascending"
										size="sm"
										variant="outline"
									>
										<SortAscIcon className="w-4 h-4 mr-2" />
										{settings.sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
									</Toggle>
									<Toggle pressed={settings.showFilters} onPressedChange={(pressed) => updateSetting('showFilters', pressed)} aria-label="Show Filters" size="sm" variant="outline">
										<FilterIcon className="w-4 h-4 mr-2" />
										Filters
									</Toggle>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}

// Basic Toggle Examples
const BasicToggleExamples = () => {
	const [basicToggles, setBasicToggles] = useState({
		simple: false,
		withText: false,
		disabled: false
	})

	const updateBasicToggle = (key: keyof typeof basicToggles) => {
		setBasicToggles((prev) => ({ ...prev, [key]: !prev[key] }))
	}

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold">Basic Toggle Examples</Label>
				<p className="text-sm text-muted-foreground">Simple toggle configurations with different sizes and variants</p>
			</div>

			<div className="space-y-8">
				<div>
					<Label className="font-medium mb-3 block">Different Sizes</Label>
					<div className="flex items-center gap-4">
						<Toggle size="sm" aria-label="Small Toggle">
							<BoldIcon className="w-3 h-3" />
						</Toggle>
						<Toggle aria-label="Default Toggle">
							<BoldIcon className="w-4 h-4" />
						</Toggle>
						<Toggle size="lg" aria-label="Large Toggle">
							<BoldIcon className="w-5 h-5" />
						</Toggle>
					</div>
				</div>

				<div>
					<Label className="font-medium mb-3 block">Different Variants</Label>
					<div className="flex items-center gap-4">
						<Toggle variant="default" aria-label="Default Variant">
							<ItalicIcon className="w-4 h-4" />
						</Toggle>
						<Toggle variant="outline" aria-label="Outline Variant">
							<UnderlineIcon className="w-4 h-4" />
						</Toggle>
					</div>
				</div>

				<div>
					<Label className="font-medium mb-3 block">With Text Labels</Label>
					<div className="flex items-center gap-4">
						<Toggle pressed={basicToggles.withText} onPressedChange={() => updateBasicToggle('withText')} aria-label="Bold text">
							<BoldIcon className="w-4 h-4 mr-2" />
							Bold
						</Toggle>
						<Toggle aria-label="Italic text">
							<ItalicIcon className="w-4 h-4 mr-2" />
							Italic
						</Toggle>
						<Toggle aria-label="Underline text">
							<UnderlineIcon className="w-4 h-4 mr-2" />
							Underline
						</Toggle>
					</div>
				</div>

				<div>
					<Label className="font-medium mb-3 block">States</Label>
					<div className="flex items-center gap-4">
						<Toggle pressed={basicToggles.simple} onPressedChange={() => updateBasicToggle('simple')} aria-label="Unpressed Toggle">
							<ToggleLeftIcon className="w-4 h-4" />
						</Toggle>
						<Toggle pressed={true} aria-label="Pressed Toggle">
							<ToggleRightIcon className="w-4 h-4" />
						</Toggle>
						<Toggle disabled aria-label="Disabled Toggle">
							<BoldIcon className="w-4 h-4" />
						</Toggle>
					</div>
				</div>

				<div>
					<Label className="font-medium mb-3 block">Icon Only vs Text Only</Label>
					<div className="flex items-center gap-4">
						<Toggle aria-label="Icon Only">
							<StarIcon className="w-4 h-4" />
						</Toggle>
						<Toggle aria-label="Text Only">Favorite</Toggle>
						<Toggle aria-label="Icon and Text">
							<HeartIcon className="w-4 h-4 mr-2" />
							Like
						</Toggle>
					</div>
				</div>
			</div>
		</div>
	)
}

export default function ToggleSample() {
	const [showAdvanced, setShowAdvanced] = useState(false)

	return (
		<Fragment>
			<ComponentDoc
				title="Toggle"
				description="Two-state buttons that can be pressed and unpressed, representing on/off states. Perfect for formatting controls, settings, preferences, and any binary choice interactions."
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
							<h3 className="text-lg font-semibold mb-4">Toggle Applications</h3>
							<div className="grid grid-cols-1 gap-8">
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<BoldIcon className="w-5 h-5" />
											Text Formatting
										</CardTitle>
										<CardDescription>Rich text editor controls with formatting and alignment toggles</CardDescription>
									</CardHeader>
									<CardContent>
										<TextFormattingToggles />
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<PlayIcon className="w-5 h-5" />
											Media Player
										</CardTitle>
										<CardDescription>Audio/video player controls with playback and preference toggles</CardDescription>
									</CardHeader>
									<CardContent>
										<MediaPlayerToggles />
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<SettingsIcon className="w-5 h-5" />
											Interface Settings
										</CardTitle>
										<CardDescription>Application preferences and interface customization options</CardDescription>
									</CardHeader>
									<CardContent>
										<InterfaceSettingsToggles />
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
											<ToggleLeftIcon className="w-5 h-5" />
											Simple Configurations
										</CardTitle>
										<CardDescription>Basic toggle variations with different sizes, variants, and states</CardDescription>
									</CardHeader>
									<CardContent>
										<BasicToggleExamples />
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
								<CardDescription>Best practices for implementing toggle components</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div>
										<h4 className="font-semibold mb-2">When to Use</h4>
										<ul className="space-y-1 text-sm text-muted-foreground">
											<li>• For binary on/off states and preferences</li>
											<li>• In toolbars for formatting and editing controls</li>
											<li>• For media player controls and playback options</li>
											<li>• In settings panels for feature toggles</li>
											<li>• For view mode switching and display options</li>
										</ul>
									</div>
									<Separator />
									<div>
										<h4 className="font-semibold mb-2">Design Principles</h4>
										<ul className="space-y-1 text-sm text-muted-foreground">
											<li>• Provide clear visual feedback for pressed/unpressed states</li>
											<li>• Use consistent sizing within toggle groups</li>
											<li>• Include meaningful aria-labels for accessibility</li>
											<li>• Group related toggles logically together</li>
											<li>• Consider using icons that clearly represent the function</li>
											<li>• Allow keyboard navigation and interaction</li>
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
										<strong>Use Cases:</strong> Formatting, Media, Settings{showAdvanced ? ', Basic' : ''}
									</p>
									<p>
										<strong>Features:</strong> Pressed States, Icon Support, Keyboard Navigation, Accessibility
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
