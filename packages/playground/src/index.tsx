import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import ButtonSample from './samples/Button.sample'
import InputSample from './samples/Input.sample'
import AlertDialogSample from './samples/AlertDialog.sample'
import CheckboxSample from './samples/Checkbox.sample'
import CommandSample from './samples/Command.sample'
import DialogSample from './samples/Dialog.sample'
import AccordionSample from './samples/Accordion.sample'
import AlertSample from './samples/Alert.sample'
import AspectRatioSample from './samples/AspectRatio.sample'
import AvatarSample from './samples/Avatar.sample'
import BadgeSample from './samples/Badge.sample'
import BreadcrumbSample from './samples/Breadcrumb.sample'
import CalendarSample from './samples/Calendar.sample'
import CardSample from './samples/Card.sample'
import CarouselSample from './samples/Carousel.sample'
import ChartAreaSample from './samples/ChartArea.sample'
import ChartBarSample from './samples/ChartBar.sample'
import ChartLineSample from './samples/ChartLine.sample'
import CollapsibleSample from './samples/Collapsible.sample'
import ContextMenuSample from './samples/ContextMenu.sample'
import ComboboxSample from './samples/Combobox.sample'
import DrawerSample from './samples/Drawer.sample'
import DropdownMenuSample from './samples/DropdownMenu.sample'
import DatePickerSample from './samples/DatePicker.sample'
import FormSample from './samples/Form.sample'
import HoverCardSample from './samples/HoverCard.sample'
import InputOTPSample from './samples/InputOTP.sample'
import LabelSample from './samples/Label.sample'
import MenubarSample from './samples/Menubar.sample'
import NavigationMenuSample from './samples/NavigationMenu.sample'
import PaginationSample from './samples/Pagination.sample'
import PopoverSample from './samples/Popover.sample'
import ProgressSample from './samples/Progress.sample'
import RadioGroupSample from './samples/RadioGroup.sample'
import ResizableSample from './samples/Resizable.sample'
import ScrollAreaSample from './samples/ScrollArea.sample'
import SelectSample from './samples/Select.sample'
import SeparatorSample from './samples/Separator.sample'
import SheetSample from './samples/Sheet.sample'
import SidebarSample from './samples/Sidebar.sample'
import SkeletonSample from './samples/Skeleton.sample'
import SliderSample from './samples/Slider.sample'
import SonnerSample from './samples/Sonner.sample'
import SwitchSample from './samples/Switch.sample'
import TableSample from './samples/Table.sample'
import TabsSample from './samples/Tabs.sample'
import TextareaSample from './samples/Textarea.sample'
import ToggleSample from './samples/Toggle.sample'
import ToggleGroupSample from './samples/ToggleGroup.sample'
import TooltipSample from './samples/Tooltip.sample'
import ColorsSample from './samples/Colors.sample'
import MobileNumberInputSample from './samples/MobileNumberInput.sample'
import ProgressChartSample from './samples/ProgressChart.sample'
import SafeAreaContainerSample from './samples/SafeAreaContainer.sample'
import PullToRefreshSample from './samples/PullToRefresh.sample'
import CircularLoaderSample from './samples/CircularLoader.sample'
import LoaderSample from './samples/Loader.sample'
import App from './App'

const routes = [
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '/',
				element: <Navigate to="/colors" replace />
			},
			{
				path: '/colors',
				element: <ColorsSample />
			},
			{
				path: '/button',
				element: <ButtonSample />
			},
			{
				path: '/input',
				element: <InputSample />
			},
			{
				path: '/alert-dialog',
				element: <AlertDialogSample />
			},
			{
				path: '/checkbox',
				element: <CheckboxSample />
			},
			{
				path: '/command',
				element: <CommandSample />
			},
			{
				path: '/dialog',
				element: <DialogSample />
			},
			{
				path: '/accordion',
				element: <AccordionSample />
			},
			{
				path: '/alert',
				element: <AlertSample />
			},
			{
				path: '/aspect-ratio',
				element: <AspectRatioSample />
			},
			{
				path: '/avatar',
				element: <AvatarSample />
			},
			{
				path: '/badge',
				element: <BadgeSample />
			},
			{
				path: '/breadcrumb',
				element: <BreadcrumbSample />
			},
			{
				path: '/calendar',
				element: <CalendarSample />
			},
			{
				path: '/datepicker',
				element: <DatePickerSample />
			},

			{
				path: '/card',
				element: <CardSample />
			},
			{
				path: '/carousel',
				element: <CarouselSample />
			},
			{
				path: '/chart-area',
				element: <ChartAreaSample />
			},
			{
				path: '/chart-line',
				element: <ChartLineSample />
			},
			{
				path: '/chart-bar',
				element: <ChartBarSample />
			},
			{
				path: '/collapsible',
				element: <CollapsibleSample />
			},
			{
				path: '/context-menu',
				element: <ContextMenuSample />
			},
			{
				path: '/combobox',
				element: <ComboboxSample />
			},

			{
				path: '/drawer',
				element: <DrawerSample />
			},
			{
				path: '/dropdown-menu',
				element: <DropdownMenuSample />
			},
			{
				path: '/form',
				element: <FormSample />
			},
			{
				path: '/hover-card',
				element: <HoverCardSample />
			},
			{
				path: '/input-otp',
				element: <InputOTPSample />
			},
			{
				path: '/label',
				element: <LabelSample />
			},
			{
				path: '/mobile-number-input',
				element: <MobileNumberInputSample />
			},
			{
				path: '/menubar',
				element: <MenubarSample />
			},
			{
				path: '/navigation-menu',
				element: <NavigationMenuSample />
			},
			{
				path: '/pagination',
				element: <PaginationSample />
			},
			{
				path: '/popover',
				element: <PopoverSample />
			},
			{
				path: '/progress',
				element: <ProgressSample />
			},
			{
				path: '/progress-chart',
				element: <ProgressChartSample />
			},
			{
				path: '/safe-area-container',
				element: <SafeAreaContainerSample />
			},
			{
				path: '/pull-to-refresh',
				element: <PullToRefreshSample />
			},
			{
				path: '/circular-loader',
				element: <CircularLoaderSample />
			},
			{
				path: '/loader',
				element: <LoaderSample />
			},
			{
				path: '/radio-group',
				element: <RadioGroupSample />
			},
			{
				path: '/resizable',
				element: <ResizableSample />
			},
			{
				path: '/scroll-area',
				element: <ScrollAreaSample />
			},
			{
				path: '/select',
				element: <SelectSample />
			},
			{
				path: '/separator',
				element: <SeparatorSample />
			},
			{
				path: '/sheet',
				element: <SheetSample />
			},
			{
				path: '/sidebar',
				element: <SidebarSample />
			},
			{
				path: '/skeleton',
				element: <SkeletonSample />
			},
			{
				path: '/slider',
				element: <SliderSample />
			},
			{
				path: '/sonner',
				element: <SonnerSample />
			},
			{
				path: '/switch',
				element: <SwitchSample />
			},
			{
				path: '/table',
				element: <TableSample />
			},
			{
				path: '/tabs',
				element: <TabsSample />
			},
			{
				path: '/textarea',
				element: <TextareaSample />
			},
			{
				path: '/toggle',
				element: <ToggleSample />
			},
			{
				path: '/toggle-group',
				element: <ToggleGroupSample />
			},
			{
				path: '/tooltip',
				element: <TooltipSample />
			}
		]
	}
]
const router = createBrowserRouter(routes, {})

const root = document.getElementById('root')
if (!root) {
	throw new Error('Root element not found')
}

createRoot(root).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
)
