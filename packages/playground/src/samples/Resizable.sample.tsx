import { Fragment, useState } from 'react'
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
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
	Textarea,
	Input,
	ScrollArea
} from '@rs-kit/ui-kit'
import {
	LayoutIcon,
	SidebarIcon,
	TerminalIcon,
	FileIcon,
	FolderIcon,
	CodeIcon,
	ImageIcon,
	SettingsIcon,
	SearchIcon,
	PlayIcon,
	PauseIcon,
	VolumeIcon,
	ExpandIcon,
	ShrinkIcon,
	MaximizeIcon,
	MinimizeIcon,
	InfoIcon,
	PanelBottom,
	SplitIcon,
	ColumnsIcon,
	RowsIcon
} from 'lucide-react'
import { ComponentDoc } from '@/components/ComponentDoc'

// IDE Layout with File Explorer and Terminal
const IDELayout = () => {
	const [showTerminal, setShowTerminal] = useState(true)
	const [showSidebar, setShowSidebar] = useState(true)

	const files = [
		{
			name: 'src',
			type: 'folder',
			children: [
				{
					name: 'components',
					type: 'folder',
					children: [
						{ name: 'Button.tsx', type: 'file' },
						{ name: 'Card.tsx', type: 'file' },
						{ name: 'Modal.tsx', type: 'file' }
					]
				},
				{
					name: 'pages',
					type: 'folder',
					children: [
						{ name: 'Home.tsx', type: 'file' },
						{ name: 'About.tsx', type: 'file' }
					]
				},
				{
					name: 'utils',
					type: 'folder',
					children: [
						{ name: 'helpers.ts', type: 'file' },
						{ name: 'api.ts', type: 'file' }
					]
				},
				{ name: 'App.tsx', type: 'file' },
				{ name: 'index.tsx', type: 'file' }
			]
		},
		{
			name: 'public',
			type: 'folder',
			children: [
				{ name: 'index.html', type: 'file' },
				{ name: 'favicon.ico', type: 'file' }
			]
		},
		{ name: 'package.json', type: 'file' },
		{ name: 'README.md', type: 'file' }
	]

	const FileTree = ({ items, level = 0 }: { items: any[]; level?: number }) => (
		<div>
			{items.map((item, index) => (
				<div key={index} className="select-none">
					<div className={`flex items-center gap-2 px-2 py-1 hover:bg-gray-100 cursor-pointer text-sm`} style={{ paddingLeft: `${8 + level * 16}px` }}>
						{item.type === 'folder' ? <FolderIcon className="w-4 h-4 text-blue-500" /> : <FileIcon className="w-4 h-4 text-gray-500" />}
						<span>{item.name}</span>
					</div>
					{item.children && <FileTree items={item.children} level={level + 1} />}
				</div>
			))}
		</div>
	)

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<div>
					<Label className="text-lg font-semibold flex items-center gap-2">
						<CodeIcon className="w-5 h-5" />
						IDE Layout
					</Label>
					<p className="text-sm text-muted-foreground">Resizable development environment with file explorer and terminal</p>
				</div>
				<div className="flex gap-2">
					<Button variant={showSidebar ? 'default' : 'outline'} size="sm" onClick={() => setShowSidebar(!showSidebar)}>
						<SidebarIcon className="w-4 h-4 mr-1" />
						Sidebar
					</Button>
					<Button variant={showTerminal ? 'default' : 'outline'} size="sm" onClick={() => setShowTerminal(!showTerminal)}>
						<TerminalIcon className="w-4 h-4 mr-1" />
						Terminal
					</Button>
				</div>
			</div>

			<div className="h-[500px] border rounded-lg overflow-hidden">
				<ResizablePanelGroup direction="horizontal">
					{showSidebar && (
						<>
							<ResizablePanel defaultSize={25} minSize={15} maxSize={40}>
								<div className="h-full flex flex-col bg-gray-50">
									<div className="p-3 border-b bg-white">
										<h3 className="font-semibold text-sm flex items-center gap-2">
											<FolderIcon className="w-4 h-4" />
											EXPLORER
										</h3>
									</div>
									<ScrollArea className="flex-1 p-2">
										<FileTree items={files} />
									</ScrollArea>
								</div>
							</ResizablePanel>
							<ResizableHandle withHandle />
						</>
					)}

					<ResizablePanel>
						<ResizablePanelGroup direction="vertical">
							<ResizablePanel defaultSize={showTerminal ? 70 : 100}>
								<div className="h-full flex flex-col">
									<div className="p-3 border-b bg-white flex items-center gap-2">
										<span className="text-sm font-medium">App.tsx</span>
										<Badge variant="secondary" className="text-xs">
											Modified
										</Badge>
									</div>
									<div className="flex-1 p-4 font-mono text-sm bg-gray-50 overflow-auto">
										<pre className="text-gray-800">
											{`import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
            </ul>
          </nav>
        </header>
        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;`}
										</pre>
									</div>
								</div>
							</ResizablePanel>

							{showTerminal && (
								<>
									<ResizableHandle withHandle />
									<ResizablePanel defaultSize={30} minSize={20}>
										<div className="h-full flex flex-col bg-black text-green-400">
											<div className="p-2 border-b border-gray-600 bg-gray-800 flex items-center gap-2">
												<TerminalIcon className="w-4 h-4" />
												<span className="text-sm font-medium text-white">TERMINAL</span>
											</div>
											<div className="flex-1 p-3 font-mono text-sm overflow-auto">
												<div>$ npm start</div>
												<div className="text-blue-400">Starting development server...</div>
												<div className="text-green-400">✓ Compiled successfully!</div>
												<div>Local: http://localhost:3000</div>
												<div>Network: http://192.168.1.100:3000</div>
												<div className="mt-2 flex items-center">
													<span>$</span>
													<span className="ml-2 animate-pulse">|</span>
												</div>
											</div>
										</div>
									</ResizablePanel>
								</>
							)}
						</ResizablePanelGroup>
					</ResizablePanel>
				</ResizablePanelGroup>
			</div>
		</div>
	)
}

