import * as React from 'react'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router'

import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'

import { parse as parseQueryString } from 'querystring'
import { ReactHeight } from 'react-height'

import { createBrowserHistory } from 'history'
import { rootReducer, RootState } from '../reducers'
import Header from './Header'

import NotFound from '../components/NotFound'
import AcceleratorProgramPage from '../pages/AcceleratorProgramPage'
import AppStorePage from '../pages/AppStorepage'
import BusinessNeeds from '../pages/BusinessNeeds'
import BusinessNeedsCreatorView from '../pages/BusinessNeedsCreatorView'
import BusinessNeedsPublicUser from '../pages/BusinessNeedsPublicUser'
import CommunityPage from '../pages/CommunityPage'
import ContestantLanding from '../pages/ContestantLanding'
import ContestDetail from '../pages/ContestDetail'
import Contests from '../pages/Contests'
import Contracts from '../pages/Contracts'
import CreateExpertise from '../pages/CreateExpertise'
import CreatorDesk from '../pages/CreatorDesk'
import CreatorLanding from '../pages/CreatorLanding'
import Dashboard from '../pages/Dashboard'
import EmailSetting from '../pages/EmailSetting'
import EventDetail from '../pages/EventDetail'
import EventPage from '../pages/EventPage'
import ExpertDesk from '../pages/ExpertDesk'
import ExpertiseDetail from '../pages/ExpertiseDetail'
import ExpertLanding from '../pages/ExpertLanding'
import ExpertPackages from '../pages/ExpertMarketplace'
import GrabAShare from '../pages/GrabAShare'
import Homepage from '../pages/Homepage'
import MembershipPage from '../pages/MembershipPage'
// import Homepage1 from '../pages/Homepage1'
import InviteContestant from '../pages/InviteContestant'
import InviteExpert from '../pages/InviteExpert'
import InviteJudge from '../pages/InviteJudge'
import InviteObserver from '../pages/InviteObserver'
import JudgeLanding from '../pages/JudgeLanding'
import LeanCanvas from '../pages/LeanCanvas'
import LinkedInLoginPlaceholder from '../pages/LinkedInLoginPlaceholder'
import Messages from '../pages/Messages'
import MyDesk from '../pages/MyDesk'
import MyProfile from '../pages/MyProfile'
import Page from '../pages/Page'
import ProductDefinition from '../pages/ProductDefinition'
import ProductLauncherPage from '../pages/ProductLauncherPage'
import ProjectDetail from '../pages/ProjectDetail'
import ProjectSetting from '../pages/ProjectSetting'
import PublicProfile from '../pages/PublicProfile'
import RequestInvestorAccess from '../pages/RequestInvestorAccess'
import ResetPassword from '../pages/ResetPassword'
import Signin from '../pages/Signin'
import Signup from '../pages/Signup'
import App from './App'
import Footer from './Footer'
import Sidebar from './Sidebar'

// import MessagePopup from '../components/MessagePopup'
// import UserProfile from '../pages/PublicProfile'

const history = createBrowserHistory()
const middleware = [thunk, routerMiddleware(history)]

history.listen(() => {
	// Scroll to the top of the page when ever the route has changed
	window.scrollTo(0, 0)
	document.body.classList.remove('open-menu-overlay')
})

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
	combineReducers<RootState>({
		...rootReducer
		// router: routerReducer
	}),
	applyMiddleware(...middleware)
)

const PrivateRoute = ({redirectPath, component: Component, ...rest}: any) => (
	<Route
		{...rest}
		render={props => {
			if (window.localStorage.fundator_token) {
				return <Component {...props} />
			} else {
				props.history.push(redirectPath || '/signin?redirect=' + rest.path)
				return null
			}
		}}
	/>
)

const PublicRoute = ({redirectPath, component: Component, ...rest}: any) => (
	<Route
		{...rest}
		render={props => {
			if (!window.localStorage.fundator_token) {
				return <Component {...props} />
			} else {
				props.history.push(redirectPath || '/profile')
				return null
			}
		}}
	/>
)

const RegularRoute = ({component: Component, ...rest}: any) => (
	<Route {...rest} render={props => <Component {...props} />}/>
)

export interface RootContainerState {
	footerHeight: number
	isIFrame: boolean
}

export default class Root extends React.Component<{}, RootContainerState> {
	public constructor(props: any) {
		super(props)
		
		const params = parseQueryString(window.location.search.replace('?', ''))
		
		this.state = {
			footerHeight: 0,
			isIFrame:
				typeof params.iframe !== 'undefined' ||
				window.location.href.indexOf('/api/v1/authenticate/linkedin') !== -1
		}
	}
	
