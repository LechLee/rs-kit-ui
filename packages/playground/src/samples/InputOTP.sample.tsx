import { Fragment, useState } from 'react'
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
	Label,
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Badge,
	Separator,
	Switch,
	Alert,
	AlertDescription
} from '@rs-kit/ui-kit'
import {
	CheckIcon,
	XIcon,
	RefreshCwIcon,
	ShieldIcon,
	LockIcon,
	SmartphoneIcon,
	MailIcon,
	TimerIcon,
	InfoIcon,
	AlertTriangleIcon,
	EyeIcon,
	EyeOffIcon
} from 'lucide-react'
import { ComponentDoc } from '@/components/ComponentDoc'

// Two-Factor Authentication OTP
const TwoFactorOTP = () => {
	const [value, setValue] = useState('')
	const [isVerifying, setIsVerifying] = useState(false)
	const [isVerified, setIsVerified] = useState(false)
	const [error, setError] = useState('')
	const [timeLeft, setTimeLeft] = useState(30)

	const handleComplete = async (code: string) => {
		setIsVerifying(true)
		setError('')
		
		// Simulate verification
		await new Promise(resolve => setTimeout(resolve, 1500))
		
		if (code === '123456') {
			setIsVerified(true)
		} else {
			setError('Invalid code. Please try again.')
			setValue('')
		}
		setIsVerifying(false)
	}

	const handleResend = () => {
		setTimeLeft(30)
		setValue('')
		setError('')
		setIsVerified(false)
	}

	return (
		<div className="space-y-4">
			<div className="text-center space-y-2">
				<div className="flex items-center justify-center gap-2">
					<ShieldIcon className="w-5 h-5 text-blue-600" />
					<Label className="text-lg font-semibold">Two-Factor Authentication</Label>
				</div>
				<p className="text-sm text-muted-foreground">
					Enter the 6-digit code from your authenticator app
				</p>
			</div>

			<div className="space-y-3">
				<InputOTP
					maxLength={6}
					value={value}
					onChange={setValue}
					onComplete={handleComplete}
					disabled={isVerifying || isVerified}
				>
					<InputOTPGroup>
						<InputOTPSlot index={0} />
						<InputOTPSlot index={1} />
						<InputOTPSlot index={2} />
					</InputOTPGroup>
					<InputOTPSeparator />
					<InputOTPGroup>
						<InputOTPSlot index={3} />
						<InputOTPSlot index={4} />
						<InputOTPSlot index={5} />
					</InputOTPGroup>
				</InputOTP>

				{error && (
					<Alert variant="destructive">
						<AlertTriangleIcon className="h-4 w-4" />
						<AlertDescription>{error}</AlertDescription>
					</Alert>
				)}

				{isVerified && (
					<Alert>
						<CheckIcon className="h-4 w-4" />
						<AlertDescription>Successfully verified!</AlertDescription>
					</Alert>
				)}
			</div>

			<div className="flex items-center justify-between text-sm">
				<div className="flex items-center gap-1 text-muted-foreground">
					<TimerIcon className="w-4 h-4" />
					<span>Code expires in {timeLeft}s</span>
				</div>
				<Button variant="ghost" size="sm" onClick={handleResend} disabled={timeLeft > 0}>
					<RefreshCwIcon className="w-4 h-4 mr-1" />
					Resend Code
				</Button>
			</div>

			{isVerifying && (
				<div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
					<RefreshCwIcon className="w-4 h-4 animate-spin" />
					Verifying code...
				</div>
			)}
		</div>
	)
}

// SMS Verification OTP
const SMSVerificationOTP = () => {
	const [value, setValue] = useState('')
	const [phoneNumber] = useState('+1 (555) 123-4567')
	const [isComplete, setIsComplete] = useState(false)

	const handleComplete = (code: string) => {
		setIsComplete(true)
	}

	return (
		<div className="space-y-4">
			<div className="text-center space-y-2">
				<div className="flex items-center justify-center gap-2">
					<SmartphoneIcon className="w-5 h-5 text-green-600" />
					<Label className="text-lg font-semibold">SMS Verification</Label>
				</div>
				<p className="text-sm text-muted-foreground">
					We sent a 4-digit code to <strong>{phoneNumber}</strong>
				</p>
			</div>

			<InputOTP
				maxLength={4}
				value={value}
				onChange={setValue}
				onComplete={handleComplete}
				pattern="[0-9]*"
			>
				<InputOTPGroup className="gap-3">
					<InputOTPSlot index={0} className="w-12 h-12 text-lg" />
					<InputOTPSlot index={1} className="w-12 h-12 text-lg" />
					<InputOTPSlot index={2} className="w-12 h-12 text-lg" />
					<InputOTPSlot index={3} className="w-12 h-12 text-lg" />
				</InputOTPGroup>
			</InputOTP>

			{isComplete && (
				<div className="flex items-center justify-center gap-2 text-sm text-green-600">
					<CheckIcon className="w-4 h-4" />
					Phone number verified
				</div>
			)}

			<div className="text-center">
				<Button variant="link" size="sm">
					Didn't receive the code? Resend
				</Button>
			</div>
		</div>
	)
}

