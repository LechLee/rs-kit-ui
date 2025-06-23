import { Fragment, useState } from 'react'
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
	GridIcon,
	LayoutListIcon,
	ImageIcon,
	MapIcon,
	CalendarIcon,
	BarChartIcon,
	PieChartIcon,
	TrendingUpIcon,
	SunIcon,
	MoonIcon,
	MonitorIcon,
	SmartphoneIcon,
	TabletIcon,
	LaptopIcon,
	PlayIcon,
	PauseIcon,
	SkipForwardIcon,
	SkipBackIcon,
	RepeatIcon,
	ShuffleIcon,
	VolumeIcon,
	Volume1Icon,
	Volume2Icon,
	VolumeXIcon,
	FilterIcon,
	SortAscIcon,
	SortDescIcon,
	SearchIcon,
	SettingsIcon,
	InfoIcon,
	EyeIcon,
	EyeOffIcon,
	LockIcon,
	UnlockIcon,
	WifiIcon,
	WifiOffIcon
} from 'lucide-react'
import { ToggleGroup, ToggleGroupItem, Label, Card, CardContent, CardDescription, CardHeader, CardTitle, Badge, Switch, Separator } from '@rs-kit/ui-kit'
import { ComponentDoc } from '@/components/ComponentDoc'

// Text Formatting Toggle Group
const TextFormattingGroup = () => {
	const [textStyle, setTextStyle] = useState<string[]>(['bold'])
	const [alignment, setAlignment] = useState<string>('left')
	const [listStyle, setListStyle] = useState<string>('')

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold flex items-center gap-2">
					<BoldIcon className="w-5 h-5" />
					Text Editor Toolbar
				</Label>
				<p className="text-sm text-muted-foreground">Rich text formatting with multiple and single selection toggle groups</p>
			</div>

			<div className="space-y-6">
				{/* Text Style (Multiple Selection) */}
				<div>
					<Label className="font-medium mb-3 block">Text Style (Multiple Selection)</Label>
					<ToggleGroup type="multiple" value={textStyle} onValueChange={setTextStyle} className="justify-start">
						<ToggleGroupItem value="bold" aria-label="Bold" size="sm">
							<BoldIcon className="w-4 h-4" />
						</ToggleGroupItem>
						<ToggleGroupItem value="italic" aria-label="Italic" size="sm">
							<ItalicIcon className="w-4 h-4" />
						</ToggleGroupItem>
						<ToggleGroupItem value="underline" aria-label="Underline" size="sm">
							<UnderlineIcon className="w-4 h-4" />
						</ToggleGroupItem>
						<ToggleGroupItem value="strikethrough" aria-label="Strikethrough" size="sm">
							<StrikethroughIcon className="w-4 h-4" />
						</ToggleGroupItem>
					</ToggleGroup>
					<p className="text-xs text-muted-foreground mt-2">Selected: {textStyle.length > 0 ? textStyle.join(', ') : 'None'}</p>
				</div>

				{/* Text Alignment (Single Selection) */}
				<div>
					<Label className="font-medium mb-3 block">Text Alignment (Single Selection)</Label>
					<ToggleGroup type="single" value={alignment} onValueChange={setAlignment} className="justify-start">
						<ToggleGroupItem value="left" aria-label="Align Left" size="sm">
							<AlignLeftIcon className="w-4 h-4" />
						</ToggleGroupItem>
						<ToggleGroupItem value="center" aria-label="Align Center" size="sm">
							<AlignCenterIcon className="w-4 h-4" />
						</ToggleGroupItem>
						<ToggleGroupItem value="right" aria-label="Align Right" size="sm">
							<AlignRightIcon className="w-4 h-4" />
						</ToggleGroupItem>
						<ToggleGroupItem value="justify" aria-label="Justify" size="sm">
							<AlignJustifyIcon className="w-4 h-4" />
						</ToggleGroupItem>
					</ToggleGroup>
					<p className="text-xs text-muted-foreground mt-2">Selected: {alignment || 'None'}</p>
				</div>

				{/* List Style (Single Selection) */}
				<div>
					<Label className="font-medium mb-3 block">List Style (Single Selection)</Label>
					<ToggleGroup type="single" value={listStyle} onValueChange={setListStyle} className="justify-start">
						<ToggleGroupItem value="bullet" aria-label="Bullet List" size="sm">
							<ListIcon className="w-4 h-4" />
						</ToggleGroupItem>
						<ToggleGroupItem value="numbered" aria-label="Numbered List" size="sm">
							<ListOrderedIcon className="w-4 h-4" />
						</ToggleGroupItem>
						<ToggleGroupItem value="quote" aria-label="Quote" size="sm">
							<QuoteIcon className="w-4 h-4" />
						</ToggleGroupItem>
						<ToggleGroupItem value="code" aria-label="Code Block" size="sm">
							<CodeIcon className="w-4 h-4" />
						</ToggleGroupItem>
					</ToggleGroup>
					<p className="text-xs text-muted-foreground mt-2">Selected: {listStyle || 'None'}</p>
				</div>

				{/* Preview */}
				<div className="p-4 border rounded-lg bg-gray-50">
					<p
						className={`text-sm ${
							textStyle.includes('bold') ? 'font-bold' : ''
						} ${textStyle.includes('italic') ? 'italic' : ''} ${
							textStyle.includes('underline') ? 'underline' : ''
						} ${textStyle.includes('strikethrough') ? 'line-through' : ''} ${
							alignment === 'center'
								? 'text-center'
								: alignment === 'right'
								? 'text-right'
								: alignment === 'justify'
								? 'text-justify'
								: 'text-left'
						}`}
					>
						This is a preview of your formatted text with the selected styling and alignment options applied. The text will change based on your toggle group selections.
					</p>
					{listStyle && (
						<div className="mt-2 text-xs text-muted-foreground">
							List style: <strong>{listStyle}</strong> is selected
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

// View Mode Toggle Group
const ViewModeGroup = () => {
	const [viewMode, setViewMode] = useState<string>('grid')
	const [chartType, setChartType] = useState<string[]>(['bar'])
	const [devicePreview, setDevicePreview] = useState<string>('desktop')

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold flex items-center gap-2">
					<GridIcon className="w-5 h-5" />
					View Controls
				</Label>
				<p className="text-sm text-muted-foreground">Interface view modes and visualization options</p>
			</div>

			<div className="space-y-6">
				{/* Layout View Mode */}
				<div>
					<Label className="font-medium mb-3 block">Content Layout</Label>
					<ToggleGroup type="single" value={viewMode} onValueChange={setViewMode} className="justify-start">
						<ToggleGroupItem value="grid" aria-label="Grid View">
							<GridIcon className="w-4 h-4 mr-2" />
							Grid
						</ToggleGroupItem>
						<ToggleGroupItem value="list" aria-label="List View">
							<LayoutListIcon className="w-4 h-4 mr-2" />
							List
						</ToggleGroupItem>
						<ToggleGroupItem value="gallery" aria-label="Gallery View">
							<ImageIcon className="w-4 h-4 mr-2" />
							Gallery
						</ToggleGroupItem>
						<ToggleGroupItem value="map" aria-label="Map View">
							<MapIcon className="w-4 h-4 mr-2" />
							Map
						</ToggleGroupItem>
					</ToggleGroup>
					<div className="mt-3 p-3 bg-gray-50 rounded text-sm">
						Current view: <strong className="capitalize">{viewMode}</strong> - Content will be displayed in {viewMode} format
					</div>
				</div>

				{/* Chart Types (Multiple Selection) */}
				<div>
					<Label className="font-medium mb-3 block">Chart Types (Multiple Selection)</Label>
					<ToggleGroup type="multiple" value={chartType} onValueChange={setChartType} className="justify-start">
						<ToggleGroupItem value="bar" aria-label="Bar Chart">
							<BarChartIcon className="w-4 h-4 mr-2" />
							Bar
						</ToggleGroupItem>
						<ToggleGroupItem value="pie" aria-label="Pie Chart">
							<PieChartIcon className="w-4 h-4 mr-2" />
							Pie
						</ToggleGroupItem>
						<ToggleGroupItem value="line" aria-label="Line Chart">
							<TrendingUpIcon className="w-4 h-4 mr-2" />
							Line
						</ToggleGroupItem>
					</ToggleGroup>
					<div className="mt-3 p-3 bg-gray-50 rounded text-sm">
						Active charts: <strong>{chartType.length > 0 ? chartType.join(', ') : 'None selected'}</strong>
					</div>
				</div>

				{/* Device Preview */}
				<div>
					<Label className="font-medium mb-3 block">Device Preview</Label>
					<ToggleGroup type="single" value={devicePreview} onValueChange={setDevicePreview} className="justify-start">
						<ToggleGroupItem value="mobile" aria-label="Mobile View" size="sm">
							<SmartphoneIcon className="w-4 h-4" />
						</ToggleGroupItem>
						<ToggleGroupItem value="tablet" aria-label="Tablet View" size="sm">
							<TabletIcon className="w-4 h-4" />
						</ToggleGroupItem>
						<ToggleGroupItem value="desktop" aria-label="Desktop View" size="sm">
							<LaptopIcon className="w-4 h-4" />
						</ToggleGroupItem>
						<ToggleGroupItem value="monitor" aria-label="Monitor View" size="sm">
							<MonitorIcon className="w-4 h-4" />
						</ToggleGroupItem>
					</ToggleGroup>
					<div className="mt-3 p-3 bg-gray-50 rounded text-sm">
						Previewing on: <strong className="capitalize">{devicePreview}</strong> device
					</div>
				</div>
			</div>
		</div>
	)
}

// Media Player Controls
const MediaPlayerGroup = () => {
	const [playbackModes, setPlaybackModes] = useState<string[]>(['repeat'])
	const [volumeLevel, setVolumeLevel] = useState<string>('medium')
	const [theme, setTheme] = useState<string>('system')

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold flex items-center gap-2">
					<PlayIcon className="w-5 h-5" />
					Media Controls
				</Label>
				<p className="text-sm text-muted-foreground">Audio/video player settings and preferences</p>
			</div>

			<div className="space-y-6">
				{/* Playback Controls */}
				<div>
					<Label className="font-medium mb-3 block">Playback Controls</Label>
					<div className="flex items-center justify-center gap-2">
						<ToggleGroup type="single" className="mr-4">
							<ToggleGroupItem value="prev" aria-label="Previous Track">
								<SkipBackIcon className="w-4 h-4" />
							</ToggleGroupItem>
							<ToggleGroupItem value="play" aria-label="Play/Pause">
								<PlayIcon className="w-4 h-4" />
							</ToggleGroupItem>
							<ToggleGroupItem value="next" aria-label="Next Track">
								<SkipForwardIcon className="w-4 h-4" />
							</ToggleGroupItem>
						</ToggleGroup>
					</div>
				</div>

				{/* Playback Modes (Multiple Selection) */}
				<div>
					<Label className="font-medium mb-3 block">Playback Modes (Multiple Selection)</Label>
					<ToggleGroup type="multiple" value={playbackModes} onValueChange={setPlaybackModes} className="justify-start">
						<ToggleGroupItem value="shuffle" aria-label="Shuffle">
							<ShuffleIcon className="w-4 h-4 mr-2" />
							Shuffle
						</ToggleGroupItem>
						<ToggleGroupItem value="repeat" aria-label="Repeat">
							<RepeatIcon className="w-4 h-4 mr-2" />
							Repeat
						</ToggleGroupItem>
					</ToggleGroup>
					<div className="mt-3 p-3 bg-gray-50 rounded text-sm">
						Active modes: <strong>{playbackModes.length > 0 ? playbackModes.join(', ') : 'None'}</strong>
					</div>
				</div>

				{/* Volume Control */}
				<div>
					<Label className="font-medium mb-3 block">Volume Level</Label>
					<ToggleGroup type="single" value={volumeLevel} onValueChange={setVolumeLevel} className="justify-start">
						<ToggleGroupItem value="mute" aria-label="Mute">
							<VolumeXIcon className="w-4 h-4" />
						</ToggleGroupItem>
						<ToggleGroupItem value="low" aria-label="Low Volume">
							<Volume1Icon className="w-4 h-4" />
						</ToggleGroupItem>
						<ToggleGroupItem value="medium" aria-label="Medium Volume">
							<Volume2Icon className="w-4 h-4" />
						</ToggleGroupItem>
						<ToggleGroupItem value="high" aria-label="High Volume">
							<VolumeIcon className="w-4 h-4" />
						</ToggleGroupItem>
					</ToggleGroup>
					<div className="mt-3 p-3 bg-gray-50 rounded text-sm">
						Volume: <strong className="capitalize">{volumeLevel}</strong>
					</div>
				</div>

				{/* Theme Selection */}
				<div>
					<Label className="font-medium mb-3 block">Theme Preference</Label>
					<ToggleGroup type="single" value={theme} onValueChange={setTheme} className="justify-start">
						<ToggleGroupItem value="light" aria-label="Light Theme">
							<SunIcon className="w-4 h-4 mr-2" />
							Light
						</ToggleGroupItem>
						<ToggleGroupItem value="dark" aria-label="Dark Theme">
							<MoonIcon className="w-4 h-4 mr-2" />
							Dark
						</ToggleGroupItem>
						<ToggleGroupItem value="system" aria-label="System Theme">
							<MonitorIcon className="w-4 h-4 mr-2" />
							System
						</ToggleGroupItem>
					</ToggleGroup>
					<div className="mt-3 p-3 bg-gray-50 rounded text-sm">
						Theme: <strong className="capitalize">{theme}</strong> mode
					</div>
				</div>
			</div>
		</div>
	)
}

// Filter and Sort Controls
const FilterSortGroup = () => {
	const [activeFilters, setActiveFilters] = useState<string[]>(['recent'])
	const [sortOptions, setSortOptions] = useState<string>('name')
	const [privacySettings, setPrivacySettings] = useState<string[]>(['secure'])

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold flex items-center gap-2">
					<FilterIcon className="w-5 h-5" />
					Filters & Sorting
				</Label>
				<p className="text-sm text-muted-foreground">Data filtering, sorting, and privacy controls</p>
			</div>

			<div className="space-y-6">
				{/* Content Filters (Multiple Selection) */}
				<div>
					<Label className="font-medium mb-3 block">Content Filters (Multiple Selection)</Label>
					<ToggleGroup type="multiple" value={activeFilters} onValueChange={setActiveFilters} className="justify-start flex-wrap">
						<ToggleGroupItem value="recent" aria-label="Recent" size="sm">
							<CalendarIcon className="w-4 h-4 mr-2" />
							Recent
						</ToggleGroupItem>
						<ToggleGroupItem value="favorites" aria-label="Favorites" size="sm">
							<SearchIcon className="w-4 h-4 mr-2" />
							Favorites
						</ToggleGroupItem>
						<ToggleGroupItem value="starred" aria-label="Starred" size="sm">
							<SettingsIcon className="w-4 h-4 mr-2" />
							Starred
						</ToggleGroupItem>
						<ToggleGroupItem value="shared" aria-label="Shared" size="sm">
							<InfoIcon className="w-4 h-4 mr-2" />
							Shared
						</ToggleGroupItem>
					</ToggleGroup>
					<div className="mt-3 p-3 bg-gray-50 rounded text-sm">
						Active filters: <strong>{activeFilters.length > 0 ? activeFilters.join(', ') : 'None'}</strong>
					</div>
				</div>

				{/* Sort Options */}
				<div>
					<Label className="font-medium mb-3 block">Sort Order</Label>
					<ToggleGroup type="single" value={sortOptions} onValueChange={setSortOptions} className="justify-start">
						<ToggleGroupItem value="name" aria-label="Sort by Name" size="sm">
							<SortAscIcon className="w-4 h-4 mr-2" />
							Name
						</ToggleGroupItem>
						<ToggleGroupItem value="date" aria-label="Sort by Date" size="sm">
							<CalendarIcon className="w-4 h-4 mr-2" />
							Date
						</ToggleGroupItem>
						<ToggleGroupItem value="size" aria-label="Sort by Size" size="sm">
							<SortDescIcon className="w-4 h-4 mr-2" />
							Size
						</ToggleGroupItem>
					</ToggleGroup>
					<div className="mt-3 p-3 bg-gray-50 rounded text-sm">
						Sorting by: <strong className="capitalize">{sortOptions}</strong>
					</div>
				</div>

				{/* Privacy Settings (Multiple Selection) */}
				<div>
					<Label className="font-medium mb-3 block">Privacy Settings (Multiple Selection)</Label>
					<ToggleGroup type="multiple" value={privacySettings} onValueChange={setPrivacySettings} className="justify-start">
						<ToggleGroupItem value="private" aria-label="Private Mode" size="sm">
							<EyeOffIcon className="w-4 h-4 mr-2" />
							Private
						</ToggleGroupItem>
						<ToggleGroupItem value="secure" aria-label="Secure Mode" size="sm">
							<LockIcon className="w-4 h-4 mr-2" />
							Secure
						</ToggleGroupItem>
						<ToggleGroupItem value="offline" aria-label="Offline Mode" size="sm">
							<WifiOffIcon className="w-4 h-4 mr-2" />
							Offline
						</ToggleGroupItem>
					</ToggleGroup>
					<div className="mt-3 p-3 bg-gray-50 rounded text-sm">
						Privacy modes: <strong>{privacySettings.length > 0 ? privacySettings.join(', ') : 'None'}</strong>
					</div>
				</div>
			</div>
		</div>
	)
}

