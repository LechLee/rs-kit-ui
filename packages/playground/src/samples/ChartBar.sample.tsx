import { Fragment, useState } from 'react'
import {
	TrendingUpIcon,
	TrendingDownIcon,
	ActivityIcon,
	DollarSignIcon,
	UsersIcon,
	ShoppingCartIcon,
	EyeIcon,
	MousePointerClickIcon,
	SmartphoneIcon,
	MonitorIcon,
	TabletIcon,
	FilterIcon,
	CalendarIcon,
	ArrowUpIcon,
	ArrowDownIcon,
	BarChart3Icon,
	PieChartIcon,
	AwardIcon,
	TargetIcon,
	BuildingIcon,
	MapPinIcon
} from 'lucide-react'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Legend, Cell } from 'recharts'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	Badge,
	Button,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Switch
} from '@rs-kit/ui-kit'
import { ComponentDoc } from '@/components/ComponentDoc'

// Sample data sets for different chart types
const monthlyTrafficData = [
	{ month: 'Jan', desktop: 2400, mobile: 1398, tablet: 600, total: 4398 },
	{ month: 'Feb', desktop: 1398, mobile: 2210, tablet: 800, total: 4408 },
	{ month: 'Mar', desktop: 9800, mobile: 2290, tablet: 1200, total: 13290 },
	{ month: 'Apr', desktop: 3908, mobile: 2000, tablet: 900, total: 6808 },
	{ month: 'May', desktop: 4800, mobile: 2181, tablet: 1100, total: 8081 },
	{ month: 'Jun', desktop: 3800, mobile: 2500, tablet: 1300, total: 7600 }
]

const salesData = [
	{ quarter: 'Q1', product1: 120000, product2: 98000, product3: 86000, product4: 72000 },
	{ quarter: 'Q2', product1: 135000, product2: 112000, product3: 94000, product4: 85000 },
	{ quarter: 'Q3', product1: 148000, product2: 125000, product3: 108000, product4: 96000 },
	{ quarter: 'Q4', product1: 162000, product2: 145000, product3: 128000, product4: 110000 }
]

const performanceData = [
	{ metric: 'Load Time', current: 2.3, target: 2.0, previous: 2.8 },
	{ metric: 'First Paint', current: 1.2, target: 1.0, previous: 1.5 },
	{ metric: 'DOM Ready', current: 1.8, target: 1.5, previous: 2.2 },
	{ metric: 'Full Load', current: 3.1, target: 3.0, previous: 3.8 },
	{ metric: 'Script Load', current: 0.9, target: 0.8, previous: 1.1 }
]

const teamProductivityData = [
	{ department: 'Engineering', completed: 45, inProgress: 12, planned: 8 },
	{ department: 'Design', completed: 32, inProgress: 8, planned: 15 },
	{ department: 'Marketing', completed: 28, inProgress: 15, planned: 12 },
	{ department: 'Sales', completed: 38, inProgress: 9, planned: 6 },
	{ department: 'Support', completed: 52, inProgress: 7, planned: 4 }
]

const regionalSalesData = [
	{ region: 'North America', sales: 45000, color: '#3B82F6' },
	{ region: 'Europe', sales: 38000, color: '#10B981' },
	{ region: 'Asia Pacific', sales: 52000, color: '#F59E0B' },
	{ region: 'Latin America', sales: 28000, color: '#EF4444' },
	{ region: 'Middle East', sales: 19000, color: '#8B5CF6' },
	{ region: 'Africa', sales: 15000, color: '#06B6D4' }
]

const monthlyRevenueData = [
	{ month: 'Jan', revenue: 185000, expenses: 120000, profit: 65000 },
	{ month: 'Feb', revenue: 198000, expenses: 135000, profit: 63000 },
	{ month: 'Mar', revenue: 245000, expenses: 155000, profit: 90000 },
	{ month: 'Apr', revenue: 223000, expenses: 148000, profit: 75000 },
	{ month: 'May', revenue: 267000, expenses: 162000, profit: 105000 },
	{ month: 'Jun', revenue: 289000, expenses: 175000, profit: 114000 }
]

// Chart configurations
const trafficChartConfig = {
	desktop: { label: 'Desktop', color: 'hsl(var(--chart-1))' },
	mobile: { label: 'Mobile', color: 'hsl(var(--chart-2))' },
	tablet: { label: 'Tablet', color: 'hsl(var(--chart-3))' },
	total: { label: 'Total', color: 'hsl(var(--chart-4))' }
} satisfies ChartConfig

