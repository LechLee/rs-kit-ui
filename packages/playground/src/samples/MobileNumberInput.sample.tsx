import { useState } from 'react'
import { MobileNumberInput, Button } from '@rs-kit/ui-kit'
import { useFormik } from 'formik'
import { object, string } from 'yup'

export default function MobileNumberInputSample() {
	const [dialCode, setDialCode] = useState('+60')
	const [mobileNumber, setMobileNumber] = useState('')

	// Validation states
	const [phoneError, setPhoneError] = useState('')

	// Validation function
	const validatePhone = (mobileNumber: string) => {
		if (!mobileNumber) {
			setPhoneError('Mobile number is required')
			return false
		}

		// Basic phone number validation (adjust regex as needed)
		const phoneRegex = /^[0-9]{8,15}$/
		if (!phoneRegex.test(mobileNumber)) {
			setPhoneError('Please enter a valid mobile number (8-15 digits)')
			return false
		}

		setPhoneError('')
		return true
	}

	const handleMobileNumberChange = (value: string) => {
		setMobileNumber(value)
		validatePhone(value)
	}

	const handleDialCodeChange = (value: string) => {
		setDialCode(value)
		validatePhone(mobileNumber)
	}

	// Formik validation schema
	const validationSchema = object({
		dialCode: string().required('Country code is required'),
		mobileNumber: string()
			.matches(/^[0-9]{8,15}$/, 'Please enter a valid mobile number (8-15 digits)')
			.required('Mobile number is required'),
		optionalPhone: string()
			.matches(/^[0-9]{8,15}$/, 'Please enter a valid mobile number (8-15 digits)')
			.notRequired()
	})

	// Formik form state
	const formData = useFormik({
		initialValues: {
			dialCode: '+60',
			mobileNumber: '',
			optionalPhone: ''
		},
		validationSchema,
		validateOnChange: true,
		validateOnBlur: true,
		onSubmit: (values) => {
			alert('Form submitted successfully!\n\n' + JSON.stringify(values, null, 2))
		}
	})

	const handleFormDialCodeChange = (value: string) => {
		formData.setFieldValue('dialCode', value)
	}

	const handleFormMobileNumberChange = (value: string) => {
		formData.setFieldValue('mobileNumber', value)
	}

	const handleOptionalPhoneChange = (value: string) => {
		formData.setFieldValue('optionalPhone', value)
	}

	return (
		<div className="space-y-8">
			<div>
				<h2 className="text-2xl font-bold mb-4">Mobile Number Input</h2>
				<p className="text-gray-600 mb-6">A custom component for entering mobile numbers with country code selection and form validation support.</p>
			</div>

			{/* Basic Examples */}
			<div className="space-y-6">
				<h3 className="text-lg font-semibold">Basic Examples</h3>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">Default</label>
						<MobileNumberInput dialCode={dialCode} mobileNumber={mobileNumber} onDialCodeChange={handleDialCodeChange} onMobileNumberChange={handleMobileNumberChange} />
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">With Custom Placeholder</label>
						<MobileNumberInput dialCode="+65" mobileNumber="" placeholder="Enter phone number" onDialCodeChange={() => {}} onMobileNumberChange={() => {}} />
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-400 mb-2">Disabled</label>
						<MobileNumberInput dialCode="+84" mobileNumber="123456789" disabled onDialCodeChange={() => {}} onMobileNumberChange={() => {}} />
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">Required Field</label>
						<MobileNumberInput dialCode="+60" mobileNumber="" required placeholder="Required mobile number" onDialCodeChange={() => {}} onMobileNumberChange={() => {}} />
					</div>
				</div>
			</div>

			{/* Validation Examples */}
			<div className="space-y-6">
				<h3 className="text-lg font-semibold">Validation Examples</h3>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">With Validation (Interactive)</label>
						<MobileNumberInput
							dialCode={dialCode}
							mobileNumber={mobileNumber}
							onDialCodeChange={handleDialCodeChange}
							onMobileNumberChange={handleMobileNumberChange}
							errorMessage={phoneError}
							placeholder="Enter your mobile number"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">Error State (Hidden Message)</label>
						<MobileNumberInput
							dialCode="+60"
							mobileNumber="123"
							errorMessage="Invalid mobile number format"
							displayError={false}
							onDialCodeChange={() => {}}
							onMobileNumberChange={() => {}}
						/>
					</div>

					<div className="md:col-span-2">
						<label className="block text-sm font-medium text-gray-700 mb-2">Error State (Visible Message)</label>
						<MobileNumberInput
							dialCode="+65"
							mobileNumber="abc"
							errorMessage="Mobile number must contain only digits"
							displayError={true}
							onDialCodeChange={() => {}}
							onMobileNumberChange={() => {}}
						/>
					</div>
				</div>
			</div>

			{/* Formik Integration */}
			<div className="space-y-6">
				<h3 className="text-lg font-semibold">Form Integration with Formik</h3>

				<form onSubmit={formData.handleSubmit} className="space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Error Border Only (displayError=false)
							</label>
							<MobileNumberInput
								dialCode={formData.values.dialCode}
								mobileNumber={formData.values.mobileNumber}
								onDialCodeChange={handleFormDialCodeChange}
								onMobileNumberChange={handleFormMobileNumberChange}
								errorMessage={formData.errors.mobileNumber}
								displayError={false}
								placeholder="Error border without message"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Error Border + Message (displayError=true)
							</label>
							<MobileNumberInput
								dialCode={formData.values.dialCode}
								mobileNumber={formData.values.mobileNumber}
								onDialCodeChange={handleFormDialCodeChange}
								onMobileNumberChange={handleFormMobileNumberChange}
								errorMessage={formData.errors.mobileNumber}
								displayError={true}
								placeholder="Error border with message"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">Optional Phone Number</label>
							<MobileNumberInput
								dialCode="+60"
								mobileNumber={formData.values.optionalPhone}
								onDialCodeChange={() => {}}
								onMobileNumberChange={handleOptionalPhoneChange}
								onBlur={() => formData.setFieldTouched('optionalPhone', true)}
								name="optionalPhone"
								errorMessage={formData.touched.optionalPhone || formData.submitCount > 0 ? formData.errors.optionalPhone : ''}
								placeholder="Optional phone number"
							/>
						</div>
					</div>

					<div className="flex gap-4">
						<Button type="submit" disabled={formData.isSubmitting}>
							{formData.isSubmitting ? 'Submitting...' : 'Submit Form'}
						</Button>
						<Button type="button" variant="outline" onClick={() => formData.resetForm()}>
							Reset Form
						</Button>
					</div>
				</form>
			</div>

			{/* Current Values Display */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="p-4 bg-gray-100 rounded-lg">
					<h4 className="font-semibold mb-2">Interactive Example Values:</h4>
					<div className="space-y-1 text-sm text-gray-600">
						<p>Dial Code: {dialCode}</p>
						<p>Mobile Number: {mobileNumber || 'Empty'}</p>
						<p>
							Full Number: {dialCode} {mobileNumber}
						</p>
						<p>Validation Error: {phoneError || 'None'}</p>
					</div>
				</div>

				<div className="p-4 bg-gray-100 rounded-lg">
					<h4 className="font-semibold mb-2">Formik Form Values:</h4>
					<div className="space-y-1 text-sm text-gray-600">
						<p>Dial Code: {formData.values.dialCode}</p>
						<p>Mobile Number: {formData.values.mobileNumber || 'Empty'}</p>
						<p>Optional Phone: {formData.values.optionalPhone || 'Empty'}</p>
						<p>Form Valid: {formData.isValid ? '✅' : '❌'}</p>
						<p>Errors: {Object.keys(formData.errors).length}</p>
					</div>
				</div>
			</div>

			{/* Usage Guidelines */}
			<div className="space-y-4">
				<div className="p-4 bg-blue-50 rounded-lg">
					<h4 className="text-sm font-semibold text-blue-700 mb-2">Props Reference:</h4>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-600">
						<div>
							<strong>Basic Props:</strong>
							<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
								<li><code>dialCode</code> - Selected country code (default: "+60")</li>
								<li><code>mobileNumber</code> - Phone number value</li>
								<li><code>placeholder</code> - Input placeholder text</li>
								<li><code>disabled</code> - Disable the entire component</li>
								<li><code>required</code> - Mark as required field</li>
								<li><code>className</code> - Additional CSS classes</li>
							</ul>
						</div>
						<div>
							<strong>Event Handlers:</strong>
							<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
								<li><code>onDialCodeChange</code> - Country code change callback</li>
								<li><code>onMobileNumberChange</code> - Phone number change callback</li>
								<li><code>onBlur</code> - Input blur event handler</li>
							</ul>
						</div>
						<div>
							<strong>Validation Props:</strong>
							<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
								<li><code>error</code> - Boolean to show error state</li>
								<li><code>errorMessage</code> - Error message text</li>
								<li><code>displayError</code> - Show/hide error message (default: true)</li>
							</ul>
						</div>
						<div>
							<strong>Form Integration:</strong>
							<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
								<li><code>name</code> - Form field name</li>
								<li>Works with Formik, React Hook Form, etc.</li>
								<li>Supports controlled component pattern</li>
							</ul>
						</div>
					</div>
				</div>

				<div className="p-4 bg-green-50 rounded-lg">
					<h4 className="text-sm font-semibold text-green-700 mb-2">Usage Guidelines:</h4>
					<ul className="text-sm text-green-600 space-y-1 list-disc list-inside">
						<li><strong>Error Display:</strong> Use <code>displayError=false</code> to show only error border without message text</li>
						<li><strong>Validation:</strong> Implement phone number validation based on selected country format</li>
						<li><strong>Country Codes:</strong> Currently supports Malaysia (+60), Singapore (+65), and Vietnam (+84)</li>
						<li><strong>Form Libraries:</strong> Integrate with form validation libraries like Formik or Yup for schema validation</li>
						<li><strong>Accessibility:</strong> Component includes proper aria-invalid attributes for screen readers</li>
						<li><strong>Mobile UX:</strong> Input type is set to "tel" for better mobile keyboard experience</li>
					</ul>
				</div>

				<div className="p-4 bg-gray-100 rounded-lg">
					<h4 className="text-sm font-semibold text-gray-700 mb-2">Code Example:</h4>
					<pre className="text-xs text-gray-600 overflow-x-auto whitespace-pre-wrap">
{`// Basic usage
<MobileNumberInput
  dialCode={dialCode}
  mobileNumber={mobileNumber}
  onDialCodeChange={setDialCode}
  onMobileNumberChange={setMobileNumber}
  placeholder="Enter your mobile number"
/>

// With validation
<MobileNumberInput
  dialCode={dialCode}
  mobileNumber={mobileNumber}
  onDialCodeChange={setDialCode}
  onMobileNumberChange={setMobileNumber}
  errorMessage="Mobile number is required"
  displayError={true}
  required
/>

// Formik integration
<MobileNumberInput
  dialCode={formik.values.dialCode}
  mobileNumber={formik.values.mobileNumber}
  onDialCodeChange={(value) => formik.setFieldValue('dialCode', value)}
  onMobileNumberChange={(value) => formik.setFieldValue('mobileNumber', value)}
  errorMessage={formik.errors.mobileNumber}
  name="mobileNumber"
/>`}
					</pre>
				</div>
			</div>
		</div>
	)
}
