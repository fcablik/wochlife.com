import { type MetaFunction } from '@remix-run/node'
import { NavLink, Outlet } from '@remix-run/react'
import { useState } from 'react'
import {
	bigBoxTitle,
	boxInnerContentBoxInnerBox,
	contentRouteSelectorContentBoxes,
	contentsRouteContentCol2,
	contentsRouteSelectorCol1,
	contentsRouteWrapper,
	darkContentBoxBgClassList,
	innerContentBoxTexts,
	innerContentBoxWrapperOfBoxesInBox2,
	mobContentsRouteSelectorCol1,
	purpleBoxBg40ClassList,
	purpleBoxInnerContentBox40,
} from '#app/components/classlists.tsx'
import {
	MobileModalCaretOpener,
	ModalCloserIcon,
} from '#app/components/modal-helpers.tsx'
import { Button } from '#app/components/ui/button.tsx'
import { Icon, type IconName } from '#app/components/ui/icon.tsx'
import { cn } from '#app/utils/misc.tsx'

export default function ProjectsRoute() {
	const [isMobExtraMenuToggled, setMobExtraMenuToggled] = useState(false)
	const handleToggle = () => {
		setMobExtraMenuToggled(prev => !prev)
	}

	return (
		<div className={contentsRouteWrapper}>
			<div className="md-to-lg:hidden">
				<MobileModalCaretOpener
					isMobExtraMenuToggled={isMobExtraMenuToggled}
					handleToggle={handleToggle}
					triggerTitle="menu"
				/>

				<RouteSelector
					classList={cn(
						isMobExtraMenuToggled
							? 'opacity-100'
							: 'opacity-0 pointer-events-none', // pointer-events-none to make this opacity-0 component non-interactive
						mobContentsRouteSelectorCol1,
					)}
					handleToggle={handleToggle}
				/>
			</div>

			<RouteSelector
				classList={cn(contentsRouteSelectorCol1, 'max-md-to-lg:hidden')}
			/>

			<div className={cn('delayed-fade-in-200', contentsRouteContentCol2)}>
				<div className={darkContentBoxBgClassList}>
					<h4 className="mb-6 text-center text-lg font-semibold capitalize md:text-xl md-to-lg:hidden">
						Discover My Projects
					</h4>

					<div className="flex justify-center gap-3 pb-2 max-xl:flex-wrap md-to-lg:hidden">
						<NavLink to="custom-apps">
							{({ isActive }) => (
								<Button
									className="w-full capitalize"
									variant={isActive ? 'highlight' : 'default'}
								>
									custom web apps
								</Button>
							)}
						</NavLink>

						<NavLink to="e-commerce">
							{({ isActive }) => (
								<Button
									className="w-full capitalize"
									variant={isActive ? 'highlight' : 'default'}
								>
									e-commerce
								</Button>
							)}
						</NavLink>

						<NavLink to="accommodations-apps">
							{({ isActive }) => (
								<Button
									className="w-full capitalize"
									variant={isActive ? 'highlight' : 'default'}
								>
									accommodations web apps
								</Button>
							)}
						</NavLink>

						{/* <NavLink to="chaos-escape-app">
						{({ isActive }) => (
							<Button
								className="capitalize"
								variant={isActive ? 'highlight' : 'default'}
							>
								Car Dealer Finder App
							</Button>
						)}
					</NavLink> */}

						{/* <NavLink to="steretwear">
						{({ isActive }) => ( */}
						<div>
							<Button
								className="w-full capitalize"
								// variant={isActive ? 'highlight' : 'default'}
								variant="disabled"
							>
								streetwear
							</Button>
						</div>
						{/* )}
					</NavLink> */}

						{/* <NavLink to="nft-collection">
						{({ isActive }) => ( */}
						<div>
							<Button
								className="w-full capitalize"
								// variant={isActive ? 'highlight' : 'default'}
								variant="disabled"
							>
								nft collection
							</Button>
						</div>
						{/* )}
					</NavLink> */}

						{/* <NavLink to="web3-nft-game">
						{({ isActive }) => ( */}
						<div>
							<Button
								className="w-full capitalize"
								// variant={isActive ? 'highlight' : 'default'}
								variant="disabled"
							>
								web3 NFT game
							</Button>
						</div>
						{/* )}
					</NavLink> */}
					</div>

					<Outlet />
				</div>
			</div>
		</div>
	)
}

