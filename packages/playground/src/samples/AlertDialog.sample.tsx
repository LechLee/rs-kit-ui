import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
	Button
} from 'ui-kit'
import { ComponentDoc } from '@/components/ComponentDoc'

export default function AlertDialogSample() {
	return (
		<ComponentDoc
			title="Alert Dialog"
			description="A modal dialog that interrupts the user with important content and expects a response."
			component={
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<Button variant="outline">Show Dialog</Button>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
							<AlertDialogDescription>This action cannot be undone. This will permanently delete your account and remove your data from our servers.</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<AlertDialogAction>Continue</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			}
		/>
	)
}
