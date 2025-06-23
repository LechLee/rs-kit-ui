import { Fragment, useState } from 'react'
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
	Label,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Badge,
	Switch,
	Button,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Avatar,
	AvatarFallback,
	AvatarImage
} from '@rs-kit/ui-kit'
import {
	TableIcon,
	SearchIcon,
	FilterIcon,
	SortAscIcon,
	UserIcon,
	ShoppingCartIcon,
	FileTextIcon,
	CalendarIcon,
	ClockIcon,
	TrendingUpIcon,
	DollarSignIcon,
	PackageIcon,
	UsersIcon,
	BarChartIcon,
	InfoIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	ChevronsLeftIcon,
	ChevronsRightIcon,
	EyeIcon,
	EditIcon,
	Trash2Icon,
	MoreHorizontalIcon
} from 'lucide-react'
import { ComponentDoc } from '@/components/ComponentDoc'

// Data Table with Pagination
const DataTablePagination = () => {
	const [currentPage, setCurrentPage] = useState(2)
	const [itemsPerPage, setItemsPerPage] = useState(10)
	const totalItems = 247
	const totalPages = Math.ceil(totalItems / itemsPerPage)

	const employees = [
		{ id: 1, name: 'John Smith', email: 'john@example.com', department: 'Engineering', status: 'Active' },
		{ id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', department: 'Design', status: 'Active' },
		{ id: 3, name: 'Mike Wilson', email: 'mike@example.com', department: 'Marketing', status: 'Inactive' },
		{ id: 4, name: 'Emily Davis', email: 'emily@example.com', department: 'Sales', status: 'Active' },
		{ id: 5, name: 'David Brown', email: 'david@example.com', department: 'Engineering', status: 'Active' },
		{ id: 6, name: 'Lisa Garcia', email: 'lisa@example.com', department: 'HR', status: 'Active' },
		{ id: 7, name: 'Tom Anderson', email: 'tom@example.com', department: 'Finance', status: 'Active' },
		{ id: 8, name: 'Amy Taylor', email: 'amy@example.com', department: 'Design', status: 'Inactive' },
		{ id: 9, name: 'Chris Lee', email: 'chris@example.com', department: 'Engineering', status: 'Active' },
		{ id: 10, name: 'Jessica White', email: 'jessica@example.com', department: 'Marketing', status: 'Active' }
	]

	const generatePageNumbers = () => {
		const pages = []
		const maxVisible = 5
		const start = Math.max(1, currentPage - Math.floor(maxVisible / 2))
		const end = Math.min(totalPages, start + maxVisible - 1)

		if (start > 1) {
			pages.push(1)
			if (start > 2) pages.push('ellipsis-start')
		}

		for (let i = start; i <= end; i++) {
			pages.push(i)
		}

		if (end < totalPages) {
			if (end < totalPages - 1) pages.push('ellipsis-end')
			pages.push(totalPages)
		}

		return pages
	}

	const goToPage = (page: number) => {
		if (page >= 1 && page <= totalPages) {
			setCurrentPage(page)
		}
	}

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold flex items-center gap-2">
					<TableIcon className="w-5 h-5" />
					Employee Directory
				</Label>
				<p className="text-sm text-muted-foreground">Comprehensive data table with pagination controls and item-per-page selection</p>
			</div>

			<div className="space-y-4">
				{/* Table Header */}
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-4">
						<div className="flex items-center gap-2">
							<SearchIcon className="w-4 h-4 text-muted-foreground" />
							<span className="text-sm text-muted-foreground">Search employees...</span>
						</div>
						<Button variant="outline" size="sm">
							<FilterIcon className="w-4 h-4 mr-2" />
							Filter
						</Button>
					</div>
					<div className="flex items-center gap-2">
						<Label className="text-sm">Show:</Label>
						<Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
							<SelectTrigger className="w-20">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="5">5</SelectItem>
								<SelectItem value="10">10</SelectItem>
								<SelectItem value="25">25</SelectItem>
								<SelectItem value="50">50</SelectItem>
							</SelectContent>
						</Select>
						<Label className="text-sm">per page</Label>
					</div>
				</div>

				{/* Data Table */}
				<div className="border rounded-lg overflow-hidden">
					<table className="w-full">
						<thead className="bg-gray-50 border-b">
							<tr>
								<th className="text-left p-3 text-sm font-medium text-gray-700">
									<div className="flex items-center gap-2">
										Employee
										<SortAscIcon className="w-3 h-3" />
									</div>
								</th>
								<th className="text-left p-3 text-sm font-medium text-gray-700">Department</th>
								<th className="text-left p-3 text-sm font-medium text-gray-700">Status</th>
								<th className="text-left p-3 text-sm font-medium text-gray-700">Actions</th>
							</tr>
						</thead>
						<tbody>
							{employees.map((employee) => (
								<tr key={employee.id} className="border-b hover:bg-gray-50">
									<td className="p-3">
										<div className="flex items-center gap-3">
											<Avatar className="w-8 h-8">
												<AvatarFallback>{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
											</Avatar>
											<div>
												<p className="font-medium text-sm">{employee.name}</p>
												<p className="text-xs text-muted-foreground">{employee.email}</p>
											</div>
										</div>
									</td>
									<td className="p-3">
										<Badge variant="outline">{employee.department}</Badge>
									</td>
									<td className="p-3">
										<Badge variant={employee.status === 'Active' ? 'default' : 'secondary'}>
											{employee.status}
										</Badge>
									</td>
									<td className="p-3">
										<div className="flex items-center gap-1">
											<Button variant="ghost" size="sm">
												<EyeIcon className="w-3 h-3" />
											</Button>
											<Button variant="ghost" size="sm">
												<EditIcon className="w-3 h-3" />
											</Button>
											<Button variant="ghost" size="sm">
												<MoreHorizontalIcon className="w-3 h-3" />
											</Button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				{/* Pagination */}
				<div className="flex items-center justify-between">
					<div className="text-sm text-muted-foreground">
						Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} entries
					</div>
					<Pagination>
						<PaginationContent>
							<PaginationItem>
								<PaginationPrevious 
									onClick={() => goToPage(currentPage - 1)}
									className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
								/>
							</PaginationItem>
							{generatePageNumbers().map((page, index) => (
								<PaginationItem key={index}>
									{page === 'ellipsis-start' || page === 'ellipsis-end' ? (
										<PaginationEllipsis />
									) : (
										<PaginationLink
											onClick={() => goToPage(page as number)}
											isActive={currentPage === page}
											className="cursor-pointer"
										>
											{page}
										</PaginationLink>
									)}
								</PaginationItem>
							))}
							<PaginationItem>
								<PaginationNext 
									onClick={() => goToPage(currentPage + 1)}
									className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
								/>
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</div>
			</div>
		</div>
	)
}

// E-commerce Product Listing
const ProductListingPagination = () => {
	const [currentPage, setCurrentPage] = useState(1)
	const [sortBy, setSortBy] = useState('name')
	const totalProducts = 156
	const productsPerPage = 12
	const totalPages = Math.ceil(totalProducts / productsPerPage)

	const products = [
		{ id: 1, name: 'Wireless Headphones', price: 199.99, rating: 4.5, reviews: 234, image: '🎧' },
		{ id: 2, name: 'Smart Watch', price: 299.99, rating: 4.2, reviews: 189, image: '⌚' },
		{ id: 3, name: 'Laptop Stand', price: 79.99, rating: 4.8, reviews: 456, image: '💻' },
		{ id: 4, name: 'Bluetooth Speaker', price: 89.99, rating: 4.3, reviews: 167, image: '🔊' },
		{ id: 5, name: 'Phone Case', price: 24.99, rating: 4.1, reviews: 78, image: '📱' },
		{ id: 6, name: 'Desk Lamp', price: 149.99, rating: 4.6, reviews: 234, image: '💡' },
		{ id: 7, name: 'Keyboard', price: 129.99, rating: 4.4, reviews: 345, image: '⌨️' },
		{ id: 8, name: 'Mouse Pad', price: 19.99, rating: 4.2, reviews: 123, image: '🖱️' },
		{ id: 9, name: 'Monitor', price: 449.99, rating: 4.7, reviews: 567, image: '🖥️' },
		{ id: 10, name: 'Webcam', price: 89.99, rating: 4.0, reviews: 89, image: '📹' },
		{ id: 11, name: 'USB Hub', price: 39.99, rating: 4.3, reviews: 156, image: '🔌' },
		{ id: 12, name: 'Cable Organizer', price: 14.99, rating: 4.5, reviews: 234, image: '📦' }
	]

	const goToPage = (page: number) => {
		if (page >= 1 && page <= totalPages) {
			setCurrentPage(page)
		}
	}

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold flex items-center gap-2">
					<ShoppingCartIcon className="w-5 h-5" />
					Product Catalog
				</Label>
				<p className="text-sm text-muted-foreground">E-commerce product listing with sorting and pagination</p>
			</div>

			<div className="space-y-4">
				{/* Product Controls */}
				<div className="flex items-center justify-between">
					<div className="text-sm text-muted-foreground">
						Showing {totalProducts} products
					</div>
					<div className="flex items-center gap-4">
						<div className="flex items-center gap-2">
							<Label className="text-sm">Sort by:</Label>
							<Select value={sortBy} onValueChange={setSortBy}>
								<SelectTrigger className="w-32">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="name">Name</SelectItem>
									<SelectItem value="price-low">Price: Low to High</SelectItem>
									<SelectItem value="price-high">Price: High to Low</SelectItem>
									<SelectItem value="rating">Rating</SelectItem>
									<SelectItem value="reviews">Most Reviews</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
				</div>

				{/* Product Grid */}
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					{products.map((product) => (
						<Card key={product.id} className="hover:shadow-md transition-shadow">
							<CardContent className="p-4">
								<div className="text-4xl mb-3 text-center">{product.image}</div>
								<h3 className="font-semibold text-sm mb-2 line-clamp-2">{product.name}</h3>
								<div className="flex items-center gap-1 mb-2">
									<div className="flex text-yellow-400">
										{'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}
									</div>
									<span className="text-xs text-muted-foreground">({product.reviews})</span>
								</div>
								<div className="font-bold text-lg text-green-600">${product.price}</div>
								<Button size="sm" className="w-full mt-2">
									Add to Cart
								</Button>
							</CardContent>
						</Card>
					))}
				</div>

				{/* Pagination */}
				<div className="flex items-center justify-center">
					<Pagination>
						<PaginationContent>
							<PaginationItem>
								<PaginationPrevious 
									onClick={() => goToPage(currentPage - 1)}
									className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
								/>
							</PaginationItem>
							{Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
								const pageNum = i + 1
								return (
									<PaginationItem key={pageNum}>
										<PaginationLink
											onClick={() => goToPage(pageNum)}
											isActive={currentPage === pageNum}
											className="cursor-pointer"
										>
											{pageNum}
										</PaginationLink>
									</PaginationItem>
								)
							})}
							{totalPages > 5 && (
								<>
									<PaginationItem>
										<PaginationEllipsis />
									</PaginationItem>
									<PaginationItem>
										<PaginationLink
											onClick={() => goToPage(totalPages)}
											isActive={currentPage === totalPages}
											className="cursor-pointer"
										>
											{totalPages}
										</PaginationLink>
									</PaginationItem>
								</>
							)}
							<PaginationItem>
								<PaginationNext 
									onClick={() => goToPage(currentPage + 1)}
									className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
								/>
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</div>

				<div className="text-center text-sm text-muted-foreground">
					Page {currentPage} of {totalPages} • {totalProducts} total products
				</div>
			</div>
		</div>
	)
}

// Blog Posts with Pagination
const BlogPostsPagination = () => {
	const [currentPage, setCurrentPage] = useState(1)
	const totalPosts = 89
	const postsPerPage = 5
	const totalPages = Math.ceil(totalPosts / postsPerPage)

	const posts = [
		{
			id: 1,
			title: 'Getting Started with React Hooks',
			excerpt: 'Learn how to use React Hooks to manage state and side effects in your functional components.',
			author: 'Sarah Johnson',
			date: '2024-03-15',
			readTime: '5 min read',
			tags: ['React', 'JavaScript', 'Frontend']
		},
		{
			id: 2,
			title: 'Building Responsive Layouts with CSS Grid',
			excerpt: 'Master CSS Grid to create flexible and responsive web layouts that work on all devices.',
			author: 'Mike Chen',
			date: '2024-03-12',
			readTime: '8 min read',
			tags: ['CSS', 'Layout', 'Responsive']
		},
		{
			id: 3,
			title: 'TypeScript Best Practices for Large Projects',
			excerpt: 'Essential TypeScript patterns and practices for maintaining large-scale applications.',
			author: 'Emily Davis',
			date: '2024-03-10',
			readTime: '12 min read',
			tags: ['TypeScript', 'Best Practices', 'Architecture']
		},
		{
			id: 4,
			title: 'Optimizing Web Performance',
			excerpt: 'Practical techniques to improve your website loading speed and user experience.',
			author: 'David Wilson',
			date: '2024-03-08',
			readTime: '10 min read',
			tags: ['Performance', 'Optimization', 'Web']
		},
		{
			id: 5,
			title: 'Introduction to GraphQL',
			excerpt: 'Understanding GraphQL fundamentals and how it compares to REST APIs.',
			author: 'Lisa Garcia',
			date: '2024-03-05',
			readTime: '7 min read',
			tags: ['GraphQL', 'API', 'Backend']
		}
	]

	const goToPage = (page: number) => {
		if (page >= 1 && page <= totalPages) {
			setCurrentPage(page)
		}
	}

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold flex items-center gap-2">
					<FileTextIcon className="w-5 h-5" />
					Tech Blog
				</Label>
				<p className="text-sm text-muted-foreground">Blog article listing with detailed pagination and post metadata</p>
			</div>

			<div className="space-y-6">
				{/* Blog Posts */}
				{posts.map((post) => (
					<Card key={post.id} className="hover:shadow-md transition-shadow">
						<CardContent className="p-6">
							<div className="space-y-3">
								<div className="flex items-start justify-between">
									<h2 className="text-xl font-bold hover:text-blue-600 cursor-pointer">{post.title}</h2>
									<div className="flex gap-1">
										{post.tags.slice(0, 2).map((tag) => (
											<Badge key={tag} variant="secondary" className="text-xs">
												{tag}
											</Badge>
										))}
									</div>
								</div>
								<p className="text-muted-foreground">{post.excerpt}</p>
								<div className="flex items-center gap-4 text-sm text-muted-foreground">
									<div className="flex items-center gap-2">
										<Avatar className="w-6 h-6">
											<AvatarFallback className="text-xs">
												{post.author.split(' ').map(n => n[0]).join('')}
											</AvatarFallback>
										</Avatar>
										<span>{post.author}</span>
									</div>
									<div className="flex items-center gap-1">
										<CalendarIcon className="w-3 h-3" />
										<span>{post.date}</span>
									</div>
									<div className="flex items-center gap-1">
										<ClockIcon className="w-3 h-3" />
										<span>{post.readTime}</span>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				))}

				{/* Pagination */}
				<div className="flex items-center justify-between">
					<div className="text-sm text-muted-foreground">
						Showing {((currentPage - 1) * postsPerPage) + 1} to {Math.min(currentPage * postsPerPage, totalPosts)} of {totalPosts} posts
					</div>
					<Pagination>
						<PaginationContent>
							<PaginationItem>
								<PaginationPrevious 
									onClick={() => goToPage(currentPage - 1)}
									className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
								/>
							</PaginationItem>
							{Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
								let pageNum = i + 1
								if (totalPages > 7) {
									if (currentPage <= 4) {
										pageNum = i + 1
									} else if (currentPage >= totalPages - 3) {
										pageNum = totalPages - 6 + i
									} else {
										pageNum = currentPage - 3 + i
									}
								}
								return (
									<PaginationItem key={pageNum}>
										<PaginationLink
											onClick={() => goToPage(pageNum)}
											isActive={currentPage === pageNum}
											className="cursor-pointer"
										>
											{pageNum}
										</PaginationLink>
									</PaginationItem>
								)
							})}
							<PaginationItem>
								<PaginationNext 
									onClick={() => goToPage(currentPage + 1)}
									className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
								/>
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</div>
			</div>
		</div>
	)
}

