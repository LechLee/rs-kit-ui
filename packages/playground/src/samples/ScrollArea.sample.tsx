import { Fragment, useState } from 'react'
import {
	ScrollArea,
	Label,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Badge,
	Switch,
	Button,
	Avatar,
	AvatarFallback,
	AvatarImage,
	Separator,
	Progress,
	Textarea
} from '@rs-kit/ui-kit'
import {
	FileTextIcon,
	MessageSquareIcon,
	UsersIcon,
	ImageIcon,
	BookIcon,
	MusicIcon,
	VideoIcon,
	DownloadIcon,
	CalendarIcon,
	ClockIcon,
	StarIcon,
	HeartIcon,
	ShareIcon,
	ReplyIcon,
	ThumbsUpIcon,
	EyeIcon,
	PlayIcon,
	PauseIcon,
	SkipForwardIcon,
	VolumeIcon,
	InfoIcon,
	ScrollIcon,
	ListIcon,
	ArchiveIcon,
	FolderIcon,
	SettingsIcon,
	UserIcon
} from 'lucide-react'
import { ComponentDoc } from '@/components/ComponentDoc'

// Content Feed ScrollArea
const ContentFeedScroll = () => {
	const [isPlaying, setIsPlaying] = useState(false)

	const feedItems = [
		{
			id: 1,
			type: 'article',
			title: 'Introduction to Modern Web Development',
			author: 'Sarah Johnson',
			time: '2 hours ago',
			excerpt: 'Exploring the latest trends and best practices in web development, including React, TypeScript, and modern tooling.',
			likes: 42,
			comments: 8,
			avatar: 'https://github.com/shadcn.png'
		},
		{
			id: 2,
			type: 'video',
			title: 'Building Responsive Layouts with CSS Grid',
			author: 'Mike Chen',
			time: '4 hours ago',
			excerpt: 'A comprehensive tutorial on creating flexible, responsive layouts using CSS Grid and modern techniques.',
			likes: 127,
			comments: 23,
			duration: '15:42',
			avatar: 'https://github.com/shadcn.png'
		},
		{
			id: 3,
			type: 'discussion',
			title: 'What\'s your favorite JavaScript framework?',
			author: 'Emily Davis',
			time: '6 hours ago',
			excerpt: 'Let\'s discuss the pros and cons of different JavaScript frameworks and their use cases.',
			likes: 89,
			comments: 156,
			avatar: 'https://github.com/shadcn.png'
		},
		{
			id: 4,
			type: 'tutorial',
			title: 'Advanced TypeScript Patterns',
			author: 'Alex Rodriguez',
			time: '1 day ago',
			excerpt: 'Deep dive into advanced TypeScript patterns including generics, conditional types, and utility types.',
			likes: 203,
			comments: 34,
			avatar: 'https://github.com/shadcn.png'
		},
		{
			id: 5,
			type: 'news',
			title: 'React 19 Release Candidate Now Available',
			author: 'React Team',
			time: '2 days ago',
			excerpt: 'The React team announces the release candidate for React 19 with new features and improvements.',
			likes: 1542,
			comments: 287,
			avatar: 'https://github.com/shadcn.png'
		}
	]

	const getTypeIcon = (type: string) => {
		switch (type) {
			case 'article': return <FileTextIcon className="w-4 h-4" />
			case 'video': return <VideoIcon className="w-4 h-4" />
			case 'discussion': return <MessageSquareIcon className="w-4 h-4" />
			case 'tutorial': return <BookIcon className="w-4 h-4" />
			case 'news': return <CalendarIcon className="w-4 h-4" />
			default: return <FileTextIcon className="w-4 h-4" />
		}
	}

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold flex items-center gap-2">
					<MessageSquareIcon className="w-5 h-5" />
					Content Feed
				</Label>
				<p className="text-sm text-muted-foreground">Scrollable content feed with articles, videos, and discussions</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Latest Updates</CardTitle>
					<CardDescription>Scroll through the latest content from your network</CardDescription>
				</CardHeader>
				<CardContent>
					<ScrollArea className="h-96 w-full rounded-md border">
						<div className="p-4 space-y-4">
							{feedItems.map((item) => (
								<div key={item.id}>
									<div className="flex gap-4">
										<Avatar className="w-10 h-10">
											<AvatarImage src={item.avatar} />
											<AvatarFallback>{item.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
										</Avatar>
										<div className="flex-1 space-y-2">
											<div className="flex items-center gap-2">
												{getTypeIcon(item.type)}
												<Badge variant="secondary" className="text-xs">
													{item.type}
												</Badge>
												<span className="text-xs text-muted-foreground">{item.time}</span>
											</div>
											<h4 className="font-medium text-sm">{item.title}</h4>
											<p className="text-sm text-muted-foreground">{item.excerpt}</p>
											<div className="flex items-center gap-4 text-xs text-muted-foreground">
												<div className="flex items-center gap-1">
													<HeartIcon className="w-3 h-3" />
													<span>{item.likes}</span>
												</div>
												<div className="flex items-center gap-1">
													<MessageSquareIcon className="w-3 h-3" />
													<span>{item.comments}</span>
												</div>
												<div className="flex items-center gap-1">
													<ShareIcon className="w-3 h-3" />
													<span>Share</span>
												</div>
												{item.type === 'video' && (
													<div className="flex items-center gap-1">
														<PlayIcon className="w-3 h-3" />
														<span>{item.duration}</span>
													</div>
												)}
											</div>
										</div>
									</div>
									<Separator className="mt-4" />
								</div>
							))}
						</div>
					</ScrollArea>
				</CardContent>
			</Card>
		</div>
	)
}