// Dashboard Layout with Widgets
const DashboardLayout = () => {
	const [layout, setLayout] = useState('split')

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<div>
					<Label className="text-lg font-semibold flex items-center gap-2">
						<LayoutIcon className="w-5 h-5" />
						Dashboard Layout
					</Label>
					<p className="text-sm text-muted-foreground">Customizable analytics dashboard with resizable widget panels</p>
				</div>
				<div className="flex gap-2">
					<Button variant={layout === 'horizontal' ? 'default' : 'outline'} size="sm" onClick={() => setLayout('horizontal')}>
						<RowsIcon className="w-4 h-4" />
					</Button>
					<Button variant={layout === 'vertical' ? 'default' : 'outline'} size="sm" onClick={() => setLayout('vertical')}>
						<ColumnsIcon className="w-4 h-4" />
					</Button>
					<Button variant={layout === 'split' ? 'default' : 'outline'} size="sm" onClick={() => setLayout('split')}>
						<SplitIcon className="w-4 h-4" />
					</Button>
				</div>
			</div>

			<div className="h-[400px] border rounded-lg overflow-hidden">
				{layout === 'horizontal' && (
					<ResizablePanelGroup direction="vertical">
						<ResizablePanel defaultSize={33}>
							<div className="h-full p-4 bg-blue-50 flex flex-col">
								<h3 className="font-semibold mb-3">Revenue Analytics</h3>
								<div className="flex-1 bg-white rounded p-4 flex items-center justify-center">
									<div className="text-center">
										<div className="text-2xl font-bold text-green-600">$124,567</div>
										<div className="text-sm text-gray-500">This Month</div>
									</div>
								</div>
							</div>
						</ResizablePanel>
						<ResizableHandle withHandle />
						<ResizablePanel defaultSize={33}>
							<div className="h-full p-4 bg-green-50 flex flex-col">
								<h3 className="font-semibold mb-3">User Growth</h3>
								<div className="flex-1 bg-white rounded p-4 flex items-center justify-center">
									<div className="text-center">
										<div className="text-2xl font-bold text-blue-600">+23.4%</div>
										<div className="text-sm text-gray-500">Growth Rate</div>
									</div>
								</div>
							</div>
						</ResizablePanel>
						<ResizableHandle withHandle />
						<ResizablePanel defaultSize={34}>
							<div className="h-full p-4 bg-purple-50 flex flex-col">
								<h3 className="font-semibold mb-3">Active Users</h3>
								<div className="flex-1 bg-white rounded p-4 flex items-center justify-center">
									<div className="text-center">
										<div className="text-2xl font-bold text-purple-600">8,432</div>
										<div className="text-sm text-gray-500">Online Now</div>
									</div>
								</div>
							</div>
						</ResizablePanel>
					</ResizablePanelGroup>
				)}

				{layout === 'vertical' && (
					<ResizablePanelGroup direction="horizontal">
						<ResizablePanel defaultSize={33}>
							<div className="h-full p-4 bg-blue-50 flex flex-col">
								<h3 className="font-semibold mb-3">Revenue Analytics</h3>
								<div className="flex-1 bg-white rounded p-4 flex items-center justify-center">
									<div className="text-center">
										<div className="text-2xl font-bold text-green-600">$124,567</div>
										<div className="text-sm text-gray-500">This Month</div>
									</div>
								</div>
							</div>
						</ResizablePanel>
						<ResizableHandle withHandle />
						<ResizablePanel defaultSize={33}>
							<div className="h-full p-4 bg-green-50 flex flex-col">
								<h3 className="font-semibold mb-3">User Growth</h3>
								<div className="flex-1 bg-white rounded p-4 flex items-center justify-center">
									<div className="text-center">
										<div className="text-2xl font-bold text-blue-600">+23.4%</div>
										<div className="text-sm text-gray-500">Growth Rate</div>
									</div>
								</div>
							</div>
						</ResizablePanel>
						<ResizableHandle withHandle />
						<ResizablePanel defaultSize={34}>
							<div className="h-full p-4 bg-purple-50 flex flex-col">
								<h3 className="font-semibold mb-3">Active Users</h3>
								<div className="flex-1 bg-white rounded p-4 flex items-center justify-center">
									<div className="text-center">
										<div className="text-2xl font-bold text-purple-600">8,432</div>
										<div className="text-sm text-gray-500">Online Now</div>
									</div>
								</div>
							</div>
						</ResizablePanel>
					</ResizablePanelGroup>
				)}

				{layout === 'split' && (
					<ResizablePanelGroup direction="horizontal">
						<ResizablePanel defaultSize={60}>
							<div className="h-full p-4 bg-gray-50 flex flex-col">
								<h3 className="font-semibold mb-3">Main Chart Area</h3>
								<div className="flex-1 bg-white rounded p-4 border">
									<div className="h-full flex items-center justify-center text-gray-500">📊 Interactive Charts & Graphs</div>
								</div>
							</div>
						</ResizablePanel>
						<ResizableHandle withHandle />
						<ResizablePanel defaultSize={40}>
							<ResizablePanelGroup direction="vertical">
								<ResizablePanel defaultSize={50}>
									<div className="h-full p-4 bg-blue-50">
										<h4 className="font-medium mb-2">Quick Stats</h4>
										<div className="space-y-2">
											<div className="bg-white p-2 rounded flex justify-between">
												<span className="text-sm">Revenue</span>
												<span className="font-medium">$124,567</span>
											</div>
											<div className="bg-white p-2 rounded flex justify-between">
												<span className="text-sm">Orders</span>
												<span className="font-medium">1,248</span>
											</div>
											<div className="bg-white p-2 rounded flex justify-between">
												<span className="text-sm">Customers</span>
												<span className="font-medium">892</span>
											</div>
										</div>
									</div>
								</ResizablePanel>
								<ResizableHandle withHandle />
								<ResizablePanel defaultSize={50}>
									<div className="h-full p-4 bg-green-50">
										<h4 className="font-medium mb-2">Recent Activity</h4>
										<div className="space-y-2 text-sm">
											<div className="bg-white p-2 rounded">
												<div className="font-medium">New order #1234</div>
												<div className="text-gray-500">2 minutes ago</div>
											</div>
											<div className="bg-white p-2 rounded">
												<div className="font-medium">User registered</div>
												<div className="text-gray-500">5 minutes ago</div>
											</div>
											<div className="bg-white p-2 rounded">
												<div className="font-medium">Payment received</div>
												<div className="text-gray-500">8 minutes ago</div>
											</div>
										</div>
									</div>
								</ResizablePanel>
							</ResizablePanelGroup>
						</ResizablePanel>
					</ResizablePanelGroup>
				)}
			</div>
		</div>
	)
}

