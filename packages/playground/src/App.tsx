import { ComponentDoc } from './components/ComponentDoc'
import { Button } from 'ui-kit'

import { BookOpen } from 'lucide-react'

import 'ui-kit/dist/index.css'
import './styles.css'
import { Outlet, Link, useLocation } from 'react-router'

function App() {
	const location = useLocation()
	const currentPath = location.pathname

	// Organize components by category
	const components = {
		Form: [
			{ name: 'Button', path: '/button' },
			{ name: 'Checkbox', path: '/checkbox' },
			{ name: 'Input', path: '/input' },
			{ name: 'Input OTP', path: '/input-otp' },
			{ name: 'Label', path: '/label' },
			{ name: 'Radio Group', path: '/radio-group' },
			{ name: 'Select', path: '/select' },
			{ name: 'Slider', path: '/slider' },
			{ name: 'Switch', path: '/switch' },
			{ name: 'Textarea', path: '/textarea' }
		],
		Layout: [
			{ name: 'Accordion', path: '/accordion' },
			{ name: 'Aspect Ratio', path: '/aspect-ratio' },
			{ name: 'Card', path: '/card' },
			{ name: 'Collapsible', path: '/collapsible' },
			{ name: 'Resizable', path: '/resizable' },
			{ name: 'Separator', path: '/separator' },
			{ name: 'Tabs', path: '/tabs' }
		],
		Navigation: [
			{ name: 'Breadcrumb', path: '/breadcrumb' },
			{ name: 'Menubar', path: '/menubar' },
			{ name: 'Navigation Menu', path: '/navigation-menu' },
			{ name: 'Pagination', path: '/pagination' },
			{ name: 'Sidebar', path: '/sidebar' }
		],
		Feedback: [
			{ name: 'Alert', path: '/alert' },
			{ name: 'Alert Dialog', path: '/alert-dialog' },
			{ name: 'Dialog', path: '/dialog' },
			{ name: 'Drawer', path: '/drawer' },
			{ name: 'Progress', path: '/progress' },
			{ name: 'Sheet', path: '/sheet' },
			{ name: 'Skeleton', path: '/skeleton' },
			{ name: 'Sonner', path: '/sonner' },
			{ name: 'Tooltip', path: '/tooltip' }
		],
		Display: [
			{ name: 'Avatar', path: '/avatar' },
			{ name: 'Badge', path: '/badge' },
			{ name: 'Calendar', path: '/calendar' },
			{ name: 'Carousel', path: '/carousel' },
			{ name: 'Chart', path: '/chart' },
			{ name: 'Table', path: '/table' }
		],
		Overlay: [
			{ name: 'Command', path: '/command' },
			{ name: 'Context Menu', path: '/context-menu' },
			{ name: 'Dropdown Menu', path: '/dropdown-menu' },
			{ name: 'Hover Card', path: '/hover-card' },
			{ name: 'Popover', path: '/popover' }
		],
		Utility: [
			{ name: 'Form', path: '/form' },
			{ name: 'ScrollArea', path: '/scroll-area' },
			{ name: 'Toggle', path: '/toggle' },
			{ name: 'Toggle Group', path: '/toggle-group' }
		]
	}

	return (
		<div className="min-h-screen bg-gray-100 flex flex-col">
			<header className="bg-white shadow-sm">
				<div className="max-w-full mx-auto px-4 py-4">
					<div className="flex items-center gap-2">
						<h1 className="text-xl font-bold text-gray-900">UI Library Playground</h1>
					</div>
				</div>
			</header>

			<div className="flex flex-1 overflow-hidden">
				<aside className="w-64 bg-white border-r overflow-y-auto h-[calc(100vh-65px)]">
					<nav className="p-4">
						{Object.entries(components).map(([category, items]) => (
							<div key={category} className="mb-6">
								<h3 className="text-sm font-medium text-gray-500 mb-2">{category}</h3>
								<ul className="space-y-1">
									{items.map((item) => (
										<li key={item.path}>
											<Link
												to={item.path}
												className={`block px-3 py-2 text-sm rounded-md ${currentPath === item.path ? 'bg-primary/10 text-primary font-medium' : 'text-gray-700 hover:bg-gray-100'}`}
											>
												{item.name}
											</Link>
										</li>
									))}
								</ul>
							</div>
						))}
					</nav>
				</aside>

				<main className="flex-1 p-8 overflow-y-auto">
					<Outlet />
				</main>
			</div>
		</div>
	)
}

export default App
