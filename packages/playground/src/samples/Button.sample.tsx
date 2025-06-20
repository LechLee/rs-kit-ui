import { Fragment, useState } from 'react'
import { Button } from '@rs-kit/ui-kit'
import { 
	ArrowRightIcon, 
	Loader2Icon, 
	SendIcon, 
	DownloadIcon, 
	PlusIcon, 
	TrashIcon, 
	EditIcon, 
	SaveIcon, 
	XIcon, 
	CheckIcon,
	HeartIcon,
	ShareIcon,
	StarIcon,
	SettingsIcon
} from 'lucide-react'
import { ComponentDoc } from '@/components/ComponentDoc'

export default function ButtonSample() {
	// State for interactive examples
	const [isLoading, setIsLoading] = useState(false)
	const [isLiked, setIsLiked] = useState(false)
	const [count, setCount] = useState(0)
	const [isFollowing, setIsFollowing] = useState(false)
	const [isEditing, setIsEditing] = useState(false)

	// Interactive handlers
	const handleAsyncAction = async () => {
		setIsLoading(true)
		await new Promise(resolve => setTimeout(resolve, 2000))
		setIsLoading(false)
		alert('Action completed!')
	}

	const toggleLike = () => {
		setIsLiked(!isLiked)
		setCount(prev => isLiked ? prev - 1 : prev + 1)
	}

	const toggleFollow = () => {
		setIsFollowing(!isFollowing)
	}

	const toggleEdit = () => {
		setIsEditing(!isEditing)
	}

	return (
		<Fragment>
			<ComponentDoc
				title="Button"
				description="A versatile button component with multiple variants, sizes, and states. Built on top of Radix UI Slot primitive for maximum flexibility."
				component={
					<div className="flex flex-col gap-8 w-full max-w-4xl">
						{/* Ripple Effect Demo */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Ripple Effect Demo</h3>
							<div className="flex flex-wrap items-center gap-3">
								<Button enableRipple size="lg">Click for Ripple</Button>
								<Button enableRipple variant="outline" size="lg">Outline Ripple</Button>
								<Button enableRipple variant="secondary" size="lg">Secondary Ripple</Button>
								<Button enableRipple={false} size="lg">No Ripple</Button>
							</div>
						</div>

						{/* Button Variants */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Button Variants</h3>
							<div className="flex flex-wrap items-center gap-3">
								<Button>Default</Button>
								<Button variant="outline">Outline</Button>
								<Button variant="ghost">Ghost</Button>
								<Button variant="destructive">Destructive</Button>
								<Button variant="secondary">Secondary</Button>
								<Button variant="link">Link</Button>
							</div>
						</div>

						{/* Button Sizes */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Button Sizes</h3>
							<div className="space-y-4">
								<div>
									<h4 className="text-sm font-medium text-gray-600 mb-2">Small (sm)</h4>
									<div className="flex flex-wrap items-center gap-3">
										<Button size="sm">Small</Button>
										<Button variant="outline" size="sm">Outline</Button>
										<Button variant="ghost" size="sm">Ghost</Button>
										<Button variant="destructive" size="sm">Destructive</Button>
										<Button variant="secondary" size="sm">Secondary</Button>
										<Button variant="link" size="sm">Link</Button>
									</div>
								</div>

								<div>
									<h4 className="text-sm font-medium text-gray-600 mb-2">Default</h4>
									<div className="flex flex-wrap items-center gap-3">
										<Button>Default</Button>
										<Button variant="outline">Outline</Button>
										<Button variant="ghost">Ghost</Button>
										<Button variant="destructive">Destructive</Button>
										<Button variant="secondary">Secondary</Button>
										<Button variant="link">Link</Button>
									</div>
								</div>

								<div>
									<h4 className="text-sm font-medium text-gray-600 mb-2">Large (lg)</h4>
									<div className="flex flex-wrap items-center gap-3">
										<Button size="lg">Large</Button>
										<Button variant="outline" size="lg">Outline</Button>
										<Button variant="ghost" size="lg">Ghost</Button>
										<Button variant="destructive" size="lg">Destructive</Button>
										<Button variant="secondary" size="lg">Secondary</Button>
										<Button variant="link" size="lg">Link</Button>
									</div>
								</div>
							</div>
						</div>

						{/* Buttons with Icons */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Buttons with Icons</h3>
							<div className="space-y-4">
								<div>
									<h4 className="text-sm font-medium text-gray-600 mb-2">Icon + Text</h4>
									<div className="flex flex-wrap items-center gap-3">
										<Button>
											<PlusIcon className="w-4 h-4" />
											Create New
										</Button>
										<Button variant="outline">
											<DownloadIcon className="w-4 h-4" />
											Download
										</Button>
										<Button variant="secondary">
											<SendIcon className="w-4 h-4" />
											Send Message
										</Button>
										<Button variant="destructive">
											<TrashIcon className="w-4 h-4" />
											Delete
										</Button>
									</div>
								</div>

								<div>
									<h4 className="text-sm font-medium text-gray-600 mb-2">Text + Icon</h4>
									<div className="flex flex-wrap items-center gap-3">
										<Button>
											Learn More
											<ArrowRightIcon className="w-4 h-4" />
										</Button>
										<Button variant="outline">
											Share
											<ShareIcon className="w-4 h-4" />
										</Button>
										<Button variant="secondary">
											Settings
											<SettingsIcon className="w-4 h-4" />
										</Button>
									</div>
								</div>

								<div>
									<h4 className="text-sm font-medium text-gray-600 mb-2">Icon Only</h4>
									<div className="flex flex-wrap items-center gap-3">
										<Button size="sm" className="px-2">
											<EditIcon className="w-4 h-4" />
										</Button>
										<Button variant="outline" size="sm" className="px-2">
											<SaveIcon className="w-4 h-4" />
										</Button>
										<Button variant="ghost" size="sm" className="px-2">
											<StarIcon className="w-4 h-4" />
										</Button>
										<Button variant="destructive" size="sm" className="px-2">
											<XIcon className="w-4 h-4" />
										</Button>
									</div>
								</div>
							</div>
						</div>

						{/* Button States */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Button States</h3>
							<div className="space-y-4">
								<div>
									<h4 className="text-sm font-medium text-gray-600 mb-2">Disabled State</h4>
									<div className="flex flex-wrap items-center gap-3">
										<Button disabled>Disabled</Button>
										<Button variant="outline" disabled>Disabled Outline</Button>
										<Button variant="ghost" disabled>Disabled Ghost</Button>
										<Button variant="destructive" disabled>Disabled Destructive</Button>
										<Button variant="secondary" disabled>Disabled Secondary</Button>
									</div>
								</div>

								<div>
									<h4 className="text-sm font-medium text-gray-600 mb-2">Loading State</h4>
									<div className="flex flex-wrap items-center gap-3">
										<Button disabled>
											<Loader2Icon className="w-4 h-4 animate-spin" />
											Loading...
										</Button>
										<Button variant="outline" disabled>
											<Loader2Icon className="w-4 h-4 animate-spin" />
											Processing
										</Button>
										<Button variant="secondary" disabled>
											<Loader2Icon className="w-4 h-4 animate-spin" />
											Please wait
										</Button>
									</div>
								</div>
							</div>
						</div>

						{/* Interactive Examples */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Interactive Examples</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
								<div className="p-4 border rounded-lg">
									<h4 className="text-sm font-medium mb-3">Async Action</h4>
									<Button 
										onClick={handleAsyncAction} 
										disabled={isLoading}
										className="w-full"
									>
										{isLoading ? (
											<>
												<Loader2Icon className="w-4 h-4 animate-spin" />
												Processing...
											</>
										) : (
											'Start Process'
										)}
									</Button>
								</div>

								<div className="p-4 border rounded-lg">
									<h4 className="text-sm font-medium mb-3">Toggle Like ({count})</h4>
									<Button 
										variant={isLiked ? "default" : "outline"}
										onClick={toggleLike}
										className="w-full"
									>
										<HeartIcon className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
										{isLiked ? 'Liked' : 'Like'}
									</Button>
								</div>

								<div className="p-4 border rounded-lg">
									<h4 className="text-sm font-medium mb-3">Follow Button</h4>
									<Button 
										variant={isFollowing ? "secondary" : "default"}
										onClick={toggleFollow}
										className="w-full"
									>
										{isFollowing ? (
											<>
												<CheckIcon className="w-4 h-4" />
												Following
											</>
										) : (
											<>
												<PlusIcon className="w-4 h-4" />
												Follow
											</>
										)}
									</Button>
								</div>

								<div className="p-4 border rounded-lg">
									<h4 className="text-sm font-medium mb-3">Edit Mode Toggle</h4>
									<Button 
										variant={isEditing ? "default" : "outline"}
										onClick={toggleEdit}
										className="w-full"
									>
										{isEditing ? (
											<>
												<SaveIcon className="w-4 h-4" />
												Save Changes
											</>
										) : (
											<>
												<EditIcon className="w-4 h-4" />
												Edit Mode
											</>
										)}
									</Button>
								</div>
							</div>
						</div>

						{/* Form Actions */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Form Actions</h3>
							<div className="space-y-4">
								<div>
									<h4 className="text-sm font-medium text-gray-600 mb-2">Primary Actions</h4>
									<div className="flex flex-wrap items-center gap-3">
										<Button type="submit">
											<SaveIcon className="w-4 h-4" />
											Save Changes
										</Button>
										<Button>
											<SendIcon className="w-4 h-4" />
											Submit Form
										</Button>
										<Button>
											<PlusIcon className="w-4 h-4" />
											Create Account
										</Button>
									</div>
								</div>

								<div>
									<h4 className="text-sm font-medium text-gray-600 mb-2">Secondary Actions</h4>
									<div className="flex flex-wrap items-center gap-3">
										<Button variant="outline" type="button">
											Cancel
										</Button>
										<Button variant="ghost" type="reset">
											Reset Form
										</Button>
										<Button variant="link">
											Back to Previous
										</Button>
									</div>
								</div>

								<div>
									<h4 className="text-sm font-medium text-gray-600 mb-2">Destructive Actions</h4>
									<div className="flex flex-wrap items-center gap-3">
										<Button variant="destructive">
											<TrashIcon className="w-4 h-4" />
											Delete Account
										</Button>
										<Button variant="destructive" size="sm">
											<XIcon className="w-4 h-4" />
											Remove Item
										</Button>
									</div>
								</div>
							</div>
						</div>

						{/* Button Groups */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Button Groups & Combinations</h3>
							<div className="space-y-4">
								<div>
									<h4 className="text-sm font-medium text-gray-600 mb-2">Action Groups</h4>
									<div className="flex items-center gap-2">
										<Button size="sm">
											<SaveIcon className="w-4 h-4" />
											Save
										</Button>
										<Button variant="outline" size="sm">
											<EditIcon className="w-4 h-4" />
											Edit
										</Button>
										<Button variant="ghost" size="sm">
											<ShareIcon className="w-4 h-4" />
											Share
										</Button>
										<Button variant="destructive" size="sm">
											<TrashIcon className="w-4 h-4" />
											Delete
										</Button>
									</div>
								</div>

								<div>
									<h4 className="text-sm font-medium text-gray-600 mb-2">Modal Actions</h4>
									<div className="flex items-center justify-end gap-3 p-4 bg-gray-50 rounded-lg">
										<Button variant="ghost">Cancel</Button>
										<Button>Confirm</Button>
									</div>
								</div>

								<div>
									<h4 className="text-sm font-medium text-gray-600 mb-2">Form Actions</h4>
									<div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
										<Button variant="link">
											<ArrowRightIcon className="w-4 h-4 rotate-180" />
											Previous Step
										</Button>
										<div className="flex gap-2">
											<Button variant="outline">Save Draft</Button>
											<Button>
												Next Step
												<ArrowRightIcon className="w-4 h-4" />
											</Button>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Current State Display */}
						<div className="mt-6 p-4 bg-gray-50 rounded-lg">
							<h4 className="text-sm font-semibold text-gray-700 mb-2">Interactive State:</h4>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
								<div>Loading State: {isLoading ? '⏳ Active' : '✅ Ready'}</div>
								<div>Like Count: {count}</div>
								<div>Is Liked: {isLiked ? '❤️ Yes' : '🤍 No'}</div>
								<div>Following: {isFollowing ? '✅ Yes' : '❌ No'}</div>
								<div>Edit Mode: {isEditing ? '✏️ Active' : '👁️ View'}</div>
							</div>
						</div>
					</div>
				}
			/>

			<ComponentDoc
				title="Button Props & Usage"
				description="Comprehensive guide to Button component props, variants, sizes, and best practices."
				component={
					<div className="flex flex-col gap-6 w-full max-w-4xl">
						{/* Props Reference */}
						<div className="p-4 bg-blue-50 rounded-lg">
							<h4 className="text-sm font-semibold text-blue-700 mb-2">Props Reference:</h4>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-600">
								<div>
									<strong>Variants:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li><code>default</code> - Primary action button (default)</li>
										<li><code>outline</code> - Secondary action with border</li>
										<li><code>ghost</code> - Minimal button without background</li>
										<li><code>destructive</code> - Dangerous or delete actions</li>
										<li><code>secondary</code> - Alternative secondary style</li>
										<li><code>link</code> - Text-only link appearance</li>
									</ul>
								</div>
								<div>
									<strong>Sizes:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li><code>sm</code> - Small button (32px height)</li>
										<li><code>default</code> - Standard button (40px height)</li>
										<li><code>lg</code> - Large button (44px height)</li>
									</ul>
								</div>
								<div>
									<strong>HTML Props:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li><code>type</code> - submit, button, reset</li>
										<li><code>disabled</code> - Disable button interaction</li>
										<li><code>onClick</code> - Click event handler</li>
										<li><code>className</code> - Additional CSS classes</li>
									</ul>
								</div>
								<div>
									<strong>Accessibility:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li><code>aria-label</code> - Screen reader label</li>
										<li><code>aria-describedby</code> - Additional description</li>
										<li>Automatic focus management</li>
										<li>Keyboard navigation support</li>
									</ul>
								</div>
							</div>
						</div>

						{/* Usage Guidelines */}
						<div className="p-4 bg-green-50 rounded-lg">
							<h4 className="text-sm font-semibold text-green-700 mb-2">Usage Guidelines:</h4>
							<ul className="text-sm text-green-600 space-y-1 list-disc list-inside">
								<li><strong>Primary Actions:</strong> Use <code>default</code> variant for main actions like "Save", "Submit", "Create"</li>
								<li><strong>Secondary Actions:</strong> Use <code>outline</code> or <code>ghost</code> for secondary actions like "Cancel", "Edit"</li>
								<li><strong>Destructive Actions:</strong> Always use <code>destructive</code> variant for delete, remove, or dangerous actions</li>
								<li><strong>Loading States:</strong> Disable button and show spinner during async operations</li>
								<li><strong>Icon Usage:</strong> Place icons before text for actions, after text for navigation</li>
								<li><strong>Button Groups:</strong> Use consistent sizes and logical variant hierarchy</li>
								<li><strong>Form Context:</strong> Use appropriate <code>type</code> attributes (submit, reset, button)</li>
								<li><strong>Accessibility:</strong> Provide clear labels and use proper ARIA attributes for screen readers</li>
							</ul>
						</div>

						{/* Code Examples */}
						<div className="p-4 bg-gray-100 rounded-lg">
							<h4 className="text-sm font-semibold text-gray-700 mb-2">Code Examples:</h4>
							<pre className="text-xs text-gray-600 overflow-x-auto whitespace-pre-wrap">
{`// Basic usage
<Button>Click me</Button>
<Button variant="outline">Secondary action</Button>
<Button variant="destructive">Delete item</Button>

// With icons
<Button>
  <PlusIcon className="w-4 h-4" />
  Create New
</Button>

// Loading state
<Button disabled={isLoading}>
  {isLoading ? (
    <>
      <Loader2Icon className="w-4 h-4 animate-spin" />
      Loading...
    </>
  ) : (
    'Submit'
  )}
</Button>

// Form usage
<form onSubmit={handleSubmit}>
  <Button type="submit">Submit Form</Button>
  <Button type="button" variant="outline" onClick={handleCancel}>
    Cancel
  </Button>
</form>

// Button group
<div className="flex gap-2">
  <Button size="sm">Save</Button>
  <Button variant="outline" size="sm">Edit</Button>
  <Button variant="ghost" size="sm">Share</Button>
</div>`}
							</pre>
						</div>

						{/* Design Guidelines */}
						<div className="p-4 bg-purple-50 rounded-lg">
							<h4 className="text-sm font-semibold text-purple-700 mb-2">Design Guidelines:</h4>
							<ul className="text-sm text-purple-600 space-y-1 list-disc list-inside">
								<li><strong>Visual Hierarchy:</strong> Use button variants to establish clear action priority</li>
								<li><strong>Consistent Sizing:</strong> Maintain consistent button sizes within button groups</li>
								<li><strong>Spacing:</strong> Use adequate spacing between buttons (8px minimum)</li>
								<li><strong>Color Usage:</strong> Reserve destructive variant only for irreversible actions</li>
								<li><strong>Text Length:</strong> Keep button text concise and action-oriented</li>
								<li><strong>Responsive Design:</strong> Consider button sizes on mobile devices</li>
								<li><strong>Loading Feedback:</strong> Always provide visual feedback for async actions</li>
							</ul>
						</div>
					</div>
				}
			/>
		</Fragment>
	)
}