function RouteSelector({
	classList,
	handleToggle,
}: {
	classList: string
	handleToggle?: () => void
}) {
	const handleClick = () => {
		handleToggle && handleToggle()
	}
	const lightGreenGradient = 'bg-light-green-radial-gradient'

	return (
		<div className={classList}>
			<div
				className={cn(
					'delayed-fade-in-100 custom-content-route-selector-height',
					purpleBoxBg40ClassList,
				)}
			>
				{handleToggle && <ModalCloserIcon handleToggle={handleClick} />}

				<h3 className={bigBoxTitle}>projects</h3>

				<div className={innerContentBoxWrapperOfBoxesInBox2}>
					<NavLink to="custom-apps" onClick={handleClick}>
						{({ isActive }) => (
							<ProjectsContentBox
								boxClass={isActive ? 'bg-highlight-dark' : ''}
								name={'Custom Web Apps'}
								description={'since 2019'}
								iconName="desktop"
								innerBoxClass={cn(
									lightGreenGradient,
									isActive
										? 'bg-light-blue-radial-gradient'
										: 'text-highlight group-hover:text-foreground',
								)}
							/>
						)}
					</NavLink>
					<NavLink to="e-commerce" onClick={handleClick}>
						{({ isActive }) => (
							<ProjectsContentBox
								boxClass={isActive ? 'bg-highlight-dark' : ''}
								name={'E-commerce'}
								description={'since 2020'}
								iconName="desktop"
								innerBoxClass={cn(
									lightGreenGradient,
									isActive
										? 'bg-light-blue-radial-gradient'
										: 'text-highlight group-hover:text-foreground',
								)}
							/>
						)}
					</NavLink>
					<NavLink to="accommodations-apps" onClick={handleClick}>
						{({ isActive }) => (
							<ProjectsContentBox
								boxClass={isActive ? 'bg-highlight-dark' : ''}
								name={'Accommodations Apps'}
								description={'since 2022'}
								iconName="desktop"
								innerBoxClass={cn(
									lightGreenGradient,
									isActive
										? 'bg-light-blue-radial-gradient'
										: 'text-highlight group-hover:text-foreground',
								)}
							/>
						)}
					</NavLink>
					{/* <NavLink to="chaos-escape-app" onClick={handleClick}>
						{({ isActive }) => (
							<ProjectsContentBox
								boxClass={isActive ? 'bg-highlight-dark' : ''}
								name={'Car Dealer Finder App'}
								description={'since 2023'}
								iconName="magnifying-glass"
								innerBoxClass={cn(
									lightGreenGradient,
									isActive
										? 'bg-light-blue-radial-gradient'
										: 'text-highlight group-hover:text-foreground',
								)}
							/>
						)}
					</NavLink> */}

					<div className="mx-4 mb-3 border-b-2 border-highlight-dark 4xl:mb-4" />

					{/* <NavLink to="streetwear" onClick={handleClick} className="opacity-30"> */}
					{/* {({ isActive }) => ( */}
					<ProjectsContentBox
						// boxClass={isActive ? 'bg-highlight-dark' : ''}
						boxClass="opacity-30 cursor-auto"
						name={'Street-Wear Designs'}
						// description={'2022-present'}
						description={'preview coming soon'}
						iconName="accessibility"
						innerBoxClass={cn(
							lightGreenGradient,
							// isActive ? 'bg-light-blue-radial-gradient' :
							'text-highlight group-hover:text-foreground',
						)}
					/>
					{/* )} */}
					{/* </NavLink> */}

					{/* <NavLink to="nft-collection" onClick={handleClick} className="opacity-30">
						{({ isActive }) => ( */}
					<ProjectsContentBox
						// boxClass={isActive ? 'bg-highlight-dark' : ''}
						boxClass="opacity-30 cursor-auto"
						name={'NFT Collection (unreleased)'}
						// description={'2022-present'}
						description={'preview coming soon'}
						iconName="rocket"
						innerBoxClass={cn(
							lightGreenGradient,
							// isActive ? 'bg-light-blue-radial-gradient' :
							'text-highlight group-hover:text-foreground',
						)}
					/>
					{/* )} */}
					{/* </NavLink> */}

					{/* <NavLink to="web3-nft-game" onClick={handleClick} className="opacity-30">
						{({ isActive }) => ( */}
					<ProjectsContentBox
						// boxClass={isActive ? 'bg-highlight-dark' : ''}
						boxClass="opacity-30 cursor-auto"
						name={'Web3 NFT Online Game'}
						// description={'2023-present'}
						description={'preview coming soon'}
						iconName="mix"
						innerBoxClass={cn(
							lightGreenGradient,
							// isActive ? 'bg-light-blue-radial-gradient' :
							'text-highlight group-hover:text-foreground',
						)}
					/>
					{/*	)}
					</NavLink> */}
				</div>
			</div>
		</div>
	)
}

function ProjectsContentBox({
	name,
	description,
	boxClass,
	innerBoxClass,
	imgSrc,
	iconName,
}: {
	name: string
	description: string
	boxClass?: string
	innerBoxClass?: string
	imgSrc?: string
	iconName?: IconName
}) {
	return (
		<div className={cn(purpleBoxInnerContentBox40, boxClass, 'group')}>
			<div
				className={cn(
					boxInnerContentBoxInnerBox,
					innerBoxClass,
					'flex items-center justify-center transition-colors md:group-hover:bg-light-blue-radial-gradient',
				)}
			>
				{!iconName && !!imgSrc && imgSrc.length && (
					<img src={imgSrc} alt="" className="max-w-2/3 rounded-md" />
				)}
				{!!iconName && iconName.length && (
					<Icon name={iconName} size="xl" className="duration-200" />
				)}
			</div>
			<div className={contentRouteSelectorContentBoxes}>
				<p className={innerContentBoxTexts}>{name}</p>
				<p className={innerContentBoxTexts}>{description}</p>
			</div>
		</div>
	)
}

export const meta: MetaFunction = () => [{ title: 'Wochlife - Projects' }]
