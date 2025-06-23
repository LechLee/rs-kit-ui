import { Fragment, useState } from 'react'
import { toast } from 'sonner'
import {
	Button,
	Toaster,
	Label,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Badge,
	Switch,
	Input,
	Textarea,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Separator
} from '@rs-kit/ui-kit'
import {
	CheckIcon,
	XIcon,
	AlertTriangleIcon,
	InfoIcon,
	BellIcon,
	MailIcon,
	ShoppingCartIcon,
	DownloadIcon,
	UploadIcon,
	UserIcon,
	SaveIcon,
	TrashIcon,
	EditIcon,
	PlusIcon,
	HeartIcon,
	ShareIcon,
	StarIcon,
	MessageSquareIcon,
	TrendingUpIcon
} from 'lucide-react'
import { ComponentDoc } from '@/components/ComponentDoc'

// Notification Center Demo
const NotificationCenterDemo = () => {
	const [notificationCount, setNotificationCount] = useState(0)

	const notifications = [
		{
			type: 'success',
			title: 'Order Confirmed',
			message: 'Your order #12345 has been confirmed and will be shipped soon.',
			icon: CheckIcon,
			action: { label: 'View Order', onClick: () => console.log('View order') }
		},
		{
			type: 'info',
			title: 'New Feature Available',
			message: 'Check out our new dashboard analytics with real-time insights.',
			icon: InfoIcon,
			action: { label: 'Explore', onClick: () => console.log('Explore feature') }
		},
		{
			type: 'warning',
			title: 'Account Security',
			message: 'We noticed a login from a new device. Please verify if this was you.',
			icon: AlertTriangleIcon,
			action: { label: 'Verify', onClick: () => console.log('Verify login') }
		},
		{
			type: 'error',
			title: 'Payment Failed',
			message: 'Your payment could not be processed. Please update your payment method.',
			icon: XIcon,
			action: { label: 'Update', onClick: () => console.log('Update payment') }
		}
	]

	const showNotification = (notification: any) => {
		setNotificationCount(prev => prev + 1)
		
		switch (notification.type) {
			case 'success':
				toast.success(notification.title, {
					description: notification.message,
					action: notification.action
				})
				break
			case 'error':
				toast.error(notification.title, {
					description: notification.message,
					action: notification.action
				})
				break
			case 'warning':
				toast.warning(notification.title, {
					description: notification.message,
					action: notification.action
				})
				break
			case 'info':
			default:
				toast.info(notification.title, {
					description: notification.message,
					action: notification.action
				})
				break
		}
	}

	const showAllNotifications = () => {
		notifications.forEach((notification, index) => {
			setTimeout(() => showNotification(notification), index * 500)
		})
	}

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold flex items-center gap-2">
					<BellIcon className="w-5 h-5" />
					Notification Center
				</Label>
				<p className="text-sm text-muted-foreground">System-wide notifications with different types and interactive actions</p>
			</div>

			<div className="space-y-4">
				<div className="flex items-center gap-4 flex-wrap">
					<Button onClick={showAllNotifications} variant="default">
						<BellIcon className="w-4 h-4 mr-2" />
						Show All Notifications
					</Button>
					<Badge variant="outline">{notificationCount} Notifications Sent</Badge>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
					{notifications.map((notification, index) => (
						<Card key={index} className="hover:shadow-sm transition-shadow cursor-pointer" onClick={() => showNotification(notification)}>
							<CardContent className="p-4">
								<div className="flex items-start gap-3">
									<div className={`p-2 rounded-full ${
										notification.type === 'success' ? 'bg-green-100 text-green-600' :
										notification.type === 'error' ? 'bg-red-100 text-red-600' :
										notification.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
										'bg-blue-100 text-blue-600'
									}`}>
										<notification.icon className="w-4 h-4" />
									</div>
									<div className="flex-1 min-w-0">
										<div className="flex items-center gap-2 mb-1">
											<h4 className="font-semibold text-sm">{notification.title}</h4>
											<Badge variant={
												notification.type === 'success' ? 'default' :
												notification.type === 'error' ? 'destructive' :
												notification.type === 'warning' ? 'secondary' :
												'outline'
											} className="text-xs">
												{notification.type}
											</Badge>
										</div>
										<p className="text-xs text-muted-foreground line-clamp-2">{notification.message}</p>
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</div>
	)
}

// User Actions Demo
const UserActionsDemo = () => {
	const [actionCount, setActionCount] = useState(0)

	const userActions = [
		{
			title: 'Save Changes',
			description: 'Your profile has been updated successfully.',
			icon: SaveIcon,
			color: 'bg-green-500',
			action: () => toast.success('Profile Saved', {
				description: 'Your changes have been saved successfully.',
				action: { label: 'View Profile', onClick: () => console.log('View profile') }
			})
		},
		{
			title: 'Add to Favorites',
			description: 'Item added to your favorites list.',
			icon: HeartIcon,
			color: 'bg-red-500',
			action: () => toast('Added to Favorites', {
				description: 'You can find this in your favorites section.',
				icon: '❤️'
			})
		},
		{
			title: 'Share Content',
			description: 'Content shared with your network.',
			icon: ShareIcon,
			color: 'bg-blue-500',
			action: () => toast('Content Shared', {
				description: 'Your post has been shared successfully.',
				action: { label: 'View Post', onClick: () => console.log('View post') }
			})
		},
		{
			title: 'Delete Item',
			description: 'Item will be moved to trash.',
			icon: TrashIcon,
			color: 'bg-red-600',
			action: () => toast.error('Item Deleted', {
				description: 'The item has been moved to trash.',
				action: { label: 'Undo', onClick: () => toast.success('Item Restored') }
			})
		},
		{
			title: 'Send Message',
			description: 'Message sent to recipient.',
			icon: MailIcon,
			color: 'bg-purple-500',
			action: () => toast('Message Sent', {
				description: 'Your message has been delivered.',
				icon: '✉️'
			})
		},
		{
			title: 'Add Review',
			description: 'Thank you for your feedback.',
			icon: StarIcon,
			color: 'bg-yellow-500',
			action: () => toast.success('Review Added', {
				description: 'Thank you for your 5-star review!',
				icon: '⭐'
			})
		}
	]

	const handleAction = (action: any) => {
		setActionCount(prev => prev + 1)
		action()
	}

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold flex items-center gap-2">
					<UserIcon className="w-5 h-5" />
					User Actions
				</Label>
				<p className="text-sm text-muted-foreground">Common user actions with contextual feedback and undo capabilities</p>
			</div>

			<div className="space-y-4">
				<div className="flex items-center gap-4">
					<Badge variant="outline">{actionCount} Actions Performed</Badge>
				</div>

				<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
					{userActions.map((action, index) => (
						<Button
							key={index}
							variant="outline"
							className="h-auto p-4 flex-col gap-3 hover:shadow-md transition-shadow"
							onClick={() => handleAction(action.action)}
						>
							<div className={`p-3 rounded-full ${action.color} text-white`}>
								<action.icon className="w-5 h-5" />
							</div>
							<div className="text-center">
								<p className="font-semibold text-sm">{action.title}</p>
								<p className="text-xs text-muted-foreground">{action.description}</p>
							</div>
						</Button>
					))}
				</div>
			</div>
		</div>
	)
}

// E-commerce Demo
const EcommerceFeedbackDemo = () => {
	const [orderStatus, setOrderStatus] = useState('pending')

	const simulateOrderFlow = () => {
		// Order placed
		toast.success('Order Placed!', {
			description: 'Order #12345 has been confirmed.',
			action: { label: 'Track Order', onClick: () => console.log('Track order') }
		})

		// Payment processing
		setTimeout(() => {
			toast.loading('Processing Payment...', {
				description: 'Please wait while we process your payment.'
			})
		}, 1000)

		// Payment confirmed
		setTimeout(() => {
			toast.success('Payment Confirmed', {
				description: 'Your payment has been processed successfully.',
				icon: '💳'
			})
		}, 3000)

		// Preparing shipment
		setTimeout(() => {
			toast('Preparing Shipment', {
				description: 'Your order is being prepared for shipment.',
				icon: '📦'
			})
		}, 5000)

		// Shipped
		setTimeout(() => {
			toast.success('Order Shipped!', {
				description: 'Your order has been shipped and is on its way.',
				action: { label: 'Track Package', onClick: () => console.log('Track package') }
			})
			setOrderStatus('shipped')
		}, 7000)
	}

	const simulateDownload = () => {
		toast.loading('Downloading...', {
			description: 'Your file is being prepared for download.'
		})

		setTimeout(() => {
			toast.success('Download Complete', {
				description: 'Your file has been downloaded successfully.',
				action: { label: 'Open File', onClick: () => console.log('Open file') }
			})
		}, 2000)
	}

	const simulateError = () => {
		toast.error('Transaction Failed', {
			description: 'Your payment could not be processed. Please try again.',
			action: { label: 'Retry', onClick: () => simulateOrderFlow() }
		})
	}

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold flex items-center gap-2">
					<ShoppingCartIcon className="w-5 h-5" />
					E-commerce Workflows
				</Label>
				<p className="text-sm text-muted-foreground">Order processing, downloads, and error handling with user feedback</p>
			</div>

			<div className="space-y-4">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<Card>
						<CardContent className="p-6 text-center">
							<ShoppingCartIcon className="w-12 h-12 mx-auto mb-4 text-blue-600" />
							<h3 className="font-semibold mb-2">Order Flow</h3>
							<p className="text-sm text-muted-foreground mb-4">Simulate complete order process</p>
							<Button onClick={simulateOrderFlow} className="w-full">
								Place Order
							</Button>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="p-6 text-center">
							<DownloadIcon className="w-12 h-12 mx-auto mb-4 text-green-600" />
							<h3 className="font-semibold mb-2">File Download</h3>
							<p className="text-sm text-muted-foreground mb-4">Download progress feedback</p>
							<Button onClick={simulateDownload} variant="outline" className="w-full">
								Download File
							</Button>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="p-6 text-center">
							<XIcon className="w-12 h-12 mx-auto mb-4 text-red-600" />
							<h3 className="font-semibold mb-2">Error Handling</h3>
							<p className="text-sm text-muted-foreground mb-4">Error recovery options</p>
							<Button onClick={simulateError} variant="destructive" className="w-full">
								Simulate Error
							</Button>
						</CardContent>
					</Card>
				</div>

				<div className="flex items-center gap-4">
					<Badge variant="outline">Order Status: {orderStatus}</Badge>
				</div>
			</div>
		</div>
	)
}

