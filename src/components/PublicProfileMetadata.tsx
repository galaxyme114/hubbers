import * as moment from 'moment'
import * as React from 'react'

import Input from './Input'
import UserThumbnailUpload from './UserThumbnailUpload'

import { InputType } from '../constants/enums'
import { PublicProfileRecord } from '../constants/models'
import Icon from './Icon'
import UserFollow from '../containers/UserFollow'

export interface PublicProfileMetadataProps {
	profile: PublicProfileRecord
	authenticate: any
	isProfilePristine: boolean
	onEditProfile: any
	onSave: any
}

export interface PublicProfileMetadataState {
	isEditing: boolean
	isSaving: boolean
}

export default class PublicProfileMetadata extends React.Component<PublicProfileMetadataProps, PublicProfileMetadataState> {
	public constructor(props: PublicProfileMetadataProps) {
		super(props)
		
		this.state = {
			isEditing: false,
			isSaving: false
		}
	}
	
	public componentWillReceiveProps(nextProps: PublicProfileMetadataProps) {
		if (this.state.isSaving && nextProps.isProfilePristine) {
			this.setState({isSaving: false})
		}
	}
	
	public render() {
		const { profile, onSave, onEditProfile, isProfilePristine, authenticate } = this.props
        const { isEditing, isSaving } = this.state
        
		return (
            <div className="profile-metadata">
                <div className="container">
                    {
                        profile &&
                        <div className="profile-metadata__box">
                            {/* user authenticate check */}
                            {
                                (authenticate && profile) && (authenticate._id == profile._id)  && isEditing === false?
                                    <a onClick={() => {
                                        this.setState({isEditing: true})
                                    }} className="edit-icon"><Icon name="edit" /> Edit Profile</a>

                                :null
                            }
                            {
                                isEditing === true ?
                                    <div className="change-btn-updaate">
                                        {/* <button className="btn-updaate" onClick = {() => {this.saveProfile()}}>Save Changes</button> */}
                                            <button
                                                className="btn btn-updaate"
                                                disabled={isProfilePristine || isSaving}
                                                onClick={() => {
                                                    onSave()
                                                    this.setState({isEditing: false, isSaving: true})
                                                }}>{isSaving ? 'Saving ...' : 'Save Changes'}</button>
                                    </div>	
                                                                                    
                                :null
                            }
                            <div className="profile-metadata__box_inner">
                                <div className="profile-metadata__thumbnail">
                                    {
                                        isEditing === true ?
                                            <UserThumbnailUpload
                                            autoUpload={true}
                                            thumbnailImageUrl={profile.thumbnailImageUrl}
                                            onUpload={(imageUrl: string) => { onEditProfile('thumbnailImageUrl', imageUrl) }} />												
                                        :
                                            <div className="user-thumbnail" style={{ backgroundImage: 'url(' + profile.thumbnailImageUrl + ')'}}></div>
                                    }
                                    {
                                        (authenticate && profile) && (authenticate._id == profile._id) ?
                                        <div></div>:
                                        <div className="follow-btn">
                                            <UserFollow targetId={profile._id}/>
                                        </div>
                                    }
                                </div>
                                <div className="profile-metadata__details">
                                    <div>
                                        <div className="profile-metadata__details__section">
                                            <div className="profile-metadata__details__section__name">
                                                
                                                {
                                                    isEditing === true ?
                                                    <div>
                                                        {/* <div className = "profile-metadata__details__section_name_box">
                                                            <Input
                                                            name="name" placeholder="Your first name" value={profile.name}type={InputType.TEXT} 
                                                            onChange={(value: any) => {
                                                                onEditProfile('name', value)
                                                            }} />
                                                        </div> */}
                                                        <div className = "profile-metadata__details__section_name_box">
                                                            <Input
                                                            name="last_name" placeholder="Your last name" value={profile.name} type={InputType.TEXT}
                                                            onChange={(value: any) => { onEditProfile('name', value) }}/>
                                                        </div>
                                                    </div>

                                                    :
                                                    <div>
                                                        {profile.name}
                                                    </div>
                                                }
                                            </div>
                                            
                                            {/* <div className="profile-metadata__details__section__position">
                                                {
                                                    isEditing === true ?
                                                        <div className = "profile-metadata__details__section_name_box">
                                                            <Input
                                                            name="position" placeholder="Your position" value={profile.headline} type={InputType.TEXT}
                                                            onChange={(value: any) => {
                                                                onEditProfile('position', value)}}/>
                                                        </div>
                                                    :
                                                        <div>
                                                            creator
                                                        </div>
                                                }
                                                
                                            </div> */}
                                            <div className="profile-metadata__details__section__location">
                                                <div className="profile-metadata__details__section__location-location">
                                                    <div className="title">Location</div>
                                                    <div className="name">Germany</div>
                                                </div>
                                                <div className="profile-metadata__details__section__location-member">
                                                    <div className="title">Member since</div>
                                                    <div className="name">Burlin Community</div>
                                                </div>
                                                <div className="profile-metadata__details__section__location-network">
                                                    <div className="title">Networks</div>
                                                    <div className="name">21 Contacts</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="profile-metadata__details__section__member">
                                            <div>Member of 1 Community in Berlin</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="profile-metadata__box-bio">
                                <div className="title">Bio:</div>
                                {
                                    isEditing === true ? 
                                        <Input
                                        name="bio" placeholder="Your bio" value={profile.bio} type={InputType.TEXTAREA}
                                        onChange={(value: any) => {
                                            onEditProfile('bio', value)}}/>
                                    :											
                                        <div className="description">
                                            {profile.bio}
                                        </div>
                                }
                            </div>
                        </div>
                    }
                </div>
            </div>
		)
	}
}