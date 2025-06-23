import { Fragment, useState } from 'react'
import {
	AspectRatio,
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
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@rs-kit/ui-kit'
import {
	ImageIcon,
	VideoIcon,
	MonitorIcon,
	SmartphoneIcon,
	TabletIcon,
	TvIcon,
	CameraIcon,
	PlayIcon,
	MapIcon,
	LayoutIcon,
	FrameIcon,
	SquareIcon,
	InfoIcon,
	GalleryHorizontal,
	FilmIcon,
	PresentationIcon,
	InstagramIcon
} from 'lucide-react'
import { ComponentDoc } from '@/components/ComponentDoc'

// Media Gallery with Different Aspect Ratios
const MediaGallery = () => {
	const [selectedRatio, setSelectedRatio] = useState('16/9')

	const ratioOptions = [
		{ value: '16/9', label: '16:9 (Widescreen)', ratio: 16 / 9, description: 'HD videos, presentations' },
		{ value: '4/3', label: '4:3 (Classic)', ratio: 4 / 3, description: 'Traditional photos, displays' },
		{ value: '1/1', label: '1:1 (Square)', ratio: 1 / 1, description: 'Social media, avatars' },
		{ value: '3/2', label: '3:2 (Photography)', ratio: 3 / 2, description: 'Digital cameras, prints' },
		{ value: '21/9', label: '21:9 (Ultra-wide)', ratio: 21 / 9, description: 'Cinematic, ultrawide monitors' },
		{ value: '9/16', label: '9:16 (Vertical)', ratio: 9 / 16, description: 'Mobile stories, reels' }
	]

	const mediaItems = [
		{
			id: 1,
			type: 'image',
			src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&dpr=2&q=80',
			alt: 'Mountain landscape',
			title: 'Mountain Vista'
		},
		{
			id: 2,
			type: 'image',
			src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&dpr=2&q=80',
			alt: 'Forest path',
			title: 'Forest Trail'
		},
		{
			id: 3,
			type: 'video',
			src: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&dpr=2&q=80',
			alt: 'Ocean waves',
			title: 'Ocean Waves'
		},
		{
			id: 4,
			type: 'image',
			src: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&dpr=2&q=80',
			alt: 'Desert landscape',
			title: 'Desert Sunset'
		}
	]

	const currentRatio = ratioOptions.find((r) => r.value === selectedRatio)

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold flex items-center gap-2">
					<GalleryHorizontal className="w-5 h-5" />
					Media Gallery
				</Label>
				<p className="text-sm text-muted-foreground">Responsive image and video gallery with adjustable aspect ratios</p>
			</div>

			<div className="space-y-4">
				<div className="flex items-center gap-4">
					<Label htmlFor="ratio-select">Aspect Ratio:</Label>
					<Select value={selectedRatio} onValueChange={setSelectedRatio}>
						<SelectTrigger id="ratio-select" className="w-64">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{ratioOptions.map((option) => (
								<SelectItem key={option.value} value={option.value}>
									<div className="flex flex-col">
										<span>{option.label}</span>
										<span className="text-xs text-muted-foreground">{option.description}</span>
									</div>
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<Badge variant="outline">{currentRatio?.label}</Badge>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{mediaItems.map((item) => (
						<div key={item.id} className="space-y-2">
							<AspectRatio ratio={currentRatio?.ratio || 16 / 9} className="bg-muted rounded-lg overflow-hidden group">
								<img src={item.src} alt={item.alt} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
								{item.type === 'video' && (
									<div className="absolute inset-0 flex items-center justify-center">
										<div className="bg-black/50 rounded-full p-3">
											<PlayIcon className="w-8 h-8 text-white" />
										</div>
									</div>
								)}
							</AspectRatio>
							<div className="flex items-center gap-2">
								{item.type === 'video' ? <VideoIcon className="w-4 h-4 text-muted-foreground" /> : <ImageIcon className="w-4 h-4 text-muted-foreground" />}
								<span className="text-sm font-medium">{item.title}</span>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

// Device Preview Mockups
const DevicePreviewMockups = () => {
	const [selectedDevice, setSelectedDevice] = useState('desktop')

	const devices = [
		{
			id: 'desktop',
			name: 'Desktop',
			ratio: 16 / 9,
			icon: MonitorIcon,
			description: '1920x1080 display'
		},
		{
			id: 'tablet',
			name: 'Tablet',
			ratio: 4 / 3,
			icon: TabletIcon,
			description: 'iPad-style display'
		},
		{
			id: 'mobile',
			name: 'Mobile',
			ratio: 9 / 16,
			icon: SmartphoneIcon,
			description: 'Phone portrait mode'
		},
		{
			id: 'tv',
			name: 'TV/Cinema',
			ratio: 21 / 9,
			icon: TvIcon,
			description: 'Ultra-wide display'
		}
	]

	const currentDevice = devices.find((d) => d.id === selectedDevice)
	const IconComponent = currentDevice?.icon || MonitorIcon

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold flex items-center gap-2">
					<PresentationIcon className="w-5 h-5" />
					Device Previews
				</Label>
				<p className="text-sm text-muted-foreground">Preview your content on different device aspect ratios</p>
			</div>

			<div className="flex flex-wrap gap-2">
				{devices.map((device) => {
					const DeviceIcon = device.icon
					return (
						<Button key={device.id} variant={selectedDevice === device.id ? 'default' : 'outline'} size="sm" onClick={() => setSelectedDevice(device.id)} className="flex items-center gap-2">
							<DeviceIcon className="w-4 h-4" />
							{device.name}
						</Button>
					)
				})}
			</div>

			<div className="max-w-2xl mx-auto">
				<div className="flex items-center gap-3 mb-4">
					<IconComponent className="w-5 h-5" />
					<div>
						<h4 className="font-medium">{currentDevice?.name} Preview</h4>
						<p className="text-sm text-muted-foreground">{currentDevice?.description}</p>
					</div>
				</div>

				<AspectRatio ratio={currentDevice?.ratio || 16 / 9} className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg border-2 border-gray-200 overflow-hidden">
					<div className="h-full w-full p-6 flex flex-col">
						{/* Mock browser chrome for desktop/tablet */}
						{(selectedDevice === 'desktop' || selectedDevice === 'tablet') && (
							<div className="bg-gray-200 rounded-t-md px-4 py-2 mb-4 flex items-center gap-2">
								<div className="flex gap-1">
									<div className="w-3 h-3 bg-red-400 rounded-full"></div>
									<div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
									<div className="w-3 h-3 bg-green-400 rounded-full"></div>
								</div>
								<div className="flex-1 bg-white rounded px-3 py-1 text-xs text-gray-500">https://yourapp.com</div>
							</div>
						)}

						{/* Mock mobile status bar */}
						{selectedDevice === 'mobile' && (
							<div className="bg-black text-white px-4 py-1 mb-4 flex justify-between items-center text-xs rounded-t-md">
								<span>9:41</span>
								<div className="flex items-center gap-1">
									<div className="w-4 h-2 border border-white rounded-sm">
										<div className="w-3 h-1 bg-white rounded-sm m-0.5"></div>
									</div>
								</div>
							</div>
						)}

						{/* Content area */}
						<div className="flex-1 bg-white rounded-md p-6 shadow-inner">
							<div className="space-y-4">
								<div className="h-6 bg-gray-200 rounded w-3/4"></div>
								<div className="space-y-2">
									<div className="h-4 bg-gray-100 rounded w-full"></div>
									<div className="h-4 bg-gray-100 rounded w-5/6"></div>
									<div className="h-4 bg-gray-100 rounded w-4/6"></div>
								</div>
								{selectedDevice !== 'mobile' && (
									<div className="grid grid-cols-2 gap-4">
										<div className="h-20 bg-gray-100 rounded"></div>
										<div className="h-20 bg-gray-100 rounded"></div>
									</div>
								)}
							</div>
						</div>
					</div>
				</AspectRatio>
			</div>
		</div>
	)
}

// Social Media Post Formats
const SocialMediaFormats = () => {
	const [selectedPlatform, setSelectedPlatform] = useState('instagram')

	const platforms = [
		{
			id: 'instagram',
			name: 'Instagram Post',
			ratio: 1 / 1,
			color: 'from-purple-500 to-pink-500',
			description: 'Square format for feeds'
		},
		{
			id: 'story',
			name: 'Instagram Story',
			ratio: 9 / 16,
			color: 'from-orange-500 to-red-500',
			description: 'Vertical format for stories'
		},
		{
			id: 'youtube',
			name: 'YouTube Thumbnail',
			ratio: 16 / 9,
			color: 'from-red-500 to-red-600',
			description: 'Standard video thumbnail'
		},
		{
			id: 'twitter',
			name: 'Twitter Header',
			ratio: 3 / 1,
			color: 'from-blue-400 to-blue-600',
			description: 'Profile header banner'
		},
		{
			id: 'linkedin',
			name: 'LinkedIn Post',
			ratio: 1.91 / 1,
			color: 'from-blue-600 to-blue-700',
			description: 'Professional content format'
		}
	]

	const currentPlatform = platforms.find((p) => p.id === selectedPlatform)

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold flex items-center gap-2">
					<InstagramIcon className="w-5 h-5" />
					Social Media Formats
				</Label>
				<p className="text-sm text-muted-foreground">Design content for different social media platforms</p>
			</div>

			<div className="flex flex-wrap gap-2">
				{platforms.map((platform) => (
					<Button key={platform.id} variant={selectedPlatform === platform.id ? 'default' : 'outline'} size="sm" onClick={() => setSelectedPlatform(platform.id)}>
						{platform.name}
					</Button>
				))}
			</div>

			<div className="max-w-md mx-auto">
				<div className="text-center mb-4">
					<h4 className="font-medium">{currentPlatform?.name}</h4>
					<p className="text-sm text-muted-foreground">{currentPlatform?.description}</p>
				</div>

				<AspectRatio ratio={currentPlatform?.ratio || 1 / 1} className={`bg-gradient-to-br ${currentPlatform?.color} rounded-lg overflow-hidden border shadow-lg`}>
					<div className="h-full w-full p-6 flex flex-col justify-between text-white">
						<div>
							<h3 className="text-xl font-bold mb-2">Your Brand</h3>
							<p className="text-sm opacity-90">Create stunning content that fits perfectly in this format</p>
						</div>
						<div className="flex justify-between items-end">
							<div className="text-xs opacity-75">{currentPlatform?.name}</div>
							<Badge variant="secondary" className="text-xs">
								{currentPlatform?.ratio === 1 ? '1:1' : `${currentPlatform?.ratio.toFixed(2)}:1`}
							</Badge>
						</div>
					</div>
				</AspectRatio>
			</div>
		</div>
	)
}

// Basic Aspect Ratio Examples
const BasicAspectRatioExamples = () => {
	const commonRatios = [
		{ ratio: 16 / 9, label: '16:9', description: 'Widescreen' },
		{ ratio: 4 / 3, label: '4:3', description: 'Classic' },
		{ ratio: 1 / 1, label: '1:1', description: 'Square' },
		{ ratio: 3 / 2, label: '3:2', description: 'Photography' }
	]

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold">Common Aspect Ratios</Label>
				<p className="text-sm text-muted-foreground">Standard aspect ratios used across different media</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{commonRatios.map((item) => (
					<div key={item.label} className="space-y-3">
						<div className="flex items-center justify-between">
							<Label className="font-medium">{item.label}</Label>
							<Badge variant="outline">{item.description}</Badge>
						</div>
						<AspectRatio ratio={item.ratio} className="bg-muted rounded-md overflow-hidden">
							<img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&dpr=2&q=80" alt="Landscape example" className="h-full w-full object-cover" />
							<div className="absolute inset-0 bg-black/20 flex items-center justify-center">
								<Badge className="bg-white/90 text-black">{item.label}</Badge>
							</div>
						</AspectRatio>
					</div>
				))}
			</div>
		</div>
	)
}

export default function AspectRatioSample() {
	const [showAdvanced, setShowAdvanced] = useState(false)

	return (
		<Fragment>
			<ComponentDoc
				title="Aspect Ratio"
				description="Containers that maintain consistent width-to-height ratios for responsive media content. Perfect for images, videos, embeds, and any content requiring proportional scaling."
				component={
					<div className="flex flex-col gap-8 w-full max-w-4xl">
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
							<h3 className="text-lg font-semibold mb-4">Media Applications</h3>
							<div className="grid grid-cols-1 gap-8">
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<GalleryHorizontal className="w-5 h-5" />
											Responsive Media Gallery
										</CardTitle>
										<CardDescription>Image and video gallery with adjustable aspect ratios</CardDescription>
									</CardHeader>
									<CardContent>
										<MediaGallery />
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<MonitorIcon className="w-5 h-5" />
											Device Preview Mockups
										</CardTitle>
										<CardDescription>Preview content across different device aspect ratios</CardDescription>
									</CardHeader>
									<CardContent>
										<DevicePreviewMockups />
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<InstagramIcon className="w-5 h-5" />
											Social Media Formats
										</CardTitle>
										<CardDescription>Design content for different social media platform requirements</CardDescription>
									</CardHeader>
									<CardContent>
										<SocialMediaFormats />
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
											<FrameIcon className="w-5 h-5" />
											Standard Ratios
										</CardTitle>
										<CardDescription>Common aspect ratios used across different media</CardDescription>
									</CardHeader>
									<CardContent>
										<BasicAspectRatioExamples />
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
								<CardDescription>Best practices for implementing aspect ratio containers</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div>
										<h4 className="font-semibold mb-2">When to Use</h4>
										<ul className="space-y-1 text-sm text-muted-foreground">
											<li>• For responsive images, videos, and media embeds</li>
											<li>• When content needs to maintain proportions across screen sizes</li>
											<li>• For social media content creation tools</li>
											<li>• In design systems requiring consistent media dimensions</li>
											<li>• For placeholder content and skeleton loading states</li>
										</ul>
									</div>
									<Separator />
									<div>
										<h4 className="font-semibold mb-2">Common Ratios</h4>
										<div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
											<div>
												<strong>16:9</strong> - Video, presentations, widescreen
											</div>
											<div>
												<strong>4:3</strong> - Classic displays, tablets
											</div>
											<div>
												<strong>1:1</strong> - Social media, avatars, thumbnails
											</div>
											<div>
												<strong>3:2</strong> - Photography, digital cameras
											</div>
											<div>
												<strong>21:9</strong> - Ultrawide, cinematic content
											</div>
											<div>
												<strong>9:16</strong> - Mobile stories, vertical video
											</div>
										</div>
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
										<strong>Use Cases:</strong> Gallery, Device Preview, Social Media{showAdvanced ? ', Standards' : ''}
									</p>
									<p>
										<strong>Features:</strong> Responsive, Ratio Selection, Preview Modes
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
