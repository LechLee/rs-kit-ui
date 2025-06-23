import { Fragment, useState, useEffect } from 'react'
import {
	Progress,
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
	AvatarImage
} from '@rs-kit/ui-kit'
import {
	DownloadIcon,
	UploadIcon,
	HardDriveIcon,
	TrendingUpIcon,
	BarChartIcon,
	CheckIcon,
	ClockIcon,
	PlayIcon,
	PauseIcon,
	RotateCcwIcon,
	InfoIcon,
	FileIcon,
	ImageIcon,
	VideoIcon,
	MusicIcon,
	FolderIcon,
	UserIcon,
	ShieldCheckIcon,
	StarIcon,
	TrophyIcon,
	BookOpenIcon,
	GraduationCapIcon,
	TargetIcon,
	BatteryIcon,
	WifiIcon,
	CpuIcon,
	MemoryStickIcon
} from 'lucide-react'
import { ComponentDoc } from '@/components/ComponentDoc'

// File Upload Progress
const FileUploadProgress = () => {
	const [uploads, setUploads] = useState([
		{ id: 1, name: 'presentation.pptx', size: '15.2 MB', progress: 100, status: 'completed', type: 'presentation' },
		{ id: 2, name: 'project-images.zip', size: '45.8 MB', progress: 78, status: 'uploading', type: 'archive' },
		{ id: 3, name: 'demo-video.mp4', size: '128.5 MB', progress: 45, status: 'uploading', type: 'video' },
		{ id: 4, name: 'report.pdf', size: '3.2 MB', progress: 0, status: 'pending', type: 'document' },
		{ id: 5, name: 'audio-track.mp3', size: '8.7 MB', progress: 0, status: 'pending', type: 'audio' }
	])

	const [isUploading, setIsUploading] = useState(true)

	useEffect(() => {
		if (!isUploading) return

		const interval = setInterval(() => {
			setUploads(prev => prev.map(upload => {
				if (upload.status === 'uploading' && upload.progress < 100) {
					const newProgress = Math.min(upload.progress + Math.random() * 10, 100)
					return {
						...upload,
						progress: newProgress,
						status: newProgress >= 100 ? 'completed' : 'uploading'
					}
				}
				if (upload.status === 'pending' && Math.random() > 0.8) {
					return { ...upload, status: 'uploading', progress: 1 }
				}
				return upload
			}))
		}, 500)

		return () => clearInterval(interval)
	}, [isUploading])

	const getFileIcon = (type: string) => {
		switch (type) {
			case 'video': return VideoIcon
			case 'audio': return MusicIcon
			case 'document': return FileIcon
			case 'presentation': return FileIcon
			case 'archive': return FolderIcon
			default: return FileIcon
		}
	}

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'completed': return 'text-green-600'
			case 'uploading': return 'text-blue-600'
			case 'pending': return 'text-gray-400'
			default: return 'text-gray-400'
		}
	}

	const totalFiles = uploads.length
	const completedFiles = uploads.filter(u => u.status === 'completed').length
	const overallProgress = (completedFiles / totalFiles) * 100

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold flex items-center gap-2">
					<UploadIcon className="w-5 h-5" />
					File Upload Manager
				</Label>
				<p className="text-sm text-muted-foreground">Track multiple file uploads with individual and overall progress</p>
			</div>

			<div className="space-y-4">
				{/* Overall Progress */}
				<Card>
					<CardContent className="p-4">
						<div className="space-y-3">
							<div className="flex items-center justify-between">
								<span className="font-medium">Overall Progress</span>
								<div className="flex items-center gap-2">
									<span className="text-sm text-muted-foreground">{completedFiles} of {totalFiles} files</span>
									<Badge variant={completedFiles === totalFiles ? 'default' : 'secondary'}>
										{Math.round(overallProgress)}%
									</Badge>
								</div>
							</div>
							<Progress value={overallProgress} className="h-3" />
							<div className="flex gap-2">
								<Button 
									size="sm" 
									variant={isUploading ? "outline" : "default"}
									onClick={() => setIsUploading(!isUploading)}
								>
									{isUploading ? (
										<>
											<PauseIcon className="w-3 h-3 mr-1" />
											Pause
										</>
									) : (
										<>
											<PlayIcon className="w-3 h-3 mr-1" />
											Resume
										</>
									)}
								</Button>
								<Button size="sm" variant="outline">
									<RotateCcwIcon className="w-3 h-3 mr-1" />
									Retry Failed
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Individual File Progress */}
				<div className="space-y-2">
					{uploads.map((upload) => {
						const IconComponent = getFileIcon(upload.type)
						return (
							<Card key={upload.id} className="hover:shadow-sm transition-shadow">
								<CardContent className="p-4">
									<div className="flex items-center gap-3">
										<div className={`p-2 rounded-lg bg-gray-100 ${getStatusColor(upload.status)}`}>
											<IconComponent className="w-4 h-4" />
										</div>
										<div className="flex-1 min-w-0">
											<div className="flex items-center justify-between mb-1">
												<p className="font-medium text-sm truncate">{upload.name}</p>
												<div className="flex items-center gap-2">
													<span className="text-xs text-muted-foreground">{upload.size}</span>
													{upload.status === 'completed' && (
														<CheckIcon className="w-4 h-4 text-green-600" />
													)}
												</div>
											</div>
											<div className="space-y-1">
												<Progress 
													value={upload.progress} 
													className="h-1"
												/>
												<div className="flex items-center justify-between text-xs text-muted-foreground">
													<span className="capitalize">{upload.status}</span>
													<span>{Math.round(upload.progress)}%</span>
												</div>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
						)
					})}
				</div>
			</div>
		</div>
	)
}

