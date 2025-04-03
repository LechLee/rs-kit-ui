import { Table } from 'ui-kit'
import { ComponentDoc } from '../components/ComponentDoc'

export default function TableSample() {
	return (
		<ComponentDoc
			title="Table"
			description="A responsive table component for displaying tabular data."
			component={
				<div className="w-full max-w-md overflow-auto">
					<table className="w-full caption-bottom text-sm">
						<thead className="[&_tr]:border-b">
							<tr className="border-b">
								<th className="h-12 px-4 text-left align-middle font-medium">Invoice</th>
								<th className="h-12 px-4 text-left align-middle font-medium">Status</th>
								<th className="h-12 px-4 text-left align-middle font-medium">Method</th>
								<th className="h-12 px-4 text-right align-middle font-medium">Amount</th>
							</tr>
						</thead>
						<tbody className="[&_tr:last-child]:border-0">
							<tr className="border-b">
								<td className="p-4 align-middle">#INV001</td>
								<td className="p-4 align-middle">
									<span className="inline-flex h-2 w-2 rounded-full bg-green-500"></span> Paid
								</td>
								<td className="p-4 align-middle">Credit Card</td>
								<td className="p-4 align-middle text-right">$250.00</td>
							</tr>
							<tr className="border-b">
								<td className="p-4 align-middle">#INV002</td>
								<td className="p-4 align-middle">
									<span className="inline-flex h-2 w-2 rounded-full bg-amber-500"></span> Pending
								</td>
								<td className="p-4 align-middle">PayPal</td>
								<td className="p-4 align-middle text-right">$150.00</td>
							</tr>
							<tr>
								<td className="p-4 align-middle">#INV003</td>
								<td className="p-4 align-middle">
									<span className="inline-flex h-2 w-2 rounded-full bg-green-500"></span> Paid
								</td>
								<td className="p-4 align-middle">Bank Transfer</td>
								<td className="p-4 align-middle text-right">$350.00</td>
							</tr>
						</tbody>
					</table>
				</div>
			}
		/>
	)
}
