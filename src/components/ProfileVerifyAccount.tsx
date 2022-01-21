import { parseNumber } from 'libphonenumber-js/custom'
import * as React from 'react'

import Input from './Input'

import { doRequestSMSCode, doVerifySMSCode } from '../actions/profile'
import { InputType } from '../constants/enums'

enum VerificationStatus {
	INPROGRESS = 'INPROGRESS',
	REQUESTED = 'REQUESTED',
	REQUEST_FAILED = 'REQUEST_FAILED',
	VERIFIED = 'VERIFIED',
	VERIFICATION_FAILED = 'VERIFICATION_FAILED'
}

export interface ProfileVerifyAccountProps {
	onVerify: any
}

export interface ProfileVerifyAccountState {
	phone: string
	confirmationCode: string
	countdown: number
	status: VerificationStatus
}

export default class ProfileVerifyAccount
	extends React.Component<ProfileVerifyAccountProps, ProfileVerifyAccountState> {
	private countdownInterval: any = null
	private COUNTDOWN_DURATION: number = 30
	
	public constructor(props: ProfileVerifyAccountProps) {
		super(props)
		
		this.state = {
			phone: '',
			confirmationCode: '',
			countdown: -1,
			status: null
		}
	}
	
	public componentWillUnmount() {
		clearInterval(this.countdownInterval)
	}
	
	public render() {
		const {} = this.props
		const {status, countdown} = this.state
		
		return (
			<div>
				{
					status === VerificationStatus.REQUEST_FAILED && (
						<div className="profile-section__notice profile-section__notice--danger">
							Failed to request the SMS confirmation code, please try again.
						</div>
					)
				}
				{
					status === VerificationStatus.VERIFICATION_FAILED && (
						<div className="profile-section__notice profile-section__notice--danger">
							Failed to verify the SMS confirmation code, please try again.
						</div>
					)
				}
				{
					status === VerificationStatus.VERIFIED && (
						<div className="profile-section__notice profile-section__notice--success">
							Your phone number has been verified!
						</div>
					)
				}
				<Input
					name="phone"
					label="Enter your contact number"
					placeholder=""
					value={this.state.phone}
					type={InputType.PHONE}
					onChange={(phone: any) => {
						this.setState({phone})
					}}/>
				
				<div className="profile-verify-account__sms-confirmation">
					<Input
						name="confirmationCode"
						label="Enter the confirmation code"
						placeholder=""
						value={this.state.confirmationCode}
						type={InputType.TEXT}
						onChange={(confirmationCode: any) => {
							this.setState({confirmationCode})
						}}/>
					
					<button
						className="btn btn-alt"
						disabled={!this.state.phone || countdown >= 0}
						onClick={() => {
							this.requestSMSCode()
						}}>
						{countdown === -1 ? 'Send' : (this.COUNTDOWN_DURATION - countdown) + 's'}
					</button>
				</div>
				
				<button
					className="btn"
					disabled={(!(this.state.confirmationCode && this.state.confirmationCode.length === 6) || !this.state.phone)}
					onClick={() => {
						this.submitSMSCode()
					}}>Verify
				</button>
			</div>
		)
	}
	
	private requestSMSCode() {
		this.countdownInterval = setInterval(() => {
			if (this.state.countdown === this.COUNTDOWN_DURATION) {
				clearInterval(this.countdownInterval)
				this.setState({countdown: -1})
			} else {
				this.setState({countdown: this.state.countdown + 1})
			}
		}, 1000)
		
		doRequestSMSCode(this.state.phone)
			.then(() => {
				this.setState({status: VerificationStatus.REQUESTED})
			}).catch(() => {
			clearInterval(this.countdownInterval)
			this.setState({status: VerificationStatus.REQUEST_FAILED, countdown: -1})
		})
	}
	
	private submitSMSCode() {
		doVerifySMSCode(this.state.phone, this.state.confirmationCode)
			.then(() => {
				this.props.onVerify(this.state.phone)
				
				this.setState({
					status: VerificationStatus.VERIFIED,
					countdown: -1,
					phone: '',
					confirmationCode: ''
				})
			}).catch(() => {
			this.setState({status: VerificationStatus.VERIFICATION_FAILED, countdown: -1})
		})
	}
}