// System Performance Dashboard
const SystemPerformanceDashboard = () => {
	const [metrics, setMetrics] = useState({
		cpu: 45,
		memory: 68,
		disk: 82,
		network: 23,
		battery: 76
	})

	useEffect(() => {
		const interval = setInterval(() => {
			setMetrics(prev => ({
				cpu: Math.max(0, Math.min(100, prev.cpu + (Math.random() - 0.5) * 10)),
				memory: Math.max(0, Math.min(100, prev.memory + (Math.random() - 0.5) * 5)),
				disk: Math.max(0, Math.min(100, prev.disk + (Math.random() - 0.5) * 2)),
				network: Math.max(0, Math.min(100, prev.network + (Math.random() - 0.5) * 15)),
				battery: Math.max(0, Math.min(100, prev.battery - 0.1))
			}))
		}, 1000)

		return () => clearInterval(interval)
	}, [])

	const getColorClass = (value: number) => {
		if (value < 30) return 'text-green-600'
		if (value < 70) return 'text-yellow-600'
		return 'text-red-600'
	}

	const getProgressColor = (value: number) => {
		if (value < 30) return ''
		if (value < 70) return 'bg-yellow-500'
		return 'bg-red-500'
	}

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold flex items-center gap-2">
					<BarChartIcon className="w-5 h-5" />
					System Performance Monitor
				</Label>
				<p className="text-sm text-muted-foreground">Real-time system resource usage with color-coded alerts</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<Card>
					<CardContent className="p-4">
						<div className="space-y-3">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<CpuIcon className="w-4 h-4 text-blue-600" />
									<span className="font-medium">CPU Usage</span>
								</div>
								<span className={`font-bold ${getColorClass(metrics.cpu)}`}>
									{Math.round(metrics.cpu)}%
								</span>
							</div>
							<Progress 
								value={metrics.cpu} 
								className="h-2"
							/>
							<p className="text-xs text-muted-foreground">
								{metrics.cpu < 30 ? 'Normal' : metrics.cpu < 70 ? 'Moderate' : 'High'} usage
							</p>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent className="p-4">
						<div className="space-y-3">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<MemoryStickIcon className="w-4 h-4 text-purple-600" />
									<span className="font-medium">Memory</span>
								</div>
								<span className={`font-bold ${getColorClass(metrics.memory)}`}>
									{Math.round(metrics.memory)}%
								</span>
							</div>
							<Progress 
								value={metrics.memory} 
								className="h-2"
							/>
							<p className="text-xs text-muted-foreground">
								{(8 * metrics.memory / 100).toFixed(1)} GB of 8 GB used
							</p>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent className="p-4">
						<div className="space-y-3">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<HardDriveIcon className="w-4 h-4 text-green-600" />
									<span className="font-medium">Disk Space</span>
								</div>
								<span className={`font-bold ${getColorClass(metrics.disk)}`}>
									{Math.round(metrics.disk)}%
								</span>
							</div>
							<Progress 
								value={metrics.disk} 
								className="h-2"
							/>
							<p className="text-xs text-muted-foreground">
								{(512 * metrics.disk / 100).toFixed(0)} GB of 512 GB used
							</p>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent className="p-4">
						<div className="space-y-3">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<WifiIcon className="w-4 h-4 text-blue-500" />
									<span className="font-medium">Network</span>
								</div>
								<span className={`font-bold ${getColorClass(metrics.network)}`}>
									{Math.round(metrics.network)}%
								</span>
							</div>
							<Progress 
								value={metrics.network} 
								className="h-2"
							/>
							<p className="text-xs text-muted-foreground">
								{(metrics.network * 1.2).toFixed(1)} Mbps of 120 Mbps
							</p>
						</div>
					</CardContent>
				</Card>
			</div>

			<Card>
				<CardContent className="p-4">
					<div className="space-y-3">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								<BatteryIcon className="w-4 h-4 text-orange-600" />
								<span className="font-medium">Battery Level</span>
							</div>
							<span className="font-bold text-orange-600">
								{Math.round(metrics.battery)}%
							</span>
						</div>
						<Progress 
							value={metrics.battery} 
							className="h-3"
						/>
						<div className="flex items-center justify-between text-xs text-muted-foreground">
							<span>
								{metrics.battery > 50 ? 'Good' : metrics.battery > 20 ? 'Low' : 'Critical'} battery level
							</span>
							<span>
								{Math.round((metrics.battery / 100) * 4.2)}h remaining
							</span>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}

