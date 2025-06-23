import { Fragment, useEffect, useState } from 'react'
import {
	Textarea,
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
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@rs-kit/ui-kit'
import {
	MessageSquareIcon,
	MailIcon,
	FileTextIcon,
	EditIcon,
	SendIcon,
	SaveIcon,
	CopyIcon,
	ClipboardIcon,
	StarIcon,
	AlertTriangleIcon,
	CheckIcon,
	InfoIcon,
	MessageCircleIcon,
	PenToolIcon,
	BookOpenIcon,
	CodeIcon,
	HashIcon,
	UserIcon,
	CalendarIcon,
	ClockIcon
} from 'lucide-react'
import { ComponentDoc } from '@/components/ComponentDoc'

// Contact Form with Validation
const ContactFormTextarea = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		subject: '',
		message: '',
		priority: 'medium'
	})
	const [errors, setErrors] = useState<string[]>([])
	const [isSubmitting, setIsSubmitting] = useState(false)

	const validateForm = () => {
		const newErrors: string[] = []
		if (!formData.name.trim()) newErrors.push('Name is required')
		if (!formData.email.trim()) newErrors.push('Email is required')
		if (!formData.message.trim()) newErrors.push('Message is required')
		if (formData.message.length < 10) newErrors.push('Message must be at least 10 characters')
		setErrors(newErrors)
		return newErrors.length === 0
	}

	const handleSubmit = async () => {
		if (!validateForm()) return
		setIsSubmitting(true)
		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 1500))
		setIsSubmitting(false)
		setFormData({ name: '', email: '', subject: '', message: '', priority: 'medium' })
		setErrors([])
	}

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold">Contact Support</Label>
				<p className="text-sm text-muted-foreground">Send us a detailed message and we'll get back to you</p>
			</div>

			{errors.length > 0 && (
				<Alert variant="destructive">
					<AlertTriangleIcon className="h-4 w-4" />
					<AlertDescription>
						<ul className="list-disc list-inside space-y-1">
							{errors.map((error, index) => (
								<li key={index}>{error}</li>
							))}
						</ul>
					</AlertDescription>
				</Alert>
			)}

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="space-y-2">
					<Label htmlFor="contact-name" className="flex items-center gap-2">
						<UserIcon className="w-4 h-4" />
						Full Name
						<span className="text-red-500">*</span>
					</Label>
					<Input id="contact-name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Enter your full name" />
				</div>

				<div className="space-y-2">
					<Label htmlFor="contact-email" className="flex items-center gap-2">
						<MailIcon className="w-4 h-4" />
						Email Address
						<span className="text-red-500">*</span>
					</Label>
					<Input id="contact-email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="your.email@example.com" />
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="space-y-2">
					<Label htmlFor="contact-subject">Subject</Label>
					<Input id="contact-subject" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} placeholder="Brief subject line" />
				</div>

				<div className="space-y-2">
					<Label htmlFor="contact-priority">Priority</Label>
					<Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
						<SelectTrigger id="contact-priority">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="low">Low Priority</SelectItem>
							<SelectItem value="medium">Medium Priority</SelectItem>
							<SelectItem value="high">High Priority</SelectItem>
							<SelectItem value="urgent">Urgent</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>

			<div className="space-y-2">
				<Label htmlFor="contact-message" className="flex items-center gap-2">
					<MessageSquareIcon className="w-4 h-4" />
					Message
					<span className="text-red-500">*</span>
				</Label>
				<Textarea
					id="contact-message"
					value={formData.message}
					onChange={(e) => setFormData({ ...formData, message: e.target.value })}
					placeholder="Please describe your inquiry in detail. Include any relevant information that would help us assist you better..."
					rows={6}
					className="resize-none"
				/>
				<div className="flex justify-between items-center text-xs text-muted-foreground">
					<span>Minimum 10 characters required</span>
					<span className={formData.message.length < 10 ? 'text-red-500' : 'text-green-600'}>{formData.message.length} characters</span>
				</div>
			</div>

			<Button onClick={handleSubmit} disabled={isSubmitting} className="w-full">
				{isSubmitting ? (
					<>
						<ClockIcon className="w-4 h-4 mr-2 animate-spin" />
						Sending...
					</>
				) : (
					<>
						<SendIcon className="w-4 h-4 mr-2" />
						Send Message
					</>
				)}
			</Button>
		</div>
	)
}

