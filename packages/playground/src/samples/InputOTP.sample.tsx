import { InputOTP, InputOTPGroup, InputOTPSlot } from 'ui-kit'
import { ComponentDoc } from '../components/ComponentDoc'

export default function InputOTPSample() {
	return (
		<ComponentDoc
			title="Input OTP"
			description="Accessible one-time password input."
			component={
				<div className="w-full flex justify-center">
					<div className="flex gap-2 items-center">
						<div className="flex space-x-2">
							<div className="h-10 w-10 border rounded-md flex items-center justify-center text-lg">1</div>
							<div className="h-10 w-10 border rounded-md flex items-center justify-center text-lg">2</div>
							<div className="h-10 w-10 border rounded-md flex items-center justify-center text-lg">3</div>
							<div className="h-10 w-10 border rounded-md flex items-center justify-center text-lg">4</div>
						</div>
					</div>
				</div>
			}
		/>
	)
}
