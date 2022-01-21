import * as React from 'react'

import { ProfileRecord } from '../constants/models'
import { doGetExpertiseCategory, doGetSkills } from '../actions/categories'
import { InputType } from '../constants/enums'
import Input from './Input'

export interface ProfileExpertDataProps {
	profile: ProfileRecord
	onEditProfile: any
}

export interface ProfileExpertDataState {
}

export default class ProfileExpertData
	extends React.Component<ProfileExpertDataProps, ProfileExpertDataState> {
	public constructor(props: ProfileExpertDataProps) {
		super(props)
		this.state = {}
	}
	
	public render() {
		const {profile, onEditProfile} = this.props
		const skillsList = profile.skills || []
		const expertiseCategoryList = profile.expertiseCategories || []

		return (
			<div>
				<div className="profile-role-details__half">
					<div className="expert-skills">
						<Input
							name="skills"
							value={skillsList}
							type={InputType.ASYNC_SELECT}
							label="Your Skills"
							placeholder="Select your skills"
							options={doGetSkills}
							multi={true}
							onChange={(v: any) => {
								onEditProfile('skills', v)
							}}/>
					</div>
				</div>
				<div className="profile-role-details__half">
					<Input
						name="expertiseCategories"
						value={expertiseCategoryList}
						type={InputType.ASYNC_SELECT}
						label="Expertise category you're interested in"
						placeholder="Select expertise category"
						options={doGetExpertiseCategory}
						multi={true}
						onChange={(v: any) => { onEditProfile('expertiseCategories', v) }}/>
				</div>
			</div>
		)
	}
}