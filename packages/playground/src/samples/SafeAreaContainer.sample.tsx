import { Fragment, useState } from 'react'
import { SafeAreaContainer, Button, Card, CardContent, CardHeader, CardTitle } from '@rs-kit/ui-kit'
import { ComponentDoc } from '@/components/ComponentDoc'
import { RefreshCwIcon, SmartphoneIcon, TabletIcon, MonitorIcon } from 'lucide-react'

export default function SafeAreaContainerSample() {
	const [refreshCount, setRefreshCount] = useState(0)
	const [isRefreshing, setIsRefreshing] = useState(false)

	// Simulate refresh action
	const handleRefresh = async () => {
		setIsRefreshing(true)
		await new Promise(resolve => setTimeout(resolve, 2000))
		setRefreshCount(prev => prev + 1)
		setIsRefreshing(false)
	}

	// Mock safe area insets for demo
	const mockSafeAreaInsets = (insets: any) => {
		sessionStorage.setItem('safeAreaInsets', JSON.stringify(insets))
		window.location.reload()
	}

	return (
		<Fragment>
			<ComponentDoc
				title="Safe Area Container"
				description="A container component that handles safe area insets for mobile devices and provides pull-to-refresh functionality. Perfect for mobile applications that need to respect device safe areas."
				component={
					<div className="flex flex-col gap-8 w-full max-w-4xl">
						{/* Safe Area Demo Controls */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Safe Area Simulation</h3>
							<div className="flex flex-wrap gap-3 mb-4">
								<Button 
									onClick={() => mockSafeAreaInsets({ top: 0, left: 0, bottom: 0, right: 0 })}
									variant="outline"
									size="sm"
								>
									<MonitorIcon className="w-4 h-4" />
									No Safe Area
								</Button>
								<Button 
									onClick={() => mockSafeAreaInsets({ top: 44, left: 0, bottom: 34, right: 0 })}
									variant="outline"
									size="sm"
								>
									<SmartphoneIcon className="w-4 h-4" />
									iPhone (44px top, 34px bottom)
								</Button>
								<Button 
									onClick={() => mockSafeAreaInsets({ top: 24, left: 0, bottom: 0, right: 0 })}
									variant="outline"
									size="sm"
								>
									<TabletIcon className="w-4 h-4" />
									Android (24px top)
								</Button>
							</div>
							<div className="p-4 bg-blue-50 rounded-lg">
								<p className="text-sm text-blue-600">
									Click the buttons above to simulate different device safe areas. 
									The page will reload to apply the safe area insets from sessionStorage.
								</p>
							</div>
						</div>

						{/* Basic Container Demo */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Basic Safe Area Container</h3>
							<div className="border rounded-lg overflow-hidden" style={{ height: '400px' }}>
								<SafeAreaContainer 
									className="bg-gradient-to-b from-blue-50 to-blue-100"
								>
									{({ padding, isEndPage }) => (
										<div style={padding} className="p-4 space-y-4">
											<Card>
												<CardHeader>
													<CardTitle>Safe Area Status</CardTitle>
												</CardHeader>
												<CardContent>
													<div className="space-y-2 text-sm">
														<div>Padding Top: {padding.paddingTop || '0px'}</div>
														<div>Padding Bottom: {padding.paddingBottom || '0px'}</div>
														<div>Is End Page: {isEndPage ? '✅ Yes' : '❌ No'}</div>
													</div>
												</CardContent>
											</Card>
											
											{/* Generate content to test scrolling */}
											{Array.from({ length: 20 }, (_, i) => (
												<Card key={i}>
													<CardContent className="p-4">
														<p>Content item {i + 1}</p>
														<p className="text-sm text-gray-600">
															This container respects safe area insets and detects when scrolled to bottom.
														</p>
													</CardContent>
												</Card>
											))}
										</div>
									)}
								</SafeAreaContainer>
							</div>
						</div>

						{/* Pull to Refresh Demo */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Pull to Refresh</h3>
							<div className="border rounded-lg overflow-hidden" style={{ height: '400px' }}>
								<SafeAreaContainer 
									onRefresh={handleRefresh}
									onRefreshDelay={1500}
									className="bg-gradient-to-b from-green-50 to-green-100"
								>
									{({ padding, isEndPage }) => (
										<div style={padding} className="p-4 space-y-4">
											<Card>
												<CardHeader>
													<CardTitle className="flex items-center gap-2">
														<RefreshCwIcon className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
														Pull to Refresh Demo
													</CardTitle>
												</CardHeader>
												<CardContent>
													<div className="space-y-2 text-sm">
														<div>Refresh Count: {refreshCount}</div>
														<div>Status: {isRefreshing ? '🔄 Refreshing...' : '✅ Ready'}</div>
														<div>Is End Page: {isEndPage ? '✅ Yes' : '❌ No'}</div>
													</div>
													<p className="text-sm text-gray-600 mt-3">
														On mobile: Pull down from the top to refresh. 
														On desktop: The refresh functionality is available but touch gestures won't work.
													</p>
												</CardContent>
											</Card>
											
											{/* Generate content to test pull-to-refresh */}
											{Array.from({ length: 15 }, (_, i) => (
												<Card key={`refresh-${refreshCount}-${i}`}>
													<CardContent className="p-4">
														<p>Refreshable item {i + 1}</p>
														<p className="text-sm text-gray-600">
															Last refreshed: {refreshCount > 0 ? `${refreshCount} time(s)` : 'Never'}
														</p>
													</CardContent>
												</Card>
											))}
										</div>
									)}
								</SafeAreaContainer>
							</div>
						</div>

						{/* Render Prop Pattern Demo */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Render Prop Pattern</h3>
							<div className="border rounded-lg overflow-hidden" style={{ height: '300px' }}>
								<SafeAreaContainer 
									render={({ padding, isEndPage, containerRef }) => (
										<div style={padding} className="p-4 bg-gradient-to-b from-purple-50 to-purple-100">
											<Card>
												<CardHeader>
													<CardTitle>Render Prop Demo</CardTitle>
												</CardHeader>
												<CardContent>
													<div className="space-y-2 text-sm">
														<div>Container Ref: {containerRef.current ? '✅ Available' : '❌ Not Available'}</div>
														<div>Padding Applied: {Object.keys(padding).length > 0 ? '✅ Yes' : '❌ No'}</div>
														<div>End Page Detection: {isEndPage ? '✅ At bottom' : '❌ Not at bottom'}</div>
													</div>
													<p className="text-sm text-gray-600 mt-3">
														This demonstrates using the render prop pattern to access container state and methods.
													</p>
												</CardContent>
											</Card>
										</div>
									)}
								/>
							</div>
						</div>

						{/* Features Overview */}
						<div className="p-4 bg-gray-50 rounded-lg">
							<h4 className="text-sm font-semibold text-gray-700 mb-2">Component Features:</h4>
							<ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
								<li><strong>Safe Area Support:</strong> Automatically applies padding for device safe areas</li>
								<li><strong>Pull to Refresh:</strong> Optional pull-to-refresh functionality for mobile</li>
								<li><strong>Scroll Detection:</strong> Detects when user has scrolled to the bottom</li>
								<li><strong>Flexible Rendering:</strong> Supports both children and render prop patterns</li>
								<li><strong>Session Storage:</strong> Reads safe area insets from sessionStorage</li>
								<li><strong>Responsive Design:</strong> Works across different screen sizes and orientations</li>
							</ul>
						</div>
					</div>
				}
			/>

			<ComponentDoc
				title="Safe Area Container Props & Usage"
				description="Comprehensive guide to SafeAreaContainer component props, patterns, and implementation."
				component={
					<div className="flex flex-col gap-6 w-full max-w-4xl">
						{/* Props Reference */}
						<div className="p-4 bg-green-50 rounded-lg">
							<h4 className="text-sm font-semibold text-green-700 mb-2">Props Reference:</h4>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-600">
								<div>
									<strong>Content Props:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li><code>children?: ReactNode | Function</code> - Content or render function</li>
										<li><code>render?: Function</code> - Alternative render prop pattern</li>
										<li><code>className?: string</code> - Additional CSS classes</li>
										<li><code>style?: CSSProperties</code> - Inline styles</li>
									</ul>
								</div>
								<div>
									<strong>Refresh Props:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li><code>onRefresh?: () => Promise&lt;void&gt;</code> - Refresh handler</li>
										<li><code>onRefreshDelay?: number</code> - Delay after refresh (default: 1000ms)</li>
									</ul>
								</div>
							</div>
						</div>

						{/* Usage Patterns */}
						<div className="p-4 bg-blue-50 rounded-lg">
							<h4 className="text-sm font-semibold text-blue-700 mb-2">Usage Patterns:</h4>
							<ul className="text-sm text-blue-600 space-y-1 list-disc list-inside">
								<li><strong>Mobile Apps:</strong> Wrapper for mobile application screens</li>
								<li><strong>List Views:</strong> Container for scrollable lists with refresh</li>
								<li><strong>Content Pages:</strong> Full-screen content with safe area handling</li>
								<li><strong>Feed Interfaces:</strong> Social media or news feed layouts</li>
							</ul>
						</div>

						{/* Code Examples */}
						<div className="p-4 bg-gray-100 rounded-lg">
							<h4 className="text-sm font-semibold text-gray-700 mb-2">Code Examples:</h4>
							<pre className="text-xs text-gray-600 overflow-x-auto whitespace-pre-wrap">
{`// Basic usage with children
<SafeAreaContainer>
  <div>Your content here</div>
</SafeAreaContainer>

// With pull-to-refresh
<SafeAreaContainer 
  onRefresh={handleRefresh}
  onRefreshDelay={2000}
>
  <MyListComponent />
</SafeAreaContainer>

// Using function children pattern
<SafeAreaContainer>
  {({ padding, isEndPage, setIsEndPage, containerRef }) => (
    <div style={padding}>
      <p>At bottom: {isEndPage ? 'Yes' : 'No'}</p>
      <MyContent />
    </div>
  )}
</SafeAreaContainer>

// Using render prop pattern
<SafeAreaContainer 
  render={({ padding, isEndPage }) => (
    <div style={padding}>
      <MyComponent isEndPage={isEndPage} />
    </div>
  )}
/>`}
							</pre>
						</div>

						{/* Best Practices */}
						<div className="p-4 bg-orange-50 rounded-lg">
							<h4 className="text-sm font-semibold text-orange-700 mb-2">Best Practices:</h4>
							<ul className="text-sm text-orange-600 space-y-1 list-disc list-inside">
								<li><strong>Safe Area Setup:</strong> Set safeAreaInsets in sessionStorage during app initialization</li>
								<li><strong>Refresh Handling:</strong> Always return a Promise from onRefresh for proper loading states</li>
								<li><strong>Performance:</strong> Use memo for child components to prevent unnecessary re-renders</li>
								<li><strong>Testing:</strong> Test with different safe area configurations</li>
								<li><strong>Accessibility:</strong> Ensure refresh functionality is accessible via other means</li>
							</ul>
						</div>
					</div>
				}
			/>
		</Fragment>
	)
}