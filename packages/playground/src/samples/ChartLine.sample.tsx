import { Fragment, useState } from 'react'
import {
	TrendingUpIcon,
	ActivityIcon,
	DollarSignIcon,
	HeartIcon,
	CalendarIcon,
	LineChartIcon,
	ZapIcon,
	TargetIcon,
	ThermometerIcon,
	CloudIcon,
	DropletsIcon,
	WindIcon
} from 'lucide-react'
import { CartesianGrid, Line, LineChart, XAxis, YAxis, ReferenceLine, Area, AreaChart } from 'recharts'
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
	Switch,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger
} from '@rs-kit/ui-kit'
import { ComponentDoc } from '@/components/ComponentDoc'

// Sample data sets for different chart types
const trafficData = [
	{ month: 'Jan', desktop: 2400, mobile: 1398, tablet: 600, total: 4398 },
	{ month: 'Feb', desktop: 1398, mobile: 2210, tablet: 800, total: 4408 },
	{ month: 'Mar', desktop: 9800, mobile: 2290, tablet: 1200, total: 13290 },
	{ month: 'Apr', desktop: 3908, mobile: 2000, tablet: 900, total: 6808 },
	{ month: 'May', desktop: 4800, mobile: 2181, tablet: 1100, total: 8081 },
	{ month: 'Jun', desktop: 3800, mobile: 2500, tablet: 1300, total: 7600 },
	{ month: 'Jul', desktop: 4200, mobile: 2800, tablet: 1400, total: 8400 },
	{ month: 'Aug', desktop: 5100, mobile: 3200, tablet: 1600, total: 9900 },
	{ month: 'Sep', desktop: 4600, mobile: 2900, tablet: 1500, total: 9000 },
	{ month: 'Oct', desktop: 5400, mobile: 3400, tablet: 1700, total: 10500 },
	{ month: 'Nov', desktop: 6200, mobile: 3800, tablet: 1900, total: 11900 },
	{ month: 'Dec', desktop: 7000, mobile: 4200, tablet: 2100, total: 13300 }
]

const revenueData = [
	{ month: 'Jan', revenue: 185000, expenses: 120000, profit: 65000, target: 180000 },
	{ month: 'Feb', revenue: 198000, expenses: 135000, profit: 63000, target: 190000 },
	{ month: 'Mar', revenue: 245000, expenses: 155000, profit: 90000, target: 220000 },
	{ month: 'Apr', revenue: 223000, expenses: 148000, profit: 75000, target: 210000 },
	{ month: 'May', revenue: 267000, expenses: 162000, profit: 105000, target: 250000 },
	{ month: 'Jun', revenue: 289000, expenses: 175000, profit: 114000, target: 270000 },
	{ month: 'Jul', revenue: 312000, expenses: 188000, profit: 124000, target: 290000 },
	{ month: 'Aug', revenue: 298000, expenses: 182000, profit: 116000, target: 280000 },
	{ month: 'Sep', revenue: 335000, expenses: 195000, profit: 140000, target: 310000 },
	{ month: 'Oct', revenue: 358000, expenses: 208000, profit: 150000, target: 330000 },
	{ month: 'Nov', revenue: 375000, expenses: 220000, profit: 155000, target: 350000 },
	{ month: 'Dec', revenue: 398000, expenses: 235000, profit: 163000, target: 370000 }
]

