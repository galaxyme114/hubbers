import * as React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router'
import { Link, NavLink } from 'react-router-dom'
import { logoutUser } from '../actions/authenticate'
import Icon from '../components/Icon'
import UserThumbnail from '../components/UserThumbnail'
import { ActionTypeStates } from '../constants/action-types'
import { Currency } from '../constants/enums'
import { RootState } from '../reducers'
import { State as AuthenticateState } from '../reducers/authenticate'
import { getCurrencySymbol, getNumberWithCommas } from '../utils/currency'

interface HeaderProps extends RouteComponentProps<any> {
	authenticateState: AuthenticateState
	logoutUser: any
	
}

interface HeaderStates {
	notificationModal: boolean
	
}

class Header extends React.Component<HeaderProps, HeaderStates> {
	constructor(props: HeaderProps) {
		super(props)
		this.state = {
			notificationModal: null
		}
		
	}
	
	public render() {
		const {authenticateState} = this.props
		const {notificationModal} = this.state
		
		return (
			<div className="header">
				<div className="header-container">
					{/* LOGO */}
					<div className="brand">
						<Link to={'/'}>
							<img
								className="logo"
								srcSet="/images/webp/hubbers-logo.webp"
								src="/images/hubbers-logo.png"
								alt="Hubbers Logo"/>
						</Link>
					</div>
					
					{/* MENU Center */}
					<div className="menu menu--center">
						<div className="menu__nav">
							<NavLink to="/" className="has--submenu">
								Hubbers Tools
								<div className="menu__nav__submenu">
									<NavLink exact to="/product-launcher">Product Launcher</NavLink>
									<NavLink exact to="/expert-marketplace">Marketplace</NavLink>
									<NavLink to="/contests">Product Competition</NavLink>
									<NavLink to="/my-desk">Product Development Tools</NavLink>
								</div>
							</NavLink>
							<NavLink exact to={'/member-ship'}>Membership</NavLink>
							<NavLink exact to={'/community'}>Community</NavLink>
							<a href="https://blog.hubbers.io/">Blog</a>
							{
								(authenticateState.status === ActionTypeStates.SUCCESS && authenticateState.user) && (
									<NavLink exact to={'/my-desk'} className="pull-right">My Desk</NavLink>
								)
							}
						</div>
					</div>
					
					{/* MENU Right */}
					<div className="menu menu--right">
						{
							(authenticateState.status === ActionTypeStates.SUCCESS && authenticateState.user) && (
								<div className="menu__user-account">
									{/*<div className="menu__user-account__expanded-menu">*/}
									{/*<Link to={'/my-desk'}>*/}
									{/*<h4>MY DESK</h4>*/}
									{/*</Link>*/}
									{/*</div>*/}
									{/*<button className="menu-notification" onClick={() => { this.toggleNotification() }}>*/}
									{/*<img src="/assets/images/notifications_icon.png" />*/}
									{/*</button>*/}
									<Link to="/profile">
										<UserThumbnail
											name={authenticateState.user.name}
											thumbnailImageUrl={authenticateState.user.thumbnailImageUrl}/>
									</Link>
									<Link to="/profile">
										<div className="menu__user-account__info">
											<div className="menu__user-account__name">{authenticateState.user.name}</div>
											{/*<div className="menu__user-account__role">{authenticateState.user.role}</div>*/}
										</div>
									</Link>
									{/*<div className="menu__user-account__info">*/}
									{/*<div className="menu__user-account__name">${authenticateState.user.balance || 0}</div>*/}
									{/*<div className="menu__user-account__role">Balance</div>*/}
									{/*</div>*/}
									<Link to={'/grab-a-share'}>
										<div className="menu__user-account__info menu__user-account__info--shares">
											<div className="menu__user-account__name">
												{getCurrencySymbol(Currency.USD)}{getNumberWithCommas(authenticateState.user.assets.totalAssets) || 0}
											</div>
											<div className="menu__user-account__role">Assets</div>
										</div>
									</Link>
									<button className="menu-logout" onClick={() => {
										this.props.logoutUser()
									}}>
										<Icon name="log-out"/>
									</button>
									<button className="menu-toggle" onClick={() => {
										this.toggleMenu()
									}}>
										<Icon name="menu"/>
									</button>
								
								</div>
							)
						}
						{
							(authenticateState.status !== ActionTypeStates.INPROGRESS && !authenticateState.user) && (
								<div className="menu__login">
									<NavLink exact to={'/signin'} className="outline">Sign In</NavLink>
									<NavLink exact to={'/signup'}>Register</NavLink>
									<button className="menu-toggle" onClick={() => this.toggleMenu()}>
										<Icon name="menu"/>
									</button>
								</div>
							)
						}
					</div>
					{
						notificationModal &&
						<div>
							<div className=" notification--overlay" onClick={() => {
								this.toggleNotification()
							}}/>
							<div className="notification_popup_box">
								<div className="notification_popup_inner arrow_box">
									<div className="notification_popup_header">
										<div className="notification_popup_header_title">Notifications</div>
										<Link to={'/notification-settings'} onClick={() => {
											this.toggleNotification()
										}}>
											<div className="notification_setting"><img src="/images/setting_icon.png"/></div>
										</Link>
									</div>
									<div className="notification_popup_content">
										{/*<div className="content_list">*/}
										{/*<div className="content_list_thumbnail" style={{ backgroundImage:*/}
										{/*'url(/assets/images/expertimg.jpg)',*/}
										{/*backgroundPosition: 'center',*/}
										{/*backgroundSize: '100% 100%' }}>*/}
										{/*</div>*/}
										{/*<div className="content_list_content">*/}
										{/*<div className="content_list_content_title">*/}
										{/*We wish to offer you our annual Professional
														membership. You may be interested, that is why I got in touch.*/}
										{/*</div>*/}
										{/*<div className="content_list_content_caption">*/}
										{/*4 months ago*/}
										{/*</div>*/}
										{/*</div>*/}
										{/*</div>*/}
										<div className="notification_popup_content__empty">
											No new notifications!
										</div>
									</div>
								</div>
							</div>
						</div>
					}
					{/* MENU Overlay (mobile) */}
					<div className="menu menu--overlay">
						<div className="menu__nav">
							<NavLink exact to="/product-launcher">Product Launcher</NavLink>
							<NavLink exact to="/expert-marketplace">Marketplace</NavLink>
							<NavLink to="/contests">Product Competition</NavLink>
							<NavLink to="/my-desk">Product Development Tools</NavLink>

							<NavLink exact to={'/member-ship'}>Membership</NavLink>
							<NavLink exact to={'/community'}>Community</NavLink>
							<a href="https://blog.hubbers.io/">Blog</a>
							{
								(authenticateState.status === ActionTypeStates.SUCCESS && authenticateState.user) && (
									<NavLink exact to={'/my-desk'} className="pull-right">My Desk</NavLink>
								)
							}
						</div>
						{
							(authenticateState.status !== ActionTypeStates.INPROGRESS && !authenticateState.user) && (
								<div className="menu__nav">
									<NavLink exact to={'/signin'}>Sign In</NavLink>
									<NavLink exact to={'/signup'}>Register</NavLink>
								</div>
							)
						}
						{
							(authenticateState.status !== ActionTypeStates.INPROGRESS && authenticateState.user) && (
								<div className="menu__nav">
									<a onClick={() => {
										this.props.logoutUser()
									}}>Logout</a>
								</div>
							)
						}
					</div>
				</div>
			</div>
		)
	}
	
	private toggleMenu() {
		if (!document.body.classList.contains('open-menu-overlay')) {
			document.body.classList.add('open-menu-overlay')
		} else {
			document.body.classList.remove('open-menu-overlay')
		}
	}
	
	private toggleNotification() {
		if (this.state.notificationModal === true) {
			this.setState({
				notificationModal: false
			})
		} else {
			this.setState({
				notificationModal: true
			})
			
		}
		
	}
}

const mapStateToProps = (state: RootState) => ({
	authenticateState: state.authenticate
})

export default withRouter(connect(mapStateToProps, {
	logoutUser
})(Header))