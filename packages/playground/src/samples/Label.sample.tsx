import { Fragment, useState } from 'react'
import {
	Checkbox,
	Label,
	Input,
	Textarea,
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Badge,
	Separator,
	Switch,
	RadioGroup,
	RadioGroupItem,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Slider,
	Alert,
	AlertDescription
} from '@rs-kit/ui-kit'
import {
	UserIcon,
	MailIcon,
	LockIcon,
	EyeIcon,
	EyeOffIcon,
	InfoIcon,
	AlertTriangleIcon,
	CheckIcon,
	StarIcon,
	SettingsIcon,
	VolumeIcon,
	SunDim,
	WifiIcon,
	BatteryIcon,
	CalendarIcon,
	ClockIcon,
	MapPinIcon,
	PhoneIcon,
	GlobeIcon,
	ImageIcon,
	FileIcon,
	TagIcon
} from 'lucide-react'
import { ComponentDoc } from '@/components/ComponentDoc'

// User Profile Form
const UserProfileForm = () => {
	const [formData, setFormData] = useState({
		firstName: 'John',
		lastName: 'Doe',
		email: 'john.doe@example.com',
		bio: '',
		notifications: true,
		visibility: 'public'
	})

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold">Profile Information</Label>
				<p className="text-sm text-muted-foreground">Update your personal details and preferences</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="space-y-2">
					<Label htmlFor="firstName" className="flex items-center gap-2">
						<UserIcon className="w-4 h-4" />
						First Name
						<span className="text-red-500">*</span>
					</Label>
					<Input id="firstName" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} placeholder="Enter your first name" required />
					<p className="text-xs text-muted-foreground">This will be displayed on your profile</p>
				</div>

				<div className="space-y-2">
					<Label htmlFor="lastName" className="flex items-center gap-2">
						<UserIcon className="w-4 h-4" />
						Last Name
						<span className="text-red-500">*</span>
					</Label>
					<Input id="lastName" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} placeholder="Enter your last name" required />
				</div>
			</div>

			<div className="space-y-2">
				<Label htmlFor="email" className="flex items-center gap-2">
					<MailIcon className="w-4 h-4" />
					Email Address
					<Badge variant="secondary" className="text-xs">
						Verified
					</Badge>
				</Label>
				<Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="Enter your email" />
				<p className="text-xs text-green-600 flex items-center gap-1">
					<CheckIcon className="w-3 h-3" />
					Email address verified
				</p>
			</div>

			<div className="space-y-2">
				<Label htmlFor="bio">Biography</Label>
				<Textarea id="bio" value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} placeholder="Tell us about yourself..." rows={4} maxLength={500} />
				<p className="text-xs text-muted-foreground text-right">{formData.bio.length}/500 characters</p>
			</div>

			<div className="space-y-4">
				<Label className="text-base font-semibold">Privacy Settings</Label>

				<div className="space-y-3">
					<div className="flex items-center justify-between p-3 border rounded-lg">
						<div>
							<Label htmlFor="notifications" className="font-medium">
								Email Notifications
							</Label>
							<p className="text-sm text-muted-foreground">Receive updates about your account</p>
						</div>
						<Switch id="notifications" checked={formData.notifications} onCheckedChange={(checked) => setFormData({ ...formData, notifications: checked })} />
					</div>

					<div className="space-y-3">
						<Label className="font-medium">Profile Visibility</Label>
						<RadioGroup value={formData.visibility} onValueChange={(value) => setFormData({ ...formData, visibility: value })}>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="public" id="visibility-public" />
								<Label htmlFor="visibility-public">Public - Anyone can see your profile</Label>
							</div>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="private" id="visibility-private" />
								<Label htmlFor="visibility-private">Private - Only you can see your profile</Label>
							</div>
						</RadioGroup>
					</div>
				</div>
			</div>
		</div>
	)
}

