import { Fragment, useState } from 'react'
import {
	EditIcon,
	UserIcon,
	InfoIcon,
	AlertTriangleIcon,
	TrashIcon,
	SaveIcon,
	XIcon,
	CheckIcon,
	SettingsIcon,
	CameraIcon,
	UploadIcon,
	FileIcon,
	ImageIcon,
	VideoIcon,
	MusicIcon,
	DownloadIcon,
	ShareIcon,
	EyeIcon,
	LockIcon,
	UnlockIcon,
	MailIcon,
	PhoneIcon,
	MapPinIcon,
	CalendarIcon,
	ClockIcon,
	TagIcon,
	FolderIcon,
	PlusIcon,
	SearchIcon,
	FilterIcon,
	RefreshCwIcon,
	StarIcon,
	HeartIcon,
	BookmarkIcon
} from 'lucide-react'
import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogClose,
	Label,
	Input,
	Textarea,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Switch,
	Checkbox,
	RadioGroup,
	RadioGroupItem,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Badge,
	Separator,
	Progress,
	Avatar,
	AvatarFallback,
	AvatarImage,
	Alert,
	AlertDescription
} from '@rs-kit/ui-kit'
import { ComponentDoc } from '@/components/ComponentDoc'

// Sample data for different dialog scenarios
const userProfiles = [
	{ id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Admin', avatar: '/avatars/john.jpg' },
	{ id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Editor', avatar: '/avatars/jane.jpg' },
	{ id: 3, name: 'Mike Johnson', email: 'mike.johnson@example.com', role: 'Viewer', avatar: '/avatars/mike.jpg' }
]

const fileTypes = [
	{ type: 'image', icon: ImageIcon, color: 'text-green-600' },
	{ type: 'video', icon: VideoIcon, color: 'text-blue-600' },
	{ type: 'audio', icon: MusicIcon, color: 'text-purple-600' },
	{ type: 'document', icon: FileIcon, color: 'text-red-600' }
]

// Basic Form Dialog
const FormDialog = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		role: 'viewer',
		notifications: true
	})
	const [isSubmitting, setIsSubmitting] = useState(false)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsSubmitting(true)
		// Simulate API call
		await new Promise(resolve => setTimeout(resolve, 1000))
		setIsSubmitting(false)
		// Close dialog would happen here
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>
					<UserIcon className="w-4 h-4 mr-2" />
					Create User
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Create New User</DialogTitle>
					<DialogDescription>
						Add a new user to your team. They will receive an invitation email.
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit}>
					<div className="grid gap-4 py-4">
						<div className="grid gap-2">
							<Label htmlFor="name">Full Name</Label>
							<Input
								id="name"
								value={formData.name}
								onChange={(e) => setFormData({ ...formData, name: e.target.value })}
								placeholder="Enter full name"
								required
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="email">Email Address</Label>
							<Input
								id="email"
								type="email"
								value={formData.email}
								onChange={(e) => setFormData({ ...formData, email: e.target.value })}
								placeholder="Enter email address"
								required
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="role">Role</Label>
							<Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="admin">Admin</SelectItem>
									<SelectItem value="editor">Editor</SelectItem>
									<SelectItem value="viewer">Viewer</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="flex items-center space-x-2">
							<Switch
								id="notifications"
								checked={formData.notifications}
								onCheckedChange={(checked) => setFormData({ ...formData, notifications: checked })}
							/>
							<Label htmlFor="notifications">Send email notifications</Label>
						</div>
					</div>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant="outline" disabled={isSubmitting}>Cancel</Button>
						</DialogClose>
						<Button type="submit" disabled={isSubmitting}>
							{isSubmitting ? (
								<>
									<RefreshCwIcon className="w-4 h-4 mr-2 animate-spin" />
									Creating...
								</>
							) : (
								<>
									<CheckIcon className="w-4 h-4 mr-2" />
									Create User
								</>
							)}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}

