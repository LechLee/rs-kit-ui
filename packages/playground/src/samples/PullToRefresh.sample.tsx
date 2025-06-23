import { Fragment, useState, useRef } from 'react'
import { PullToRefresh, PullToRefreshRef, Button, Card, CardContent, CardHeader, CardTitle } from '@rs-kit/ui-kit'
import { ComponentDoc } from '@/components/ComponentDoc'
import { RefreshCwIcon, SmartphoneIcon, HandIcon } from 'lucide-react'

export default function PullToRefreshSample() {
	const [refreshCount, setRefreshCount] = useState(0)
	const [lastRefreshTime, setLastRefreshTime] = useState<Date | null>(null)
	
	// Refs for triggering refresh programmatically
	const basicRefreshRef = useRef<PullToRefreshRef>(null)
	const delayedRefreshRef = useRef<PullToRefreshRef>(null)
	const syncRefreshRef = useRef<PullToRefreshRef>(null)

	// Simple refresh handler
	const handleSimpleRefresh = async () => {
		await new Promise(resolve => setTimeout(resolve, 1500))
		setRefreshCount(prev => prev + 1)
		setLastRefreshTime(new Date())
	}

	// Refresh with different delay
	const handleDelayedRefresh = async () => {
		await new Promise(resolve => setTimeout(resolve, 3000))
		setRefreshCount(prev => prev + 1)
		setLastRefreshTime(new Date())
	}

	// Sync refresh handler
	const handleSyncRefresh = () => {
		setRefreshCount(prev => prev + 1)
		setLastRefreshTime(new Date())
	}

	return (
		<Fragment>
			<ComponentDoc
				title="Pull to Refresh"
				description="A mobile-friendly pull-to-refresh component that provides intuitive touch-based refresh functionality. Perfect for lists, feeds, and content that needs periodic updates."
				component={
					<div className="flex flex-col gap-8 w-full max-w-4xl">
						{/* Mobile Instructions */}
						<div className="p-4 bg-blue-50 rounded-lg">
							<div className="flex items-center gap-2 mb-2">
								<SmartphoneIcon className="w-5 h-5 text-blue-600" />
								<h4 className="text-sm font-semibold text-blue-700">Mobile Usage:</h4>
							</div>
							<p className="text-sm text-blue-600">
								On mobile devices, pull down from the top of the scrollable area to trigger refresh. 
								The component detects touch gestures and provides visual feedback during the pull action.
							</p>
						</div>

						{/* Basic Pull to Refresh */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Basic Pull to Refresh</h3>
							<div className="mb-3">
								<Button 
									onClick={() => basicRefreshRef.current?.triggerRefresh()}
									size="sm"
								>
									<RefreshCwIcon className="w-4 h-4" />
									Trigger Refresh
								</Button>
							</div>
							<div className="border rounded-lg overflow-hidden" style={{ height: '400px' }}>
								<PullToRefresh ref={basicRefreshRef} onRefresh={handleSimpleRefresh}>
									<div className="p-4 space-y-4 bg-gradient-to-b from-gray-50 to-gray-100">
										<Card>
											<CardHeader>
												<CardTitle className="flex items-center gap-2">
													<RefreshCwIcon className="w-5 h-5" />
													Pull to Refresh Demo
												</CardTitle>
											</CardHeader>
											<CardContent>
												<div className="space-y-2 text-sm">
													<div>Refresh Count: <strong>{refreshCount}</strong></div>
													<div>Last Refresh: {lastRefreshTime ? lastRefreshTime.toLocaleTimeString() : 'Never'}</div>
													<div className="flex items-center gap-2 text-blue-600">
														<HandIcon className="w-4 h-4" />
														Pull down to refresh this content
													</div>
												</div>
											</CardContent>
										</Card>
										
										{/* Generate scrollable content */}
										{Array.from({ length: 15 }, (_, i) => (
											<Card key={`basic-${refreshCount}-${i}`}>
												<CardContent className="p-4">
													<h4 className="font-medium">Content Item {i + 1}</h4>
													<p className="text-sm text-gray-600">
														This content was loaded at: {lastRefreshTime?.toLocaleTimeString() || 'Initial load'}
													</p>
													<p className="text-xs text-gray-500 mt-2">
														Refresh #{refreshCount} - Item #{i + 1}
													</p>
												</CardContent>
											</Card>
										))}
									</div>
								</PullToRefresh>
							</div>
						</div>

						{/* Custom Delay Demo */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Custom Refresh Delay</h3>
							<div className="mb-3">
								<Button 
									onClick={() => delayedRefreshRef.current?.triggerRefresh()}
									size="sm"
									variant="outline"
								>
									<RefreshCwIcon className="w-4 h-4" />
									Trigger Delayed Refresh
								</Button>
							</div>
							<div className="border rounded-lg overflow-hidden" style={{ height: '400px' }}>
								<PullToRefresh ref={delayedRefreshRef} onRefresh={handleDelayedRefresh} onRefreshDelay={2500}>
									<div className="p-4 space-y-4 bg-gradient-to-b from-green-50 to-green-100">
										<Card>
											<CardHeader>
												<CardTitle>Longer Refresh Delay (2.5s)</CardTitle>
											</CardHeader>
											<CardContent>
												<div className="space-y-2 text-sm">
													<div>This demo uses a 2.5 second refresh delay</div>
													<div>Pull down to see the extended loading state</div>
													<div>Refresh Count: <strong>{refreshCount}</strong></div>
												</div>
											</CardContent>
										</Card>
										
										{Array.from({ length: 10 }, (_, i) => (
											<Card key={`delay-${refreshCount}-${i}`}>
												<CardContent className="p-4">
													<p>Delayed refresh item {i + 1}</p>
													<p className="text-xs text-gray-500">
														Shows longer loading spinner animation
													</p>
												</CardContent>
											</Card>
										))}
									</div>
								</PullToRefresh>
							</div>
						</div>

						{/* Synchronous Refresh */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Synchronous Refresh</h3>
							<div className="mb-3">
								<Button 
									onClick={() => syncRefreshRef.current?.triggerRefresh()}
									size="sm"
									variant="secondary"
								>
									<RefreshCwIcon className="w-4 h-4" />
									Trigger Sync Refresh
								</Button>
							</div>
							<div className="border rounded-lg overflow-hidden" style={{ height: '350px' }}>
								<PullToRefresh ref={syncRefreshRef} onRefresh={handleSyncRefresh} onRefreshDelay={800}>
									<div className="p-4 space-y-4 bg-gradient-to-b from-purple-50 to-purple-100">
										<Card>
											<CardHeader>
												<CardTitle>Sync Refresh Handler</CardTitle>
											</CardHeader>
											<CardContent>
												<div className="space-y-2 text-sm">
													<div>This uses a synchronous refresh function</div>
													<div>No async operation, just immediate update</div>
													<div>Refresh Count: <strong>{refreshCount}</strong></div>
												</div>
											</CardContent>
										</Card>
										
										{Array.from({ length: 8 }, (_, i) => (
											<Card key={`sync-${refreshCount}-${i}`}>
												<CardContent className="p-4">
													<p>Sync item {i + 1}</p>
													<p className="text-xs text-gray-500">
														Updated immediately on refresh
													</p>
												</CardContent>
											</Card>
										))}
									</div>
								</PullToRefresh>
							</div>
						</div>

						{/* Manual Refresh Buttons */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Programmatic Trigger</h3>
							<div className="flex flex-wrap gap-3 mb-4">
								<Button onClick={() => basicRefreshRef.current?.triggerRefresh()}>
									<RefreshCwIcon className="w-4 h-4" />
									Trigger Basic
								</Button>
								<Button onClick={() => delayedRefreshRef.current?.triggerRefresh()} variant="outline">
									<RefreshCwIcon className="w-4 h-4" />
									Trigger Delayed
								</Button>
								<Button onClick={() => syncRefreshRef.current?.triggerRefresh()} variant="secondary">
									<RefreshCwIcon className="w-4 h-4" />
									Trigger Sync
								</Button>
							</div>
							<div className="p-4 bg-gray-50 rounded-lg">
								<p className="text-sm text-gray-600">
									These buttons use the <code>triggerRefresh()</code> method via component refs. 
									This allows you to programmatically trigger the refresh animation and functionality, 
									perfect for implementing custom refresh buttons or automated refresh logic.
								</p>
							</div>
						</div>

						{/* Features Overview */}
						<div className="p-4 bg-gray-50 rounded-lg">
							<h4 className="text-sm font-semibold text-gray-700 mb-2">Component Features:</h4>
							<ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
								<li><strong>Touch Gestures:</strong> Detects pull-down gestures on touch devices</li>
								<li><strong>Programmatic Trigger:</strong> Use ref.triggerRefresh() to trigger refresh via buttons</li>
								<li><strong>Visual Feedback:</strong> Shows pull distance and loading spinner</li>
								<li><strong>Async Support:</strong> Handles both Promise-based and synchronous refresh functions</li>
								<li><strong>Customizable Delay:</strong> Configure how long loading state is shown</li>
								<li><strong>Scroll Detection:</strong> Only triggers when scrolled to top</li>
								<li><strong>Threshold Control:</strong> Configurable pull distance threshold</li>
							</ul>
						</div>
					</div>
				}
			/>

			<ComponentDoc
				title="Pull to Refresh Props & Usage"
				description="Comprehensive guide to PullToRefresh component props, patterns, and implementation details."
				component={
					<div className="flex flex-col gap-6 w-full max-w-4xl">
						{/* Props Reference */}
						<div className="p-4 bg-green-50 rounded-lg">
							<h4 className="text-sm font-semibold text-green-700 mb-2">Props Reference:</h4>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-600">
								<div>
									<strong>Required Props:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li><code>children: ReactNode</code> - Content to wrap with pull-to-refresh</li>
									</ul>
								</div>
								<div>
									<strong>Optional Props:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li><code>onRefresh?: () => Promise&lt;void&gt; | void</code> - Refresh handler</li>
										<li><code>onRefreshDelay?: number</code> - Loading state duration (default: 1000ms)</li>
									</ul>
								</div>
							</div>
						</div>

						{/* Technical Details */}
						<div className="p-4 bg-blue-50 rounded-lg">
							<h4 className="text-sm font-semibold text-blue-700 mb-2">Technical Details:</h4>
							<ul className="text-sm text-blue-600 space-y-1 list-disc list-inside">
								<li><strong>Activation:</strong> Requires 100px pull distance to trigger refresh</li>
								<li><strong>Sensitivity:</strong> Pull distance divided by 2 for smoother feel</li>
								<li><strong>Max Pull:</strong> Limited to 150px to prevent excessive stretching</li>
								<li><strong>Touch Events:</strong> Uses touchstart, touchmove, touchend</li>
								<li><strong>Scroll Requirement:</strong> Only works when scrollTop === 0</li>
							</ul>
						</div>

						{/* Code Examples */}
						<div className="p-4 bg-gray-100 rounded-lg">
							<h4 className="text-sm font-semibold text-gray-700 mb-2">Code Examples:</h4>
							<pre className="text-xs text-gray-600 overflow-x-auto whitespace-pre-wrap">
{`// Basic usage
<PullToRefresh onRefresh={handleRefresh}>
  <div>Your scrollable content</div>
</PullToRefresh>

// With ref for programmatic triggering
const pullToRefreshRef = useRef<PullToRefreshRef>(null)

<PullToRefresh 
  ref={pullToRefreshRef}
  onRefresh={handleRefresh} 
  onRefreshDelay={2000}
>
  <MyListComponent />
</PullToRefresh>

// Trigger refresh programmatically
<Button onClick={() => pullToRefreshRef.current?.triggerRefresh()}>
  Refresh
</Button>

// Async refresh handler
const handleRefresh = async () => {
  try {
    await fetchLatestData()
    updateContent()
  } catch (error) {
    showError('Failed to refresh')
  }
}

// Sync refresh handler  
const handleRefresh = () => {
  setData(generateNewData())
  setLastUpdate(new Date())
}

// Without refresh handler (shows default animation)
<PullToRefresh>
  <MyContent />
</PullToRefresh>`}
							</pre>
						</div>

						{/* Best Practices */}
						<div className="p-4 bg-orange-50 rounded-lg">
							<h4 className="text-sm font-semibold text-orange-700 mb-2">Best Practices:</h4>
							<ul className="text-sm text-orange-600 space-y-1 list-disc list-inside">
								<li><strong>Error Handling:</strong> Always handle errors in async refresh functions</li>
								<li><strong>User Feedback:</strong> Provide visual indication of what was refreshed</li>
								<li><strong>Performance:</strong> Avoid heavy operations in sync refresh handlers</li>
								<li><strong>Accessibility:</strong> Provide alternative refresh methods for non-touch users</li>
								<li><strong>Testing:</strong> Test on actual mobile devices for gesture accuracy</li>
								<li><strong>Network Awareness:</strong> Consider network state before refreshing</li>
							</ul>
						</div>
					</div>
				}
			/>
		</Fragment>
	)
}