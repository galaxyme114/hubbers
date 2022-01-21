import * as React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'

import { ActionTypeStates } from '../constants/action-types'
import { ProfileRecord } from '../constants/models'

import { fetchProfile, saveProfile } from '../actions/profile'
import { RootState } from '../reducers'
import { State as ProfileDataState } from '../reducers/profile'

import ProfileChangePassword from '../components/ProfileChangePassword'
import ProfileCreatorData from '../components/ProfileCreatorData'
import ProfileExpertData from '../components/ProfileExpertData'
import ProfileInvestorData from '../components/ProfileInvestorData'
import ProfileMetadata from '../components/ProfileMetadata'
import ProfileVerifyAccount from '../components/ProfileVerifyAccount'
import Spinner from '../components/Spinner'

enum QuickLinksView {
	ChangePassword = 0,
	VerifyAccount = 1
}

interface MyProfileProps {
	state: ProfileDataState
	fetchProfile: any
	saveProfile: any
}

interface MyProfileState {
	profile: ProfileRecord
	isProfilePristine: boolean
	quickLinksView: QuickLinksView
}

class MyProfile extends React.Component<MyProfileProps, MyProfileState> {
	public constructor(props: MyProfileProps) {
		super(props)
		
		this.state = {
			profile: null,
			isProfilePristine: true,
			quickLinksView: null
		}
	}
	
	public componentDidMount() {
		this.props.fetchProfile()
	}
	
	public componentWillReceiveProps(nextProps: MyProfileProps) {
		this.setState({profile: nextProps.state.profile, isProfilePristine: true})
	}
	
	public render() {
		const {state} = this.props
		const {profile} = this.state
		console.log(profile);
		return (
			<div className="page-my-profile">
				<Helmet>
					<title>My Profile | Hubbers - Hub of Makers</title>
				</Helmet>
				{
					(state.status === ActionTypeStates.INPROGRESS) && (
						<div className="page-loading">
							<div>
								<em>Loading ...</em>
								<Spinner name="three-dots" fadeIn="none"/>
							</div>
						</div>
					)
				}
				{
					(state.status === ActionTypeStates.SUCCESS && profile) && (
						<div className="profile">
							{/* Metadata */}
							<ProfileMetadata
								profile={profile}
								isProfilePristine={this.state.isProfilePristine}
								onEditProfile={(key: string, value: any, save?: boolean) => {
									this.editProfile(key, value, save)
								}}
								onSave={() => {
									this.saveProfile()
								}}/>
							
							{/* Strength */}
							{/*<div className="profile-strength">*/}
							{/*<div className="container">*/}
							{/*<div className="profile-strength__label">*/}
							{/*Profile Strength: <span className="highlight">Intermediate</span>*/}
							{/*</div>*/}
							{/*<div className="profile-strength__progress">*/}
							{/*<ProgressBar value={20} maxValue={100} withCount={false}/>*/}
							{/*</div>*/}
							{/*</div>*/}
							{/*</div>*/}
							
							{/* Role Details */}
							<div className="profile-role-details">
								<div className="container">
									{/* Quick Links*/}
									{/*<div className="profile-actions">*/}
										{/*<ul className="profile-actions__list">*/}
											{/*<li*/}
												{/*className={this.state.quickLinksView === QuickLinksView.ChangePassword ? 'active' : ''}*/}
												{/*onClick={() => { this.toggleQuickLinks(QuickLinksView.ChangePassword) }}>*/}
												{/*Change Password</li>*/}
											{/*<li*/}
												{/*className={this.state.quickLinksView === QuickLinksView.VerifyAccount ? 'active' : ''}*/}
												{/*onClick={() => { this.toggleQuickLinks(QuickLinksView.VerifyAccount)}}>*/}
												{/*{profile.phoneNumber ? <Icon name="checkmark"/> : ''} Verify Account</li>*/}
										{/*</ul>*/}
									{/*</div>*/}
									{
										this.state.quickLinksView === QuickLinksView.ChangePassword && (
											<div className="profile-role-details__section sub profile-role-details--change-password">
												<div className="profile-role-details__title">Change Password</div>
												<div className="profile-role-details__content">
													<ProfileChangePassword onChange={() => { console.log('password changed') }}/>
												</div>
											</div>
										)
									}
									{
										this.state.quickLinksView === QuickLinksView.VerifyAccount && (
											<div className="profile-role-details__section sub profile-role-details--verify-account">
												<div className="profile-role-details__title">Verify Account</div>
												<div className="profile-role-details__content">
													<ProfileVerifyAccount
														onVerify={(phoneNumber: string) => {
															this.editProfile('phoneNumber', phoneNumber, true)
														}}/>
												</div>
											</div>
										)
									}
									
									{/* Creator */}
									<div className="profile-role-details__section profile-role-details--creator">
										<div className="profile-role-details__title">As a Creator</div>
										<div className="profile-role-details__content">
											<ProfileCreatorData
												profile={this.state.profile}
												onEditProfile={(key: string, value: any) => {
													this.editProfile(key, value)
												}}/>
										</div>
									</div>
									
									{/* Expert */}
									<div className="profile-role-details__section profile-role-details--expert">
										<div className="profile-role-details__title">As an Expert</div>
										<div className="profile-role-details__content">
											<ProfileExpertData
												profile={this.state.profile}
												onEditProfile={(key: string, value: any) => {
													this.editProfile(key, value)
												}}/>
										</div>
									</div>
									
									{/* Investor */}
									{/*<div className="profile-role-details__section profile-role-details--investor">*/}
										{/*<div className="profile-role-details__title">As an Investor</div>*/}
										{/*<div className="profile-role-details__content">*/}
											{/*<ProfileInvestorData*/}
												{/*profile={this.state.profile}*/}
												{/*onEditProfile={(key: string, value: any) => {*/}
													{/*this.editProfileRoleInfo('investor', key, value)*/}
												{/*}}/>*/}
										{/*</div>*/}
									{/*</div>*/}
								</div>
							</div>
						</div>
					)
				}
			</div>
		)
	}
	
	private editProfile(key: string, value: any, save?: boolean) {
		const profile: any = {...this.state.profile}
		profile[key] = value
		
		this.setState({profile, isProfilePristine: false})
		
		if (save) {
			setTimeout(() => {
				this.saveProfile()
			}, 500)
		}
	}
	
	private editProfileRoleInfo(role: string, key: string, value: any) {
		const profile: any = {...this.state.profile}
		
		if (!profile[role]) {
			profile[role] = {}
		}
		profile[role][key] = value
		
		this.setState({profile, isProfilePristine: false})
	}
	
	private saveProfile() {
		console.log("jdjsbfhjsdbhjfsd", this.state.profile)
		this.props.saveProfile(this.state.profile)
	}
	
	private toggleQuickLinks(quickLinksView: QuickLinksView) {
		if (quickLinksView !== this.state.quickLinksView) {
			this.setState({quickLinksView})
		} else {
			this.setState({quickLinksView: null})
		}
	}
}

const mapStateToProps = (state: RootState) => ({
	state: state.profile
})

export default connect(mapStateToProps, {
	fetchProfile,
	saveProfile
})(MyProfile)