const salesChartConfig = {
	product1: { label: 'Product A', color: 'hsl(var(--chart-1))' },
	product2: { label: 'Product B', color: 'hsl(var(--chart-2))' },
	product3: { label: 'Product C', color: 'hsl(var(--chart-3))' },
	product4: { label: 'Product D', color: 'hsl(var(--chart-4))' }
} satisfies ChartConfig

const performanceChartConfig = {
	current: { label: 'Current', color: 'hsl(var(--chart-1))' },
	target: { label: 'Target', color: 'hsl(var(--chart-2))' },
	previous: { label: 'Previous', color: 'hsl(var(--chart-3))' }
} satisfies ChartConfig

const productivityChartConfig = {
	completed: { label: 'Completed', color: 'hsl(var(--chart-1))' },
	inProgress: { label: 'In Progress', color: 'hsl(var(--chart-2))' },
	planned: { label: 'Planned', color: 'hsl(var(--chart-3))' }
} satisfies ChartConfig

const revenueChartConfig = {
	revenue: { label: 'Revenue', color: 'hsl(var(--chart-1))' },
	expenses: { label: 'Expenses', color: 'hsl(var(--chart-2))' },
	profit: { label: 'Profit', color: 'hsl(var(--chart-3))' }
} satisfies ChartConfig