// Basic Toggle Group Examples
const BasicToggleGroupExamples = () => {
	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold">Basic Examples</Label>
				<p className="text-sm text-muted-foreground">Simple toggle group configurations with different sizes and variants</p>
			</div>

			<div className="space-y-8">
				{/* Different Sizes */}
				<div>
					<Label className="font-medium mb-3 block">Different Sizes</Label>
					<div className="space-y-4">
						<div>
							<p className="text-sm text-muted-foreground mb-2">Small</p>
							<ToggleGroup type="multiple" size="sm">
								<ToggleGroupItem value="bold" aria-label="Bold">
									<BoldIcon className="w-3 h-3" />
								</ToggleGroupItem>
								<ToggleGroupItem value="italic" aria-label="Italic">
									<ItalicIcon className="w-3 h-3" />
								</ToggleGroupItem>
								<ToggleGroupItem value="underline" aria-label="Underline">
									<UnderlineIcon className="w-3 h-3" />
								</ToggleGroupItem>
							</ToggleGroup>
						</div>
						<div>
							<p className="text-sm text-muted-foreground mb-2">Default</p>
							<ToggleGroup type="multiple">
								<ToggleGroupItem value="bold" aria-label="Bold">
									<BoldIcon className="w-4 h-4" />
								</ToggleGroupItem>
								<ToggleGroupItem value="italic" aria-label="Italic">
									<ItalicIcon className="w-4 h-4" />
								</ToggleGroupItem>
								<ToggleGroupItem value="underline" aria-label="Underline">
									<UnderlineIcon className="w-4 h-4" />
								</ToggleGroupItem>
							</ToggleGroup>
						</div>
						<div>
							<p className="text-sm text-muted-foreground mb-2">Large</p>
							<ToggleGroup type="multiple" size="lg">
								<ToggleGroupItem value="bold" aria-label="Bold">
									<BoldIcon className="w-5 h-5" />
								</ToggleGroupItem>
								<ToggleGroupItem value="italic" aria-label="Italic">
									<ItalicIcon className="w-5 h-5" />
								</ToggleGroupItem>
								<ToggleGroupItem value="underline" aria-label="Underline">
									<UnderlineIcon className="w-5 h-5" />
								</ToggleGroupItem>
							</ToggleGroup>
						</div>
					</div>
				</div>

				{/* Different Variants */}
				<div>
					<Label className="font-medium mb-3 block">Different Variants</Label>
					<div className="space-y-4">
						<div>
							<p className="text-sm text-muted-foreground mb-2">Default Variant</p>
							<ToggleGroup type="single" variant="default">
								<ToggleGroupItem value="left" aria-label="Align Left">
									<AlignLeftIcon className="w-4 h-4" />
								</ToggleGroupItem>
								<ToggleGroupItem value="center" aria-label="Align Center">
									<AlignCenterIcon className="w-4 h-4" />
								</ToggleGroupItem>
								<ToggleGroupItem value="right" aria-label="Align Right">
									<AlignRightIcon className="w-4 h-4" />
								</ToggleGroupItem>
							</ToggleGroup>
						</div>
						<div>
							<p className="text-sm text-muted-foreground mb-2">Outline Variant</p>
							<ToggleGroup type="single" variant="outline">
								<ToggleGroupItem value="left" aria-label="Align Left">
									<AlignLeftIcon className="w-4 h-4" />
								</ToggleGroupItem>
								<ToggleGroupItem value="center" aria-label="Align Center">
									<AlignCenterIcon className="w-4 h-4" />
								</ToggleGroupItem>
								<ToggleGroupItem value="right" aria-label="Align Right">
									<AlignRightIcon className="w-4 h-4" />
								</ToggleGroupItem>
							</ToggleGroup>
						</div>
					</div>
				</div>

				{/* Type Differences */}
				<div>
					<Label className="font-medium mb-3 block">Single vs Multiple Selection</Label>
					<div className="space-y-4">
						<div>
							<p className="text-sm text-muted-foreground mb-2">Single Selection (Radio-like behavior)</p>
							<ToggleGroup type="single" defaultValue="option2">
								<ToggleGroupItem value="option1">Option 1</ToggleGroupItem>
								<ToggleGroupItem value="option2">Option 2</ToggleGroupItem>
								<ToggleGroupItem value="option3">Option 3</ToggleGroupItem>
							</ToggleGroup>
						</div>
						<div>
							<p className="text-sm text-muted-foreground mb-2">Multiple Selection (Checkbox-like behavior)</p>
							<ToggleGroup type="multiple" defaultValue={['option1', 'option3']}>
								<ToggleGroupItem value="option1">Option 1</ToggleGroupItem>
								<ToggleGroupItem value="option2">Option 2</ToggleGroupItem>
								<ToggleGroupItem value="option3">Option 3</ToggleGroupItem>
							</ToggleGroup>
						</div>
					</div>
				</div>

				{/* Disabled State */}
				<div>
					<Label className="font-medium mb-3 block">Disabled State</Label>
					<ToggleGroup type="multiple" disabled>
						<ToggleGroupItem value="bold" aria-label="Bold">
							<BoldIcon className="w-4 h-4" />
						</ToggleGroupItem>
						<ToggleGroupItem value="italic" aria-label="Italic">
							<ItalicIcon className="w-4 h-4" />
						</ToggleGroupItem>
						<ToggleGroupItem value="underline" aria-label="Underline">
							<UnderlineIcon className="w-4 h-4" />
						</ToggleGroupItem>
					</ToggleGroup>
				</div>
			</div>
		</div>
	)
}

