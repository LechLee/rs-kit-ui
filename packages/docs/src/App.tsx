import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { ComponentsPage } from './pages/ComponentsPage'

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<HomePage />} />
					<Route path="components" element={<ComponentsPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
