/**
 * @component Loader
 * @version 1.0.0
 * @lastModified 2025-06-20
 * @description A simple loading spinner component
 * @status stable
 */

import { cn } from '../../lib/utils'

interface LoaderProps {
    size?: 'sm' | 'md' | 'lg'
    className?: string
    'data-testid'?: string
}

const Loader = ({ size = 'md', className, 'data-testid': testId }: LoaderProps) => {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-6 h-6', 
        lg: 'w-8 h-8'
    }

    return (
        <div 
            className={cn(
                'animate-spin rounded-full border-2 border-gray-300 border-t-gray-600',
                sizeClasses[size],
                className
            )}
            data-testid={testId}
        />
    )
}

export default Loader