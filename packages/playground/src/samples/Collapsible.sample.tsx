import { Fragment, useState } from 'react'
import {
	ChevronsUpDown,
	ChevronDownIcon,
	ChevronRightIcon,
	FolderIcon,
	FileIcon,
	SettingsIcon,
	UsersIcon,
	HelpCircleIcon,
	StarIcon,
	MessageCircleIcon,
	BellIcon,
	ShieldIcon,
	SmartphoneIcon,
	MailIcon,
	LockIcon,
	EyeIcon,
	PlusIcon,
	MinusIcon
} from 'lucide-react'
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Badge,
	Switch,
	Separator,
	Avatar,
	AvatarFallback,
	AvatarImage
} from '@rs-kit/ui-kit'
import { ComponentDoc } from '@/components/ComponentDoc'

// Sample data for different collapsible examples
const repositoryData = [
	{ name: '@radix-ui/primitives', stars: 15200, language: 'TypeScript', updated: '2 days ago' },
	{ name: '@radix-ui/colors', stars: 2800, language: 'JavaScript', updated: '1 week ago' },
	{ name: '@stitches/react', stars: 7600, language: 'TypeScript', updated: '3 days ago' }
]

const fileStructure = [
	{
		id: 'src',
		name: 'src',
		type: 'folder',
		children: [
			{ id: 'components', name: 'components', type: 'folder' },
			{ id: 'hooks', name: 'hooks', type: 'folder' },
			{ id: 'utils', name: 'utils', type: 'folder' },
			{ id: 'app.tsx', name: 'App.tsx', type: 'file', size: '2.4 KB' },
			{ id: 'index.tsx', name: 'index.tsx', type: 'file', size: '0.8 KB' }
		]
	},
	{
		id: 'public',
		name: 'public',
		type: 'folder',
		children: [
			{ id: 'favicon.ico', name: 'favicon.ico', type: 'file', size: '4.2 KB' },
			{ id: 'index.html', name: 'index.html', type: 'file', size: '1.1 KB' }
		]
	}
]

const faqData = [
	{
		id: 'getting-started',
		question: 'How do I get started?',
		answer: 'To get started, simply install the package using npm or yarn, then import the components you need. Check our documentation for detailed setup instructions and examples.'
	},
	{
		id: 'customization',
		question: 'Can I customize the appearance?',
		answer: 'Yes! All components are fully customizable using CSS variables and Tailwind classes. You can override the default styles or create your own themes.'
	},
	{
		id: 'typescript',
		question: 'Does it support TypeScript?',
		answer: 'Absolutely! The entire library is written in TypeScript and comes with complete type definitions for the best developer experience.'
	},
	{
		id: 'accessibility',
		question: 'Is it accessible?',
		answer: 'Yes, all components follow WAI-ARIA guidelines and are tested with screen readers. We prioritize accessibility in all our components.'
	}
]

const teamMembers = [
	{ id: 1, name: 'Alice Johnson', role: 'Frontend Developer', avatar: '/avatars/alice.jpg', active: true },
	{ id: 2, name: 'Bob Smith', role: 'Backend Developer', avatar: '/avatars/bob.jpg', active: false },
	{ id: 3, name: 'Carol Williams', role: 'Designer', avatar: '/avatars/carol.jpg', active: true },
	{ id: 4, name: 'David Brown', role: 'Product Manager', avatar: '/avatars/david.jpg', active: true }
]

