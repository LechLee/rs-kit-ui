import { Fragment, useState } from 'react'
import { Slider, Label, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Badge, Separator, Switch, Alert, AlertDescription, Input } from '@rs-kit/ui-kit'
import {
	VolumeIcon,
	SunDim,
	ZoomInIcon,
	DollarSignIcon,
	CalendarIcon,
	ClockIcon,
	StarIcon,
	FilterIcon,
	SlidersIcon,
	SettingsIcon,
	InfoIcon,
	MusicIcon,
	MonitorIcon,
	ImageIcon,
	FastForward,
	GaugeIcon,
	ThermometerIcon,
	ActivityIcon
} from 'lucide-react'
import { ComponentDoc } from '@/components/ComponentDoc'

// Audio & Video Controls
const AudioVideoControls = () => {
	const [volume, setVolume] = useState([75])
	const [brightness, setBrightness] = useState([60])
	const [playbackSpeed, setPlaybackSpeed] = useState([1])
	const [seekPosition, setSeekPosition] = useState([45])

	const formatTime = (seconds: number) => {
		const mins = Math.floor(seconds / 60)
		const secs = Math.floor(seconds % 60)
		return `${mins}:${secs.toString().padStart(2, '0')}`
	}

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold">Media Controls</Label>
				<p className="text-sm text-muted-foreground">Adjust audio, video, and playback settings</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="space-y-4">
					<div className="space-y-3">
						<Label className="flex items-center gap-2">
							<VolumeIcon className="w-4 h-4" />
							Volume: {volume[0]}%
						</Label>
						<Slider value={volume} onValueChange={setVolume} max={100} step={1} className="w-full" />
						<div className="flex justify-between text-xs text-muted-foreground">
							<span>Mute</span>
							<span>Max</span>
						</div>
					</div>

					<div className="space-y-3">
						<Label className="flex items-center gap-2">
							<SunDim className="w-4 h-4" />
							Brightness: {brightness[0]}%
						</Label>
						<Slider value={brightness} onValueChange={setBrightness} max={100} step={5} className="w-full" />
					</div>
				</div>

				<div className="space-y-4">
					<div className="space-y-3">
						<Label className="flex items-center gap-2">
							<FastForward className="w-4 h-4" />
							Playback Speed: {playbackSpeed[0]}x
						</Label>
						<Slider value={playbackSpeed} onValueChange={setPlaybackSpeed} min={0.25} max={3} step={0.25} className="w-full" />
						<div className="flex justify-between text-xs text-muted-foreground">
							<span>0.25x</span>
							<span>3x</span>
						</div>
					</div>

					<div className="space-y-3">
						<Label className="flex items-center gap-2">
							<ClockIcon className="w-4 h-4" />
							Seek: {formatTime(seekPosition[0] * 60)}
						</Label>
						<Slider value={seekPosition} onValueChange={setSeekPosition} max={180} step={1} className="w-full" />
						<div className="flex justify-between text-xs text-muted-foreground">
							<span>0:00</span>
							<span>3:00</span>
						</div>
					</div>
				</div>
			</div>

			<Alert>
				<MusicIcon className="h-4 w-4" />
				<AlertDescription>
					Media settings: Volume {volume[0]}%, Brightness {brightness[0]}%, Speed {playbackSpeed[0]}x
				</AlertDescription>
			</Alert>
		</div>
	)
}

// Price Range Filter
const PriceRangeFilter = () => {
	const [priceRange, setPriceRange] = useState([25, 75])
	const [budget, setBudget] = useState([500])
	const [discount, setDiscount] = useState([15])

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold">Shopping Filters</Label>
				<p className="text-sm text-muted-foreground">Set your price preferences and budget limits</p>
			</div>

			<div className="space-y-6">
				<div className="space-y-3">
					<Label className="flex items-center gap-2">
						<DollarSignIcon className="w-4 h-4" />
						Price Range: ${priceRange[0]} - ${priceRange[1]}
					</Label>
					<Slider value={priceRange} onValueChange={setPriceRange} max={100} step={5} className="w-full" />
					<div className="flex justify-between text-xs text-muted-foreground">
						<span>$0</span>
						<span>$100+</span>
					</div>
				</div>

				<div className="space-y-3">
					<Label className="flex items-center gap-2">
						<FilterIcon className="w-4 h-4" />
						Maximum Budget: ${budget[0]}
					</Label>
					<Slider value={budget} onValueChange={setBudget} min={50} max={2000} step={50} className="w-full" />
					<div className="flex justify-between text-xs text-muted-foreground">
						<span>$50</span>
						<span>$2000</span>
					</div>
				</div>

				<div className="space-y-3">
					<Label className="flex items-center gap-2">
						<StarIcon className="w-4 h-4" />
						Minimum Discount: {discount[0]}%
					</Label>
					<Slider value={discount} onValueChange={setDiscount} min={0} max={50} step={5} className="w-full" />
					<div className="flex justify-between text-xs text-muted-foreground">
						<span>0%</span>
						<span>50%</span>
					</div>
				</div>
			</div>

			<div className="p-4 bg-green-50 border border-green-200 rounded-lg">
				<h4 className="font-medium text-green-900 mb-2">Active Filters</h4>
				<div className="flex flex-wrap gap-2">
					<Badge variant="secondary">
						Price: ${priceRange[0]} - ${priceRange[1]}
					</Badge>
					<Badge variant="secondary">Budget: ${budget[0]}</Badge>
					<Badge variant="secondary">Discount: {discount[0]}%+</Badge>
				</div>
			</div>
		</div>
	)
}

