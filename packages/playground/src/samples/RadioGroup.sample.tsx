import { Fragment, useState } from 'react'
import {
	RadioGroup,
	RadioGroupItem,
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
	AlertDescription,
	Input,
	Textarea
} from '@rs-kit/ui-kit'
import {
	CreditCardIcon,
	TruckIcon,
	ZapIcon,
	ShieldIcon,
	StarIcon,
	CircleIcon,
	SquareIcon,
	TriangleIcon,
	HeartIcon,
	MoonIcon,
	SunIcon,
	MonitorIcon,
	SmartphoneIcon,
	TabletIcon,
	LaptopIcon,
	DesktopComputerIcon,
	GlobeIcon,
	LockIcon,
	EyeIcon,
	InfoIcon,
	CheckIcon,
	XIcon,
	SettingsIcon,
	PaletteIcon,
	LayoutIcon,
	UserIcon,
	MapPinIcon,
	CalendarIcon,
	ClockIcon
} from 'lucide-react'
import { ComponentDoc } from '@/components/ComponentDoc'

// Payment Method Selection
const PaymentMethodSelection = () => {
	const [paymentMethod, setPaymentMethod] = useState('card')
	const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '' })

	return (
		<div className="space-y-4">
			<div>
				<Label className="text-lg font-semibold">Payment Method</Label>
				<p className="text-sm text-muted-foreground">Select your preferred payment method</p>
			</div>

			<RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
				<div className="space-y-3">
					<div className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50">
						<RadioGroupItem value="card" id="payment-card" className="mt-1" />
						<div className="flex-1">
							<Label htmlFor="payment-card" className="flex items-center gap-2 font-medium cursor-pointer">
								<CreditCardIcon className="w-5 h-5" />
								Credit/Debit Card
							</Label>
							<p className="text-sm text-muted-foreground mt-1">
								Pay securely with your card
							</p>
						</div>
						<Badge variant="secondary">Most Popular</Badge>
					</div>

					<div className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50">
						<RadioGroupItem value="paypal" id="payment-paypal" className="mt-1" />
						<div className="flex-1">
							<Label htmlFor="payment-paypal" className="flex items-center gap-2 font-medium cursor-pointer">
								<GlobeIcon className="w-5 h-5" />
								PayPal
							</Label>
							<p className="text-sm text-muted-foreground mt-1">
								Pay with your PayPal account
							</p>
						</div>
					</div>

					<div className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50">
						<RadioGroupItem value="crypto" id="payment-crypto" className="mt-1" />
						<div className="flex-1">
							<Label htmlFor="payment-crypto" className="flex items-center gap-2 font-medium cursor-pointer">
								<ZapIcon className="w-5 h-5" />
								Cryptocurrency
							</Label>
							<p className="text-sm text-muted-foreground mt-1">
								Pay with Bitcoin, Ethereum, or other crypto
							</p>
						</div>
						<Badge variant="outline">New</Badge>
					</div>
				</div>
			</RadioGroup>

			{paymentMethod === 'card' && (
				<div className="space-y-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
					<h4 className="font-medium text-blue-900">Card Details</h4>
					<div className="grid grid-cols-1 gap-3">
						<Input 
							placeholder="Card Number" 
							value={cardDetails.number}
							onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
						/>
						<div className="grid grid-cols-2 gap-3">
							<Input 
								placeholder="MM/YY" 
								value={cardDetails.expiry}
								onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
							/>
							<Input 
								placeholder="CVV" 
								value={cardDetails.cvv}
								onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
							/>
						</div>
					</div>
				</div>
			)}

			<Alert>
				<ShieldIcon className="h-4 w-4" />
				<AlertDescription>
					Selected: <strong>{paymentMethod === 'card' ? 'Credit/Debit Card' : paymentMethod === 'paypal' ? 'PayPal' : 'Cryptocurrency'}</strong>
				</AlertDescription>
			</Alert>
		</div>
	)
}

