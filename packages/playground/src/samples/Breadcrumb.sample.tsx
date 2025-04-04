import {
	Breadcrumb,
	BreadcrumbEllipsis,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from 'ui-kit'
import { ComponentDoc } from '@/components/ComponentDoc'

export default function BreadcrumbSample() {
	return (
		<ComponentDoc
			title="Breadcrumb"
			description="Displays the path to the current resource using a hierarchy of links."
			component={
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink href="/">Home</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<DropdownMenu>
								<DropdownMenuTrigger className="flex items-center gap-1">
									<BreadcrumbEllipsis className="h-4 w-4" />
									<span className="sr-only">Toggle menu</span>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="start">
									<DropdownMenuItem>Documentation</DropdownMenuItem>
									<DropdownMenuItem>Themes</DropdownMenuItem>
									<DropdownMenuItem>GitHub</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbLink>Components</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage>Breadcrumb</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			}
		/>
	)
}
