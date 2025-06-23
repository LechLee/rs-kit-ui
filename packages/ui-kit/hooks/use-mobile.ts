/**
 * @component UseMobile
 * @version 1.0.0
 * @lastModified 2025-06-20
 * @description UseMobile component for the UI library
 * @status stable
 */

import * as React from 'react'

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
	const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

	React.useEffect(() => {
		const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
		const onChange = () => {
			setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
		}
		mql.addEventListener('change', onChange)
		setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
		return () => mql.removeEventListener('change', onChange)
	}, [])

	return !!isMobile
}
