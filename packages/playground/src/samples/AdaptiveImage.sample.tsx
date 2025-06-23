import { AdaptiveImage } from '@has/ui-kit'

const AdaptiveImageSample = () => {
    const mockImages = {
        '/src/example.png': () => import('/src/assets/example.png'),
        '/src/example@2x.png': () => import('/src/assets/example@2x.png'),
    }

    return (
        <div className="space-y-8">
            <div>
                <h3 className="text-lg font-semibold mb-4">Adaptive Image</h3>
                <p className="text-sm text-gray-600 mb-4">
                    An image component that automatically handles different resolutions and formats.
                </p>
            </div>

            <div className="space-y-6">
                <div>
                    <h4 className="text-md font-medium mb-2">External Image</h4>
                    <AdaptiveImage
                        images={{}}
                        url="https://picsum.photos/300/200"
                        alt="Sample external image"
                        useExternally={true}
                        className="rounded-lg border"
                    />
                </div>

                <div>
                    <h4 className="text-md font-medium mb-2">Local Image (Mock)</h4>
                    <AdaptiveImage
                        images={mockImages}
                        url="/example.png"
                        alt="Sample local image"
                        className="rounded-lg border"
                    />
                </div>

                <div>
                    <h4 className="text-md font-medium mb-2">Eager Loading</h4>
                    <AdaptiveImage
                        images={{}}
                        url="https://picsum.photos/250/150"
                        alt="Eagerly loaded image"
                        useExternally={true}
                        eager={true}
                        className="rounded-lg border"
                    />
                </div>

                <div>
                    <h4 className="text-md font-medium mb-2">With Custom Props</h4>
                    <AdaptiveImage
                        images={{}}
                        url="https://picsum.photos/200/300"
                        alt="Custom styled image"
                        useExternally={true}
                        className="rounded-full border-4 border-blue-500"
                        style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                    />
                </div>
            </div>
        </div>
    )
}

export default AdaptiveImageSample