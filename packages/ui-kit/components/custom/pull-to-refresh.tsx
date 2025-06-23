/**
 * @component PullToRefresh
 * @version 1.0.0
 * @lastModified 2025-06-20
 * @description A pull-to-refresh component for mobile touch interfaces
 * @status stable
 */

import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react'
import Loader from './loader'

interface PullToRefreshProps {
    onRefresh?: () => Promise<void> | void
    onRefreshDelay?: number
    children: React.ReactNode
}

export interface PullToRefreshRef {
    triggerRefresh: () => void
}

const PullToRefresh = forwardRef<PullToRefreshRef, PullToRefreshProps>(({ onRefresh, onRefreshDelay = 1000, children }, ref) => {
    const [isPulling, setIsPulling] = useState(false)
    const [pullHeight, setPullHeight] = useState(0)
    const [isRefreshing, setIsRefreshing] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const startYRef = useRef(0) // Track the starting touch position

    // Function to handle refresh logic
    const handleRefresh = () => {
        if (isRefreshing) return

        setIsRefreshing(true)

        if (!onRefresh) {
            setTimeout(() => {
                setIsRefreshing(false)
                setPullHeight(0)
            }, 1000)
            return
        }

        const refreshResult = onRefresh()
        
        if (refreshResult && typeof refreshResult.then === 'function') {
            // Handle promise
            refreshResult
                .then(() => {
                    setTimeout(() => {
                        setIsRefreshing(false)
                        setPullHeight(0)
                    }, onRefreshDelay)
                })
                .catch(() => {
                    setTimeout(() => {
                        setIsRefreshing(false)
                        setPullHeight(0)
                    }, onRefreshDelay)
                })
        } else {
            // Handle sync function
            setTimeout(() => {
                setIsRefreshing(false)
                setPullHeight(0)
            }, onRefreshDelay)
        }
    }

    // Expose triggerRefresh method via ref
    useImperativeHandle(ref, () => ({
        triggerRefresh: () => {
            setPullHeight(100) // Set visual feedback
            handleRefresh()
        }
    }))

    useEffect(() => {
        const handleTouchStart = (e: TouchEvent) => {
            if (containerRef.current && containerRef.current.scrollTop === 0) {
                startYRef.current = e.touches[0].clientY // Save the starting Y position
                setIsPulling(true)
            }
        }

        const handleTouchMove = (e: TouchEvent) => {
            if (isPulling && !isRefreshing) {
                const currentY = e.touches[0].clientY
                const distancePulled = currentY - startYRef.current

                if (distancePulled > 0) {
                    // Only trigger pull if the user is pulling down
                    const newPullHeight = Math.min(distancePulled / 2, 150) // Adjust sensitivity here
                    setPullHeight(newPullHeight)
                } else {
                    setIsPulling(false) // Cancel pulling if it's a swipe up
                }
            }
        }

        const handleTouchEnd = () => {
            if (isPulling && pullHeight >= 100) {
                handleRefresh()
            } else {
                setPullHeight(0)
            }
            setIsPulling(false)
        }

        const container = containerRef.current
        if (container) {
            container.addEventListener('touchstart', handleTouchStart)
            container.addEventListener('touchmove', handleTouchMove)
            container.addEventListener('touchend', handleTouchEnd)

            return () => {
                container.removeEventListener('touchstart', handleTouchStart)
                container.removeEventListener('touchmove', handleTouchMove)
                container.removeEventListener('touchend', handleTouchEnd)
            }
        }
    }, [isPulling, isRefreshing, pullHeight, onRefresh, onRefreshDelay])

    return (
        <div 
            data-testid="pull-down-container" 
            className="pull-to-refresh-container bg-white h-full flex-grow" 
            ref={containerRef}
        >
            <div 
                className="flex items-center justify-center transition-all duration-300 relative" 
                style={{ 
                    height: `${pullHeight}px`, 
                    opacity: pullHeight > 0 ? 1 : 0 
                }}
            >
                {isRefreshing ? (
                    <Loader data-testid="loader" />
                ) : (
                    <div className="text-2xl transition-transform duration-300">↓</div>
                )}
            </div>
            <div data-testid="pull-to-refresh-content" className="content">
                {children}
            </div>
        </div>
    )
})

PullToRefresh.displayName = 'PullToRefresh'

export default PullToRefresh