// File Browser ScrollArea
const FileBrowserScroll = () => {
	const fileStructure = [
		{ name: 'Documents', type: 'folder', size: null, modified: '2 days ago', children: [
			{ name: 'Project Proposal.pdf', type: 'pdf', size: '2.4 MB', modified: '2 hours ago' },
			{ name: 'Meeting Notes.docx', type: 'document', size: '856 KB', modified: '1 day ago' },
			{ name: 'Budget Analysis.xlsx', type: 'spreadsheet', size: '1.2 MB', modified: '3 days ago' }
		]},
		{ name: 'Images', type: 'folder', size: null, modified: '1 week ago', children: [
			{ name: 'Screenshot 2024-01-15.png', type: 'image', size: '1.8 MB', modified: '2 days ago' },
			{ name: 'Profile Picture.jpg', type: 'image', size: '456 KB', modified: '1 week ago' },
			{ name: 'Logo Design.svg', type: 'image', size: '234 KB', modified: '2 weeks ago' }
		]},
		{ name: 'Videos', type: 'folder', size: null, modified: '3 days ago', children: [
			{ name: 'Tutorial Recording.mp4', type: 'video', size: '125 MB', modified: '3 days ago' },
			{ name: 'Team Meeting.mov', type: 'video', size: '89 MB', modified: '1 week ago' }
		]},
		{ name: 'Music', type: 'folder', size: null, modified: '1 month ago', children: [
			{ name: 'Background Music.mp3', type: 'audio', size: '4.2 MB', modified: '1 month ago' },
			{ name: 'Podcast Episode.m4a', type: 'audio', size: '45 MB', modified: '2 weeks ago' }
		]}
	]

	const getFileIcon = (type: string) => {
		switch (type) {
			case 'folder': return <FolderIcon className="w-4 h-4 text-blue-600" />
			case 'pdf':
			case 'document': return <FileTextIcon className="w-4 h-4 text-red-600" />
			case 'spreadsheet': return <FileTextIcon className="w-4 h-4 text-green-600" />
			case 'image': return <ImageIcon className="w-4 h-4 text-purple-600" />
			case 'video': return <VideoIcon className="w-4 h-4 text-blue-600" />
			case 'audio': return <MusicIcon className="w-4 h-4 text-orange-600" />
			default: return <FileTextIcon className="w-4 h-4" />
		}
	}

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold flex items-center gap-2">
					<FolderIcon className="w-5 h-5" />
					File Browser
				</Label>
				<p className="text-sm text-muted-foreground">Hierarchical file and folder browser with detailed information</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>My Files</CardTitle>
					<CardDescription>Browse through your organized file structure</CardDescription>
				</CardHeader>
				<CardContent>
					<ScrollArea className="h-80 w-full rounded-md border">
						<div className="p-4">
							{fileStructure.map((folder, folderIndex) => (
								<div key={folderIndex} className="mb-4">
									<div className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded">
										{getFileIcon(folder.type)}
										<span className="font-medium">{folder.name}</span>
										<span className="text-xs text-muted-foreground ml-auto">{folder.modified}</span>
									</div>
									{folder.children && (
										<div className="ml-6 mt-2 space-y-1">
											{folder.children.map((file, fileIndex) => (
												<div key={fileIndex} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded">
													{getFileIcon(file.type)}
													<span className="text-sm">{file.name}</span>
													<span className="text-xs text-muted-foreground">{file.size}</span>
													<span className="text-xs text-muted-foreground ml-auto">{file.modified}</span>
												</div>
											))}
										</div>
									)}
								</div>
							))}
						</div>
					</ScrollArea>
				</CardContent>
			</Card>
		</div>
	)
}

