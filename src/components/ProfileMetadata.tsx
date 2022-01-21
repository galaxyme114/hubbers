import * as moment from 'moment'
import * as React from 'react'

import Input from './Input'
import UserThumbnailUpload from './UserThumbnailUpload'

import { InputType } from '../constants/enums'
import { ProfileRecord } from '../constants/models'
import Icon from './Icon'

export interface ProfileMetadataProps {
	profile: ProfileRecord
	isProfilePristine: boolean
	onEditProfile: any
	onSave: any
}

export interface ProfileMetadataState {
	isEditing: boolean
	isSaving: boolean
}

export default class ProfileMetadata extends React.Component<ProfileMetadataProps, ProfileMetadataState> {
	public constructor(props: ProfileMetadataProps) {
		super(props)
		
		this.state = {
			isEditing: false,
			isSaving: false
		}
	}
	
	public componentWillReceiveProps(nextProps: ProfileMetadataProps) {
		if (this.state.isSaving && nextProps.isProfilePristine) {
			this.setState({isSaving: false})
		}
	}
	
	public render() {
		const { profile, onSave, onEditProfile, isProfilePristine } = this.props
		const { isEditing, isSaving } = this.state
		
		return (
			<div className="profile-metadata">
				<div className="container">
					<div className="profile-metadata__thumbnail">
						<UserThumbnailUpload
							autoUpload={true}
							thumbnailImageUrl={profile.thumbnailImageUrl}
							onUpload={(imageUrl: string) => { onEditProfile('thumbnailImageUrl', imageUrl, true) }} />
					</div>
					<div className="profile-metadata__details">
						{
							!isEditing && (
								<div>
									<div className="profile-metadata__details__section">
										<div className="profile-metadata__details__section__field">
											{ profile.fullName ? profile.fullName : (<span className="hint">Enter your name</span>) }
										</div>
										<div className="profile-metadata__details__section__field">
											{ profile.headline ? profile.headline : (<span className="hint">Add your position</span>) }
										</div>
										<div className="profile-metadata__details__section__field">
											{profile.bio ? profile.bio : (<span className="hint">Enter your bio</span>)}
										</div>
									</div>
									<div className="profile-metadata__details__section">
										<div className="profile-metadata__details__section__field">
											{profile.email}
										</div>
										{/*<div className="social-links">*/}
										{/*<LinkableSocial name="linkedin" linked={profile.linkedin !== null}/>*/}
										{/*<LinkableSocial name="facebook" linked={profile.facebook !== null}/>*/}
										{/*<LinkableSocial name="twitter" linked={profile.twitter !== null}/>*/}
										{/*</div>*/}
									</div>
								</div>
							)
						}
						{
							isEditing && (
								<form onSubmit={() => {
									onSave()
								}}>
									<div className="profile-metadata__details__section">
										<Input
											name="name" placeholder="Your first name" value={profile.name} type={InputType.TEXT}
											onChange={(v: string) => {
												onEditProfile('name', v)
											}}/>
										<Input
											name="position" placeholder="Your position" value={profile.headline} type={InputType.TEXT}
											onChange={(v: string) => { onEditProfile('position', v) }}/>
										<Input
											name="bio" placeholder="Your bio" value={profile.bio} type={InputType.TEXTAREA}
											onChange={(v: string) => {
												onEditProfile('bio', v)
											}}/>
									</div>
									<div className="profile-metadata__details__section">
										<Input
											name="last_name" placeholder="Your last name" value={profile.lastName} type={InputType.TEXT}
											onChange={(v: string) => { onEditProfile('last_name', v) }}/>
										{/*<Input*/}
											{/*name="workingTime"*/}
											{/*value={profile.contact_time}*/}
											{/*type={InputType.SELECT}*/}
											{/*placeholder="Preferred Contact Time"*/}
											{/*options={contactTimes}*/}
											{/*multi={false}*/}
											{/*simpleValue={true}*/}
											{/*onChange={(v: any) => { onEditProfile('contact_time', v) }}/>*/}
										{/*<Input*/}
											{/*name="nationality"*/}
											{/*value={profile.nationality}*/}
											{/*type={InputType.SELECT}*/}
											{/*placeholder="Nationality"*/}
											{/*options={nationalityCountries}*/}
											{/*multi={false}*/}
											{/*simpleValue={true}*/}
											{/*onChange={(v: any) => { onEditProfile('country_origin', v) }}/>*/}
										{/*<Input*/}
											{/*name="address" placeholder="Your address" value={profile.address} type={InputType.TEXT}*/}
											{/*onChange={(v: string) => { onEditProfile('address', v) }}/>*/}
										{/*<div className="social-links">*/}
										{/*<LinkableSocial name="linkedin" linked={profile.linkedin !== null}/>*/}
										{/*<LinkableSocial name="facebook" linked={profile.facebook !== null}/>*/}
										{/*<LinkableSocial name="twitter" linked={profile.twitter !== null}/>*/}
										{/*</div>*/}
									</div>
								</form>
							)
						}
					</div>
					<div className="profile-metadata__save">
						<button
							className="btn btn-save"
							disabled={isProfilePristine || isSaving}
							onClick={() => {
								onSave()
								this.setState({isEditing: false, isSaving: true})
							}}>{isSaving ? 'Saving ...' : 'Save Changes'}</button>
						<time className="profile-metadata__save__time">
							Last Saved on {moment(profile.updatedAt).format('HH:mm DD MMM YY')}
						</time>
						{
							!isEditing && (
								<a onClick={() => {
									this.setState({isEditing: true})
								}}><Icon name="edit"/> Edit Profile</a>
							)
						}
					</div>
				</div>
			</div>
		)
	}
}