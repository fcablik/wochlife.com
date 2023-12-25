import { NavLink, Outlet } from '@remix-run/react'

export default function PortfolioFreelance() {
	return (
		<div className="relative">
			<Outlet />
			<div className="absolute right-0 top-0">
				<NavLink
					to="custom-apps"
					className={({ isActive }) => (isActive ? 'text-highlight' : '')}
				>
					custom apps
				</NavLink>
				<NavLink
					to="booking-systems"
					className={({ isActive }) => (isActive ? 'text-highlight' : '')}
				>
					custom apps
				</NavLink>
			</div>
		</div>
	)
}