// Chat Messages ScrollArea
const ChatMessagesScroll = () => {
	const [newMessage, setNewMessage] = useState('')
	
	const messages = [
		{ id: 1, author: 'Sarah Johnson', time: '10:30 AM', message: 'Hey team! How\'s everyone doing today?', isOwn: false },
		{ id: 2, author: 'You', time: '10:32 AM', message: 'Good morning! Just finished the design review.', isOwn: true },
		{ id: 3, author: 'Mike Chen', time: '10:35 AM', message: 'Great work on the new components! The spacing looks perfect.', isOwn: false },
		{ id: 4, author: 'Emily Davis', time: '10:38 AM', message: 'I agree! Should we schedule a quick sync to discuss the next steps?', isOwn: false },
		{ id: 5, author: 'You', time: '10:40 AM', message: 'Sounds good! I\'m free after 2 PM today.', isOwn: true },
		{ id: 6, author: 'Sarah Johnson', time: '10:42 AM', message: 'Perfect! I\'ll send out a calendar invite for 2:30 PM.', isOwn: false },
		{ id: 7, author: 'Mike Chen', time: '10:45 AM', message: 'Works for me. I\'ll prepare the technical requirements doc.', isOwn: false },
		{ id: 8, author: 'Emily Davis', time: '10:47 AM', message: 'I\'ll have the user research findings ready to share as well.', isOwn: false },
		{ id: 9, author: 'You', time: '10:50 AM', message: 'Excellent! This is going to be a productive meeting.', isOwn: true }
	]

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold flex items-center gap-2">
					<MessageSquareIcon className="w-5 h-5" />
					Chat Messages
				</Label>
				<p className="text-sm text-muted-foreground">Real-time chat interface with scrollable message history</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<div className="flex -space-x-2">
							{[1, 2, 3].map((i) => (
								<Avatar key={i} className="w-6 h-6 border-2 border-white">
									<AvatarImage src="https://github.com/shadcn.png" />
									<AvatarFallback>U{i}</AvatarFallback>
								</Avatar>
							))}
						</div>
						Team Discussion
						<Badge variant="secondary" className="text-xs">4 members</Badge>
					</CardTitle>
					<CardDescription>Daily standup chat with the design team</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<ScrollArea className="h-64 w-full rounded-md border">
							<div className="p-4 space-y-4">
								{messages.map((message) => (
									<div key={message.id} className={`flex gap-3 ${message.isOwn ? 'flex-row-reverse' : ''}`}>
										{!message.isOwn && (
											<Avatar className="w-8 h-8">
												<AvatarImage src="https://github.com/shadcn.png" />
												<AvatarFallback>{message.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
											</Avatar>
										)}
										<div className={`flex-1 space-y-1 ${message.isOwn ? 'text-right' : ''}`}>
											<div className="flex items-center gap-2">
												{message.isOwn ? (
													<>
														<span className="text-xs text-muted-foreground">{message.time}</span>
														<span className="text-sm font-medium">{message.author}</span>
													</>
												) : (
													<>
														<span className="text-sm font-medium">{message.author}</span>
														<span className="text-xs text-muted-foreground">{message.time}</span>
													</>
												)}
											</div>
											<div className={`text-sm p-3 rounded-lg ${
												message.isOwn 
													? 'bg-blue-600 text-white ml-auto max-w-xs' 
													: 'bg-gray-100 max-w-xs'
											}`}>
												{message.message}
											</div>
										</div>
									</div>
								))}
							</div>
						</ScrollArea>
						
						<div className="flex gap-2">
							<Textarea
								placeholder="Type your message..."
								value={newMessage}
								onChange={(e) => setNewMessage(e.target.value)}
								className="flex-1"
								rows={2}
							/>
							<Button className="self-end">Send</Button>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}

// Code Documentation ScrollArea
const CodeDocumentationScroll = () => {
	const documentationSections = [
		{
			title: 'Getting Started',
			content: 'Welcome to our comprehensive documentation. This guide will help you get up and running quickly with our component library.',
			subsections: ['Installation', 'Quick Start', 'Basic Usage']
		},
		{
			title: 'Components',
			content: 'Detailed documentation for all available components including props, examples, and best practices.',
			subsections: ['Button', 'Input', 'Card', 'Modal', 'Table', 'Form']
		},
		{
			title: 'Styling',
			content: 'Learn how to customize the appearance of components using our theming system and CSS variables.',
			subsections: ['Theme Configuration', 'CSS Variables', 'Custom Styling']
		},
		{
			title: 'Advanced Usage',
			content: 'Advanced patterns and techniques for building complex applications with our component library.',
			subsections: ['Composition', 'State Management', 'Performance']
		},
		{
			title: 'API Reference',
			content: 'Complete API documentation including all props, methods, and event handlers for each component.',
			subsections: ['Props', 'Methods', 'Events', 'Types']
		}
	]

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold flex items-center gap-2">
					<BookIcon className="w-5 h-5" />
					Documentation
				</Label>
				<p className="text-sm text-muted-foreground">Technical documentation with nested sections and detailed content</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Component Library Docs</CardTitle>
					<CardDescription>Comprehensive documentation and API reference</CardDescription>
				</CardHeader>
				<CardContent>
					<ScrollArea className="h-80 w-full rounded-md border">
						<div className="p-6 space-y-6">
							{documentationSections.map((section, index) => (
								<div key={index}>
									<h3 className="font-semibold text-lg mb-2">{section.title}</h3>
									<p className="text-muted-foreground mb-4">{section.content}</p>
									<div className="ml-4 space-y-2">
										{section.subsections.map((subsection, subIndex) => (
											<div key={subIndex} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
												<div className="w-1 h-1 bg-gray-400 rounded-full"></div>
												<span className="text-sm">{subsection}</span>
											</div>
										))}
									</div>
									{index < documentationSections.length - 1 && <Separator className="mt-6" />}
								</div>
							))}
						</div>
					</ScrollArea>
				</CardContent>
			</Card>
		</div>
	)
}

