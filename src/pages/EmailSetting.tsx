import * as React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'

import { fetchEmailSettings, updateEmailSettings } from '../actions/emailSettings'
import { State as EmailSettingsDataState } from '../reducers/emailSettings'
import { RootState } from '../reducers/index'

import Spinner from '../components/Spinner'
import { ActionTypeStates } from '../constants/action-types'
import { EmailSettingsRecord } from '../constants/models'

interface EmailSettingMatchParams {
	emailCode: string
	accessCode: string
}

interface EmailSettingProps extends RouteComponentProps<EmailSettingMatchParams> {
	state: EmailSettingsDataState
	fetchEmailSettings: any
	updateEmailSettings: any
}

interface EmailSettingState {
	emailSettings: EmailSettingsRecord
}

class EmailSetting extends React.Component<EmailSettingProps, EmailSettingState> {
	public constructor(props: EmailSettingProps) {
		super(props)
		
		this.state = {
			emailSettings: null
		}
	}
	
	public componentDidMount() {
		const {emailCode, accessCode} = this.props.match.params
		
		this.props.fetchEmailSettings(emailCode, accessCode)
	}
	
	public componentWillReceiveProps(nextProps: EmailSettingProps) {
		const {state} = nextProps
		
		if (state.emailSettings) {
			this.setState({emailSettings: state.emailSettings})
		}
	}
	
	public render() {
		const {state} = this.props
		const {emailSettings} = this.state
		
		return (
			<div>
				<Helmet>
					<title>Email Setting | Hubbers - Hub of Makers</title>
				</Helmet>
				<div className="emailsetting-page-heading">
					<div className="container">
						<h1 className="emailsetting-heading__title">Email Settings</h1>
						<p className="emailsetting-heading__caption">Manage your email settings on Hubbers. <br/>
							Pick what types of email you want to recieve and their frequency</p>
						<img src="/images/emailsetting_icon.png" className="setting_img"/>
					</div>
				</div>
				
				<div className="emailsetting-wrap">
					<div className="emailsetting-container">
						<div className="emailsetting-section">
							{
								state.status === ActionTypeStates.INPROGRESS && (
									<div className="page-loading">
										<div>
											<em>Getting your email settings ...</em>
											<Spinner name="three-dots" fadeIn="none"/>
										</div>
									</div>
								)
							}
							{
								state.status === ActionTypeStates.FAILED && (
									<div className="page-loading">
										<div>
											<em>You don't have permission to access this page</em>
										</div>
									</div>
								)
							}
							{
								(state.status === ActionTypeStates.SUCCESS && emailSettings) && (
									<table>
										<tbody>
										<tr>
											<td className="left__section">
												<p className="emailsetting__col8__title">All Emails From Hubbers</p>
												<p className="emailsetting__col8__description">
													We'll email you with updates about new projects, contests, members and your activity on
													the Hubbers website, as well as our weekly members updates.</p>
											</td>
											<td className="right__section">
												<button
													className={'btn ' + (emailSettings.allEmails ? 'activebtn' : 'deactivebtn')}
													onClick={() => {
														this.toggle('allEmails', true)
													}}>On
												</button>
												<button
													className={'btn ' + (!emailSettings.allEmails ? 'activebtn' : 'deactivebtn')}
													onClick={() => {
														this.toggle('allEmails', false)
													}}>Off
												</button>
											</td>
										</tr>
										</tbody>
									</table>
								)
							}
						</div>
					</div>
				</div>
			</div>
		)
	}
	
	private toggle(key: string, value: any) {
		const {emailCode, accessCode} = this.props.match.params
		const emailSettings: any = this.state.emailSettings
		
		emailSettings[key] = value
		
		this.setState({emailSettings})
		this.props.updateEmailSettings(emailCode, accessCode, emailSettings)
	}
}

const mapStateToProps = (state: RootState) => ({
	state: state.emailSettings
})

export default connect(mapStateToProps, {
	fetchEmailSettings,
	updateEmailSettings
})(EmailSetting)