import { CalendarIcon } from 'lucide-react'
import { HoverCard, HoverCardContent, HoverCardTrigger, Avatar, AvatarFallback, AvatarImage, Button } from '@rs-kit/ui-kit'
import { ComponentDoc } from '@/components/ComponentDoc'

export default function HoverCardSample() {
	return (
		<ComponentDoc
			title="Hover Card"
			description="For sighted users to preview content available behind a link."
			component={
				<HoverCard>
					<HoverCardTrigger asChild>
						<Button variant="link">@nextjs</Button>
					</HoverCardTrigger>
					<HoverCardContent className="w-80" side="right">
						<div className="flex justify-between gap-4">
							<Avatar>
								<AvatarImage src="https://github.com/vercel.png" />
								<AvatarFallback>VC</AvatarFallback>
							</Avatar>
							<div className="flex flex-col gap-1">
								<h4 className="text-sm font-semibold">@nextjs</h4>
								<p className="text-sm">The React Framework – created and maintained by @vercel.</p>
								<div className="mt-1 flex items-center gap-2">
									<CalendarIcon className="text-muted-foreground size-4" /> <span className="text-muted-foreground text-xs">Joined December 2021</span>
								</div>
							</div>
						</div>
					</HoverCardContent>
				</HoverCard>
			}
		/>
	)
}
