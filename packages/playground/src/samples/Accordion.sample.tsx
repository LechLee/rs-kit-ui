import { Fragment, useState } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Button, Badge } from '@rs-kit/ui-kit'
import { ComponentDoc } from '@/components/ComponentDoc'
import { InfoIcon, HelpCircleIcon, SettingsIcon, UserIcon, ShieldIcon } from 'lucide-react'

export default function AccordionSample() {
	// State for controlled examples
	const [singleValue, setSingleValue] = useState<string>('')
	const [expandedSections, setExpandedSections] = useState<string[]>(['getting-started'])

	// Interactive handlers
	const handleExpandAll = () => {
		setExpandedSections(['getting-started', 'features', 'pricing', 'support'])
	}

	const handleCollapseAll = () => {
		setExpandedSections([])
	}

	return (
		<Fragment>
			<ComponentDoc
				title="Accordion"
				description="A vertically stacked set of interactive headings that each reveal a section of content. Perfect for FAQs, documentation, settings panels, and content organization."
				component={
					<div className="flex flex-col gap-8 w-full max-w-4xl">
						{/* Basic Accordion Types */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Basic Accordion Types</h3>
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
								<div>
									<h4 className="text-sm font-medium text-gray-600 mb-3">Single (Collapsible)</h4>
									<Accordion type="single" collapsible className="w-full">
										<AccordionItem value="item-1">
											<AccordionTrigger>What is an accordion?</AccordionTrigger>
											<AccordionContent>
												An accordion is a UI component that organizes content in collapsible sections. 
												It helps save space while allowing users to access detailed information on demand.
											</AccordionContent>
										</AccordionItem>
										<AccordionItem value="item-2">
											<AccordionTrigger>When should I use it?</AccordionTrigger>
											<AccordionContent>
												Use accordions for FAQs, documentation, settings panels, or any content that 
												benefits from being organized into expandable sections.
											</AccordionContent>
										</AccordionItem>
										<AccordionItem value="item-3">
											<AccordionTrigger>Is it accessible?</AccordionTrigger>
											<AccordionContent>
												Yes! Our accordion follows WAI-ARIA guidelines and supports keyboard navigation, 
												screen readers, and proper focus management.
											</AccordionContent>
										</AccordionItem>
									</Accordion>
								</div>

								<div>
									<h4 className="text-sm font-medium text-gray-600 mb-3">Multiple (Non-collapsible)</h4>
									<Accordion type="multiple" className="w-full" defaultValue={['feature-1']}>
										<AccordionItem value="feature-1">
											<AccordionTrigger>Responsive Design</AccordionTrigger>
											<AccordionContent>
												Built with mobile-first approach, automatically adapts to different screen sizes 
												and provides optimal user experience across devices.
											</AccordionContent>
										</AccordionItem>
										<AccordionItem value="feature-2">
											<AccordionTrigger>Customizable Styling</AccordionTrigger>
											<AccordionContent>
												Easily customize colors, spacing, animations, and icons to match your brand 
												and design system requirements.
											</AccordionContent>
										</AccordionItem>
										<AccordionItem value="feature-3">
											<AccordionTrigger>Performance Optimized</AccordionTrigger>
											<AccordionContent>
												Lightweight implementation with smooth animations and minimal performance impact 
												on your application.
											</AccordionContent>
										</AccordionItem>
									</Accordion>
								</div>
							</div>
						</div>

						{/* FAQ Example */}
						<div>
							<h3 className="text-lg font-semibold mb-4">FAQ Accordion</h3>
							<Accordion type="single" collapsible className="w-full">
								<AccordionItem value="faq-1">
									<AccordionTrigger className="text-left">
										<div className="flex items-center gap-2">
											<HelpCircleIcon className="w-4 h-4 text-blue-600" />
											How do I get started with your platform?
										</div>
									</AccordionTrigger>
									<AccordionContent className="text-sm text-gray-600">
										Getting started is easy! Simply sign up for an account, verify your email, and follow our 
										interactive onboarding process. We'll guide you through setting up your first project, 
										connecting your team, and exploring key features. The entire process takes less than 5 minutes.
									</AccordionContent>
								</AccordionItem>
								<AccordionItem value="faq-2">
									<AccordionTrigger className="text-left">
										<div className="flex items-center gap-2">
											<InfoIcon className="w-4 h-4 text-green-600" />
											What payment methods do you accept?
										</div>
									</AccordionTrigger>
									<AccordionContent className="text-sm text-gray-600">
										We accept all major credit cards (Visa, MasterCard, American Express), PayPal, 
										and bank transfers for enterprise customers. All payments are processed securely 
										through Stripe with industry-standard encryption.
									</AccordionContent>
								</AccordionItem>
								<AccordionItem value="faq-3">
									<AccordionTrigger className="text-left">
										<div className="flex items-center gap-2">
											<ShieldIcon className="w-4 h-4 text-purple-600" />
											How secure is my data?
										</div>
									</AccordionTrigger>
									<AccordionContent className="text-sm text-gray-600">
										Your data security is our top priority. We use enterprise-grade encryption (AES-256), 
										SOC 2 compliance, regular security audits, and follow GDPR guidelines. All data is 
										stored in secure, redundant data centers with 99.9% uptime guarantee.
									</AccordionContent>
								</AccordionItem>
								<AccordionItem value="faq-4">
									<AccordionTrigger className="text-left">
										<div className="flex items-center gap-2">
											<UserIcon className="w-4 h-4 text-orange-600" />
											Can I collaborate with my team?
										</div>
									</AccordionTrigger>
									<AccordionContent className="text-sm text-gray-600">
										Absolutely! Our platform is designed for collaboration. You can invite team members, 
										set role-based permissions, share projects, leave comments, and track changes in real-time. 
										Teams of all sizes love our collaborative features.
									</AccordionContent>
								</AccordionItem>
							</Accordion>
						</div>

						{/* Controlled Accordion Example */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Controlled Accordion</h3>
							<div className="space-y-4">
								<div className="flex gap-2">
									<Button size="sm" onClick={() => setSingleValue('controlled-1')}>
										Open First
									</Button>
									<Button size="sm" variant="outline" onClick={() => setSingleValue('controlled-2')}>
										Open Second
									</Button>
									<Button size="sm" variant="ghost" onClick={() => setSingleValue('')}>
										Close All
									</Button>
								</div>
								<Accordion 
									type="single" 
									value={singleValue} 
									onValueChange={setSingleValue}
									className="w-full"
								>
									<AccordionItem value="controlled-1">
										<AccordionTrigger>Controlled Section 1</AccordionTrigger>
										<AccordionContent>
											This section is controlled by the buttons above. The current value is: 
											<code className="bg-gray-100 px-2 py-1 rounded ml-1">
												{singleValue || 'none'}
											</code>
										</AccordionContent>
									</AccordionItem>
									<AccordionItem value="controlled-2">
										<AccordionTrigger>Controlled Section 2</AccordionTrigger>
										<AccordionContent>
											You can control which section is open programmatically using React state. 
											This is useful for guided tours, dynamic content, or conditional visibility.
										</AccordionContent>
									</AccordionItem>
								</Accordion>
							</div>
						</div>

						{/* Settings/Configuration Example */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Settings Panel</h3>
							<Accordion type="multiple" className="w-full" defaultValue={['account']}>
								<AccordionItem value="account">
									<AccordionTrigger>
										<div className="flex items-center gap-2">
											<UserIcon className="w-4 h-4" />
											Account Settings
											<Badge variant="secondary" className="ml-auto">3 items</Badge>
										</div>
									</AccordionTrigger>
									<AccordionContent>
										<div className="space-y-4 p-4 bg-gray-50 rounded-lg">
											<div className="flex items-center justify-between">
												<div>
													<p className="font-medium">Email Notifications</p>
													<p className="text-sm text-gray-600">Receive updates via email</p>
												</div>
												<Button size="sm" variant="outline">Configure</Button>
											</div>
											<div className="flex items-center justify-between">
												<div>
													<p className="font-medium">Profile Visibility</p>
													<p className="text-sm text-gray-600">Control who can see your profile</p>
												</div>
												<Button size="sm" variant="outline">Manage</Button>
											</div>
											<div className="flex items-center justify-between">
												<div>
													<p className="font-medium">Two-Factor Authentication</p>
													<p className="text-sm text-gray-600">Add extra security to your account</p>
												</div>
												<Button size="sm">Enable</Button>
											</div>
										</div>
									</AccordionContent>
								</AccordionItem>
								<AccordionItem value="privacy">
									<AccordionTrigger>
										<div className="flex items-center gap-2">
											<ShieldIcon className="w-4 h-4" />
											Privacy & Security
											<Badge variant="destructive" className="ml-auto">Action Required</Badge>
										</div>
									</AccordionTrigger>
									<AccordionContent>
										<div className="space-y-4 p-4 bg-gray-50 rounded-lg">
											<div className="flex items-center justify-between">
												<div>
													<p className="font-medium">Data Export</p>
													<p className="text-sm text-gray-600">Download your data</p>
												</div>
												<Button size="sm" variant="outline">Download</Button>
											</div>
											<div className="flex items-center justify-between">
												<div>
													<p className="font-medium">Account Deletion</p>
													<p className="text-sm text-gray-600">Permanently delete your account</p>
												</div>
												<Button size="sm" variant="destructive">Delete</Button>
											</div>
										</div>
									</AccordionContent>
								</AccordionItem>
								<AccordionItem value="preferences">
									<AccordionTrigger>
										<div className="flex items-center gap-2">
											<SettingsIcon className="w-4 h-4" />
											Preferences
										</div>
									</AccordionTrigger>
									<AccordionContent>
										<div className="space-y-4 p-4 bg-gray-50 rounded-lg">
											<div className="flex items-center justify-between">
												<div>
													<p className="font-medium">Theme</p>
													<p className="text-sm text-gray-600">Light or dark mode</p>
												</div>
												<Button size="sm" variant="outline">Change</Button>
											</div>
											<div className="flex items-center justify-between">
												<div>
													<p className="font-medium">Language</p>
													<p className="text-sm text-gray-600">Interface language</p>
												</div>
												<Button size="sm" variant="outline">Select</Button>
											</div>
										</div>
									</AccordionContent>
								</AccordionItem>
							</Accordion>
						</div>

						{/* Documentation Example */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Documentation Structure</h3>
							<div className="space-y-4">
								<div className="flex gap-2">
									<Button size="sm" onClick={handleExpandAll}>
										Expand All Sections
									</Button>
									<Button size="sm" variant="outline" onClick={handleCollapseAll}>
										Collapse All
									</Button>
								</div>
								<Accordion 
									type="multiple" 
									value={expandedSections}
									onValueChange={setExpandedSections}
									className="w-full"
								>
									<AccordionItem value="getting-started">
										<AccordionTrigger>
											<div className="flex items-center gap-2">
												<span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">1</span>
												Getting Started
											</div>
										</AccordionTrigger>
										<AccordionContent>
											<div className="space-y-4">
												<div className="border-l-4 border-blue-500 pl-4">
													<h4 className="font-medium">Installation</h4>
													<p className="text-sm text-gray-600 mt-1">
														Install the package using npm or yarn and set up the basic configuration.
													</p>
													<code className="bg-gray-100 p-2 rounded text-xs block mt-2">
														npm install @rs-kit/ui-kit
													</code>
												</div>
												<div className="border-l-4 border-blue-500 pl-4">
													<h4 className="font-medium">Quick Setup</h4>
													<p className="text-sm text-gray-600 mt-1">
														Import components and start building your interface in minutes.
													</p>
												</div>
											</div>
										</AccordionContent>
									</AccordionItem>
									<AccordionItem value="features">
										<AccordionTrigger>
											<div className="flex items-center gap-2">
												<span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">2</span>
												Core Features
											</div>
										</AccordionTrigger>
										<AccordionContent>
											<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
												<div className="p-3 border rounded">
													<h5 className="font-medium">Component Library</h5>
													<p className="text-xs text-gray-600 mt-1">30+ production-ready components</p>
												</div>
												<div className="p-3 border rounded">
													<h5 className="font-medium">Accessibility</h5>
													<p className="text-xs text-gray-600 mt-1">WCAG 2.1 compliant</p>
												</div>
												<div className="p-3 border rounded">
													<h5 className="font-medium">Theming</h5>
													<p className="text-xs text-gray-600 mt-1">Customizable design system</p>
												</div>
												<div className="p-3 border rounded">
													<h5 className="font-medium">TypeScript</h5>
													<p className="text-xs text-gray-600 mt-1">Full type safety</p>
												</div>
											</div>
										</AccordionContent>
									</AccordionItem>
									<AccordionItem value="pricing">
										<AccordionTrigger>
											<div className="flex items-center gap-2">
												<span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">3</span>
												Pricing Plans
											</div>
										</AccordionTrigger>
										<AccordionContent>
											<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
												<div className="p-4 border rounded text-center">
													<h5 className="font-bold">Starter</h5>
													<p className="text-2xl font-bold mt-2">Free</p>
													<ul className="text-xs text-gray-600 mt-2 space-y-1">
														<li>Basic components</li>
														<li>Community support</li>
														<li>Open source</li>
													</ul>
												</div>
												<div className="p-4 border rounded text-center border-blue-500">
													<h5 className="font-bold">Pro</h5>
													<p className="text-2xl font-bold mt-2">$29/mo</p>
													<ul className="text-xs text-gray-600 mt-2 space-y-1">
														<li>All components</li>
														<li>Priority support</li>
														<li>Advanced features</li>
													</ul>
												</div>
												<div className="p-4 border rounded text-center">
													<h5 className="font-bold">Enterprise</h5>
													<p className="text-2xl font-bold mt-2">Custom</p>
													<ul className="text-xs text-gray-600 mt-2 space-y-1">
														<li>Custom components</li>
														<li>Dedicated support</li>
														<li>SLA guarantee</li>
													</ul>
												</div>
											</div>
										</AccordionContent>
									</AccordionItem>
									<AccordionItem value="support">
										<AccordionTrigger>
											<div className="flex items-center gap-2">
												<span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">4</span>
												Support & Resources
											</div>
										</AccordionTrigger>
										<AccordionContent>
											<div className="space-y-3">
												<div className="flex items-center gap-3 p-3 bg-blue-50 rounded">
													<div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
														<span className="text-white text-xs">📚</span>
													</div>
													<div>
														<h6 className="font-medium">Documentation</h6>
														<p className="text-xs text-gray-600">Comprehensive guides and API reference</p>
													</div>
												</div>
												<div className="flex items-center gap-3 p-3 bg-green-50 rounded">
													<div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
														<span className="text-white text-xs">💬</span>
													</div>
													<div>
														<h6 className="font-medium">Community</h6>
														<p className="text-xs text-gray-600">Join our Discord server for help and discussions</p>
													</div>
												</div>
												<div className="flex items-center gap-3 p-3 bg-purple-50 rounded">
													<div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
														<span className="text-white text-xs">🎓</span>
													</div>
													<div>
														<h6 className="font-medium">Tutorials</h6>
														<p className="text-xs text-gray-600">Step-by-step video tutorials and examples</p>
													</div>
												</div>
											</div>
										</AccordionContent>
									</AccordionItem>
								</Accordion>
							</div>
						</div>

						{/* Current State Display */}
						<div className="mt-6 p-4 bg-gray-50 rounded-lg">
							<h4 className="text-sm font-semibold text-gray-700 mb-2">Interactive State:</h4>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
								<div>
									<p><strong>Single Controlled Value:</strong> {singleValue || 'None'}</p>
								</div>
								<div>
									<p><strong>Expanded Sections:</strong> {expandedSections.length} open</p>
									<p><strong>Section List:</strong> {expandedSections.join(', ') || 'None'}</p>
								</div>
							</div>
						</div>
					</div>
				}
			/>

			<ComponentDoc
				title="Accordion Props & Advanced Usage"
				description="Comprehensive guide to Accordion component props, customization, and best practices."
				component={
					<div className="flex flex-col gap-6 w-full max-w-4xl">
						{/* Props Reference */}
						<div className="p-4 bg-blue-50 rounded-lg">
							<h4 className="text-sm font-semibold text-blue-700 mb-2">Props Reference:</h4>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-600">
								<div>
									<strong>Accordion Props:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li><code>type</code> - "single" or "multiple" selection</li>
										<li><code>collapsible</code> - Allow closing active item (single only)</li>
										<li><code>value</code> - Controlled value(s)</li>
										<li><code>defaultValue</code> - Default value(s)</li>
										<li><code>onValueChange</code> - Value change handler</li>
										<li><code>disabled</code> - Disable entire accordion</li>
									</ul>
								</div>
								<div>
									<strong>AccordionItem Props:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li><code>value</code> - Unique identifier (required)</li>
										<li><code>disabled</code> - Disable specific item</li>
										<li><code>className</code> - Custom styling</li>
									</ul>
								</div>
								<div>
									<strong>AccordionTrigger Props:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li><code>className</code> - Custom trigger styling</li>
										<li><code>children</code> - Trigger content</li>
										<li>Standard button props supported</li>
									</ul>
								</div>
								<div>
									<strong>AccordionContent Props:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li><code>className</code> - Custom content styling</li>
										<li><code>children</code> - Content to display</li>
										<li>Automatic animation handling</li>
									</ul>
								</div>
							</div>
						</div>

						{/* Usage Guidelines */}
						<div className="p-4 bg-green-50 rounded-lg">
							<h4 className="text-sm font-semibold text-green-700 mb-2">Usage Guidelines:</h4>
							<ul className="text-sm text-green-600 space-y-1 list-disc list-inside">
								<li><strong>Content Organization:</strong> Use for FAQs, documentation, settings, or any hierarchical content</li>
								<li><strong>Single vs Multiple:</strong> Use single for exclusive sections, multiple for independent sections</li>
								<li><strong>Trigger Content:</strong> Keep trigger text concise and descriptive</li>
								<li><strong>Content Length:</strong> Accordions work best with medium-length content</li>
								<li><strong>Accessibility:</strong> Triggers are keyboard navigable and screen reader friendly</li>
								<li><strong>Performance:</strong> Content is only rendered when expanded (lazy loading)</li>
								<li><strong>Mobile Design:</strong> Accordions are inherently mobile-friendly</li>
								<li><strong>Visual Hierarchy:</strong> Use consistent styling and clear visual indicators</li>
							</ul>
						</div>

						{/* Code Examples */}
						<div className="p-4 bg-gray-100 rounded-lg">
							<h4 className="text-sm font-semibold text-gray-700 mb-2">Code Examples:</h4>
							<pre className="text-xs text-gray-600 overflow-x-auto whitespace-pre-wrap">
{`// Basic accordion
<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Question?</AccordionTrigger>
    <AccordionContent>Answer content here</AccordionContent>
  </AccordionItem>
</Accordion>

// Multiple selection
<Accordion type="multiple" defaultValue={["item-1", "item-2"]}>
  <AccordionItem value="item-1">
    <AccordionTrigger>Section 1</AccordionTrigger>
    <AccordionContent>Content 1</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Section 2</AccordionTrigger>
    <AccordionContent>Content 2</AccordionContent>
  </AccordionItem>
</Accordion>

// Controlled accordion
const [value, setValue] = useState("")
<Accordion 
  type="single" 
  value={value} 
  onValueChange={setValue}
>
  <AccordionItem value="controlled">
    <AccordionTrigger>Controlled Section</AccordionTrigger>
    <AccordionContent>This section is controlled</AccordionContent>
  </AccordionItem>
</Accordion>

// Custom styling
<AccordionItem value="custom">
  <AccordionTrigger className="hover:bg-blue-50">
    <div className="flex items-center gap-2">
      <Icon className="w-4 h-4" />
      Custom trigger content
    </div>
  </AccordionTrigger>
  <AccordionContent className="bg-gray-50 p-4">
    Styled content area
  </AccordionContent>
</AccordionItem>`}
							</pre>
						</div>

						{/* Design Guidelines */}
						<div className="p-4 bg-purple-50 rounded-lg">
							<h4 className="text-sm font-semibold text-purple-700 mb-2">Design Guidelines:</h4>
							<ul className="text-sm text-purple-600 space-y-1 list-disc list-inside">
								<li><strong>Visual Hierarchy:</strong> Use clear typography and spacing to establish content hierarchy</li>
								<li><strong>Trigger Design:</strong> Make triggers clearly clickable with proper hover and focus states</li>
								<li><strong>Content Spacing:</strong> Ensure adequate padding and margins for content readability</li>
								<li><strong>Animation:</strong> Use smooth, consistent animations for expand/collapse transitions</li>
								<li><strong>Icons:</strong> Consider adding expand/collapse icons for better visual feedback</li>
								<li><strong>Loading States:</strong> Handle dynamic content loading gracefully</li>
								<li><strong>Responsive Design:</strong> Ensure accordions work well on all screen sizes</li>
								<li><strong>Color Usage:</strong> Use subtle background colors to distinguish sections</li>
							</ul>
						</div>
					</div>
				}
			/>
		</Fragment>
	)
}