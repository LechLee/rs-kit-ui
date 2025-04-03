import { ComponentDoc } from './components/ComponentDoc'
import { Button } from 'ui-kit'

import { BookOpen } from 'lucide-react'

import 'ui-kit/dist/index.css'
import './styles.css'
import { Outlet } from 'react-router'

function App() {
	return (
		<div className="min-h-screen bg-gray-100">
			<header className="bg-white shadow-sm">
				<div className="max-w-7xl mx-auto px-4 py-4">
					<div className="flex items-center gap-2">
						<h1 className="text-xl font-bold text-gray-900">UI Library Playground</h1>
					</div>
				</div>
			</header>

			<main className="max-w-7xl mx-auto px-4 py-8">
				<Outlet />
			</main>
		</div>
	)
}

export default App
