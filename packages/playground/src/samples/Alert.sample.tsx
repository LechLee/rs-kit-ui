import { Fragment, useState } from 'react'
import { 
	AlertCircleIcon, 
	CheckCircle2Icon, 
	InfoIcon, 
	AlertTriangleIcon,
	ShieldCheckIcon,
	WifiOffIcon,
	RotateCcwIcon,
	XIcon,
	RefreshCwIcon,
	DownloadIcon,
	ArrowUpIcon,
	BellIcon,
	StarIcon
} from 'lucide-react'
import { Button, Alert, AlertDescription, AlertTitle } from '@rs-kit/ui-kit'
import { ComponentDoc } from '@/components/ComponentDoc'

export default function AlertSample() {
	// State for interactive alerts
	const [dismissibleAlerts, setDismissibleAlerts] = useState({
		success: true,
		info: true,
		warning: true,
		error: true
	})

	const [systemAlerts, setSystemAlerts] = useState({
		networkStatus: 'online',
		updateAvailable: true,
		storageSpace: 'low'
	})

	// Interactive handlers
	const dismissAlert = (alertId: keyof typeof dismissibleAlerts) => {
		setDismissibleAlerts(prev => ({
			...prev,
			[alertId]: false
		}))
	}

	const restoreAlerts = () => {
		setDismissibleAlerts({
			success: true,
			info: true,
			warning: true,
			error: true
		})
	}

	const simulateNetworkChange = () => {
		setSystemAlerts(prev => ({
			...prev,
			networkStatus: prev.networkStatus === 'online' ? 'offline' : 'online'
		}))
	}

	const dismissUpdate = () => {
		setSystemAlerts(prev => ({
			...prev,
			updateAvailable: false
		}))
	}

	return (
		<Fragment>
			<ComponentDoc
				title="Alert"
				description="Displays important information and feedback to users. Perfect for status updates, notifications, warnings, and system messages."
				component={
					<div className="flex flex-col gap-8 w-full max-w-4xl">
						{/* Basic Alert Variants */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Alert Variants</h3>
							<div className="space-y-4">
								<Alert>
									<CheckCircle2Icon className="h-4 w-4" />
									<AlertTitle>Success</AlertTitle>
									<AlertDescription>
										Your changes have been saved successfully.
									</AlertDescription>
								</Alert>

								<Alert variant="destructive">
									<AlertCircleIcon className="h-4 w-4" />
									<AlertTitle>Error</AlertTitle>
									<AlertDescription>
										Something went wrong. Please try again.
									</AlertDescription>
								</Alert>

								<Alert className="border-blue-200 bg-blue-50 text-blue-900">
									<InfoIcon className="h-4 w-4" />
									<AlertTitle>Information</AlertTitle>
									<AlertDescription>
										Here's some helpful information for you.
									</AlertDescription>
								</Alert>

								<Alert className="border-amber-200 bg-amber-50 text-amber-900">
									<AlertTriangleIcon className="h-4 w-4" />
									<AlertTitle>Warning</AlertTitle>
									<AlertDescription>
										Please review your settings before proceeding.
									</AlertDescription>
								</Alert>
							</div>
						</div>

						{/* Content Variations */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Content Variations</h3>
							<div className="space-y-4">
								<Alert>
									<AlertDescription>
										Simple alert with description only.
									</AlertDescription>
								</Alert>

								<Alert>
									<CheckCircle2Icon className="h-4 w-4" />
									<AlertTitle>Title with icon only</AlertTitle>
								</Alert>

								<Alert>
									<InfoIcon className="h-4 w-4" />
									<AlertDescription>
										Alert with icon and description, no title.
									</AlertDescription>
								</Alert>

								<Alert>
									<CheckCircle2Icon className="h-4 w-4" />
									<AlertTitle>Complete Alert</AlertTitle>
									<AlertDescription>
										This alert has an icon, title, and description for maximum information.
									</AlertDescription>
								</Alert>
							</div>
						</div>

						{/* Dismissible Alerts */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Dismissible Alerts</h3>
							<div className="space-y-4">
								<div className="flex gap-2 mb-4">
									<Button size="sm" onClick={restoreAlerts}>
										Restore All Alerts
									</Button>
								</div>

								{dismissibleAlerts.success && (
									<Alert>
										<CheckCircle2Icon className="h-4 w-4" />
										<AlertTitle>Payment Successful</AlertTitle>
										<AlertDescription>
											Your payment of $99.00 has been processed successfully.
										</AlertDescription>
										<Button
											size="sm"
											variant="ghost"
											className="absolute top-2 right-2 h-6 w-6 p-0"
											onClick={() => dismissAlert('success')}
										>
											<XIcon className="h-4 w-4" />
										</Button>
									</Alert>
								)}

								{dismissibleAlerts.info && (
									<Alert className="border-blue-200 bg-blue-50 text-blue-900">
										<InfoIcon className="h-4 w-4" />
										<AlertTitle>New Feature Available</AlertTitle>
										<AlertDescription>
											Check out our new dashboard analytics feature.
										</AlertDescription>
										<Button
											size="sm"
											variant="ghost"
											className="absolute top-2 right-2 h-6 w-6 p-0"
											onClick={() => dismissAlert('info')}
										>
											<XIcon className="h-4 w-4" />
										</Button>
									</Alert>
								)}

								{dismissibleAlerts.warning && (
									<Alert className="border-amber-200 bg-amber-50 text-amber-900">
										<AlertTriangleIcon className="h-4 w-4" />
										<AlertTitle>Storage Almost Full</AlertTitle>
										<AlertDescription>
											You're using 90% of your storage space. Consider upgrading your plan.
										</AlertDescription>
										<Button
											size="sm"
											variant="ghost"
											className="absolute top-2 right-2 h-6 w-6 p-0"
											onClick={() => dismissAlert('warning')}
										>
											<XIcon className="h-4 w-4" />
										</Button>
									</Alert>
								)}

								{dismissibleAlerts.error && (
									<Alert variant="destructive">
										<AlertCircleIcon className="h-4 w-4" />
										<AlertTitle>Connection Failed</AlertTitle>
										<AlertDescription>
											Unable to connect to the server. Check your internet connection.
										</AlertDescription>
										<Button
											size="sm"
											variant="ghost"
											className="absolute top-2 right-2 h-6 w-6 p-0 text-red-900 hover:bg-red-100"
											onClick={() => dismissAlert('error')}
										>
											<XIcon className="h-4 w-4" />
										</Button>
									</Alert>
								)}
							</div>
						</div>

						{/* Alerts with Actions */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Alerts with Actions</h3>
							<div className="space-y-4">
								<Alert>
									<DownloadIcon className="h-4 w-4" />
									<AlertTitle>Download Complete</AlertTitle>
									<AlertDescription>
										Your file has been downloaded successfully.
									</AlertDescription>
									<div className="flex gap-2 mt-3">
										<Button size="sm">Open File</Button>
										<Button size="sm" variant="outline">Show in Folder</Button>
									</div>
								</Alert>

								<Alert className="border-amber-200 bg-amber-50 text-amber-900">
									<ArrowUpIcon className="h-4 w-4" />
									<AlertTitle>Upgrade Required</AlertTitle>
									<AlertDescription>
										You've reached your plan limit. Upgrade to continue using all features.
									</AlertDescription>
									<div className="flex gap-2 mt-3">
										<Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white">
											Upgrade Now
										</Button>
										<Button size="sm" variant="outline" className="border-amber-300 text-amber-900 hover:bg-amber-100">
											Learn More
										</Button>
									</div>
								</Alert>

								<Alert variant="destructive">
									<AlertCircleIcon className="h-4 w-4" />
									<AlertTitle>Verification Required</AlertTitle>
									<AlertDescription>
										Your account needs verification to continue. Click below to verify your email.
									</AlertDescription>
									<div className="flex gap-2 mt-3">
										<Button size="sm" variant="outline" className="border-red-300 text-red-900 hover:bg-red-50">
											Resend Email
										</Button>
										<Button size="sm" variant="ghost" className="text-red-900 hover:bg-red-50">
											Update Email
										</Button>
									</div>
								</Alert>
							</div>
						</div>

						{/* System Status Alerts */}
						<div>
							<h3 className="text-lg font-semibold mb-4">System Status Alerts</h3>
							<div className="space-y-4">
								<div className="flex gap-2 mb-4">
									<Button size="sm" onClick={simulateNetworkChange}>
										Toggle Network Status
									</Button>
									{systemAlerts.updateAvailable && (
										<Button size="sm" variant="outline" onClick={dismissUpdate}>
											Dismiss Update
										</Button>
									)}
								</div>

								{systemAlerts.networkStatus === 'offline' && (
									<Alert variant="destructive">
										<WifiOffIcon className="h-4 w-4" />
										<AlertTitle>No Internet Connection</AlertTitle>
										<AlertDescription>
											You're currently offline. Some features may not be available.
										</AlertDescription>
										<Button
											size="sm"
											variant="outline"
											className="mt-3 border-red-300 text-red-900 hover:bg-red-50"
											onClick={() => window.location.reload()}
										>
											<RefreshCwIcon className="h-4 w-4 mr-2" />
											Retry Connection
										</Button>
									</Alert>
								)}

								{systemAlerts.networkStatus === 'online' && (
									<Alert>
										<ShieldCheckIcon className="h-4 w-4" />
										<AlertTitle>Connected</AlertTitle>
										<AlertDescription>
											Your connection is secure and stable.
										</AlertDescription>
									</Alert>
								)}

								{systemAlerts.updateAvailable && (
									<Alert className="border-blue-200 bg-blue-50 text-blue-900">
										<RotateCcwIcon className="h-4 w-4" />
										<AlertTitle>Update Available</AlertTitle>
										<AlertDescription>
											A new version of the application is available. Update now to get the latest features.
										</AlertDescription>
										<div className="flex gap-2 mt-3">
											<Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
												Update Now
											</Button>
											<Button 
												size="sm" 
												variant="outline" 
												className="border-blue-300 text-blue-900 hover:bg-blue-100"
												onClick={dismissUpdate}
											>
												Later
											</Button>
										</div>
									</Alert>
								)}

								{systemAlerts.storageSpace === 'low' && (
									<Alert className="border-amber-200 bg-amber-50 text-amber-900">
										<AlertTriangleIcon className="h-4 w-4" />
										<AlertTitle>Storage Space Low</AlertTitle>
										<AlertDescription>
											You're using 85% of your available storage space.
										</AlertDescription>
										<div className="flex gap-2 mt-3">
											<Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white">
												Manage Storage
											</Button>
											<Button size="sm" variant="outline" className="border-amber-300 text-amber-900 hover:bg-amber-100">
												Upgrade Plan
											</Button>
										</div>
									</Alert>
								)}
							</div>
						</div>

						{/* Notification-Style Alerts */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Notification-Style Alerts</h3>
							<div className="space-y-4">
								<Alert className="border-l-4 border-l-green-500">
									<CheckCircle2Icon className="h-4 w-4 text-green-600" />
									<AlertTitle>Task Completed</AlertTitle>
									<AlertDescription>
										Your backup has been completed successfully at 2:30 PM.
									</AlertDescription>
								</Alert>

								<Alert className="border-l-4 border-l-blue-500">
									<BellIcon className="h-4 w-4 text-blue-600" />
									<AlertTitle>New Message</AlertTitle>
									<AlertDescription>
										You have 3 new messages from your team members.
									</AlertDescription>
								</Alert>

								<Alert className="border-l-4 border-l-purple-500">
									<StarIcon className="h-4 w-4 text-purple-600" />
									<AlertTitle>Achievement Unlocked</AlertTitle>
									<AlertDescription>
										Congratulations! You've completed 100 tasks this month.
									</AlertDescription>
								</Alert>
							</div>
						</div>

						{/* Complex Content Alerts */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Complex Content</h3>
							<div className="space-y-4">
								<Alert>
									<InfoIcon className="h-4 w-4" />
									<AlertTitle>System Maintenance Scheduled</AlertTitle>
									<AlertDescription>
										<div className="space-y-2">
											<p>We'll be performing scheduled maintenance on our servers:</p>
											<ul className="list-disc list-inside text-sm space-y-1 ml-4">
												<li><strong>Date:</strong> Sunday, March 15th, 2024</li>
												<li><strong>Time:</strong> 2:00 AM - 6:00 AM EST</li>
												<li><strong>Expected Duration:</strong> 4 hours</li>
												<li><strong>Impact:</strong> Limited service availability</li>
											</ul>
											<p className="text-sm font-medium">
												We apologize for any inconvenience and appreciate your patience.
											</p>
										</div>
									</AlertDescription>
								</Alert>

								<Alert variant="destructive">
									<AlertCircleIcon className="h-4 w-4" />
									<AlertTitle>Multiple Errors Detected</AlertTitle>
									<AlertDescription>
										<div className="space-y-2">
											<p>The following issues need your attention:</p>
											<div className="bg-red-50 border border-red-200 rounded p-3 mt-2">
												<ul className="text-sm space-y-1">
													<li>• Invalid email format in user profile</li>
													<li>• Missing required fields in billing information</li>
													<li>• Password does not meet security requirements</li>
												</ul>
											</div>
											<div className="flex gap-2 mt-3">
												<Button size="sm" variant="outline" className="border-red-300 text-red-900 hover:bg-red-50">
													Fix Issues
												</Button>
												<Button size="sm" variant="ghost" className="text-red-900 hover:bg-red-50">
													View Details
												</Button>
											</div>
										</div>
									</AlertDescription>
								</Alert>
							</div>
						</div>

						{/* Current State Display */}
						<div className="mt-6 p-4 bg-gray-50 rounded-lg">
							<h4 className="text-sm font-semibold text-gray-700 mb-2">Interactive State:</h4>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
								<div>
									<p><strong>Visible Dismissible Alerts:</strong></p>
									<ul className="ml-4 space-y-1">
										<li>Success: {dismissibleAlerts.success ? '✅' : '❌'}</li>
										<li>Info: {dismissibleAlerts.info ? '✅' : '❌'}</li>
										<li>Warning: {dismissibleAlerts.warning ? '✅' : '❌'}</li>
										<li>Error: {dismissibleAlerts.error ? '✅' : '❌'}</li>
									</ul>
								</div>
								<div>
									<p><strong>System Status:</strong></p>
									<ul className="ml-4 space-y-1">
										<li>Network: {systemAlerts.networkStatus === 'online' ? '🟢 Online' : '🔴 Offline'}</li>
										<li>Update Available: {systemAlerts.updateAvailable ? '✅ Yes' : '❌ No'}</li>
										<li>Storage: {systemAlerts.storageSpace === 'low' ? '⚠️ Low' : '✅ OK'}</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				}
			/>

			<ComponentDoc
				title="Alert Props & Usage Guidelines"
				description="Comprehensive guide to Alert component variants, styling, and best practices."
				component={
					<div className="flex flex-col gap-6 w-full max-w-4xl">
						{/* Props Reference */}
						<div className="p-4 bg-blue-50 rounded-lg">
							<h4 className="text-sm font-semibold text-blue-700 mb-2">Props Reference:</h4>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-600">
								<div>
									<strong>Alert Props:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li><code>variant</code> - "default" or "destructive"</li>
										<li><code>className</code> - Additional CSS classes</li>
										<li><code>children</code> - Alert content</li>
									</ul>
								</div>
								<div>
									<strong>AlertTitle Props:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li><code>className</code> - Custom title styling</li>
										<li><code>children</code> - Title content</li>
									</ul>
								</div>
								<div>
									<strong>AlertDescription Props:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li><code>className</code> - Custom description styling</li>
										<li><code>children</code> - Description content (supports JSX)</li>
									</ul>
								</div>
								<div>
									<strong>Accessibility:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li>ARIA role="alert" for urgent messages</li>
										<li>Proper heading hierarchy</li>
										<li>Screen reader friendly</li>
									</ul>
								</div>
							</div>
						</div>

						{/* Usage Guidelines */}
						<div className="p-4 bg-green-50 rounded-lg">
							<h4 className="text-sm font-semibold text-green-700 mb-2">Usage Guidelines:</h4>
							<ul className="text-sm text-green-600 space-y-1 list-disc list-inside">
								<li><strong>When to Use:</strong> System messages, form validation, status updates, important notifications</li>
								<li><strong>Variant Selection:</strong> Use "destructive" for errors and critical warnings, "default" for everything else</li>
								<li><strong>Content Structure:</strong> Use icons to reinforce message type, clear titles, and concise descriptions</li>
								<li><strong>Actions:</strong> Include relevant action buttons when users can take immediate action</li>
								<li><strong>Dismissible:</strong> Make alerts dismissible when they're informational rather than critical</li>
								<li><strong>Positioning:</strong> Place alerts contextually near related content or at the top of pages</li>
								<li><strong>Custom Styling:</strong> Use custom colors for different message types (info, warning, success)</li>
								<li><strong>Multiple Alerts:</strong> Stack multiple alerts with proper spacing and visual hierarchy</li>
							</ul>
						</div>

						{/* Code Examples */}
						<div className="p-4 bg-gray-100 rounded-lg">
							<h4 className="text-sm font-semibold text-gray-700 mb-2">Code Examples:</h4>
							<pre className="text-xs text-gray-600 overflow-x-auto whitespace-pre-wrap">
{`// Basic alert
<Alert>
  <CheckCircle2Icon className="h-4 w-4" />
  <AlertTitle>Success</AlertTitle>
  <AlertDescription>Your changes have been saved.</AlertDescription>
</Alert>

// Destructive alert
<Alert variant="destructive">
  <AlertCircleIcon className="h-4 w-4" />
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>Something went wrong.</AlertDescription>
</Alert>

// Custom colored alert
<Alert className="border-blue-200 bg-blue-50 text-blue-900">
  <InfoIcon className="h-4 w-4" />
  <AlertTitle>Information</AlertTitle>
  <AlertDescription>Here's some helpful information.</AlertDescription>
</Alert>

// Alert with actions
<Alert>
  <DownloadIcon className="h-4 w-4" />
  <AlertTitle>Download Complete</AlertTitle>
  <AlertDescription>Your file is ready.</AlertDescription>
  <div className="flex gap-2 mt-3">
    <Button size="sm">Open File</Button>
    <Button size="sm" variant="outline">Show in Folder</Button>
  </div>
</Alert>

// Dismissible alert
<Alert>
  <AlertTitle>Success</AlertTitle>
  <AlertDescription>Operation completed successfully.</AlertDescription>
  <Button
    size="sm"
    variant="ghost"
    className="absolute top-2 right-2 h-6 w-6 p-0"
    onClick={() => dismissAlert()}
  >
    <XIcon className="h-4 w-4" />
  </Button>
</Alert>`}
							</pre>
						</div>

						{/* Design Guidelines */}
						<div className="p-4 bg-purple-50 rounded-lg">
							<h4 className="text-sm font-semibold text-purple-700 mb-2">Design Guidelines:</h4>
							<ul className="text-sm text-purple-600 space-y-1 list-disc list-inside">
								<li><strong>Visual Hierarchy:</strong> Use consistent icon sizes (16px), clear typography, and proper spacing</li>
								<li><strong>Color System:</strong> Green for success, red for errors, blue for info, amber for warnings</li>
								<li><strong>Icon Usage:</strong> Choose contextually appropriate icons that reinforce the message type</li>
								<li><strong>Content Length:</strong> Keep titles concise (1-7 words), descriptions brief but informative</li>
								<li><strong>Action Buttons:</strong> Use primary buttons for main actions, outline for secondary actions</li>
								<li><strong>Animation:</strong> Consider subtle entrance animations for dynamic alerts</li>
								<li><strong>Responsive Design:</strong> Ensure alerts are readable and actionable on all screen sizes</li>
								<li><strong>Consistency:</strong> Maintain consistent styling and behavior patterns across your application</li>
							</ul>
						</div>
					</div>
				}
			/>
		</Fragment>
	)
}