// Shipping Options
const ShippingOptions = () => {
	const [shipping, setShipping] = useState('standard')

	const shippingOptions = [
		{
			id: 'standard',
			name: 'Standard Shipping',
			description: '5-7 business days',
			price: 'Free',
			icon: TruckIcon
		},
		{
			id: 'express',
			name: 'Express Shipping',
			description: '2-3 business days',
			price: '$9.99',
			icon: ZapIcon
		},
		{
			id: 'overnight',
			name: 'Overnight Delivery',
			description: 'Next business day',
			price: '$24.99',
			icon: StarIcon
		}
	]

	return (
		<div className="space-y-4">
			<div>
				<Label className="text-lg font-semibold">Shipping Options</Label>
				<p className="text-sm text-muted-foreground">Choose your delivery speed</p>
			</div>

			<RadioGroup value={shipping} onValueChange={setShipping}>
				<div className="space-y-3">
					{shippingOptions.map((option) => {
						const IconComponent = option.icon
						return (
							<div key={option.id} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
								<RadioGroupItem value={option.id} id={`shipping-${option.id}`} />
								<IconComponent className="w-5 h-5 text-muted-foreground" />
								<div className="flex-1">
									<Label htmlFor={`shipping-${option.id}`} className="font-medium cursor-pointer">
										{option.name}
									</Label>
									<p className="text-sm text-muted-foreground">{option.description}</p>
								</div>
								<div className="text-right">
									<p className="font-semibold">{option.price}</p>
								</div>
							</div>
						)
					})}
				</div>
			</RadioGroup>
		</div>
	)
}

// Theme Selection
const ThemeSelection = () => {
	const [theme, setTheme] = useState('system')

	return (
		<div className="space-y-4">
			<div>
				<Label className="text-lg font-semibold">Theme Preference</Label>
				<p className="text-sm text-muted-foreground">Choose how the interface appears</p>
			</div>

			<RadioGroup value={theme} onValueChange={setTheme} className="grid grid-cols-3 gap-4">
				<div>
					<RadioGroupItem value="light" id="theme-light" className="peer sr-only" />
					<Label
						htmlFor="theme-light"
						className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary cursor-pointer"
					>
						<SunIcon className="w-6 h-6 mb-3" />
						<span className="font-medium">Light</span>
						<span className="text-sm text-muted-foreground text-center">Bright and clean</span>
					</Label>
				</div>

				<div>
					<RadioGroupItem value="dark" id="theme-dark" className="peer sr-only" />
					<Label
						htmlFor="theme-dark"
						className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary cursor-pointer"
					>
						<MoonIcon className="w-6 h-6 mb-3" />
						<span className="font-medium">Dark</span>
						<span className="text-sm text-muted-foreground text-center">Easy on the eyes</span>
					</Label>
				</div>

				<div>
					<RadioGroupItem value="system" id="theme-system" className="peer sr-only" />
					<Label
						htmlFor="theme-system"
						className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary cursor-pointer"
					>
						<MonitorIcon className="w-6 h-6 mb-3" />
						<span className="font-medium">System</span>
						<span className="text-sm text-muted-foreground text-center">Matches your OS</span>
					</Label>
				</div>
			</RadioGroup>
		</div>
	)
}

// Device Selection
const DeviceSelection = () => {
	const [device, setDevice] = useState('laptop')

	const devices = [
		{ id: 'phone', name: 'Phone', icon: SmartphoneIcon, description: 'Mobile optimized' },
		{ id: 'tablet', name: 'Tablet', icon: TabletIcon, description: 'Touch-friendly' },
		{ id: 'laptop', name: 'Laptop', icon: LaptopIcon, description: 'Portable computing' },
		{ id: 'desktop', name: 'Desktop', icon: MonitorIcon, description: 'Full experience' }
	]

	return (
		<div className="space-y-4">
			<div>
				<Label className="text-lg font-semibold">Primary Device</Label>
				<p className="text-sm text-muted-foreground">Select your main device for optimization</p>
			</div>

			<RadioGroup value={device} onValueChange={setDevice} className="grid grid-cols-2 gap-4">
				{devices.map((deviceOption) => {
					const IconComponent = deviceOption.icon
					return (
						<div key={deviceOption.id}>
							<RadioGroupItem value={deviceOption.id} id={`device-${deviceOption.id}`} className="peer sr-only" />
							<Label
								htmlFor={`device-${deviceOption.id}`}
								className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary cursor-pointer"
							>
								<IconComponent className="w-8 h-8 mb-3" />
								<span className="font-medium">{deviceOption.name}</span>
								<span className="text-sm text-muted-foreground text-center">{deviceOption.description}</span>
							</Label>
						</div>
					)
				})}
			</RadioGroup>
		</div>
	)
}