// Basic Pagination Examples
const BasicPaginationExamples = () => {
	const [simplePage, setSimplePage] = useState(1)
	const [compactPage, setCompactPage] = useState(3)

	return (
		<div className="space-y-6">
			<div>
				<Label className="text-lg font-semibold">Basic Pagination Examples</Label>
				<p className="text-sm text-muted-foreground">Simple pagination patterns for different use cases</p>
			</div>

			<div className="space-y-8">
				<div>
					<Label className="font-medium mb-3 block">Simple Pagination</Label>
					<Pagination>
						<PaginationContent>
							<PaginationItem>
								<PaginationPrevious 
									onClick={() => setSimplePage(Math.max(1, simplePage - 1))}
									className="cursor-pointer"
								/>
							</PaginationItem>
							{[1, 2, 3, 4, 5].map((page) => (
								<PaginationItem key={page}>
									<PaginationLink
										onClick={() => setSimplePage(page)}
										isActive={simplePage === page}
										className="cursor-pointer"
									>
										{page}
									</PaginationLink>
								</PaginationItem>
							))}
							<PaginationItem>
								<PaginationNext 
									onClick={() => setSimplePage(Math.min(5, simplePage + 1))}
									className="cursor-pointer"
								/>
							</PaginationItem>
						</PaginationContent>
					</Pagination>
					<p className="text-xs text-muted-foreground mt-2">Current page: {simplePage}</p>
				</div>

				<div>
					<Label className="font-medium mb-3 block">With Ellipsis</Label>
					<Pagination>
						<PaginationContent>
							<PaginationItem>
								<PaginationPrevious 
									onClick={() => setCompactPage(Math.max(1, compactPage - 1))}
									className="cursor-pointer"
								/>
							</PaginationItem>
							<PaginationItem>
								<PaginationLink
									onClick={() => setCompactPage(1)}
									isActive={compactPage === 1}
									className="cursor-pointer"
								>
									1
								</PaginationLink>
							</PaginationItem>
							<PaginationItem>
								<PaginationLink
									onClick={() => setCompactPage(2)}
									isActive={compactPage === 2}
									className="cursor-pointer"
								>
									2
								</PaginationLink>
							</PaginationItem>
							<PaginationItem>
								<PaginationLink
									onClick={() => setCompactPage(3)}
									isActive={compactPage === 3}
									className="cursor-pointer"
								>
									3
								</PaginationLink>
							</PaginationItem>
							<PaginationItem>
								<PaginationEllipsis />
							</PaginationItem>
							<PaginationItem>
								<PaginationLink
									onClick={() => setCompactPage(15)}
									isActive={compactPage === 15}
									className="cursor-pointer"
								>
									15
								</PaginationLink>
							</PaginationItem>
							<PaginationItem>
								<PaginationNext 
									onClick={() => setCompactPage(Math.min(15, compactPage + 1))}
									className="cursor-pointer"
								/>
							</PaginationItem>
						</PaginationContent>
					</Pagination>
					<p className="text-xs text-muted-foreground mt-2">Current page: {compactPage} of 15</p>
				</div>

				<div>
					<Label className="font-medium mb-3 block">Minimal (Previous/Next Only)</Label>
					<Pagination>
						<PaginationContent>
							<PaginationItem>
								<PaginationPrevious className="cursor-pointer" />
							</PaginationItem>
							<PaginationItem>
								<span className="px-4 py-2 text-sm">Page 3 of 10</span>
							</PaginationItem>
							<PaginationItem>
								<PaginationNext className="cursor-pointer" />
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</div>
			</div>
		</div>
	)
}

