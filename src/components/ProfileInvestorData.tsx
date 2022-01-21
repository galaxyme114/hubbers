import * as React from 'react'
import { ProfileRecord } from '../constants/models'
import Input from './Input'
import { InputType } from '../constants/enums'
import { investmentGoals } from '../constants/selectOptions'

export interface ProfileInvestorDataProps {
	profile: ProfileRecord
	onEditProfile: any
}

export interface ProfileInvestorDataState {
}

export default class ProfileInvestorData
	extends React.Component<ProfileInvestorDataProps, ProfileInvestorDataState> {
	public constructor(props: ProfileInvestorDataProps) {
		super(props)
		
		this.state = {}
	}
	
	public render() {
		const { onEditProfile } = this.props
		const investorData = {
			investment_budget: 0,
			investment_goal: null,
			investment_reason: ''
		} as any

		return (
			<div>
				<div className="profile-role-details__half">
					<Input
						name="investmentBudget"
						value={investorData.investment_budget}
						type={InputType.NUMBER}
						label="Amount to Invest"
						prefix="USD"
						onChange={(v: any) => {
							onEditProfile('investment_budget', v)
						}}/>
					
					<Input
						name="investmentGoal"
						value={investorData.investment_goal}
						type={InputType.SELECT}
						multi={false}
						label="Your main goal for investing in innovative projects?"
						placeholder="Select an investment goal"
						options={investmentGoals}
						simpleValue={true}
						onChange={(v: any) => {
							onEditProfile('investment_goal', v)
						}}/>
				</div>
				<div className="profile-role-details__half">
					<Input
						name="investmentReason"
						value={investorData.investment_reason}
						type={InputType.TEXTAREA}
						label="Your reason to invest"
						placeholder="Enter your reason to invest"
						onChange={(v: any) => {
							onEditProfile('investment_reason', v)
						}}/>
				</div>
			</div>
		)
	}
}