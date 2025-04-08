import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot, Label } from '@rs-kit/ui-kit'
import { ComponentDoc } from '@/components/ComponentDoc'
import { useState } from 'react'

function InputOTPSimple() {
	return (
		<div className="grid gap-2">
			<Label htmlFor="simple">Simple</Label>
			<InputOTP id="simple" maxLength={6}>
				<InputOTPGroup>
					<InputOTPSlot index={0} />
					<InputOTPSlot index={1} />
					<InputOTPSlot index={2} />
				</InputOTPGroup>
				<InputOTPSeparator />
				<InputOTPGroup>
					<InputOTPSlot index={3} />
					<InputOTPSlot index={4} />
					<InputOTPSlot index={5} />
				</InputOTPGroup>
			</InputOTP>
		</div>
	)
}

function InputOTPPattern() {
	return (
		<div className="grid gap-2">
			<Label htmlFor="digits-only">Digits Only</Label>
			<InputOTP id="digits-only" maxLength={6} pattern={'[0-9]*'}>
				<InputOTPGroup>
					<InputOTPSlot index={0} />
					<InputOTPSlot index={1} />
					<InputOTPSlot index={2} />
					<InputOTPSlot index={3} />
					<InputOTPSlot index={4} />
					<InputOTPSlot index={5} />
				</InputOTPGroup>
			</InputOTP>
		</div>
	)
}

function InputOTPWithSeparator() {
	const [value, setValue] = useState('123456')

	return (
		<div className="grid gap-2">
			<Label htmlFor="with-separator">With Separator</Label>
			<InputOTP id="with-separator" maxLength={6} value={value} onChange={setValue}>
				<InputOTPGroup>
					<InputOTPSlot index={0} />
					<InputOTPSlot index={1} />
				</InputOTPGroup>
				<InputOTPSeparator />
				<InputOTPGroup>
					<InputOTPSlot index={2} />
					<InputOTPSlot index={3} />
				</InputOTPGroup>
				<InputOTPSeparator />
				<InputOTPGroup>
					<InputOTPSlot index={4} />
					<InputOTPSlot index={5} />
				</InputOTPGroup>
			</InputOTP>
		</div>
	)
}

function InputOTPWithSpacing() {
	return (
		<div className="grid gap-2">
			<Label htmlFor="with-spacing">With Spacing</Label>
			<InputOTP id="with-spacing" maxLength={6}>
				<InputOTPGroup className="gap-2 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border">
					<InputOTPSlot index={0} />
					<InputOTPSlot index={1} />
					<InputOTPSlot index={2} />
					<InputOTPSlot index={3} />
				</InputOTPGroup>
			</InputOTP>
		</div>
	)
}

export default function InputOTPSample() {
	return (
		<ComponentDoc
			title="Input OTP"
			description="Accessible one-time password input."
			component={
				<div className="flex flex-col flex-wrap gap-6 md:flex-row">
					<InputOTPSimple />
					<InputOTPPattern />
					<InputOTPWithSeparator />
					<InputOTPWithSpacing />
				</div>
			}
		/>
	)
}