export default function PaginationSample() {
	const [showAdvanced, setShowAdvanced] = useState(false)

	return (
		<Fragment>
			<ComponentDoc
				title="Pagination"
				description="Navigation between pages of content with flexible layouts. Perfect for data tables, product listings, blogs, and any content requiring page-based navigation."
				component={
					<div className="flex flex-col gap-8 w-full max-w-6xl">
						{/* Controls */}
						<div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
							<div className="flex items-center gap-4">
								<div className="flex items-center space-x-2">
									<Switch id="show-advanced" checked={showAdvanced} onCheckedChange={setShowAdvanced} />
									<Label htmlFor="show-advanced" className="text-sm">
										Show Advanced Examples
									</Label>
								</div>
							</div>
							<Badge variant="outline">{showAdvanced ? '4' : '3'} Examples</Badge>
						</div>

						{/* Real-World Examples */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Content Navigation</h3>
							<div className="grid grid-cols-1 gap-8">
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<TableIcon className="w-5 h-5" />
											Data Table
										</CardTitle>
										<CardDescription>Employee directory with sortable columns and pagination controls</CardDescription>
									</CardHeader>
									<CardContent>
										<DataTablePagination />
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<ShoppingCartIcon className="w-5 h-5" />
											Product Catalog
										</CardTitle>
										<CardDescription>E-commerce product listing with grid layout and pagination</CardDescription>
									</CardHeader>
									<CardContent>
										<ProductListingPagination />
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<FileTextIcon className="w-5 h-5" />
											Blog Articles
										</CardTitle>
										<CardDescription>Blog post listing with detailed metadata and pagination</CardDescription>
									</CardHeader>
									<CardContent>
										<BlogPostsPagination />
									</CardContent>
								</Card>
							</div>
						</div>

						{/* Basic Examples */}
						{showAdvanced && (
							<div>
								<h3 className="text-lg font-semibold mb-4">Basic Examples</h3>
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<BarChartIcon className="w-5 h-5" />
											Simple Patterns
										</CardTitle>
										<CardDescription>Basic pagination layouts for different scenarios</CardDescription>
									</CardHeader>
									<CardContent>
										<BasicPaginationExamples />
									</CardContent>
								</Card>
							</div>
						)}

						{/* Usage Guidelines */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<InfoIcon className="w-5 h-5" />
									Usage Guidelines
								</CardTitle>
								<CardDescription>Best practices for implementing pagination</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div>
										<h4 className="font-semibold mb-2">When to Use</h4>
										<ul className="space-y-1 text-sm text-muted-foreground">
											<li>• For large datasets that need to be divided into manageable chunks</li>
											<li>• In data tables with sortable and filterable content</li>
											<li>• For product catalogs and e-commerce listings</li>
											<li>• In blog and article listings with multiple posts</li>
											<li>• When improving page load performance for large content sets</li>
										</ul>
									</div>
									<div className="border-t pt-4">
										<h4 className="font-semibold mb-2">Design Principles</h4>
										<ul className="space-y-1 text-sm text-muted-foreground">
											<li>• Show current page and total pages for context</li>
											<li>• Provide clear next/previous navigation</li>
											<li>• Include item count and range information</li>
											<li>• Allow users to control items per page when appropriate</li>
											<li>• Use ellipsis for large page ranges to save space</li>
											<li>• Ensure pagination works well on mobile devices</li>
										</ul>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Interactive State Display */}
						<div className="mt-6 p-4 bg-gray-50 rounded-lg">
							<h4 className="text-sm font-semibold text-gray-700 mb-2">Current Settings:</h4>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
								<div>
									<p>
										<strong>Show Advanced:</strong> {showAdvanced ? 'Yes' : 'No'}
									</p>
									<p>
										<strong>Total Examples:</strong> {showAdvanced ? '4' : '3'}
									</p>
								</div>
								<div>
									<p>
										<strong>Use Cases:</strong> Data Tables, Catalogs, Blogs{showAdvanced ? ', Basic' : ''}
									</p>
									<p>
										<strong>Features:</strong> Page Numbers, Ellipsis, Item Counts, Controls
									</p>
								</div>
							</div>
						</div>
					</div>
				}
			/>
		</Fragment>
	)
}