const stockData = [
	{ time: '9:00', price: 142.50, volume: 1200, ma20: 140.25, ma50: 138.75 },
	{ time: '9:30', price: 145.20, volume: 1850, ma20: 141.10, ma50: 139.20 },
	{ time: '10:00', price: 143.80, volume: 1650, ma20: 141.85, ma50: 139.65 },
	{ time: '10:30', price: 147.30, volume: 2200, ma20: 142.70, ma50: 140.10 },
	{ time: '11:00', price: 149.60, volume: 2800, ma20: 143.55, ma50: 140.55 },
	{ time: '11:30', price: 148.90, volume: 2400, ma20: 144.40, ma50: 141.00 },
	{ time: '12:00', price: 151.20, volume: 2950, ma20: 145.25, ma50: 141.45 },
	{ time: '12:30', price: 150.80, volume: 2700, ma20: 146.10, ma50: 141.90 },
	{ time: '13:00', price: 152.40, volume: 3100, ma20: 146.95, ma50: 142.35 },
	{ time: '13:30', price: 154.10, volume: 3400, ma20: 147.80, ma50: 142.80 },
	{ time: '14:00', price: 153.70, volume: 3200, ma20: 148.65, ma50: 143.25 },
	{ time: '14:30', price: 155.60, volume: 3600, ma20: 149.50, ma50: 143.70 },
	{ time: '15:00', price: 157.20, volume: 3800, ma20: 150.35, ma50: 144.15 },
	{ time: '15:30', price: 156.90, volume: 3650, ma20: 151.20, ma50: 144.60 },
	{ time: '16:00', price: 158.50, volume: 4000, ma20: 152.05, ma50: 145.05 }
]

const performanceData = [
	{ week: 'Week 1', loadTime: 2.3, responseTime: 1.2, uptime: 99.5, errors: 5 },
	{ week: 'Week 2', loadTime: 2.1, responseTime: 1.1, uptime: 99.7, errors: 3 },
	{ week: 'Week 3', loadTime: 1.9, responseTime: 0.9, uptime: 99.8, errors: 2 },
	{ week: 'Week 4', loadTime: 2.0, responseTime: 1.0, uptime: 99.6, errors: 4 },
	{ week: 'Week 5', loadTime: 1.8, responseTime: 0.8, uptime: 99.9, errors: 1 },
	{ week: 'Week 6', loadTime: 1.7, responseTime: 0.7, uptime: 99.9, errors: 1 },
	{ week: 'Week 7', loadTime: 1.6, responseTime: 0.6, uptime: 99.95, errors: 0 },
	{ week: 'Week 8', loadTime: 1.5, responseTime: 0.5, uptime: 99.98, errors: 0 }
]

const weatherData = [
	{ day: 'Monday', temperature: 22, humidity: 65, windSpeed: 15, precipitation: 0 },
	{ day: 'Tuesday', temperature: 25, humidity: 70, windSpeed: 12, precipitation: 2 },
	{ day: 'Wednesday', temperature: 28, humidity: 68, windSpeed: 18, precipitation: 0 },
	{ day: 'Thursday', temperature: 30, humidity: 75, windSpeed: 20, precipitation: 5 },
	{ day: 'Friday', temperature: 27, humidity: 80, windSpeed: 25, precipitation: 8 },
	{ day: 'Saturday', temperature: 24, humidity: 72, windSpeed: 16, precipitation: 3 },
	{ day: 'Sunday', temperature: 26, humidity: 69, windSpeed: 14, precipitation: 1 }
]

const healthData = [
	{ date: '2024-01-01', steps: 8500, heartRate: 72, calories: 2200, sleep: 7.5 },
	{ date: '2024-01-02', steps: 9200, heartRate: 75, calories: 2350, sleep: 8.0 },
	{ date: '2024-01-03', steps: 7800, heartRate: 70, calories: 2100, sleep: 6.5 },
	{ date: '2024-01-04', steps: 10500, heartRate: 78, calories: 2500, sleep: 7.8 },
	{ date: '2024-01-05', steps: 9800, heartRate: 76, calories: 2400, sleep: 8.2 },
	{ date: '2024-01-06', steps: 11200, heartRate: 80, calories: 2650, sleep: 7.0 },
	{ date: '2024-01-07', steps: 8900, heartRate: 74, calories: 2300, sleep: 8.5 }
]

// Chart configurations
const trafficChartConfig = {
	desktop: { label: 'Desktop', color: 'hsl(var(--chart-1))' },
	mobile: { label: 'Mobile', color: 'hsl(var(--chart-2))' },
	tablet: { label: 'Tablet', color: 'hsl(var(--chart-3))' },
	total: { label: 'Total', color: 'hsl(var(--chart-4))' }
} satisfies ChartConfig