// Learning Progress Tracker
const LearningProgressTracker = () => {
	const [courses, setCourses] = useState([
		{
			id: 1,
			title: 'React Fundamentals',
			instructor: 'Sarah Johnson',
			totalLessons: 25,
			completedLessons: 18,
			category: 'Frontend',
			difficulty: 'Beginner',
			timeSpent: 12.5,
			estimatedTime: 20
		},
		{
			id: 2,
			title: 'Advanced TypeScript',
			instructor: 'Mike Chen',
			totalLessons: 40,
			completedLessons: 8,
			category: 'Programming',
			difficulty: 'Advanced',
			timeSpent: 6.2,
			estimatedTime: 35
		},
		{
			id: 3,
			title: 'UI/UX Design Principles',
			instructor: 'Emily Davis',
			totalLessons: 30,
			completedLessons: 30,
			category: 'Design',
			difficulty: 'Intermediate',
			timeSpent: 22.0,
			estimatedTime: 25
		},
		{
			id: 4,
			title: 'Node.js Backend Development',
			instructor: 'David Wilson',
			totalLessons: 35,
			completedLessons: 14,
			category: 'Backend',
			difficulty: 'Intermediate',
			timeSpent: 8.7,
			estimatedTime: 28
		}
	])

	const getDifficultyColor = (difficulty: string) => {
		switch (difficulty) {
			case 'Beginner': return 'bg-green-100 text-green-700'
			case 'Intermediate': return 'bg-yellow-100 text-yellow-700'
			case 'Advanced': return 'bg-red-100 text-red-700'
			default: return 'bg-gray-100 text-gray-700'
		}
	}

	const totalProgress = courses.reduce((acc, course) => acc + (course.completedLessons / course.totalLessons), 0) / courses.length * 100
	const completedCourses = courses.filter(course => course.completedLessons === course.totalLessons).length

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold flex items-center gap-2">
					<GraduationCapIcon className="w-5 h-5" />
					Learning Dashboard
				</Label>
				<p className="text-sm text-muted-foreground">Track course progress with detailed completion metrics and time tracking</p>
			</div>

			<div className="space-y-4">
				{/* Overall Progress */}
				<Card>
					<CardContent className="p-4">
						<div className="space-y-3">
							<div className="flex items-center justify-between">
								<span className="font-medium">Overall Learning Progress</span>
								<div className="flex items-center gap-2">
									<TrophyIcon className="w-4 h-4 text-yellow-600" />
									<span className="text-sm text-muted-foreground">{completedCourses} courses completed</span>
								</div>
							</div>
							<Progress value={totalProgress} className="h-3" />
							<div className="grid grid-cols-3 gap-4 text-center">
								<div>
									<p className="text-sm font-medium">{Math.round(totalProgress)}%</p>
									<p className="text-xs text-muted-foreground">Complete</p>
								</div>
								<div>
									<p className="text-sm font-medium">{courses.length}</p>
									<p className="text-xs text-muted-foreground">Total Courses</p>
								</div>
								<div>
									<p className="text-sm font-medium">{courses.reduce((acc, course) => acc + course.timeSpent, 0).toFixed(1)}h</p>
									<p className="text-xs text-muted-foreground">Time Spent</p>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Individual Courses */}
				<div className="space-y-3">
					{courses.map((course) => {
						const progress = (course.completedLessons / course.totalLessons) * 100
						const isCompleted = course.completedLessons === course.totalLessons
						
						return (
							<Card key={course.id} className="hover:shadow-md transition-shadow">
								<CardContent className="p-4">
									<div className="space-y-3">
										<div className="flex items-start justify-between">
											<div className="flex-1">
												<div className="flex items-center gap-2 mb-1">
													<h3 className="font-semibold">{course.title}</h3>
													{isCompleted && <CheckIcon className="w-4 h-4 text-green-600" />}
												</div>
												<p className="text-sm text-muted-foreground">by {course.instructor}</p>
												<div className="flex items-center gap-2 mt-2">
													<Badge variant="outline" className={getDifficultyColor(course.difficulty)}>
														{course.difficulty}
													</Badge>
													<Badge variant="outline">{course.category}</Badge>
												</div>
											</div>
											<Avatar className="w-8 h-8">
												<AvatarFallback>{course.instructor.split(' ').map(n => n[0]).join('')}</AvatarFallback>
											</Avatar>
										</div>
										
										<div className="space-y-2">
											<div className="flex items-center justify-between text-sm">
												<span>Progress: {course.completedLessons} of {course.totalLessons} lessons</span>
												<span className="font-medium">{Math.round(progress)}%</span>
											</div>
											<Progress value={progress} className="h-2" />
											<div className="flex items-center justify-between text-xs text-muted-foreground">
												<span>
													<ClockIcon className="w-3 h-3 inline mr-1" />
													{course.timeSpent}h of {course.estimatedTime}h
												</span>
												{isCompleted ? (
													<span className="text-green-600 font-medium">✓ Completed</span>
												) : (
													<span>{Math.max(0, course.estimatedTime - course.timeSpent).toFixed(1)}h remaining</span>
												)}
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
						)
					})}
				</div>
			</div>
		</div>
	)
}