	public render() {
		return (
			<Provider store={store}>
				<App>
					<ConnectedRouter history={history}>
						<div
							className={this.state.isIFrame ? 'is-iframe' : ''}
							style={{
								paddingBottom: this.state.footerHeight,
								position: 'relative'
							}}>
							{!this.state.isIFrame && <Header/>}
							<Switch>
								<RegularRoute exact path="/" component={Homepage}/>
								<RegularRoute exact path="/member-ship" component={MembershipPage}/>
								<RegularRoute path="/community" component={CommunityPage}/>
								<RegularRoute exact path="/accelerator-program" component={AcceleratorProgramPage}/>
								<RegularRoute
									exact
									path="/product-launcher"
									component={ProductLauncherPage}
								/>
								<PrivateRoute exact path="/my-desk" component={MyDesk}/>
								<PrivateRoute
									exact
									path="/creator-desk"
									component={CreatorDesk}
								/>
								<PrivateRoute
									exact
									path="/expert-desk"
									component={ExpertDesk}
								/>
								<PrivateRoute
									path="/projects/:shortId/:slug"
									component={ProjectDetail}
								/>
								<PrivateRoute
									exact
									path="/expertise/:shortId/edit"
									component={CreateExpertise}
								/>
								<RegularRoute
									path="/expertise/:shortId/:slug/:projectId?"
									component={ExpertiseDetail}
								/>
								<RegularRoute
									path="/expert-marketplace/:slug?/:location?/:budget?"
									component={ExpertPackages}
								/>
								<RegularRoute
									path="/business-needs/:slug?"
									component={BusinessNeeds}
								/>
								<RegularRoute exact path="/contests" component={Contests}/>
								<RegularRoute
									path="/contests/:shortId/:slug?"
									component={ContestDetail}
								/>
								<PrivateRoute
									path="/grab-a-share"
									component={GrabAShare}
									redirectPath="/request-investor-access"
								/>
								<RegularRoute path="/signin" component={Signin}/>
								<RegularRoute path="/signup/:role?" component={Signup}/>
								<RegularRoute
									path="/become-a-creator"
									component={CreatorLanding}
								/>
								<RegularRoute
									path="/become-an-expert"
									component={ExpertLanding}
								/>
								<RegularRoute
									path="/become-a-contestant"
									component={ContestantLanding}
								/>
								<RegularRoute path="/become-a-judge" component={JudgeLanding}/>
								<RegularRoute exact path="/events" component={EventPage}/>
								<RegularRoute
									path="/events/:shortId/:slug?"
									component={EventDetail}
								/>
								<RegularRoute
									path="/observer-invitation/:invitationCode"
									component={InviteObserver}
								/>
								<RegularRoute
									path="/contestant-invitation/:invitationCode"
									component={InviteContestant}
								/>
								<RegularRoute
									path="/judge-invitation/:invitationCode"
									component={InviteJudge}
								/>
								<RegularRoute
									path="/expert-invitation/:invitationCode"
									component={InviteExpert}
								/>
								<PrivateRoute exact path="/profile" component={MyProfile}/>
								<RegularRoute
									path="/profile/:id/:slug?"
									component={PublicProfile}
								/>
								<RegularRoute
									exact
									path="/api/v1/authenticate/linkedin"
									component={LinkedInLoginPlaceholder}
								/>
								<RegularRoute path="/get-our-app" component={AppStorePage}/>
								<RegularRoute
									path="/reset-password"
									component={ResetPassword}
								/>
								<RegularRoute
									path="/request-investor-access"
									component={RequestInvestorAccess}
								/>
								<RegularRoute
									path="/email-settings/:emailCode/:accessCode"
									component={EmailSetting}
								/>
								<RegularRoute
									path="/project-setting"
									component={ProjectSetting} />
								
								<RegularRoute path="/sidebar" component={Sidebar}/>
								<RegularRoute path="/messages" component={Messages}/>
								<RegularRoute path="/contracts" component={Contracts}/>
								<RegularRoute path="/dashboard" component={Dashboard}/>
								<RegularRoute
									path="/buisness-needs-creator-view"
									component={BusinessNeedsCreatorView}
								/>
								<RegularRoute
									path="/buisness-needs-public-user"
									component={BusinessNeedsPublicUser}
								/>
								<RegularRoute path="/lean-canvas" component={LeanCanvas}/>
								<RegularRoute
									path="/product-definition"
									component={ProductDefinition}
								/>
								
								<PrivateRoute exact path="/desk" component={MyDesk}/>
								<PrivateRoute exact path="/desk/:shortId" component={Dashboard}/>
								<PrivateRoute path="/desk/:shortId/settings" component={ProjectSetting}/>
								<PrivateRoute path="/desk/:shortId/messages" component={Messages}/>
								<PrivateRoute path="/desk/:shortId/contracts" component={Contracts}/>
								<PrivateRoute path="/desk/:shortId/lean-canvas" component={LeanCanvas}/>
								<PrivateRoute path="/desk/:shortId/product-definition" component={ProductDefinition}/>
								
								<RegularRoute path="/buisness-needs-creator-view" component={BusinessNeedsCreatorView}/>
								<RegularRoute path="/buisness-needs-public-user" component={BusinessNeedsPublicUser}/>
								<RegularRoute path="/:slug" component={Page}/>
								<RegularRoute component={NotFound}/>
							</Switch>
							{!this.state.isIFrame && (
								<ReactHeight
									onHeightReady={(footerHeight: number) => {
										this.setState({footerHeight})
									}}
									className="footer__wrap">
									<Footer/>
								</ReactHeight>
							)}
						</div>
					</ConnectedRouter>
				</App>
			</Provider>
		)
	}
}