export default function ToggleGroupSample() {
	const [showAdvanced, setShowAdvanced] = useState(false)

	return (
		<Fragment>
			<ComponentDoc
				title="Toggle Group"
				description="Groups of toggle buttons that work together, supporting both single and multiple selection modes. Perfect for toolbars, filters, preferences, and any grouped binary choices."
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
							<Badge variant="outline">{showAdvanced ? '5' : '4'} Examples</Badge>
						</div>

						{/* Real-World Examples */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Toggle Group Applications</h3>
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<BoldIcon className="w-5 h-5" />
											Text Editor
										</CardTitle>
										<CardDescription>Rich text formatting with single and multiple toggle groups</CardDescription>
									</CardHeader>
									<CardContent>
										<TextFormattingGroup />
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<GridIcon className="w-5 h-5" />
											View Controls
										</CardTitle>
										<CardDescription>Interface view modes and visualization options</CardDescription>
									</CardHeader>
									<CardContent>
										<ViewModeGroup />
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<PlayIcon className="w-5 h-5" />
											Media Player
										</CardTitle>
										<CardDescription>Audio/video controls with playback preferences</CardDescription>
									</CardHeader>
									<CardContent>
										<MediaPlayerGroup />
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<FilterIcon className="w-5 h-5" />
											Filters & Sorting
										</CardTitle>
										<CardDescription>Data filtering, sorting, and privacy controls</CardDescription>
									</CardHeader>
									<CardContent>
										<FilterSortGroup />
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
											<SettingsIcon className="w-5 h-5" />
											Configuration Options
										</CardTitle>
										<CardDescription>Basic toggle group variations with different sizes, variants, and behaviors</CardDescription>
									</CardHeader>
									<CardContent>
										<BasicToggleGroupExamples />
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
								<CardDescription>Best practices for implementing toggle group components</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div>
										<h4 className="font-semibold mb-2">When to Use</h4>
										<ul className="space-y-1 text-sm text-muted-foreground">
											<li>• For grouped related controls and options</li>
											<li>• In toolbars for formatting and editing functions</li>
											<li>• For view mode switching and display preferences</li>
											<li>• In filter panels for multiple selection criteria</li>
											<li>• For media controls and playback options</li>
										</ul>
									</div>
									<Separator />
									<div>
										<h4 className="font-semibold mb-2">Selection Types</h4>
										<ul className="space-y-1 text-sm text-muted-foreground">
											<li>• <strong>Single:</strong> Radio-like behavior, only one option selected</li>
											<li>• <strong>Multiple:</strong> Checkbox-like behavior, multiple options can be selected</li>
											<li>• Use single for mutually exclusive options (alignment, theme)</li>
											<li>• Use multiple for independent options (text styling, filters)</li>
										</ul>
									</div>
									<Separator />
									<div>
										<h4 className="font-semibold mb-2">Design Principles</h4>
										<ul className="space-y-1 text-sm text-muted-foreground">
											<li>• Group logically related toggle options together</li>
											<li>• Use consistent sizing and styling within groups</li>
											<li>• Provide visual feedback for selected states</li>
											<li>• Include meaningful icons and labels</li>
											<li>• Support keyboard navigation and screen readers</li>
											<li>• Consider using separators for distinct option groups</li>
										</ul>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Interactive State Display */}
						<div className="mt-6 p-4 bg-gray-50 rounded-lg">
							<h4 className="text-sm font-semibold text-gray-700 mb-2">Current Configuration:</h4>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
								<div>
									<p>
										<strong>Show Advanced:</strong> {showAdvanced ? 'Yes' : 'No'}
									</p>
									<p>
										<strong>Total Examples:</strong> {showAdvanced ? '5' : '4'}
									</p>
								</div>
								<div>
									<p>
										<strong>Use Cases:</strong> Text Editor, View Controls, Media Player, Filters{showAdvanced ? ', Basic Config' : ''}
									</p>
									<p>
										<strong>Selection Types:</strong> Single & Multiple, Various Sizes, Icon & Text Support
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
