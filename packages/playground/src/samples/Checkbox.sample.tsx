import { Fragment, useState } from 'react'
import { Checkbox, Label, Button } from '@rs-kit/ui-kit'
import { ComponentDoc } from '@/components/ComponentDoc'
import { useFormik } from 'formik'
import { object, boolean, array, string } from 'yup'

export default function CheckboxSample() {
	// State for interactive examples
	const [isChecked, setIsChecked] = useState(false)
	const [notifications, setNotifications] = useState({
		email: true,
		push: false,
		sms: false
	})
	const [selectedFeatures, setSelectedFeatures] = useState<string[]>(['analytics'])
	const [privacy, setPrivacy] = useState({
		terms: false,
		privacy: false,
		marketing: false
	})

	// Interactive handlers
	const handleNotificationChange = (type: keyof typeof notifications) => {
		setNotifications(prev => ({
			...prev,
			[type]: !prev[type]
		}))
	}

	const handleFeatureToggle = (feature: string) => {
		setSelectedFeatures(prev => 
			prev.includes(feature) 
				? prev.filter(f => f !== feature)
				: [...prev, feature]
		)
	}

	const handlePrivacyChange = (type: keyof typeof privacy) => {
		setPrivacy(prev => ({
			...prev,
			[type]: !prev[type]
		}))
	}

	// Formik validation schema
	const validationSchema = object({
		terms: boolean().oneOf([true], 'You must accept the terms and conditions'),
		privacy: boolean().oneOf([true], 'You must accept the privacy policy'),
		newsletter: boolean(),
		features: array().min(1, 'Please select at least one feature'),
		notifications: object({
			email: boolean(),
			push: boolean(),
			sms: boolean()
		})
	})

	// Formik form state
	const formData = useFormik({
		initialValues: {
			terms: false,
			privacy: false,
			newsletter: false,
			features: [],
			notifications: {
				email: false,
				push: false,
				sms: false
			}
		},
		validationSchema,
		validateOnChange: true,
		validateOnBlur: true,
		onSubmit: (values) => {
			alert('Form submitted successfully!\n\n' + JSON.stringify(values, null, 2))
		}
	})

	const handleFormFeatureChange = (feature: string) => {
		const currentFeatures = formData.values.features as string[]
		const newFeatures = currentFeatures.includes(feature)
			? currentFeatures.filter(f => f !== feature)
			: [...currentFeatures, feature]
		formData.setFieldValue('features', newFeatures)
	}

	return (
		<Fragment>
			<ComponentDoc
				title="Checkbox"
				description="A control that allows users to toggle between checked and unchecked states. Perfect for boolean inputs, multi-selection, and agreement confirmations."
				component={
					<div className="flex flex-col gap-8 w-full max-w-4xl">
						{/* Basic Checkbox States */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Basic Checkbox States</h3>
							<div className="space-y-4">
								<div className="flex items-center gap-3">
									<Checkbox id="unchecked" />
									<Label htmlFor="unchecked">Unchecked (default)</Label>
								</div>
								<div className="flex items-center gap-3">
									<Checkbox id="checked" defaultChecked />
									<Label htmlFor="checked">Checked</Label>
								</div>
								<div className="flex items-center gap-3">
									<Checkbox id="disabled" disabled />
									<Label htmlFor="disabled" className="text-muted-foreground">Disabled unchecked</Label>
								</div>
								<div className="flex items-center gap-3">
									<Checkbox id="disabled-checked" defaultChecked disabled />
									<Label htmlFor="disabled-checked" className="text-muted-foreground">Disabled checked</Label>
								</div>
								<div className="flex items-center gap-3">
									<Checkbox id="indeterminate" ref={(el) => {
										if (el) el.indeterminate = true
									}} />
									<Label htmlFor="indeterminate">Indeterminate state</Label>
								</div>
							</div>
						</div>

						{/* Checkbox with Descriptions */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Checkbox with Descriptions</h3>
							<div className="space-y-4">
								<div className="flex items-start gap-3">
									<Checkbox id="terms-basic" />
									<div className="grid gap-1.5">
										<Label htmlFor="terms-basic" className="text-sm font-medium leading-none">
											Accept terms and conditions
										</Label>
										<p className="text-sm text-muted-foreground">
											By checking this box, you agree to our terms of service and privacy policy.
										</p>
									</div>
								</div>

								<div className="flex items-start gap-3">
									<Checkbox id="newsletter" defaultChecked />
									<div className="grid gap-1.5">
										<Label htmlFor="newsletter" className="text-sm font-medium leading-none">
											Subscribe to newsletter
										</Label>
										<p className="text-sm text-muted-foreground">
											Receive weekly updates about new features and promotions.
										</p>
									</div>
								</div>

								<div className="flex items-start gap-3">
									<Checkbox id="analytics" />
									<div className="grid gap-1.5">
										<Label htmlFor="analytics" className="text-sm font-medium leading-none">
											Allow analytics tracking
										</Label>
										<p className="text-sm text-muted-foreground">
											Help us improve our service by sharing anonymous usage data.
										</p>
									</div>
								</div>
							</div>
						</div>

						{/* Interactive Examples */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Interactive Examples</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="p-4 border rounded-lg">
									<h4 className="text-sm font-medium mb-3">Single Toggle</h4>
									<div className="flex items-center gap-3">
										<Checkbox 
											id="single-toggle"
											checked={isChecked}
											onCheckedChange={setIsChecked}
										/>
										<Label htmlFor="single-toggle">
											{isChecked ? 'Feature enabled' : 'Feature disabled'}
										</Label>
									</div>
									<p className="text-xs text-muted-foreground mt-2">
										Status: {isChecked ? '✅ Active' : '❌ Inactive'}
									</p>
								</div>

								<div className="p-4 border rounded-lg">
									<h4 className="text-sm font-medium mb-3">Notification Settings</h4>
									<div className="space-y-3">
										<div className="flex items-center gap-3">
											<Checkbox 
												id="email-notif"
												checked={notifications.email}
												onCheckedChange={() => handleNotificationChange('email')}
											/>
											<Label htmlFor="email-notif">Email notifications</Label>
										</div>
										<div className="flex items-center gap-3">
											<Checkbox 
												id="push-notif"
												checked={notifications.push}
												onCheckedChange={() => handleNotificationChange('push')}
											/>
											<Label htmlFor="push-notif">Push notifications</Label>
										</div>
										<div className="flex items-center gap-3">
											<Checkbox 
												id="sms-notif"
												checked={notifications.sms}
												onCheckedChange={() => handleNotificationChange('sms')}
											/>
											<Label htmlFor="sms-notif">SMS notifications</Label>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Multi-Selection Example */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Multi-Selection Groups</h3>
							<div className="space-y-4">
								<div>
									<h4 className="text-sm font-medium mb-3">Select Features ({selectedFeatures.length} selected)</h4>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
										{[
											{ id: 'analytics', label: 'Analytics Dashboard', desc: 'Track your performance metrics' },
											{ id: 'reports', label: 'Advanced Reports', desc: 'Generate detailed reports' },
											{ id: 'integrations', label: 'Third-party Integrations', desc: 'Connect with external services' },
											{ id: 'api', label: 'API Access', desc: 'Access our REST API' },
											{ id: 'support', label: 'Priority Support', desc: '24/7 premium support' },
											{ id: 'backup', label: 'Automatic Backups', desc: 'Daily data backups' }
										].map((feature) => (
											<div key={feature.id} className="flex items-start gap-3">
												<Checkbox 
													id={feature.id}
													checked={selectedFeatures.includes(feature.id)}
													onCheckedChange={() => handleFeatureToggle(feature.id)}
												/>
												<div className="grid gap-1">
													<Label htmlFor={feature.id} className="text-sm font-medium">
														{feature.label}
													</Label>
													<p className="text-xs text-muted-foreground">
														{feature.desc}
													</p>
												</div>
											</div>
										))}
									</div>
								</div>
							</div>
						</div>

						{/* Card-Style Checkboxes */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Card-Style Checkboxes</h3>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								{[
									{ 
										id: 'basic-plan', 
										title: 'Basic Plan', 
										desc: 'Perfect for individuals',
										price: '$9/month',
										features: ['5 projects', '10GB storage', 'Email support']
									},
									{ 
										id: 'pro-plan', 
										title: 'Pro Plan', 
										desc: 'Best for small teams',
										price: '$29/month',
										features: ['Unlimited projects', '100GB storage', 'Priority support']
									},
									{ 
										id: 'enterprise-plan', 
										title: 'Enterprise Plan', 
										desc: 'For large organizations',
										price: '$99/month',
										features: ['Custom solutions', 'Unlimited storage', 'Dedicated support']
									}
								].map((plan) => (
									<Label 
										key={plan.id}
										htmlFor={plan.id}
										className="block p-4 border rounded-lg cursor-pointer hover:bg-accent/50 transition-colors"
									>
										<div className="flex items-start gap-3">
											<Checkbox id={plan.id} className="mt-1" />
											<div className="flex-1">
												<h4 className="font-medium">{plan.title}</h4>
												<p className="text-sm text-muted-foreground">{plan.desc}</p>
												<p className="text-lg font-bold mt-2">{plan.price}</p>
												<ul className="text-xs text-muted-foreground mt-2 space-y-1">
													{plan.features.map((feature, idx) => (
														<li key={idx}>• {feature}</li>
													))}
												</ul>
											</div>
										</div>
									</Label>
								))}
							</div>
						</div>

						{/* Agreement Checkboxes */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Agreement & Legal Checkboxes</h3>
							<div className="space-y-4">
								<div className="flex items-start gap-3">
									<Checkbox 
										id="privacy-terms"
										checked={privacy.terms}
										onCheckedChange={() => handlePrivacyChange('terms')}
									/>
									<div className="grid gap-1.5">
										<Label htmlFor="privacy-terms" className="text-sm font-medium leading-none">
											I agree to the <span className="text-blue-600 underline cursor-pointer">Terms of Service</span>
										</Label>
										<p className="text-xs text-muted-foreground">
											Required to create an account
										</p>
									</div>
								</div>

								<div className="flex items-start gap-3">
									<Checkbox 
										id="privacy-policy"
										checked={privacy.privacy}
										onCheckedChange={() => handlePrivacyChange('privacy')}
									/>
									<div className="grid gap-1.5">
										<Label htmlFor="privacy-policy" className="text-sm font-medium leading-none">
											I acknowledge the <span className="text-blue-600 underline cursor-pointer">Privacy Policy</span>
										</Label>
										<p className="text-xs text-muted-foreground">
											Required to process your data
										</p>
									</div>
								</div>

								<div className="flex items-start gap-3">
									<Checkbox 
										id="marketing"
										checked={privacy.marketing}
										onCheckedChange={() => handlePrivacyChange('marketing')}
									/>
									<div className="grid gap-1.5">
										<Label htmlFor="marketing" className="text-sm font-medium leading-none">
											I consent to receive marketing communications
										</Label>
										<p className="text-xs text-muted-foreground">
											Optional - You can unsubscribe at any time
										</p>
									</div>
								</div>
							</div>
						</div>

						{/* Current State Display */}
						<div className="mt-6 p-4 bg-gray-50 rounded-lg">
							<h4 className="text-sm font-semibold text-gray-700 mb-2">Interactive State:</h4>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
								<div>
									<p><strong>Single Toggle:</strong> {isChecked ? '✅ Enabled' : '❌ Disabled'}</p>
									<p><strong>Selected Features:</strong> {selectedFeatures.length} of 6</p>
									<p><strong>Feature List:</strong> {selectedFeatures.join(', ') || 'None'}</p>
								</div>
								<div>
									<p><strong>Notifications:</strong></p>
									<ul className="ml-4 space-y-1">
										<li>Email: {notifications.email ? '✅' : '❌'}</li>
										<li>Push: {notifications.push ? '✅' : '❌'}</li>
										<li>SMS: {notifications.sms ? '✅' : '❌'}</li>
									</ul>
								</div>
								<div>
									<p><strong>Privacy Agreements:</strong></p>
									<ul className="ml-4 space-y-1">
										<li>Terms: {privacy.terms ? '✅' : '❌'}</li>
										<li>Privacy: {privacy.privacy ? '✅' : '❌'}</li>
										<li>Marketing: {privacy.marketing ? '✅' : '❌'}</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				}
			/>

			<ComponentDoc
				title="Checkbox Form Integration"
				description="Advanced form integration with Formik validation and error handling."
				component={
					<div className="flex flex-col gap-6 w-full max-w-4xl">
						<form onSubmit={formData.handleSubmit} className="space-y-6">
							{/* Required Agreements */}
							<div>
								<h3 className="text-lg font-semibold mb-4">Required Agreements</h3>
								<div className="space-y-4">
									<div>
										<div className="flex items-start gap-3">
											<Checkbox 
												id="form-terms"
												checked={formData.values.terms}
												onCheckedChange={(checked) => formData.setFieldValue('terms', checked)}
											/>
											<div className="grid gap-1.5">
												<Label htmlFor="form-terms" className="text-sm font-medium leading-none">
													I agree to the Terms and Conditions <span className="text-red-500">*</span>
												</Label>
												<p className="text-xs text-muted-foreground">
													Please read our terms before proceeding
												</p>
											</div>
										</div>
										{formData.errors.terms && formData.touched.terms && (
											<p className="text-sm text-red-600 mt-1 ml-6">{formData.errors.terms}</p>
										)}
									</div>

									<div>
										<div className="flex items-start gap-3">
											<Checkbox 
												id="form-privacy"
												checked={formData.values.privacy}
												onCheckedChange={(checked) => formData.setFieldValue('privacy', checked)}
											/>
											<div className="grid gap-1.5">
												<Label htmlFor="form-privacy" className="text-sm font-medium leading-none">
													I acknowledge the Privacy Policy <span className="text-red-500">*</span>
												</Label>
												<p className="text-xs text-muted-foreground">
													Required for data processing
												</p>
											</div>
										</div>
										{formData.errors.privacy && formData.touched.privacy && (
											<p className="text-sm text-red-600 mt-1 ml-6">{formData.errors.privacy}</p>
										)}
									</div>
								</div>
							</div>

							{/* Optional Settings */}
							<div>
								<h3 className="text-lg font-semibold mb-4">Optional Settings</h3>
								<div className="flex items-start gap-3">
									<Checkbox 
										id="form-newsletter"
										checked={formData.values.newsletter}
										onCheckedChange={(checked) => formData.setFieldValue('newsletter', checked)}
									/>
									<div className="grid gap-1.5">
										<Label htmlFor="form-newsletter" className="text-sm font-medium leading-none">
											Subscribe to newsletter
										</Label>
										<p className="text-xs text-muted-foreground">
											Get updates about new features and promotions
										</p>
									</div>
								</div>
							</div>

							{/* Feature Selection */}
							<div>
								<h3 className="text-lg font-semibold mb-4">Feature Selection</h3>
								<div className="space-y-3">
									{[
										{ id: 'dashboard', label: 'Analytics Dashboard' },
										{ id: 'reports', label: 'Advanced Reports' },
										{ id: 'api', label: 'API Access' },
										{ id: 'integrations', label: 'Integrations' }
									].map((feature) => (
										<div key={feature.id} className="flex items-center gap-3">
											<Checkbox 
												id={`form-${feature.id}`}
												checked={(formData.values.features as string[]).includes(feature.id)}
												onCheckedChange={() => handleFormFeatureChange(feature.id)}
											/>
											<Label htmlFor={`form-${feature.id}`}>{feature.label}</Label>
										</div>
									))}
								</div>
								{formData.errors.features && formData.touched.features && (
									<p className="text-sm text-red-600 mt-2">{formData.errors.features}</p>
								)}
							</div>

							{/* Submit */}
							<div className="flex gap-4">
								<Button type="submit" disabled={!formData.isValid || formData.isSubmitting}>
									{formData.isSubmitting ? 'Submitting...' : 'Create Account'}
								</Button>
								<Button type="button" variant="outline" onClick={() => formData.resetForm()}>
									Reset Form
								</Button>
							</div>
						</form>

						{/* Form State Display */}
						<div className="p-4 bg-gray-50 rounded-lg">
							<h4 className="text-sm font-semibold text-gray-700 mb-2">Form State:</h4>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
								<div>Terms Accepted: {formData.values.terms ? '✅' : '❌'}</div>
								<div>Privacy Acknowledged: {formData.values.privacy ? '✅' : '❌'}</div>
								<div>Newsletter: {formData.values.newsletter ? '✅' : '❌'}</div>
								<div>Selected Features: {(formData.values.features as string[]).length}</div>
								<div>Form Valid: {formData.isValid ? '✅' : '❌'}</div>
								<div>Errors: {Object.keys(formData.errors).length}</div>
							</div>
						</div>

						{/* Props Reference */}
						<div className="p-4 bg-blue-50 rounded-lg">
							<h4 className="text-sm font-semibold text-blue-700 mb-2">Props Reference:</h4>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-600">
								<div>
									<strong>Basic Props:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li><code>checked</code> - Controlled checked state</li>
										<li><code>defaultChecked</code> - Default checked state</li>
										<li><code>disabled</code> - Disable the checkbox</li>
										<li><code>id</code> - HTML id attribute</li>
										<li><code>name</code> - Form field name</li>
										<li><code>required</code> - Mark as required</li>
									</ul>
								</div>
								<div>
									<strong>Event Handlers:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li><code>onCheckedChange</code> - Change event handler</li>
										<li><code>onClick</code> - Click event handler</li>
										<li><code>onFocus</code> - Focus event handler</li>
										<li><code>onBlur</code> - Blur event handler</li>
									</ul>
								</div>
								<div>
									<strong>Accessibility:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li><code>aria-label</code> - Accessible label</li>
										<li><code>aria-describedby</code> - Description reference</li>
										<li>Automatic keyboard navigation</li>
										<li>Screen reader support</li>
									</ul>
								</div>
								<div>
									<strong>Styling:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li><code>className</code> - Additional CSS classes</li>
										<li>Custom variants via CSS</li>
										<li>Data attributes for styling</li>
										<li>Focus and hover states</li>
									</ul>
								</div>
							</div>
						</div>

						{/* Usage Guidelines */}
						<div className="p-4 bg-green-50 rounded-lg">
							<h4 className="text-sm font-semibold text-green-700 mb-2">Usage Guidelines:</h4>
							<ul className="text-sm text-green-600 space-y-1 list-disc list-inside">
								<li><strong>Labels:</strong> Always provide clear, descriptive labels using the Label component</li>
								<li><strong>Grouping:</strong> Group related checkboxes together with proper spacing</li>
								<li><strong>Required Fields:</strong> Clearly mark required checkboxes with visual indicators</li>
								<li><strong>Error States:</strong> Show validation errors below the checkbox with clear messaging</li>
								<li><strong>Descriptions:</strong> Use helper text to explain what checking the box means</li>
								<li><strong>Accessibility:</strong> Ensure proper keyboard navigation and screen reader support</li>
								<li><strong>Form Integration:</strong> Use controlled components for form validation</li>
								<li><strong>Visual Design:</strong> Maintain consistent spacing and alignment with other form elements</li>
							</ul>
						</div>
					</div>
				}
			/>
		</Fragment>
	)
}