// Settings Panel
const SettingsPanel = () => {
	const [settings, setSettings] = useState({
		volume: [75],
		brightness: [60],
		theme: 'system',
		language: 'en',
		autoSave: true,
		showTips: false
	})

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold">System Preferences</Label>
				<p className="text-sm text-muted-foreground">Customize your experience</p>
			</div>

			<div className="space-y-6">
				{/* Audio Settings */}
				<div className="space-y-4">
					<Label className="text-base font-semibold flex items-center gap-2">
						<VolumeIcon className="w-5 h-5" />
						Audio
					</Label>

					<div className="space-y-3">
						<div className="space-y-2">
							<Label htmlFor="volume-slider" className="text-sm font-medium">
								Volume: {settings.volume[0]}%
							</Label>
							<Slider id="volume-slider" value={settings.volume} onValueChange={(value) => setSettings({ ...settings, volume: value })} max={100} step={1} className="w-full" />
						</div>
					</div>
				</div>

				{/* Display Settings */}
				<div className="space-y-4">
					<Label className="text-base font-semibold flex items-center gap-2">
						<SunDim className="w-5 h-5" />
						Display
					</Label>

					<div className="space-y-3">
						<div className="space-y-2">
							<Label htmlFor="brightness-slider" className="text-sm font-medium">
								Brightness: {settings.brightness[0]}%
							</Label>
							<Slider id="brightness-slider" value={settings.brightness} onValueChange={(value) => setSettings({ ...settings, brightness: value })} max={100} step={1} className="w-full" />
						</div>

						<div className="space-y-2">
							<Label htmlFor="theme-select" className="text-sm font-medium">
								Theme
							</Label>
							<Select value={settings.theme} onValueChange={(value) => setSettings({ ...settings, theme: value })}>
								<SelectTrigger id="theme-select">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="light">Light</SelectItem>
									<SelectItem value="dark">Dark</SelectItem>
									<SelectItem value="system">System</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
				</div>

				{/* General Settings */}
				<div className="space-y-4">
					<Label className="text-base font-semibold flex items-center gap-2">
						<SettingsIcon className="w-5 h-5" />
						General
					</Label>

					<div className="space-y-3">
						<div className="space-y-2">
							<Label htmlFor="language-select" className="text-sm font-medium">
								Language
							</Label>
							<Select value={settings.language} onValueChange={(value) => setSettings({ ...settings, language: value })}>
								<SelectTrigger id="language-select">
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

						<div className="flex items-center justify-between p-3 border rounded-lg">
							<div>
								<Label htmlFor="auto-save" className="font-medium">
									Auto-save
								</Label>
								<p className="text-sm text-muted-foreground">Automatically save your work</p>
							</div>
							<Switch id="auto-save" checked={settings.autoSave} onCheckedChange={(checked) => setSettings({ ...settings, autoSave: checked })} />
						</div>

						<div className="flex items-center justify-between p-3 border rounded-lg">
							<div>
								<Label htmlFor="show-tips" className="font-medium">
									Show Tips
								</Label>
								<p className="text-sm text-muted-foreground">Display helpful tips and tutorials</p>
							</div>
							<Switch id="show-tips" checked={settings.showTips} onCheckedChange={(checked) => setSettings({ ...settings, showTips: checked })} />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

// Contact Form
const ContactForm = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: '',
		subject: '',
		message: '',
		priority: 'medium',
		contactMethod: 'email',
		agreement: false
	})
	const [errors, setErrors] = useState<string[]>([])

	const validateForm = () => {
		const newErrors: string[] = []
		if (!formData.name) newErrors.push('Name is required')
		if (!formData.email) newErrors.push('Email is required')
		if (!formData.message) newErrors.push('Message is required')
		if (!formData.agreement) newErrors.push('You must agree to the terms')
		setErrors(newErrors)
		return newErrors.length === 0
	}

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold">Contact Us</Label>
				<p className="text-sm text-muted-foreground">Send us a message and we'll get back to you</p>
			</div>

			{errors.length > 0 && (
				<Alert variant="destructive">
					<AlertTriangleIcon className="h-4 w-4" />
					<AlertDescription>
						<ul className="list-disc list-inside space-y-1">
							{errors.map((error, index) => (
								<li key={index}>{error}</li>
							))}
						</ul>
					</AlertDescription>
				</Alert>
			)}

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="space-y-2">
					<Label htmlFor="contact-name" className="flex items-center gap-2">
						<UserIcon className="w-4 h-4" />
						Full Name
						<span className="text-red-500">*</span>
					</Label>
					<Input
						id="contact-name"
						value={formData.name}
						onChange={(e) => setFormData({ ...formData, name: e.target.value })}
						placeholder="Enter your full name"
						required
						aria-describedby="name-help"
					/>
					<p id="name-help" className="text-xs text-muted-foreground">
						How would you like us to address you?
					</p>
				</div>

				<div className="space-y-2">
					<Label htmlFor="contact-email" className="flex items-center gap-2">
						<MailIcon className="w-4 h-4" />
						Email Address
						<span className="text-red-500">*</span>
					</Label>
					<Input id="contact-email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="your.email@example.com" required />
				</div>
			</div>

			<div className="space-y-2">
				<Label htmlFor="contact-phone" className="flex items-center gap-2">
					<PhoneIcon className="w-4 h-4" />
					Phone Number
					<Badge variant="outline" className="text-xs">
						Optional
					</Badge>
				</Label>
				<Input id="contact-phone" type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+1 (555) 123-4567" />
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="space-y-2">
					<Label htmlFor="contact-subject">Subject</Label>
					<Input id="contact-subject" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} placeholder="What is this about?" />
				</div>

				<div className="space-y-2">
					<Label htmlFor="contact-priority">Priority</Label>
					<Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
						<SelectTrigger id="contact-priority">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="low">Low</SelectItem>
							<SelectItem value="medium">Medium</SelectItem>
							<SelectItem value="high">High</SelectItem>
							<SelectItem value="urgent">Urgent</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>

			<div className="space-y-2">
				<Label htmlFor="contact-message" className="flex items-center gap-2">
					Message
					<span className="text-red-500">*</span>
				</Label>
				<Textarea
					id="contact-message"
					value={formData.message}
					onChange={(e) => setFormData({ ...formData, message: e.target.value })}
					placeholder="Please describe your inquiry in detail..."
					rows={5}
					required
				/>
				<p className="text-xs text-muted-foreground text-right">{formData.message.length} characters</p>
			</div>

			<div className="space-y-3">
				<Label className="text-sm font-semibold">Preferred Contact Method</Label>
				<RadioGroup value={formData.contactMethod} onValueChange={(value) => setFormData({ ...formData, contactMethod: value })} className="flex flex-wrap gap-4">
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="email" id="method-email" />
						<Label htmlFor="method-email" className="flex items-center gap-1">
							<MailIcon className="w-4 h-4" />
							Email
						</Label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="phone" id="method-phone" />
						<Label htmlFor="method-phone" className="flex items-center gap-1">
							<PhoneIcon className="w-4 h-4" />
							Phone
						</Label>
					</div>
				</RadioGroup>
			</div>

			<div className="flex items-start space-x-2 p-3 border rounded-lg">
				<Checkbox id="contact-agreement" checked={formData.agreement} onCheckedChange={(checked) => setFormData({ ...formData, agreement: !!checked })} className="mt-0.5" />
				<div>
					<Label htmlFor="contact-agreement" className="text-sm font-medium cursor-pointer">
						I agree to the terms and conditions
						<span className="text-red-500 ml-1">*</span>
					</Label>
					<p className="text-xs text-muted-foreground mt-1">By submitting this form, you agree to our privacy policy and terms of service.</p>
				</div>
			</div>

			<Button onClick={validateForm} className="w-full">
				Send Message
			</Button>
		</div>
	)
}

