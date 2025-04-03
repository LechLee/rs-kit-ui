import { ComponentDoc } from './components/ComponentDoc'
import { Button } from 'ui-kit'

import { BookOpen } from 'lucide-react'

import 'ui-kit/dist/index.css'
import './styles.css'

function App() {
	return (
		<div className="min-h-screen bg-gray-100">
			<header className="bg-white shadow-sm">
				<div className="max-w-7xl mx-auto px-4 py-4">
					<div className="flex items-center gap-2">
						<BookOpen className="text-blue-600" />
						<h1 className="text-xl font-bold text-gray-900">UI Library Documentation</h1>
					</div>
				</div>
			</header>

			<main className="max-w-7xl mx-auto px-4 py-8">
				<ComponentDoc
					title="Button"
					description="A versatile button component with multiple variants and sizes, built on top of Radix UI Slot primitive."
					component={
						<div className="flex flex-wrap gap-4">
							<Button>Default Button</Button>
							<Button variant="secondary">Secondary</Button>
							<Button variant="destructive">Destructive</Button>
							<Button variant="outline">Outline</Button>
							<Button variant="ghost">Ghost</Button>
							<Button variant="link">Link</Button>
						</div>
					}
					// 					code={`<Button>Default Button</Button>
					// <Button variant="secondary">Secondary</Button>
					// <Button variant="destructive">Destructive</Button>
					// <Button variant="outline">Outline</Button>
					// <Button variant="ghost">Ghost</Button>
					// <Button variant="link">Link</Button>`}
					// 					props={[
					// 						{
					// 							name: 'variant',
					// 							type: "'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'",
					// 							default: 'default',
					// 							description: 'The visual style of the button'
					// 						},
					// 						{
					// 							name: 'size',
					// 							type: "'default' | 'sm' | 'lg' | 'icon'",
					// 							default: 'default',
					// 							description: 'The size of the button'
					// 						},
					// 						{
					// 							name: 'asChild',
					// 							type: 'boolean',
					// 							default: 'false',
					// 							description: 'Change the default rendered element for the one passed as a child, merging their props'
					// 						}
					// 					]}
				/>
			</main>
		</div>
	)
}

export default App
