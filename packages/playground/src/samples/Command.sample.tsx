import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from 'ui-kit'
import { ComponentDoc } from '../components/ComponentDoc'

export default function CommandSample() {
	return (
		<ComponentDoc
			title="Command"
			description="Fast, composable, unstyled command menu for React."
			component={
				<Command className="rounded-lg border shadow-md">
					<CommandInput placeholder="Type a command or search..." />
					<CommandList>
						<CommandEmpty>No results found.</CommandEmpty>
						<CommandGroup heading="Suggestions">
							<CommandItem>Calendar</CommandItem>
							<CommandItem>Search Emoji</CommandItem>
							<CommandItem>Calculator</CommandItem>
						</CommandGroup>
					</CommandList>
				</Command>
			}
		/>
	)
}