// Basic Progress Examples
const BasicProgressExamples = () => {
	const [staticProgress] = useState(65)
	const [animatedProgress, setAnimatedProgress] = useState(0)

	useEffect(() => {
		const timer = setTimeout(() => setAnimatedProgress(75), 500)
		return () => clearTimeout(timer)
	}, [])

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold">Basic Progress Examples</Label>
				<p className="text-sm text-muted-foreground">Simple progress indicators with different sizes and styles</p>
			</div>

			<div className="space-y-8">
				<div>
					<Label className="font-medium mb-3 block">Standard Progress Bar</Label>
					<div className="space-y-3">
						<Progress value={staticProgress} className="w-full" />
						<p className="text-sm text-muted-foreground">{staticProgress}% complete</p>
					</div>
				</div>

				<div>
					<Label className="font-medium mb-3 block">Animated Progress</Label>
					<div className="space-y-3">
						<Progress value={animatedProgress} className="w-full" />
						<p className="text-sm text-muted-foreground">Animates to {animatedProgress}% on load</p>
					</div>
				</div>

				<div>
					<Label className="font-medium mb-3 block">Different Sizes</Label>
					<div className="space-y-4">
						<div>
							<Label className="text-sm mb-2 block">Small (h-1)</Label>
							<Progress value={40} className="w-full h-1" />
						</div>
						<div>
							<Label className="text-sm mb-2 block">Default (h-2)</Label>
							<Progress value={60} className="w-full" />
						</div>
						<div>
							<Label className="text-sm mb-2 block">Large (h-4)</Label>
							<Progress value={80} className="w-full h-4" />
						</div>
					</div>
				</div>

				<div>
					<Label className="font-medium mb-3 block">With Labels</Label>
					<div className="space-y-4">
						{[
							{ label: 'HTML/CSS', value: 90, color: 'text-blue-600' },
							{ label: 'JavaScript', value: 75, color: 'text-yellow-600' },
							{ label: 'React', value: 60, color: 'text-green-600' },
							{ label: 'TypeScript', value: 45, color: 'text-purple-600' }
						].map((skill) => (
							<div key={skill.label}>
								<div className="flex items-center justify-between mb-1">
									<span className="text-sm font-medium">{skill.label}</span>
									<span className={`text-sm font-bold ${skill.color}`}>{skill.value}%</span>
								</div>
								<Progress value={skill.value} className="w-full" />
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default function ProgressSample() {
	const [showAdvanced, setShowAdvanced] = useState(false)

	return (
		<Fragment>
			<ComponentDoc
				title="Progress"
				description="Visual indicators showing completion progress of tasks, processes, and goals. Perfect for file uploads, system monitoring, learning tracking, and any process requiring progress visualization."
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
							<Badge variant="outline">{showAdvanced ? '4' : '3'} Examples</Badge>
						</div>

						{/* Real-World Examples */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Progress Applications</h3>
							<div className="grid grid-cols-1 gap-8">
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<UploadIcon className="w-5 h-5" />
											File Upload Manager
										</CardTitle>
										<CardDescription>Multi-file upload tracking with individual and overall progress</CardDescription>
									</CardHeader>
									<CardContent>
										<FileUploadProgress />
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<BarChartIcon className="w-5 h-5" />
											System Performance
										</CardTitle>
										<CardDescription>Real-time system resource monitoring with colored indicators</CardDescription>
									</CardHeader>
									<CardContent>
										<SystemPerformanceDashboard />
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<GraduationCapIcon className="w-5 h-5" />
											Learning Progress
										</CardTitle>
										<CardDescription>Course completion tracking with time and lesson progress</CardDescription>
									</CardHeader>
									<CardContent>
										<LearningProgressTracker />
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
											<TrendingUpIcon className="w-5 h-5" />
											Simple Progress
										</CardTitle>
										<CardDescription>Basic progress bars with different configurations</CardDescription>
									</CardHeader>
									<CardContent>
										<BasicProgressExamples />
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
								<CardDescription>Best practices for implementing progress indicators</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div>
										<h4 className="font-semibold mb-2">When to Use</h4>
										<ul className="space-y-1 text-sm text-muted-foreground">
											<li>• For file uploads and downloads with known duration</li>
											<li>• To show system resource usage and capacity</li>
											<li>• In learning platforms to track course completion</li>
											<li>• For multi-step processes and wizards</li>
											<li>• When displaying skill levels or proficiency</li>
										</ul>
									</div>
									<div className="border-t pt-4">
										<h4 className="font-semibold mb-2">Design Principles</h4>
										<ul className="space-y-1 text-sm text-muted-foreground">
											<li>• Always provide context with labels and percentages</li>
											<li>• Use colors to indicate status (success, warning, error)</li>
											<li>• Include time estimates when progress duration is known</li>
											<li>• Consider animations for better user experience</li>
											<li>• Group related progress bars logically</li>
											<li>• Ensure progress updates are smooth and not jarring</li>
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
										<strong>Use Cases:</strong> Uploads, System Monitor, Learning{showAdvanced ? ', Basic' : ''}
									</p>
									<p>
										<strong>Features:</strong> Animation, Colors, Labels, Real-time Updates
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
