import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export const Layout: React.FC = () => {
	return (
		<div className="min-h-screen flex flex-col">
			<header className="bg-gray-800 text-white">
				<div className="container mx-auto px-4 py-6">
					<div className="flex justify-between items-center">
						<h1 className="text-2xl font-bold">UI Kit Documentation</h1>
						<nav>
							<ul className="flex space-x-6">
								<li>
									<Link to="/" className="hover:text-gray-300">
										Home
									</Link>
								</li>
								<li>
									<Link to="/components" className="hover:text-gray-300">
										Components
									</Link>
								</li>
							</ul>
						</nav>
					</div>
				</div>
			</header>

			<main className="flex-grow container mx-auto px-4 py-8">
				<Outlet />
			</main>

			<footer className="bg-gray-800 text-white">
				<div className="container mx-auto px-4 py-6">
					<p className="text-center">© 2023 UI Kit Documentation. All rights reserved.</p>
				</div>
			</footer>
		</div>
	)
}