// Confirmation Dialog
const ConfirmationDialog = () => {
	const [selectedItems, setSelectedItems] = useState<number[]>([1, 3])
	const [isDeleting, setIsDeleting] = useState(false)

	const handleDelete = async () => {
		setIsDeleting(true)
		// Simulate API call
		await new Promise(resolve => setTimeout(resolve, 1500))
		setIsDeleting(false)
		setSelectedItems([])
		// Close dialog would happen here
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="destructive">
					<TrashIcon className="w-4 h-4 mr-2" />
					Delete Selected
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<AlertTriangleIcon className="w-5 h-5 text-red-600" />
						Confirm Deletion
					</DialogTitle>
					<DialogDescription>
						This action cannot be undone. The following items will be permanently deleted:
					</DialogDescription>
				</DialogHeader>
				<div className="py-4">
					<div className="space-y-2 mb-4">
						{selectedItems.map((itemId) => {
							const user = userProfiles.find(u => u.id === itemId)
							if (!user) return null
							return (
								<div key={itemId} className="flex items-center gap-3 p-2 border rounded">
									<Avatar className="h-8 w-8">
										<AvatarImage src={user.avatar} alt={user.name} />
										<AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
									</Avatar>
									<div>
										<p className="text-sm font-medium">{user.name}</p>
										<p className="text-xs text-muted-foreground">{user.email}</p>
									</div>
									<Badge variant="secondary" className="ml-auto text-xs">{user.role}</Badge>
								</div>
							)
						})}
					</div>
					<Alert>
						<AlertTriangleIcon className="h-4 w-4" />
						<AlertDescription>
							This will permanently remove {selectedItems.length} user{selectedItems.length !== 1 ? 's' : ''} from your organization.
						</AlertDescription>
					</Alert>
				</div>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline" disabled={isDeleting}>Cancel</Button>
					</DialogClose>
					<Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
						{isDeleting ? (
							<>
								<RefreshCwIcon className="w-4 h-4 mr-2 animate-spin" />
								Deleting...
							</>
						) : (
							<>
								<TrashIcon className="w-4 h-4 mr-2" />
								Delete {selectedItems.length} User{selectedItems.length !== 1 ? 's' : ''}
							</>
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

// File Upload Dialog
const FileUploadDialog = () => {
	const [uploadProgress, setUploadProgress] = useState(0)
	const [selectedFiles, setSelectedFiles] = useState<File[]>([])
	const [isUploading, setIsUploading] = useState(false)
	const [uploadComplete, setUploadComplete] = useState(false)

	const simulateUpload = async () => {
		setIsUploading(true)
		setUploadProgress(0)
		
		// Simulate upload progress
		for (let i = 0; i <= 100; i += 10) {
			setUploadProgress(i)
			await new Promise(resolve => setTimeout(resolve, 200))
		}
		
		setIsUploading(false)
		setUploadComplete(true)
		
		// Reset after 2 seconds
		setTimeout(() => {
			setUploadComplete(false)
			setUploadProgress(0)
			setSelectedFiles([])
		}, 2000)
	}

	const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(event.target.files || [])
		setSelectedFiles(files)
		setUploadComplete(false)
	}

	const getFileIcon = (file: File) => {
		if (file.type.startsWith('image/')) return <ImageIcon className="w-4 h-4 text-green-600" />
		if (file.type.startsWith('video/')) return <VideoIcon className="w-4 h-4 text-blue-600" />
		if (file.type.startsWith('audio/')) return <MusicIcon className="w-4 h-4 text-purple-600" />
		return <FileIcon className="w-4 h-4 text-red-600" />
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">
					<UploadIcon className="w-4 h-4 mr-2" />
					Upload Files
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[500px]">
				<DialogHeader>
					<DialogTitle>Upload Files</DialogTitle>
					<DialogDescription>
						Select files to upload to your project. Supported formats: images, videos, audio, and documents.
					</DialogDescription>
				</DialogHeader>
				<div className="py-4">
					<div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
						<UploadIcon className="w-8 h-8 mx-auto mb-4 text-gray-400" />
						<div className="space-y-2">
							<Label htmlFor="file-upload" className="cursor-pointer">
								<span className="text-sm font-medium text-blue-600 hover:text-blue-500">
									Click to upload files
								</span>
								<span className="text-sm text-muted-foreground"> or drag and drop</span>
							</Label>
							<Input
								id="file-upload"
								type="file"
								multiple
								onChange={handleFileSelect}
								className="hidden"
							/>
							<p className="text-xs text-muted-foreground">
								PNG, JPG, PDF, MP4 up to 10MB each
							</p>
						</div>
					</div>

					{selectedFiles.length > 0 && (
						<div className="mt-4 space-y-2">
							<h4 className="text-sm font-medium">Selected Files:</h4>
							{selectedFiles.map((file, index) => (
								<div key={index} className="flex items-center gap-3 p-2 border rounded">
									{getFileIcon(file)}
									<div className="flex-1">
										<p className="text-sm font-medium">{file.name}</p>
										<p className="text-xs text-muted-foreground">
											{(file.size / 1024 / 1024).toFixed(2)} MB
										</p>
									</div>
									<Button
										variant="ghost"
										size="sm"
										onClick={() => setSelectedFiles(files => files.filter((_, i) => i !== index))}
									>
										<XIcon className="w-4 h-4" />
									</Button>
								</div>
							))}
						</div>
					)}

					{isUploading && (
						<div className="mt-4 space-y-2">
							<div className="flex items-center justify-between text-sm">
								<span>Uploading files...</span>
								<span>{uploadProgress}%</span>
							</div>
							<Progress value={uploadProgress} className="w-full" />
						</div>
					)}

					{uploadComplete && (
						<div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
							<div className="flex items-center gap-2 text-green-800">
								<CheckIcon className="w-4 h-4" />
								<span className="text-sm font-medium">Upload completed successfully!</span>
							</div>
						</div>
					)}
				</div>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">Cancel</Button>
					</DialogClose>
					<Button 
						onClick={simulateUpload} 
						disabled={selectedFiles.length === 0 || isUploading || uploadComplete}
					>
						{isUploading ? (
							<>
								<RefreshCwIcon className="w-4 h-4 mr-2 animate-spin" />
								Uploading...
							</>
						) : uploadComplete ? (
							<>
								<CheckIcon className="w-4 h-4 mr-2" />
								Completed
							</>
						) : (
							<>
								<UploadIcon className="w-4 h-4 mr-2" />
								Upload {selectedFiles.length} File{selectedFiles.length !== 1 ? 's' : ''}
							</>
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

// Settings Dialog
const SettingsDialog = () => {
	const [settings, setSettings] = useState({
		theme: 'system',
		notifications: {
			email: true,
			push: false,
			sms: false
		},
		privacy: {
			profileVisible: true,
			showActivity: false,
			allowMessages: true
		},
		language: 'en',
		timezone: 'UTC'
	})

	const handleSave = () => {
		// Save settings logic here
		console.log('Saving settings:', settings)
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">
					<SettingsIcon className="w-4 h-4 mr-2" />
					Settings
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>Settings</DialogTitle>
					<DialogDescription>
						Manage your account preferences and application settings.
					</DialogDescription>
				</DialogHeader>
				<div className="py-6 space-y-6">
					{/* Appearance */}
					<div className="space-y-3">
						<h3 className="text-lg font-medium">Appearance</h3>
						<div className="grid gap-3">
							<div className="flex items-center justify-between">
								<div>
									<Label className="text-sm font-medium">Theme</Label>
									<p className="text-xs text-muted-foreground">Choose your preferred theme</p>
								</div>
								<Select value={settings.theme} onValueChange={(value) => setSettings({ ...settings, theme: value })}>
									<SelectTrigger className="w-32">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="light">Light</SelectItem>
										<SelectItem value="dark">Dark</SelectItem>
										<SelectItem value="system">System</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div className="flex items-center justify-between">
								<div>
									<Label className="text-sm font-medium">Language</Label>
									<p className="text-xs text-muted-foreground">Select your language</p>
								</div>
								<Select value={settings.language} onValueChange={(value) => setSettings({ ...settings, language: value })}>
									<SelectTrigger className="w-32">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="en">English</SelectItem>
										<SelectItem value="es">Español</SelectItem>
										<SelectItem value="fr">Français</SelectItem>
										<SelectItem value="de">Deutsch</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>
					</div>

					<Separator />

					{/* Notifications */}
					<div className="space-y-3">
						<h3 className="text-lg font-medium">Notifications</h3>
						<div className="space-y-3">
							{Object.entries(settings.notifications).map(([key, value]) => (
								<div key={key} className="flex items-center justify-between">
									<div>
										<Label className="text-sm font-medium capitalize">{key} Notifications</Label>
										<p className="text-xs text-muted-foreground">
											Receive notifications via {key}
										</p>
									</div>
									<Switch
										checked={value}
										onCheckedChange={(checked) => 
											setSettings({
												...settings,
												notifications: { ...settings.notifications, [key]: checked }
											})
										}
									/>
								</div>
							))}
						</div>
					</div>

					<Separator />

					{/* Privacy */}
					<div className="space-y-3">
						<h3 className="text-lg font-medium">Privacy</h3>
						<div className="space-y-3">
							<div className="flex items-center justify-between">
								<div>
									<Label className="text-sm font-medium">Profile Visibility</Label>
									<p className="text-xs text-muted-foreground">Make your profile visible to others</p>
								</div>
								<Switch
									checked={settings.privacy.profileVisible}
									onCheckedChange={(checked) => 
										setSettings({
											...settings,
											privacy: { ...settings.privacy, profileVisible: checked }
										})
									}
								/>
							</div>
							<div className="flex items-center justify-between">
								<div>
									<Label className="text-sm font-medium">Show Activity</Label>
									<p className="text-xs text-muted-foreground">Display your activity status</p>
								</div>
								<Switch
									checked={settings.privacy.showActivity}
									onCheckedChange={(checked) => 
										setSettings({
											...settings,
											privacy: { ...settings.privacy, showActivity: checked }
										})
									}
								/>
							</div>
							<div className="flex items-center justify-between">
								<div>
									<Label className="text-sm font-medium">Allow Messages</Label>
									<p className="text-xs text-muted-foreground">Let others send you messages</p>
								</div>
								<Switch
									checked={settings.privacy.allowMessages}
									onCheckedChange={(checked) => 
										setSettings({
											...settings,
											privacy: { ...settings.privacy, allowMessages: checked }
										})
									}
								/>
							</div>
						</div>
					</div>
				</div>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">Cancel</Button>
					</DialogClose>
					<DialogClose asChild>
						<Button onClick={handleSave}>
							<SaveIcon className="w-4 h-4 mr-2" />
							Save Changes
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

// Large Content Dialog
const LargeContentDialog = () => {
	const [selectedTab, setSelectedTab] = useState('overview')
	
	const tabs = [
		{ id: 'overview', label: 'Overview', icon: InfoIcon },
		{ id: 'details', label: 'Details', icon: FileIcon },
		{ id: 'activity', label: 'Activity', icon: ClockIcon },
		{ id: 'settings', label: 'Settings', icon: SettingsIcon }
	]

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">
					<InfoIcon className="w-4 h-4 mr-2" />
					View Details
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[700px] max-h-[80vh]">
				<DialogHeader>
					<DialogTitle>Project Details</DialogTitle>
					<DialogDescription>
						Comprehensive information about your project and its settings.
					</DialogDescription>
				</DialogHeader>
				<div className="flex flex-col h-[500px]">
					{/* Tab Navigation */}
					<div className="flex border-b">
						{tabs.map((tab) => {
							const IconComponent = tab.icon
							return (
								<button
									key={tab.id}
									onClick={() => setSelectedTab(tab.id)}
									className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
										selectedTab === tab.id
											? 'border-blue-600 text-blue-600'
											: 'border-transparent text-muted-foreground hover:text-foreground'
									}`}
								>
									<IconComponent className="w-4 h-4" />
									{tab.label}
								</button>
							)
						})}
					</div>

					{/* Tab Content */}
					<div className="flex-1 overflow-y-auto p-4">
						{selectedTab === 'overview' && (
							<div className="space-y-4">
								<div className="grid grid-cols-2 gap-4">
									<Card>
										<CardHeader className="pb-2">
											<CardTitle className="text-sm">Total Files</CardTitle>
										</CardHeader>
										<CardContent>
											<div className="text-2xl font-bold">1,247</div>
											<p className="text-xs text-muted-foreground">+12% from last month</p>
										</CardContent>
									</Card>
									<Card>
										<CardHeader className="pb-2">
											<CardTitle className="text-sm">Storage Used</CardTitle>
										</CardHeader>
										<CardContent>
											<div className="text-2xl font-bold">15.2 GB</div>
											<p className="text-xs text-muted-foreground">68% of 22.5 GB</p>
										</CardContent>
									</Card>
								</div>
								<div>
									<h4 className="text-sm font-medium mb-2">Recent Activity</h4>
									<div className="space-y-2">
										{Array.from({ length: 5 }).map((_, i) => (
											<div key={i} className="flex items-center gap-3 text-sm">
												<div className="w-2 h-2 bg-blue-600 rounded-full" />
												<span>File uploaded: document-{i + 1}.pdf</span>
												<span className="text-muted-foreground ml-auto">2h ago</span>
											</div>
										))}
									</div>
								</div>
							</div>
						)}

						{selectedTab === 'details' && (
							<div className="space-y-4">
								<div className="grid gap-3">
									<div>
										<Label className="text-sm font-medium">Project Name</Label>
										<p className="text-sm text-muted-foreground">UI Component Library</p>
									</div>
									<div>
										<Label className="text-sm font-medium">Created</Label>
										<p className="text-sm text-muted-foreground">January 15, 2024</p>
									</div>
									<div>
										<Label className="text-sm font-medium">Last Modified</Label>
										<p className="text-sm text-muted-foreground">2 hours ago</p>
									</div>
									<div>
										<Label className="text-sm font-medium">Description</Label>
										<p className="text-sm text-muted-foreground">
											A comprehensive collection of reusable UI components built with React and TypeScript.
											This library provides a consistent design system and accelerates development workflows.
										</p>
									</div>
								</div>
							</div>
						)}

						{selectedTab === 'activity' && (
							<div className="space-y-3">
								{Array.from({ length: 10 }).map((_, i) => (
									<div key={i} className="flex items-start gap-3 p-3 border rounded">
										<div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
											<FileIcon className="w-4 h-4 text-blue-600" />
										</div>
										<div className="flex-1">
											<p className="text-sm font-medium">File activity #{i + 1}</p>
											<p className="text-xs text-muted-foreground">
												Lorem ipsum dolor sit amet, consectetur adipiscing elit.
											</p>
											<p className="text-xs text-muted-foreground mt-1">
												{i === 0 ? 'Just now' : `${i + 1} hour${i > 0 ? 's' : ''} ago`}
											</p>
										</div>
									</div>
								))}
							</div>
						)}

						{selectedTab === 'settings' && (
							<div className="space-y-4">
								<div className="space-y-3">
									<div className="flex items-center justify-between">
										<div>
											<Label className="text-sm font-medium">Public Access</Label>
											<p className="text-xs text-muted-foreground">Allow public viewing of this project</p>
										</div>
										<Switch />
									</div>
									<div className="flex items-center justify-between">
										<div>
											<Label className="text-sm font-medium">Download Enabled</Label>
											<p className="text-xs text-muted-foreground">Allow files to be downloaded</p>
										</div>
										<Switch defaultChecked />
									</div>
									<div className="flex items-center justify-between">
										<div>
											<Label className="text-sm font-medium">Collaboration</Label>
											<p className="text-xs text-muted-foreground">Enable team collaboration features</p>
										</div>
										<Switch defaultChecked />
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">Close</Button>
					</DialogClose>
					<Button>
						<SaveIcon className="w-4 h-4 mr-2" />
						Save Changes
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default function DialogSample() {
	const [showAdvanced, setShowAdvanced] = useState(false)

	return (
		<Fragment>
			<ComponentDoc
				title="Dialog"
				description="Modal dialogs for forms, confirmations, file uploads, settings, and detailed content. Provides accessible overlays that focus user attention and handle complex interactions."
				component={
					<div className="flex flex-col gap-8 w-full max-w-4xl">
						{/* Controls */}
						<div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
							<div className="flex items-center gap-4">
								<div className="flex items-center space-x-2">
									<Switch
										id="show-advanced"
										checked={showAdvanced}
										onCheckedChange={setShowAdvanced}
									/>
									<Label htmlFor="show-advanced" className="text-sm">Show Advanced Examples</Label>
								</div>
							</div>
							<Badge variant="outline">{showAdvanced ? '5' : '3'} Examples</Badge>
						</div>

						{/* Basic Dialog Examples */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Basic Dialogs</h3>
							<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<EditIcon className="w-5 h-5" />
											Form Dialog
										</CardTitle>
										<CardDescription>Interactive forms with validation and submission</CardDescription>
									</CardHeader>
									<CardContent>
										<FormDialog />
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<AlertTriangleIcon className="w-5 h-5" />
											Confirmation
										</CardTitle>
										<CardDescription>Confirmation dialogs for destructive actions</CardDescription>
									</CardHeader>
									<CardContent>
										<ConfirmationDialog />
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<UploadIcon className="w-5 h-5" />
											File Upload
										</CardTitle>
										<CardDescription>File upload with progress tracking</CardDescription>
									</CardHeader>
									<CardContent>
										<FileUploadDialog />
									</CardContent>
								</Card>
							</div>
						</div>

						{/* Advanced Examples */}
						{showAdvanced && (
							<>
								{/* Settings Dialog */}
								<div>
									<h3 className="text-lg font-semibold mb-4">Advanced Dialogs</h3>
									<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
										<Card>
											<CardHeader>
												<CardTitle className="flex items-center gap-2">
													<SettingsIcon className="w-5 h-5" />
													Settings Panel
												</CardTitle>
												<CardDescription>Complex settings with multiple sections and controls</CardDescription>
											</CardHeader>
											<CardContent>
												<SettingsDialog />
											</CardContent>
										</Card>

										<Card>
											<CardHeader>
												<CardTitle className="flex items-center gap-2">
													<InfoIcon className="w-5 h-5" />
													Large Content
												</CardTitle>
												<CardDescription>Tabbed dialog with extensive content and navigation</CardDescription>
											</CardHeader>
											<CardContent>
												<LargeContentDialog />
											</CardContent>
										</Card>
									</div>
								</div>
							</>
						)}

						{/* Usage Guidelines */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<InfoIcon className="w-5 h-5" />
									Usage Guidelines
								</CardTitle>
								<CardDescription>Best practices for implementing dialogs</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div>
										<h4 className="font-semibold mb-2">When to Use</h4>
										<ul className="space-y-1 text-sm text-muted-foreground">
											<li>• For critical information that requires immediate attention</li>
											<li>• When you need to interrupt the user's workflow</li>
											<li>• For forms that create or edit important data</li>
											<li>• To confirm destructive or irreversible actions</li>
											<li>• For complex settings or configuration panels</li>
										</ul>
									</div>
									<Separator />
									<div>
										<h4 className="font-semibold mb-2">Design Principles</h4>
										<ul className="space-y-1 text-sm text-muted-foreground">
											<li>• Keep content focused and avoid overwhelming users</li>
											<li>• Provide clear primary and secondary actions</li>
											<li>• Use appropriate dialog sizes for content</li>
											<li>• Include progress indicators for long operations</li>
											<li>• Ensure keyboard navigation and accessibility</li>
											<li>• Allow easy dismissal when appropriate</li>
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
									<p><strong>Show Advanced:</strong> {showAdvanced ? 'Yes' : 'No'}</p>
									<p><strong>Total Examples:</strong> {showAdvanced ? '5' : '3'}</p>
								</div>
								<div>
									<p><strong>Dialog Types:</strong> Form, Confirmation, Upload{showAdvanced ? ', Settings, Content' : ''}</p>
									<p><strong>Features:</strong> Validation, Progress, Tabs, Scrolling</p>
								</div>
							</div>
						</div>
					</div>
				}
			/>
		</Fragment>
	)
}