const revenueChartConfig = {
	revenue: { label: 'Revenue', color: 'hsl(var(--chart-1))' },
	expenses: { label: 'Expenses', color: 'hsl(var(--chart-2))' },
	profit: { label: 'Profit', color: 'hsl(var(--chart-3))' },
	target: { label: 'Target', color: 'hsl(var(--chart-4))' }
} satisfies ChartConfig

const stockChartConfig = {
	price: { label: 'Price', color: 'hsl(var(--chart-1))' },
	ma20: { label: '20-day MA', color: 'hsl(var(--chart-2))' },
	ma50: { label: '50-day MA', color: 'hsl(var(--chart-3))' },
	volume: { label: 'Volume', color: 'hsl(var(--chart-4))' }
} satisfies ChartConfig

const performanceChartConfig = {
	loadTime: { label: 'Load Time (s)', color: 'hsl(var(--chart-1))' },
	responseTime: { label: 'Response Time (s)', color: 'hsl(var(--chart-2))' },
	uptime: { label: 'Uptime (%)', color: 'hsl(var(--chart-3))' },
	errors: { label: 'Errors', color: 'hsl(var(--chart-4))' }
} satisfies ChartConfig

const weatherChartConfig = {
	temperature: { label: 'Temperature (°C)', color: 'hsl(var(--chart-1))' },
	humidity: { label: 'Humidity (%)', color: 'hsl(var(--chart-2))' },
	windSpeed: { label: 'Wind Speed (km/h)', color: 'hsl(var(--chart-3))' },
	precipitation: { label: 'Precipitation (mm)', color: 'hsl(var(--chart-4))' }
} satisfies ChartConfig

const healthChartConfig = {
	steps: { label: 'Steps', color: 'hsl(var(--chart-1))' },
	heartRate: { label: 'Heart Rate (bpm)', color: 'hsl(var(--chart-2))' },
	calories: { label: 'Calories', color: 'hsl(var(--chart-3))' },
	sleep: { label: 'Sleep (hours)', color: 'hsl(var(--chart-4))' }
} satisfies ChartConfig

