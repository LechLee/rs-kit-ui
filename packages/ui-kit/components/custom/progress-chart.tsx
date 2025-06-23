/**
 * @component ProgressChart
 * @version 1.0.0
 * @lastModified 2025-06-20
 * @description ProgressChart component for the UI library
 * @status stable
 */

import { Sheet, SheetContent } from '../ui/sheet'
import { useEffect, useState } from 'react'

interface ProgressChartProps {
    open: boolean
    success: boolean
    value: number
    title?: string
    subTitle?: string
    successTitle?: string
    successSubtitle?: string
    onComplete?: () => void
}

function ProgressChart({ 
    open, 
    success, 
    value, 
    title = "Progress", 
    subTitle = "Please wait...", 
    successTitle = "Verified!",
    successSubtitle = "You have been successfully\nauthenticated",
    onComplete 
}: ProgressChartProps) {
    const [displayValue, setDisplayValue] = useState(value)
    const [showSuccess, setShowSuccess] = useState(false)
    const [show, setShow] = useState(false)
    const [isTransitioning, setIsTransitioning] = useState(false)

    useEffect(() => {
        if (!success) {
            // Smoothly animate to the new value
            const startValue = displayValue
            const targetValue = value
            const difference = targetValue - startValue
            
            if (Math.abs(difference) < 0.1) {
                setDisplayValue(value)
                return
            }
            
            const duration = 300 // 300ms animation
            const startTime = Date.now()
            
            const animate = () => {
                const elapsed = Date.now() - startTime
                const progress = Math.min(elapsed / duration, 1)
                
                // Easing function for smooth animation
                const easeOut = 1 - Math.pow(1 - progress, 3)
                const currentValue = startValue + (difference * easeOut)
                
                setDisplayValue(currentValue)
                
                if (progress < 1) {
                    requestAnimationFrame(animate)
                }
            }
            
            requestAnimationFrame(animate)
            return
        }

        // Start transition animation
        setIsTransitioning(true)

        // Wait for progress to complete animation, then show success
        setTimeout(() => {
            setShowSuccess(true)
            setIsTransitioning(false)
        }, 800) // 800ms delay for smooth transition

        if (onComplete) {
            // Delay onComplete to allow success animation to show
            setTimeout(() => {
                onComplete()
            }, 2000) // 2 seconds to show success state
        }
    }, [success, value, onComplete])

    useEffect(() => {
        setShow(open)
    }, [open])

    const circumference = 2 * Math.PI * 120 // radius of 120
    const strokeDashoffset = circumference - (displayValue / 100) * circumference

    return (
        <Sheet open={show}>
            <SheetContent side="bottom" className="p-0 inset-0 h-screen w-screen border-0 rounded-none [&>button]:hidden">
                <div className="w-full h-full bg-gradient-to-br from-purple-400 via-purple-500 to-pink-500 flex items-center justify-center relative overflow-hidden">
                    {/* Progress State */}
                    <div
                        className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ease-in-out ${
                            showSuccess ? 'opacity-0 scale-75 translate-y-8' : 'opacity-100 scale-100 translate-y-0'
                        }`}
                    >
                        <div className="h-full px-8 flex justify-center items-center">
                            <div className="flex flex-col justify-center items-center gap-8 max-w-md">
                                {/* Circular Progress */}
                                <div className="relative w-80 h-80 flex justify-center items-center">
                                    {/* Background circle */}
                                    <svg className="w-80 h-80 transform -rotate-90" viewBox="0 0 280 280">
                                        <circle cx="140" cy="140" r="120" stroke="rgba(255,255,255,0.2)" strokeWidth="12" fill="none" />
                                        {/* Progress circle */}
                                        <circle
                                            cx="140"
                                            cy="140"
                                            r="120"
                                            stroke="rgba(255,255,255,0.9)"
                                            strokeWidth="12"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeDasharray={circumference}
                                            strokeDashoffset={strokeDashoffset}
                                            className={`transition-all duration-500 ease-out ${isTransitioning ? 'animate-pulse' : ''}`}
                                        />
                                    </svg>

                                    {/* Inner content */}
                                    <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
                                        <div className="text-white/80 text-sm mb-2">{title}</div>
                                        <div className={`text-4xl font-light transition-all duration-300 ${isTransitioning ? 'animate-bounce' : ''}`}>{Math.round(displayValue)}%</div>
                                    </div>
                                </div>

                                {/* Subtitle */}
                                <div className="text-center text-white/80 text-lg font-light max-w-sm">{subTitle}</div>
                            </div>
                        </div>
                    </div>

                    {/* Success State */}
                    <div
                        className={`absolute inset-0 flex flex-col justify-center items-center transition-all duration-1000 ease-out ${
                            showSuccess ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-125 translate-y-8 pointer-events-none'
                        }`}
                    >
                        <div className="flex flex-col justify-center items-center gap-8 max-w-md z-10 px-8">
                            {/* Success Check Circle with enhanced animation */}
                            <div className="relative w-32 h-32 flex justify-center items-center">
                                <div className={`w-32 h-32 border-4 border-white rounded-full flex justify-center items-center transition-all duration-700 ${showSuccess ? 'animate-pulse scale-100' : 'scale-0'}`}>
                                    <svg
                                        className={`w-12 h-12 text-white transition-all duration-500 delay-300 ${showSuccess ? 'animate-bounce scale-100' : 'scale-0'}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </div>

                            {/* Success Text with staggered animation */}
                            <div className="text-center space-y-4">
                                <h1 className={`text-4xl font-bold text-white transition-all duration-700 delay-500 ${showSuccess ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                                    {successTitle}
                                </h1>
                                <p className={`text-white/80 text-lg font-light transition-all duration-700 delay-700 ${showSuccess ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                                    {successSubtitle.split('\n').map((line, index) => (
                                        <span key={index}>
                                            {line}
                                            {index < successSubtitle.split('\n').length - 1 && <br />}
                                        </span>
                                    ))}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Animated confetti/sparkles */}
                    {showSuccess && (
                        <div className="absolute inset-0 pointer-events-none">
                            {[...Array(20)].map((_, i) => (
                                <div
                                    key={i}
                                    className="absolute w-2 h-2 bg-white rounded-full opacity-70 animate-ping"
                                    style={{
                                        left: `${Math.random() * 100}%`,
                                        top: `${Math.random() * 100}%`,
                                        animationDelay: `${Math.random() * 2}s`,
                                        animationDuration: `${1 + Math.random()}s`
                                    }}
                                />
                            ))}
                        </div>
                    )}

                    {/* Enhanced CSS for animations */}
                    <style>{`
                        @keyframes fall {
                            to {
                                transform: translateY(100vh) rotate(360deg);
                            }
                        }

                        @keyframes sparkle {
                            0%,
                            100% {
                                opacity: 0;
                                transform: scale(0);
                            }
                            50% {
                                opacity: 1;
                                transform: scale(1);
                            }
                        }

                        .animate-sparkle {
                            animation: sparkle 1.5s ease-in-out infinite;
                        }
                    `}</style>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default ProgressChart