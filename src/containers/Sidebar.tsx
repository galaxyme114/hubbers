import * as React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { RootState } from '../reducers/index'

interface SidebarProps {
	sideBar: boolean
	toggleSidebar: () => void
	toggleModules: () => void
}

interface SidebarState {
	displayMenu: boolean
	showDropdown: boolean
}

class Sidebar extends React.Component<SidebarProps, SidebarState> {
	constructor(props: SidebarProps) {
		super(props)
		this.state = {
			displayMenu: false,
			showDropdown: true
		}
	}
	
	public showDropdownMenu = (event: any) => {
		event.preventDefault()
		this.setState({displayMenu: true}, () => {
			document.addEventListener('click', this.hideDropdownMenu)
		})
	}
	
	public hideDropdownMenu = () => {
		this.setState({displayMenu: false}, () => {
			document.removeEventListener('click', this.hideDropdownMenu)
		})
	}
	
	public showDropdown = () => {
		this.setState({
			showDropdown: !this.state.showDropdown
		})
	}
	
	public render() {
		return (
			<div className={'sidebar-box-left' + (this.props.sideBar ? ' active' : '')}>
				<img
					src={`/images/circle-arrow-${(this.props.sideBar ? 'left' : 'right')}.png`}
					className="sidebar_toggle_btn"
					alt="arrow icon"
					onClick={this.props.toggleSidebar}
				/>
				<div className="sidebar-box-left-inner">
					<div className="sidebar-box">
						<div className="list-box-slider">
							Switch Project
							<span className="active">Full name of the selected</span>
						</div>
						<hr className="divider"/>
						<div className="list-box">
							<ul>
								<li>
									<img src="/images/sidebar/dash.png" alt="sidebar img"/>
									<NavLink to={'/desk'} activeClassName="active">
										Dashboard
									</NavLink>
								</li>
								<li>
									<img src="/images/sidebar/assessment.png" alt="sidebar img"/>
									<NavLink to={'/desk'}>
										Assessment
										<span className="badge">75%</span>
									</NavLink>
								</li>
								<li className="posi-relative" onClick={this.showDropdownMenu}>
									<img src="/images/sidebar/expertise.png" alt="sidebar img" />
									<NavLink to={'/desk'}>
										Expertise
									</NavLink>
									<span className="badge">2</span>
									{this.state.displayMenu ? (
										<img
											src="/images/sidebar/up.png"
											className="down-arrow-img"
											alt="sidebar img"
										/>
									) : (
										<img
											src="/images/sidebar/down.png"
											className="down-arrow-img"
											alt="sidebar img"
										/>
									)}
									{this.state.displayMenu && (
										<ul className="sub-list">
											<li>
												<NavLink to={'/'} className="active">
													Ongoing
												</NavLink>
												<span className="notification-icon">1</span>
											</li>
											<li>
												<NavLink to={'/'}>Waiting Proposals</NavLink>
												<span className="notification-icon">1</span>
											</li>
											<li>
												<NavLink to={'/'}>Completed</NavLink>
											</li>
											<li>
												<button className="btn-add-new">
													<img src="/images/sidebar/plus.png" className=""/>{' '}
													add new
												</button>
											</li>
										</ul>
									)}
								</li>
								{/*<li className="posi-relative">*/}
									{/*<img src="/images/sidebar/report.png" alt="sidebar img" />*/}
									{/*<NavLink to={'/desk/reports'}>Reports</NavLink>*/}
									{/*<img*/}
										{/*src="/images/sidebar/down.png"*/}
										{/*className="down-arrow-img"*/}
										{/*alt="sidebar img"*/}
									{/*/>*/}
								{/*</li>*/}
								<li>
									<img src="/images/sidebar/cvdsf.png" alt="sidebar img" />
									<NavLink to={'/desk/contracts'}>Contacts</NavLink>
								</li>
								<li>
									<img src="/images/sidebar/message.png" alt="sidebar img" />
									<NavLink to={'/desk/messages'}>Messages </NavLink>
									<span className="badge">20</span>
								</li>
								<li>
									<img src="/images/sidebar/setting.png" alt="sidebar img" />
									<NavLink to={'/desk/settings'}>Project Settings</NavLink>
								</li>
								<li>
									<img
										src="/images/sidebar/lean-canvas.png"
										alt="sidebar img"
									/>
									<NavLink to={'/desk/lean-canvas'}>Lean Canvas</NavLink>
								</li>
								<li>
									<img
										src="/images/sidebar/product-definition.png"
										alt="sidebar img"
									/>
									<NavLink to={'/desk/product-definition'}>
										Product Defination
									</NavLink>
								</li>
								<li className="modules_link">
									<div className="modules_link__inner">
										<div className="modules_link__inner__left">
											<img
												src="/images/sidebar/modules_icon.png"
												alt="sidebar img"
											/>
											<NavLink to={'#'}>Modules</NavLink>
										</div>
										<button
											className="modules_link__inner__right"
											onClick={this.props.toggleModules}
										>
											+
										</button>
									</div>
									<ul>
										<li>
											<img src="/images/sidebar/lean-canvas.png" alt="sidebar img"/>
											<NavLink to={'/desk/lean-canvas'}>Lean Canvas</NavLink>
										</li>
										<li>
											<img src="/images/sidebar/product-definition.png" alt="sidebar img"/>
											<NavLink to={'/desk/product-definition'}>Product Definition</NavLink>
										</li>
									</ul>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state: RootState) => ({})

export default connect(
	mapStateToProps,
	{}
)(Sidebar)
