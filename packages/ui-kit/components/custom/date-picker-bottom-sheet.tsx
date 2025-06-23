/**
 * @component DatePickerBottomSheet
 * @version 1.0.0
 * @lastModified 2025-06-20
 * @description DatePickerBottomSheet component for the UI library
 * @status stable
 */

import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DatePickerBottomSheetProps {
    selectedDate: Date | null
    onDateSelect: (date: Date) => void
    disabled?: boolean
    placeholder?: string
    className?: string
    error?: boolean
    errorMessage?: string
}

// Date picker bottom sheet component with pull-down to dismiss
const DatePickerBottomSheet = ({ selectedDate, onDateSelect, disabled = false, placeholder = 'Select date', className, error, errorMessage }: DatePickerBottomSheetProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [currentMonth, setCurrentMonth] = useState(selectedDate ? selectedDate.getMonth() : new Date().getMonth())
    const [currentYear, setCurrentYear] = useState(selectedDate ? selectedDate.getFullYear() : new Date().getFullYear())
    const [tempSelectedDate, setTempSelectedDate] = useState(selectedDate || new Date())

    // Pull-down dismiss states
    const [isDragging, setIsDragging] = useState(false)
    const [dragY, setDragY] = useState(0)
    const [startY, setStartY] = useState(0)
    const sheetRef = useRef(null)

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    const getDaysInMonth = (month: number, year: number) => {
        return new Date(year, month + 1, 0).getDate()
    }

    const getFirstDayOfMonth = (month: number, year: number) => {
        return new Date(year, month, 1).getDay()
    }

    // Update states when selectedDate prop changes or modal opens
    useEffect(() => {
        if (isOpen) {
            if (selectedDate) {
                setCurrentMonth(selectedDate.getMonth())
                setCurrentYear(selectedDate.getFullYear())
                setTempSelectedDate(selectedDate)
            } else {
                const today = new Date()
                setCurrentMonth(today.getMonth())
                setCurrentYear(today.getFullYear())
                setTempSelectedDate(today)
            }
        }
    }, [isOpen, selectedDate])

    // Handle touch/mouse events for pull-down dismiss
    const handleStart = (clientY: number) => {
        setIsDragging(true)
        setStartY(clientY)
        setDragY(0)
    }

    const handleMove = (clientY: number) => {
        if (!isDragging) return

        const deltaY = clientY - startY
        if (deltaY > 0) {
            // Only allow downward drag
            setDragY(deltaY)
        }
    }

    const handleEnd = () => {
        if (!isDragging) return

        // If dragged more than 100px down, close the sheet
        if (dragY > 100) {
            setIsOpen(false)
        }

        setIsDragging(false)
        setDragY(0)
        setStartY(0)
    }

    // Mouse events for the entire sheet
    const handleSheetMouseDown = (e: React.MouseEvent) => {
        // Don't start drag if clicking on interactive elements
        if ((e.target as HTMLElement).tagName === 'BUTTON' || (e.target as HTMLElement).closest('button')) {
            return
        }
        e.preventDefault()
        handleStart(e.clientY)
    }

    const handleMouseMove = (e: MouseEvent) => {
        e.preventDefault()
        handleMove(e.clientY)
    }

    const handleMouseUp = () => {
        handleEnd()
    }

    // Touch events for the entire sheet
    const handleSheetTouchStart = (e: React.TouchEvent) => {
        // Don't start drag if touching interactive elements
        if ((e.target as HTMLElement).tagName === 'BUTTON' || (e.target as HTMLElement).closest('button')) {
            return
        }
        // Prevent event from bubbling to parent
        e.stopPropagation()
        handleStart(e.touches[0].clientY)
    }

    const handleSheetTouchMove = (e: React.TouchEvent) => {
        if (isDragging) {
            // Prevent scrolling and bubbling while dragging
            e.preventDefault()
            e.stopPropagation()
        }
        handleMove(e.touches[0].clientY)
    }

    const handleSheetTouchEnd = (e: React.TouchEvent) => {
        // Prevent event from bubbling to parent
        e.stopPropagation()
        handleEnd()
    }

    // Prevent background scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            // Disable body scroll when modal is open
            document.body.style.overflow = 'hidden'
            // For iOS Safari
            document.body.style.position = 'fixed'
            document.body.style.width = '100%'
            document.body.style.top = '0'
        } else {
            // Re-enable body scroll when modal is closed
            document.body.style.overflow = ''
            document.body.style.position = ''
            document.body.style.width = ''
            document.body.style.top = ''
        }

        // Cleanup on unmount
        return () => {
            document.body.style.overflow = ''
            document.body.style.position = ''
            document.body.style.width = ''
            document.body.style.top = ''
        }
    }, [isOpen])

    // Add/remove global event listeners for mouse events
    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove)
            document.addEventListener('mouseup', handleMouseUp)
            return () => {
                document.removeEventListener('mousemove', handleMouseMove)
                document.removeEventListener('mouseup', handleMouseUp)
            }
        }
    }, [isDragging, startY])

    const renderCalendar = () => {
        const daysInMonth = getDaysInMonth(currentMonth, currentYear)
        const firstDay = getFirstDayOfMonth(currentMonth, currentYear)
        const days = []

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="h-12 flex items-center justify-center"></div>)
        }

        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentYear, currentMonth, day)
            const isSelected = tempSelectedDate && date.getDate() === tempSelectedDate.getDate() && date.getMonth() === tempSelectedDate.getMonth() && date.getFullYear() === tempSelectedDate.getFullYear()

            days.push(
                <button
                    key={day}
                    onClick={() => setTempSelectedDate(date)}
                    className={`h-12 flex items-center justify-center text-lg font-medium rounded-lg transition-colors ${isSelected ? 'bg-primary-1 text-white' : 'text-gray-900 hover:bg-gray-100'}`}
                >
                    {day}
                </button>
            )
        }

        return days
    }

    const handleConfirm = () => {
        onDateSelect(tempSelectedDate)
        setIsOpen(false)
    }

    const formatDate = (date: Date | null) => {
        if (!date) return ''
        return date.toLocaleDateString()
    }

    // Handle backdrop click
    const handleBackdropClick = (e: React.MouseEvent | React.TouchEvent) => {
        if (e.target === e.currentTarget) {
            setIsOpen(false)
        }
    }

    // Prevent backdrop touch events from propagating
    const handleBackdropTouchStart = (e: React.TouchEvent) => {
        e.stopPropagation()
        handleBackdropClick(e)
    }

    // Calculate transform and opacity based on drag
    const transform = isDragging ? `translateY(${dragY}px)` : 'translateY(0)'
    const opacity = isDragging ? Math.max(0.5, 1 - dragY / 300) : 1

    // Error state logic similar to input component
    const isError = error || !!errorMessage

    return (
        <>
            {/* Trigger Button */}
            <button
                type="button"
                disabled={disabled}
                onClick={() => !disabled && setIsOpen(true)}
                className={cn(
                    'self-stretch bg-white rounded-[10px] text-neutral-800 text-base font-normal border transition-colors text-left flex items-center justify-between',
                    disabled ? 'border-none p-0' : 'h-10 pl-4 pr-3 py-1.5',
                    isError
                        ? 'border-error-1 focus:border-error-1 focus:ring-1 focus:ring-error-1 focus:outline-none'
                        : selectedDate
                        ? 'border-gray-500 focus:border-[#e20079] focus:ring-1 focus:ring-[#e20079] focus:outline-none'
                        : 'border-gray-300 focus:border-[#e20079] focus:ring-1 focus:ring-[#e20079] focus:outline-none',
                    className
                )}
            >
                <span className={selectedDate ? 'text-neutral-800' : 'text-gray-400'}>
                    {selectedDate ? formatDate(selectedDate) : placeholder}
                </span>
                {!disabled && <ChevronDown className="w-5 h-5 text-gray-400" />}
            </button>

            {/* Bottom Sheet Modal */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-end mb-safe"
                    style={{ touchAction: 'none' }} // Prevent default touch behaviors
                >
            <div className="absolute inset-0 bg-black/50" onClick={handleBackdropClick} onTouchStart={handleBackdropTouchStart}></div>
            <div
                ref={sheetRef}
                className="relative flex flex-col justify-between w-full bg-white rounded-t-3xl p-6 animate-slide-up h-3/5 transition-transform select-none"
                style={{
                    transform,
                    opacity,
                    transition: isDragging ? 'none' : 'transform 0.3s ease-out, opacity 0.3s ease-out',
                    touchAction: 'none' // Prevent default touch behaviors on the sheet
                }}
                onMouseDown={handleSheetMouseDown}
                onTouchStart={handleSheetTouchStart}
                onTouchMove={handleSheetTouchMove}
                onTouchEnd={handleSheetTouchEnd}
            >
                {/* Pull indicator */}
                <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6"></div>

                {/* Calendar Header */}
                <div className="flex items-center justify-between mb-6">
                    <button
                        onClick={() => {
                            if (currentMonth === 0) {
                                setCurrentMonth(11)
                                setCurrentYear((prev: number) => prev - 1)
                            } else {
                                setCurrentMonth((prev: number) => prev - 1)
                            }
                        }}
                        className="p-2 rounded-lg hover:bg-gray-100"
                    >
                        <ChevronLeft className="w-6 h-6 text-primary-1" />
                    </button>

                    <h3 className="text-lg font-semibold text-gray-900">
                        {months[currentMonth]} {currentYear}
                    </h3>

                    <button
                        onClick={() => {
                            if (currentMonth === 11) {
                                setCurrentMonth(0)
                                setCurrentYear((prev: number) => prev + 1)
                            } else {
                                setCurrentMonth((prev: number) => prev + 1)
                            }
                        }}
                        className="p-2 rounded-lg hover:bg-gray-100"
                    >
                        <ChevronLeft className="w-6 h-6 text-primary-1 rotate-180" />
                    </button>
                </div>

                {/* Days of week */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                    {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day) => (
                        <div key={day} className="h-8 flex items-center justify-center text-sm font-medium text-gray-500">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1 mb-6">{renderCalendar()}</div>

                {/* Confirm Button */}
                <button onClick={handleConfirm} className="w-full py-4 bg-primary-1 text-white text-lg font-semibold rounded-2xl hover:bg-primary-1/90 transition-colors">
                    Confirm
                </button>
            </div>
                </div>
            )}
        </>
    )
}

export default DatePickerBottomSheet