export default function CollapsibleSample() {
	// State for different collapsible examples
	const [repoOpen, setRepoOpen] = useState(false)
	const [fileOpen, setFileOpen] = useState<Record<string, boolean>>({})
	const [faqOpen, setFaqOpen] = useState<Record<string, boolean>>({})
	const [settingsOpen, setSettingsOpen] = useState<Record<string, boolean>>({})
	const [teamOpen, setTeamOpen] = useState(false)
	const [notificationsEnabled, setNotificationsEnabled] = useState(true)
	const [autoExpand, setAutoExpand] = useState(false)

	// Helper function to toggle file structure
	const toggleFolder = (folderId: string) => {
		setFileOpen(prev => ({ ...prev, [folderId]: !prev[folderId] }))
	}

	// Helper function to toggle FAQ items
	const toggleFaq = (faqId: string) => {
		if (autoExpand) {
			// Close all others when auto-expand is enabled
			const newState = Object.keys(faqOpen).reduce((acc: Record<string, boolean>, key) => {
				acc[key] = key === faqId ? !faqOpen[faqId] : false
				return acc
			}, {})
			setFaqOpen(newState)
		} else {
			setFaqOpen(prev => ({ ...prev, [faqId]: !prev[faqId] }))
		}
	}

	// Helper function to toggle settings sections
	const toggleSettings = (sectionId: string) => {
		setSettingsOpen(prev => ({ ...prev, [sectionId]: !prev[sectionId] }))
	}

	return (
		<Fragment>
			<ComponentDoc
				title="Collapsible"
				description="Interactive components that expand and collapse content panels. Perfect for organizing information, creating accordions, navigation menus, and content sections."
				component={
					<div className="flex flex-col gap-8 w-full max-w-4xl">
						{/* Basic Collapsible */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Basic Collapsible</h3>
							<Card className="w-full max-w-md">
								<CardContent className="p-0">
									<Collapsible open={repoOpen} onOpenChange={setRepoOpen}>
										<CollapsibleTrigger asChild>
											<div className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer">
												<div className="flex items-center gap-3">
													<StarIcon className="h-5 w-5 text-yellow-500" />
													<div>
														<h4 className="font-semibold text-sm">@peduarte starred 3 repositories</h4>
														<p className="text-xs text-muted-foreground">Click to view details</p>
													</div>
												</div>
												<ChevronsUpDown className={`h-4 w-4 transition-transform ${repoOpen ? 'rotate-180' : ''}`} />
											</div>
										</CollapsibleTrigger>
										<div className="border-t border-gray-200">
											<div className="p-4 bg-blue-50 border-b">
												<div className="flex items-center justify-between">
													<span className="font-mono text-sm">@radix-ui/primitives</span>
													<Badge variant="secondary">Always visible</Badge>
												</div>
											</div>
											<CollapsibleContent>
												<div className="divide-y">
													{repositoryData.slice(1).map((repo, index) => (
														<div key={index} className="p-4 flex items-center justify-between hover:bg-gray-50">
															<div className="flex items-center gap-3">
																<div className="w-3 h-3 rounded-full bg-blue-500"></div>
																<div>
																	<span className="font-mono text-sm">{repo.name}</span>
																	<div className="flex items-center gap-2 mt-1">
																		<Badge variant="outline" className="text-xs">{repo.language}</Badge>
																		<span className="text-xs text-muted-foreground">{repo.updated}</span>
																	</div>
																</div>
															</div>
															<div className="flex items-center gap-2">
																<StarIcon className="h-4 w-4 text-yellow-500" />
																<span className="text-sm">{repo.stars.toLocaleString()}</span>
															</div>
														</div>
													))}
												</div>
											</CollapsibleContent>
										</div>
									</Collapsible>
								</CardContent>
							</Card>
						</div>

						{/* File Explorer Collapsible */}
						<div>
							<h3 className="text-lg font-semibold mb-4">File Explorer</h3>
							<Card className="w-full max-w-md">
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<FolderIcon className="h-5 w-5" />
										Project Structure
									</CardTitle>
									<CardDescription>Nested collapsible file tree</CardDescription>
								</CardHeader>
								<CardContent className="p-0">
									<div className="divide-y">
										{fileStructure.map((item) => (
											<Collapsible key={item.id} open={fileOpen[item.id]} onOpenChange={() => toggleFolder(item.id)}>
												<CollapsibleTrigger asChild>
													<div className="flex items-center gap-2 p-3 hover:bg-gray-50 cursor-pointer">
														{item.type === 'folder' ? (
															<>
																<ChevronRightIcon className={`h-4 w-4 transition-transform ${fileOpen[item.id] ? 'rotate-90' : ''}`} />
																<FolderIcon className="h-4 w-4 text-blue-600" />
															</>
														) : (
															<>
																<div className="w-4"></div>
																<FileIcon className="h-4 w-4 text-gray-600" />
															</>
														)}
														<span className="text-sm">{item.name}</span>
													</div>
												</CollapsibleTrigger>
												{item.children && (
													<CollapsibleContent>
														<div className="ml-6 border-l border-gray-200 pl-2">
															{item.children.map((child) => (
																<div key={child.id} className="flex items-center gap-2 p-2 hover:bg-gray-50">
																	{child.type === 'folder' ? (
																		<FolderIcon className="h-4 w-4 text-blue-600" />
																	) : (
																		<FileIcon className="h-4 w-4 text-gray-600" />
																	)}
																	<span className="text-sm">{child.name}</span>
																	{child.size && (
																		<span className="text-xs text-muted-foreground ml-auto">{child.size}</span>
																	)}
																</div>
															))}
														</div>
													</CollapsibleContent>
												)}
											</Collapsible>
										))}
									</div>
								</CardContent>
							</Card>
						</div>

						{/* FAQ Accordion Style */}
						<div>
							<h3 className="text-lg font-semibold mb-4">FAQ Accordion</h3>
							<div className="mb-4 flex items-center gap-2">
								<Switch id="auto-expand" checked={autoExpand} onCheckedChange={setAutoExpand} />
								<label htmlFor="auto-expand" className="text-sm">
									Auto-expand (only one open at a time)
								</label>
							</div>
							<Card className="w-full max-w-2xl">
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<HelpCircleIcon className="h-5 w-5" />
										Frequently Asked Questions
									</CardTitle>
									<CardDescription>Common questions and answers about our product</CardDescription>
								</CardHeader>
								<CardContent className="p-0">
									<div className="divide-y">
										{faqData.map((faq, index) => (
											<Collapsible key={faq.id} open={faqOpen[faq.id]} onOpenChange={() => toggleFaq(faq.id)}>
												<CollapsibleTrigger asChild>
													<div className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer">
														<div className="flex items-center gap-3">
															<div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
																<span className="text-sm font-medium text-blue-600">{index + 1}</span>
															</div>
															<h4 className="font-medium text-sm">{faq.question}</h4>
														</div>
														<ChevronDownIcon className={`h-4 w-4 transition-transform ${faqOpen[faq.id] ? 'rotate-180' : ''}`} />
													</div>
												</CollapsibleTrigger>
												<CollapsibleContent>
													<div className="px-4 pb-4 pt-0">
														<div className="ml-9 text-sm text-muted-foreground">{faq.answer}</div>
													</div>
												</CollapsibleContent>
											</Collapsible>
										))}
									</div>
								</CardContent>
							</Card>
						</div>

						{/* Settings Panel */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Settings Panel</h3>
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<SettingsIcon className="h-5 w-5" />
											Account Settings
										</CardTitle>
										<CardDescription>Manage your account preferences</CardDescription>
									</CardHeader>
									<CardContent className="p-0">
										<div className="divide-y">
											{/* Profile Section */}
											<Collapsible open={settingsOpen.profile} onOpenChange={() => toggleSettings('profile')}>
												<CollapsibleTrigger asChild>
													<div className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer">
														<div className="flex items-center gap-3">
															<UsersIcon className="h-4 w-4" />
															<span className="font-medium text-sm">Profile</span>
														</div>
														<ChevronRightIcon className={`h-4 w-4 transition-transform ${settingsOpen.profile ? 'rotate-90' : ''}`} />
													</div>
												</CollapsibleTrigger>
												<CollapsibleContent>
													<div className="px-4 pb-4 space-y-3">
														<div className="flex items-center justify-between">
															<span className="text-sm">Profile visibility</span>
															<Switch />
														</div>
														<div className="flex items-center justify-between">
															<span className="text-sm">Show activity status</span>
															<Switch defaultChecked />
														</div>
														<Button variant="outline" size="sm" className="w-full">
															Edit Profile
														</Button>
													</div>
												</CollapsibleContent>
											</Collapsible>

											{/* Notifications Section */}
											<Collapsible open={settingsOpen.notifications} onOpenChange={() => toggleSettings('notifications')}>
												<CollapsibleTrigger asChild>
													<div className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer">
														<div className="flex items-center gap-3">
															<BellIcon className="h-4 w-4" />
															<span className="font-medium text-sm">Notifications</span>
														</div>
														<div className="flex items-center gap-2">
															{notificationsEnabled && <Badge variant="secondary" className="text-xs">On</Badge>}
															<ChevronRightIcon className={`h-4 w-4 transition-transform ${settingsOpen.notifications ? 'rotate-90' : ''}`} />
														</div>
													</div>
												</CollapsibleTrigger>
												<CollapsibleContent>
													<div className="px-4 pb-4 space-y-3">
														<div className="flex items-center justify-between">
															<div className="flex items-center gap-2">
																<MailIcon className="h-4 w-4" />
																<span className="text-sm">Email notifications</span>
															</div>
															<Switch checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
														</div>
														<div className="flex items-center justify-between">
															<div className="flex items-center gap-2">
																<SmartphoneIcon className="h-4 w-4" />
																<span className="text-sm">Push notifications</span>
															</div>
															<Switch defaultChecked />
														</div>
														<div className="flex items-center justify-between">
															<div className="flex items-center gap-2">
																<MessageCircleIcon className="h-4 w-4" />
																<span className="text-sm">Marketing updates</span>
															</div>
															<Switch />
														</div>
													</div>
												</CollapsibleContent>
											</Collapsible>

											{/* Security Section */}
											<Collapsible open={settingsOpen.security} onOpenChange={() => toggleSettings('security')}>
												<CollapsibleTrigger asChild>
													<div className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer">
														<div className="flex items-center gap-3">
															<ShieldIcon className="h-4 w-4" />
															<span className="font-medium text-sm">Security & Privacy</span>
														</div>
														<ChevronRightIcon className={`h-4 w-4 transition-transform ${settingsOpen.security ? 'rotate-90' : ''}`} />
													</div>
												</CollapsibleTrigger>
												<CollapsibleContent>
													<div className="px-4 pb-4 space-y-3">
														<div className="flex items-center justify-between">
															<div className="flex items-center gap-2">
																<LockIcon className="h-4 w-4" />
																<span className="text-sm">Two-factor authentication</span>
															</div>
															<Switch />
														</div>
														<div className="flex items-center justify-between">
															<div className="flex items-center gap-2">
																<EyeIcon className="h-4 w-4" />
																<span className="text-sm">Activity monitoring</span>
															</div>
															<Switch defaultChecked />
														</div>
														<Button variant="outline" size="sm" className="w-full">
															Change Password
														</Button>
													</div>
												</CollapsibleContent>
											</Collapsible>
										</div>
									</CardContent>
								</Card>

								{/* Team Members */}
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<UsersIcon className="h-5 w-5" />
											Team Members
										</CardTitle>
										<CardDescription>Manage your team and their access</CardDescription>
									</CardHeader>
									<CardContent>
										<Collapsible open={teamOpen} onOpenChange={setTeamOpen}>
											<div className="flex items-center justify-between mb-4">
												<div className="flex items-center gap-2">
													<Badge variant="secondary">{teamMembers.length} members</Badge>
													<Badge variant="outline">{teamMembers.filter(m => m.active).length} active</Badge>
												</div>
												<CollapsibleTrigger asChild>
													<Button variant="outline" size="sm">
														{teamOpen ? <MinusIcon className="h-4 w-4" /> : <PlusIcon className="h-4 w-4" />}
														{teamOpen ? 'Hide' : 'Show'} Members
													</Button>
												</CollapsibleTrigger>
											</div>
											<CollapsibleContent>
												<div className="space-y-3">
													{teamMembers.map((member) => (
														<div key={member.id} className="flex items-center justify-between p-3 border rounded-lg">
															<div className="flex items-center gap-3">
																<Avatar className="h-8 w-8">
																	<AvatarImage src={member.avatar} alt={member.name} />
																	<AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
																</Avatar>
																<div>
																	<div className="font-medium text-sm">{member.name}</div>
																	<div className="text-xs text-muted-foreground">{member.role}</div>
																</div>
															</div>
															<div className="flex items-center gap-2">
																<Badge variant={member.active ? 'default' : 'secondary'} className="text-xs">
																	{member.active ? 'Active' : 'Inactive'}
																</Badge>
																<Button variant="ghost" size="sm">
																	<SettingsIcon className="h-4 w-4" />
																</Button>
															</div>
														</div>
													))}
													<Separator />
													<Button variant="outline" className="w-full" size="sm">
														<PlusIcon className="h-4 w-4 mr-2" />
														Invite Member
													</Button>
												</div>
											</CollapsibleContent>
										</Collapsible>
									</CardContent>
								</Card>
							</div>
						</div>

						{/* Interactive State Display */}
						<div className="mt-6 p-4 bg-gray-50 rounded-lg">
							<h4 className="text-sm font-semibold text-gray-700 mb-2">Interactive State:</h4>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
								<div>
									<p><strong>Repository Panel:</strong> {repoOpen ? 'Open' : 'Closed'}</p>
									<p><strong>Team Panel:</strong> {teamOpen ? 'Open' : 'Closed'}</p>
								</div>
								<div>
									<p><strong>Auto-expand FAQ:</strong> {autoExpand ? 'Yes' : 'No'}</p>
									<p><strong>Notifications:</strong> {notificationsEnabled ? 'Enabled' : 'Disabled'}</p>
								</div>
								<div>
									<p><strong>Open Folders:</strong> {Object.values(fileOpen).filter(Boolean).length}</p>
									<p><strong>Open FAQs:</strong> {Object.values(faqOpen).filter(Boolean).length}</p>
								</div>
							</div>
						</div>
					</div>
				}
			/>
		</Fragment>
	)
}