// Custom Toast Builder
const CustomToastBuilder = () => {
	const [toastType, setToastType] = useState('default')
	const [title, setTitle] = useState('Custom Toast')
	const [description, setDescription] = useState('This is a custom toast message.')
	const [includeAction, setIncludeAction] = useState(false)
	const [actionLabel, setActionLabel] = useState('Action')

	const buildToast = () => {
		const toastOptions: any = {
			description: description || undefined,
		}

		if (includeAction && actionLabel) {
			toastOptions.action = {
				label: actionLabel,
				onClick: () => toast.success('Action executed!')
			}
		}

		switch (toastType) {
			case 'success':
				toast.success(title, toastOptions)
				break
			case 'error':
				toast.error(title, toastOptions)
				break
			case 'warning':
				toast.warning(title, toastOptions)
				break
			case 'info':
				toast.info(title, toastOptions)
				break
			case 'loading':
				toast.loading(title, { description })
				setTimeout(() => toast.success('Loading complete!'), 2000)
				break
			case 'custom':
				toast(title, { ...toastOptions, icon: '🎉' })
				break
			default:
				toast(title, toastOptions)
		}
	}

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold flex items-center gap-2">
					<EditIcon className="w-5 h-5" />
					Toast Builder
				</Label>
				<p className="text-sm text-muted-foreground">Create custom toasts with different types and configurations</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<Card>
					<CardHeader>
						<CardTitle>Toast Configuration</CardTitle>
						<CardDescription>Customize your toast message</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div>
							<Label className="text-sm font-medium mb-2 block">Type</Label>
							<Select value={toastType} onValueChange={setToastType}>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="default">Default</SelectItem>
									<SelectItem value="success">Success</SelectItem>
									<SelectItem value="error">Error</SelectItem>
									<SelectItem value="warning">Warning</SelectItem>
									<SelectItem value="info">Info</SelectItem>
									<SelectItem value="loading">Loading</SelectItem>
									<SelectItem value="custom">Custom</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div>
							<Label className="text-sm font-medium mb-2 block">Title</Label>
							<Input
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								placeholder="Toast title..."
							/>
						</div>

						<div>
							<Label className="text-sm font-medium mb-2 block">Description</Label>
							<Textarea
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								placeholder="Toast description..."
								rows={3}
							/>
						</div>

						<div className="flex items-center space-x-2">
							<Switch
								id="include-action"
								checked={includeAction}
								onCheckedChange={setIncludeAction}
							/>
							<Label htmlFor="include-action" className="text-sm">Include Action Button</Label>
						</div>

						{includeAction && (
							<div>
								<Label className="text-sm font-medium mb-2 block">Action Label</Label>
								<Input
									value={actionLabel}
									onChange={(e) => setActionLabel(e.target.value)}
									placeholder="Action button text..."
								/>
							</div>
						)}

						<Button onClick={buildToast} className="w-full">
							Show Toast
						</Button>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Quick Examples</CardTitle>
						<CardDescription>Try these preset toast examples</CardDescription>
					</CardHeader>
					<CardContent className="space-y-3">
						<Button
							variant="outline"
							className="w-full justify-start"
							onClick={() => toast.success('Settings saved successfully!')}
						>
							<CheckIcon className="w-4 h-4 mr-2" />
							Success Toast
						</Button>

						<Button
							variant="outline"
							className="w-full justify-start"
							onClick={() => toast.error('Failed to save changes', {
								description: 'Please check your internet connection and try again.',
								action: { label: 'Retry', onClick: () => console.log('Retry') }
							})}
						>
							<XIcon className="w-4 h-4 mr-2" />
							Error with Action
						</Button>

						<Button
							variant="outline"
							className="w-full justify-start"
							onClick={() => toast.warning('Your session will expire soon', {
								description: 'Please save your work to avoid losing changes.',
								action: { label: 'Extend Session', onClick: () => toast.success('Session extended') }
							})}
						>
							<AlertTriangleIcon className="w-4 h-4 mr-2" />
							Warning Toast
						</Button>

						<Button
							variant="outline"
							className="w-full justify-start"
							onClick={() => {
								toast.loading('Uploading file...', { description: 'Please wait while we upload your file.' })
								setTimeout(() => toast.success('File uploaded successfully!'), 3000)
							}}
						>
							<UploadIcon className="w-4 h-4 mr-2" />
							Loading Toast
						</Button>

						<Button
							variant="outline"
							className="w-full justify-start"
							onClick={() => toast('New message received', {
								description: 'You have a new message from John Doe.',
								icon: '💬',
								action: { label: 'Read', onClick: () => console.log('Read message') }
							})}
						>
							<MessageSquareIcon className="w-4 h-4 mr-2" />
							Custom Icon
						</Button>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}

