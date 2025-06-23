import { Fragment, useState } from 'react'
import { Switch, Label, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Badge, Separator, Alert, AlertDescription, Input } from '@rs-kit/ui-kit'
import {
	AirplayIcon,
	WifiIcon,
	BluetoothIcon,
	BatteryIcon,
	MapPin,
	BellIcon,
	ShieldIcon,
	EyeIcon,
	MoonIcon,
	SunIcon,
	VolumeIcon,
	ZapIcon,
	GlobeIcon,
	LockIcon,
	SettingsIcon,
	UserIcon,
	MailIcon,
	SmartphoneIcon,
	MonitorIcon,
	CloudIcon,
	CheckIcon,
	InfoIcon,
	ToggleLeftIcon
} from 'lucide-react'
import { ComponentDoc } from '@/components/ComponentDoc'

// Device Settings Panel
const DeviceSettingsPanel = () => {
	const [settings, setSettings] = useState({
		airplaneMode: false,
		wifi: true,
		bluetooth: true,
		location: false,
		batteryOptimization: true,
		autoRotate: false
	})

	const updateSetting = (key: string, value: boolean) => {
		setSettings((prev) => ({ ...prev, [key]: value }))
	}

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold">Device Settings</Label>
				<p className="text-sm text-muted-foreground">Manage your device connectivity and features</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="space-y-4">
					<div className="flex items-center justify-between p-3 border rounded-lg">
						<div className="flex items-center gap-3">
							<AirplayIcon className="w-5 h-5 text-muted-foreground" />
							<div>
								<Label htmlFor="airplane-mode" className="font-medium">
									Airplane Mode
								</Label>
								<p className="text-sm text-muted-foreground">Disable all wireless connections</p>
							</div>
						</div>
						<Switch id="airplane-mode" checked={settings.airplaneMode} onCheckedChange={(checked) => updateSetting('airplaneMode', checked)} />
					</div>

					<div className="flex items-center justify-between p-3 border rounded-lg">
						<div className="flex items-center gap-3">
							<WifiIcon className="w-5 h-5 text-muted-foreground" />
							<div>
								<Label htmlFor="wifi" className="font-medium">
									Wi-Fi
								</Label>
								<p className="text-sm text-muted-foreground">Connect to wireless networks</p>
							</div>
						</div>
						<Switch id="wifi" checked={settings.wifi && !settings.airplaneMode} onCheckedChange={(checked) => updateSetting('wifi', checked)} disabled={settings.airplaneMode} />
					</div>

					<div className="flex items-center justify-between p-3 border rounded-lg">
						<div className="flex items-center gap-3">
							<BluetoothIcon className="w-5 h-5 text-muted-foreground" />
							<div>
								<Label htmlFor="bluetooth" className="font-medium">
									Bluetooth
								</Label>
								<p className="text-sm text-muted-foreground">Connect to nearby devices</p>
							</div>
						</div>
						<Switch
							id="bluetooth"
							checked={settings.bluetooth && !settings.airplaneMode}
							onCheckedChange={(checked) => updateSetting('bluetooth', checked)}
							disabled={settings.airplaneMode}
						/>
					</div>
				</div>

				<div className="space-y-4">
					<div className="flex items-center justify-between p-3 border rounded-lg">
						<div className="flex items-center gap-3">
							<MapPin className="w-5 h-5 text-muted-foreground" />
							<div>
								<Label htmlFor="location" className="font-medium">
									Location Services
								</Label>
								<p className="text-sm text-muted-foreground">Allow apps to access your location</p>
							</div>
						</div>
						<Switch id="location" checked={settings.location} onCheckedChange={(checked) => updateSetting('location', checked)} />
					</div>

					<div className="flex items-center justify-between p-3 border rounded-lg">
						<div className="flex items-center gap-3">
							<BatteryIcon className="w-5 h-5 text-muted-foreground" />
							<div>
								<Label htmlFor="battery-optimization" className="font-medium">
									Battery Optimization
								</Label>
								<p className="text-sm text-muted-foreground">Extend battery life automatically</p>
							</div>
						</div>
						<Switch id="battery-optimization" checked={settings.batteryOptimization} onCheckedChange={(checked) => updateSetting('batteryOptimization', checked)} />
					</div>

					<div className="flex items-center justify-between p-3 border rounded-lg">
						<div className="flex items-center gap-3">
							<MonitorIcon className="w-5 h-5 text-muted-foreground" />
							<div>
								<Label htmlFor="auto-rotate" className="font-medium">
									Auto-Rotate Screen
								</Label>
								<p className="text-sm text-muted-foreground">Rotate screen based on orientation</p>
							</div>
						</div>
						<Switch id="auto-rotate" checked={settings.autoRotate} onCheckedChange={(checked) => updateSetting('autoRotate', checked)} />
					</div>
				</div>
			</div>

			{settings.airplaneMode && (
				<Alert>
					<AirplayIcon className="h-4 w-4" />
					<AlertDescription>Airplane mode is enabled. Wireless features are disabled.</AlertDescription>
				</Alert>
			)}
		</div>
	)
}

