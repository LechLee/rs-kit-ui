import React from 'react'
import { Button, Input } from 'ui-kit'

export const ComponentShowcase: React.FC = () => {
	return (
		<div className="p-8 space-y-8">
			<section className="space-y-4">
				<h2 className="text-2xl font-bold">Buttons</h2>
				<div className="flex flex-wrap gap-4">
					<Button>Default Button</Button>
					<Button variant="secondary">Secondary Button</Button>
					<Button variant="destructive">Destructive Button</Button>
					<Button variant="outline">Outline Button</Button>
					<Button variant="ghost">Ghost Button</Button>
					<Button variant="link">Link Button</Button>
				</div>
				<div className="flex flex-wrap gap-4 mt-4">
					<Button size="sm">Small Button</Button>
					<Button>Default Size</Button>
					<Button size="lg">Large Button</Button>
				</div>
			</section>

			<section className="space-y-4">
				<h2 className="text-2xl font-bold">Inputs</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<label className="block text-sm font-medium mb-1">Default Input</label>
						<Input placeholder="Default Input" />
					</div>
					<div>
						<label className="block text-sm font-medium mb-1">Disabled Input</label>
						<Input placeholder="Disabled Input" disabled />
					</div>
					<div>
						<label className="block text-sm font-medium mb-1">With Icon (Prefix)</label>
						<div className="relative">
							<div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</div>
							<Input className="pl-10" placeholder="Search..." />
						</div>
					</div>
					<div>
						<label className="block text-sm font-medium mb-1">Password Input</label>
						<Input type="password" placeholder="Enter your password" />
					</div>
				</div>
			</section>
		</div>
	)
}
