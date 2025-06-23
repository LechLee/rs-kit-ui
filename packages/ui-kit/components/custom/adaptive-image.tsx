import { useEffect, useState } from 'react'
import * as React from 'react'

interface ImageModule {
	default: string
}

interface AdaptiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
	images: Record<string, () => Promise<ImageModule>>
	url: string
	alt?: string
	useExternally?: boolean
	eager?: boolean
}

const AdaptiveImage = ({ images, url, alt = '', useExternally = false, eager = false, ...props }: AdaptiveImageProps) => {
	const [src, setSrc] = useState('')
	const [srcSet, setSrcSet] = useState('')

	const isExternalUrl = (path: string): boolean => /^(https?:\/\/|\/\/)/i.test(path)

	const resolveImagePath = async (relativePath: string): Promise<string | null> => {
		try {
			const matchedImage = images[relativePath]
			if (typeof matchedImage === 'function') {
				return (await matchedImage()).default
			}
			return null
		} catch (error) {
			console.error(`Image not found: ${relativePath}`, error)
			return null
		}
	}

	const getFileExtension = (path: string): string => {
		const match = path.match(/\.(png|jpg|jpeg|webp)$/)
		return match ? match[1] : 'png'
	}

	const prefetchImage = (src: string): void => {
		const img = new Image()
		img.src = src
	}

	const prefetchImages = (srcSet: string): void => {
		srcSet.split(',').forEach((src: string) => {
			const [path] = src.trim().split(' ')
			prefetchImage(path)
		})
	}

	useEffect(() => {
		const loadImage = async () => {
			try {
				const fileExtension = getFileExtension(url)
				const external = isExternalUrl(url) || useExternally

				if (external) {
					setSrc(url)

					const baseUrl = url.split('?')[0]
					const resolvedSrcSet = `
                        ${baseUrl} 1x,
                        ${baseUrl.replace(new RegExp(`\\.${fileExtension}$`), `@2x.${fileExtension}`)} 2x,
                        ${baseUrl.replace(new RegExp(`\\.${fileExtension}$`), `@3x.${fileExtension}`)} 3x,
                        ${baseUrl.replace(new RegExp(`\\.${fileExtension}$`), `@4x.${fileExtension}`)} 4x
                    `.trim()

					setSrcSet(resolvedSrcSet)
					if (eager) {
						prefetchImages(resolvedSrcSet)
					}
				} else {
					const cleanedUrl = url.replace(`.${fileExtension}`, '')
					const baseImagePath = `/src${cleanedUrl}`
					const resolvedSrc = await resolveImagePath(`${baseImagePath}.${fileExtension}`)
					const resolvedSrcSetParts = [
						{ path: resolvedSrc, scale: '1x' },
						{ path: await resolveImagePath(`${baseImagePath}@2x.${fileExtension}`), scale: '2x' },
						{ path: await resolveImagePath(`${baseImagePath}@3x.${fileExtension}`), scale: '3x' },
						{ path: await resolveImagePath(`${baseImagePath}@4x.${fileExtension}`), scale: '4x' }
					].filter((part) => part.path !== null)

					const resolvedSrcSet = resolvedSrcSetParts.map((part) => `${part.path} ${part.scale}`).join(', ')

					setSrc(resolvedSrc ?? '')
					setSrcSet(resolvedSrcSet)
					if (eager) {
						prefetchImages(resolvedSrcSet)
					}
				}
			} catch (error) {
				console.error('Failed to load images:', error)
			}
		}

		loadImage()
	}, [url, useExternally, eager])

	return <img data-testid="image-element" src={src} srcSet={srcSet} alt={alt} {...props} />
}

export default AdaptiveImage