// Code Editor with Syntax Support
const CodeEditorTextarea = () => {
	const [code, setCode] = useState(`// Welcome to the code editor
function calculateTotal(items) {
  return items.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0);
}

// Example usage
const cartItems = [
  { name: 'Laptop', price: 999.99, quantity: 1 },
  { name: 'Mouse', price: 29.99, quantity: 2 }
];

const total = calculateTotal(cartItems);
console.log('Total:', total);`)
	const [language, setLanguage] = useState('javascript')
	const [theme, setTheme] = useState('light')

	const lineCount = code.split('\n').length
	const wordCount = code
		.trim()
		.split(/\s+/)
		.filter((word) => word.length > 0).length
	const charCount = code.length

	const handleCopy = async () => {
		await navigator.clipboard.writeText(code)
	}

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<div>
					<Label className="text-lg font-semibold flex items-center gap-2">
						<CodeIcon className="w-5 h-5" />
						Code Editor
					</Label>
					<p className="text-sm text-muted-foreground">Write and edit code with syntax highlighting</p>
				</div>
				<div className="flex gap-2">
					<Button variant="outline" size="sm" onClick={handleCopy}>
						<CopyIcon className="w-4 h-4 mr-1" />
						Copy
					</Button>
					<Button variant="outline" size="sm">
						<SaveIcon className="w-4 h-4 mr-1" />
						Save
					</Button>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="space-y-2">
					<Label htmlFor="language-select">Language</Label>
					<Select value={language} onValueChange={setLanguage}>
						<SelectTrigger id="language-select">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="javascript">JavaScript</SelectItem>
							<SelectItem value="typescript">TypeScript</SelectItem>
							<SelectItem value="python">Python</SelectItem>
							<SelectItem value="html">HTML</SelectItem>
							<SelectItem value="css">CSS</SelectItem>
							<SelectItem value="json">JSON</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div className="space-y-2">
					<Label htmlFor="theme-select">Theme</Label>
					<Select value={theme} onValueChange={setTheme}>
						<SelectTrigger id="theme-select">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="light">Light</SelectItem>
							<SelectItem value="dark">Dark</SelectItem>
							<SelectItem value="monokai">Monokai</SelectItem>
							<SelectItem value="github">GitHub</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>

			<div className="space-y-2">
				<Label htmlFor="code-editor">Code</Label>
				<Textarea
					id="code-editor"
					value={code}
					onChange={(e) => setCode(e.target.value)}
					className={`font-mono text-sm resize-none ${theme === 'dark' ? 'bg-gray-900 text-green-400' : 'bg-gray-50'}`}
					rows={12}
					placeholder="// Start coding here..."
				/>
				<div className="flex justify-between items-center text-xs text-muted-foreground">
					<div className="flex gap-4">
						<span>Lines: {lineCount}</span>
						<span>Words: {wordCount}</span>
						<span>Characters: {charCount}</span>
					</div>
					<Badge variant="secondary">{language.toUpperCase()}</Badge>
				</div>
			</div>
		</div>
	)
}

