import { Card, CardContent, CardHeader, CardTitle } from '@rs-kit/ui-kit'

const ColorSwatch = ({ name, value, className }: { name: string; value: string; className: string }) => (
	<div className="text-center">
		<div className={`w-20 h-20 rounded-lg border border-grey-4 mx-auto mb-2 ${className}`}></div>
		<div className="text-sm font-medium text-grey-1">{name}</div>
		<div className="text-xs text-grey-3 font-mono">{value}</div>
	</div>
)

const ColorGroup = ({ title, colors }: { title: string; colors: Array<{ name: string; value: string; className: string }> }) => (
	<Card className="mb-6">
		<CardHeader>
			<CardTitle className="text-grey-1">{title}</CardTitle>
		</CardHeader>
		<CardContent>
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
				{colors.map((color, index) => (
					<ColorSwatch key={index} {...color} />
				))}
			</div>
		</CardContent>
	</Card>
)

export default function ColorsDemo() {
	const basicColors = [
		{ name: 'Black', value: '#292929', className: 'bg-black' },
		{ name: 'White', value: '#FFFFFF', className: 'bg-white' }
	]

	const greyColors = [
		{ name: 'Grey 1', value: '#292929', className: 'bg-grey-1' },
		{ name: 'Grey 2', value: '#666666', className: 'bg-grey-2' },
		{ name: 'Grey 3', value: '#999999', className: 'bg-grey-3' },
		{ name: 'Grey 4', value: '#B6B6B6', className: 'bg-grey-4' },
		{ name: 'Grey 5', value: '#E0E0E0', className: 'bg-grey-5' },
		{ name: 'Grey 6', value: '#F0F0F0', className: 'bg-grey-6' }
	]

	const primaryColors = [
		{ name: 'Primary 1', value: '#E20079', className: 'bg-primary-color-1' },
		{ name: 'Primary 2', value: '#383F82', className: 'bg-primary-color-2' },
		{ name: 'Primary 3', value: '#8F48CC', className: 'bg-primary-color-3' }
	]

	const secondaryColors = [
		{ name: 'Secondary 1', value: '#292929', className: 'bg-secondary-color-1' },
		{ name: 'Secondary 2', value: '#FFFFFF', className: 'bg-secondary-color-2 border border-grey-4' },
		{ name: 'Secondary 3', value: '#F0F0F0', className: 'bg-secondary-color-3' },
		{ name: 'Secondary 4', value: '#00D008', className: 'bg-secondary-color-4' },
		{ name: 'Secondary 5', value: '#FF0000', className: 'bg-secondary-color-5' },
		{ name: 'Secondary 6', value: '#FFA726', className: 'bg-secondary-color-6' },
		{ name: 'Secondary 7', value: '#F5BEEA', className: 'bg-secondary-color-7' },
		{ name: 'Secondary 8', value: '#7653FF', className: 'bg-secondary-color-8' },
		{ name: 'Secondary 9', value: '#B6B6B6', className: 'bg-secondary-color-9' }
	]

	const gradientColors = [
		{ name: 'Gradient 1', value: 'Purple to Pink', className: 'bg-gradient-1' },
		{ name: 'Gradient 2', value: 'Pink to Light Pink', className: 'bg-gradient-2' },
		{ name: 'Gradient 3', value: 'Primary Pink', className: 'bg-gradient-3' },
		{ name: 'Gradient 4', value: 'Blue Gradient', className: 'bg-gradient-4' }
	]

	const hyperlinkColors = [{ name: 'Hyperlink', value: '#9A2B80', className: 'bg-hyperlink' }]

	return (
		<div className="space-y-6">
			<div className="mb-8 bg-gradient-1 text-white p-8 rounded-lg">
				<h1 className="text-3xl font-bold mb-2">Colour Story</h1>
				<p className="opacity-90">Complete color palette for the playground design system. All colors are available as CSS variables and Tailwind classes.</p>
			</div>

			<ColorGroup title="Basics" colors={basicColors} />
			<ColorGroup title="Greys" colors={greyColors} />
			<ColorGroup title="Primary Colours" colors={primaryColors} />
			<ColorGroup title="Secondary Colours" colors={secondaryColors} />
			<ColorGroup title="Gradients" colors={gradientColors} />

			<Card>
				<CardHeader>
					<CardTitle className="text-grey-1">Usage Examples</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div>
						<h3 className="text-lg font-semibold text-grey-1 mb-2">CSS Variables</h3>
						<div className="bg-grey-6 p-4 rounded-lg">
							<code className="text-sm text-grey-2">
								{`background-color: var(--primary-color-1);`}
								<br />
								{`color: var(--grey-3);`}
								<br />
								{`background: var(--gradient-1);`}
							</code>
						</div>
					</div>

					<div>
						<h3 className="text-lg font-semibold text-grey-1 mb-2">Tailwind Classes</h3>
						<div className="bg-grey-6 p-4 rounded-lg">
							<code className="text-sm text-grey-2">
								{`className="bg-primary-color-1 text-white"`}
								<br />
								{`className="bg-secondary-color-4 text-white"`}
								<br />
								{`className="bg-gradient-1 text-white"`}
							</code>
						</div>
					</div>

					<div>
						<h3 className="text-lg font-semibold text-grey-1 mb-2">Semantic Usage</h3>
						<div className="bg-grey-6 p-4 rounded-lg">
							<code className="text-sm text-grey-2">
								{`className="bg-primary text-primary-foreground"  // Uses primary-1`}
								<br />
								{`className="bg-secondary text-secondary-foreground"  // Uses secondary-1`}
								<br />
								{`className="bg-tertiary text-tertiary-foreground"  // Uses tertiary-1`}
							</code>
						</div>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle className="text-grey-1">Component Examples</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						<div className="bg-primary-color-1 text-white p-4 rounded-lg">
							<h4 className="font-semibold">Primary Button</h4>
							<p className="text-sm opacity-90">Uses primary-color-1 background</p>
						</div>

						<div className="bg-primary-color-2 text-white p-4 rounded-lg">
							<h4 className="font-semibold">Secondary Button</h4>
							<p className="text-sm opacity-90">Uses primary-color-2 background</p>
						</div>

						<div className="bg-secondary-color-6 text-grey-1 p-4 rounded-lg">
							<h4 className="font-semibold">Warning Alert</h4>
							<p className="text-sm opacity-90">Uses secondary-color-6 background</p>
						</div>

						<div className="bg-secondary-color-4 text-white p-4 rounded-lg">
							<h4 className="font-semibold">Success Alert</h4>
							<p className="text-sm opacity-90">Uses secondary-color-4 background</p>
						</div>

						<div className="bg-secondary-color-5 text-white p-4 rounded-lg">
							<h4 className="font-semibold">Error Alert</h4>
							<p className="text-sm opacity-90">Uses secondary-color-5 background</p>
						</div>

						<div className="bg-gradient-1 text-white p-4 rounded-lg">
							<h4 className="font-semibold">Gradient Background</h4>
							<p className="text-sm opacity-90">Uses gradient-1 background</p>
						</div>

						<div className="bg-grey-6 text-grey-1 p-4 rounded-lg border border-grey-4">
							<h4 className="font-semibold">Muted Card</h4>
							<p className="text-sm text-grey-3">Uses grey-6 background</p>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
