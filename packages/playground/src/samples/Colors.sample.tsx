import { Fragment, useState } from 'react'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Badge,
	Button,
	Switch,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
	Alert,
	AlertDescription,
	AlertTitle,
	Separator
} from '@rs-kit/ui-kit'
import {
	PaletteIcon,
	CopyIcon,
	CheckIcon,
	EyeIcon,
	ContrastIcon,
	InfoIcon,
	AlertTriangleIcon,
	CheckCircleIcon,
	XCircleIcon,
	LightbulbIcon,
	BookOpenIcon,
	CodeIcon,
	MonitorIcon,
	SmartphoneIcon,
	TabletIcon
} from 'lucide-react'
import { ComponentDoc } from '@/components/ComponentDoc'

// Color swatch component with copy functionality
const ColorSwatch = ({ 
	name, 
	value, 
	className, 
	description,
	usage 
}: { 
	name: string
	value: string 
	className: string
	description?: string
	usage?: string
}) => {
	const [copied, setCopied] = useState(false)

	const copyToClipboard = async (text: string) => {
		try {
			await navigator.clipboard.writeText(text)
			setCopied(true)
			setTimeout(() => setCopied(false), 2000)
		} catch (err) {
			console.error('Failed to copy: ', err)
		}
	}

	return (
		<div className="group relative">
			<div className="text-center">
				<div 
					className={`w-24 h-24 rounded-xl border border-gray-200 mx-auto mb-3 cursor-pointer transition-all hover:scale-105 hover:shadow-lg ${className}`}
					onClick={() => copyToClipboard(value)}
				>
					<div className="w-full h-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
						{copied ? (
							<CheckIcon className="w-6 h-6 text-white drop-shadow-lg" />
						) : (
							<CopyIcon className="w-6 h-6 text-white drop-shadow-lg" />
						)}
					</div>
				</div>
				<div className="space-y-1">
					<div className="text-sm font-semibold text-gray-900">{name}</div>
					<div className="text-xs text-gray-600 font-mono">{value}</div>
					{description && <div className="text-xs text-gray-500">{description}</div>}
					{usage && <Badge variant="outline" className="text-xs">{usage}</Badge>}
				</div>
			</div>
		</div>
	)
}

// Color group component
const ColorGroup = ({ 
	title, 
	description,
	colors 
}: { 
	title: string
	description?: string
	colors: Array<{ 
		name: string
		value: string
		className: string
		description?: string
		usage?: string
	}>
}) => (
	<Card>
		<CardHeader>
			<CardTitle className="flex items-center gap-2">
				<BookOpenIcon className="w-5 h-5" />
				{title}
			</CardTitle>
			{description && <CardDescription>{description}</CardDescription>}
		</CardHeader>
		<CardContent>
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
				{colors.map((color, index) => (
					<ColorSwatch key={index} {...color} />
				))}
			</div>
		</CardContent>
	</Card>
)

// Gradient showcase component
const GradientShowcase = ({ gradients }: { gradients: Array<{ name: string; className: string; from: string; to: string }> }) => (
	<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
		{gradients.map((gradient, index) => (
			<div key={index} className={`${gradient.className} p-6 rounded-xl text-white`}>
				<h4 className="font-semibold text-lg mb-2">{gradient.name}</h4>
				<p className="text-sm opacity-90">{gradient.from} → {gradient.to}</p>
				<div className="mt-4 flex gap-2">
					<Badge variant="secondary" className="bg-white/20 text-white border-white/30">
						background: {gradient.className.replace('bg-', 'var(--')}
					</Badge>
				</div>
			</div>
		))}
	</div>
)

