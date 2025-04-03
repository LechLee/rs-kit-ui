import React from 'react'
import { Code } from 'lucide-react'

interface Props {
	title: string
	description: string
	component: React.ReactNode
	code?: string
	props?: {
		name: string
		type: string
		description: string
		default?: string
	}[]
}

export function ComponentDoc({ title, description, component, code, props }: Props) {
	const [showCode, setShowCode] = React.useState(false)

	return (
		<div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden mb-8">
			<div className="p-6">
				<h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
				<p className="text-gray-600 mb-6">{description}</p>

				<div className="bg-gray-50 rounded-lg p-6 mb-6">
					<div className="flex items-center justify-center min-h-[100px]">{component}</div>
				</div>

				<div className="mb-6">
					<button onClick={() => setShowCode(!showCode)} className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
						<Code size={16} />
						{showCode ? 'Hide Code' : 'Show Code'}
					</button>
					{showCode && (
						<pre className="mt-2 p-4 bg-gray-900 rounded-lg overflow-x-auto">
							<code className="text-gray-100 text-sm">{code}</code>
						</pre>
					)}
				</div>

				{props && props.length > 0 && (
					<div>
						<h3 className="text-lg font-semibold mb-4">Props</h3>
						<div className="overflow-x-auto">
							<table className="w-full text-left">
								<thead>
									<tr className="border-b">
										<th className="py-2 px-4 font-semibold">Name</th>
										<th className="py-2 px-4 font-semibold">Type</th>
										<th className="py-2 px-4 font-semibold">Default</th>
										<th className="py-2 px-4 font-semibold">Description</th>
									</tr>
								</thead>
								<tbody>
									{props.map((prop) => (
										<tr key={prop.name} className="border-b">
											<td className="py-2 px-4 font-mono text-sm">{prop.name}</td>
											<td className="py-2 px-4 font-mono text-sm text-blue-600">{prop.type}</td>
											<td className="py-2 px-4 font-mono text-sm">{prop.default || '-'}</td>
											<td className="py-2 px-4 text-sm">{prop.description}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
