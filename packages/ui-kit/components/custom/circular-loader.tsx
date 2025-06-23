/**
 * @component CircularLoader
 * @version 1.0.0
 * @lastModified 2025-06-20
 * @description A circular loading spinner with rotating bars animation
 * @status stable
 */

import { cn } from '../../lib/utils'

interface CircularLoaderProps {
    size?: 'sm' | 'md' | 'lg' | 'xl'
    color?: string
    className?: string
}

const CircularLoader = ({ size = 'md', color = '#6a6262', className }: CircularLoaderProps) => {
    const sizeClasses = {
        sm: 'w-8 h-8',   // 32px
        md: 'w-16 h-16', // 64px (default)
        lg: 'w-20 h-20', // 80px
        xl: 'w-24 h-24'  // 96px
    }

    const scaleValues = {
        sm: 0.3,
        md: 0.6,
        lg: 0.75,
        xl: 0.9
    }

    return (
        <div className={cn('flex justify-center items-center w-full h-full', className)}>
            <div
                className={cn(
                    'relative',
                    sizeClasses[size],
                    '[&>div]:w-[6px] [&>div]:h-[15px] [&>div]:rounded-[3px] [&>div]:absolute',
                    '[&>div]:origin-[3px_30px] [&>div]:animate-circular-fade'
                )}
                style={{ 
                    transform: `translateZ(0) scale(${scaleValues[size]})`,
                    paddingLeft: '40px',
                    paddingTop: '20px'
                }}
            >
                <div 
                    className="rotate-0" 
                    style={{ 
                        backgroundColor: color,
                        animationDelay: '-0.875s' 
                    }} 
                />
                <div 
                    className="rotate-45" 
                    style={{ 
                        backgroundColor: color,
                        animationDelay: '-0.75s' 
                    }} 
                />
                <div 
                    className="rotate-90" 
                    style={{ 
                        backgroundColor: color,
                        animationDelay: '-0.625s' 
                    }} 
                />
                <div 
                    className="rotate-[135deg]" 
                    style={{ 
                        backgroundColor: color,
                        animationDelay: '-0.5s' 
                    }} 
                />
                <div 
                    className="rotate-180" 
                    style={{ 
                        backgroundColor: color,
                        animationDelay: '-0.375s' 
                    }} 
                />
                <div 
                    className="rotate-[225deg]" 
                    style={{ 
                        backgroundColor: color,
                        animationDelay: '-0.25s' 
                    }} 
                />
                <div 
                    className="rotate-[270deg]" 
                    style={{ 
                        backgroundColor: color,
                        animationDelay: '-0.125s' 
                    }} 
                />
                <div 
                    className="rotate-[315deg]" 
                    style={{ 
                        backgroundColor: color,
                        animationDelay: '0s' 
                    }} 
                />
            </div>
        </div>
    )
}

export default CircularLoader