// Component examples
const ComponentExamples = () => {
	const [darkMode, setDarkMode] = useState(false)

	return (
		<div className={darkMode ? 'dark' : ''}>
			<div className="space-y-6">
				<div className="flex items-center justify-between">
					<h3 className="text-lg font-semibold">Component Color Usage</h3>
					<div className="flex items-center gap-2">
						<Switch 
							id="dark-mode" 
							checked={darkMode} 
							onCheckedChange={setDarkMode}
						/>
						<label htmlFor="dark-mode" className="text-sm">Dark Mode</label>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{/* Primary Buttons */}
					<div className="space-y-2">
						<h4 className="text-sm font-medium text-gray-700">Primary Buttons</h4>
						<div className="space-y-2">
							<Button className="w-full bg-primary-color-1 hover:bg-primary-color-1/90">
								Primary Action
							</Button>
							<Button className="w-full bg-primary-color-2 hover:bg-primary-color-2/90">
								Secondary Action
							</Button>
							<Button className="w-full bg-primary-color-3 hover:bg-primary-color-3/90">
								Tertiary Action
							</Button>
						</div>
					</div>

					{/* Status Alerts */}
					<div className="space-y-2">
						<h4 className="text-sm font-medium text-gray-700">Status Colors</h4>
						<div className="space-y-2">
							<Alert className="border-secondary-color-4 bg-secondary-color-4/10">
								<CheckCircleIcon className="h-4 w-4 text-secondary-color-4" />
								<AlertTitle className="text-secondary-color-4">Success</AlertTitle>
								<AlertDescription className="text-gray-700">
									Operation completed successfully
								</AlertDescription>
							</Alert>
							<Alert className="border-secondary-color-6 bg-secondary-color-6/10">
								<AlertTriangleIcon className="h-4 w-4 text-secondary-color-6" />
								<AlertTitle className="text-secondary-color-6">Warning</AlertTitle>
								<AlertDescription className="text-gray-700">
									Please review your input
								</AlertDescription>
							</Alert>
							<Alert className="border-secondary-color-5 bg-secondary-color-5/10">
								<XCircleIcon className="h-4 w-4 text-secondary-color-5" />
								<AlertTitle className="text-secondary-color-5">Error</AlertTitle>
								<AlertDescription className="text-gray-700">
									Something went wrong
								</AlertDescription>
							</Alert>
						</div>
					</div>

					{/* Gradient Cards */}
					<div className="space-y-2">
						<h4 className="text-sm font-medium text-gray-700">Gradient Cards</h4>
						<div className="space-y-2">
							<Card className="bg-gradient-1 text-white border-none">
								<CardContent className="p-4">
									<h5 className="font-semibold">Hero Section</h5>
									<p className="text-sm opacity-90">Gradient background</p>
								</CardContent>
							</Card>
							<Card className="bg-gradient-2 text-white border-none">
								<CardContent className="p-4">
									<h5 className="font-semibold">Feature Card</h5>
									<p className="text-sm opacity-90">Subtle gradient</p>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default function ColorsSample() {
	const [selectedFormat, setSelectedFormat] = useState('hex')
	const [showUsage, setShowUsage] = useState(true)

	// Color definitions
	const basicColors = [
		{ name: 'Black', value: '#292929', className: 'bg-black', description: 'Primary text color', usage: 'Text' },
		{ name: 'White', value: '#FFFFFF', className: 'bg-white border border-gray-200', description: 'Background color', usage: 'Background' }
	]

	const greyColors = [
		{ name: 'Grey 1', value: '#292929', className: 'bg-grey-1', description: 'Darkest grey', usage: 'Headings' },
		{ name: 'Grey 2', value: '#666666', className: 'bg-grey-2', description: 'Dark grey', usage: 'Body text' },
		{ name: 'Grey 3', value: '#999999', className: 'bg-grey-3', description: 'Medium grey', usage: 'Muted text' },
		{ name: 'Grey 4', value: '#B6B6B6', className: 'bg-grey-4', description: 'Light grey', usage: 'Borders' },
		{ name: 'Grey 5', value: '#E0E0E0', className: 'bg-grey-5', description: 'Very light grey', usage: 'Dividers' },
		{ name: 'Grey 6', value: '#F0F0F0', className: 'bg-grey-6', description: 'Background grey', usage: 'Backgrounds' }
	]

	const primaryColors = [
		{ name: 'Primary 1', value: '#E20079', className: 'bg-primary-color-1', description: 'Brand pink', usage: 'Primary CTA' },
		{ name: 'Primary 2', value: '#383F82', className: 'bg-primary-color-2', description: 'Brand blue', usage: 'Secondary CTA' },
		{ name: 'Primary 3', value: '#8F48CC', className: 'bg-primary-color-3', description: 'Brand purple', usage: 'Accent' }
	]

	const secondaryColors = [
		{ name: 'Secondary 1', value: '#292929', className: 'bg-secondary-color-1', description: 'Dark neutral', usage: 'Text' },
		{ name: 'Secondary 2', value: '#FFFFFF', className: 'bg-secondary-color-2 border border-grey-4', description: 'Light neutral', usage: 'Background' },
		{ name: 'Secondary 3', value: '#F0F0F0', className: 'bg-secondary-color-3', description: 'Light background', usage: 'Cards' },
		{ name: 'Secondary 4', value: '#00D008', className: 'bg-secondary-color-4', description: 'Success green', usage: 'Success states' },
		{ name: 'Secondary 5', value: '#FF0000', className: 'bg-secondary-color-5', description: 'Error red', usage: 'Error states' },
		{ name: 'Secondary 6', value: '#FFA726', className: 'bg-secondary-color-6', description: 'Warning orange', usage: 'Warning states' },
		{ name: 'Secondary 7', value: '#F5BEEA', className: 'bg-secondary-color-7', description: 'Light pink', usage: 'Highlights' },
		{ name: 'Secondary 8', value: '#7653FF', className: 'bg-secondary-color-8', description: 'Info purple', usage: 'Info states' },
		{ name: 'Secondary 9', value: '#B6B6B6', className: 'bg-secondary-color-9', description: 'Muted grey', usage: 'Disabled states' }
	]

	const chartColors = [
		{ name: 'Chart 1', value: 'hsl(220, 70%, 50%)', className: 'bg-chart-1', description: 'Primary chart color', usage: 'Data viz' },
		{ name: 'Chart 2', value: 'hsl(160, 60%, 45%)', className: 'bg-chart-2', description: 'Secondary chart color', usage: 'Data viz' },
		{ name: 'Chart 3', value: 'hsl(30, 80%, 55%)', className: 'bg-chart-3', description: 'Tertiary chart color', usage: 'Data viz' },
		{ name: 'Chart 4', value: 'hsl(280, 65%, 60%)', className: 'bg-chart-4', description: 'Quaternary chart color', usage: 'Data viz' },
		{ name: 'Chart 5', value: 'hsl(340, 75%, 55%)', className: 'bg-chart-5', description: 'Quinary chart color', usage: 'Data viz' }
	]

	const gradients = [
		{ name: 'Gradient 1', className: 'bg-gradient-1', from: 'Purple', to: 'Pink' },
		{ name: 'Gradient 2', className: 'bg-gradient-2', from: 'Pink', to: 'Light Pink' },
		{ name: 'Gradient 3', className: 'bg-gradient-3', from: 'Primary Pink', to: 'Light Pink' },
		{ name: 'Gradient 4', className: 'bg-gradient-4', from: 'Blue', to: 'Purple' }
	]

	return (
		<Fragment>
			<ComponentDoc
				title="Color Palette"
				description="Complete color system with brand colors, semantic colors, gradients, and chart colors. All colors are available as CSS variables and Tailwind classes with comprehensive usage guidelines."
				component={
					<div className="flex flex-col gap-8 w-full max-w-6xl">
						{/* Hero Section */}
						<div className="bg-gradient-1 text-white p-8 rounded-xl">
							<div className="flex items-center gap-3 mb-4">
								<PaletteIcon className="w-8 h-8" />
								<h1 className="text-3xl font-bold">Color Story</h1>
							</div>
							<p className="text-lg opacity-90 mb-4">
								A carefully crafted color palette designed for accessibility, consistency, and visual hierarchy.
							</p>
							<div className="flex flex-wrap gap-4">
								<Badge variant="secondary" className="bg-white/20 text-white border-white/30">
									<MonitorIcon className="w-4 h-4 mr-2" />
									WCAG AA Compliant
								</Badge>
								<Badge variant="secondary" className="bg-white/20 text-white border-white/30">
									<EyeIcon className="w-4 h-4 mr-2" />
									Accessibility Tested
								</Badge>
								<Badge variant="secondary" className="bg-white/20 text-white border-white/30">
									<ContrastIcon className="w-4 h-4 mr-2" />
									High Contrast
								</Badge>
							</div>
						</div>

						{/* Controls */}
						<div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-gray-50 rounded-lg">
							<div className="flex items-center gap-4">
								<div className="flex items-center gap-2">
									<Switch 
										id="show-usage" 
										checked={showUsage} 
										onCheckedChange={setShowUsage}
									/>
									<label htmlFor="show-usage" className="text-sm">Show Usage Info</label>
								</div>
							</div>
							<Tabs value={selectedFormat} onValueChange={setSelectedFormat}>
								<TabsList>
									<TabsTrigger value="hex">HEX</TabsTrigger>
									<TabsTrigger value="rgb">RGB</TabsTrigger>
									<TabsTrigger value="hsl">HSL</TabsTrigger>
								</TabsList>
							</Tabs>
						</div>

						{/* Color Groups */}
						<div className="space-y-8">
							<ColorGroup 
								title="Basic Colors" 
								description="Fundamental black and white colors for text and backgrounds"
								colors={basicColors.map(color => ({ 
									...color, 
									usage: showUsage ? color.usage : undefined,
									description: showUsage ? color.description : undefined
								}))} 
							/>

							<ColorGroup 
								title="Grey Scale" 
								description="Neutral colors for text hierarchy, borders, and subtle backgrounds"
								colors={greyColors.map(color => ({ 
									...color, 
									usage: showUsage ? color.usage : undefined,
									description: showUsage ? color.description : undefined
								}))} 
							/>

							<ColorGroup 
								title="Primary Colors" 
								description="Brand colors for primary actions and key interface elements"
								colors={primaryColors.map(color => ({ 
									...color, 
									usage: showUsage ? color.usage : undefined,
									description: showUsage ? color.description : undefined
								}))} 
							/>

							<ColorGroup 
								title="Secondary Colors" 
								description="Semantic and utility colors for status indicators and secondary actions"
								colors={secondaryColors.map(color => ({ 
									...color, 
									usage: showUsage ? color.usage : undefined,
									description: showUsage ? color.description : undefined
								}))} 
							/>

							<ColorGroup 
								title="Chart Colors" 
								description="Data visualization colors designed for accessibility and distinction"
								colors={chartColors.map(color => ({ 
									...color, 
									usage: showUsage ? color.usage : undefined,
									description: showUsage ? color.description : undefined
								}))} 
							/>
						</div>

						{/* Gradients */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<LightbulbIcon className="w-5 h-5" />
									Gradient Colors
								</CardTitle>
								<CardDescription>
									Beautiful gradient combinations for hero sections and highlight areas
								</CardDescription>
							</CardHeader>
							<CardContent>
								<GradientShowcase gradients={gradients} />
							</CardContent>
						</Card>

						{/* Usage Guidelines */}
						<Tabs defaultValue="css" className="space-y-4">
							<TabsList className="grid w-full grid-cols-3">
								<TabsTrigger value="css">CSS Variables</TabsTrigger>
								<TabsTrigger value="tailwind">Tailwind Classes</TabsTrigger>
								<TabsTrigger value="components">Components</TabsTrigger>
							</TabsList>

							<TabsContent value="css">
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<CodeIcon className="w-5 h-5" />
											CSS Variables Usage
										</CardTitle>
										<CardDescription>Use CSS custom properties for dynamic theming</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="space-y-4">
											<div className="bg-gray-50 p-4 rounded-lg">
												<h4 className="font-semibold mb-2">Color Variables</h4>
												<pre className="text-sm text-gray-700">
{`/* Primary Colors */
background-color: var(--primary-color-1);
color: var(--primary-color-2);

/* Grey Scale */
border-color: var(--grey-4);
color: var(--grey-2);

/* Semantic Colors */
background-color: var(--secondary-color-4); /* Success */
background-color: var(--secondary-color-5); /* Error */
background-color: var(--secondary-color-6); /* Warning */`}
												</pre>
											</div>
											<Alert>
												<InfoIcon className="h-4 w-4" />
												<AlertTitle>Best Practice</AlertTitle>
												<AlertDescription>
													Use CSS variables for dynamic theming and better maintainability. All colors automatically support dark mode when implemented.
												</AlertDescription>
											</Alert>
										</div>
									</CardContent>
								</Card>
							</TabsContent>

							<TabsContent value="tailwind">
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<BookOpenIcon className="w-5 h-5" />
											Tailwind Classes
										</CardTitle>
										<CardDescription>Pre-configured Tailwind utilities for rapid development</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="space-y-4">
											<div className="bg-gray-50 p-4 rounded-lg">
												<h4 className="font-semibold mb-2">Background Classes</h4>
												<pre className="text-sm text-gray-700">
{`className="bg-primary-color-1"     // Brand pink
className="bg-primary-color-2"     // Brand blue  
className="bg-secondary-color-4"   // Success green
className="bg-secondary-color-5"   // Error red
className="bg-gradient-1"          // Purple to pink`}
												</pre>
											</div>
											<div className="bg-gray-50 p-4 rounded-lg">
												<h4 className="font-semibold mb-2">Text Classes</h4>
												<pre className="text-sm text-gray-700">
{`className="text-grey-1"           // Dark text
className="text-grey-3"           // Muted text
className="text-primary-color-1"  // Brand pink text
className="text-secondary-color-4" // Success text`}
												</pre>
											</div>
											<div className="bg-gray-50 p-4 rounded-lg">
												<h4 className="font-semibold mb-2">Border Classes</h4>
												<pre className="text-sm text-gray-700">
{`className="border-grey-4"         // Light border
className="border-primary-color-1" // Brand border
className="border-secondary-color-5" // Error border`}
												</pre>
											</div>
										</div>
									</CardContent>
								</Card>
							</TabsContent>

							<TabsContent value="components">
								<Card>
									<CardHeader>
										<CardTitle>Component Color Examples</CardTitle>
										<CardDescription>See how colors are applied in real components</CardDescription>
									</CardHeader>
									<CardContent>
										<ComponentExamples />
									</CardContent>
								</Card>
							</TabsContent>
						</Tabs>

						{/* Accessibility Guidelines */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<EyeIcon className="w-5 h-5" />
									Accessibility Guidelines
								</CardTitle>
								<CardDescription>Color usage best practices for inclusive design</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div className="space-y-4">
										<h4 className="font-semibold">Contrast Requirements</h4>
										<ul className="space-y-2 text-sm">
											<li className="flex items-center gap-2">
												<CheckCircleIcon className="w-4 h-4 text-secondary-color-4" />
												All text meets WCAG AA standards (4.5:1 ratio)
											</li>
											<li className="flex items-center gap-2">
												<CheckCircleIcon className="w-4 h-4 text-secondary-color-4" />
												Large text meets AAA standards (3:1 ratio)
											</li>
											<li className="flex items-center gap-2">
												<CheckCircleIcon className="w-4 h-4 text-secondary-color-4" />
												UI components have sufficient contrast
											</li>
										</ul>
									</div>
									<div className="space-y-4">
										<h4 className="font-semibold">Color Usage Rules</h4>
										<ul className="space-y-2 text-sm">
											<li className="flex items-center gap-2">
												<InfoIcon className="w-4 h-4 text-secondary-color-8" />
												Never rely on color alone to convey information
											</li>
											<li className="flex items-center gap-2">
												<InfoIcon className="w-4 h-4 text-secondary-color-8" />
												Use icons or text labels alongside colors
											</li>
											<li className="flex items-center gap-2">
												<InfoIcon className="w-4 h-4 text-secondary-color-8" />
												Test with color blindness simulators
											</li>
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
									<p><strong>Color Format:</strong> {selectedFormat.toUpperCase()}</p>
									<p><strong>Show Usage Info:</strong> {showUsage ? 'Enabled' : 'Disabled'}</p>
								</div>
								<div>
									<p><strong>Total Colors:</strong> {basicColors.length + greyColors.length + primaryColors.length + secondaryColors.length + chartColors.length}</p>
									<p><strong>Gradient Variations:</strong> {gradients.length}</p>
								</div>
							</div>
						</div>
					</div>
				}
			/>
		</Fragment>
	)
}