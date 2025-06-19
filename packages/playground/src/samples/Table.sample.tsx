import { Fragment, useState, useMemo } from 'react'
import { 
	Table, 
	TableBody, 
	TableCaption, 
	TableCell, 
	TableFooter, 
	TableHead, 
	TableHeader, 
	TableRow,
	Button,
	Input,
	Badge,
	Avatar,
	AvatarFallback,
	AvatarImage,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@rs-kit/ui-kit'
import { 
	ChevronUpIcon,
	ChevronDownIcon,
	ArrowUpDownIcon,
	MoreHorizontalIcon,
	EyeIcon,
	EditIcon,
	TrashIcon,
	CopyIcon,
	FilterIcon,
	SearchIcon,
	UserIcon,
	MailIcon,
	PhoneIcon,
	MapPinIcon,
	CalendarIcon,
	DollarSignIcon,
	TrendingUpIcon,
	TrendingDownIcon,
	CheckCircleIcon,
	XCircleIcon,
	ClockIcon,
	StarIcon,
	AwardIcon,
	ShieldCheckIcon,
	CrownIcon
} from 'lucide-react'
import { ComponentDoc } from '@/components/ComponentDoc'

// Sample data sets
const invoices = [
	{ id: 'INV001', customer: 'Acme Corp', status: 'Paid', amount: 250.00, method: 'Credit Card', date: '2024-01-15', priority: 'High' },
	{ id: 'INV002', customer: 'TechStart Inc', status: 'Pending', amount: 150.00, method: 'PayPal', date: '2024-01-16', priority: 'Medium' },
	{ id: 'INV003', customer: 'Global Solutions', status: 'Unpaid', amount: 350.00, method: 'Bank Transfer', date: '2024-01-17', priority: 'High' },
	{ id: 'INV004', customer: 'Design Studio', status: 'Paid', amount: 450.00, method: 'Credit Card', date: '2024-01-18', priority: 'Low' },
	{ id: 'INV005', customer: 'Marketing Pro', status: 'Paid', amount: 550.00, method: 'PayPal', date: '2024-01-19', priority: 'Medium' },
	{ id: 'INV006', customer: 'Data Corp', status: 'Pending', amount: 200.00, method: 'Bank Transfer', date: '2024-01-20', priority: 'High' },
	{ id: 'INV007', customer: 'Cloud Systems', status: 'Unpaid', amount: 300.00, method: 'Credit Card', date: '2024-01-21', priority: 'Low' },
	{ id: 'INV008', customer: 'Web Dynamics', status: 'Paid', amount: 175.00, method: 'PayPal', date: '2024-01-22', priority: 'Medium' }
]

const users = [
	{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', avatar: 'https://github.com/shadcn.png', joinDate: '2023-01-15', lastLogin: '2024-01-22' },
	{ id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Active', avatar: null, joinDate: '2023-03-20', lastLogin: '2024-01-21' },
	{ id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer', status: 'Inactive', avatar: 'https://github.com/leerob.png', joinDate: '2023-05-10', lastLogin: '2024-01-15' },
	{ id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Admin', status: 'Active', avatar: null, joinDate: '2023-07-05', lastLogin: '2024-01-22' },
	{ id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Editor', status: 'Pending', avatar: null, joinDate: '2024-01-01', lastLogin: 'Never' },
	{ id: 6, name: 'Diana Martinez', email: 'diana@example.com', role: 'Viewer', status: 'Active', avatar: null, joinDate: '2023-09-12', lastLogin: '2024-01-20' }
]

const products = [
	{ id: 'PRD001', name: 'MacBook Pro 14"', category: 'Laptops', price: 1999, stock: 15, rating: 4.8, sales: 245, trend: 'up' },
	{ id: 'PRD002', name: 'iPhone 15 Pro', category: 'Phones', price: 999, stock: 32, rating: 4.9, sales: 567, trend: 'up' },
	{ id: 'PRD003', name: 'iPad Air', category: 'Tablets', price: 599, stock: 8, rating: 4.6, sales: 123, trend: 'down' },
	{ id: 'PRD004', name: 'AirPods Pro', category: 'Audio', price: 249, stock: 45, rating: 4.7, sales: 789, trend: 'up' },
	{ id: 'PRD005', name: 'Apple Watch', category: 'Wearables', price: 399, stock: 23, rating: 4.5, sales: 334, trend: 'up' },
	{ id: 'PRD006', name: 'Mac Studio', category: 'Desktops', price: 1999, stock: 3, rating: 4.9, sales: 56, trend: 'down' },
	{ id: 'PRD007', name: 'Studio Display', category: 'Monitors', price: 1599, stock: 12, rating: 4.4, sales: 78, trend: 'up' }
]

type SortDirection = 'asc' | 'desc' | null
type SortableColumns = 'amount' | 'date' | 'customer' | 'price' | 'stock' | 'rating' | 'sales' | 'name' | 'email' | 'joinDate'

interface SortConfig {
	key: SortableColumns
	direction: SortDirection
}
export default function TableSample() {
	// State for interactive examples
	const [sortConfig, setSortConfig] = useState<SortConfig | null>(null)
	const [filter, setFilter] = useState('')
	const [statusFilter, setStatusFilter] = useState('All')
	const [roleFilter, setRoleFilter] = useState('All')
	const [categoryFilter, setCategoryFilter] = useState('All')
	const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())

	// Sorting logic
	const requestSort = (key: SortableColumns) => {
		let direction: SortDirection = 'asc'
		if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
			direction = 'desc'
		} else if (sortConfig && sortConfig.key === key && sortConfig.direction === 'desc') {
			direction = null
		}
		setSortConfig(direction ? { key, direction } : null)
	}

	const getSortIcon = (column: SortableColumns) => {
		if (!sortConfig || sortConfig.key !== column) {
			return <ArrowUpDownIcon className="w-4 h-4 text-gray-400" />
		}
		return sortConfig.direction === 'asc' 
			? <ChevronUpIcon className="w-4 h-4 text-blue-600" />
			: <ChevronDownIcon className="w-4 h-4 text-blue-600" />
	}

	// Filtered and sorted invoices
	const sortedInvoices = useMemo(() => {
		let filteredData = invoices.filter(invoice => {
			const matchesSearch = invoice.customer.toLowerCase().includes(filter.toLowerCase()) ||
								  invoice.id.toLowerCase().includes(filter.toLowerCase())
			const matchesStatus = statusFilter === 'All' || invoice.status === statusFilter
			return matchesSearch && matchesStatus
		})

		if (sortConfig) {
			filteredData.sort((a, b) => {
				let aValue = a[sortConfig.key as keyof typeof a]
				let bValue = b[sortConfig.key as keyof typeof b]

				if (typeof aValue === 'string') {
					aValue = aValue.toLowerCase()
					bValue = (bValue as string).toLowerCase()
				}

				if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1
				if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1
				return 0
			})
		}

		return filteredData
	}, [filter, statusFilter, sortConfig])

	// Filtered users
	const filteredUsers = useMemo(() => {
		return users.filter(user => {
			const matchesSearch = user.name.toLowerCase().includes(filter.toLowerCase()) ||
								  user.email.toLowerCase().includes(filter.toLowerCase())
			const matchesRole = roleFilter === 'All' || user.role === roleFilter
			return matchesSearch && matchesRole
		})
	}, [filter, roleFilter])

	// Filtered products
	const filteredProducts = useMemo(() => {
		return products.filter(product => {
			const matchesSearch = product.name.toLowerCase().includes(filter.toLowerCase())
			const matchesCategory = categoryFilter === 'All' || product.category === categoryFilter
			return matchesSearch && matchesCategory
		})
	}, [filter, categoryFilter])

	// Row selection
	const toggleRowSelection = (id: string) => {
		const newSelection = new Set(selectedRows)
		if (newSelection.has(id)) {
			newSelection.delete(id)
		} else {
			newSelection.add(id)
		}
		setSelectedRows(newSelection)
	}

	// Helper functions
	const getStatusBadge = (status: string) => {
		const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
			'Paid': 'default',
			'Pending': 'secondary',
			'Unpaid': 'destructive',
			'Active': 'default',
			'Inactive': 'secondary',
			'Admin': 'default',
			'Editor': 'secondary',
			'Viewer': 'outline'
		}
		return <Badge variant={variants[status] || 'outline'}>{status}</Badge>
	}

	const getPriorityIcon = (priority: string) => {
		switch (priority) {
			case 'High': return <TrendingUpIcon className="w-4 h-4 text-red-500" />
			case 'Medium': return <ArrowUpDownIcon className="w-4 h-4 text-yellow-500" />
			case 'Low': return <TrendingDownIcon className="w-4 h-4 text-green-500" />
			default: return null
		}
	}

	const getRoleIcon = (role: string) => {
		switch (role) {
			case 'Admin': return <CrownIcon className="w-4 h-4 text-purple-500" />
			case 'Editor': return <EditIcon className="w-4 h-4 text-blue-500" />
			case 'Viewer': return <EyeIcon className="w-4 h-4 text-gray-500" />
			default: return <UserIcon className="w-4 h-4 text-gray-500" />
		}
	}

	return (
		<Fragment>
			<ComponentDoc
				title="Table"
				description="A responsive table component for displaying structured data with sorting, filtering, and interactive features. Perfect for dashboards, data management, and content organization."
				component={
					<div className="flex flex-col gap-8 w-full max-w-6xl">
						{/* Basic Table */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Basic Table</h3>
							<Table>
								<TableCaption>A list of your recent invoices.</TableCaption>
								<TableHeader>
									<TableRow>
										<TableHead className="w-[100px]">Invoice</TableHead>
										<TableHead>Customer</TableHead>
										<TableHead>Status</TableHead>
										<TableHead>Method</TableHead>
										<TableHead className="text-right">Amount</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{invoices.slice(0, 5).map((invoice) => (
										<TableRow key={invoice.id}>
											<TableCell className="font-medium">{invoice.id}</TableCell>
											<TableCell>{invoice.customer}</TableCell>
											<TableCell>{getStatusBadge(invoice.status)}</TableCell>
											<TableCell>{invoice.method}</TableCell>
											<TableCell className="text-right">${invoice.amount.toFixed(2)}</TableCell>
										</TableRow>
									))}
								</TableBody>
								<TableFooter>
									<TableRow>
										<TableCell colSpan={4}>Total</TableCell>
										<TableCell className="text-right">
											${invoices.slice(0, 5).reduce((total, invoice) => total + invoice.amount, 0).toFixed(2)}
										</TableCell>
									</TableRow>
								</TableFooter>
							</Table>
						</div>

						{/* Interactive Table with Sorting and Filtering */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Interactive Table with Sorting & Filtering</h3>
							
							{/* Controls */}
							<div className="flex flex-col sm:flex-row gap-4 mb-4">
								<div className="flex-1">
									<div className="relative">
										<SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
										<Input
											placeholder="Search invoices..."
											value={filter}
											onChange={(e) => setFilter(e.target.value)}
											className="pl-10"
										/>
									</div>
								</div>
								<Select value={statusFilter} onValueChange={setStatusFilter}>
									<SelectTrigger className="w-[180px]">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="All">All Status</SelectItem>
										<SelectItem value="Paid">Paid</SelectItem>
										<SelectItem value="Pending">Pending</SelectItem>
										<SelectItem value="Unpaid">Unpaid</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<Card>
								<CardContent className="p-0">
									<Table>
										<TableHeader>
											<TableRow>
												<TableHead className="w-[100px]">Invoice</TableHead>
												<TableHead>
													<Button 
														variant="ghost" 
														size="sm" 
														onClick={() => requestSort('customer')}
														className="h-auto p-0 font-medium flex items-center gap-2"
													>
														Customer
														{getSortIcon('customer')}
													</Button>
												</TableHead>
												<TableHead>Status</TableHead>
												<TableHead>Priority</TableHead>
												<TableHead>
													<Button 
														variant="ghost" 
														size="sm" 
														onClick={() => requestSort('date')}
														className="h-auto p-0 font-medium flex items-center gap-2"
													>
														Date
														{getSortIcon('date')}
													</Button>
												</TableHead>
												<TableHead className="text-right">
													<Button 
														variant="ghost" 
														size="sm" 
														onClick={() => requestSort('amount')}
														className="h-auto p-0 font-medium flex items-center gap-2"
													>
														Amount
														{getSortIcon('amount')}
													</Button>
												</TableHead>
												<TableHead className="w-[70px]">Actions</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{sortedInvoices.map((invoice) => (
												<TableRow key={invoice.id} className="hover:bg-gray-50">
													<TableCell className="font-medium">{invoice.id}</TableCell>
													<TableCell>{invoice.customer}</TableCell>
													<TableCell>{getStatusBadge(invoice.status)}</TableCell>
													<TableCell>
														<div className="flex items-center gap-2">
															{getPriorityIcon(invoice.priority)}
															<span className="text-sm">{invoice.priority}</span>
														</div>
													</TableCell>
													<TableCell className="text-sm text-gray-500">{invoice.date}</TableCell>
													<TableCell className="text-right font-medium">${invoice.amount.toFixed(2)}</TableCell>
													<TableCell>
														<DropdownMenu>
															<DropdownMenuTrigger asChild>
																<Button variant="ghost" size="sm" className="h-8 w-8 p-0">
																	<MoreHorizontalIcon className="h-4 w-4" />
																</Button>
															</DropdownMenuTrigger>
															<DropdownMenuContent align="end">
																<DropdownMenuLabel>Actions</DropdownMenuLabel>
																<DropdownMenuItem className="flex items-center gap-2">
																	<EyeIcon className="w-4 h-4" />
																	View Details
																</DropdownMenuItem>
																<DropdownMenuItem className="flex items-center gap-2">
																	<EditIcon className="w-4 h-4" />
																	Edit
																</DropdownMenuItem>
																<DropdownMenuItem className="flex items-center gap-2">
																	<CopyIcon className="w-4 h-4" />
																	Duplicate
																</DropdownMenuItem>
																<DropdownMenuSeparator />
																<DropdownMenuItem className="flex items-center gap-2 text-red-600">
																	<TrashIcon className="w-4 h-4" />
																	Delete
																</DropdownMenuItem>
															</DropdownMenuContent>
														</DropdownMenu>
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</CardContent>
							</Card>
							
							<div className="text-sm text-gray-500 mt-2">
								Showing {sortedInvoices.length} of {invoices.length} invoices
							</div>
						</div>

						{/* User Management Table */}
						<div>
							<h3 className="text-lg font-semibold mb-4">User Management Table</h3>
							
							{/* Controls */}
							<div className="flex flex-col sm:flex-row gap-4 mb-4">
								<div className="flex-1">
									<div className="relative">
										<SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
										<Input
											placeholder="Search users..."
											value={filter}
											onChange={(e) => setFilter(e.target.value)}
											className="pl-10"
										/>
									</div>
								</div>
								<Select value={roleFilter} onValueChange={setRoleFilter}>
									<SelectTrigger className="w-[180px]">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="All">All Roles</SelectItem>
										<SelectItem value="Admin">Admin</SelectItem>
										<SelectItem value="Editor">Editor</SelectItem>
										<SelectItem value="Viewer">Viewer</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<Card>
								<CardContent className="p-0">
									<Table>
										<TableHeader>
											<TableRow>
												<TableHead>User</TableHead>
												<TableHead>Contact</TableHead>
												<TableHead>Role</TableHead>
												<TableHead>Status</TableHead>
												<TableHead>Join Date</TableHead>
												<TableHead>Last Login</TableHead>
												<TableHead className="w-[70px]">Actions</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{filteredUsers.map((user) => (
												<TableRow key={user.id} className="hover:bg-gray-50">
													<TableCell>
														<div className="flex items-center gap-3">
															<Avatar className="h-8 w-8">
																{user.avatar ? (
																	<AvatarImage src={user.avatar} alt={user.name} />
																) : (
																	<AvatarFallback className="text-xs">
																		{user.name.split(' ').map(n => n[0]).join('')}
																	</AvatarFallback>
																)}
															</Avatar>
															<div>
																<div className="font-medium">{user.name}</div>
																<div className="text-sm text-gray-500">ID: {user.id}</div>
															</div>
														</div>
													</TableCell>
													<TableCell>
														<div className="flex items-center gap-2 text-sm text-gray-600">
															<MailIcon className="w-4 h-4" />
															{user.email}
														</div>
													</TableCell>
													<TableCell>
														<div className="flex items-center gap-2">
															{getRoleIcon(user.role)}
															{getStatusBadge(user.role)}
														</div>
													</TableCell>
													<TableCell>{getStatusBadge(user.status)}</TableCell>
													<TableCell className="text-sm text-gray-500">{user.joinDate}</TableCell>
													<TableCell className="text-sm text-gray-500">{user.lastLogin}</TableCell>
													<TableCell>
														<DropdownMenu>
															<DropdownMenuTrigger asChild>
																<Button variant="ghost" size="sm" className="h-8 w-8 p-0">
																	<MoreHorizontalIcon className="h-4 w-4" />
																</Button>
															</DropdownMenuTrigger>
															<DropdownMenuContent align="end">
																<DropdownMenuLabel>Actions</DropdownMenuLabel>
																<DropdownMenuItem className="flex items-center gap-2">
																	<UserIcon className="w-4 h-4" />
																	View Profile
																</DropdownMenuItem>
																<DropdownMenuItem className="flex items-center gap-2">
																	<EditIcon className="w-4 h-4" />
																	Edit User
																</DropdownMenuItem>
																<DropdownMenuItem className="flex items-center gap-2">
																	<ShieldCheckIcon className="w-4 h-4" />
																	Permissions
																</DropdownMenuItem>
																<DropdownMenuSeparator />
																<DropdownMenuItem className="flex items-center gap-2 text-red-600">
																	<TrashIcon className="w-4 h-4" />
																	Delete User
																</DropdownMenuItem>
															</DropdownMenuContent>
														</DropdownMenu>
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</CardContent>
							</Card>
						</div>

						{/* Product Catalog Table */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Product Catalog Table</h3>
							
							{/* Controls */}
							<div className="flex flex-col sm:flex-row gap-4 mb-4">
								<div className="flex-1">
									<div className="relative">
										<SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
										<Input
											placeholder="Search products..."
											value={filter}
											onChange={(e) => setFilter(e.target.value)}
											className="pl-10"
										/>
									</div>
								</div>
								<Select value={categoryFilter} onValueChange={setCategoryFilter}>
									<SelectTrigger className="w-[180px]">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="All">All Categories</SelectItem>
										<SelectItem value="Laptops">Laptops</SelectItem>
										<SelectItem value="Phones">Phones</SelectItem>
										<SelectItem value="Tablets">Tablets</SelectItem>
										<SelectItem value="Audio">Audio</SelectItem>
										<SelectItem value="Wearables">Wearables</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<Card>
								<CardContent className="p-0">
									<Table>
										<TableHeader>
											<TableRow>
												<TableHead>Product</TableHead>
												<TableHead>Category</TableHead>
												<TableHead>Price</TableHead>
												<TableHead>Stock</TableHead>
												<TableHead>Rating</TableHead>
												<TableHead>Sales</TableHead>
												<TableHead>Trend</TableHead>
												<TableHead className="w-[70px]">Actions</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{filteredProducts.map((product) => (
												<TableRow key={product.id} className="hover:bg-gray-50">
													<TableCell>
														<div>
															<div className="font-medium">{product.name}</div>
															<div className="text-sm text-gray-500">{product.id}</div>
														</div>
													</TableCell>
													<TableCell>
														<Badge variant="outline">{product.category}</Badge>
													</TableCell>
													<TableCell className="font-medium">${product.price.toLocaleString()}</TableCell>
													<TableCell>
														<div className={`font-medium ${
															product.stock < 10 ? 'text-red-600' : 
															product.stock < 20 ? 'text-yellow-600' : 'text-green-600'
														}`}>
															{product.stock}
														</div>
													</TableCell>
													<TableCell>
														<div className="flex items-center gap-2">
															<StarIcon className="w-4 h-4 fill-yellow-400 text-yellow-400" />
															<span className="text-sm font-medium">{product.rating}</span>
														</div>
													</TableCell>
													<TableCell className="font-medium">{product.sales}</TableCell>
													<TableCell>
														{product.trend === 'up' ? (
															<TrendingUpIcon className="w-4 h-4 text-green-600" />
														) : (
															<TrendingDownIcon className="w-4 h-4 text-red-600" />
														)}
													</TableCell>
													<TableCell>
														<DropdownMenu>
															<DropdownMenuTrigger asChild>
																<Button variant="ghost" size="sm" className="h-8 w-8 p-0">
																	<MoreHorizontalIcon className="h-4 w-4" />
																</Button>
															</DropdownMenuTrigger>
															<DropdownMenuContent align="end">
																<DropdownMenuLabel>Actions</DropdownMenuLabel>
																<DropdownMenuItem className="flex items-center gap-2">
																	<EyeIcon className="w-4 h-4" />
																	View Product
																</DropdownMenuItem>
																<DropdownMenuItem className="flex items-center gap-2">
																	<EditIcon className="w-4 h-4" />
																	Edit Product
																</DropdownMenuItem>
																<DropdownMenuItem className="flex items-center gap-2">
																	<CopyIcon className="w-4 h-4" />
																	Duplicate
																</DropdownMenuItem>
																<DropdownMenuSeparator />
																<DropdownMenuItem className="flex items-center gap-2 text-red-600">
																	<TrashIcon className="w-4 h-4" />
																	Delete Product
																</DropdownMenuItem>
															</DropdownMenuContent>
														</DropdownMenu>
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</CardContent>
							</Card>
						</div>

						{/* Compact Table */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Compact Table</h3>
							<Card>
								<CardContent className="p-0">
									<Table>
										<TableCaption>Recent transactions summary</TableCaption>
										<TableHeader>
											<TableRow>
												<TableHead className="w-[80px]">ID</TableHead>
												<TableHead>Description</TableHead>
												<TableHead>Status</TableHead>
												<TableHead className="text-right">Amount</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											<TableRow>
												<TableCell className="font-mono text-xs">#001</TableCell>
												<TableCell>Website Development</TableCell>
												<TableCell><Badge variant="default">Completed</Badge></TableCell>
												<TableCell className="text-right font-medium">$5,000</TableCell>
											</TableRow>
											<TableRow>
												<TableCell className="font-mono text-xs">#002</TableCell>
												<TableCell>Mobile App Design</TableCell>
												<TableCell><Badge variant="secondary">In Progress</Badge></TableCell>
												<TableCell className="text-right font-medium">$3,200</TableCell>
											</TableRow>
											<TableRow>
												<TableCell className="font-mono text-xs">#003</TableCell>
												<TableCell>Brand Identity</TableCell>
												<TableCell><Badge variant="outline">Pending</Badge></TableCell>
												<TableCell className="text-right font-medium">$1,800</TableCell>
											</TableRow>
										</TableBody>
									</Table>
								</CardContent>
							</Card>
						</div>

						{/* Current State Display */}
						<div className="mt-6 p-4 bg-gray-50 rounded-lg">
							<h4 className="text-sm font-semibold text-gray-700 mb-2">Interactive State:</h4>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600">
								<div>
									<p><strong>Search Filter:</strong> {filter || 'None'}</p>
									<p><strong>Status Filter:</strong> {statusFilter}</p>
									<p><strong>Role Filter:</strong> {roleFilter}</p>
								</div>
								<div>
									<p><strong>Category Filter:</strong> {categoryFilter}</p>
									<p><strong>Sort Column:</strong> {sortConfig?.key || 'None'}</p>
									<p><strong>Sort Direction:</strong> {sortConfig?.direction || 'None'}</p>
								</div>
								<div>
									<p><strong>Filtered Invoices:</strong> {sortedInvoices.length}/{invoices.length}</p>
									<p><strong>Filtered Users:</strong> {filteredUsers.length}/{users.length}</p>
									<p><strong>Filtered Products:</strong> {filteredProducts.length}/{products.length}</p>
								</div>
							</div>
						</div>
					</div>
				}
			/>

			<ComponentDoc
				title="Table Props & Usage Guidelines"
				description="Comprehensive guide to Table component structure, styling patterns, and best practices."
				component={
					<div className="flex flex-col gap-6 w-full max-w-4xl">
						{/* Props Reference */}
						<div className="p-4 bg-blue-50 rounded-lg">
							<h4 className="text-sm font-semibold text-blue-700 mb-2">Props Reference:</h4>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-600">
								<div>
									<strong>Table:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li><code>className</code> - Additional CSS classes</li>
										<li><code>children</code> - Table components</li>
										<li>Root table container with semantic HTML</li>
									</ul>
								</div>
								<div>
									<strong>TableHeader/TableBody/TableFooter:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li><code>className</code> - Section styling</li>
										<li><code>children</code> - TableRow components</li>
										<li>Semantic table sections</li>
									</ul>
								</div>
								<div>
									<strong>TableRow:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li><code>className</code> - Row styling</li>
										<li><code>onClick</code> - Row click handler</li>
										<li>Table row with hover effects</li>
									</ul>
								</div>
								<div>
									<strong>TableHead/TableCell:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li><code>className</code> - Cell styling</li>
										<li><code>colSpan</code> - Column spanning</li>
										<li><code>scope</code> - Accessibility scope</li>
									</ul>
								</div>
								<div>
									<strong>TableCaption:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li><code>className</code> - Caption styling</li>
										<li>Table description for accessibility</li>
										<li>Usually placed after table content</li>
									</ul>
								</div>
								<div>
									<strong>Responsive Features:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li>Horizontal scrolling on mobile</li>
										<li>Sticky headers with proper z-index</li>
										<li>Responsive column hiding patterns</li>
									</ul>
								</div>
								<div>
									<strong>Accessibility:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li>ARIA labels and roles</li>
										<li>Keyboard navigation support</li>
										<li>Screen reader friendly structure</li>
										<li>Sort state announcements</li>
									</ul>
								</div>
								<div>
									<strong>Interactive Features:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li>Sortable columns with indicators</li>
										<li>Row selection with checkboxes</li>
										<li>Inline editing capabilities</li>
										<li>Action menus and buttons</li>
									</ul>
								</div>
							</div>
						</div>

						{/* Usage Guidelines */}
						<div className="p-4 bg-green-50 rounded-lg">
							<h4 className="text-sm font-semibold text-green-700 mb-2">Usage Guidelines:</h4>
							<ul className="text-sm text-green-600 space-y-1 list-disc list-inside">
								<li><strong>Data Organization:</strong> Use tables for structured, comparable data with consistent columns</li>
								<li><strong>Column Headers:</strong> Use clear, descriptive headers that indicate data type and units</li>
								<li><strong>Data Alignment:</strong> Right-align numbers, left-align text, center-align short labels</li>
								<li><strong>Row Actions:</strong> Place primary actions in the rightmost column or use row-level menus</li>
								<li><strong>Pagination:</strong> Implement pagination for large datasets (>100 rows)</li>
								<li><strong>Loading States:</strong> Show skeleton loaders or progressive disclosure for async data</li>
								<li><strong>Empty States:</strong> Provide helpful messaging and actions when tables are empty</li>
								<li><strong>Mobile Strategy:</strong> Consider card layouts or horizontal scrolling for mobile devices</li>
							</ul>
						</div>

						{/* Code Examples */}
						<div className="p-4 bg-gray-100 rounded-lg">
							<h4 className="text-sm font-semibold text-gray-700 mb-2">Code Examples:</h4>
							<pre className="text-xs text-gray-600 overflow-x-auto whitespace-pre-wrap">
{`// Basic table structure
<Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {data.map((item) => (
      <TableRow key={item.id}>
        <TableCell className="font-medium">{item.invoice}</TableCell>
        <TableCell>{item.status}</TableCell>
        <TableCell className="text-right">{item.amount}</TableCell>
      </TableRow>
    ))}
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell colSpan={2}>Total</TableCell>
      <TableCell className="text-right">$2,500.00</TableCell>
    </TableRow>
  </TableFooter>
</Table>

// Sortable column header
<TableHead>
  <Button 
    variant="ghost" 
    size="sm" 
    onClick={() => requestSort('amount')}
    className="h-auto p-0 font-medium flex items-center gap-2"
  >
    Amount
    {getSortIcon('amount')}
  </Button>
</TableHead>

// Row with actions
<TableRow className="hover:bg-gray-50">
  <TableCell>{item.name}</TableCell>
  <TableCell>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <MoreHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </TableCell>
</TableRow>

// Responsive table wrapper
<div className="rounded-md border">
  <Table>
    {/* table content */}
  </Table>
</div>`}
							</pre>
						</div>

						{/* Design Guidelines */}
						<div className="p-4 bg-purple-50 rounded-lg">
							<h4 className="text-sm font-semibold text-purple-700 mb-2">Design Guidelines:</h4>
							<ul className="text-sm text-purple-600 space-y-1 list-disc list-inside">
								<li><strong>Visual Density:</strong> Balance information density with readability using appropriate padding</li>
								<li><strong>Zebra Striping:</strong> Use subtle alternating row colors for large tables to improve readability</li>
								<li><strong>Column Widths:</strong> Set appropriate column widths based on content type and importance</li>
								<li><strong>Status Indicators:</strong> Use consistent color coding and badges for status information</li>
								<li><strong>Interactive States:</strong> Provide clear hover, focus, and selected states for interactive elements</li>
								<li><strong>Typography Scale:</strong> Use consistent font sizes and weights to establish hierarchy</li>
								<li><strong>Borders and Dividers:</strong> Use subtle borders to separate sections without overwhelming the design</li>
								<li><strong>Loading Patterns:</strong> Implement skeleton loading states that match the final table structure</li>
							</ul>
						</div>
					</div>
				}
			/>
		</Fragment>
	)
}
