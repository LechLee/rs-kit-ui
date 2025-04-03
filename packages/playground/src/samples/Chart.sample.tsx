import { ComponentDoc } from '../components/ComponentDoc'

export default function ChartSample() {
	return (
		<ComponentDoc
			title="Chart"
			description="A container for displaying charts and data visualization."
			component={
				<div className="aspect-video w-full max-w-md rounded-md border bg-gradient-to-r from-slate-50 to-slate-100 p-6">
					<div className="flex h-full w-full flex-col justify-between gap-2">
						<div className="space-y-1">
							<h3 className="text-sm font-medium leading-none">Usage</h3>
							<p className="text-sm text-muted-foreground">Monthly data usage</p>
						</div>
						<div className="flex h-[120px] items-end gap-2">
							<div style={{ height: '30%' }} className="w-full bg-primary rounded-t" />
							<div style={{ height: '50%' }} className="w-full bg-primary rounded-t" />
							<div style={{ height: '80%' }} className="w-full bg-primary rounded-t" />
							<div style={{ height: '100%' }} className="w-full bg-primary rounded-t" />
							<div style={{ height: '60%' }} className="w-full bg-primary rounded-t" />
							<div style={{ height: '40%' }} className="w-full bg-primary rounded-t" />
							<div style={{ height: '20%' }} className="w-full bg-primary rounded-t" />
						</div>
					</div>
				</div>
			}
		/>
	)
}
