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
	ArrowDownIcon
} from 'lucide-react'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Legend } from 'recharts'
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
	SelectValue
} from '@rs-kit/ui-kit'
import { ComponentDoc } from '@/components/ComponentDoc'

// Sample data sets for different chart types
const websiteTrafficData = [
	{ month: 'Jan', desktop: 2400, mobile: 1398, tablet: 600, total: 4398 },
	{ month: 'Feb', desktop: 1398, mobile: 2210, tablet: 800, total: 4408 },
	{ month: 'Mar', desktop: 9800, mobile: 2290, tablet: 1200, total: 13290 },
	{ month: 'Apr', desktop: 3908, mobile: 2000, tablet: 900, total: 6808 },
	{ month: 'May', desktop: 4800, mobile: 2181, tablet: 1100, total: 8081 },
	{ month: 'Jun', desktop: 3800, mobile: 2500, tablet: 1300, total: 7600 },
	{ month: 'Jul', desktop: 4300, mobile: 2100, tablet: 1000, total: 7400 },
	{ month: 'Aug', desktop: 5200, mobile: 2800, tablet: 1400, total: 9400 },
	{ month: 'Sep', desktop: 6100, mobile: 3200, tablet: 1600, total: 10900 },
	{ month: 'Oct', desktop: 5800, mobile: 2900, tablet: 1500, total: 10200 },
	{ month: 'Nov', desktop: 7200, mobile: 3800, tablet: 1800, total: 12800 },
	{ month: 'Dec', desktop: 8500, mobile: 4200, tablet: 2100, total: 14800 }
]

const salesData = [
	{ quarter: 'Q1 2023', revenue: 120000, profit: 45000, expenses: 75000 },
	{ quarter: 'Q2 2023', revenue: 135000, profit: 52000, expenses: 83000 },
	{ quarter: 'Q3 2023', revenue: 148000, profit: 58000, expenses: 90000 },
	{ quarter: 'Q4 2023', revenue: 162000, profit: 65000, expenses: 97000 },
	{ quarter: 'Q1 2024', revenue: 175000, profit: 72000, expenses: 103000 },
	{ quarter: 'Q2 2024', revenue: 189000, profit: 78000, expenses: 111000 }
]

const dailyActiveUsers = [
	{ day: 'Mon', users: 1200, newUsers: 150, returningUsers: 1050 },
	{ day: 'Tue', users: 1350, newUsers: 180, returningUsers: 1170 },
	{ day: 'Wed', users: 1150, newUsers: 120, returningUsers: 1030 },
	{ day: 'Thu', users: 1800, newUsers: 250, returningUsers: 1550 },
	{ day: 'Fri', users: 2100, newUsers: 320, returningUsers: 1780 },
	{ day: 'Sat', users: 1900, newUsers: 280, returningUsers: 1620 },
	{ day: 'Sun', users: 1600, newUsers: 200, returningUsers: 1400 }
]

const performanceData = [
	{ time: '00:00', pageViews: 245, sessions: 189, bounceRate: 45 },
	{ time: '04:00', pageViews: 180, sessions: 142, bounceRate: 52 },
	{ time: '08:00', pageViews: 520, sessions: 389, bounceRate: 38 },
	{ time: '12:00', pageViews: 890, sessions: 645, bounceRate: 28 },
	{ time: '16:00', pageViews: 750, sessions: 580, bounceRate: 32 },
	{ time: '20:00', pageViews: 430, sessions: 320, bounceRate: 41 },
	{ time: '23:59', pageViews: 320, sessions: 245, bounceRate: 48 }
]

// Chart configurations
const trafficChartConfig = {
	desktop: { label: 'Desktop', color: 'hsl(var(--chart-1))' },
	mobile: { label: 'Mobile', color: 'hsl(var(--chart-2))' },
	tablet: { label: 'Tablet', color: 'hsl(var(--chart-3))' },
	total: { label: 'Total', color: 'hsl(var(--chart-4))' }
} satisfies ChartConfig