// Media Player Layout
const MediaPlayerLayout = () => {
	const [showPlaylist, setShowPlaylist] = useState(true)
	const [showControls, setShowControls] = useState(true)

	const playlist = [
		{ title: 'Bohemian Rhapsody', artist: 'Queen', duration: '5:55', playing: true },
		{ title: 'Stairway to Heaven', artist: 'Led Zeppelin', duration: '8:02', playing: false },
		{ title: 'Hotel California', artist: 'Eagles', duration: '6:30', playing: false },
		{ title: "Sweet Child O'Mine", artist: "Guns N' Roses", duration: '5:03', playing: false },
		{ title: 'Smells Like Teen Spirit', artist: 'Nirvana', duration: '5:01', playing: false }
	]

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<div>
					<Label className="text-lg font-semibold flex items-center gap-2">
						<PlayIcon className="w-5 h-5" />
						Media Player
					</Label>
					<p className="text-sm text-muted-foreground">Resizable audio player with playlist and controls</p>
				</div>
				<div className="flex gap-2">
					<Button variant={showPlaylist ? 'default' : 'outline'} size="sm" onClick={() => setShowPlaylist(!showPlaylist)}>
						Playlist
					</Button>
					<Button variant={showControls ? 'default' : 'outline'} size="sm" onClick={() => setShowControls(!showControls)}>
						Controls
					</Button>
				</div>
			</div>

			<div className="h-[350px] border rounded-lg overflow-hidden bg-gray-900 text-white">
				<ResizablePanelGroup direction="vertical">
					<ResizablePanel defaultSize={showControls ? 70 : 100}>
						<ResizablePanelGroup direction="horizontal">
							<ResizablePanel defaultSize={showPlaylist ? 60 : 100}>
								<div className="h-full flex flex-col items-center justify-center p-8">
									<div className="w-48 h-48 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg mb-6 flex items-center justify-center">
										<div className="text-center">
											<div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-2">
												<PlayIcon className="w-8 h-8" />
											</div>
											<div className="text-4xl">🎵</div>
										</div>
									</div>
									<div className="text-center">
										<h2 className="text-xl font-bold mb-1">Bohemian Rhapsody</h2>
										<p className="text-gray-300">Queen</p>
									</div>
								</div>
							</ResizablePanel>

							{showPlaylist && (
								<>
									<ResizableHandle withHandle className="bg-gray-700" />
									<ResizablePanel defaultSize={40} minSize={25}>
										<div className="h-full flex flex-col bg-gray-800">
											<div className="p-3 border-b border-gray-700">
												<h3 className="font-semibold">Playlist</h3>
											</div>
											<ScrollArea className="flex-1">
												<div className="p-2">
													{playlist.map((song, index) => (
														<div key={index} className={`p-2 rounded cursor-pointer hover:bg-gray-700 ${song.playing ? 'bg-purple-600' : ''}`}>
															<div className="flex items-center gap-2">
																{song.playing ? <PauseIcon className="w-4 h-4" /> : <PlayIcon className="w-4 h-4" />}
																<div className="flex-1 min-w-0">
																	<div className="text-sm font-medium truncate">{song.title}</div>
																	<div className="text-xs text-gray-400 truncate">{song.artist}</div>
																</div>
																<div className="text-xs text-gray-400">{song.duration}</div>
															</div>
														</div>
													))}
												</div>
											</ScrollArea>
										</div>
									</ResizablePanel>
								</>
							)}
						</ResizablePanelGroup>
					</ResizablePanel>

					{showControls && (
						<>
							<ResizableHandle withHandle className="bg-gray-700" />
							<ResizablePanel defaultSize={30} minSize={20}>
								<div className="h-full bg-gray-800 p-4">
									<div className="flex flex-col justify-center h-full">
										<div className="flex items-center justify-center gap-4 mb-4">
											<Button variant="ghost" size="sm" className="text-white hover:bg-gray-700">
												⏮️
											</Button>
											<Button variant="ghost" size="sm" className="text-white hover:bg-gray-700">
												<PauseIcon className="w-6 h-6" />
											</Button>
											<Button variant="ghost" size="sm" className="text-white hover:bg-gray-700">
												⏭️
											</Button>
										</div>
										<div className="flex items-center gap-2">
											<span className="text-xs text-gray-400">2:34</span>
											<div className="flex-1 bg-gray-600 h-1 rounded">
												<div className="bg-purple-500 h-1 rounded w-2/5"></div>
											</div>
											<span className="text-xs text-gray-400">5:55</span>
										</div>
									</div>
								</div>
							</ResizablePanel>
						</>
					)}
				</ResizablePanelGroup>
			</div>
		</div>
	)
}