export default function ChartBarSample() {
	// State for interactive examples
	const [selectedTimeframe, setSelectedTimeframe] = useState('6months')
	const [selectedView, setSelectedView] = useState('grouped')
	const [showLegend, setShowLegend] = useState(true)
	const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
	const [showComparison, setShowComparison] = useState(true)

	// Helper functions
	const calculateGrowth = (current: number, previous: number) => {
		return (((current - previous) / previous) * 100).toFixed(1)
	}

	const formatCurrency = (value: number) => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
			minimumFractionDigits: 0
		}).format(value)
	}

	const formatNumber = (value: number) => {
		return new Intl.NumberFormat('en-US').format(value)
	}

	const formatTime = (value: number) => {
		return `${value}s`
	}

	// Calculate metrics
	const totalTraffic = monthlyTrafficData.reduce((sum, item) => sum + item.total, 0)
	const totalSales = salesData.reduce((sum, item) => sum + item.product1 + item.product2 + item.product3 + item.product4, 0)
	const avgLoadTime = performanceData.find((d) => d.metric === 'Load Time')?.current || 0
	const totalRevenue = monthlyRevenueData.reduce((sum, item) => sum + item.revenue, 0)
	const totalProfit = monthlyRevenueData.reduce((sum, item) => sum + item.profit, 0)
	const profitMargin = ((totalProfit / totalRevenue) * 100).toFixed(1)

	return (
		<Fragment>
			<ComponentDoc
				title="Bar Chart"
				description="Versatile bar charts for comparing data across categories with support for grouped, stacked, and horizontal layouts. Perfect for analytics dashboards, performance comparisons, and business intelligence."
				component={
					<div className="flex flex-col gap-8 w-full max-w-6xl">
						{/* Basic Bar Charts */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Basic Bar Charts</h3>
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<ActivityIcon className="w-5 h-5" />
											Single Series Bar Chart
										</CardTitle>
										<CardDescription>Simple bar chart with single data series</CardDescription>
									</CardHeader>
									<CardContent>
										<ChartContainer config={trafficChartConfig} className="h-[300px]">
											<BarChart accessibilityLayer data={monthlyTrafficData} margin={{ left: 12, right: 12, top: 12, bottom: 12 }}>
												<CartesianGrid strokeDasharray="3 3" vertical={false} />
												<XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
												<YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`} />
												<ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
												<Bar dataKey="total" fill="var(--color-total)" radius={4} />
											</BarChart>
										</ChartContainer>
									</CardContent>
									<CardFooter>
										<div className="flex w-full items-start gap-2 text-sm">
											<div className="grid gap-2">
												<div className="flex items-center gap-2 font-medium leading-none">
													<TrendingUpIcon className="h-4 w-4 text-green-600" />
													Total traffic: {formatNumber(totalTraffic)} visitors
												</div>
												<div className="flex items-center gap-2 leading-none text-muted-foreground">
													<CalendarIcon className="h-4 w-4" />
													January - June 2024
												</div>
											</div>
										</div>
									</CardFooter>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<BarChart3Icon className="w-5 h-5" />
											Multiple Series Bar Chart
										</CardTitle>
										<CardDescription>Grouped bars comparing multiple data series</CardDescription>
									</CardHeader>
									<CardContent>
										<ChartContainer config={trafficChartConfig} className="h-[300px]">
											<BarChart accessibilityLayer data={monthlyTrafficData} margin={{ left: 12, right: 12, top: 12, bottom: 12 }}>
												<CartesianGrid strokeDasharray="3 3" vertical={false} />
												<XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
												<YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`} />
												<ChartTooltip content={<ChartTooltipContent hideLabel />} />
												<Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
												<Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
												<Bar dataKey="tablet" fill="var(--color-tablet)" radius={4} />
											</BarChart>
										</ChartContainer>
									</CardContent>
									<CardFooter>
										<div className="grid grid-cols-3 gap-4 w-full text-center">
											<div className="space-y-2">
												<div className="flex items-center justify-center gap-2">
													<MonitorIcon className="w-4 h-4 text-blue-600" />
													<Badge variant="outline">Desktop</Badge>
												</div>
												<div className="text-sm text-muted-foreground">{((monthlyTrafficData.reduce((sum, item) => sum + item.desktop, 0) / totalTraffic) * 100).toFixed(1)}%</div>
											</div>
											<div className="space-y-2">
												<div className="flex items-center justify-center gap-2">
													<SmartphoneIcon className="w-4 h-4 text-green-600" />
													<Badge variant="outline">Mobile</Badge>
												</div>
												<div className="text-sm text-muted-foreground">{((monthlyTrafficData.reduce((sum, item) => sum + item.mobile, 0) / totalTraffic) * 100).toFixed(1)}%</div>
											</div>
											<div className="space-y-2">
												<div className="flex items-center justify-center gap-2">
													<TabletIcon className="w-4 h-4 text-purple-600" />
													<Badge variant="outline">Tablet</Badge>
												</div>
												<div className="text-sm text-muted-foreground">{((monthlyTrafficData.reduce((sum, item) => sum + item.tablet, 0) / totalTraffic) * 100).toFixed(1)}%</div>
											</div>
										</div>
									</CardFooter>
								</Card>
							</div>
						</div>

						{/* Interactive Bar Chart */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Interactive Bar Chart</h3>
							<div className="mb-4 flex flex-wrap gap-4 items-center">
								<div className="flex items-center gap-2">
									<Button variant={showLegend ? 'default' : 'outline'} size="sm" onClick={() => setShowLegend(!showLegend)}>
										{showLegend ? 'Hide' : 'Show'} Legend
									</Button>
									<div className="flex items-center space-x-2">
										<Switch id="comparison-mode" checked={showComparison} onCheckedChange={setShowComparison} />
										<label htmlFor="comparison-mode" className="text-sm">
											Show Comparison
										</label>
									</div>
								</div>
								<Select value={selectedView} onValueChange={setSelectedView}>
									<SelectTrigger className="w-[200px]">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="grouped">Grouped View</SelectItem>
										<SelectItem value="stacked">Stacked View</SelectItem>
										<SelectItem value="percentage">Percentage View</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<DollarSignIcon className="w-5 h-5" />
										Quarterly Sales Performance
									</CardTitle>
									<CardDescription>Product performance across quarters with interactive controls</CardDescription>
								</CardHeader>
								<CardContent>
									<ChartContainer config={salesChartConfig} className="h-[400px]">
										<BarChart accessibilityLayer data={salesData} margin={{ left: 12, right: 12, top: 12, bottom: 12 }}>
											<CartesianGrid strokeDasharray="3 3" vertical={false} />
											<XAxis dataKey="quarter" tickLine={false} axisLine={false} tickMargin={8} />
											<YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
											<ChartTooltip content={<ChartTooltipContent formatter={(value) => formatCurrency(value as number)} hideLabel />} />
											{showLegend && <Legend />}
											<Bar dataKey="product1" fill="var(--color-product1)" radius={4} stackId={selectedView === 'stacked' || selectedView === 'percentage' ? '1' : undefined} />
											<Bar dataKey="product2" fill="var(--color-product2)" radius={4} stackId={selectedView === 'stacked' || selectedView === 'percentage' ? '1' : undefined} />
											{showComparison && (
												<>
													<Bar dataKey="product3" fill="var(--color-product3)" radius={4} stackId={selectedView === 'stacked' || selectedView === 'percentage' ? '1' : undefined} />
													<Bar dataKey="product4" fill="var(--color-product4)" radius={4} stackId={selectedView === 'stacked' || selectedView === 'percentage' ? '1' : undefined} />
												</>
											)}
										</BarChart>
									</ChartContainer>
								</CardContent>
								<CardFooter>
									<div className="flex w-full items-start gap-4">
										<div className="grid gap-2">
											<div className="flex items-center gap-2 font-medium leading-none">
												<TrendingUpIcon className="h-4 w-4 text-green-600" />
												Total sales: {formatCurrency(totalSales)}
											</div>
											<div className="flex items-center gap-2 leading-none text-muted-foreground">Q1 2023 - Q4 2023 performance data</div>
										</div>
									</div>
								</CardFooter>
							</Card>
						</div>

						{/* Performance Comparison Chart */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Performance Comparison Chart</h3>
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<TargetIcon className="w-5 h-5" />
										Website Performance Metrics
									</CardTitle>
									<CardDescription>Current vs target vs previous performance comparison</CardDescription>
								</CardHeader>
								<CardContent>
									<ChartContainer config={performanceChartConfig} className="h-[350px]">
										<BarChart accessibilityLayer data={performanceData} margin={{ left: 12, right: 12, top: 12, bottom: 12 }}>
											<CartesianGrid strokeDasharray="3 3" vertical={false} />
											<XAxis dataKey="metric" tickLine={false} axisLine={false} tickMargin={8} />
											<YAxis tickLine={false} axisLine={false} tickFormatter={formatTime} />
											<ChartTooltip content={<ChartTooltipContent formatter={(value) => formatTime(value as number)} hideLabel />} />
											<Bar dataKey="current" fill="var(--color-current)" radius={4} />
											<Bar dataKey="target" fill="var(--color-target)" radius={4} />
											<Bar dataKey="previous" fill="var(--color-previous)" radius={4} />
										</BarChart>
									</ChartContainer>
								</CardContent>
								<CardFooter>
									<div className="grid grid-cols-3 gap-4 w-full text-center">
										<div>
											<div className="text-2xl font-bold text-blue-600">{formatTime(avgLoadTime)}</div>
											<div className="text-sm text-muted-foreground">Avg Load Time</div>
										</div>
										<div>
											<div className="text-2xl font-bold text-green-600">{performanceData.filter((d) => d.current <= d.target).length}</div>
											<div className="text-sm text-muted-foreground">Targets Met</div>
										</div>
										<div>
											<div className="text-2xl font-bold text-purple-600">{performanceData.filter((d) => d.current < d.previous).length}</div>
											<div className="text-sm text-muted-foreground">Improved</div>
										</div>
									</div>
								</CardFooter>
							</Card>
						</div>

						{/* Horizontal Bar Chart */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Horizontal Bar Chart</h3>
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<UsersIcon className="w-5 h-5" />
											Team Productivity
										</CardTitle>
										<CardDescription>Task completion status by department</CardDescription>
									</CardHeader>
									<CardContent>
										<ChartContainer config={productivityChartConfig} className="h-[350px]">
											<BarChart accessibilityLayer data={teamProductivityData} layout="horizontal" margin={{ left: 80, right: 12, top: 12, bottom: 12 }}>
												<CartesianGrid strokeDasharray="3 3" horizontal={false} />
												<XAxis type="number" tickLine={false} axisLine={false} />
												<YAxis type="category" dataKey="department" tickLine={false} axisLine={false} tickMargin={8} width={70} />
												<ChartTooltip content={<ChartTooltipContent hideLabel />} />
												<Bar dataKey="completed" fill="var(--color-completed)" radius={4} stackId="1" />
												<Bar dataKey="inProgress" fill="var(--color-inProgress)" radius={4} stackId="1" />
												<Bar dataKey="planned" fill="var(--color-planned)" radius={4} stackId="1" />
											</BarChart>
										</ChartContainer>
									</CardContent>
									<CardFooter>
										<div className="space-y-2 w-full">
											<div className="flex items-center justify-between text-sm">
												<span>Total Completed:</span>
												<span className="font-medium">{teamProductivityData.reduce((sum, dept) => sum + dept.completed, 0)} tasks</span>
											</div>
											<div className="flex gap-2">
												<Badge variant="outline">✅ Completed</Badge>
												<Badge variant="outline">🔄 In Progress</Badge>
												<Badge variant="outline">📋 Planned</Badge>
											</div>
										</div>
									</CardFooter>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<MapPinIcon className="w-5 h-5" />
											Regional Sales
										</CardTitle>
										<CardDescription>Sales performance by region with custom colors</CardDescription>
									</CardHeader>
									<CardContent>
										<ChartContainer config={{}} className="h-[350px]">
											<BarChart accessibilityLayer data={regionalSalesData} margin={{ left: 12, right: 12, top: 12, bottom: 60 }}>
												<CartesianGrid strokeDasharray="3 3" vertical={false} />
												<XAxis dataKey="region" tickLine={false} axisLine={false} tickMargin={8} angle={-45} textAnchor="end" height={60} />
												<YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
												<ChartTooltip content={<ChartTooltipContent formatter={(value) => formatCurrency(value as number)} hideLabel />} />
												<Bar dataKey="sales" radius={4} onClick={(data) => setSelectedRegion(data.region)} className="cursor-pointer">
													{regionalSalesData.map((entry, index) => (
														<Cell key={`cell-${index}`} fill={selectedRegion === entry.region ? entry.color : `${entry.color}80`} />
													))}
												</Bar>
											</BarChart>
										</ChartContainer>
									</CardContent>
									<CardFooter>
										<div className="w-full space-y-3">
											{selectedRegion && (
												<div className="p-3 bg-blue-50 rounded-lg">
													<p className="text-sm font-medium text-blue-900">Selected: {selectedRegion}</p>
													<p className="text-sm text-blue-700">Sales: {formatCurrency(regionalSalesData.find((r) => r.region === selectedRegion)?.sales || 0)}</p>
												</div>
											)}
											<div className="flex items-center justify-between text-sm">
												<span>Total Global Sales:</span>
												<span className="font-medium">{formatCurrency(regionalSalesData.reduce((sum, region) => sum + region.sales, 0))}</span>
											</div>
										</div>
									</CardFooter>
								</Card>
							</div>
						</div>

						{/* Mixed Chart Types */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Revenue Analysis</h3>
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<DollarSignIcon className="w-5 h-5" />
										Monthly Financial Performance
									</CardTitle>
									<CardDescription>Revenue, expenses, and profit breakdown over time</CardDescription>
								</CardHeader>
								<CardContent>
									<ChartContainer config={revenueChartConfig} className="h-[400px]">
										<BarChart accessibilityLayer data={monthlyRevenueData} margin={{ left: 12, right: 12, top: 12, bottom: 12 }}>
											<CartesianGrid strokeDasharray="3 3" vertical={false} />
											<XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
											<YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
											<ChartTooltip content={<ChartTooltipContent formatter={(value) => formatCurrency(value as number)} hideLabel />} />
											<Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
											<Bar dataKey="expenses" fill="var(--color-expenses)" radius={4} />
											<Bar dataKey="profit" fill="var(--color-profit)" radius={4} />
										</BarChart>
									</ChartContainer>
								</CardContent>
								<CardFooter>
									<div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
										<div className="text-center p-3 bg-blue-50 rounded-lg">
											<div className="text-2xl font-bold text-blue-600">{formatCurrency(totalRevenue)}</div>
											<div className="text-sm text-blue-700">Total Revenue</div>
										</div>
										<div className="text-center p-3 bg-green-50 rounded-lg">
											<div className="text-2xl font-bold text-green-600">{formatCurrency(totalProfit)}</div>
											<div className="text-sm text-green-700">Total Profit</div>
										</div>
										<div className="text-center p-3 bg-purple-50 rounded-lg">
											<div className="text-2xl font-bold text-purple-600">{profitMargin}%</div>
											<div className="text-sm text-purple-700">Profit Margin</div>
										</div>
									</div>
								</CardFooter>
							</Card>
						</div>

						{/* Current State Display */}
						<div className="mt-6 p-4 bg-gray-50 rounded-lg">
							<h4 className="text-sm font-semibold text-gray-700 mb-2">Interactive State:</h4>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
								<div>
									<p>
										<strong>Selected Timeframe:</strong> {selectedTimeframe}
									</p>
									<p>
										<strong>Chart View:</strong> {selectedView}
									</p>
								</div>
								<div>
									<p>
										<strong>Show Legend:</strong> {showLegend ? 'Yes' : 'No'}
									</p>
									<p>
										<strong>Show Comparison:</strong> {showComparison ? 'Yes' : 'No'}
									</p>
								</div>
								<div>
									<p>
										<strong>Selected Region:</strong> {selectedRegion || 'None'}
									</p>
									<p>
										<strong>Total Data Points:</strong> {monthlyTrafficData.length}
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
