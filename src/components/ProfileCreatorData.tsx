import * as React from 'react'
import { InputType } from '../constants/enums'
import { ProfileRecord } from '../constants/models'
import { profileInnovationCategories, profileProductCategories } from '../constants/selectOptions'
import Input from './Input'

export interface ProfileCreatorDataProps {
	profile: ProfileRecord
	onEditProfile: any
}

export interface ProfileCreatorDataState {
}

export default class ProfileCreatorData
	extends React.Component<ProfileCreatorDataProps, ProfileCreatorDataState> {
	public constructor(props: ProfileCreatorDataProps) {
		super(props)
		
		this.state = {}
	}
	
	public render() {
		const {profile, onEditProfile} = this.props
		
		return (
			<div>
				<div className="profile-role-details__half">
					<Input
						name="productCategories"
						value={profile.productCategories}
						type={InputType.SELECT}
						label="Product Categories"
						placeholder="Select a product category"
						options={profileProductCategories}
						multi={true}
						onChange={(v: any) => { onEditProfile('productCategories', v) }}/>
				</div>
				<div className="profile-role-details__half">
					<Input
						name="innovationCategories"
						value={profile.innovationCategories}
						type={InputType.SELECT}
						label="Innovation Categories"
						placeholder="Select an innovation category"
						options={profileInnovationCategories}
						multi={true}
						simpleValue={true}
						onChange={(v: any) => { onEditProfile('innovationCategories', v) }}/>
				</div>
			</div>
		)
	}
}