export default function SonnerSample() {
	const [showAdvanced, setShowAdvanced] = useState(false)

	return (
		<Fragment>
			<ComponentDoc
				title="Sonner (Toast)"
				description="Beautiful and customizable toast notifications for user feedback. Perfect for confirmations, errors, loading states, and any real-time user communication."
				component={
					<div className="flex flex-col gap-8 w-full max-w-6xl">
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
							<h3 className="text-lg font-semibold mb-4">Toast Applications</h3>
							<div className="grid grid-cols-1 gap-8">
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<BellIcon className="w-5 h-5" />
											Notification Center
										</CardTitle>
										<CardDescription>System-wide notifications with different types and actions</CardDescription>
									</CardHeader>
									<CardContent>
										<NotificationCenterDemo />
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<UserIcon className="w-5 h-5" />
											User Actions
										</CardTitle>
										<CardDescription>Common user interactions with contextual feedback</CardDescription>
									</CardHeader>
									<CardContent>
										<UserActionsDemo />
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<ShoppingCartIcon className="w-5 h-5" />
											E-commerce Workflows
										</CardTitle>
										<CardDescription>Order processing and transaction feedback</CardDescription>
									</CardHeader>
									<CardContent>
										<EcommerceFeedbackDemo />
									</CardContent>
								</Card>
							</div>
						</div>

						{/* Advanced Examples */}
						{showAdvanced && (
							<div>
								<h3 className="text-lg font-semibold mb-4">Advanced Examples</h3>
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<EditIcon className="w-5 h-5" />
											Custom Toast Builder
										</CardTitle>
										<CardDescription>Build and test custom toast configurations</CardDescription>
									</CardHeader>
									<CardContent>
										<CustomToastBuilder />
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
								<CardDescription>Best practices for implementing toast notifications</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div>
										<h4 className="font-semibold mb-2">When to Use</h4>
										<ul className="space-y-1 text-sm text-muted-foreground">
											<li>• For success confirmations after user actions</li>
											<li>• To display error messages and recovery options</li>
											<li>• For loading states and progress updates</li>
											<li>• To show system notifications and alerts</li>
											<li>• When providing contextual feedback without interrupting workflow</li>
										</ul>
									</div>
									<Separator />
									<div>
										<h4 className="font-semibold mb-2">Design Principles</h4>
										<ul className="space-y-1 text-sm text-muted-foreground">
											<li>• Use appropriate toast types (success, error, warning, info)</li>
											<li>• Provide clear, concise messaging</li>
											<li>• Include action buttons for recoverable errors</li>
											<li>• Position toasts to avoid blocking important content</li>
											<li>• Use consistent timing for auto-dismiss</li>
											<li>• Ensure toasts are accessible and keyboard navigable</li>
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
										<strong>Use Cases:</strong> Notifications, Actions, E-commerce{showAdvanced ? ', Builder' : ''}
									</p>
									<p>
										<strong>Features:</strong> Multiple Types, Actions, Custom Icons, Loading States
									</p>
								</div>
							</div>
						</div>
					</div>
				}
			/>
			<Toaster />
		</Fragment>
	)
}
