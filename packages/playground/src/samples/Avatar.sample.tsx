import { Avatar } from 'ui-kit'
import { ComponentDoc } from '../components/ComponentDoc'

export default function AvatarSample() {
	return (
		<ComponentDoc
			title="Avatar"
			description="An image element with a fallback for representing the user."
			component={
				<div className="flex items-center gap-4">
					<Avatar>
						<img src="https://github.com/shadcn.png" alt="@shadcn" />
						<span>CN</span>
					</Avatar>
					<Avatar>
						<span>JD</span>
					</Avatar>
				</div>
			}
		/>
	)
}
