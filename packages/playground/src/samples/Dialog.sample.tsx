import { Button, Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from 'ui-kit'
import { ComponentDoc } from '../components/ComponentDoc'

export default function DialogSample() {
	return (
		<ComponentDoc
			title="Dialog"
			description="A window overlaid on either the primary window or another dialog window, rendering the content underneath inert."
			component={
				<Dialog>
					<DialogTrigger asChild>
						<Button variant="outline">Open Dialog</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-[425px]">
						<DialogHeader>
							<DialogTitle>Edit profile</DialogTitle>
							<DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
						</DialogHeader>
						<div className="grid gap-4 py-4">
							<div className="grid grid-cols-4 items-center gap-4">
								<label htmlFor="name" className="text-right text-sm font-medium">
									Name
								</label>
								<input id="name" defaultValue="Pedro Duarte" className="col-span-3 h-10 rounded-md border border-input bg-transparent px-3 py-2 text-sm" />
							</div>
						</div>
						<DialogFooter>
							<Button type="submit">Save changes</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			}
		/>
	)
}
