/**
 * @component SafeAreaContainer
 * @version 1.0.0
 * @lastModified 2025-06-20
 * @description A container component that handles safe area insets and pull-to-refresh functionality
 * @status stable
 */

import { useEffect, useState, useRef } from 'react'
import PullToRefresh from './pull-to-refresh'
import { cn } from '../../lib/utils'

interface SafeAreaInsets {
    top: number
    left: number
    bottom: number
    right: number
}

interface SafeAreaContainerProps {
    children?: React.ReactNode | ((params: SafeAreaContainerParams) => React.ReactNode)
    render?: (params: SafeAreaContainerParams) => React.ReactNode
    onRefresh?: () => Promise<void> | void
    onRefreshDelay?: number
    className?: string
    style?: React.CSSProperties
}

interface SafeAreaContainerParams {
    padding: React.CSSProperties
    isEndPage: boolean
    setIsEndPage: (value: boolean) => void
    containerRef: React.RefObject<HTMLDivElement>
}

const SafeAreaContainer = ({ 
    children, 
    render, 
    onRefresh, 
    onRefreshDelay = 1000, 
    className, 
    style 
}: SafeAreaContainerProps) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [insets, setInsets] = useState<SafeAreaInsets>({
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    })
    const [isEndPage, setIsEndPage] = useState(false)

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, clientHeight, scrollHeight } = e.currentTarget
        const maxScroll = scrollHeight - clientHeight
        if (scrollTop === maxScroll || maxScroll - scrollTop < 5) {
            setIsEndPage(true)
        } else {
            setIsEndPage(false)
        }
    }

    const insetsToCSS = (): React.CSSProperties => {
        const { top, left, bottom, right } = insets
        const padding: React.CSSProperties = {}
        if (top) padding.paddingTop = `${top}px`
        if (left) padding.paddingLeft = `${left}px`
        if (bottom) padding.paddingBottom = `${bottom}px`
        if (right) padding.paddingRight = `${right}px`
        return padding
    }

    useEffect(() => {
        try {
            const safeAreaInsetsJSON = sessionStorage.getItem('safeAreaInsets')
            if (safeAreaInsetsJSON) {
                const safeAreaInsets = JSON.parse(safeAreaInsetsJSON)
                if (safeAreaInsets) {
                    setInsets({ 
                        ...safeAreaInsets, 
                        top: safeAreaInsets.top > 0 ? safeAreaInsets.top - 10 : 0 
                    })
                }
                console.log('Safe Area Insets:', safeAreaInsets)
            }
        } catch (e) {
            console.error('Error parsing safeAreaInsets JSON:', e)
        }
    }, [])

    const containerContent = (
        <div 
            ref={containerRef} 
            className={cn(
                'flex flex-col h-screen overflow-y-auto flex-grow bg-neutral-100',
                // Hide scrollbar styles
                'scrollbar-hide',
                '[&::-webkit-scrollbar]:hidden',
                '[-ms-overflow-style:none]',
                '[scrollbar-width:none]',
                className
            )} 
            style={style} 
            onScroll={handleScroll}
        >
            {(() => {
                const params: SafeAreaContainerParams = { 
                    padding: insetsToCSS(), 
                    isEndPage, 
                    setIsEndPage, 
                    containerRef 
                }
                
                if (typeof children === 'function') {
                    return children(params)
                }

                return children || render?.(params)
            })()}
        </div>
    )

    if (!onRefresh) {
        return containerContent
    }

    return (
        <PullToRefresh onRefresh={onRefresh} onRefreshDelay={onRefreshDelay}>
            {containerContent}
        </PullToRefresh>
    )
}

export default SafeAreaContainer