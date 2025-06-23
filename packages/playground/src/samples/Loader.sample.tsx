import { Fragment, useState } from 'react'
import { Loader, Button, Card, CardContent, CardHeader, CardTitle } from '@rs-kit/ui-kit'
import { ComponentDoc } from '@/components/ComponentDoc'
import { RotateCwIcon, DownloadIcon, SendIcon, CheckIcon } from 'lucide-react'

export default function LoaderSample() {
	const [isLoading, setIsLoading] = useState(false)
	const [buttonLoading, setButtonLoading] = useState<string | null>(null)
	const [uploadProgress, setUploadProgress] = useState(false)

	const simulateLoading = () => {
		setIsLoading(true)
		setTimeout(() => setIsLoading(false), 3000)
	}

	const simulateButtonLoading = (buttonId: string) => {
		setButtonLoading(buttonId)
		setTimeout(() => setButtonLoading(null), 2000)
	}

	const simulateUpload = () => {
		setUploadProgress(true)
		setTimeout(() => setUploadProgress(false), 4000)
	}

	return (
		<Fragment>
			<ComponentDoc
				title="Loader"
				description="A simple, lightweight loading spinner component with customizable sizes. Built with pure CSS animations for optimal performance. Perfect for buttons, forms, and inline loading states."
				component={
					<div className="flex flex-col gap-8 w-full max-w-4xl">
						{/* Size Variations */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Size Variations</h3>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
								<Card className="p-6">
									<CardHeader className="p-0 mb-4">
										<CardTitle className="text-sm text-center">Small (sm)</CardTitle>
									</CardHeader>
									<CardContent className="p-0 h-16 flex items-center justify-center">
										<Loader size="sm" />
									</CardContent>
									<div className="text-center text-xs text-gray-500 mt-2">16px × 16px</div>
								</Card>
								
								<Card className="p-6">
									<CardHeader className="p-0 mb-4">
										<CardTitle className="text-sm text-center">Medium (md)</CardTitle>
									</CardHeader>
									<CardContent className="p-0 h-16 flex items-center justify-center">
										<Loader size="md" />
									</CardContent>
									<div className="text-center text-xs text-gray-500 mt-2">24px × 24px</div>
								</Card>
								
								<Card className="p-6">
									<CardHeader className="p-0 mb-4">
										<CardTitle className="text-sm text-center">Large (lg)</CardTitle>
									</CardHeader>
									<CardContent className="p-0 h-16 flex items-center justify-center">
										<Loader size="lg" />
									</CardContent>
									<div className="text-center text-xs text-gray-500 mt-2">32px × 32px</div>
								</Card>
							</div>
						</div>

						{/* Color Variations */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Color Variations</h3>
							<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
								<Card className="p-6 bg-white">
									<CardHeader className="p-0 mb-4">
										<CardTitle className="text-sm text-center">Default Gray</CardTitle>
									</CardHeader>
									<CardContent className="p-0 h-16 flex items-center justify-center">
										<Loader size="md" />
									</CardContent>
								</Card>
								
								<Card className="p-6 bg-blue-500">
									<CardHeader className="p-0 mb-4">
										<CardTitle className="text-sm text-center text-white">White on Blue</CardTitle>
									</CardHeader>
									<CardContent className="p-0 h-16 flex items-center justify-center">
										<Loader size="md" className="border-blue-200 border-t-white" />
									</CardContent>
								</Card>
								
								<Card className="p-6 bg-gray-800">
									<CardHeader className="p-0 mb-4">
										<CardTitle className="text-sm text-center text-white">Light on Dark</CardTitle>
									</CardHeader>
									<CardContent className="p-0 h-16 flex items-center justify-center">
										<Loader size="md" className="border-gray-600 border-t-gray-300" />
									</CardContent>
								</Card>
								
								<Card className="p-6 bg-green-100">
									<CardHeader className="p-0 mb-4">
										<CardTitle className="text-sm text-center">Green Theme</CardTitle>
									</CardHeader>
									<CardContent className="p-0 h-16 flex items-center justify-center">
										<Loader size="md" className="border-green-200 border-t-green-600" />
									</CardContent>
								</Card>
							</div>
						</div>

						{/* Button Integration */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Button Integration</h3>
							<div className="space-y-6">
								<div>
									<h4 className="text-sm font-medium text-gray-600 mb-3">Loading States</h4>
									<div className="flex flex-wrap gap-3">
										<Button 
											onClick={() => simulateButtonLoading('submit')}
											disabled={buttonLoading === 'submit'}
										>
											{buttonLoading === 'submit' ? (
												<>
													<Loader size="sm" className="border-white border-t-white/60" />
													Submitting...
												</>
											) : (
												<>
													<SendIcon className="w-4 h-4" />
													Submit Form
												</>
											)}
										</Button>
										
										<Button 
											variant="outline"
											onClick={() => simulateButtonLoading('download')}
											disabled={buttonLoading === 'download'}
										>
											{buttonLoading === 'download' ? (
												<>
													<Loader size="sm" />
													Downloading...
												</>
											) : (
												<>
													<DownloadIcon className="w-4 h-4" />
													Download
												</>
											)}
										</Button>
										
										<Button 
											variant="secondary"
											onClick={() => simulateButtonLoading('save')}
											disabled={buttonLoading === 'save'}
										>
											{buttonLoading === 'save' ? (
												<>
													<Loader size="sm" />
													Saving...
												</>
											) : (
												'Save Changes'
											)}
										</Button>
									</div>
								</div>

								<div>
									<h4 className="text-sm font-medium text-gray-600 mb-3">Different Button Sizes</h4>
									<div className="flex flex-wrap items-center gap-3">
										<Button 
											size="sm"
											onClick={() => simulateButtonLoading('small')}
											disabled={buttonLoading === 'small'}
										>
											{buttonLoading === 'small' ? (
												<Loader size="sm" className="border-white border-t-white/60" />
											) : (
												'Small Button'
											)}
										</Button>
										
										<Button 
											onClick={() => simulateButtonLoading('default')}
											disabled={buttonLoading === 'default'}
										>
											{buttonLoading === 'default' ? (
												<>
													<Loader size="sm" className="border-white border-t-white/60" />
													Loading...
												</>
											) : (
												'Default Button'
											)}
										</Button>
										
										<Button 
											size="lg"
											onClick={() => simulateButtonLoading('large')}
											disabled={buttonLoading === 'large'}
										>
											{buttonLoading === 'large' ? (
												<>
													<Loader size="md" className="border-white border-t-white/60" />
													Processing...
												</>
											) : (
												'Large Button'
											)}
										</Button>
									</div>
								</div>
							</div>
						</div>

						{/* Interactive Demo */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Interactive Loading Demo</h3>
							<div className="space-y-4">
								<div className="flex gap-3">
									<Button onClick={simulateLoading} disabled={isLoading}>
										<RotateCwIcon className="w-4 h-4" />
										{isLoading ? 'Loading...' : 'Start Loading'}
									</Button>
									<Button onClick={simulateUpload} disabled={uploadProgress} variant="outline">
										<DownloadIcon className="w-4 h-4" />
										{uploadProgress ? 'Uploading...' : 'Upload File'}
									</Button>
								</div>
								
								<Card className="p-6">
									<CardContent className="p-0 space-y-4">
										<div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
											<span className="text-sm font-medium">General Loading State:</span>
											<div className="flex items-center gap-2">
												{isLoading ? (
													<>
														<Loader size="sm" />
														<span className="text-sm text-gray-600">Loading...</span>
													</>
												) : (
													<>
														<CheckIcon className="w-4 h-4 text-green-500" />
														<span className="text-sm text-green-600">Ready</span>
													</>
												)}
											</div>
										</div>
										
										<div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
											<span className="text-sm font-medium">File Upload Progress:</span>
											<div className="flex items-center gap-2">
												{uploadProgress ? (
													<>
														<Loader size="sm" className="border-blue-200 border-t-blue-600" />
														<span className="text-sm text-blue-600">Uploading...</span>
													</>
												) : (
													<>
														<CheckIcon className="w-4 h-4 text-green-500" />
														<span className="text-sm text-green-600">Complete</span>
													</>
												)}
											</div>
										</div>
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
										<CardTitle className="text-sm">Form Loading States</CardTitle>
									</CardHeader>
									<CardContent className="p-0 space-y-3">
										<div className="p-3 border rounded bg-gray-50">
											<div className="flex items-center justify-between">
												<span className="text-sm">Validating input...</span>
												<Loader size="sm" />
											</div>
										</div>
										<div className="p-3 border rounded bg-gray-50">
											<div className="flex items-center justify-between">
												<span className="text-sm">Submitting form...</span>
												<Loader size="sm" className="border-green-200 border-t-green-600" />
											</div>
										</div>
									</CardContent>
								</Card>
								
								<Card className="p-6">
									<CardHeader className="p-0 mb-4">
										<CardTitle className="text-sm">Inline Content Loading</CardTitle>
									</CardHeader>
									<CardContent className="p-0 space-y-3">
										<div className="flex items-center gap-3 p-3 border rounded">
											<Loader size="sm" />
											<span className="text-sm text-gray-600">Loading user data...</span>
										</div>
										<div className="flex items-center gap-3 p-3 border rounded">
											<Loader size="sm" className="border-purple-200 border-t-purple-600" />
											<span className="text-sm text-gray-600">Fetching notifications...</span>
										</div>
									</CardContent>
								</Card>
							</div>
						</div>

						{/* Features Overview */}
						<div className="p-4 bg-gray-50 rounded-lg">
							<h4 className="text-sm font-semibold text-gray-700 mb-2">Component Features:</h4>
							<ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
								<li><strong>Lightweight:</strong> Pure CSS animations with minimal overhead</li>
								<li><strong>Size Options:</strong> Three size variants (sm, md, lg)</li>
								<li><strong>Customizable:</strong> Easy color customization via Tailwind classes</li>
								<li><strong>Accessible:</strong> Proper ARIA attributes and semantic HTML</li>
								<li><strong>Performance:</strong> Hardware-accelerated CSS transforms</li>
								<li><strong>Versatile:</strong> Works in buttons, forms, and standalone contexts</li>
							</ul>
						</div>
					</div>
				}
			/>

			<ComponentDoc
				title="Loader Props & Usage"
				description="Comprehensive guide to Loader component props, customization options, and implementation patterns."
				component={
					<div className="flex flex-col gap-6 w-full max-w-4xl">
						{/* Props Reference */}
						<div className="p-4 bg-green-50 rounded-lg">
							<h4 className="text-sm font-semibold text-green-700 mb-2">Props Reference:</h4>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-600">
								<div>
									<strong>Size Options:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li><code>size?: 'sm' | 'md' | 'lg'</code> - Loader size (default: 'md')</li>
										<li><code>sm</code> - 16px (w-4 h-4)</li>
										<li><code>md</code> - 24px (w-6 h-6)</li>
										<li><code>lg</code> - 32px (w-8 h-8)</li>
									</ul>
								</div>
								<div>
									<strong>Customization Props:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li><code>className?: string</code> - Additional CSS classes</li>
										<li><code>data-testid?: string</code> - Test identifier</li>
									</ul>
								</div>
							</div>
						</div>

						{/* Usage Patterns */}
						<div className="p-4 bg-blue-50 rounded-lg">
							<h4 className="text-sm font-semibold text-blue-700 mb-2">Usage Patterns:</h4>
							<ul className="text-sm text-blue-600 space-y-1 list-disc list-inside">
								<li><strong>Button Loading:</strong> Inside buttons to show processing state</li>
								<li><strong>Form Validation:</strong> During input validation or submission</li>
								<li><strong>Inline Loading:</strong> Next to content that's being loaded</li>
								<li><strong>Status Indicators:</strong> In status bars or progress areas</li>
								<li><strong>Pull to Refresh:</strong> As part of refresh mechanisms</li>
							</ul>
						</div>

						{/* Code Examples */}
						<div className="p-4 bg-gray-100 rounded-lg">
							<h4 className="text-sm font-semibold text-gray-700 mb-2">Code Examples:</h4>
							<pre className="text-xs text-gray-600 overflow-x-auto whitespace-pre-wrap">
{`// Basic usage
<Loader />

// Different sizes
<Loader size="sm" />
<Loader size="md" />
<Loader size="lg" />

// Custom colors with Tailwind classes
<Loader className="border-blue-200 border-t-blue-600" />
<Loader className="border-white border-t-white/60" />
<Loader className="border-green-200 border-t-green-600" />

// In buttons
<Button disabled={isLoading}>
  {isLoading ? (
    <>
      <Loader size="sm" className="border-white border-t-white/60" />
      Loading...
    </>
  ) : (
    'Submit'
  )}
</Button>

// Inline with text
<div className="flex items-center gap-2">
  <Loader size="sm" />
  <span>Loading data...</span>
</div>

// With test ID for testing
<Loader 
  size="md" 
  data-testid="my-loader" 
  className="border-purple-200 border-t-purple-600" 
/>`}
							</pre>
						</div>

						{/* Color Customization Guide */}
						<div className="p-4 bg-purple-50 rounded-lg">
							<h4 className="text-sm font-semibold text-purple-700 mb-2">Color Customization:</h4>
							<div className="text-sm text-purple-600 space-y-2">
								<p><strong>Default:</strong> Gray border with darker top section</p>
								<p><strong>For dark backgrounds:</strong> <code>border-gray-600 border-t-gray-300</code></p>
								<p><strong>For colored buttons:</strong> <code>border-white border-t-white/60</code></p>
								<p><strong>Brand colors:</strong> <code>border-blue-200 border-t-blue-600</code></p>
								<p><strong>Custom opacity:</strong> Use <code>/60</code>, <code>/70</code>, <code>/80</code> for transparency</p>
							</div>
						</div>

						{/* Best Practices */}
						<div className="p-4 bg-orange-50 rounded-lg">
							<h4 className="text-sm font-semibold text-orange-700 mb-2">Best Practices:</h4>
							<ul className="text-sm text-orange-600 space-y-1 list-disc list-inside">
								<li><strong>Size Selection:</strong> Use sm for buttons, md for inline, lg for prominent loading</li>
								<li><strong>Color Contrast:</strong> Ensure loader is visible against background</li>
								<li><strong>Loading Text:</strong> Always pair with descriptive text when possible</li>
								<li><strong>Button States:</strong> Disable buttons when showing loading state</li>
								<li><strong>Accessibility:</strong> Use aria-label or sr-only text for screen readers</li>
								<li><strong>Performance:</strong> Remove loaders from DOM when not needed</li>
							</ul>
						</div>
					</div>
				}
			/>
		</Fragment>
	)
}