import { BedIcon, BathIcon, LandPlotIcon } from 'lucide-react'
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Avatar, AvatarFallback, AvatarImage, Label, Input, Badge } from '@rs-kit/ui-kit'
import { ComponentDoc } from '@/components/ComponentDoc'

export default function CardSample() {
	return (
		<ComponentDoc
			title="Card"
			description="Displays a card with header, content, and footer."
			component={
				<div className="flex flex-col items-start gap-4">
					<Card>
						<form>
							<CardHeader>
								<CardTitle>Login to your account</CardTitle>
								<CardDescription>Enter your email below to login to your account</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="flex flex-col gap-6">
									<div className="grid gap-2">
										<Label htmlFor="email">Email</Label>
										<Input id="email" type="email" placeholder="m@example.com" required />
									</div>
									<div className="grid gap-2">
										<div className="flex items-center">
											<Label htmlFor="password">Password</Label>
											<a href="#" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
												Forgot your password?
											</a>
										</div>
										<Input id="password" type="password" required />
									</div>
								</div>
							</CardContent>
							<CardFooter className="flex-col gap-2">
								<Button type="submit" className="w-full">
									Login
								</Button>
								<Button variant="outline" className="w-full">
									Login with Google
								</Button>
								<div className="mt-4 text-center text-sm">
									Don&apos;t have an account?{' '}
									<a href="#" className="underline underline-offset-4">
										Sign up
									</a>
								</div>
							</CardFooter>
						</form>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle>Meeting Notes</CardTitle>
							<CardDescription>Transcript from the meeting with the client.</CardDescription>
						</CardHeader>
						<CardContent className="text-sm">
							<p>Client requested dashboard redesign with focus on mobile responsiveness.</p>
							<ol className="mt-4 flex list-decimal flex-col gap-2 pl-6">
								<li>New analytics widgets for daily/weekly metrics</li>
								<li>Simplified navigation menu</li>
								<li>Dark mode support</li>
								<li>Timeline: 6 weeks</li>
								<li>Follow-up meeting scheduled for next Tuesday</li>
							</ol>
						</CardContent>
						<CardFooter>
							<div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
								<Avatar>
									<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
									<AvatarFallback>CN</AvatarFallback>
								</Avatar>
								<Avatar>
									<AvatarImage src="https://github.com/leerob.png" alt="@leerob" />
									<AvatarFallback>LR</AvatarFallback>
								</Avatar>
								<Avatar>
									<AvatarImage src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
									<AvatarFallback>ER</AvatarFallback>
								</Avatar>
							</div>
						</CardFooter>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle>Is this an image?</CardTitle>
							<CardDescription>This is a card with an image.</CardDescription>
						</CardHeader>
						<CardContent className="p-0">
							<img
								src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
								alt="Photo by Drew Beamer"
								className="aspect-video object-cover"
								width={500}
								height={500}
							/>
						</CardContent>
						<CardFooter className="flex items-center gap-2 p-6">
							<Badge variant="outline">
								<BedIcon /> 4
							</Badge>
							<Badge variant="outline">
								<BathIcon /> 2
							</Badge>
							<Badge variant="outline">
								<LandPlotIcon /> 350m²
							</Badge>
							<div className="ml-auto font-medium tabular-nums">$135,000</div>
						</CardFooter>
					</Card>
				</div>
			}
		/>
	)
}
