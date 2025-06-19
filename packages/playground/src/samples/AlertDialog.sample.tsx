import { Fragment, useState } from 'react'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
	Button,
	Input,
	Label,
	Textarea
} from '@rs-kit/ui-kit'
import { 
	TrashIcon,
	AlertTriangleIcon,
	LogOutIcon,
	DownloadIcon,
	SaveIcon,
	DeleteIcon,
	XIcon,
	CheckIcon,
	UserMinusIcon,
	FileMinusIcon,
	ShieldAlertIcon,
	RefreshCwIcon,
	AlertCircleIcon,
	InfoIcon,
	SettingsIcon,
	BellOffIcon,
	CrownIcon
} from 'lucide-react'
import { ComponentDoc } from '@/components/ComponentDoc'

export default function AlertDialogSample() {
	// State for interactive examples
	const [deleteResult, setDeleteResult] = useState<string | null>(null)
	const [logoutResult, setLogoutResult] = useState<string | null>(null)
	const [saveResult, setSaveResult] = useState<string | null>(null)
	const [resetResult, setResetResult] = useState<string | null>(null)
	const [upgradeResult, setUpgradeResult] = useState<string | null>(null)
	const [customInput, setCustomInput] = useState('')
	const [confirmText, setConfirmText] = useState('')
	const [feedback, setFeedback] = useState('')

	// Interactive handlers
	const handleDelete = () => {
		setDeleteResult('Account deleted successfully')
		setTimeout(() => setDeleteResult(null), 3000)
	}

	const handleLogout = () => {
		setLogoutResult('Logged out successfully')
		setTimeout(() => setLogoutResult(null), 3000)
	}

	const handleSave = () => {
		setSaveResult('Changes saved successfully')
		setTimeout(() => setSaveResult(null), 3000)
	}

	const handleReset = () => {
		setResetResult('Settings reset to defaults')
		setTimeout(() => setResetResult(null), 3000)
	}

	const handleUpgrade = () => {
		setUpgradeResult('Upgraded to Pro plan')
		setTimeout(() => setUpgradeResult(null), 3000)
	}

	const handleCustomSubmit = () => {
		setDeleteResult(`Custom action: ${customInput}`)
		setCustomInput('')
		setTimeout(() => setDeleteResult(null), 3000)
	}

	const handleFeedbackSubmit = () => {
		setSaveResult('Feedback submitted successfully')
		setFeedback('')
		setTimeout(() => setSaveResult(null), 3000)
	}

	return (
		<Fragment>
			<ComponentDoc
				title="Alert Dialog"
				description="Modal dialogs that interrupt the user with important content and require a response. Perfect for confirmations, warnings, and critical actions."
				component={
					<div className="flex flex-col gap-8 w-full max-w-4xl">
						{/* Basic Alert Dialogs */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Basic Alert Dialogs</h3>
							<div className="space-y-4">
								<div>
									<h4 className="text-sm font-medium text-gray-600 mb-2">Simple Confirmation</h4>
									<div className="flex flex-wrap gap-3">
										<AlertDialog>
											<AlertDialogTrigger asChild>
												<Button variant="outline">
													<InfoIcon className="w-4 h-4" />
													Show Info
												</Button>
											</AlertDialogTrigger>
											<AlertDialogContent>
												<AlertDialogHeader>
													<AlertDialogTitle>Information</AlertDialogTitle>
													<AlertDialogDescription>
														This is a simple informational dialog. You can use this pattern for basic confirmations or to display important information to users.
													</AlertDialogDescription>
												</AlertDialogHeader>
												<AlertDialogFooter>
													<AlertDialogAction>Got it</AlertDialogAction>
												</AlertDialogFooter>
											</AlertDialogContent>
										</AlertDialog>

										<AlertDialog>
											<AlertDialogTrigger asChild>
												<Button variant="outline">
													<AlertTriangleIcon className="w-4 h-4" />
													Show Warning
												</Button>
											</AlertDialogTrigger>
											<AlertDialogContent>
												<AlertDialogHeader>
													<AlertDialogTitle className="flex items-center gap-2">
														<AlertTriangleIcon className="w-5 h-5 text-amber-500" />
														Warning
													</AlertDialogTitle>
													<AlertDialogDescription>
														This action may have unintended consequences. Please review your selection carefully before proceeding.
													</AlertDialogDescription>
												</AlertDialogHeader>
												<AlertDialogFooter>
													<AlertDialogCancel>Cancel</AlertDialogCancel>
													<AlertDialogAction className="bg-amber-600 hover:bg-amber-700">
														Proceed Anyway
													</AlertDialogAction>
												</AlertDialogFooter>
											</AlertDialogContent>
										</AlertDialog>
									</div>
								</div>
							</div>
						</div>

						{/* Destructive Actions */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Destructive Actions</h3>
							<div className="space-y-4">
								<div>
									<h4 className="text-sm font-medium text-gray-600 mb-2">Delete Confirmations</h4>
									<div className="flex flex-wrap gap-3">
										<AlertDialog>
											<AlertDialogTrigger asChild>
												<Button variant="destructive">
													<TrashIcon className="w-4 h-4" />
													Delete Account
												</Button>
											</AlertDialogTrigger>
											<AlertDialogContent>
												<AlertDialogHeader>
													<AlertDialogTitle className="flex items-center gap-2">
														<TrashIcon className="w-5 h-5 text-red-500" />
														Delete Account
													</AlertDialogTitle>
													<AlertDialogDescription>
														This action cannot be undone. This will permanently delete your account and remove all your data from our servers.
														<br /><br />
														<strong>What will be deleted:</strong>
														<ul className="mt-2 list-disc list-inside text-sm space-y-1">
															<li>Your profile and personal information</li>
															<li>All your projects and files</li>
															<li>Team memberships and collaborations</li>
															<li>Billing history and subscription data</li>
														</ul>
													</AlertDialogDescription>
												</AlertDialogHeader>
												<AlertDialogFooter>
													<AlertDialogCancel>Cancel</AlertDialogCancel>
													<AlertDialogAction 
														className="bg-red-600 hover:bg-red-700"
														onClick={handleDelete}
													>
														Delete Account
													</AlertDialogAction>
												</AlertDialogFooter>
											</AlertDialogContent>
										</AlertDialog>

										<AlertDialog>
											<AlertDialogTrigger asChild>
												<Button variant="destructive" size="sm">
													<FileMinusIcon className="w-4 h-4" />
													Delete Project
												</Button>
											</AlertDialogTrigger>
											<AlertDialogContent>
												<AlertDialogHeader>
													<AlertDialogTitle>Delete Project "My Awesome App"?</AlertDialogTitle>
													<AlertDialogDescription>
														This will permanently delete the project and all its files. This action cannot be undone.
													</AlertDialogDescription>
												</AlertDialogHeader>
												<AlertDialogFooter>
													<AlertDialogCancel>Keep Project</AlertDialogCancel>
													<AlertDialogAction className="bg-red-600 hover:bg-red-700">
														Delete Project
													</AlertDialogAction>
												</AlertDialogFooter>
											</AlertDialogContent>
										</AlertDialog>

										<AlertDialog>
											<AlertDialogTrigger asChild>
												<Button variant="outline">
													<UserMinusIcon className="w-4 h-4" />
													Remove User
												</Button>
											</AlertDialogTrigger>
											<AlertDialogContent>
												<AlertDialogHeader>
													<AlertDialogTitle>Remove User from Team?</AlertDialogTitle>
													<AlertDialogDescription>
														This will remove John Doe from the team. They will lose access to all team projects and won't be able to view or edit shared content.
													</AlertDialogDescription>
												</AlertDialogHeader>
												<AlertDialogFooter>
													<AlertDialogCancel>Cancel</AlertDialogCancel>
													<AlertDialogAction className="bg-red-600 hover:bg-red-700">
														Remove User
													</AlertDialogAction>
												</AlertDialogFooter>
											</AlertDialogContent>
										</AlertDialog>
									</div>
								</div>
							</div>
						</div>

						{/* System Actions */}
						<div>
							<h3 className="text-lg font-semibold mb-4">System Actions</h3>
							<div className="space-y-4">
								<div>
									<h4 className="text-sm font-medium text-gray-600 mb-2">User Session</h4>
									<div className="flex flex-wrap gap-3">
										<AlertDialog>
											<AlertDialogTrigger asChild>
												<Button variant="outline">
													<LogOutIcon className="w-4 h-4" />
													Sign Out
												</Button>
											</AlertDialogTrigger>
											<AlertDialogContent>
												<AlertDialogHeader>
													<AlertDialogTitle>Sign Out</AlertDialogTitle>
													<AlertDialogDescription>
														Are you sure you want to sign out? Any unsaved changes will be lost.
													</AlertDialogDescription>
												</AlertDialogHeader>
												<AlertDialogFooter>
													<AlertDialogCancel>Stay Signed In</AlertDialogCancel>
													<AlertDialogAction onClick={handleLogout}>
														Sign Out
													</AlertDialogAction>
												</AlertDialogFooter>
											</AlertDialogContent>
										</AlertDialog>

										<AlertDialog>
											<AlertDialogTrigger asChild>
												<Button variant="outline">
													<RefreshCwIcon className="w-4 h-4" />
													Reset Settings
												</Button>
											</AlertDialogTrigger>
											<AlertDialogContent>
												<AlertDialogHeader>
													<AlertDialogTitle className="flex items-center gap-2">
														<SettingsIcon className="w-5 h-5" />
														Reset All Settings
													</AlertDialogTitle>
													<AlertDialogDescription>
														This will reset all your preferences to their default values. This includes:
														<ul className="mt-2 list-disc list-inside text-sm space-y-1">
															<li>Theme and appearance settings</li>
															<li>Notification preferences</li>
															<li>Language and region settings</li>
															<li>Privacy and security options</li>
														</ul>
													</AlertDialogDescription>
												</AlertDialogHeader>
												<AlertDialogFooter>
													<AlertDialogCancel>Keep Current Settings</AlertDialogCancel>
													<AlertDialogAction 
														className="bg-amber-600 hover:bg-amber-700"
														onClick={handleReset}
													>
														Reset Settings
													</AlertDialogAction>
												</AlertDialogFooter>
											</AlertDialogContent>
										</AlertDialog>
									</div>
								</div>
							</div>
						</div>

						{/* Save Actions */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Save & Export Actions</h3>
							<div className="space-y-4">
								<div className="flex flex-wrap gap-3">
									<AlertDialog>
										<AlertDialogTrigger asChild>
											<Button>
												<SaveIcon className="w-4 h-4" />
												Save Changes
											</Button>
										</AlertDialogTrigger>
										<AlertDialogContent>
											<AlertDialogHeader>
												<AlertDialogTitle>Save Changes</AlertDialogTitle>
												<AlertDialogDescription>
													You have unsaved changes. Do you want to save them before continuing?
												</AlertDialogDescription>
											</AlertDialogHeader>
											<AlertDialogFooter>
												<AlertDialogCancel>Don't Save</AlertDialogCancel>
												<AlertDialogAction onClick={handleSave}>
													Save Changes
												</AlertDialogAction>
											</AlertDialogFooter>
										</AlertDialogContent>
									</AlertDialog>

									<AlertDialog>
										<AlertDialogTrigger asChild>
											<Button variant="outline">
												<DownloadIcon className="w-4 h-4" />
												Export Data
											</Button>
										</AlertDialogTrigger>
										<AlertDialogContent>
											<AlertDialogHeader>
												<AlertDialogTitle>Export Your Data</AlertDialogTitle>
												<AlertDialogDescription>
													This will create a downloadable archive containing all your data. The process may take a few minutes.
													<br /><br />
													<strong>Export will include:</strong>
													<ul className="mt-2 list-disc list-inside text-sm space-y-1">
														<li>Profile information</li>
														<li>Project files and documents</li>
														<li>Settings and preferences</li>
														<li>Activity history</li>
													</ul>
												</AlertDialogDescription>
											</AlertDialogHeader>
											<AlertDialogFooter>
												<AlertDialogCancel>Cancel</AlertDialogCancel>
												<AlertDialogAction>
													Start Export
												</AlertDialogAction>
											</AlertDialogFooter>
										</AlertDialogContent>
									</AlertDialog>
								</div>
							</div>
						</div>

						{/* Upgrade & Billing */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Upgrade & Billing</h3>
							<div className="space-y-4">
								<div className="flex flex-wrap gap-3">
									<AlertDialog>
										<AlertDialogTrigger asChild>
											<Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
												<CrownIcon className="w-4 h-4" />
												Upgrade to Pro
											</Button>
										</AlertDialogTrigger>
										<AlertDialogContent>
											<AlertDialogHeader>
												<AlertDialogTitle className="flex items-center gap-2">
													<CrownIcon className="w-5 h-5 text-purple-600" />
													Upgrade to Pro Plan
												</AlertDialogTitle>
												<AlertDialogDescription>
													Upgrade to Pro for $29/month and unlock premium features:
													<br /><br />
													<div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg mt-3">
														<ul className="space-y-2 text-sm">
															<li className="flex items-center gap-2">
																<CheckIcon className="w-4 h-4 text-green-600" />
																Unlimited projects
															</li>
															<li className="flex items-center gap-2">
																<CheckIcon className="w-4 h-4 text-green-600" />
																100GB storage
															</li>
															<li className="flex items-center gap-2">
																<CheckIcon className="w-4 h-4 text-green-600" />
																Priority support
															</li>
															<li className="flex items-center gap-2">
																<CheckIcon className="w-4 h-4 text-green-600" />
																Advanced analytics
															</li>
														</ul>
													</div>
												</AlertDialogDescription>
											</AlertDialogHeader>
											<AlertDialogFooter>
												<AlertDialogCancel>Maybe Later</AlertDialogCancel>
												<AlertDialogAction 
													className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
													onClick={handleUpgrade}
												>
													Upgrade Now
												</AlertDialogAction>
											</AlertDialogFooter>
										</AlertDialogContent>
									</AlertDialog>

									<AlertDialog>
										<AlertDialogTrigger asChild>
											<Button variant="outline">
												<BellOffIcon className="w-4 h-4" />
												Cancel Subscription
											</Button>
										</AlertDialogTrigger>
										<AlertDialogContent>
											<AlertDialogHeader>
												<AlertDialogTitle>Cancel Subscription</AlertDialogTitle>
												<AlertDialogDescription>
													Are you sure you want to cancel your Pro subscription? You'll lose access to:
													<ul className="mt-2 list-disc list-inside text-sm space-y-1">
														<li>Unlimited projects</li>
														<li>Premium templates</li>
														<li>Priority support</li>
														<li>Advanced features</li>
													</ul>
													<br />
													Your subscription will remain active until the end of your billing period.
												</AlertDialogDescription>
											</AlertDialogHeader>
											<AlertDialogFooter>
												<AlertDialogCancel>Keep Subscription</AlertDialogCancel>
												<AlertDialogAction className="bg-red-600 hover:bg-red-700">
													Cancel Subscription
												</AlertDialogAction>
											</AlertDialogFooter>
										</AlertDialogContent>
									</AlertDialog>
								</div>
							</div>
						</div>

						{/* Custom Input Dialogs */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Custom Input Dialogs</h3>
							<div className="space-y-4">
								<div className="flex flex-wrap gap-3">
									<AlertDialog>
										<AlertDialogTrigger asChild>
											<Button variant="outline">
												Confirmation with Input
											</Button>
										</AlertDialogTrigger>
										<AlertDialogContent>
											<AlertDialogHeader>
												<AlertDialogTitle>Delete Project</AlertDialogTitle>
												<AlertDialogDescription>
													This action cannot be undone. To confirm, please type the project name below:
												</AlertDialogDescription>
											</AlertDialogHeader>
											<div className="my-4">
												<Label htmlFor="confirm-input" className="text-sm font-medium">
													Type "delete-me" to confirm:
												</Label>
												<Input
													id="confirm-input"
													value={confirmText}
													onChange={(e) => setConfirmText(e.target.value)}
													placeholder="delete-me"
													className="mt-2"
												/>
											</div>
											<AlertDialogFooter>
												<AlertDialogCancel onClick={() => setConfirmText('')}>Cancel</AlertDialogCancel>
												<AlertDialogAction 
													className="bg-red-600 hover:bg-red-700"
													disabled={confirmText !== 'delete-me'}
													onClick={() => {
														handleCustomSubmit()
														setConfirmText('')
													}}
												>
													Delete Project
												</AlertDialogAction>
											</AlertDialogFooter>
										</AlertDialogContent>
									</AlertDialog>

									<AlertDialog>
										<AlertDialogTrigger asChild>
											<Button variant="outline">
												Feedback Dialog
											</Button>
										</AlertDialogTrigger>
										<AlertDialogContent className="max-w-lg">
											<AlertDialogHeader>
												<AlertDialogTitle>Send Feedback</AlertDialogTitle>
												<AlertDialogDescription>
													Help us improve by sharing your thoughts. Your feedback is valuable to us.
												</AlertDialogDescription>
											</AlertDialogHeader>
											<div className="my-4">
												<Label htmlFor="feedback-input" className="text-sm font-medium">
													Your feedback:
												</Label>
												<Textarea
													id="feedback-input"
													value={feedback}
													onChange={(e) => setFeedback(e.target.value)}
													placeholder="Tell us what you think..."
													className="mt-2 min-h-[100px]"
												/>
											</div>
											<AlertDialogFooter>
												<AlertDialogCancel onClick={() => setFeedback('')}>Cancel</AlertDialogCancel>
												<AlertDialogAction 
													disabled={!feedback.trim()}
													onClick={handleFeedbackSubmit}
												>
													Send Feedback
												</AlertDialogAction>
											</AlertDialogFooter>
										</AlertDialogContent>
									</AlertDialog>
								</div>
							</div>
						</div>

						{/* Result Display */}
						{(deleteResult || logoutResult || saveResult || resetResult || upgradeResult) && (
							<div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
								<h4 className="text-sm font-semibold text-green-700 mb-2">Action Result:</h4>
								<div className="text-sm text-green-600">
									{deleteResult && <p>✅ {deleteResult}</p>}
									{logoutResult && <p>✅ {logoutResult}</p>}
									{saveResult && <p>✅ {saveResult}</p>}
									{resetResult && <p>✅ {resetResult}</p>}
									{upgradeResult && <p>✅ {upgradeResult}</p>}
								</div>
							</div>
						)}

						{/* Current State Display */}
						<div className="mt-6 p-4 bg-gray-50 rounded-lg">
							<h4 className="text-sm font-semibold text-gray-700 mb-2">Interactive State:</h4>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
								<div>
									<p><strong>Confirmation Text:</strong> {confirmText || 'Empty'}</p>
									<p><strong>Custom Input:</strong> {customInput || 'Empty'}</p>
								</div>
								<div>
									<p><strong>Feedback Length:</strong> {feedback.length} characters</p>
									<p><strong>Last Action:</strong> {deleteResult || logoutResult || saveResult || resetResult || upgradeResult || 'None'}</p>
								</div>
							</div>
						</div>
					</div>
				}
			/>

			<ComponentDoc
				title="Alert Dialog Props & Usage Guidelines"
				description="Comprehensive guide to AlertDialog component structure, styling, and best practices."
				component={
					<div className="flex flex-col gap-6 w-full max-w-4xl">
						{/* Props Reference */}
						<div className="p-4 bg-blue-50 rounded-lg">
							<h4 className="text-sm font-semibold text-blue-700 mb-2">Props Reference:</h4>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-600">
								<div>
									<strong>AlertDialog:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li><code>children</code> - Dialog components</li>
										<li>Root container component</li>
										<li>Manages dialog state internally</li>
									</ul>
								</div>
								<div>
									<strong>AlertDialogTrigger:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li><code>asChild</code> - Render as child element</li>
										<li><code>children</code> - Trigger element (usually Button)</li>
										<li>Opens the dialog on click</li>
									</ul>
								</div>
								<div>
									<strong>AlertDialogContent:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li><code>className</code> - Additional CSS classes</li>
										<li><code>children</code> - Dialog content</li>
										<li>Main dialog container</li>
									</ul>
								</div>
								<div>
									<strong>AlertDialogHeader:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li><code>className</code> - Custom header styling</li>
										<li>Contains title and description</li>
										<li>Optional component</li>
									</ul>
								</div>
								<div>
									<strong>AlertDialogTitle:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li><code>className</code> - Custom title styling</li>
										<li>Dialog heading text</li>
										<li>Required for accessibility</li>
									</ul>
								</div>
								<div>
									<strong>AlertDialogDescription:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li><code>className</code> - Custom description styling</li>
										<li>Detailed explanation text</li>
										<li>Can contain rich content/JSX</li>
									</ul>
								</div>
								<div>
									<strong>AlertDialogFooter:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li><code>className</code> - Custom footer styling</li>
										<li>Contains action buttons</li>
										<li>Typically Cancel + Action</li>
									</ul>
								</div>
								<div>
									<strong>AlertDialogAction/Cancel:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li><code>onClick</code> - Action handler</li>
										<li><code>className</code> - Button styling</li>
										<li>Automatically close dialog</li>
									</ul>
								</div>
							</div>
						</div>

						{/* Usage Guidelines */}
						<div className="p-4 bg-green-50 rounded-lg">
							<h4 className="text-sm font-semibold text-green-700 mb-2">Usage Guidelines:</h4>
							<ul className="text-sm text-green-600 space-y-1 list-disc list-inside">
								<li><strong>When to Use:</strong> Destructive actions, important confirmations, critical system messages</li>
								<li><strong>Content Structure:</strong> Clear title, descriptive text, explicit action buttons</li>
								<li><strong>Action Buttons:</strong> Use clear, action-oriented text ("Delete Account" not "Yes")</li>
								<li><strong>Destructive Actions:</strong> Always use red/destructive styling for irreversible actions</li>
								<li><strong>Cancel Options:</strong> Always provide a clear way to cancel or go back</li>
								<li><strong>Content Length:</strong> Keep content concise but informative</li>
								<li><strong>Input Validation:</strong> For confirmation inputs, validate before enabling actions</li>
								<li><strong>Escape Hatch:</strong> Users should be able to dismiss with Escape key</li>
							</ul>
						</div>

						{/* Code Examples */}
						<div className="p-4 bg-gray-100 rounded-lg">
							<h4 className="text-sm font-semibold text-gray-700 mb-2">Code Examples:</h4>
							<pre className="text-xs text-gray-600 overflow-x-auto whitespace-pre-wrap">
{`// Basic confirmation dialog
<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Delete</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your data.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction className="bg-red-600 hover:bg-red-700">
        Delete
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

// Dialog with custom content
<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button>Show Custom</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Custom Dialog</AlertDialogTitle>
      <AlertDialogDescription>
        This dialog contains custom form elements.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <div className="my-4">
      <Label htmlFor="input">Enter value:</Label>
      <Input id="input" value={value} onChange={handleChange} />
    </div>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={handleSubmit}>
        Submit
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

// Styled action buttons
<AlertDialogFooter>
  <AlertDialogCancel>Cancel</AlertDialogCancel>
  <AlertDialogAction className="bg-gradient-to-r from-purple-600 to-blue-600">
    Upgrade Now
  </AlertDialogAction>
</AlertDialogFooter>`}
							</pre>
						</div>

						{/* Design Guidelines */}
						<div className="p-4 bg-purple-50 rounded-lg">
							<h4 className="text-sm font-semibold text-purple-700 mb-2">Design Guidelines:</h4>
							<ul className="text-sm text-purple-600 space-y-1 list-disc list-inside">
								<li><strong>Visual Hierarchy:</strong> Use consistent typography and spacing for titles and descriptions</li>
								<li><strong>Color Coding:</strong> Red for destructive, amber for warnings, blue for info, green for success</li>
								<li><strong>Button Placement:</strong> Cancel on left, primary action on right (varies by platform)</li>
								<li><strong>Content Width:</strong> Keep dialog width reasonable for readability</li>
								<li><strong>Icon Usage:</strong> Use meaningful icons in titles to reinforce the message type</li>
								<li><strong>Focus Management:</strong> Focus should move to dialog when opened, return to trigger when closed</li>
								<li><strong>Mobile Considerations:</strong> Ensure dialogs are responsive and touch-friendly</li>
								<li><strong>Animation:</strong> Use subtle entrance/exit animations for better UX</li>
							</ul>
						</div>
					</div>
				}
			/>
		</Fragment>
	)
}