// Basic Resizable Examples
const BasicResizableExamples = () => {
	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold">Basic Resizable Examples</Label>
				<p className="text-sm text-muted-foreground">Simple horizontal and vertical panel layouts</p>
			</div>

			<div className="space-y-6">
				<div>
					<Label className="font-medium mb-3 block">Horizontal Layout</Label>
					<div className="h-[200px] border rounded-lg overflow-hidden">
						<ResizablePanelGroup direction="horizontal">
							<ResizablePanel defaultSize={50}>
								<div className="h-full bg-blue-50 flex items-center justify-center">
									<span className="font-semibold text-blue-700">Left Panel</span>
								</div>
							</ResizablePanel>
							<ResizableHandle withHandle />
							<ResizablePanel defaultSize={50}>
								<div className="h-full bg-green-50 flex items-center justify-center">
									<span className="font-semibold text-green-700">Right Panel</span>
								</div>
							</ResizablePanel>
						</ResizablePanelGroup>
					</div>
				</div>

				<div>
					<Label className="font-medium mb-3 block">Vertical Layout</Label>
					<div className="h-[200px] border rounded-lg overflow-hidden">
						<ResizablePanelGroup direction="vertical">
							<ResizablePanel defaultSize={50}>
								<div className="h-full bg-purple-50 flex items-center justify-center">
									<span className="font-semibold text-purple-700">Top Panel</span>
								</div>
							</ResizablePanel>
							<ResizableHandle withHandle />
							<ResizablePanel defaultSize={50}>
								<div className="h-full bg-orange-50 flex items-center justify-center">
									<span className="font-semibold text-orange-700">Bottom Panel</span>
								</div>
							</ResizablePanel>
						</ResizablePanelGroup>
					</div>
				</div>

				<div>
					<Label className="font-medium mb-3 block">Hidden Handle (Drag on Border)</Label>
					<div className="h-[200px] border rounded-lg overflow-hidden">
						<ResizablePanelGroup direction="horizontal">
							<ResizablePanel defaultSize={60}>
								<div className="h-full bg-indigo-50 flex items-center justify-center">
									<span className="font-semibold text-indigo-700">Main Content</span>
								</div>
							</ResizablePanel>
							<ResizableHandle />
							<ResizablePanel defaultSize={40}>
								<div className="h-full bg-pink-50 flex items-center justify-center">
									<span className="font-semibold text-pink-700">Sidebar</span>
								</div>
							</ResizablePanel>
						</ResizablePanelGroup>
					</div>
					<p className="text-xs text-muted-foreground mt-2">No visible handle - drag directly on the panel border</p>
				</div>

				<div>
					<Label className="font-medium mb-3 block">Nested Layout</Label>
					<div className="h-[200px] border rounded-lg overflow-hidden">
						<ResizablePanelGroup direction="horizontal">
							<ResizablePanel defaultSize={50}>
								<div className="h-full bg-red-50 flex items-center justify-center">
									<span className="font-semibold text-red-700">Left</span>
								</div>
							</ResizablePanel>
							<ResizableHandle withHandle />
							<ResizablePanel defaultSize={50}>
								<ResizablePanelGroup direction="vertical">
									<ResizablePanel defaultSize={50}>
										<div className="h-full bg-yellow-50 flex items-center justify-center">
											<span className="font-semibold text-yellow-700">Top Right</span>
										</div>
									</ResizablePanel>
									<ResizableHandle withHandle />
									<ResizablePanel defaultSize={50}>
										<div className="h-full bg-teal-50 flex items-center justify-center">
											<span className="font-semibold text-teal-700">Bottom Right</span>
										</div>
									</ResizablePanel>
								</ResizablePanelGroup>
							</ResizablePanel>
						</ResizablePanelGroup>
					</div>
				</div>
			</div>
		</div>
	)
}

