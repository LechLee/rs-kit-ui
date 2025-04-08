import { Progress } from '@rs-kit/ui-kit'
import { ComponentDoc } from '@/components/ComponentDoc'
import { useEffect, useState } from 'react'

export default function ProgressSample() {
	const [progress, setProgress] = useState(13)

	useEffect(() => {
		const timer = setTimeout(() => setProgress(66), 500)
		return () => clearTimeout(timer)
	}, [])
	return (
		<ComponentDoc
			title="Progress"
			description="Displays an indicator showing the completion progress of a task."
			component={
				<div className="w-full max-w-md">
					<Progress value={progress} className="w-[60%]" />
				</div>
			}
		/>
	)
}
