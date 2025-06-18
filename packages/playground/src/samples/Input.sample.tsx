import { Fragment, useState } from 'react'
import { Input, DatePickerBottomSheet, Button } from '@rs-kit/ui-kit'
import { ComponentDoc } from '@/components/ComponentDoc'
import { useFormik } from 'formik'
import { object, string, date, ref } from 'yup'

export default function InputSample() {
	// Form state management
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [username, setUsername] = useState('')
	const [phone, setPhone] = useState('')
	const [website, setWebsite] = useState('')
	const [age, setAge] = useState('')
	const [search, setSearch] = useState('')
	const [bio, setBio] = useState('')

	// Date picker states (for basic examples)
	const [selectedDate, setSelectedDate] = useState<Date | null>(null)

	// Validation states
	const [emailError, setEmailError] = useState('')
	const [passwordError, setPasswordError] = useState('')
	const [phoneError, setPhoneError] = useState('')

	// Validation functions
	const validateEmail = (value: string) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		if (!value) {
			setEmailError('Email is required')
		} else if (!emailRegex.test(value)) {
			setEmailError('Please enter a valid email address')
		} else {
			setEmailError('')
		}
	}

	const validatePassword = (value: string) => {
		if (!value) {
			setPasswordError('Password is required')
		} else if (value.length < 8) {
			setPasswordError('Password must be at least 8 characters')
		} else {
			setPasswordError('')
		}
	}

	const validatePhone = (value: string) => {
		const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/
		if (!value) {
			setPhoneError('')
		} else if (!phoneRegex.test(value)) {
			setPhoneError('Please enter a valid phone number')
		} else {
			setPhoneError('')
		}
	}

	// Event handlers
	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setEmail(value)
		validateEmail(value)
	}

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setPassword(value)
		validatePassword(value)
	}

	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setPhone(value)
		validatePhone(value)
	}

	const handleDateSelect = (date: Date) => {
		setSelectedDate(date)
	}

	// Formik validation schema
	const validationSchema = object({
		fullName: string().min(2, 'Full Name must be at least 2 characters').required('Full Name is required'),
		email: string().email('Please enter a valid email address').required('Email is required'),
		dateOfBirth: date().required('Date of Birth is required').max(new Date(), 'Date of Birth cannot be in the future'),
		password: string().min(8, 'Password must be at least 8 characters').required('Password is required'),
		confirmPassword: string()
			.oneOf([ref('password')], 'Passwords must match')
			.required('Please confirm your password'),
		phone: string()
			.matches(/^\+?[\d\s\-\(\)]{10,}$/, 'Please enter a valid phone number')
			.notRequired(),
		website: string().url('Please enter a valid URL').notRequired()
	})

	// Formik form state
	const formData = useFormik({
		initialValues: {
			fullName: '',
			email: '',
			dateOfBirth: null as Date | null,
			password: '',
			confirmPassword: '',
			phone: '',
			website: ''
		},
		validationSchema,
		validateOnChange: true,
		validateOnBlur: false,
		onSubmit: (values) => {
			alert('Form submitted successfully!\n\n' + JSON.stringify(values, null, 2))
		}
	})

	const handleDateOfBirthSelect = (date: Date) => {
		formData.setFieldValue('dateOfBirth', date)
	}

	const formatDate = (date: Date | null) => {
		if (!date) return ''
		return date.toLocaleDateString()
	}

	return (
		<Fragment>
			<ComponentDoc
				title="Input"
				description="A comprehensive input component built on React DOM's input element with validation states and interactive examples."
				component={
					<div className="flex flex-col gap-8 w-full max-w-2xl">
						{/* Basic Input Types */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Basic Input Types</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">Text Input</label>
									<Input type="text" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">Number Input</label>
									<Input type="number" placeholder="Enter your age" value={age} onChange={(e) => setAge(e.target.value)} />
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">Search Input</label>
									<Input type="search" placeholder="Search anything..." value={search} onChange={(e) => setSearch(e.target.value)} />
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">URL Input</label>
									<Input type="url" placeholder="https://example.com" value={website} onChange={(e) => setWebsite(e.target.value)} />
								</div>
							</div>
						</div>

						{/* Validation Examples */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Validation States</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">Email (with validation)</label>
									<Input type="email" placeholder="Enter your email" value={email} onChange={handleEmailChange} errorMessage={emailError} />
									{emailError && <p className="text-error-1 text-sm mt-1">{emailError}</p>}
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">Password (min 8 chars)</label>
									<Input type="password" placeholder="Enter password" value={password} onChange={handlePasswordChange} errorMessage={passwordError} />
									{passwordError && <p className="text-error-1 text-sm mt-1">{passwordError}</p>}
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">Phone (optional validation)</label>
									<Input type="tel" placeholder="+1 (555) 123-4567" value={phone} onChange={handlePhoneChange} errorMessage={phoneError} />
									{phoneError && <p className="text-error-1 text-sm mt-1">{phoneError}</p>}
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
									<Input
										type="password"
										placeholder="Confirm password"
										value={confirmPassword}
										onChange={(e) => setConfirmPassword(e.target.value)}
										errorMessage={confirmPassword !== '' && confirmPassword !== password ? 'Passwords do not match' : ''}
									/>
									{confirmPassword !== '' && confirmPassword !== password && <p className="text-error-1 text-sm mt-1">Passwords do not match</p>}
								</div>
							</div>
						</div>

						{/* Date/Time Inputs */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Date & Time Inputs</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
									<Input type="date" />
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
									<Input type="time" />
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">DateTime Local</label>
									<Input type="datetime-local" />
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
									<Input type="month" />
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">Week</label>
									<Input type="week" />
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">Date Picker (Custom Component)</label>
									<DatePickerBottomSheet selectedDate={selectedDate} onDateSelect={handleDateSelect} placeholder="Select a date" />
								</div>
							</div>
						</div>

						{/* Special States */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Special States</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label className="block text-sm font-medium text-gray-400 mb-1">Disabled Input</label>
									<Input disabled placeholder="This input is disabled" />
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">Read Only</label>
									<Input readOnly value="This is read-only" />
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">Required Input</label>
									<Input required placeholder="This field is required" />
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">File Upload</label>
									<Input type="file" accept=".jpg,.png,.pdf" />
								</div>
							</div>
						</div>

						{/* Form Values Display */}
						<div className="mt-6 p-4 bg-gray-50 rounded-lg">
							<h4 className="text-sm font-semibold text-gray-700 mb-2">Current Form Values:</h4>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
								<div>Username: {username || 'Empty'}</div>
								<div>Email: {email || 'Empty'}</div>
								<div>Phone: {phone || 'Empty'}</div>
								<div>Website: {website || 'Empty'}</div>
								<div>Age: {age || 'Empty'}</div>
								<div>Search: {search || 'Empty'}</div>
								<div>Selected Date: {selectedDate ? selectedDate.toLocaleDateString() : 'Empty'}</div>
								<div>Password: {password ? '•'.repeat(password.length) : 'Empty'}</div>
								<div>Confirm Password: {confirmPassword ? '•'.repeat(confirmPassword.length) : 'Empty'}</div>
							</div>
						</div>

						{/* Usage Guidelines */}
						<div className="mt-4 p-4 bg-blue-50 rounded-lg">
							<h4 className="text-sm font-semibold text-blue-700 mb-2">Usage Guidelines:</h4>
							<ul className="text-sm text-blue-600 space-y-1 list-disc list-inside">
								<li>Use appropriate input types for better UX and validation</li>
								<li>Provide clear labels and placeholder text</li>
								<li>Implement real-time validation for better feedback</li>
								<li>Use aria-invalid for accessibility when validation fails</li>
								<li>Consider disabled/readonly states for form flow control</li>
								<li>Group related inputs with proper spacing</li>
								<li>Always show validation errors clearly below inputs</li>
							</ul>
						</div>
					</div>
				}
			/>

			<ComponentDoc
				title="Form Validation with Formik"
				description="A complete form validation example using Formik and Yup schema validation with the Input components."
				component={
					<div className="flex flex-col gap-6 w-full max-w-2xl">
						<form onSubmit={formData.handleSubmit} className="space-y-6">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								{/* Full Name */}
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Full Name <span className="text-red-500">*</span>
									</label>
									<Input
										type="text"
										placeholder="Enter your full name"
										value={formData.values.fullName}
										onChange={formData.handleChange}
										onBlur={formData.handleBlur}
										name="fullName"
										errorMessage={formData.touched.fullName ? formData.errors.fullName : ''}
									/>
									{formData.touched.fullName && formData.errors.fullName && <p className="text-error-1 text-sm mt-1">{formData.errors.fullName}</p>}
								</div>

								{/* Email */}
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Email Address <span className="text-red-500">*</span>
									</label>
									<Input
										type="email"
										placeholder="Enter your email"
										value={formData.values.email}
										onChange={formData.handleChange}
										onBlur={formData.handleBlur}
										name="email"
										errorMessage={formData.touched.email ? formData.errors.email : ''}
									/>
									{formData.touched.email && formData.errors.email && <p className="text-error-1 text-sm mt-1">{formData.errors.email}</p>}
								</div>

								{/* Date of Birth */}
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Date of Birth <span className="text-red-500">*</span>
									</label>
									<DatePickerBottomSheet 
										selectedDate={formData.values.dateOfBirth} 
										onDateSelect={handleDateOfBirthSelect} 
										placeholder="Select date of birth"
										error={formData.touched.dateOfBirth && !!formData.errors.dateOfBirth}
									/>
									{formData.touched.dateOfBirth && formData.errors.dateOfBirth && <p className="text-error-1 text-sm mt-1">{formData.errors.dateOfBirth}</p>}
								</div>

								{/* Phone */}
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">Phone Number (Optional)</label>
									<Input
										type="tel"
										placeholder="+1 (555) 123-4567"
										value={formData.values.phone}
										onChange={formData.handleChange}
										onBlur={formData.handleBlur}
										name="phone"
										errorMessage={formData.touched.phone ? formData.errors.phone : ''}
									/>
									{formData.touched.phone && formData.errors.phone && <p className="text-error-1 text-sm mt-1">{formData.errors.phone}</p>}
								</div>

								{/* Password */}
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Password <span className="text-red-500">*</span>
									</label>
									<Input
										type="password"
										placeholder="Enter password"
										value={formData.values.password}
										onChange={formData.handleChange}
										onBlur={formData.handleBlur}
										name="password"
										errorMessage={formData.touched.password ? formData.errors.password : ''}
									/>
									{formData.touched.password && formData.errors.password && <p className="text-error-1 text-sm mt-1">{formData.errors.password}</p>}
								</div>

								{/* Confirm Password */}
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Confirm Password <span className="text-red-500">*</span>
									</label>
									<Input
										type="password"
										placeholder="Confirm password"
										value={formData.values.confirmPassword}
										onChange={formData.handleChange}
										onBlur={formData.handleBlur}
										name="confirmPassword"
										errorMessage={formData.touched.confirmPassword ? formData.errors.confirmPassword : ''}
									/>
									{formData.touched.confirmPassword && formData.errors.confirmPassword && <p className="text-error-1 text-sm mt-1">{formData.errors.confirmPassword}</p>}
								</div>

								{/* Website */}
								<div className="md:col-span-2">
									<label className="block text-sm font-medium text-gray-700 mb-1">Website (Optional)</label>
									<Input
										type="url"
										placeholder="https://example.com"
										value={formData.values.website}
										onChange={formData.handleChange}
										onBlur={formData.handleBlur}
										name="website"
										errorMessage={formData.touched.website ? formData.errors.website : ''}
									/>
									{formData.touched.website && formData.errors.website && <p className="text-error-1 text-sm mt-1">{formData.errors.website}</p>}
								</div>
							</div>

							{/* Submit Button */}
							<div className="flex gap-4">
								<Button type="submit" disabled={!formData.isValid || formData.isSubmitting}>
									{formData.isSubmitting ? 'Submitting...' : 'Submit Form'}
								</Button>
								<Button type="button" variant="outline" onClick={() => formData.resetForm()}>
									Reset Form
								</Button>
							</div>
						</form>

						{/* Form State Display */}
						<div className="mt-6 p-4 bg-gray-50 rounded-lg">
							<h4 className="text-sm font-semibold text-gray-700 mb-2">Current Formik State:</h4>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
								<div>Full Name: {formData.values.fullName || 'Empty'}</div>
								<div>Email: {formData.values.email || 'Empty'}</div>
								<div>Date of Birth: {formData.values.dateOfBirth ? formatDate(formData.values.dateOfBirth) : 'Empty'}</div>
								<div>Phone: {formData.values.phone || 'Empty'}</div>
								<div>Password: {formData.values.password ? '•'.repeat(formData.values.password.length) : 'Empty'}</div>
								<div>Confirm Password: {formData.values.confirmPassword ? '•'.repeat(formData.values.confirmPassword.length) : 'Empty'}</div>
								<div className="md:col-span-2">Website: {formData.values.website || 'Empty'}</div>
							</div>
							<div className="mt-2 pt-2 border-t border-gray-200">
								<div className="text-xs text-gray-500">
									Form Valid: {formData.isValid ? '✅' : '❌'} | Touched Fields: {Object.keys(formData.touched).length} | Errors: {Object.keys(formData.errors).length}
								</div>
							</div>
						</div>

						{/* Validation Rules */}
						<div className="mt-4 p-4 bg-blue-50 rounded-lg">
							<h4 className="text-sm font-semibold text-blue-700 mb-2">Validation Rules:</h4>
							<ul className="text-sm text-blue-600 space-y-1 list-disc list-inside">
								<li>
									<strong>Full Name:</strong> Required, minimum 2 characters
								</li>
								<li>
									<strong>Email:</strong> Required, valid email format
								</li>
								<li>
									<strong>Date of Birth:</strong> Required, cannot be in the future
								</li>
								<li>
									<strong>Password:</strong> Required, minimum 8 characters
								</li>
								<li>
									<strong>Confirm Password:</strong> Required, must match password
								</li>
								<li>
									<strong>Phone:</strong> Optional, valid phone format if provided
								</li>
								<li>
									<strong>Website:</strong> Optional, valid URL format if provided
								</li>
							</ul>
						</div>

						{/* Code Example */}
						<div className="mt-4 p-4 bg-gray-100 rounded-lg">
							<h4 className="text-sm font-semibold text-gray-700 mb-2">Implementation Example:</h4>
							<pre className="text-xs text-gray-600 overflow-x-auto">
								{`const validationSchema = object({
  fullName: string().min(2, 'Full Name must be at least 2 characters').required('Full Name is required'),
  email: string().email('Please enter a valid email address').required('Email is required'),
  dateOfBirth: date().required('Date of Birth is required').max(new Date(), 'Date of Birth cannot be in the future')
})

const formData = useFormik({
  initialValues: { /* ... */ },
  validationSchema,
  validateOnChange: true,
  validateOnBlur: false
})`}
							</pre>
						</div>
					</div>
				}
			/>
		</Fragment>
	)
}