// Email Verification OTP
const EmailVerificationOTP = () => {
	const [value, setValue] = useState('')
	const [showValue, setShowValue] = useState(false)
	const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

	const handleComplete = (code: string) => {
		// Simulate validation
		if (code.toLowerCase() === 'verify') {
			setStatus('success')
		} else {
			setStatus('error')
			setTimeout(() => {
				setValue('')
				setStatus('idle')
			}, 2000)
		}
	}

	return (
		<div className="space-y-4">
			<div className="text-center space-y-2">
				<div className="flex items-center justify-center gap-2">
					<MailIcon className="w-5 h-5 text-blue-600" />
					<Label className="text-lg font-semibold">Email Verification</Label>
				</div>
				<p className="text-sm text-muted-foreground">
					Enter the verification code from your email
				</p>
				<p className="text-xs text-muted-foreground">
					(Hint: type "VERIFY" to succeed)
				</p>
			</div>

			<div className="space-y-3">
				<div className="flex items-center gap-2">
					<Button
						variant="ghost"
						size="sm"
						onClick={() => setShowValue(!showValue)}
					>
						{showValue ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
					</Button>
					<Label className="text-sm">Show entered code</Label>
				</div>

				<InputOTP
					maxLength={6}
					value={value}
					onChange={setValue}
					onComplete={handleComplete}
					pattern="[a-zA-Z]*"
				>
					<InputOTPGroup>
						<InputOTPSlot index={0} className={showValue ? '' : 'text-transparent'} />
						<InputOTPSlot index={1} className={showValue ? '' : 'text-transparent'} />
						<InputOTPSlot index={2} className={showValue ? '' : 'text-transparent'} />
						<InputOTPSlot index={3} className={showValue ? '' : 'text-transparent'} />
						<InputOTPSlot index={4} className={showValue ? '' : 'text-transparent'} />
						<InputOTPSlot index={5} className={showValue ? '' : 'text-transparent'} />
					</InputOTPGroup>
				</InputOTP>

				{status === 'success' && (
					<Alert>
						<CheckIcon className="h-4 w-4" />
						<AlertDescription>Email verified successfully!</AlertDescription>
					</Alert>
				)}

				{status === 'error' && (
					<Alert variant="destructive">
						<XIcon className="h-4 w-4" />
						<AlertDescription>Invalid verification code</AlertDescription>
					</Alert>
				)}
			</div>

			<div className="text-center text-sm text-muted-foreground">
				Current input: {showValue ? value || '(empty)' : '●'.repeat(value.length) || '(empty)'}
			</div>
		</div>
	)
}

// Payment Confirmation OTP
const PaymentConfirmationOTP = () => {
	const [value, setValue] = useState('')
	const [isProcessing, setIsProcessing] = useState(false)
	const [isComplete, setIsComplete] = useState(false)

	const handleComplete = async (code: string) => {
		setIsProcessing(true)
		await new Promise(resolve => setTimeout(resolve, 2000))
		setIsProcessing(false)
		setIsComplete(true)
	}

	return (
		<div className="space-y-4">
			<div className="text-center space-y-2">
				<div className="flex items-center justify-center gap-2">
					<LockIcon className="w-5 h-5 text-orange-600" />
					<Label className="text-lg font-semibold">Confirm Payment</Label>
				</div>
				<p className="text-sm text-muted-foreground">
					Enter your security code to authorize the payment of <strong>$1,234.56</strong>
				</p>
			</div>

			<div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
				<div className="flex items-start gap-3">
					<InfoIcon className="w-5 h-5 text-orange-600 mt-0.5" />
					<div className="space-y-1">
						<p className="text-sm font-medium text-orange-800">Security Notice</p>
						<p className="text-sm text-orange-700">
							This payment will be processed immediately and cannot be undone.
						</p>
					</div>
				</div>
			</div>

			<InputOTP
				maxLength={8}
				value={value}
				onChange={setValue}
				onComplete={handleComplete}
				disabled={isProcessing || isComplete}
			>
				<InputOTPGroup>
					<InputOTPSlot index={0} />
					<InputOTPSlot index={1} />
					<InputOTPSlot index={2} />
					<InputOTPSlot index={3} />
				</InputOTPGroup>
				<InputOTPSeparator />
				<InputOTPGroup>
					<InputOTPSlot index={4} />
					<InputOTPSlot index={5} />
					<InputOTPSlot index={6} />
					<InputOTPSlot index={7} />
				</InputOTPGroup>
			</InputOTP>

			{isProcessing && (
				<div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
					<RefreshCwIcon className="w-4 h-4 animate-spin" />
					Processing payment...
				</div>
			)}

			{isComplete && (
				<Alert>
					<CheckIcon className="h-4 w-4" />
					<AlertDescription>Payment authorized successfully!</AlertDescription>
				</Alert>
			)}
		</div>
	)
}

// Basic Examples (preserved from original but enhanced)
function InputOTPSimple() {
	return (
		<div className="grid gap-2">
			<Label htmlFor="simple">Basic 6-Digit Code</Label>
			<InputOTP id="simple" maxLength={6}>
				<InputOTPGroup>
					<InputOTPSlot index={0} />
					<InputOTPSlot index={1} />
					<InputOTPSlot index={2} />
				</InputOTPGroup>
				<InputOTPSeparator />
				<InputOTPGroup>
					<InputOTPSlot index={3} />
					<InputOTPSlot index={4} />
					<InputOTPSlot index={5} />
				</InputOTPGroup>
			</InputOTP>
		</div>
	)
}

function InputOTPPattern() {
	return (
		<div className="grid gap-2">
			<Label htmlFor="digits-only">Digits Only (0-9)</Label>
			<InputOTP id="digits-only" maxLength={6} pattern={'[0-9]*'}>
				<InputOTPGroup>
					<InputOTPSlot index={0} />
					<InputOTPSlot index={1} />
					<InputOTPSlot index={2} />
					<InputOTPSlot index={3} />
					<InputOTPSlot index={4} />
					<InputOTPSlot index={5} />
				</InputOTPGroup>
			</InputOTP>
			<p className="text-xs text-muted-foreground">Only numbers are allowed</p>
		</div>
	)
}

function InputOTPWithSeparator() {
	const [value, setValue] = useState('')

	return (
		<div className="grid gap-2">
			<Label htmlFor="with-separator">Multiple Separators</Label>
			<InputOTP id="with-separator" maxLength={6} value={value} onChange={setValue}>
				<InputOTPGroup>
					<InputOTPSlot index={0} />
					<InputOTPSlot index={1} />
				</InputOTPGroup>
				<InputOTPSeparator />
				<InputOTPGroup>
					<InputOTPSlot index={2} />
					<InputOTPSlot index={3} />
				</InputOTPGroup>
				<InputOTPSeparator />
				<InputOTPGroup>
					<InputOTPSlot index={4} />
					<InputOTPSlot index={5} />
				</InputOTPGroup>
			</InputOTP>
			<p className="text-xs text-muted-foreground">Current value: {value || 'Empty'}</p>
		</div>
	)
}

function InputOTPWithSpacing() {
	const [value, setValue] = useState('')

	return (
		<div className="grid gap-2">
			<Label htmlFor="with-spacing">Custom Styling</Label>
			<InputOTP id="with-spacing" maxLength={4} value={value} onChange={setValue}>
				<InputOTPGroup className="gap-3">
					<InputOTPSlot index={0} className="w-12 h-12 text-lg font-bold border-2 rounded-lg" />
					<InputOTPSlot index={1} className="w-12 h-12 text-lg font-bold border-2 rounded-lg" />
					<InputOTPSlot index={2} className="w-12 h-12 text-lg font-bold border-2 rounded-lg" />
					<InputOTPSlot index={3} className="w-12 h-12 text-lg font-bold border-2 rounded-lg" />
				</InputOTPGroup>
			</InputOTP>
			<p className="text-xs text-muted-foreground">Larger slots with custom styling</p>
		</div>
	)
}

export default function InputOTPSample() {
	const [showAdvanced, setShowAdvanced] = useState(false)

	return (
		<Fragment>
			<ComponentDoc
				title="Input OTP"
				description="Secure one-time password inputs for authentication, verification, and payment confirmation. Provides accessible input handling with flexible layouts and validation."
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
							<Badge variant="outline">{showAdvanced ? '8' : '4'} Examples</Badge>
						</div>

						{/* Real-World Examples */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Real-World Applications</h3>
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<ShieldIcon className="w-5 h-5" />
											Two-Factor Authentication
										</CardTitle>
										<CardDescription>Secure authentication with time-limited codes</CardDescription>
									</CardHeader>
									<CardContent>
										<TwoFactorOTP />
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<SmartphoneIcon className="w-5 h-5" />
											SMS Verification
										</CardTitle>
										<CardDescription>Phone number verification via SMS</CardDescription>
									</CardHeader>
									<CardContent>
										<SMSVerificationOTP />
									</CardContent>
								</Card>
							</div>
						</div>

						<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<MailIcon className="w-5 h-5" />
										Email Verification
									</CardTitle>
									<CardDescription>Email-based verification with show/hide option</CardDescription>
								</CardHeader>
								<CardContent>
									<EmailVerificationOTP />
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<LockIcon className="w-5 h-5" />
										Payment Confirmation
									</CardTitle>
									<CardDescription>Secure payment authorization</CardDescription>
								</CardHeader>
								<CardContent>
									<PaymentConfirmationOTP />
								</CardContent>
							</Card>
						</div>

						{/* Basic Examples */}
						{showAdvanced && (
							<>
								<div>
									<h3 className="text-lg font-semibold mb-4">Basic Variations</h3>
									<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
										<Card>
											<CardHeader>
												<CardTitle>Basic Layout</CardTitle>
												<CardDescription>Standard 6-digit code with separator</CardDescription>
											</CardHeader>
											<CardContent>
												<InputOTPSimple />
											</CardContent>
										</Card>

										<Card>
											<CardHeader>
												<CardTitle>Input Patterns</CardTitle>
												<CardDescription>Restricted to specific character types</CardDescription>
											</CardHeader>
											<CardContent>
												<InputOTPPattern />
											</CardContent>
										</Card>
									</div>
								</div>

								<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
									<Card>
										<CardHeader>
											<CardTitle>Multiple Separators</CardTitle>
											<CardDescription>Grouped input with multiple separators</CardDescription>
										</CardHeader>
										<CardContent>
											<InputOTPWithSeparator />
										</CardContent>
									</Card>

									<Card>
										<CardHeader>
											<CardTitle>Custom Styling</CardTitle>
											<CardDescription>Custom sizes and visual styling</CardDescription>
										</CardHeader>
										<CardContent>
											<InputOTPWithSpacing />
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
								<CardDescription>Best practices for implementing OTP inputs</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div>
										<h4 className="font-semibold mb-2">When to Use</h4>
										<ul className="space-y-1 text-sm text-muted-foreground">
											<li>• Two-factor authentication and account security</li>
											<li>• Phone number and email verification</li>
											<li>• Payment and transaction authorization</li>
											<li>• Account recovery and password reset</li>
											<li>• Sensitive action confirmations</li>
										</ul>
									</div>
									<Separator />
									<div>
										<h4 className="font-semibold mb-2">Design Principles</h4>
										<ul className="space-y-1 text-sm text-muted-foreground">
											<li>• Use appropriate input patterns for the expected format</li>
											<li>• Provide clear instructions and context</li>
											<li>• Include resend options with reasonable timeouts</li>
											<li>• Show validation feedback immediately</li>
											<li>• Consider accessibility for screen readers</li>
											<li>• Auto-advance to next field when appropriate</li>
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
									<p><strong>Total Examples:</strong> {showAdvanced ? '8' : '4'}</p>
								</div>
								<div>
									<p><strong>Use Cases:</strong> 2FA, SMS, Email, Payment{showAdvanced ? ', Basic, Pattern, Separator, Custom' : ''}</p>
									<p><strong>Features:</strong> Validation, Auto-complete, Patterns, Styling</p>
								</div>
							</div>
						</div>
					</div>
				}
			/>
		</Fragment>
	)
}
