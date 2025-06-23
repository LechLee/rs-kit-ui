import { Fragment, useState } from 'react'
import { CircularLoader, Button, Card, CardContent, CardHeader, CardTitle } from '@rs-kit/ui-kit'
import { ComponentDoc } from '@/components/ComponentDoc'
import { PaletteIcon, RotateCwIcon, SlidersIcon } from 'lucide-react'

export default function CircularLoaderSample() {
	const [isLoading, setIsLoading] = useState(false)
	const [selectedColor, setSelectedColor] = useState('#6a6262')

	const predefinedColors = [
		{ name: 'Default Gray', value: '#6a6262' },
		{ name: 'Primary', value: '#9a2b80' },
		{ name: 'Secondary', value: '#4f58a5' },
		{ name: 'Success Green', value: '#a8d071' },
		{ name: 'Warning Yellow', value: '#eea941' },
		{ name: 'Error Red', value: '#c53d05' },
		{ name: 'Sky Blue', value: '#85adda' },
		{ name: 'Pure Black', value: '#000000' },
		{ name: 'Pure White', value: '#ffffff' }
	]

	const simulateLoading = () => {
		setIsLoading(true)
		setTimeout(() => setIsLoading(false), 3000)
	}

	return (
		<Fragment>
			<ComponentDoc
				title="Circular Loader"
				description="A beautiful circular loading spinner with rotating bars animation. Features customizable sizes, colors, and smooth fade animations. Perfect for loading states and processing indicators."
				component={
					<div className="flex flex-col gap-8 w-full max-w-4xl">
						{/* Size Variations */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Size Variations</h3>
							<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
								<Card className="p-6">
									<CardHeader className="p-0 mb-4">
										<CardTitle className="text-sm text-center">Small (sm)</CardTitle>
									</CardHeader>
									<CardContent className="p-0 h-16 flex items-center justify-center">
										<CircularLoader size="sm" />
									</CardContent>
								</Card>
								
								<Card className="p-6">
									<CardHeader className="p-0 mb-4">
										<CardTitle className="text-sm text-center">Medium (md)</CardTitle>
									</CardHeader>
									<CardContent className="p-0 h-16 flex items-center justify-center">
										<CircularLoader size="md" />
									</CardContent>
								</Card>
								
								<Card className="p-6">
									<CardHeader className="p-0 mb-4">
										<CardTitle className="text-sm text-center">Large (lg)</CardTitle>
									</CardHeader>
									<CardContent className="p-0 h-16 flex items-center justify-center">
										<CircularLoader size="lg" />
									</CardContent>
								</Card>
								
								<Card className="p-6">
									<CardHeader className="p-0 mb-4">
										<CardTitle className="text-sm text-center">Extra Large (xl)</CardTitle>
									</CardHeader>
									<CardContent className="p-0 h-16 flex items-center justify-center">
										<CircularLoader size="xl" />
									</CardContent>
								</Card>
							</div>
						</div>

						{/* Color Customization */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Color Customization</h3>
							<div className="space-y-4">
								<div className="flex flex-wrap gap-2">
									{predefinedColors.map((color) => (
										<Button
											key={color.name}
											variant={selectedColor === color.value ? "default" : "outline"}
											size="sm"
											onClick={() => setSelectedColor(color.value)}
											className="text-xs"
										>
											<div 
												className="w-3 h-3 rounded-full mr-2 border" 
												style={{ backgroundColor: color.value }}
											/>
											{color.name}
										</Button>
									))}
								</div>
								
								<Card className="p-8">
									<CardContent className="p-0 h-24 flex items-center justify-center">
										<CircularLoader size="lg" color={selectedColor} />
									</CardContent>
								</Card>
								
								<div className="text-center text-sm text-gray-600">
									Current color: <span className="font-mono">{selectedColor}</span>
								</div>
							</div>
						</div>

						{/* Background Variations */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Background Variations</h3>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
								<Card className="p-6 bg-white">
									<CardHeader className="p-0 mb-4">
										<CardTitle className="text-sm text-center">White Background</CardTitle>
									</CardHeader>
									<CardContent className="p-0 h-16 flex items-center justify-center">
										<CircularLoader size="md" color="#9a2b80" />
									</CardContent>
								</Card>
								
								<Card className="p-6 bg-gray-100">
									<CardHeader className="p-0 mb-4">
										<CardTitle className="text-sm text-center">Light Gray Background</CardTitle>
									</CardHeader>
									<CardContent className="p-0 h-16 flex items-center justify-center">
										<CircularLoader size="md" color="#4f58a5" />
									</CardContent>
								</Card>
								
								<Card className="p-6 bg-gray-800 text-white">
									<CardHeader className="p-0 mb-4">
										<CardTitle className="text-sm text-center text-white">Dark Background</CardTitle>
									</CardHeader>
									<CardContent className="p-0 h-16 flex items-center justify-center">
										<CircularLoader size="md" color="#ffffff" />
									</CardContent>
								</Card>
							</div>
						</div>

						{/* Interactive Loading Demo */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Interactive Loading Demo</h3>
							<div className="space-y-4">
								<div className="flex gap-3">
									<Button onClick={simulateLoading} disabled={isLoading}>
										<RotateCwIcon className="w-4 h-4" />
										{isLoading ? 'Loading...' : 'Start 3s Loading'}
									</Button>
								</div>
								
								<Card className="p-8">
									<CardContent className="p-0 h-32 flex flex-col items-center justify-center gap-4">
										{isLoading ? (
											<>
												<CircularLoader size="lg" color="#9a2b80" />
												<p className="text-sm text-gray-600">Processing your request...</p>
											</>
										) : (
											<>
												<div className="w-16 h-16 flex items-center justify-center text-green-500">
													<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
													</svg>
												</div>
												<p className="text-sm text-gray-600">Ready! Click the button above to start loading.</p>
											</>
										)}
									</CardContent>
								</Card>
							</div>
						</div>

						{/* Use Cases */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Common Use Cases</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<Card className="p-6">
									<CardHeader className="p-0 mb-4">
										<CardTitle className="text-sm flex items-center gap-2">
											<SlidersIcon className="w-4 h-4" />
											Form Submission
										</CardTitle>
									</CardHeader>
									<CardContent className="p-0 space-y-4">
										<div className="p-4 border rounded-lg bg-gray-50">
											<div className="space-y-3">
												<div className="h-4 bg-gray-200 rounded animate-pulse"></div>
												<div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
											</div>
										</div>
										<div className="flex items-center gap-3 justify-center">
											<CircularLoader size="sm" color="#4f58a5" />
											<span className="text-sm text-gray-600">Submitting form...</span>
										</div>
									</CardContent>
								</Card>
								
								<Card className="p-6">
									<CardHeader className="p-0 mb-4">
										<CardTitle className="text-sm flex items-center gap-2">
											<PaletteIcon className="w-4 h-4" />
											Data Loading
										</CardTitle>
									</CardHeader>
									<CardContent className="p-0 space-y-4">
										<div className="p-4 border rounded-lg bg-gray-50">
											<div className="space-y-2">
												<div className="h-3 bg-gray-200 rounded animate-pulse"></div>
												<div className="h-3 bg-gray-200 rounded animate-pulse w-2/3"></div>
												<div className="h-3 bg-gray-200 rounded animate-pulse w-1/2"></div>
											</div>
										</div>
										<div className="flex items-center gap-3 justify-center">
											<CircularLoader size="sm" color="#a8d071" />
											<span className="text-sm text-gray-600">Loading data...</span>
										</div>
									</CardContent>
								</Card>
							</div>
						</div>

						{/* Features Overview */}
						<div className="p-4 bg-gray-50 rounded-lg">
							<h4 className="text-sm font-semibold text-gray-700 mb-2">Component Features:</h4>
							<ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
								<li><strong>Smooth Animation:</strong> CSS-based circular fade animation with rotating bars</li>
								<li><strong>Multiple Sizes:</strong> Four size variants (sm, md, lg, xl)</li>
								<li><strong>Custom Colors:</strong> Easily customizable color via props</li>
								<li><strong>Lightweight:</strong> Pure CSS animations, no JavaScript dependencies</li>
								<li><strong>Responsive:</strong> Scales appropriately across different screen sizes</li>
								<li><strong>Accessible:</strong> Works with screen readers and keyboard navigation</li>
							</ul>
						</div>
					</div>
				}
			/>

			<ComponentDoc
				title="Circular Loader Props & Usage"
				description="Comprehensive guide to CircularLoader component props, customization options, and implementation patterns."
				component={
					<div className="flex flex-col gap-6 w-full max-w-4xl">
						{/* Props Reference */}
						<div className="p-4 bg-green-50 rounded-lg">
							<h4 className="text-sm font-semibold text-green-700 mb-2">Props Reference:</h4>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-600">
								<div>
									<strong>Size Options:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li><code>size?: 'sm' | 'md' | 'lg' | 'xl'</code> - Loader size (default: 'md')</li>
										<li><code>sm</code> - 32px (w-8 h-8)</li>
										<li><code>md</code> - 64px (w-16 h-16)</li>
										<li><code>lg</code> - 80px (w-20 h-20)</li>
										<li><code>xl</code> - 96px (w-24 h-24)</li>
									</ul>
								</div>
								<div>
									<strong>Customization Props:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li><code>color?: string</code> - Bar color (default: '#6a6262')</li>
										<li><code>className?: string</code> - Additional CSS classes</li>
									</ul>
								</div>
							</div>
						</div>

						{/* Usage Patterns */}
						<div className="p-4 bg-blue-50 rounded-lg">
							<h4 className="text-sm font-semibold text-blue-700 mb-2">Usage Patterns:</h4>
							<ul className="text-sm text-blue-600 space-y-1 list-disc list-inside">
								<li><strong>Page Loading:</strong> Full-screen loading states</li>
								<li><strong>Button Loading:</strong> Inline loading for form submissions</li>
								<li><strong>Data Fetching:</strong> API call loading indicators</li>
								<li><strong>File Processing:</strong> Upload/download progress indicators</li>
								<li><strong>Background Tasks:</strong> Long-running operation feedback</li>
							</ul>
						</div>

						{/* Code Examples */}
						<div className="p-4 bg-gray-100 rounded-lg">
							<h4 className="text-sm font-semibold text-gray-700 mb-2">Code Examples:</h4>
							<pre className="text-xs text-gray-600 overflow-x-auto whitespace-pre-wrap">
{`// Basic usage
<CircularLoader />

// Different sizes
<CircularLoader size="sm" />
<CircularLoader size="md" />
<CircularLoader size="lg" />
<CircularLoader size="xl" />

// Custom colors
<CircularLoader color="#9a2b80" />
<CircularLoader color="#4f58a5" />
<CircularLoader color="#a8d071" />

// With custom styling
<CircularLoader 
  size="lg" 
  color="#ffffff" 
  className="my-custom-class" 
/>

// Loading button example
<Button disabled={isLoading}>
  {isLoading ? (
    <>
      <CircularLoader size="sm" color="#ffffff" />
      Loading...
    </>
  ) : (
    'Submit'
  )}
</Button>

// Full screen loading
{isLoading && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
    <div className="bg-white p-8 rounded-lg text-center">
      <CircularLoader size="lg" />
      <p className="mt-4">Processing...</p>
    </div>
  </div>
)}`}
							</pre>
						</div>

						{/* Animation Details */}
						<div className="p-4 bg-purple-50 rounded-lg">
							<h4 className="text-sm font-semibold text-purple-700 mb-2">Animation Details:</h4>
							<ul className="text-sm text-purple-600 space-y-1 list-disc list-inside">
								<li><strong>Duration:</strong> 1 second per rotation cycle</li>
								<li><strong>Timing:</strong> Linear timing function for consistent speed</li>
								<li><strong>Bars:</strong> 8 rotating bars with staggered fade animations</li>
								<li><strong>Delays:</strong> Each bar has 0.125s delay offset</li>
								<li><strong>Opacity:</strong> Fades from 0 to 1 and back to 0</li>
								<li><strong>Transform Origin:</strong> Bars rotate around center point</li>
							</ul>
						</div>

						{/* Best Practices */}
						<div className="p-4 bg-orange-50 rounded-lg">
							<h4 className="text-sm font-semibold text-orange-700 mb-2">Best Practices:</h4>
							<ul className="text-sm text-orange-600 space-y-1 list-disc list-inside">
								<li><strong>Color Contrast:</strong> Ensure loader color contrasts well with background</li>
								<li><strong>Size Selection:</strong> Choose appropriate size for the context</li>
								<li><strong>Loading Text:</strong> Pair with descriptive text when possible</li>
								<li><strong>Timeout Handling:</strong> Provide fallback for failed loading states</li>
								<li><strong>Performance:</strong> Hide loaders when not needed to save resources</li>
								<li><strong>Accessibility:</strong> Add aria-labels for screen readers</li>
							</ul>
						</div>
					</div>
				}
			/>
		</Fragment>
	)
}