// Privacy & Security Settings
const PrivacySecuritySettings = () => {
	const [privacy, setPrivacy] = useState({
		notifications: true,
		analytics: false,
		cookies: true,
		twoFactor: true,
		biometric: false,
		thirdPartyAccess: false
	})

	const updatePrivacy = (key: string, value: boolean) => {
		setPrivacy((prev) => ({ ...prev, [key]: value }))
	}

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold">Privacy & Security</Label>
				<p className="text-sm text-muted-foreground">Control your data privacy and security settings</p>
			</div>

			<div className="space-y-4">
				<div className="flex items-center justify-between p-4 border rounded-lg">
					<div className="flex items-center gap-3">
						<BellIcon className="w-5 h-5 text-muted-foreground" />
						<div>
							<Label htmlFor="notifications" className="font-medium">
								Push Notifications
							</Label>
							<p className="text-sm text-muted-foreground">Receive important updates and alerts</p>
						</div>
					</div>
					<Switch id="notifications" checked={privacy.notifications} onCheckedChange={(checked) => updatePrivacy('notifications', checked)} />
				</div>

				<div className="flex items-center justify-between p-4 border rounded-lg">
					<div className="flex items-center gap-3">
						<SettingsIcon className="w-5 h-5 text-muted-foreground" />
						<div>
							<Label htmlFor="analytics" className="font-medium">
								Usage Analytics
								<Badge variant="outline" className="ml-2 text-xs">
									Optional
								</Badge>
							</Label>
							<p className="text-sm text-muted-foreground">Help improve our service with anonymous usage data</p>
						</div>
					</div>
					<Switch id="analytics" checked={privacy.analytics} onCheckedChange={(checked) => updatePrivacy('analytics', checked)} />
				</div>

				<div className="flex items-center justify-between p-4 border rounded-lg">
					<div className="flex items-center gap-3">
						<GlobeIcon className="w-5 h-5 text-muted-foreground" />
						<div>
							<Label htmlFor="cookies" className="font-medium">
								Accept Cookies
							</Label>
							<p className="text-sm text-muted-foreground">Allow websites to store cookies for better experience</p>
						</div>
					</div>
					<Switch id="cookies" checked={privacy.cookies} onCheckedChange={(checked) => updatePrivacy('cookies', checked)} />
				</div>

				<Separator />

				<div className="flex items-center justify-between p-4 border rounded-lg bg-blue-50 border-blue-200">
					<div className="flex items-center gap-3">
						<ShieldIcon className="w-5 h-5 text-blue-600" />
						<div>
							<Label htmlFor="two-factor" className="font-medium text-blue-900">
								Two-Factor Authentication
								<Badge variant="secondary" className="ml-2 text-xs">
									Recommended
								</Badge>
							</Label>
							<p className="text-sm text-blue-700">Add an extra layer of security to your account</p>
						</div>
					</div>
					<Switch id="two-factor" checked={privacy.twoFactor} onCheckedChange={(checked) => updatePrivacy('twoFactor', checked)} />
				</div>

				<div className="flex items-center justify-between p-4 border rounded-lg">
					<div className="flex items-center gap-3">
						<EyeIcon className="w-5 h-5 text-muted-foreground" />
						<div>
							<Label htmlFor="biometric" className="font-medium">
								Biometric Login
							</Label>
							<p className="text-sm text-muted-foreground">Use fingerprint or face recognition</p>
						</div>
					</div>
					<Switch id="biometric" checked={privacy.biometric} onCheckedChange={(checked) => updatePrivacy('biometric', checked)} />
				</div>

				<div className="flex items-center justify-between p-4 border rounded-lg">
					<div className="flex items-center gap-3">
						<LockIcon className="w-5 h-5 text-muted-foreground" />
						<div>
							<Label htmlFor="third-party" className="font-medium">
								Third-party Access
							</Label>
							<p className="text-sm text-muted-foreground">Allow third-party apps to access your data</p>
						</div>
					</div>
					<Switch id="third-party" checked={privacy.thirdPartyAccess} onCheckedChange={(checked) => updatePrivacy('thirdPartyAccess', checked)} />
				</div>
			</div>

			<div className="p-4 bg-green-50 border border-green-200 rounded-lg">
				<h4 className="font-medium text-green-900 mb-2">Security Status</h4>
				<div className="flex flex-wrap gap-2">
					{privacy.twoFactor && (
						<Badge variant="secondary" className="text-green-700">
							2FA Enabled
						</Badge>
					)}
					{privacy.biometric && (
						<Badge variant="secondary" className="text-green-700">
							Biometric Active
						</Badge>
					)}
					{!privacy.thirdPartyAccess && (
						<Badge variant="secondary" className="text-green-700">
							Third-party Restricted
						</Badge>
					)}
				</div>
			</div>
		</div>
	)
}