export default function ChartLineSample() {
	// State for interactive examples
	const [showTrendlines, setShowTrendlines] = useState(true)
	const [showDataPoints, setShowDataPoints] = useState(false)
	const [selectedView, setSelectedView] = useState('line')

	// Helper functions
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

	const calculateGrowth = (current: number, previous: number) => {
		return (((current - previous) / previous) * 100).toFixed(1)
	}

	const calculateAverage = (data: number[]) => {
		return (data.reduce((sum, val) => sum + val, 0) / data.length).toFixed(1)
	}

	// Calculate metrics
	const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0)
	const totalProfit = revenueData.reduce((sum, item) => sum + item.profit, 0)
	const avgStockPrice = stockData.reduce((sum, item) => sum + item.price, 0) / stockData.length
	const avgLoadTime = performanceData.reduce((sum, item) => sum + item.loadTime, 0) / performanceData.length
	const totalSteps = healthData.reduce((sum, item) => sum + item.steps, 0)

	return (
		<Fragment>
			<ComponentDoc
				title="Line Chart"
				description="Versatile line charts for visualizing trends and time-series data with support for multiple series, interactive features, and various styling options. Perfect for analytics, monitoring, and data visualization."
				component={
					<div className="flex flex-col gap-8 w-full max-w-6xl">
						{/* Basic Line Charts */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Basic Line Charts</h3>
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<ActivityIcon className="w-5 h-5" />
											Single Line Chart
										</CardTitle>
										<CardDescription>Simple line chart showing traffic trends</CardDescription>
									</CardHeader>
									<CardContent>
										<ChartContainer config={trafficChartConfig} className="h-[300px]">
											<LineChart accessibilityLayer data={trafficData} margin={{ left: 12, right: 12, top: 12, bottom: 12 }}>
												<CartesianGrid strokeDasharray="3 3" vertical={false} />
												<XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
												<YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`} />
												<ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
												<Line dataKey="total" type="monotone" stroke="var(--color-total)" strokeWidth={3} dot={false} />
											</LineChart>
										</ChartContainer>
									</CardContent>
									<CardFooter>
										<div className="flex w-full items-start gap-2 text-sm">
											<div className="grid gap-2">
												<div className="flex items-center gap-2 font-medium leading-none">
													<TrendingUpIcon className="h-4 w-4 text-green-600" />
													Growth: {calculateGrowth(trafficData[trafficData.length - 1].total, trafficData[0].total)}%
												</div>
												<div className="flex items-center gap-2 leading-none text-muted-foreground">
													<CalendarIcon className="h-4 w-4" />
													January - December 2024
												</div>
											</div>
										</div>
									</CardFooter>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<LineChartIcon className="w-5 h-5" />
											Multiple Line Chart
										</CardTitle>
										<CardDescription>Multiple series showing device breakdown</CardDescription>
									</CardHeader>
									<CardContent>
										<ChartContainer config={trafficChartConfig} className="h-[300px]">
											<LineChart accessibilityLayer data={trafficData} margin={{ left: 12, right: 12, top: 12, bottom: 12 }}>
												<CartesianGrid strokeDasharray="3 3" vertical={false} />
												<XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
												<YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`} />
												<ChartTooltip content={<ChartTooltipContent hideLabel />} />
												<Line dataKey="desktop" type="monotone" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />
												<Line dataKey="mobile" type="monotone" stroke="var(--color-mobile)" strokeWidth={2} dot={false} />
												<Line dataKey="tablet" type="monotone" stroke="var(--color-tablet)" strokeWidth={2} dot={false} />
											</LineChart>
										</ChartContainer>
									</CardContent>
									<CardFooter>
										<div className="grid grid-cols-3 gap-4 w-full text-center">
											<div className="space-y-2">
												<div className="flex items-center justify-center gap-2">
													<div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--color-desktop)' }}></div>
													<Badge variant="outline">Desktop</Badge>
												</div>
												<div className="text-sm text-muted-foreground">Leading device type</div>
											</div>
											<div className="space-y-2">
												<div className="flex items-center justify-center gap-2">
													<div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--color-mobile)' }}></div>
													<Badge variant="outline">Mobile</Badge>
												</div>
												<div className="text-sm text-muted-foreground">Fastest growing</div>
											</div>
											<div className="space-y-2">
												<div className="flex items-center justify-center gap-2">
													<div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--color-tablet)' }}></div>
													<Badge variant="outline">Tablet</Badge>
												</div>
												<div className="text-sm text-muted-foreground">Stable usage</div>
											</div>
										</div>
									</CardFooter>
								</Card>
							</div>
						</div>

						{/* Interactive Line Chart */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Interactive Line Chart</h3>
							<div className="mb-4 flex flex-wrap gap-4 items-center">
								<div className="flex items-center gap-2">
									<Button variant={showTrendlines ? 'default' : 'outline'} size="sm" onClick={() => setShowTrendlines(!showTrendlines)}>
										{showTrendlines ? 'Hide' : 'Show'} Trendlines
									</Button>
									<div className="flex items-center space-x-2">
										<Switch id="data-points" checked={showDataPoints} onCheckedChange={setShowDataPoints} />
										<label htmlFor="data-points" className="text-sm">
											Show Data Points
										</label>
									</div>
								</div>
								<Select value={selectedView} onValueChange={setSelectedView}>
									<SelectTrigger className="w-[200px]">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="line">Line Chart</SelectItem>
										<SelectItem value="area">Area Chart</SelectItem>
										<SelectItem value="smooth">Smooth Line</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<DollarSignIcon className="w-5 h-5" />
										Revenue Performance
									</CardTitle>
									<CardDescription>Monthly revenue, expenses, and profit with target lines</CardDescription>
								</CardHeader>
								<CardContent>
									<ChartContainer config={revenueChartConfig} className="h-[400px]">
										{selectedView === 'area' ? (
											<AreaChart accessibilityLayer data={revenueData} margin={{ left: 12, right: 12, top: 12, bottom: 12 }}>
												<CartesianGrid strokeDasharray="3 3" vertical={false} />
												<XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
												<YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
												<ChartTooltip content={<ChartTooltipContent formatter={(value) => formatCurrency(value as number)} hideLabel />} />
												<Area dataKey="revenue" type="monotone" fill="var(--color-revenue)" fillOpacity={0.4} stroke="var(--color-revenue)" strokeWidth={2} />
												<Area dataKey="expenses" type="monotone" fill="var(--color-expenses)" fillOpacity={0.3} stroke="var(--color-expenses)" strokeWidth={2} />
												<Area dataKey="profit" type="monotone" fill="var(--color-profit)" fillOpacity={0.2} stroke="var(--color-profit)" strokeWidth={2} />
											</AreaChart>
										) : (
											<LineChart accessibilityLayer data={revenueData} margin={{ left: 12, right: 12, top: 12, bottom: 12 }}>
												<CartesianGrid strokeDasharray="3 3" vertical={false} />
												<XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
												<YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
												<ChartTooltip content={<ChartTooltipContent formatter={(value) => formatCurrency(value as number)} hideLabel />} />
												{showTrendlines && <ReferenceLine y={250000} stroke="#10B981" strokeDasharray="5 5" label="Target" />}
												<Line 
													dataKey="revenue" 
													type={selectedView === 'smooth' ? 'monotone' : 'linear'} 
													stroke="var(--color-revenue)" 
													strokeWidth={3} 
													dot={showDataPoints ? { r: 4 } : false} 
												/>
												<Line 
													dataKey="expenses" 
													type={selectedView === 'smooth' ? 'monotone' : 'linear'} 
													stroke="var(--color-expenses)" 
													strokeWidth={2} 
													dot={showDataPoints ? { r: 3 } : false} 
												/>
												<Line 
													dataKey="profit" 
													type={selectedView === 'smooth' ? 'monotone' : 'linear'} 
													stroke="var(--color-profit)" 
													strokeWidth={2} 
													dot={showDataPoints ? { r: 3 } : false} 
												/>
											</LineChart>
										)}
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
											<div className="text-2xl font-bold text-purple-600">{((totalProfit / totalRevenue) * 100).toFixed(1)}%</div>
											<div className="text-sm text-purple-700">Profit Margin</div>
										</div>
									</div>
								</CardFooter>
							</Card>
						</div>

						{/* Stock Chart with Moving Averages */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Stock Chart with Technical Indicators</h3>
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<TargetIcon className="w-5 h-5" />
										Stock Price with Moving Averages
									</CardTitle>
									<CardDescription>Intraday stock price with 20-day and 50-day moving averages</CardDescription>
								</CardHeader>
								<CardContent>
									<ChartContainer config={stockChartConfig} className="h-[400px]">
										<LineChart accessibilityLayer data={stockData} margin={{ left: 12, right: 12, top: 12, bottom: 12 }}>
											<CartesianGrid strokeDasharray="3 3" vertical={false} />
											<XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={8} />
											<YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `$${value.toFixed(0)}`} />
											<ChartTooltip 
												content={<ChartTooltipContent 
													formatter={(value, name) => {
														if (name === 'volume') return [formatNumber(value as number), 'Volume']
														return [`$${(value as number).toFixed(2)}`, name as string]
													}} 
													hideLabel 
												/>} 
											/>
											<Line dataKey="price" type="monotone" stroke="var(--color-price)" strokeWidth={3} dot={{ r: 3 }} />
											<Line dataKey="ma20" type="monotone" stroke="var(--color-ma20)" strokeWidth={2} strokeDasharray="5 5" dot={false} />
											<Line dataKey="ma50" type="monotone" stroke="var(--color-ma50)" strokeWidth={2} strokeDasharray="10 5" dot={false} />
										</LineChart>
									</ChartContainer>
								</CardContent>
								<CardFooter>
									<div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
										<div className="text-center p-3 bg-blue-50 rounded-lg">
											<div className="text-xl font-bold text-blue-600">${stockData[stockData.length - 1].price.toFixed(2)}</div>
											<div className="text-sm text-blue-700">Current Price</div>
										</div>
										<div className="text-center p-3 bg-green-50 rounded-lg">
											<div className="text-xl font-bold text-green-600">${avgStockPrice.toFixed(2)}</div>
											<div className="text-sm text-green-700">Avg Price</div>
										</div>
										<div className="text-center p-3 bg-purple-50 rounded-lg">
											<div className="text-xl font-bold text-purple-600">{formatNumber(stockData[stockData.length - 1].volume)}</div>
											<div className="text-sm text-purple-700">Volume</div>
										</div>
										<div className="text-center p-3 bg-orange-50 rounded-lg">
											<div className="text-xl font-bold text-orange-600">
												{calculateGrowth(stockData[stockData.length - 1].price, stockData[0].price)}%
											</div>
											<div className="text-sm text-orange-700">Day Change</div>
										</div>
									</div>
								</CardFooter>
							</Card>
						</div>

						{/* Multi-Tab Chart Views */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Multi-Tab Chart Views</h3>
							<Tabs defaultValue="performance" className="space-y-4">
								<TabsList className="grid w-full grid-cols-3">
									<TabsTrigger value="performance">Performance</TabsTrigger>
									<TabsTrigger value="weather">Weather</TabsTrigger>
									<TabsTrigger value="health">Health</TabsTrigger>
								</TabsList>

								<TabsContent value="performance">
									<Card>
										<CardHeader>
											<CardTitle className="flex items-center gap-2">
												<ZapIcon className="w-5 h-5" />
												Website Performance Metrics
											</CardTitle>
											<CardDescription>Performance improvements over 8 weeks</CardDescription>
										</CardHeader>
										<CardContent>
											<ChartContainer config={performanceChartConfig} className="h-[350px]">
												<LineChart accessibilityLayer data={performanceData} margin={{ left: 12, right: 12, top: 12, bottom: 12 }}>
													<CartesianGrid strokeDasharray="3 3" vertical={false} />
													<XAxis dataKey="week" tickLine={false} axisLine={false} tickMargin={8} />
													<YAxis tickLine={false} axisLine={false} />
													<ChartTooltip content={<ChartTooltipContent hideLabel />} />
													<Line dataKey="loadTime" type="monotone" stroke="var(--color-loadTime)" strokeWidth={3} dot={{ r: 4 }} />
													<Line dataKey="responseTime" type="monotone" stroke="var(--color-responseTime)" strokeWidth={2} dot={{ r: 3 }} />
												</LineChart>
											</ChartContainer>
										</CardContent>
										<CardFooter>
											<div className="grid grid-cols-2 gap-4 w-full">
												<div className="text-center p-3 bg-blue-50 rounded-lg">
													<div className="text-xl font-bold text-blue-600">{avgLoadTime.toFixed(1)}s</div>
													<div className="text-sm text-blue-700">Avg Load Time</div>
												</div>
												<div className="text-center p-3 bg-green-50 rounded-lg">
													<div className="text-xl font-bold text-green-600">{performanceData.reduce((sum, item) => sum + item.errors, 0)}</div>
													<div className="text-sm text-green-700">Total Errors</div>
												</div>
											</div>
										</CardFooter>
									</Card>
								</TabsContent>

								<TabsContent value="weather">
									<Card>
										<CardHeader>
											<CardTitle className="flex items-center gap-2">
												<CloudIcon className="w-5 h-5" />
												Weather Forecast
											</CardTitle>
											<CardDescription>7-day weather forecast with multiple metrics</CardDescription>
										</CardHeader>
										<CardContent>
											<ChartContainer config={weatherChartConfig} className="h-[350px]">
												<LineChart accessibilityLayer data={weatherData} margin={{ left: 12, right: 12, top: 12, bottom: 12 }}>
													<CartesianGrid strokeDasharray="3 3" vertical={false} />
													<XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => value.slice(0, 3)} />
													<YAxis tickLine={false} axisLine={false} />
													<ChartTooltip content={<ChartTooltipContent hideLabel />} />
													<Line dataKey="temperature" type="monotone" stroke="var(--color-temperature)" strokeWidth={3} dot={{ r: 4 }} />
													<Line dataKey="humidity" type="monotone" stroke="var(--color-humidity)" strokeWidth={2} dot={{ r: 3 }} />
												</LineChart>
											</ChartContainer>
										</CardContent>
										<CardFooter>
											<div className="grid grid-cols-3 gap-4 w-full text-center">
												<div>
													<div className="flex items-center justify-center gap-2 mb-1">
														<ThermometerIcon className="w-4 h-4 text-red-500" />
														<Badge variant="outline">Temp</Badge>
													</div>
													<div className="text-lg font-bold">{calculateAverage(weatherData.map(d => d.temperature))}°C</div>
												</div>
												<div>
													<div className="flex items-center justify-center gap-2 mb-1">
														<DropletsIcon className="w-4 h-4 text-blue-500" />
														<Badge variant="outline">Humidity</Badge>
													</div>
													<div className="text-lg font-bold">{calculateAverage(weatherData.map(d => d.humidity))}%</div>
												</div>
												<div>
													<div className="flex items-center justify-center gap-2 mb-1">
														<WindIcon className="w-4 h-4 text-gray-500" />
														<Badge variant="outline">Wind</Badge>
													</div>
													<div className="text-lg font-bold">{calculateAverage(weatherData.map(d => d.windSpeed))} km/h</div>
												</div>
											</div>
										</CardFooter>
									</Card>
								</TabsContent>

								<TabsContent value="health">
									<Card>
										<CardHeader>
											<CardTitle className="flex items-center gap-2">
												<HeartIcon className="w-5 h-5" />
												Health & Fitness Tracking
											</CardTitle>
											<CardDescription>Weekly health metrics and activity data</CardDescription>
										</CardHeader>
										<CardContent>
											<ChartContainer config={healthChartConfig} className="h-[350px]">
												<LineChart accessibilityLayer data={healthData} margin={{ left: 12, right: 12, top: 12, bottom: 12 }}>
													<CartesianGrid strokeDasharray="3 3" vertical={false} />
													<XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => new Date(value).getDate().toString()} />
													<YAxis tickLine={false} axisLine={false} />
													<ChartTooltip content={<ChartTooltipContent hideLabel />} />
													<Line dataKey="steps" type="monotone" stroke="var(--color-steps)" strokeWidth={3} dot={{ r: 4 }} />
													<Line dataKey="heartRate" type="monotone" stroke="var(--color-heartRate)" strokeWidth={2} dot={{ r: 3 }} />
												</LineChart>
											</ChartContainer>
										</CardContent>
										<CardFooter>
											<div className="grid grid-cols-2 gap-4 w-full">
												<div className="text-center p-3 bg-purple-50 rounded-lg">
													<div className="text-xl font-bold text-purple-600">{formatNumber(totalSteps)}</div>
													<div className="text-sm text-purple-700">Total Steps</div>
												</div>
												<div className="text-center p-3 bg-red-50 rounded-lg">
													<div className="text-xl font-bold text-red-600">{calculateAverage(healthData.map(d => d.heartRate))} bpm</div>
													<div className="text-sm text-red-700">Avg Heart Rate</div>
												</div>
											</div>
										</CardFooter>
									</Card>
								</TabsContent>
							</Tabs>
						</div>

						{/* Current State Display */}
						<div className="mt-6 p-4 bg-gray-50 rounded-lg">
							<h4 className="text-sm font-semibold text-gray-700 mb-2">Interactive State:</h4>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
								<div>
									<p>
										<strong>Chart View:</strong> {selectedView}
									</p>
									<p>
										<strong>Show Trendlines:</strong> {showTrendlines ? 'Yes' : 'No'}
									</p>
								</div>
								<div>
									<p>
										<strong>Show Data Points:</strong> {showDataPoints ? 'Yes' : 'No'}
									</p>
									<p>
										<strong>Total Data Points:</strong> {trafficData.length}
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
