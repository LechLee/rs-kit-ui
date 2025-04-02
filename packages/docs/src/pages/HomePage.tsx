import React from 'react'
import { Button } from 'ui-kit'
import { Link } from 'react-router-dom'

export const HomePage: React.FC = () => {
	return (
		<div className="max-w-4xl mx-auto text-center">
			<h1 className="text-4xl font-bold mb-6">Welcome to the UI Kit Documentation</h1>
			<p className="text-xl mb-8">A comprehensive collection of reusable React components built with Tailwind CSS and Radix UI.</p>
			<div className="flex justify-center gap-4">
				<Button size="lg" asChild>
					<Link to="/components">View Components</Link>
				</Button>
				<Button size="lg" variant="outline" asChild>
					<a href="https://github.com/your-username/has-ui-kit-v4" target="_blank" rel="noopener noreferrer">
						GitHub Repository
					</a>
				</Button>
			</div>
			<div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
				<div className="p-6 border rounded-lg shadow-sm">
					<h3 className="text-xl font-semibold mb-3">Accessibility</h3>
					<p>Built on top of Radix UI primitives, ensuring all components are fully accessible.</p>
				</div>
				<div className="p-6 border rounded-lg shadow-sm">
					<h3 className="text-xl font-semibold mb-3">Customization</h3>
					<p>Highly customizable components using Tailwind CSS and class-variance-authority.</p>
				</div>
				<div className="p-6 border rounded-lg shadow-sm">
					<h3 className="text-xl font-semibold mb-3">TypeScript</h3>
					<p>Fully typed components for a better developer experience and type safety.</p>
				</div>
			</div>
		</div>
	)
}