// Blog Post Writer
const BlogPostWriter = () => {
	const [post, setPost] = useState({
		title: 'Getting Started with React Hooks',
		excerpt: 'Learn how to use React Hooks to manage state and side effects in your functional components.',
		content: `React Hooks have revolutionized the way we write React components. They allow us to use state and other React features in functional components, making our code more readable and reusable.

## What are React Hooks?

Hooks are functions that let you "hook into" React state and lifecycle features from function components. They don't work inside classes — they let you use React without classes.

## The useState Hook

The most commonly used hook is useState, which lets you add state to functional components:

\`\`\`javascript
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

## Best Practices

1. Always call hooks at the top level of your component
2. Only call hooks from React functions
3. Use multiple state variables for unrelated data
4. Consider using useReducer for complex state logic

Hooks make React components more powerful and easier to understand. Start incorporating them into your projects today!`,
		tags: 'react, hooks, javascript, frontend',
		category: 'tutorials'
	})

	const [autosave, setAutosave] = useState(true)
	const [lastSaved, setLastSaved] = useState<Date | null>(null)

	const wordCount = post.content
		.trim()
		.split(/\s+/)
		.filter((word) => word.length > 0).length
	const readingTime = Math.ceil(wordCount / 200) // Assuming 200 words per minute

	// Simulate autosave
	useEffect(() => {
		if (!autosave) return
		const timeoutId = setTimeout(() => {
			setLastSaved(new Date())
		}, 2000)
		return () => clearTimeout(timeoutId)
	}, [post.content, autosave])

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<Label className="text-lg font-semibold flex items-center gap-2">
						<PenToolIcon className="w-5 h-5" />
						Blog Post Editor
					</Label>
					<p className="text-sm text-muted-foreground">Create and edit blog posts with live preview</p>
				</div>
				<div className="flex items-center gap-2">
					<Switch id="autosave" checked={autosave} onCheckedChange={setAutosave} />
					<Label htmlFor="autosave" className="text-sm">
						Autosave
					</Label>
				</div>
			</div>

			{lastSaved && (
				<Alert>
					<CheckIcon className="h-4 w-4" />
					<AlertDescription>Last saved: {lastSaved.toLocaleTimeString()}</AlertDescription>
				</Alert>
			)}

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="space-y-2">
					<Label htmlFor="post-title">Title</Label>
					<Input id="post-title" value={post.title} onChange={(e) => setPost({ ...post, title: e.target.value })} placeholder="Enter post title" />
				</div>

				<div className="space-y-2">
					<Label htmlFor="post-category">Category</Label>
					<Select value={post.category} onValueChange={(value) => setPost({ ...post, category: value })}>
						<SelectTrigger id="post-category">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="tutorials">Tutorials</SelectItem>
							<SelectItem value="news">News</SelectItem>
							<SelectItem value="reviews">Reviews</SelectItem>
							<SelectItem value="guides">Guides</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>

			<div className="space-y-2">
				<Label htmlFor="post-excerpt">Excerpt</Label>
				<Textarea
					id="post-excerpt"
					value={post.excerpt}
					onChange={(e) => setPost({ ...post, excerpt: e.target.value })}
					placeholder="Brief description of the post..."
					rows={2}
					className="resize-none"
				/>
			</div>

			<div className="space-y-2">
				<Label htmlFor="post-content" className="flex items-center justify-between">
					<span>Content</span>
					<div className="flex gap-4 text-xs text-muted-foreground">
						<span>{wordCount} words</span>
						<span>{readingTime} min read</span>
					</div>
				</Label>
				<Textarea
					id="post-content"
					value={post.content}
					onChange={(e) => setPost({ ...post, content: e.target.value })}
					placeholder="Write your blog post content here. You can use Markdown formatting..."
					rows={16}
					className="resize-y font-mono text-sm"
				/>
			</div>

			<div className="space-y-2">
				<Label htmlFor="post-tags">Tags</Label>
				<Input id="post-tags" value={post.tags} onChange={(e) => setPost({ ...post, tags: e.target.value })} placeholder="Separate tags with commas" />
				<p className="text-xs text-muted-foreground">Use relevant keywords to help readers find your content</p>
			</div>

			<div className="flex gap-2">
				<Button variant="outline">
					<SaveIcon className="w-4 h-4 mr-2" />
					Save Draft
				</Button>
				<Button>
					<SendIcon className="w-4 h-4 mr-2" />
					Publish Post
				</Button>
			</div>
		</div>
	)
}