// Basic Radio Group (preserved from original)
const BasicRadioGroup = () => {
	const [value, setValue] = useState('comfortable')

	return (
		<div className="space-y-3">
			<Label className="text-lg font-semibold">Density</Label>
			<RadioGroup value={value} onValueChange={setValue}>
				<div className="flex items-center space-x-2">
					<RadioGroupItem value="default" id="r1" />
					<Label htmlFor="r1">Default</Label>
				</div>
				<div className="flex items-center space-x-2">
					<RadioGroupItem value="comfortable" id="r2" />
					<Label htmlFor="r2">Comfortable</Label>
				</div>
				<div className="flex items-center space-x-2">
					<RadioGroupItem value="compact" id="r3" />
					<Label htmlFor="r3">Compact</Label>
				</div>
			</RadioGroup>
			<p className="text-sm text-muted-foreground">Selected: {value}</p>
		</div>
	)
}

export default function RadioGroupSample() {
	const [showAdvanced, setShowAdvanced] = useState(false)

	return (
		<Fragment>
			<ComponentDoc
				title="Radio Group"
				description="Single-selection controls for mutually exclusive options. Perfect for settings, preferences, and form selections where only one choice is allowed."
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
							<Badge variant="outline">{showAdvanced ? '6' : '3'} Examples</Badge>
						</div>

						{/* Real-World Examples */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Real-World Applications</h3>
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<CreditCardIcon className="w-5 h-5" />
											Payment Selection
										</CardTitle>
										<CardDescription>Payment method with conditional inputs</CardDescription>
									</CardHeader>
									<CardContent>
										<PaymentMethodSelection />
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<TruckIcon className="w-5 h-5" />
											Shipping Options
										</CardTitle>
										<CardDescription>Delivery speed with pricing</CardDescription>
									</CardHeader>
									<CardContent>
										<ShippingOptions />
									</CardContent>
								</Card>
							</div>
						</div>

						<div>
							<h3 className="text-lg font-semibold mb-4">Visual Selection Patterns</h3>
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<PaletteIcon className="w-5 h-5" />
											Theme Selection
										</CardTitle>
										<CardDescription>Visual cards with icons and descriptions</CardDescription>
									</CardHeader>
									<CardContent>
										<ThemeSelection />
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<MonitorIcon className="w-5 h-5" />
											Device Selection
										</CardTitle>
										<CardDescription>Grid layout with device optimization</CardDescription>
									</CardHeader>
									<CardContent>
										<DeviceSelection />
									</CardContent>
								</Card>
							</div>
						</div>

						{/* Basic Example */}
						{showAdvanced && (
							<div>
								<h3 className="text-lg font-semibold mb-4">Basic Example</h3>
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<LayoutIcon className="w-5 h-5" />
											Basic Radio Group
										</CardTitle>
										<CardDescription>Simple vertical layout with basic styling</CardDescription>
									</CardHeader>
									<CardContent>
										<BasicRadioGroup />
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
								<CardDescription>Best practices for implementing radio groups</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div>
										<h4 className="font-semibold mb-2">When to Use</h4>
										<ul className="space-y-1 text-sm text-muted-foreground">
											<li>• For mutually exclusive options (only one can be selected)</li>
											<li>• When there are 2-7 options to choose from</li>
											<li>• For settings, preferences, and configuration choices</li>
											<li>• When users need to see all available options at once</li>
											<li>• For payment methods, shipping options, and similar selections</li>
										</ul>
									</div>
									<Separator />
									<div>
										<h4 className="font-semibold mb-2">Design Principles</h4>
										<ul className="space-y-1 text-sm text-muted-foreground">
											<li>• Group related options with clear labels and descriptions</li>
											<li>• Use visual hierarchy to show option importance</li>
											<li>• Provide immediate feedback on selection changes</li>
											<li>• Consider card-based layouts for complex options</li>
											<li>• Include additional context like pricing or features</li>
											<li>• Ensure proper keyboard navigation and accessibility</li>
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
									<p><strong>Total Examples:</strong> {showAdvanced ? '6' : '5'}</p>
								</div>
								<div>
									<p><strong>Selection Types:</strong> Payment, Shipping, Theme, Device{showAdvanced ? ', Basic' : ''}</p>
									<p><strong>Layouts:</strong> Vertical, Horizontal, Grid, Card-based</p>
								</div>
							</div>
						</div>
					</div>
				}
			/>
		</Fragment>
	)
}