// Appearance & Accessibility
const AppearanceAccessibility = () => {
	const [appearance, setAppearance] = useState({
		darkMode: false,
		highContrast: false,
		reducedMotion: false,
		largeFonts: false,
		soundEffects: true,
		hapticFeedback: true
	})

	const updateAppearance = (key: string, value: boolean) => {
		setAppearance((prev) => ({ ...prev, [key]: value }))
	}

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold">Appearance & Accessibility</Label>
				<p className="text-sm text-muted-foreground">Customize the interface to your preferences</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="space-y-4">
					<h4 className="font-semibold text-sm text-gray-700">Visual Settings</h4>

					<div className="flex items-center justify-between p-3 border rounded-lg">
						<div className="flex items-center gap-3">
							{appearance.darkMode ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
							<div>
								<Label htmlFor="dark-mode" className="font-medium">
									Dark Mode
								</Label>
								<p className="text-sm text-muted-foreground">Use dark theme for better night viewing</p>
							</div>
						</div>
						<Switch id="dark-mode" checked={appearance.darkMode} onCheckedChange={(checked) => updateAppearance('darkMode', checked)} />
					</div>

					<div className="flex items-center justify-between p-3 border rounded-lg">
						<div className="flex items-center gap-3">
							<EyeIcon className="w-5 h-5 text-muted-foreground" />
							<div>
								<Label htmlFor="high-contrast" className="font-medium">
									High Contrast
								</Label>
								<p className="text-sm text-muted-foreground">Increase contrast for better visibility</p>
							</div>
						</div>
						<Switch id="high-contrast" checked={appearance.highContrast} onCheckedChange={(checked) => updateAppearance('highContrast', checked)} />
					</div>

					<div className="flex items-center justify-between p-3 border rounded-lg">
						<div className="flex items-center gap-3">
							<ZapIcon className="w-5 h-5 text-muted-foreground" />
							<div>
								<Label htmlFor="large-fonts" className="font-medium">
									Large Fonts
								</Label>
								<p className="text-sm text-muted-foreground">Increase text size for easier reading</p>
							</div>
						</div>
						<Switch id="large-fonts" checked={appearance.largeFonts} onCheckedChange={(checked) => updateAppearance('largeFonts', checked)} />
					</div>
				</div>

				<div className="space-y-4">
					<h4 className="font-semibold text-sm text-gray-700">Motion & Feedback</h4>

					<div className="flex items-center justify-between p-3 border rounded-lg">
						<div className="flex items-center gap-3">
							<MonitorIcon className="w-5 h-5 text-muted-foreground" />
							<div>
								<Label htmlFor="reduced-motion" className="font-medium">
									Reduce Motion
								</Label>
								<p className="text-sm text-muted-foreground">Minimize animations and transitions</p>
							</div>
						</div>
						<Switch id="reduced-motion" checked={appearance.reducedMotion} onCheckedChange={(checked) => updateAppearance('reducedMotion', checked)} />
					</div>

					<div className="flex items-center justify-between p-3 border rounded-lg">
						<div className="flex items-center gap-3">
							<VolumeIcon className="w-5 h-5 text-muted-foreground" />
							<div>
								<Label htmlFor="sound-effects" className="font-medium">
									Sound Effects
								</Label>
								<p className="text-sm text-muted-foreground">Play sounds for interactions</p>
							</div>
						</div>
						<Switch id="sound-effects" checked={appearance.soundEffects} onCheckedChange={(checked) => updateAppearance('soundEffects', checked)} />
					</div>

					<div className="flex items-center justify-between p-3 border rounded-lg">
						<div className="flex items-center gap-3">
							<SmartphoneIcon className="w-5 h-5 text-muted-foreground" />
							<div>
								<Label htmlFor="haptic-feedback" className="font-medium">
									Haptic Feedback
								</Label>
								<p className="text-sm text-muted-foreground">Vibrate on touch interactions</p>
							</div>
						</div>
						<Switch id="haptic-feedback" checked={appearance.hapticFeedback} onCheckedChange={(checked) => updateAppearance('hapticFeedback', checked)} />
					</div>
				</div>
			</div>
		</div>
	)
}