// Review and Feedback Form
const ReviewFeedbackForm = () => {
	const [review, setReview] = useState({
		rating: 5,
		title: 'Excellent product quality!',
		review: `I've been using this product for several months now and I'm thoroughly impressed with its quality and performance. 

Pros:
- Excellent build quality
- User-friendly interface
- Great customer support
- Fast shipping

Cons:
- Slightly expensive
- Could use more color options

Overall, I would definitely recommend this to others. The value for money is great and the company stands behind their product.`,
		recommend: true,
		name: '',
		email: ''
	})

	const [isAnonymous, setIsAnonymous] = useState(true)

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold flex items-center gap-2">
					<StarIcon className="w-5 h-5" />
					Product Review
				</Label>
				<p className="text-sm text-muted-foreground">Share your experience to help other customers</p>
			</div>

			<div className="space-y-2">
				<Label>Rating</Label>
				<div className="flex gap-1">
					{[1, 2, 3, 4, 5].map((star) => (
						<button key={star} onClick={() => setReview({ ...review, rating: star })} className={`w-8 h-8 ${star <= review.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
							<StarIcon className="w-full h-full fill-current" />
						</button>
					))}
					<span className="ml-2 text-sm text-muted-foreground">{review.rating} out of 5 stars</span>
				</div>
			</div>

			<div className="space-y-2">
				<Label htmlFor="review-title">Review Title</Label>
				<Input id="review-title" value={review.title} onChange={(e) => setReview({ ...review, title: e.target.value })} placeholder="Summarize your experience" />
			</div>

			<div className="space-y-2">
				<Label htmlFor="review-content" className="flex items-center justify-between">
					<span>Detailed Review</span>
					<span className="text-xs text-muted-foreground">{review.review.length} characters</span>
				</Label>
				<Textarea
					id="review-content"
					value={review.review}
					onChange={(e) => setReview({ ...review, review: e.target.value })}
					placeholder="Share your detailed experience, including what you liked and any areas for improvement..."
					rows={8}
					className="resize-y"
				/>
				<p className="text-xs text-muted-foreground">Include specific details about the product, shipping, and customer service</p>
			</div>

			<div className="flex items-center space-x-2">
				<Switch id="recommend" checked={review.recommend} onCheckedChange={(checked) => setReview({ ...review, recommend: checked })} />
				<Label htmlFor="recommend">I would recommend this product to others</Label>
			</div>

			<Separator />

			<div className="space-y-4">
				<div className="flex items-center space-x-2">
					<Switch id="anonymous" checked={isAnonymous} onCheckedChange={setIsAnonymous} />
					<Label htmlFor="anonymous">Submit anonymously</Label>
				</div>

				{!isAnonymous && (
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="reviewer-name">Name</Label>
							<Input id="reviewer-name" value={review.name} onChange={(e) => setReview({ ...review, name: e.target.value })} placeholder="Your name" />
						</div>
						<div className="space-y-2">
							<Label htmlFor="reviewer-email">Email</Label>
							<Input id="reviewer-email" type="email" value={review.email} onChange={(e) => setReview({ ...review, email: e.target.value })} placeholder="your.email@example.com" />
						</div>
					</div>
				)}
			</div>

			<Button className="w-full">
				<SendIcon className="w-4 h-4 mr-2" />
				Submit Review
			</Button>
		</div>
	)
}

// Basic Textarea Examples
const BasicTextareaExamples = () => {
	const [basicText, setBasicText] = useState('')
	const [notes, setNotes] = useState('This is a sample note with some content...')
	const [disabledText] = useState('This textarea is disabled and cannot be edited.')

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold">Basic Textarea Examples</Label>
				<p className="text-sm text-muted-foreground">Simple text input areas with different configurations</p>
			</div>

			<div className="space-y-6">
				<div className="space-y-2">
					<Label htmlFor="basic-textarea">Basic Textarea</Label>
					<Textarea id="basic-textarea" value={basicText} onChange={(e) => setBasicText(e.target.value)} placeholder="Type your message here..." rows={4} />
				</div>

				<div className="space-y-2">
					<Label htmlFor="resizable-textarea">Resizable Textarea</Label>
					<Textarea id="resizable-textarea" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Take some notes..." rows={3} className="resize-y" />
					<p className="text-xs text-muted-foreground">This textarea can be resized vertically</p>
				</div>

				<div className="space-y-2">
					<Label htmlFor="fixed-textarea">Fixed Size Textarea</Label>
					<Textarea id="fixed-textarea" placeholder="This textarea cannot be resized..." rows={3} className="resize-none" />
				</div>

				<div className="space-y-2">
					<Label htmlFor="disabled-textarea">Disabled Textarea</Label>
					<Textarea id="disabled-textarea" value={disabledText} disabled rows={2} />
				</div>
			</div>
		</div>
	)
}

export default function TextareaSample() {
	const [showAdvanced, setShowAdvanced] = useState(false)

	return (
		<Fragment>
			<ComponentDoc
				title="Textarea"
				description="Multi-line text input controls for collecting longer text content. Perfect for messages, comments, reviews, code editing, and any content requiring multiple lines."
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
							<Badge variant="outline">{showAdvanced ? '5' : '4'} Examples</Badge>
						</div>

						{/* Real-World Examples */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Form Applications</h3>
							<div className="grid grid-cols-1 gap-8">
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<MailIcon className="w-5 h-5" />
											Contact Form
										</CardTitle>
										<CardDescription>Support contact form with validation and submission handling</CardDescription>
									</CardHeader>
									<CardContent>
										<ContactFormTextarea />
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<CodeIcon className="w-5 h-5" />
											Code Editor
										</CardTitle>
										<CardDescription>Code editing interface with syntax support and statistics</CardDescription>
									</CardHeader>
									<CardContent>
										<CodeEditorTextarea />
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<BookOpenIcon className="w-5 h-5" />
											Blog Post Writer
										</CardTitle>
										<CardDescription>Content management system with autosave and word counting</CardDescription>
									</CardHeader>
									<CardContent>
										<BlogPostWriter />
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<StarIcon className="w-5 h-5" />
											Review & Feedback
										</CardTitle>
										<CardDescription>Product review form with rating system and optional anonymity</CardDescription>
									</CardHeader>
									<CardContent>
										<ReviewFeedbackForm />
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
											<EditIcon className="w-5 h-5" />
											Basic Textareas
										</CardTitle>
										<CardDescription>Simple text input areas with different configurations</CardDescription>
									</CardHeader>
									<CardContent>
										<BasicTextareaExamples />
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
								<CardDescription>Best practices for implementing textarea controls</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div>
										<h4 className="font-semibold mb-2">When to Use</h4>
										<ul className="space-y-1 text-sm text-muted-foreground">
											<li>• For multi-line text input that exceeds single input field capacity</li>
											<li>• For comments, reviews, messages, and feedback forms</li>
											<li>• For code editing, notes, and long-form content creation</li>
											<li>• When users need to see multiple lines of text while typing</li>
											<li>• For content that benefits from formatting and structure</li>
										</ul>
									</div>
									<Separator />
									<div>
										<h4 className="font-semibold mb-2">Design Principles</h4>
										<ul className="space-y-1 text-sm text-muted-foreground">
											<li>• Provide clear labels and helpful placeholder text</li>
											<li>• Set appropriate default heights based on expected content length</li>
											<li>• Include character or word counts for length-limited fields</li>
											<li>• Consider enabling/disabling resize based on layout needs</li>
											<li>• Implement validation and provide clear error messaging</li>
											<li>• Use autosave for important content to prevent data loss</li>
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
										<strong>Form Types:</strong> Contact, Code, Blog, Review{showAdvanced ? ', Basic' : ''}
									</p>
									<p>
										<strong>Features:</strong> Validation, Word Count, Autosave, Character Limits
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
