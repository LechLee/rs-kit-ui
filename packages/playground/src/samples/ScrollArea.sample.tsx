import { ScrollArea } from 'ui-kit'
import { ComponentDoc } from '../components/ComponentDoc'

export default function ScrollAreaSample() {
	return (
		<ComponentDoc
			title="Scroll Area"
			description="Augments native scroll functionality for custom, cross-browser styling."
			component={
				<div className="w-full max-w-md rounded-md border">
					<div className="h-[200px] p-4 overflow-auto">
						<div className="text-sm">
							<p className="mb-4">
								Velit ut ultrices quis viverra eu, ultricies nulla at nec. Ut diam venenatis egestas massa vulputate egestas. Nec sed blandit sed diam id sagittis. Hendrerit cursus id dui
								integer eget. Quis pharetra tincidunt enim eu turpis in. Sit congue urna placerat nascetur sed.
							</p>
							<p className="mb-4">
								Sit sed dictumst nunc vel vitae pellentesque urna. Lacus netus faucibus nunc sed id. In non eu facilisis scelerisque leo, est ac imperdiet. Vitae quis quisque et ut. Eget at
								enim, amet non sed diam velit. Ante enim pretium, vitae ut cum.
							</p>
							<p className="mb-4">
								Condimentum faucibus sed nibh placerat ac. Tristique natoque eu, ullamcorper odio vulputate auctor lorem et, nibh ultrices. Eu donec nibh duis at. Suspendisse cursus sed
								tortor elementum vehicula ut posuere. Pellentesque semper aliquam non et purus quam libero.
							</p>
							<p>Amet dui quis nunc cursus nunc in. Vulputate velit feugiat maecenas tempus, ut auctor. Quisque sapien augue eleifend elementum.</p>
						</div>
					</div>
				</div>
			}
		/>
	)
}