// Basic Switch Examples
const BasicSwitchExamples = () => {
	const [basicSettings, setBasicSettings] = useState({
		airplaneMode: false,
		notifications: true,
		autoSave: true,
		darkMode: false
	})

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold">Basic Switch Examples</Label>
				<p className="text-sm text-muted-foreground">Simple on/off toggle controls</p>
			</div>

			<div className="space-y-4">
				<div className="flex items-center space-x-2">
					<Switch id="airplane-basic" checked={basicSettings.airplaneMode} onCheckedChange={(checked) => setBasicSettings((prev) => ({ ...prev, airplaneMode: checked }))} />
					<Label htmlFor="airplane-basic">Airplane Mode</Label>
				</div>

				<div className="flex items-center space-x-2">
					<Switch id="notifications-basic" checked={basicSettings.notifications} onCheckedChange={(checked) => setBasicSettings((prev) => ({ ...prev, notifications: checked }))} />
					<Label htmlFor="notifications-basic">Enable Notifications</Label>
				</div>

				<div className="flex items-center space-x-2">
					<Switch id="autosave-basic" checked={basicSettings.autoSave} onCheckedChange={(checked) => setBasicSettings((prev) => ({ ...prev, autoSave: checked }))} />
					<Label htmlFor="autosave-basic">Auto-save Documents</Label>
				</div>

				<div className="flex items-center space-x-2">
					<Switch id="darkmode-basic" checked={basicSettings.darkMode} onCheckedChange={(checked) => setBasicSettings((prev) => ({ ...prev, darkMode: checked }))} />
					<Label htmlFor="darkmode-basic">Dark Mode</Label>
				</div>

				<div className="flex items-center space-x-2 opacity-50">
					<Switch id="disabled-basic" disabled />
					<Label htmlFor="disabled-basic" className="text-muted-foreground">
						Disabled Switch
					</Label>
				</div>
			</div>
		</div>
	)
}

export default function SwitchSample() {
	const [showAdvanced, setShowAdvanced] = useState(false)

	return (
		<Fragment>
			<ComponentDoc
				title="Switch"
				description="Binary toggle controls for enabling/disabling features and settings. Perfect for preferences, device settings, privacy controls, and any on/off functionality."
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
							<Badge variant="outline">{showAdvanced ? '4' : '3'} Examples</Badge>
						</div>

						{/* Real-World Examples */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Settings Applications</h3>
							<div className="grid grid-cols-1 gap-8">
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<SmartphoneIcon className="w-5 h-5" />
											Device Settings
										</CardTitle>
										<CardDescription>Connectivity and device feature controls with interdependent settings</CardDescription>
									</CardHeader>
									<CardContent>
										<DeviceSettingsPanel />
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<ShieldIcon className="w-5 h-5" />
											Privacy & Security
										</CardTitle>
										<CardDescription>Data privacy controls and security feature management</CardDescription>
									</CardHeader>
									<CardContent>
										<PrivacySecuritySettings />
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<EyeIcon className="w-5 h-5" />
											Appearance & Accessibility
										</CardTitle>
										<CardDescription>Visual preferences and accessibility options for better user experience</CardDescription>
									</CardHeader>
									<CardContent>
										<AppearanceAccessibility />
									</CardContent>
								</Card>
							</div>
						</div>

						{/* Basic Examples */}
						{showAdvanced && (
							<div>
								<h3 className="text-lg font-semibold mb-4">Basic Examples</h3>
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<ToggleLeftIcon className="w-5 h-5" />
											Basic Switches
										</CardTitle>
										<CardDescription>Simple on/off toggles with labels</CardDescription>
									</CardHeader>
									<CardContent>
										<BasicSwitchExamples />
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
								<CardDescription>Best practices for implementing switch controls</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div>
										<h4 className="font-semibold mb-2">When to Use</h4>
										<ul className="space-y-1 text-sm text-muted-foreground">
											<li>• For binary choices that take effect immediately</li>
											<li>• To enable or disable features, settings, or preferences</li>
											<li>• When the action doesn't require additional confirmation</li>
											<li>• For device settings like Wi-Fi, Bluetooth, notifications</li>
											<li>• For user preferences that can be easily reversed</li>
										</ul>
									</div>
									<Separator />
									<div>
										<h4 className="font-semibold mb-2">Design Principles</h4>
										<ul className="space-y-1 text-sm text-muted-foreground">
											<li>• Always provide clear labels that describe what the switch controls</li>
											<li>• Group related switches with section headers</li>
											<li>• Use descriptive help text for complex or important settings</li>
											<li>• Consider interdependencies between switches (disable related options)</li>
											<li>• Provide visual feedback for important security settings</li>
											<li>• Ensure switches are large enough for easy interaction</li>
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
										<strong>Settings Types:</strong> Device, Privacy, Appearance{showAdvanced ? ', Basic' : ''}
									</p>
									<p>
										<strong>Features:</strong> Interdependencies, Grouping, Security Status
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