// Basic Label Examples (preserved from original)
const BasicLabelExamples = () => {
	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold">Basic Label Examples</Label>
				<p className="text-sm text-muted-foreground">Simple label and input combinations</p>
			</div>

			<div className="grid gap-6">
				<div className="flex items-center gap-3">
					<Checkbox id="label-demo-terms" />
					<Label htmlFor="label-demo-terms">Accept terms and conditions</Label>
				</div>

				<div className="grid gap-3">
					<Label htmlFor="label-demo-username">Username</Label>
					<Input id="label-demo-username" placeholder="Username" />
				</div>

				<div className="group grid gap-3">
					<Label htmlFor="label-demo-disabled" className="text-muted-foreground">
						Disabled Field
					</Label>
					<Input id="label-demo-disabled" placeholder="This field is disabled" disabled />
				</div>

				<div className="grid gap-3">
					<Label htmlFor="label-demo-message">Message</Label>
					<Textarea id="label-demo-message" placeholder="Type your message here" />
				</div>
			</div>
		</div>
	)
}

export default function LabelSample() {
	const [showAdvanced, setShowAdvanced] = useState(false)

	return (
		<Fragment>
			<ComponentDoc
				title="Label"
				description="Accessible labels that create clear relationships between form controls and their descriptions. Essential for form usability and screen reader compatibility."
				component={
					<div className="flex flex-col gap-8 w-full max-w-4xl">
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
							<Badge variant="outline">{showAdvanced ? '4' : '1'} Examples</Badge>
						</div>

						{/* Real-World Form Examples */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Form Applications</h3>
							<div className="grid grid-cols-1 gap-8">
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<UserIcon className="w-5 h-5" />
											User Profile Form
										</CardTitle>
										<CardDescription>Comprehensive form with validation, icons, and help text</CardDescription>
									</CardHeader>
									<CardContent>
										<UserProfileForm />
									</CardContent>
								</Card>
							</div>
						</div>

						{/* Advanced Examples */}
						{showAdvanced && (
							<>
								<div>
									<h3 className="text-lg font-semibold mb-4">Advanced Applications</h3>
									<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
										<Card>
											<CardHeader>
												<CardTitle className="flex items-center gap-2">
													<SettingsIcon className="w-5 h-5" />
													Settings Panel
												</CardTitle>
												<CardDescription>System preferences with sliders and controls</CardDescription>
											</CardHeader>
											<CardContent>
												<SettingsPanel />
											</CardContent>
										</Card>

										<Card>
											<CardHeader>
												<CardTitle className="flex items-center gap-2">
													<MailIcon className="w-5 h-5" />
													Contact Form
												</CardTitle>
												<CardDescription>Complex form with validation and conditional fields</CardDescription>
											</CardHeader>
											<CardContent>
												<ContactForm />
											</CardContent>
										</Card>
									</div>
								</div>

								<div>
									<h3 className="text-lg font-semibold mb-4">Basic Examples</h3>
									<Card>
										<CardHeader>
											<CardTitle className="flex items-center gap-2">
												<TagIcon className="w-5 h-5" />
												Basic Labels
											</CardTitle>
											<CardDescription>Simple label and input combinations</CardDescription>
										</CardHeader>
										<CardContent>
											<BasicLabelExamples />
										</CardContent>
									</Card>
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
								<CardDescription>Best practices for implementing accessible labels</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div>
										<h4 className="font-semibold mb-2">Accessibility Requirements</h4>
										<ul className="space-y-1 text-sm text-muted-foreground">
											<li>• Always associate labels with form controls using htmlFor and id</li>
											<li>• Use descriptive text that clearly explains the field purpose</li>
											<li>• Include required field indicators and validation messages</li>
											<li>• Provide help text for complex or unfamiliar fields</li>
											<li>• Consider using aria-describedby for additional context</li>
										</ul>
									</div>
									<Separator />
									<div>
										<h4 className="font-semibold mb-2">Design Best Practices</h4>
										<ul className="space-y-1 text-sm text-muted-foreground">
											<li>• Use consistent typography and spacing for visual hierarchy</li>
											<li>• Group related fields with section headings</li>
											<li>• Use icons sparingly to enhance, not replace, text labels</li>
											<li>• Ensure sufficient color contrast for readability</li>
											<li>• Position labels consistently above or beside inputs</li>
											<li>• Show validation status clearly with color and text</li>
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
										<strong>Total Examples:</strong> {showAdvanced ? '4' : '1'}
									</p>
								</div>
								<div>
									<p>
										<strong>Form Types:</strong> Profile, Settings{showAdvanced ? ', Contact, Basic' : ''}
									</p>
									<p>
										<strong>Features:</strong> Icons, Validation, Help Text, Accessibility
									</p>
								</div>
							</div>
						</div>
					</div>
				}
			/>
		</Fragment>
	)
}