const salesChartConfig = {
	revenue: { label: 'Revenue', color: 'hsl(var(--chart-1))' },
	profit: { label: 'Profit', color: 'hsl(var(--chart-2))' },
	expenses: { label: 'Expenses', color: 'hsl(var(--chart-3))' }
} satisfies ChartConfig

const usersChartConfig = {
	users: { label: 'Total Users', color: 'hsl(var(--chart-1))' },
	newUsers: { label: 'New Users', color: 'hsl(var(--chart-2))' },
	returningUsers: { label: 'Returning Users', color: 'hsl(var(--chart-3))' }
} satisfies ChartConfig

const performanceChartConfig = {
	pageViews: { label: 'Page Views', color: 'hsl(var(--chart-1))' },
	sessions: { label: 'Sessions', color: 'hsl(var(--chart-2))' },
	bounceRate: { label: 'Bounce Rate %', color: 'hsl(var(--chart-3))' }
} satisfies ChartConfig

export default function ChartAreaSample() {
	// State for interactive examples
	const [selectedTimeframe, setSelectedTimeframe] = useState('12months')
	const [selectedMetric, setSelectedMetric] = useState('all')
	const [showLegend, setShowLegend] = useState(true)

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

	// Calculate metrics
	const totalTraffic = websiteTrafficData.reduce((sum, item) => sum + item.total, 0)
	const avgDailyUsers = Math.round(dailyActiveUsers.reduce((sum, item) => sum + item.users, 0) / dailyActiveUsers.length)
	const latestRevenue = salesData[salesData.length - 1]?.revenue || 0
	const previousRevenue = salesData[salesData.length - 2]?.revenue || 0

	return (
		<Fragment>
			<ComponentDoc
				title="Area Chart"
				description="Versatile area charts for displaying data trends over time with beautiful gradients and multiple data series. Perfect for analytics dashboards, performance monitoring, and business intelligence."
				component={
					<div className="flex flex-col gap-8 w-full max-w-6xl">
						{/* Basic Area Chart */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Basic Area Chart</h3>
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<ActivityIcon className="w-5 h-5" />
										Website Traffic Overview
									</CardTitle>
									<CardDescription>Monthly website visitors across all devices</CardDescription>
								</CardHeader>
								<CardContent>
									<ChartContainer config={trafficChartConfig} className="h-[300px]">
										<AreaChart accessibilityLayer data={websiteTrafficData} margin={{ left: 12, right: 12, top: 12, bottom: 12 }}>
											<CartesianGrid strokeDasharray="3 3" vertical={false} />
											<XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
											<YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`} />
											<ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
											<Area dataKey="total" type="monotone" fill="var(--color-total)" fillOpacity={0.2} stroke="var(--color-total)" strokeWidth={2} />
										</AreaChart>
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
												January - December 2024
											</div>
										</div>
									</div>
								</CardFooter>
							</Card>
						</div>

						{/* Multi-Series Area Chart */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Multi-Series Area Chart</h3>
							<div className="mb-4">
								<Button variant={showLegend ? 'default' : 'outline'} size="sm" onClick={() => setShowLegend(!showLegend)}>
									{showLegend ? 'Hide' : 'Show'} Legend
								</Button>
							</div>
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<MonitorIcon className="w-5 h-5" />
										Device Traffic Breakdown
									</CardTitle>
									<CardDescription>Website traffic segmented by device type</CardDescription>
								</CardHeader>
								<CardContent>
									<ChartContainer config={trafficChartConfig} className="h-[350px]">
										<AreaChart accessibilityLayer data={websiteTrafficData} margin={{ left: 12, right: 12, top: 12, bottom: 12 }}>
											<CartesianGrid strokeDasharray="3 3" vertical={false} />
											<XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
											<YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`} />
											<ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
											{showLegend && <Legend />}
											<Area dataKey="desktop" stackId="1" type="monotone" fill="var(--color-desktop)" fillOpacity={0.6} stroke="var(--color-desktop)" />
											<Area dataKey="mobile" stackId="1" type="monotone" fill="var(--color-mobile)" fillOpacity={0.6} stroke="var(--color-mobile)" />
											<Area dataKey="tablet" stackId="1" type="monotone" fill="var(--color-tablet)" fillOpacity={0.6} stroke="var(--color-tablet)" />
										</AreaChart>
									</ChartContainer>
								</CardContent>
								<CardFooter>
									<div className="grid grid-cols-3 gap-4 w-full text-center">
										<div className="space-y-2">
											<div className="flex items-center justify-center gap-2">
												<MonitorIcon className="w-4 h-4 text-blue-600" />
												<Badge variant="outline">Desktop</Badge>
											</div>
											<div className="text-sm text-muted-foreground">{((websiteTrafficData.reduce((sum, item) => sum + item.desktop, 0) / totalTraffic) * 100).toFixed(1)}%</div>
										</div>
										<div className="space-y-2">
											<div className="flex items-center justify-center gap-2">
												<SmartphoneIcon className="w-4 h-4 text-green-600" />
												<Badge variant="outline">Mobile</Badge>
											</div>
											<div className="text-sm text-muted-foreground">{((websiteTrafficData.reduce((sum, item) => sum + item.mobile, 0) / totalTraffic) * 100).toFixed(1)}%</div>
										</div>
										<div className="space-y-2">
											<div className="flex items-center justify-center gap-2">
												<TabletIcon className="w-4 h-4 text-purple-600" />
												<Badge variant="outline">Tablet</Badge>
											</div>
											<div className="text-sm text-muted-foreground">{((websiteTrafficData.reduce((sum, item) => sum + item.tablet, 0) / totalTraffic) * 100).toFixed(1)}%</div>
										</div>
									</div>
								</CardFooter>
							</Card>
						</div>

						{/* Business Metrics Chart */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Business Metrics Chart</h3>
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<DollarSignIcon className="w-5 h-5" />
										Revenue & Profitability
									</CardTitle>
									<CardDescription>Quarterly financial performance over time</CardDescription>
								</CardHeader>
								<CardContent>
									<ChartContainer config={salesChartConfig} className="h-[350px]">
										<AreaChart accessibilityLayer data={salesData} margin={{ left: 12, right: 12, top: 12, bottom: 12 }}>
											<CartesianGrid strokeDasharray="3 3" vertical={false} />
											<XAxis dataKey="quarter" tickLine={false} axisLine={false} tickMargin={8} />
											<YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
											<ChartTooltip content={<ChartTooltipContent formatter={(value) => formatCurrency(value as number)} indicator="dot" />} />
											<Area dataKey="revenue" type="monotone" fill="var(--color-revenue)" fillOpacity={0.3} stroke="var(--color-revenue)" strokeWidth={2} />
											<Area dataKey="profit" type="monotone" fill="var(--color-profit)" fillOpacity={0.3} stroke="var(--color-profit)" strokeWidth={2} />
										</AreaChart>
									</ChartContainer>
								</CardContent>
								<CardFooter>
									<div className="flex w-full items-start gap-4">
										<div className="grid gap-2">
											<div className="flex items-center gap-2 font-medium leading-none">
												{parseFloat(calculateGrowth(latestRevenue, previousRevenue)) > 0 ? (
													<ArrowUpIcon className="h-4 w-4 text-green-600" />
												) : (
													<ArrowDownIcon className="h-4 w-4 text-red-600" />
												)}
												Revenue growth: {calculateGrowth(latestRevenue, previousRevenue)}%
											</div>
											<div className="flex items-center gap-2 leading-none text-muted-foreground">Latest quarter: {formatCurrency(latestRevenue)}</div>
										</div>
									</div>
								</CardFooter>
							</Card>
						</div>

						{/* User Engagement Chart */}
						<div>
							<h3 className="text-lg font-semibold mb-4">User Engagement Chart</h3>
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<UsersIcon className="w-5 h-5" />
										Daily Active Users
									</CardTitle>
									<CardDescription>User engagement patterns throughout the week</CardDescription>
								</CardHeader>
								<CardContent>
									<ChartContainer config={usersChartConfig} className="h-[300px]">
										<AreaChart accessibilityLayer data={dailyActiveUsers} margin={{ left: 12, right: 12, top: 12, bottom: 12 }}>
											<CartesianGrid strokeDasharray="3 3" vertical={false} />
											<XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
											<YAxis tickLine={false} axisLine={false} />
											<ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
											<Area dataKey="returningUsers" stackId="1" type="monotone" fill="var(--color-returningUsers)" fillOpacity={0.6} stroke="var(--color-returningUsers)" />
											<Area dataKey="newUsers" stackId="1" type="monotone" fill="var(--color-newUsers)" fillOpacity={0.6} stroke="var(--color-newUsers)" />
										</AreaChart>
									</ChartContainer>
								</CardContent>
								<CardFooter>
									<div className="flex w-full items-center justify-between">
										<div className="flex items-center gap-2 text-sm">
											<Badge variant="outline">Avg Daily Users</Badge>
											<span className="font-medium">{formatNumber(avgDailyUsers)}</span>
										</div>
										<div className="text-sm text-muted-foreground">Peak activity on Friday</div>
									</div>
								</CardFooter>
							</Card>
						</div>

						{/* Performance Metrics */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Performance Analytics</h3>
							<div className="mb-4">
								<Select value={selectedMetric} onValueChange={setSelectedMetric}>
									<SelectTrigger className="w-[200px]">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="all">All Metrics</SelectItem>
										<SelectItem value="pageViews">Page Views Only</SelectItem>
										<SelectItem value="sessions">Sessions Only</SelectItem>
										<SelectItem value="bounceRate">Bounce Rate Only</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<ActivityIcon className="w-5 h-5" />
										24-Hour Performance Metrics
									</CardTitle>
									<CardDescription>Hourly breakdown of website performance</CardDescription>
								</CardHeader>
								<CardContent>
									<ChartContainer config={performanceChartConfig} className="h-[300px]">
										<AreaChart accessibilityLayer data={performanceData} margin={{ left: 12, right: 12, top: 12, bottom: 12 }}>
											<CartesianGrid strokeDasharray="3 3" vertical={false} />
											<XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={8} />
											<YAxis tickLine={false} axisLine={false} />
											<ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
											{(selectedMetric === 'all' || selectedMetric === 'pageViews') && (
												<Area dataKey="pageViews" type="monotone" fill="var(--color-pageViews)" fillOpacity={0.3} stroke="var(--color-pageViews)" strokeWidth={2} />
											)}
											{(selectedMetric === 'all' || selectedMetric === 'sessions') && (
												<Area dataKey="sessions" type="monotone" fill="var(--color-sessions)" fillOpacity={0.3} stroke="var(--color-sessions)" strokeWidth={2} />
											)}
										</AreaChart>
									</ChartContainer>
								</CardContent>
								<CardFooter>
									<div className="grid grid-cols-3 gap-4 w-full text-center">
										<div>
											<div className="text-2xl font-bold">{formatNumber(performanceData.reduce((sum, item) => sum + item.pageViews, 0))}</div>
											<div className="text-sm text-muted-foreground">Total Page Views</div>
										</div>
										<div>
											<div className="text-2xl font-bold">{formatNumber(performanceData.reduce((sum, item) => sum + item.sessions, 0))}</div>
											<div className="text-sm text-muted-foreground">Total Sessions</div>
										</div>
										<div>
											<div className="text-2xl font-bold">{(performanceData.reduce((sum, item) => sum + item.bounceRate, 0) / performanceData.length).toFixed(1)}%</div>
											<div className="text-sm text-muted-foreground">Avg Bounce Rate</div>
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
										<strong>Selected Metric:</strong> {selectedMetric}
									</p>
								</div>
								<div>
									<p>
										<strong>Show Legend:</strong> {showLegend ? 'Yes' : 'No'}
									</p>
									<p>
										<strong>Total Data Points:</strong> {websiteTrafficData.length}
									</p>
								</div>
								<div>
									<p>
										<strong>Revenue Growth:</strong> {calculateGrowth(latestRevenue, previousRevenue)}%
									</p>
									<p>
										<strong>Peak Users:</strong> {Math.max(...dailyActiveUsers.map((d) => d.users))}
									</p>
								</div>
							</div>
						</div>
					</div>
				}
			/>

			<ComponentDoc
				title="Area Chart Props & Usage Guidelines"
				description="Comprehensive guide to Area Chart configuration, data visualization patterns, and best practices."
				component={
					<div className="flex flex-col gap-6 w-full max-w-4xl">
						{/* Props Reference */}
						<div className="p-4 bg-blue-50 rounded-lg">
							<h4 className="text-sm font-semibold text-blue-700 mb-2">Props Reference:</h4>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-600">
								<div>
									<strong>ChartContainer:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li>
											<code>config</code> - Chart configuration object
										</li>
										<li>
											<code>className</code> - Container styling
										</li>
										<li>Provides theme and styling context</li>
									</ul>
								</div>
								<div>
									<strong>AreaChart:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li>
											<code>data</code> - Array of data objects
										</li>
										<li>
											<code>margin</code> - Chart margins
										</li>
										<li>
											<code>accessibilityLayer</code> - Screen reader support
										</li>
									</ul>
								</div>
								<div>
									<strong>Area:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li>
											<code>dataKey</code> - Data property to visualize
										</li>
										<li>
											<code>type</code> - monotone | linear | natural
										</li>
										<li>
											<code>stackId</code> - For stacked areas
										</li>
										<li>
											<code>fill</code> - Area fill color
										</li>
										<li>
											<code>fillOpacity</code> - Transparency (0-1)
										</li>
										<li>
											<code>stroke</code> - Border color
										</li>
									</ul>
								</div>
								<div>
									<strong>XAxis/YAxis:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li>
											<code>dataKey</code> - Data property for axis
										</li>
										<li>
											<code>tickFormatter</code> - Format tick labels
										</li>
										<li>
											<code>tickLine</code> - Show/hide tick lines
										</li>
										<li>
											<code>axisLine</code> - Show/hide axis line
										</li>
									</ul>
								</div>
								<div>
									<strong>ChartTooltip:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li>
											<code>content</code> - Custom tooltip component
										</li>
										<li>
											<code>cursor</code> - Show/hide cursor line
										</li>
										<li>
											<code>formatter</code> - Format tooltip values
										</li>
									</ul>
								</div>
								<div>
									<strong>CartesianGrid:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li>
											<code>strokeDasharray</code> - Grid line style
										</li>
										<li>
											<code>vertical</code> - Show vertical lines
										</li>
										<li>
											<code>horizontal</code> - Show horizontal lines
										</li>
									</ul>
								</div>
								<div>
									<strong>Chart Configuration:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li>Define data series with labels and colors</li>
										<li>Use CSS variables for theming</li>
										<li>TypeScript support with ChartConfig</li>
									</ul>
								</div>
								<div>
									<strong>Responsive Design:</strong>
									<ul className="mt-1 space-y-1 list-disc list-inside ml-2">
										<li>ResponsiveContainer for auto-sizing</li>
										<li>Fixed height with className</li>
										<li>Mobile-optimized margins</li>
									</ul>
								</div>
							</div>
						</div>

						{/* Usage Guidelines */}
						<div className="p-4 bg-green-50 rounded-lg">
							<h4 className="text-sm font-semibold text-green-700 mb-2">Usage Guidelines:</h4>
							<ul className="text-sm text-green-600 space-y-1 list-disc list-inside">
								<li>
									<strong>Data Types:</strong> Best for continuous data over time (analytics, sales, metrics)
								</li>
								<li>
									<strong>Single vs Multi-Series:</strong> Use single for focus, multi-series for comparison
								</li>
								<li>
									<strong>Stacked Areas:</strong> Show part-to-whole relationships with stackId
								</li>
								<li>
									<strong>Color Strategy:</strong> Use semantic colors (green=positive, red=negative)
								</li>
								<li>
									<strong>Fill Opacity:</strong> Lower opacity (0.2-0.4) for overlapping areas
								</li>
								<li>
									<strong>Curve Types:</strong> Monotone for smooth curves, linear for precise data
								</li>
								<li>
									<strong>Axis Formatting:</strong> Format large numbers (K, M) and dates appropriately
								</li>
								<li>
									<strong>Interactive Elements:</strong> Add filtering, zooming, and drill-down capabilities
								</li>
							</ul>
						</div>

						{/* Code Examples */}
						<div className="p-4 bg-gray-100 rounded-lg">
							<h4 className="text-sm font-semibold text-gray-700 mb-2">Code Examples:</h4>
							<pre className="text-xs text-gray-600 overflow-x-auto whitespace-pre-wrap">
								{`// Basic area chart
const config = {
  revenue: { label: 'Revenue', color: 'hsl(var(--chart-1))' },
  profit: { label: 'Profit', color: 'hsl(var(--chart-2))' }
} satisfies ChartConfig

<ChartContainer config={config} className="h-[300px]">
  <AreaChart data={salesData} margin={{ left: 12, right: 12 }}>
    <CartesianGrid strokeDasharray="3 3" vertical={false} />
    <XAxis dataKey="quarter" tickLine={false} axisLine={false} />
    <YAxis tickFormatter={(value) => \`$\${(value / 1000).toFixed(0)}k\`} />
    <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
    <Area 
      dataKey="revenue" 
      type="monotone" 
      fill="var(--color-revenue)" 
      fillOpacity={0.3} 
      stroke="var(--color-revenue)"
    />
  </AreaChart>
</ChartContainer>

// Stacked area chart
<AreaChart data={data}>
  <Area dataKey="desktop" stackId="1" fill="var(--color-desktop)" />
  <Area dataKey="mobile" stackId="1" fill="var(--color-mobile)" />
  <Area dataKey="tablet" stackId="1" fill="var(--color-tablet)" />
</AreaChart>

// Interactive filtering
const [selectedMetric, setSelectedMetric] = useState('all')

<AreaChart data={data}>
  {(selectedMetric === 'all' || selectedMetric === 'pageViews') && (
    <Area dataKey="pageViews" fill="var(--color-pageViews)" />
  )}
  {(selectedMetric === 'all' || selectedMetric === 'sessions') && (
    <Area dataKey="sessions" fill="var(--color-sessions)" />
  )}
</AreaChart>`}
							</pre>
						</div>

						{/* Design Guidelines */}
						<div className="p-4 bg-purple-50 rounded-lg">
							<h4 className="text-sm font-semibold text-purple-700 mb-2">Design Guidelines:</h4>
							<ul className="text-sm text-purple-600 space-y-1 list-disc list-inside">
								<li>
									<strong>Visual Hierarchy:</strong> Use stroke width and opacity to emphasize important data
								</li>
								<li>
									<strong>Color Accessibility:</strong> Ensure sufficient contrast and colorblind-friendly palettes
								</li>
								<li>
									<strong>Data Density:</strong> Avoid overcrowding; use filtering for large datasets
								</li>
								<li>
									<strong>Grid Lines:</strong> Use subtle grids to aid reading without overwhelming data
								</li>
								<li>
									<strong>Annotations:</strong> Add context with labels, trends, and key insights
								</li>
								<li>
									<strong>Loading States:</strong> Show skeleton or placeholder during data loading
								</li>
								<li>
									<strong>Empty States:</strong> Provide meaningful messages when no data is available
								</li>
								<li>
									<strong>Mobile Optimization:</strong> Adjust margins, font sizes, and touch targets
								</li>
							</ul>
						</div>
					</div>
				}
			/>
		</Fragment>
	)
}