export default function ResizableSample() {
	const [showAdvanced, setShowAdvanced] = useState(false)

	return (
		<Fragment>
			<ComponentDoc
				title="Resizable"
				description="Interactive panel groups with draggable resize handles for creating flexible layouts. Perfect for dashboards, IDEs, media players, and any interface requiring user-controlled space allocation."
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
							<h3 className="text-lg font-semibold mb-4">Layout Applications</h3>
							<div className="grid grid-cols-1 gap-8">
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<CodeIcon className="w-5 h-5" />
											IDE Development Environment
										</CardTitle>
										<CardDescription>Code editor with file explorer, main editor, and terminal panels</CardDescription>
									</CardHeader>
									<CardContent>
										<IDELayout />
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<LayoutIcon className="w-5 h-5" />
											Analytics Dashboard
										</CardTitle>
										<CardDescription>Customizable dashboard with resizable widget panels and multiple layout options</CardDescription>
									</CardHeader>
									<CardContent>
										<DashboardLayout />
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<PlayIcon className="w-5 h-5" />
											Media Player Interface
										</CardTitle>
										<CardDescription>Audio player with resizable album art, playlist, and control panels</CardDescription>
									</CardHeader>
									<CardContent>
										<MediaPlayerLayout />
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
											<PanelBottom className="w-5 h-5" />
											Basic Panel Layouts
										</CardTitle>
										<CardDescription>Simple horizontal, vertical, and nested panel configurations</CardDescription>
									</CardHeader>
									<CardContent>
										<BasicResizableExamples />
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
								<CardDescription>Best practices for implementing resizable panel layouts</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div>
										<h4 className="font-semibold mb-2">When to Use</h4>
										<ul className="space-y-1 text-sm text-muted-foreground">
											<li>• For dashboards where users need to customize panel sizes</li>
											<li>• In development tools and IDEs with multiple panes</li>
											<li>• For media applications with multiple content areas</li>
											<li>• When content importance varies by user or context</li>
											<li>• For split-screen comparisons and side-by-side layouts</li>
										</ul>
									</div>
									<Separator />
									<div>
										<h4 className="font-semibold mb-2">Design Principles</h4>
										<ul className="space-y-1 text-sm text-muted-foreground">
											<li>• Set appropriate minimum and maximum sizes for panels</li>
											<li>• Use visible handles to indicate resizable areas</li>
											<li>• Provide logical default sizes based on content priority</li>
											<li>• Consider nested layouts for complex interface requirements</li>
											<li>• Ensure responsive behavior on different screen sizes</li>
											<li>• Save user preferences for panel sizes when possible</li>
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
										<strong>Layout Types:</strong> IDE, Dashboard, Media Player{showAdvanced ? ', Basic' : ''}
									</p>
									<p>
										<strong>Features:</strong> Drag Handles, Min/Max Sizes, Nested Panels
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
