import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router'
import ButtonPlay from '@/playground/Button.play'
import App from './App'

const routes = [
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '/',
				element: <Navigate to="/button" replace />
			},
			{
				path: '/button',
				element: <ButtonPlay />
			}
		]
	}
]
const router = createBrowserRouter(routes, {})

const root = document.getElementById('root')
if (!root) {
	throw new Error('Root element not found')
}

createRoot(root).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
)
