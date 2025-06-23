import { Fragment, useState } from 'react'
import { ProgressChart, Button } from '@rs-kit/ui-kit'
import { ComponentDoc } from '@/components/ComponentDoc'
import { PlayIcon, RefreshCwIcon, CheckCircleIcon, XCircleIcon } from 'lucide-react'

export default function ProgressChartSample() {
	// State for basic demo
	const [basicOpen, setBasicOpen] = useState(false)
	const [basicProgress, setBasicProgress] = useState(0)
	const [basicSuccess, setBasicSuccess] = useState(false)

	// State for custom messages demo
	const [customOpen, setCustomOpen] = useState(false)
	const [customProgress, setCustomProgress] = useState(0)
	const [customSuccess, setCustomSuccess] = useState(false)

	// State for file upload demo
	const [uploadOpen, setUploadOpen] = useState(false)
	const [uploadProgress, setUploadProgress] = useState(0)
	const [uploadSuccess, setUploadSuccess] = useState(false)

	// State for authentication demo
	const [authOpen, setAuthOpen] = useState(false)
	const [authProgress, setAuthProgress] = useState(0)
	const [authSuccess, setAuthSuccess] = useState(false)

	// State for installation demo
	const [installOpen, setInstallOpen] = useState(false)
	const [installProgress, setInstallProgress] = useState(0)
	const [installSuccess, setInstallSuccess] = useState(false)

	// Reset function for demos
	const resetDemo = (setOpen: (value: boolean) => void, setProgress: (value: number) => void, setSuccess: (value: boolean) => void) => {
		setOpen(false)
		setProgress(0)
		setSuccess(false)
	}

	// Start progress simulation
	const startProgress = (
		setOpen: (value: boolean) => void, 
		setProgress: (value: number) => void, 
		setSuccess: (value: boolean) => void,
		duration: number = 3000
	) => {
		setOpen(true)
		setProgress(0)
		setSuccess(false)

		const interval = setInterval(() => {
			setProgress((prev: number) => {
				const next = prev + Math.random() * 3 + 1 // Smaller, smoother increments (1-4%)
				if (next >= 100) {
					clearInterval(interval)
					setTimeout(() => setSuccess(true), 200)
					return 100
				}
				return next
			})
		}, duration / 50) // More frequent updates for smoother animation
	}

	const handleComplete = (setOpen: (value: boolean) => void) => {
		setTimeout(() => setOpen(false), 1000)
	}

	return (
		<Fragment>
			<ComponentDoc
				title="Progress Chart"
				description="A full-screen progress chart component with animated circular progress indicator and success state transitions. Perfect for showing loading states, authentication processes, and task completion."
				component={
					<div className="flex flex-col gap-8 w-full max-w-4xl">
						{/* Basic Demo */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Basic Progress Chart</h3>
							<div className="flex flex-wrap items-center gap-3 mb-4">
								<Button onClick={() => startProgress(setBasicOpen, setBasicProgress, setBasicSuccess)}>
									<PlayIcon className="w-4 h-4" />
									Start Progress
								</Button>
								<Button 
									variant="outline" 
									onClick={() => resetDemo(setBasicOpen, setBasicProgress, setBasicSuccess)}
								>
									<RefreshCwIcon className="w-4 h-4" />
									Reset
								</Button>
								<div className="text-sm text-gray-600">
									Progress: {Math.round(basicProgress)}% | Success: {basicSuccess ? '✅' : '❌'}
								</div>
							</div>
							<div className="p-4 bg-gray-50 rounded-lg">
								<p className="text-sm text-gray-600">
									This demonstrates the basic usage with default messages. The progress will animate from 0 to 100%, 
									then show a success state with checkmark animation.
								</p>
							</div>
						</div>

						{/* Custom Messages Demo */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Custom Messages</h3>
							<div className="flex flex-wrap items-center gap-3 mb-4">
								<Button onClick={() => startProgress(setCustomOpen, setCustomProgress, setCustomSuccess, 4000)}>
									<PlayIcon className="w-4 h-4" />
									Start Custom Demo
								</Button>
								<Button 
									variant="outline" 
									onClick={() => resetDemo(setCustomOpen, setCustomProgress, setCustomSuccess)}
								>
									<RefreshCwIcon className="w-4 h-4" />
									Reset
								</Button>
								<div className="text-sm text-gray-600">
									Progress: {Math.round(customProgress)}% | Success: {customSuccess ? '✅' : '❌'}
								</div>
							</div>
							<div className="p-4 bg-gray-50 rounded-lg">
								<p className="text-sm text-gray-600">
									This demo shows how to customize all the text messages including titles and subtitles for both 
									progress and success states.
								</p>
							</div>
						</div>

						{/* File Upload Simulation */}
						<div>
							<h3 className="text-lg font-semibold mb-4">File Upload Simulation</h3>
							<div className="flex flex-wrap items-center gap-3 mb-4">
								<Button onClick={() => startProgress(setUploadOpen, setUploadProgress, setUploadSuccess, 5000)}>
									<PlayIcon className="w-4 h-4" />
									Upload Files
								</Button>
								<Button 
									variant="outline" 
									onClick={() => resetDemo(setUploadOpen, setUploadProgress, setUploadSuccess)}
								>
									<RefreshCwIcon className="w-4 h-4" />
									Reset
								</Button>
								<div className="text-sm text-gray-600">
									Progress: {Math.round(uploadProgress)}% | Success: {uploadSuccess ? '✅' : '❌'}
								</div>
							</div>
							<div className="p-4 bg-gray-50 rounded-lg">
								<p className="text-sm text-gray-600">
									Simulates a file upload process with appropriate messaging for upload progress and completion.
								</p>
							</div>
						</div>

						{/* Authentication Process */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Authentication Process</h3>
							<div className="flex flex-wrap items-center gap-3 mb-4">
								<Button onClick={() => startProgress(setAuthOpen, setAuthProgress, setAuthSuccess, 2500)}>
									<PlayIcon className="w-4 h-4" />
									Authenticate
								</Button>
								<Button 
									variant="outline" 
									onClick={() => resetDemo(setAuthOpen, setAuthProgress, setAuthSuccess)}
								>
									<RefreshCwIcon className="w-4 h-4" />
									Reset
								</Button>
								<div className="text-sm text-gray-600">
									Progress: {Math.round(authProgress)}% | Success: {authSuccess ? '✅' : '❌'}
								</div>
							</div>
							<div className="p-4 bg-gray-50 rounded-lg">
								<p className="text-sm text-gray-600">
									Shows an authentication flow with verification progress and success confirmation.
								</p>
							</div>
						</div>

						{/* App Installation */}
						<div>
							<h3 className="text-lg font-semibold mb-4">App Installation</h3>
							<div className="flex flex-wrap items-center gap-3 mb-4">
								<Button onClick={() => startProgress(setInstallOpen, setInstallProgress, setInstallSuccess, 6000)}>
									<PlayIcon className="w-4 h-4" />
									Install App
								</Button>
								<Button 
									variant="outline" 
									onClick={() => resetDemo(setInstallOpen, setInstallProgress, setInstallSuccess)}
								>
									<RefreshCwIcon className="w-4 h-4" />
									Reset
								</Button>
								<div className="text-sm text-gray-600">
									Progress: {Math.round(installProgress)}% | Success: {installSuccess ? '✅' : '❌'}
								</div>
							</div>
							<div className="p-4 bg-gray-50 rounded-lg">
								<p className="text-sm text-gray-600">
									Demonstrates an app installation process with progress tracking and completion notification.
								</p>
							</div>
						</div>

						{/* Features Overview */}
						<div className="p-4 bg-blue-50 rounded-lg">
							<h4 className="text-sm font-semibold text-blue-700 mb-2">Component Features:</h4>
							<ul className="text-sm text-blue-600 space-y-1 list-disc list-inside">
								<li><strong>Fullscreen Experience:</strong> Takes over the entire screen for immersive progress display</li>
								<li><strong>Circular Progress:</strong> Animated SVG circle that smoothly fills as progress increases</li>
								<li><strong>Success Animation:</strong> Smooth transition to success state with checkmark and confetti</li>
								<li><strong>Customizable Messages:</strong> All text content can be customized via props</li>
								<li><strong>Auto-Complete:</strong> Automatically triggers onComplete callback after success animation</li>
								<li><strong>Responsive Design:</strong> Works seamlessly on all screen sizes</li>
								<li><strong>Portal Support:</strong> Can be rendered in specific containers via portal prop</li>
							</ul>
						</div>
					</div>
				}
			/>

			<ComponentDoc
				title="Progress Chart Props & Usage"
				description="Comprehensive guide to ProgressChart component props, customization options, and implementation patterns."
				component={
					<div className="flex flex-col gap-6 w-full max-w-4xl">
						{/* Props Reference */}
						<div className="p-4 bg-green-50 rounded-lg">
							<h4 className="text-sm font-semibold text-green-700 mb-2">Props Reference:</h4>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-600">
								<div>
									<strong>Required Props:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li><code>open: boolean</code> - Controls visibility of the progress chart</li>
										<li><code>success: boolean</code> - Triggers success state transition</li>
										<li><code>value: number</code> - Progress value (0-100)</li>
									</ul>
								</div>
								<div>
									<strong>Optional Props:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li><code>title?: string</code> - Progress state title</li>
										<li><code>subTitle?: string</code> - Progress state subtitle</li>
										<li><code>successTitle?: string</code> - Success state title</li>
										<li><code>successSubtitle?: string</code> - Success state subtitle</li>
										<li><code>onComplete?: () => void</code> - Callback after success</li>
									</ul>
								</div>
							</div>
						</div>

						{/* Usage Patterns */}
						<div className="p-4 bg-purple-50 rounded-lg">
							<h4 className="text-sm font-semibold text-purple-700 mb-2">Common Usage Patterns:</h4>
							<ul className="text-sm text-purple-600 space-y-1 list-disc list-inside">
								<li><strong>File Uploads:</strong> Track upload progress and show completion</li>
								<li><strong>Authentication:</strong> Show verification process and success</li>
								<li><strong>Installation:</strong> Display app or package installation progress</li>
								<li><strong>Data Processing:</strong> Indicate background task completion</li>
								<li><strong>Form Submission:</strong> Show processing state for complex forms</li>
								<li><strong>Account Setup:</strong> Guide users through multi-step setup processes</li>
							</ul>
						</div>

						{/* Code Examples */}
						<div className="p-4 bg-gray-100 rounded-lg">
							<h4 className="text-sm font-semibold text-gray-700 mb-2">Code Examples:</h4>
							<pre className="text-xs text-gray-600 overflow-x-auto whitespace-pre-wrap">
{`// Basic usage
<ProgressChart 
  open={isOpen}
  success={isComplete}
  value={progressValue}
/>

// With custom messages
<ProgressChart 
  open={isUploading}
  success={uploadComplete}
  value={uploadProgress}
  title="Uploading Files"
  subTitle="Please don't close this window..."
  successTitle="Upload Complete!"
  successSubtitle="Your files have been\\nsuccessfully uploaded"
  onComplete={() => setIsUploading(false)}
/>

// Authentication flow
<ProgressChart 
  open={isAuthenticating}
  success={authSuccess}
  value={authProgress}
  title="Authenticating"
  subTitle="Verifying your credentials..."
  successTitle="Welcome Back!"
  successSubtitle="You have been successfully\\nauthenticated"
  onComplete={handleAuthComplete}
/>

// With progress simulation
const [progress, setProgress] = useState(0)
const [success, setSuccess] = useState(false)

const startProcess = () => {
  const interval = setInterval(() => {
    setProgress(prev => {
      const next = prev + Math.random() * 10 + 5
      if (next >= 100) {
        clearInterval(interval)
        setSuccess(true)
        return 100
      }
      return next
    })
  }, 200)
}`}
							</pre>
						</div>

						{/* Best Practices */}
						<div className="p-4 bg-orange-50 rounded-lg">
							<h4 className="text-sm font-semibold text-orange-700 mb-2">Best Practices:</h4>
							<ul className="text-sm text-orange-600 space-y-1 list-disc list-inside">
								<li><strong>Progress Updates:</strong> Update progress value smoothly, avoid sudden jumps</li>
								<li><strong>Success Timing:</strong> Only set success=true when progress reaches 100%</li>
								<li><strong>Message Clarity:</strong> Use clear, action-oriented messages that inform users</li>
								<li><strong>Error Handling:</strong> Consider how to handle errors in your progress flow</li>
								<li><strong>Accessibility:</strong> Ensure progress is announced to screen readers</li>
								<li><strong>Performance:</strong> Avoid too frequent progress updates to prevent UI lag</li>
								<li><strong>User Experience:</strong> Provide estimated time or context when possible</li>
							</ul>
						</div>

						{/* Animation Details */}
						<div className="p-4 bg-indigo-50 rounded-lg">
							<h4 className="text-sm font-semibold text-indigo-700 mb-2">Animation Behaviors:</h4>
							<ul className="text-sm text-indigo-600 space-y-1 list-disc list-inside">
								<li><strong>Progress Circle:</strong> Smoothly animates based on strokeDashoffset</li>
								<li><strong>State Transition:</strong> 800ms delay before showing success state</li>
								<li><strong>Success Animation:</strong> Staggered animations for checkmark and text</li>
								<li><strong>Confetti Effect:</strong> Random positioned particles with ping animation</li>
								<li><strong>Auto Close:</strong> 2 second delay before calling onComplete</li>
								<li><strong>Portal Container:</strong> Renders in app-container element by default</li>
							</ul>
						</div>
					</div>
				}
			/>

			{/* Progress Chart Instances */}
			<ProgressChart 
				open={basicOpen}
				success={basicSuccess}
				value={basicProgress}
				onComplete={() => handleComplete(setBasicOpen)}
			/>

			<ProgressChart 
				open={customOpen}
				success={customSuccess}
				value={customProgress}
				title="Processing Data"
				subTitle="Analyzing your information..."
				successTitle="Analysis Complete!"
				successSubtitle="Your data has been\\nprocessed successfully"
				onComplete={() => handleComplete(setCustomOpen)}
			/>

			<ProgressChart 
				open={uploadOpen}
				success={uploadSuccess}
				value={uploadProgress}
				title="Uploading Files"
				subTitle="Please don't close this window..."
				successTitle="Upload Complete!"
				successSubtitle="Your files have been\\nsuccessfully uploaded"
				onComplete={() => handleComplete(setUploadOpen)}
			/>

			<ProgressChart 
				open={authOpen}
				success={authSuccess}
				value={authProgress}
				title="Authenticating"
				subTitle="Verifying your credentials..."
				successTitle="Welcome Back!"
				successSubtitle="You have been successfully\\nauthenticated"
				onComplete={() => handleComplete(setAuthOpen)}
			/>

			<ProgressChart 
				open={installOpen}
				success={installSuccess}
				value={installProgress}
				title="Installing App"
				subTitle="Setting up your application..."
				successTitle="Installation Complete!"
				successSubtitle="Your app is ready\\nto use"
				onComplete={() => handleComplete(setInstallOpen)}
			/>
		</Fragment>
	)
}