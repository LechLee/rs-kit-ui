import { Textarea } from '@rs-kit/ui-kit'
import { ComponentDoc } from '@/components/ComponentDoc'

export default function TextareaSample() {
	return <ComponentDoc title="Textarea" description="Displays a form textarea or a component that looks like a textarea." component={<Textarea placeholder="Type your message here." />} />
}