// Settings & Preferences
const SettingsPreferences = () => {
	const [fontSize, setFontSize] = useState([16])
	const [timeout, setTimeout] = useState([30])
	const [quality, setQuality] = useState([80])
	const [temperature, setTemperature] = useState([22])

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold">System Preferences</Label>
				<p className="text-sm text-muted-foreground">Customize your application settings</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="space-y-4">
					<div className="space-y-3">
						<Label className="flex items-center gap-2">
							<ZoomInIcon className="w-4 h-4" />
							Font Size: {fontSize[0]}px
						</Label>
						<Slider value={fontSize} onValueChange={setFontSize} min={12} max={24} step={1} className="w-full" />
						<div className="flex justify-between text-xs text-muted-foreground">
							<span>Small</span>
							<span>Large</span>
						</div>
					</div>

					<div className="space-y-3">
						<Label className="flex items-center gap-2">
							<ClockIcon className="w-4 h-4" />
							Session Timeout: {timeout[0]} min
						</Label>
						<Slider value={timeout} onValueChange={setTimeout} min={5} max={120} step={5} className="w-full" />
					</div>
				</div>

				<div className="space-y-4">
					<div className="space-y-3">
						<Label className="flex items-center gap-2">
							<ImageIcon className="w-4 h-4" />
							Image Quality: {quality[0]}%
						</Label>
						<Slider value={quality} onValueChange={setQuality} min={10} max={100} step={10} className="w-full" />
						<div className="flex justify-between text-xs text-muted-foreground">
							<span>Low</span>
							<span>High</span>
						</div>
					</div>

					<div className="space-y-3">
						<Label className="flex items-center gap-2">
							<ThermometerIcon className="w-4 h-4" />
							Temperature: {temperature[0]}°C
						</Label>
						<Slider value={temperature} onValueChange={setTemperature} min={16} max={30} step={1} className="w-full" />
						<div className="flex justify-between text-xs text-muted-foreground">
							<span>Cool</span>
							<span>Warm</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

// Basic Slider Examples
const BasicSliderExamples = () => {
	const [simpleValue, setSimpleValue] = useState([50])
	const [rangeValue, setRangeValue] = useState([25, 75])
	const [stepValue, setStepValue] = useState([0])

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold">Basic Slider Examples</Label>
				<p className="text-sm text-muted-foreground">Simple single and range sliders</p>
			</div>

			<div className="space-y-6">
				<div className="space-y-3">
					<Label>Single Value: {simpleValue[0]}</Label>
					<Slider value={simpleValue} onValueChange={setSimpleValue} max={100} step={1} className="w-full" />
				</div>

				<div className="space-y-3">
					<Label>
						Range Value: {rangeValue[0]} - {rangeValue[1]}
					</Label>
					<Slider value={rangeValue} onValueChange={setRangeValue} max={100} step={1} className="w-full" />
				</div>

				<div className="space-y-3">
					<Label>Step Value: {stepValue[0]}</Label>
					<Slider value={stepValue} onValueChange={setStepValue} min={-10} max={10} step={2} className="w-full" />
					<div className="flex justify-between text-xs text-muted-foreground">
						<span>-10</span>
						<span>10</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default function SliderSample() {
	const [showAdvanced, setShowAdvanced] = useState(false)

	return (
		<Fragment>
			<ComponentDoc
				title="Slider"
				description="Interactive range controls for selecting values within a defined range. Perfect for volume controls, filters, settings, and any numeric input with visual feedback."
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
							<h3 className="text-lg font-semibold mb-4">Control Applications</h3>
							<div className="grid grid-cols-1 gap-8">
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<VolumeIcon className="w-5 h-5" />
											Audio & Video Controls
										</CardTitle>
										<CardDescription>Media player controls with volume, brightness, speed, and seeking</CardDescription>
									</CardHeader>
									<CardContent>
										<AudioVideoControls />
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<DollarSignIcon className="w-5 h-5" />
											Price & Shopping Filters
										</CardTitle>
										<CardDescription>E-commerce filtering with price ranges, budgets, and discounts</CardDescription>
									</CardHeader>
									<CardContent>
										<PriceRangeFilter />
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<SettingsIcon className="w-5 h-5" />
											System Preferences
										</CardTitle>
										<CardDescription>Application settings with font size, timeouts, and quality controls</CardDescription>
									</CardHeader>
									<CardContent>
										<SettingsPreferences />
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
											<SlidersIcon className="w-5 h-5" />
											Basic Sliders
										</CardTitle>
										<CardDescription>Simple single value, range, and stepped sliders</CardDescription>
									</CardHeader>
									<CardContent>
										<BasicSliderExamples />
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
								<CardDescription>Best practices for implementing slider controls</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div>
										<h4 className="font-semibold mb-2">When to Use</h4>
										<ul className="space-y-1 text-sm text-muted-foreground">
											<li>• For selecting values within a continuous range</li>
											<li>• When users need immediate visual feedback</li>
											<li>• For controls like volume, brightness, or zoom</li>
											<li>• For filtering content by numeric criteria</li>
											<li>• When precise values are less important than relative positioning</li>
										</ul>
									</div>
									<Separator />
									<div>
										<h4 className="font-semibold mb-2">Design Principles</h4>
										<ul className="space-y-1 text-sm text-muted-foreground">
											<li>• Always show the current value clearly</li>
											<li>• Provide meaningful min/max labels when helpful</li>
											<li>• Use appropriate step values for the use case</li>
											<li>• Group related sliders with clear section headers</li>
											<li>• Consider using range sliders for filtering operations</li>
											<li>• Ensure sufficient touch target size for mobile</li>
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
										<strong>Control Types:</strong> Media, Shopping, Settings{showAdvanced ? ', Basic' : ''}
									</p>
									<p>
										<strong>Features:</strong> Range Selection, Live Updates, Visual Feedback
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
