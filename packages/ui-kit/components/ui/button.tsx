import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

interface RippleEffect {
	key: number
	x: number
	y: number
}

const useRipple = () => {
	const [ripples, setRipples] = React.useState<RippleEffect[]>([])

	const addRipple = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
		const button = event.currentTarget
		const rect = button.getBoundingClientRect()
		const x = event.clientX - rect.left
		const y = event.clientY - rect.top

		const newRipple: RippleEffect = {
			key: Date.now(),
			x,
			y
		}

		setRipples((prev) => [...prev, newRipple])

		setTimeout(() => {
			setRipples((prev) => prev.filter((ripple) => ripple.key !== newRipple.key))
		}, 400)
	}, [])

	return { ripples, addRipple }
}

const buttonVariants = cva(
	'relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 overflow-hidden',
	{
		variants: {
			variant: {
				default: 'bg-primary text-primary-foreground hover:bg-primary/90',
				destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
				outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
				secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
				ghost: 'hover:bg-accent hover:text-accent-foreground',
				link: 'text-primary underline-offset-4 hover:underline'
			},
			size: {
				default: 'h-10 px-4 py-2',
				sm: 'h-9 rounded-md px-3',
				lg: 'h-11 rounded-md px-8',
				icon: 'h-10 w-10'
			}
		},
		defaultVariants: {
			variant: 'default',
			size: 'default'
		}
	}
)

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
	asChild?: boolean
	enableRipple?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, enableRipple = true, onClick, ...props }, ref) => {
	const { ripples, addRipple } = useRipple()
	const Comp = asChild ? Slot : 'button'

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		if (enableRipple) {
			addRipple(event)
		}
		onClick?.(event)
	}

	return (
		<Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} onClick={handleClick} {...props}>
			{props.children}
			{enableRipple && (
				<div className="absolute inset-0 overflow-hidden rounded-md pointer-events-none">
					{ripples.map((ripple) => (
						<span
							key={ripple.key}
							className="absolute rounded-full bg-white pointer-events-none animate-ripple"
							style={{
								left: ripple.x,
								top: ripple.y,
								transform: 'translate(-50%, -50%)',
								width: '0px',
								height: '0px'
								// opacity: 0.15
							}}
						/>
					))}
				</div>
			)}
		</Comp>
	)
})
Button.displayName = 'Button'

export { Button, buttonVariants }