// Basic ScrollArea Examples
const BasicScrollAreaExamples = () => {
	const tags = Array.from({ length: 50 }, (_, i) => `v1.2.0-beta.${50 - i}`)
	const longText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.`

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold">Basic ScrollArea Examples</Label>
				<p className="text-sm text-muted-foreground">Simple scroll areas with different content types and configurations</p>
			</div>

			<div className="space-y-8">
				<div>
					<Label className="font-medium mb-3 block">Version Tags List</Label>
					<ScrollArea className="h-48 w-48 rounded-md border">
						<div className="p-4">
							<h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
							{tags.map((tag) => (
								<div key={tag}>
									<div className="text-sm py-1">{tag}</div>
									<Separator className="my-2" />
								</div>
							))}
						</div>
					</ScrollArea>
				</div>

				<div>
					<Label className="font-medium mb-3 block">Long Text Content</Label>
					<ScrollArea className="h-32 w-80 rounded-md border">
						<div className="p-4">
							<h4 className="mb-4 text-sm font-medium leading-none">Article Content</h4>
							<p className="text-sm leading-relaxed">{longText}</p>
						</div>
					</ScrollArea>
				</div>

				<div>
					<Label className="font-medium mb-3 block">Horizontal Scroll</Label>
					<ScrollArea className="w-96 whitespace-nowrap rounded-md border">
						<div className="flex w-max space-x-4 p-4">
							{Array.from({ length: 20 }, (_, i) => (
								<div key={i} className="shrink-0">
									<div className="w-32 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-medium">
										Item {i + 1}
									</div>
								</div>
							))}
						</div>
					</ScrollArea>
				</div>

				<div>
					<Label className="font-medium mb-3 block">Grid Content</Label>
					<ScrollArea className="h-64 w-full rounded-md border">
						<div className="p-4">
							<div className="grid grid-cols-4 gap-4">
								{Array.from({ length: 48 }, (_, i) => (
									<div key={i} className="h-16 bg-gray-100 rounded-lg flex items-center justify-center text-sm font-medium">
										{i + 1}
									</div>
								))}
							</div>
						</div>
					</ScrollArea>
				</div>
			</div>
		</div>
	)
}

export default function ScrollAreaSample() {
	const [showAdvanced, setShowAdvanced] = useState(false)

	return (
		<Fragment>
			<ComponentDoc
				title="Scroll Area"
				description="Custom-styled scrollable containers that enhance native scrolling with consistent cross-browser styling. Perfect for content feeds, file browsers, chat interfaces, and any scrollable content requiring custom appearance."
				component={
					<div className="flex flex-col gap-8 w-full max-w-6xl">
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
							<Badge variant="outline">{showAdvanced ? '5' : '4'} Examples</Badge>
						</div>

						{/* Real-World Examples */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Scroll Area Applications</h3>
							<div className="grid grid-cols-1 gap-8">
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<MessageSquareIcon className="w-5 h-5" />
											Content Feeds
										</CardTitle>
										<CardDescription>Social media and news feeds with scrollable content</CardDescription>
									</CardHeader>
									<CardContent>
										<ContentFeedScroll />
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<FolderIcon className="w-5 h-5" />
											File Management
										</CardTitle>
										<CardDescription>File browsers and directory listings with hierarchical content</CardDescription>
									</CardHeader>
									<CardContent>
										<FileBrowserScroll />
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<MessageSquareIcon className="w-5 h-5" />
											Chat Interfaces
										</CardTitle>
										<CardDescription>Real-time messaging with scrollable conversation history</CardDescription>
									</CardHeader>
									<CardContent>
										<ChatMessagesScroll />
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<BookIcon className="w-5 h-5" />
											Documentation
										</CardTitle>
										<CardDescription>Technical documentation with nested sections and detailed content</CardDescription>
									</CardHeader>
									<CardContent>
										<CodeDocumentationScroll />
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
											<ScrollIcon className="w-5 h-5" />
											Simple Configurations
										</CardTitle>
										<CardDescription>Basic scroll areas with different content types and orientations</CardDescription>
									</CardHeader>
									<CardContent>
										<BasicScrollAreaExamples />
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
								<CardDescription>Best practices for implementing scroll areas</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div>
										<h4 className="font-semibold mb-2">When to Use</h4>
										<ul className="space-y-1 text-sm text-muted-foreground">
											<li>• For content that exceeds container dimensions</li>
											<li>• In feeds and lists that require custom styling</li>
											<li>• When native scrollbars don't match your design</li>
											<li>• For chat interfaces and message histories</li>
											<li>• In file browsers and hierarchical content</li>
										</ul>
									</div>
									<Separator />
									<div>
										<h4 className="font-semibold mb-2">Design Principles</h4>
										<ul className="space-y-1 text-sm text-muted-foreground">
											<li>• Set appropriate height constraints for vertical scrolling</li>
											<li>• Use consistent spacing and padding within scroll areas</li>
											<li>• Consider scroll position preservation for dynamic content</li>
											<li>• Provide visual indicators for scrollable content</li>
											<li>• Ensure accessibility with keyboard navigation support</li>
											<li>• Test on different devices and input methods</li>
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
										<strong>Total Examples:</strong> {showAdvanced ? '5' : '4'}
									</p>
								</div>
								<div>
									<p>
										<strong>Use Cases:</strong> Feeds, Files, Chat, Documentation{showAdvanced ? ', Basic' : ''}
									</p>
									<p>
										<strong>Features:</strong> Custom Styling, Cross-browser, Responsive, Accessible
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