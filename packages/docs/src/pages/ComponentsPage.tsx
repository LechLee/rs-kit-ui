import React from 'react'
import { ComponentShowcase } from '../components/ComponentShowcase'

export const ComponentsPage: React.FC = () => {
	return (
		<div>
			<div className="mb-8">
				<h1 className="text-3xl font-bold mb-2">UI Kit Components</h1>
				<p className="text-gray-600">A showcase of all available components from the UI Kit package.</p>
			</div>
			<ComponentShowcase />
		</div>
	)
}
