import * as React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import Input from '../components/Input'
import { InputType } from '../constants/enums'
import Sidebar from '../containers/Sidebar'
import { RootState } from '../reducers/index'

interface ProjectSettingProps {
}

interface ProjectSettingState {
	textType: boolean
	email: string
	password: string
	lastname: string
	phone: any
	zipcode: any
	commissioncharges: string
	price: any
	newpassword: any
	confirmpassword: any
	sideBar: boolean
	modules: boolean
}

class ProjectSetting extends React.Component<ProjectSettingProps,
	ProjectSettingState> {
	constructor(props: ProjectSettingProps) {
		super(props)
		this.state = {
			textType: false,
			email: '',
			password: '',
			lastname: '',
			phone: '',
			zipcode: '',
			commissioncharges: '',
			price: '',
			newpassword: '',
			confirmpassword: '',
			sideBar: true,
			modules: false
		}
	}
	
	public toggleInputType = () => {
		console.log('working')
		this.setState({
			textType: !this.state.textType
		})
	}
	
	public toggleSidebar = () => {
		this.setState({
			sideBar: !this.state.sideBar
		})
	}
	public toggleModules = () => {
		this.setState({
			modules: !this.state.modules
		})
	}
	
	public render() {
		return (
			<div className="projectSetting_box">
				<Helmet>
					<title>Project Settings</title>
				</Helmet>
				<Sidebar
					sideBar={this.state.sideBar}
					toggleSidebar={this.toggleSidebar}
					toggleModules={this.toggleModules}
				/>
				<div
					className={
						'projectSetting_box_content' +
						(!this.state.sideBar ? ' full-width' : '')
					}
				>
					<div className="projectSetting_box_content_title">
						<h4>Project Settings</h4>
					</div>
					<div className="projectSetting_box_content_row">
						<div className="projectSetting_box_content_row_left">
							<h5 className="projectSetting_box_content_row_left_title">
								Access to the system
							</h5>
							<p className="projectSetting_box_content_row_left_caption">
								do not use simple password, Password should contain minimum 6
								letters, one number and a capital letter.
							</p>
						</div>
						<div className="projectSetting_box_content_row_right">
							<div className="projectSetting_box_content_row_right_inner_row">
								<div className="projectSetting_box_content_row_right_inner_row_left">
									<label htmlFor="email">Email</label>
								</div>
								<div className="projectSetting_box_content_row_right_inner_row_right">
									<Input
										name="email"
										placeholder=""
										value={this.state.email}
										type={InputType.EMAIL}
										onChange={(email: string) => {
											this.setState({email})
										}}
									/>
								</div>
							</div>
							<div className="projectSetting_box_content_row_right_inner_row">
								<div className="projectSetting_box_content_row_right_inner_row_left">
									<label htmlFor="currentPassword">Current Password</label>
								</div>
								<div className="projectSetting_box_content_row_right_inner_row_right">
									<Input
										name="password"
										placeholder=""
										value={this.state.password}
										type={
											this.state.textType ? InputType.TEXT : InputType.PASSWORD
										}
										onChange={(password: string) => {
											this.setState({password})
										}}
									/>
									<img
										src="/images/eyes.png"
										alt="eyes img"
										className="hide-show-password"
										onClick={this.toggleInputType}
									/>
								</div>
							</div>
							<div className="projectSetting_box_content_row_right_inner_row">
								<div className="projectSetting_box_content_row_right_inner_row_left">
									<label htmlFor="newPassword">New Password</label>
								</div>
								<div className="projectSetting_box_content_row_right_inner_row_right">
									<Input
										name="newpassword"
										placeholder=""
										value={this.state.newpassword}
										type={InputType.PASSWORD}
										onChange={(newpassword: string) => {
											this.setState({newpassword})
										}}
									/>
								</div>
							</div>
							<div className="projectSetting_box_content_row_right_inner_row">
								<div className="projectSetting_box_content_row_right_inner_row_left">
									<label htmlFor="confirmPassword">Confirm Password</label>
								</div>
								<div className="projectSetting_box_content_row_right_inner_row_right">
									<Input
										name="confirmpassword"
										placeholder=""
										value={this.state.confirmpassword}
										type={InputType.PASSWORD}
										onChange={(confirmpassword: string) => {
											this.setState({confirmpassword})
										}}
									/>
								</div>
							</div>
							<div className="projectSetting_box_content_row_right_inner_row display-flex">
								<div className="projectSetting_box_content_row_right_inner_row_left"/>
								<div className="projectSetting_box_content_row_right_inner_row_right">
									<button type="button" className="btncancel">
										{' '}
										cancel{' '}
									</button>
									<button type="button" className="btncommn">
										{' '}
										save changes{' '}
									</button>
								</div>
							</div>
						</div>
					</div>
					<div className="projectSetting_box_content_row">
						<div className="projectSetting_box_content_row_left">
							<h5 className="projectSetting_box_content_row_left_title">
								Billing system
							</h5>
							<p className="projectSetting_box_content_row_left_caption">
								Set your billing data payment details.
							</p>
						</div>
						<div className="projectSetting_box_content_row_right">
							<div className="projectSetting_box_content_row_right_inner_row mb-2">
								<div className="projectSetting_box_content_row_right_inner_row_left">
									<div className="billing_heading_title">
										<h6>Billing information</h6>
									</div>
								</div>
								<div className="projectSetting_box_content_row_right_inner_row_right">
									<div className="see_billing_heading_title">
										<h6>See billing history</h6>
									</div>
								</div>
							</div>
							<div className="projectSetting_box_content_row_right_inner_row">
								<div className="projectSetting_box_content_row_right_inner_row_left">
									<label htmlFor="lastname">Name and Lastname</label>
								</div>
								<div className="projectSetting_box_content_row_right_inner_row_right">
									<Input
										name="lastname"
										placeholder=""
										value={this.state.lastname}
										type={InputType.TEXT}
										onChange={(lastname: string) => {
											this.setState({lastname})
										}}
									/>
								</div>
							</div>
							<div className="projectSetting_box_content_row_right_inner_row">
								<div className="projectSetting_box_content_row_right_inner_row_left">
									<label htmlFor="phone">Phone</label>
								</div>
								<div className="projectSetting_box_content_row_right_inner_row_right">
									<Input
										name="phone"
										placeholder=""
										value={this.state.phone}
										type={InputType.TEXT}
										onChange={(phone: string) => {
											this.setState({phone})
										}}
									/>
								</div>
							</div>
							<div className="projectSetting_box_content_row_right_inner_row">
								<div className="projectSetting_box_content_row_right_inner_row_left">
									<label htmlFor="zipCode">Zip Code</label>
								</div>
								<div className="projectSetting_box_content_row_right_inner_row_right">
									<Input
										name="zipcode"
										placeholder=""
										value={this.state.zipcode}
										type={InputType.TEXT}
										onChange={(zipcode: string) => {
											this.setState({zipcode})
										}}
									/>
								</div>
							</div>
							<div className="projectSetting_box_content_row_right_inner_row display-flex">
								<div className="projectSetting_box_content_row_right_inner_row_left"/>
								<div className="projectSetting_box_content_row_right_inner_row_right">
									<button type="button" className="btnchange">
										{' '}
										save changes{' '}
									</button>
								</div>
							</div>
						</div>
					</div>
					<div className="projectSetting_box_content_row">
						<div className="projectSetting_box_content_row_left"/>
						<div className="projectSetting_box_content_row_right">
							<div className="projectSetting_box_content_row_right_inner_row">
								<div className="projectSetting_box_content_row_right_inner_row_left">
									<h5 className="projectSetting_box_content_row_left_title">
										Master card ending ******578
									</h5>
									<label htmlFor="projectSetting_box_content_row_left_phone-title">
										07/20
									</label>
								</div>
								<div className="projectSetting_box_content_row_right_inner_row_right">
									<div className="see_billing_heading_title">
										<button type="button" className="btnchange">
											{' '}
											edit card details{' '}
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="projectSetting_box_content_row">
						<div className="projectSetting_box_content_row_left">
							<h5 className="projectSetting_box_content_row_left_title">
								System
							</h5>
							<p className="projectSetting_box_content_row_left_caption">
								Configure external fees and email that will be used as default
								address for notifications.
							</p>
						</div>
						<div className="projectSetting_box_content_row_right">
							<div className="projectSetting_box_content_row_right_inner_row mb-2">
								<div className="projectSetting_box_content_row_right_inner_row_left">
									<div className="billing_heading_title">
										<h6>General settings</h6>
									</div>
								</div>
								<div className="projectSetting_box_content_row_right_inner_row_right">
									<div className="see_billing_heading_title">
										<h6>See billing history</h6>
									</div>
								</div>
							</div>
							<div className="projectSetting_box_content_row_right_inner_row">
								<div className="projectSetting_box_content_row_right_inner_row_left">
									<label htmlFor="email">Email</label>
								</div>
								<div className="projectSetting_box_content_row_right_inner_row_right">
									<Input
										name="email"
										placeholder=""
										value={this.state.email}
										type={InputType.EMAIL}
										onChange={(email: string) => {
											this.setState({email})
										}}
									/>
								</div>
							</div>
							<div className="projectSetting_box_content_row_right_inner_row">
								<div className="projectSetting_box_content_row_right_inner_row_left">
									<label htmlFor="Commissioncharges">Commission charges</label>
								</div>
								<div className="projectSetting_box_content_row_right_inner_row_right text-left">
									<input
										type="checkbox"
										id="commission-charges"
										className="checkbox styled-checkbox"
									/>
									<label
										htmlFor="commission-charges"
										className="styled-checkbox-1"
									>
										Take into account apple commission charges 30%.
									</label>
								</div>
							</div>
							<div className="projectSetting_box_content_row_right_inner_row">
								<div className="projectSetting_box_content_row_right_inner_row_left">
									<label htmlFor="takecharge">&nbsp;</label>
								</div>
								<div className="projectSetting_box_content_row_right_inner_row_right text-left">
									<input
										type="text"
										className="form-input price_text_width"
										placeholder="$ 0.00"
									/>
									{/* <Input name="price"
											placeholder="$ 0.00"
											value={this.state.price}
											type={InputType.EMAIL}
											onChange={(price: string) => {
												this.setState({ price })
											}}
										/> */}
									<span className="price_per_each">Per each install</span>
								</div>
							</div>
							<div className="projectSetting_box_content_row_right_inner_row display-flex">
								<div className="projectSetting_box_content_row_right_inner_row_left"/>
								<div className="projectSetting_box_content_row_right_inner_row_right">
									<button type="button" className="btnchange">
										{' '}
										save changes{' '}
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state: RootState) => ({})

export default connect(
	mapStateToProps,
	{}
)(ProjectSetting)
