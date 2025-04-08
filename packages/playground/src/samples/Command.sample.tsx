import { useState, useEffect } from 'react'
import { Calculator, Calendar, CreditCard, Settings, Smile, User } from 'lucide-react'
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from '@rs-kit/ui-kit'
import { ComponentDoc } from '@/components/ComponentDoc'

export default function CommandSample() {
	const [open, setOpen] = useState(false)

	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === 'j' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault()
				setOpen((open) => !open)
			}
		}

		document.addEventListener('keydown', down)
		return () => document.removeEventListener('keydown', down)
	}, [])

	return (
		<ComponentDoc
			title="Command"
			description="Fast, composable, unstyled command menu for React."
			component={
				<div>
					<p className="text-muted-foreground text-sm">
						Press{' '}
						<kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
							<span className="text-xs">⌘</span>J
						</kbd>
					</p>
					<CommandDialog open={open} onOpenChange={setOpen}>
						<CommandInput placeholder="Type a command or search..." />
						<CommandList>
							<CommandEmpty>No results found.</CommandEmpty>
							<CommandGroup heading="Suggestions">
								<CommandItem>
									<Calendar />
									<span>Calendar</span>
								</CommandItem>
								<CommandItem>
									<Smile />
									<span>Search Emoji</span>
								</CommandItem>
								<CommandItem>
									<Calculator />
									<span>Calculator</span>
								</CommandItem>
							</CommandGroup>
							<CommandSeparator />
							<CommandGroup heading="Settings">
								<CommandItem>
									<User />
									<span>Profile</span>
									<CommandShortcut>⌘P</CommandShortcut>
								</CommandItem>
								<CommandItem>
									<CreditCard />
									<span>Billing</span>
									<CommandShortcut>⌘B</CommandShortcut>
								</CommandItem>
								<CommandItem>
									<Settings />
									<span>Settings</span>
									<CommandShortcut>⌘S</CommandShortcut>
								</CommandItem>
							</CommandGroup>
						</CommandList>
					</CommandDialog>
				</div>
			}
		/>
	)
}
