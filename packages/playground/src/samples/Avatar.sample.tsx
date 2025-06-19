import { Fragment, useState } from 'react'
import { 
	Avatar, 
	AvatarImage, 
	AvatarFallback, 
	Badge, 
	Button,
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from '@rs-kit/ui-kit'
import { ComponentDoc } from '@/components/ComponentDoc'
import { 
	UserIcon, 
	CameraIcon, 
	PlusIcon, 
	CheckIcon, 
	StarIcon,
	CrownIcon,
	ShieldIcon,
	OnlineIcon,
	MoreHorizontalIcon,
	SettingsIcon,
	EditIcon
} from 'lucide-react'

export default function AvatarSample() {
	// State for interactive examples
	const [selectedTeamMember, setSelectedTeamMember] = useState<string | null>(null)
	const [onlineUsers, setOnlineUsers] = useState(new Set(['john', 'sarah', 'mike']))

	// Sample user data
	const teamMembers = [
		{ id: 'john', name: 'John Doe', initials: 'JD', image: 'https://github.com/shadcn.png', role: 'Designer', status: 'online' },
		{ id: 'sarah', name: 'Sarah Chen', initials: 'SC', image: 'https://github.com/leerob.png', role: 'Developer', status: 'online' },
		{ id: 'mike', name: 'Mike Johnson', initials: 'MJ', image: 'https://github.com/evilrabbit.png', role: 'Manager', status: 'away' },
		{ id: 'emily', name: 'Emily Davis', initials: 'ED', image: null, role: 'Designer', status: 'offline' },
		{ id: 'alex', name: 'Alex Rodriguez', initials: 'AR', image: null, role: 'Developer', status: 'online' }
	]

	const contributors = [
		{ id: 'contrib1', name: 'Alice Wilson', initials: 'AW', commits: 124 },
		{ id: 'contrib2', name: 'Bob Smith', initials: 'BS', commits: 89 },
		{ id: 'contrib3', name: 'Carol Brown', initials: 'CB', commits: 56 },
		{ id: 'contrib4', name: 'David Lee', initials: 'DL', commits: 43 },
		{ id: 'contrib5', name: 'Eva Martinez', initials: 'EM', commits: 31 }
	]

	// Interactive handlers
	const toggleUserOnline = (userId: string) => {
		setOnlineUsers(prev => {
			const newSet = new Set(prev)
			if (newSet.has(userId)) {
				newSet.delete(userId)
			} else {
				newSet.add(userId)
			}
			return newSet
		})
	}

	return (
		<Fragment>
			<ComponentDoc
				title="Avatar"
				description="Display user profile images with automatic fallbacks. Perfect for user profiles, team displays, comment systems, and social features."
				component={
					<div className="flex flex-col gap-8 w-full max-w-4xl">
						{/* Basic Avatar Examples */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Basic Avatar Examples</h3>
							<div className="space-y-4">
								<div>
									<h4 className="text-sm font-medium text-gray-600 mb-2">With Image</h4>
									<div className="flex items-center gap-4">
										<Avatar>
											<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
											<AvatarFallback>CN</AvatarFallback>
										</Avatar>
										<div>
											<p className="text-sm font-medium">Colin Nagy</p>
											<p className="text-xs text-muted-foreground">Product Designer</p>
										</div>
									</div>
								</div>

								<div>
									<h4 className="text-sm font-medium text-gray-600 mb-2">Fallback Only</h4>
									<div className="flex items-center gap-4">
										<Avatar>
											<AvatarFallback>JD</AvatarFallback>
										</Avatar>
										<div>
											<p className="text-sm font-medium">John Doe</p>
											<p className="text-xs text-muted-foreground">Software Engineer</p>
										</div>
									</div>
								</div>

								<div>
									<h4 className="text-sm font-medium text-gray-600 mb-2">With Icon Fallback</h4>
									<div className="flex items-center gap-4">
										<Avatar>
											<AvatarFallback>
												<UserIcon className="w-4 h-4" />
											</AvatarFallback>
										</Avatar>
										<div>
											<p className="text-sm font-medium">Anonymous User</p>
											<p className="text-xs text-muted-foreground">Guest</p>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Avatar Sizes */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Avatar Sizes</h3>
							<div className="space-y-4">
								<div>
									<h4 className="text-sm font-medium text-gray-600 mb-2">Size Variations</h4>
									<div className="flex items-end gap-4">
										<div className="text-center">
											<Avatar className="w-6 h-6">
												<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
												<AvatarFallback className="text-xs">XS</AvatarFallback>
											</Avatar>
											<p className="text-xs mt-1">24px</p>
										</div>
										<div className="text-center">
											<Avatar className="w-8 h-8">
												<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
												<AvatarFallback className="text-xs">SM</AvatarFallback>
											</Avatar>
											<p className="text-xs mt-1">32px</p>
										</div>
										<div className="text-center">
											<Avatar>
												<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
												<AvatarFallback>MD</AvatarFallback>
											</Avatar>
											<p className="text-xs mt-1">40px</p>
										</div>
										<div className="text-center">
											<Avatar className="w-12 h-12">
												<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
												<AvatarFallback>LG</AvatarFallback>
											</Avatar>
											<p className="text-xs mt-1">48px</p>
										</div>
										<div className="text-center">
											<Avatar className="w-16 h-16">
												<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
												<AvatarFallback>XL</AvatarFallback>
											</Avatar>
											<p className="text-xs mt-1">64px</p>
										</div>
										<div className="text-center">
											<Avatar className="w-20 h-20">
												<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
												<AvatarFallback className="text-lg">2XL</AvatarFallback>
											</Avatar>
											<p className="text-xs mt-1">80px</p>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Avatar Shapes */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Avatar Shapes</h3>
							<div className="space-y-4">
								<div>
									<h4 className="text-sm font-medium text-gray-600 mb-2">Different Shapes</h4>
									<div className="flex items-center gap-4">
										<div className="text-center">
											<Avatar>
												<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
												<AvatarFallback>RD</AvatarFallback>
											</Avatar>
											<p className="text-xs mt-1">Round</p>
										</div>
										<div className="text-center">
											<Avatar className="rounded-lg">
												<AvatarImage src="https://github.com/leerob.png" alt="@leerob" />
												<AvatarFallback>SQ</AvatarFallback>
											</Avatar>
											<p className="text-xs mt-1">Rounded</p>
										</div>
										<div className="text-center">
											<Avatar className="rounded-none">
												<AvatarImage src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
												<AvatarFallback>SQ</AvatarFallback>
											</Avatar>
											<p className="text-xs mt-1">Square</p>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Avatar with Status */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Avatar with Status Indicators</h3>
							<div className="space-y-4">
								<div>
									<h4 className="text-sm font-medium text-gray-600 mb-2">Online Status</h4>
									<div className="flex items-center gap-6">
										<div className="relative">
											<Avatar>
												<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
												<AvatarFallback>ON</AvatarFallback>
											</Avatar>
											<div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-background rounded-full"></div>
											<p className="text-xs mt-2 text-center">Online</p>
										</div>
										<div className="relative">
											<Avatar>
												<AvatarImage src="https://github.com/leerob.png" alt="@leerob" />
												<AvatarFallback>AW</AvatarFallback>
											</Avatar>
											<div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-yellow-500 border-2 border-background rounded-full"></div>
											<p className="text-xs mt-2 text-center">Away</p>
										</div>
										<div className="relative">
											<Avatar>
												<AvatarImage src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
												<AvatarFallback>BS</AvatarFallback>
											</Avatar>
											<div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-red-500 border-2 border-background rounded-full"></div>
											<p className="text-xs mt-2 text-center">Busy</p>
										</div>
										<div className="relative">
											<Avatar className="opacity-60">
												<AvatarFallback>OF</AvatarFallback>
											</Avatar>
											<div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-gray-400 border-2 border-background rounded-full"></div>
											<p className="text-xs mt-2 text-center">Offline</p>
										</div>
									</div>
								</div>

								<div>
									<h4 className="text-sm font-medium text-gray-600 mb-2">Role Badges</h4>
									<div className="flex items-center gap-6">
										<div className="relative">
											<Avatar>
												<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
												<AvatarFallback>AD</AvatarFallback>
											</Avatar>
											<div className="absolute -top-1 -right-1">
												<Badge className="h-5 px-1.5 text-xs bg-purple-600">
													<CrownIcon className="w-3 h-3" />
												</Badge>
											</div>
											<p className="text-xs mt-2 text-center">Admin</p>
										</div>
										<div className="relative">
											<Avatar>
												<AvatarImage src="https://github.com/leerob.png" alt="@leerob" />
												<AvatarFallback>MO</AvatarFallback>
											</Avatar>
											<div className="absolute -top-1 -right-1">
												<Badge className="h-5 px-1.5 text-xs bg-blue-600">
													<ShieldIcon className="w-3 h-3" />
												</Badge>
											</div>
											<p className="text-xs mt-2 text-center">Moderator</p>
										</div>
										<div className="relative">
											<Avatar>
												<AvatarFallback>VIP</AvatarFallback>
											</Avatar>
											<div className="absolute -top-1 -right-1">
												<Badge className="h-5 px-1.5 text-xs bg-yellow-600">
													<StarIcon className="w-3 h-3" />
												</Badge>
											</div>
											<p className="text-xs mt-2 text-center">VIP</p>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Avatar Groups */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Avatar Groups</h3>
							<div className="space-y-4">
								<div>
									<h4 className="text-sm font-medium text-gray-600 mb-2">Stacked Avatars</h4>
									<div className="flex -space-x-3">
										<Avatar className="border-2 border-background">
											<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
											<AvatarFallback>CN</AvatarFallback>
										</Avatar>
										<Avatar className="border-2 border-background">
											<AvatarImage src="https://github.com/leerob.png" alt="@leerob" />
											<AvatarFallback>LR</AvatarFallback>
										</Avatar>
										<Avatar className="border-2 border-background">
											<AvatarImage src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
											<AvatarFallback>ER</AvatarFallback>
										</Avatar>
										<Avatar className="border-2 border-background">
											<AvatarFallback>+2</AvatarFallback>
										</Avatar>
									</div>
								</div>

								<div>
									<h4 className="text-sm font-medium text-gray-600 mb-2">Expandable on Hover</h4>
									<div className="flex -space-x-3 hover:space-x-1 transition-all duration-300">
										<Avatar className="border-2 border-background transition-all duration-300">
											<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
											<AvatarFallback>CN</AvatarFallback>
										</Avatar>
										<Avatar className="border-2 border-background transition-all duration-300">
											<AvatarImage src="https://github.com/leerob.png" alt="@leerob" />
											<AvatarFallback>LR</AvatarFallback>
										</Avatar>
										<Avatar className="border-2 border-background transition-all duration-300">
											<AvatarImage src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
											<AvatarFallback>ER</AvatarFallback>
										</Avatar>
									</div>
									<p className="text-xs text-muted-foreground mt-2">Hover to expand</p>
								</div>

								<div>
									<h4 className="text-sm font-medium text-gray-600 mb-2">Team Members with Tooltips</h4>
									<TooltipProvider>
										<div className="flex -space-x-2">
											{teamMembers.slice(0, 4).map((member, index) => (
												<Tooltip key={member.id}>
													<TooltipTrigger>
														<div className="relative">
															<Avatar className="border-2 border-background hover:z-10 transition-transform hover:scale-110">
																{member.image ? (
																	<AvatarImage src={member.image} alt={`@${member.id}`} />
																) : null}
																<AvatarFallback>{member.initials}</AvatarFallback>
															</Avatar>
															{onlineUsers.has(member.id) && (
																<div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></div>
															)}
														</div>
													</TooltipTrigger>
													<TooltipContent>
														<div className="text-center">
															<p className="font-medium">{member.name}</p>
															<p className="text-xs text-muted-foreground">{member.role}</p>
														</div>
													</TooltipContent>
												</Tooltip>
											))}
											<Avatar className="border-2 border-background">
												<AvatarFallback className="bg-muted">+{teamMembers.length - 4}</AvatarFallback>
											</Avatar>
										</div>
									</TooltipProvider>
									<p className="text-xs text-muted-foreground mt-2">Hover for member details</p>
								</div>
							</div>
						</div>

						{/* Interactive Avatars */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Interactive Avatars</h3>
							<div className="space-y-4">
								<div>
									<h4 className="text-sm font-medium text-gray-600 mb-2">Clickable User List</h4>
									<div className="space-y-3">
										{teamMembers.map((member) => (
											<div 
												key={member.id}
												className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
													selectedTeamMember === member.id 
														? 'bg-blue-50 border border-blue-200' 
														: 'hover:bg-gray-50'
												}`}
												onClick={() => setSelectedTeamMember(
													selectedTeamMember === member.id ? null : member.id
												)}
											>
												<div className="relative">
													<Avatar>
														{member.image ? (
															<AvatarImage src={member.image} alt={`@${member.id}`} />
														) : null}
														<AvatarFallback>{member.initials}</AvatarFallback>
													</Avatar>
													{member.status === 'online' && (
														<div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-background rounded-full"></div>
													)}
													{member.status === 'away' && (
														<div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-yellow-500 border-2 border-background rounded-full"></div>
													)}
												</div>
												<div className="flex-1">
													<p className="text-sm font-medium">{member.name}</p>
													<p className="text-xs text-muted-foreground">{member.role}</p>
												</div>
												<div className="flex items-center gap-2">
													<div className={`w-2 h-2 rounded-full ${
														member.status === 'online' ? 'bg-green-500' :
														member.status === 'away' ? 'bg-yellow-500' :
														'bg-gray-400'
													}`}></div>
													<span className="text-xs text-muted-foreground capitalize">{member.status}</span>
												</div>
											</div>
										))}
									</div>
								</div>

								<div>
									<h4 className="text-sm font-medium text-gray-600 mb-2">Avatar with Actions</h4>
									<div className="flex items-center gap-4">
										<div className="relative group">
											<Avatar className="w-20 h-20">
												<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
												<AvatarFallback>ME</AvatarFallback>
											</Avatar>
											<Button 
												size="sm" 
												className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
											>
												<CameraIcon className="w-4 h-4" />
											</Button>
										</div>
										<div>
											<p className="text-sm font-medium">Profile Picture</p>
											<p className="text-xs text-muted-foreground">Hover to edit</p>
										</div>
									</div>
								</div>

								<div>
									<h4 className="text-sm font-medium text-gray-600 mb-2">Add New Member</h4>
									<div className="flex items-center gap-3">
										<Button 
											variant="outline" 
											size="sm" 
											className="rounded-full w-10 h-10 p-0 border-dashed border-2 hover:border-solid"
										>
											<PlusIcon className="w-4 h-4" />
										</Button>
										<div>
											<p className="text-sm font-medium">Add team member</p>
											<p className="text-xs text-muted-foreground">Invite new collaborator</p>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Project Contributors */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Project Contributors</h3>
							<div className="space-y-4">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									{contributors.map((contributor, index) => (
										<div key={contributor.id} className="flex items-center gap-3 p-3 border rounded-lg">
											<div className="relative">
												<Avatar>
													<AvatarFallback>{contributor.initials}</AvatarFallback>
												</Avatar>
												{index < 3 && (
													<Badge className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs bg-yellow-500">
														{index + 1}
													</Badge>
												)}
											</div>
											<div className="flex-1">
												<p className="text-sm font-medium">{contributor.name}</p>
												<p className="text-xs text-muted-foreground">{contributor.commits} commits</p>
											</div>
											<div className="text-right">
												<div className="w-full bg-gray-200 rounded-full h-2 mt-1">
													<div 
														className="bg-blue-600 h-2 rounded-full" 
														style={{ width: `${(contributor.commits / 124) * 100}%` }}
													></div>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>

						{/* Current State Display */}
						<div className="mt-6 p-4 bg-gray-50 rounded-lg">
							<h4 className="text-sm font-semibold text-gray-700 mb-2">Interactive State:</h4>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
								<div>
									<p><strong>Selected Team Member:</strong> {selectedTeamMember || 'None'}</p>
									<p><strong>Online Users:</strong> {onlineUsers.size} online</p>
								</div>
								<div>
									<p><strong>Online List:</strong> {Array.from(onlineUsers).join(', ')}</p>
									<p><strong>Total Contributors:</strong> {contributors.length}</p>
								</div>
							</div>
						</div>
					</div>
				}
			/>

			<ComponentDoc
				title="Avatar Props & Usage Guidelines"
				description="Comprehensive guide to Avatar component structure, sizing, and best practices."
				component={
					<div className="flex flex-col gap-6 w-full max-w-4xl">
						{/* Props Reference */}
						<div className="p-4 bg-blue-50 rounded-lg">
							<h4 className="text-sm font-semibold text-blue-700 mb-2">Props Reference:</h4>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-600">
								<div>
									<strong>Avatar Component:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li><code>className</code> - Additional CSS classes for size/shape</li>
										<li><code>children</code> - AvatarImage and AvatarFallback</li>
										<li>Standard div attributes supported</li>
									</ul>
								</div>
								<div>
									<strong>AvatarImage:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li><code>src</code> - Image source URL</li>
										<li><code>alt</code> - Alternative text (required)</li>
										<li>Automatically falls back on error</li>
									</ul>
								</div>
								<div>
									<strong>AvatarFallback:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li><code>children</code> - Initials, icon, or text</li>
										<li><code>className</code> - Custom fallback styling</li>
										<li>Shown when image fails to load</li>
									</ul>
								</div>
								<div>
									<strong>Common Sizes:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li><code>w-6 h-6</code> - Extra small (24px)</li>
										<li><code>w-8 h-8</code> - Small (32px)</li>
										<li>Default - Medium (40px)</li>
										<li><code>w-12 h-12</code> - Large (48px)</li>
										<li><code>w-16 h-16</code> - Extra large (64px)</li>
									</ul>
								</div>
							</div>
						</div>

						{/* Usage Guidelines */}
						<div className="p-4 bg-green-50 rounded-lg">
							<h4 className="text-sm font-semibold text-green-700 mb-2">Usage Guidelines:</h4>
							<ul className="text-sm text-green-600 space-y-1 list-disc list-inside">
								<li><strong>Fallback Text:</strong> Use 1-2 initials for names, meaningful text, or icons for generic users</li>
								<li><strong>Size Consistency:</strong> Use consistent sizes within the same context (lists, cards, headers)</li>
								<li><strong>Image Quality:</strong> Provide square images (1:1 aspect ratio) for best results</li>
								<li><strong>Status Indicators:</strong> Position status dots in bottom-right corner with proper borders</li>
								<li><strong>Grouping:</strong> Use negative margins for overlapping groups, add borders for separation</li>
								<li><strong>Interactive States:</strong> Add hover effects, click handlers, and focus management for clickable avatars</li>
								<li><strong>Accessibility:</strong> Always provide meaningful alt text and ensure sufficient color contrast</li>
								<li><strong>Loading States:</strong> Consider skeleton placeholders while images load</li>
							</ul>
						</div>

						{/* Code Examples */}
						<div className="p-4 bg-gray-100 rounded-lg">
							<h4 className="text-sm font-semibold text-gray-700 mb-2">Code Examples:</h4>
							<pre className="text-xs text-gray-600 overflow-x-auto whitespace-pre-wrap">
{`// Basic avatar with image and fallback
<Avatar>
  <AvatarImage src="https://github.com/username.png" alt="@username" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>

// Different sizes
<Avatar className="w-8 h-8">        {/* Small */}
<Avatar>                           {/* Default */}
<Avatar className="w-12 h-12">     {/* Large */}

// Different shapes
<Avatar className="rounded-lg">    {/* Rounded square */}
<Avatar className="rounded-none">  {/* Square */}

// With status indicator
<div className="relative">
  <Avatar>
    <AvatarImage src="..." alt="..." />
    <AvatarFallback>JD</AvatarFallback>
  </Avatar>
  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-background rounded-full"></div>
</div>

// Avatar group
<div className="flex -space-x-3">
  <Avatar className="border-2 border-background">
    <AvatarImage src="..." alt="..." />
    <AvatarFallback>U1</AvatarFallback>
  </Avatar>
  <Avatar className="border-2 border-background">
    <AvatarImage src="..." alt="..." />
    <AvatarFallback>U2</AvatarFallback>
  </Avatar>
  <Avatar className="border-2 border-background">
    <AvatarFallback>+3</AvatarFallback>
  </Avatar>
</div>

// Icon fallback
<Avatar>
  <AvatarFallback>
    <UserIcon className="w-4 h-4" />
  </AvatarFallback>
</Avatar>`}
							</pre>
						</div>

						{/* Design Guidelines */}
						<div className="p-4 bg-purple-50 rounded-lg">
							<h4 className="text-sm font-semibold text-purple-700 mb-2">Design Guidelines:</h4>
							<ul className="text-sm text-purple-600 space-y-1 list-disc list-inside">
								<li><strong>Visual Hierarchy:</strong> Use larger avatars for more important users or primary content</li>
								<li><strong>Color Coding:</strong> Consider using colored fallback backgrounds for different user types or roles</li>
								<li><strong>Spacing:</strong> Maintain adequate spacing around avatars, especially in lists and grids</li>
								<li><strong>Status Colors:</strong> Use green for online, yellow for away, red for busy, gray for offline</li>
								<li><strong>Badge Positioning:</strong> Place role badges in top-right, status indicators in bottom-right</li>
								<li><strong>Animation:</strong> Use subtle hover effects and smooth transitions for interactive avatars</li>
								<li><strong>Mobile Considerations:</strong> Ensure touch targets are at least 44px for interactive avatars</li>
								<li><strong>Group Limits:</strong> Show maximum 5-6 avatars in groups, use +N for overflow</li>
							</ul>
						</div>
					</div>
				}
			/>
		</Fragment>
	)
}
