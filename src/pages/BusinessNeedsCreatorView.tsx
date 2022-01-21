import * as React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import Input from '../components/Input'
import { InputType } from '../constants/enums'
import { RootState } from '../reducers/index'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const ImgPath = '/images/'

interface BusinessNeedsCreatorViewProps {
}

interface BusinessNeedsCreatorViewState {
	title: string
	description: string
	blank: string
	showCategory: boolean
	showFloatingChatBox: boolean
	skills: string
	chatBoxTabIndex: number
	time: any
	projectDurationDate: any
	projectDurationTime: any
	importantDates: any
}

class BusinessNeedsCreatorView extends React.Component<BusinessNeedsCreatorViewProps,
	BusinessNeedsCreatorViewState> {
	public skillsData: any = [
		{value: 'designer', label: 'designer'},
		{value: 'developer', label: 'developer'}
	]
	
	constructor(props: BusinessNeedsCreatorViewProps) {
		super(props)
		this.state = {
			title: '',
			description: '',
			blank: '',
			showCategory: false,
			showFloatingChatBox: false,
			skills: '',
			chatBoxTabIndex: 0,
			time: '',
			projectDurationDate: new Date(),
			projectDurationTime: new Date(),
			importantDates: new Date()
		}
	}
	
	public showCategory = () => {
		this.setState({
			showCategory: !this.state.showCategory
		})
	}
	public showFloatingChatBox = () => {
		this.setState({
			showFloatingChatBox: !this.state.showFloatingChatBox
		})
	}
	
	public render() {
		return (
			<div className="business_needs_creator_view_content_wrapper">
				<Helmet>
					<title>BusinessNeedsCreatorView</title>
				</Helmet>
				<div className="business_needs_creator_view_content">
					{/* Top Section */}
					<div className="business_needs_creator_view_content_top">
						<div className="business_needs_creator_view_content_top_left">
							<h1 className="business_needs_creator_view_content_top_left_title">
								Create business need
							</h1>
							<div className="title_description_field">
								<Input
									name="title"
									placeholder=""
									value={this.state.title}
									type={InputType.TEXT}
									onChange={(title: string) => {
										this.setState({title})
									}}
								/>
								<Input
									name="description"
									placeholder=""
									value={this.state.description}
									type={InputType.TEXTAREA}
									onChange={(description: string) => {
										this.setState({description})
									}}
								/>
							</div>
							{/* <Input
								name="blank"
								placeholder=""
								value={this.state.blank}
								type={InputType.TEXT}
								onChange={(blank: string) => {
									this.setState({ blank })
								}}
							/> */}
							<input
								name="blank"
								placeholder=""
								value={this.state.blank}
								type={InputType.TEXT}
								onFocus={this.showCategory}
								onBlur={this.showCategory}
								className="show_category_field"
							/>
							{this.state.showCategory && (
								<div className="category_box">
									<div className="category_box_head">Category</div>
									<div className="category_box_body">
										<ul>
											<li>
												<span>Web, mobile and software</span>
												<img
													src={`${ImgPath}right_arrow.png`}
													alt="right arrow"
												/>
											</li>
											<li>
												<span>It and networking</span>
												<img
													src={`${ImgPath}right_arrow.png`}
													alt="right arrow"
												/>
											</li>
											<li>
												<span>Data science and analytics</span>
												<img
													src={`${ImgPath}right_arrow.png`}
													alt="right arrow"
												/>
											</li>
											<li>
												<span>Engineering and architecture</span>
												<img
													src={`${ImgPath}right_arrow.png`}
													alt="right arrow"
												/>
												<div className="category_box_sub_menu">
													<div className="category_box_sub_menu_head">
														<img
															src={`${ImgPath}up_arrow.png`}
															alt="right arrow"
														/>
													</div>
													<div className="category_box_sub_menu_body">
														<ul>
															<li>Web, mobile and software</li>
															<li>It and networking</li>
															<li>Data science and analytics</li>
															<li>Engineering and architecture</li>
															<li>Design and creative</li>
															<li>Writing</li>
															<li>Translation</li>
															<li>Legal</li>
														</ul>
													</div>
												</div>
											</li>
											<li>
												<span>Design and creative</span>
												<img
													src={`${ImgPath}right_arrow.png`}
													alt="right arrow"
												/>
											</li>
											<li>
												<span>Writing</span>
												<img
													src={`${ImgPath}right_arrow.png`}
													alt="right arrow"
												/>
											</li>
											<li>
												<span>Translation</span>
												<img
													src={`${ImgPath}right_arrow.png`}
													alt="right arrow"
												/>
											</li>
											<li>
												<span>Legal</span>
												<img
													src={`${ImgPath}right_arrow.png`}
													alt="right arrow"
												/>
											</li>
										</ul>
									</div>
								</div>
							)}
							{/* Skills */}
							<div className="skills_field">
								<Input
									name="skills"
									placeholder="Skills"
									value={this.state.skills}
									type={InputType.SELECT}
									options={this.skillsData}
									onChange={(skills: string) => {
										this.setState({skills})
									}}
								/>
							</div>
							{/* Invite Experts */}
							<div className="invite_experts">
								<img src={`${ImgPath}invite_experts_icon.png`} alt=""/>
								<span>+ Invite experts</span>
							</div>
							{/* Project Type */}
							<div className="skills_field w-49">
								<Input
									name="skills"
									placeholder="Project type"
									value={this.state.skills}
									type={InputType.SELECT}
									options={this.skillsData}
									onChange={(skills: string) => {
										this.setState({skills})
									}}
								/>
							</div>
							{/* Project budjet */}
							<div className="skills_field w-49">
								<Input
									name="skills"
									placeholder="Project budjet"
									value={this.state.skills}
									type={InputType.SELECT}
									options={this.skillsData}
									onChange={(skills: string) => {
										this.setState({skills})
									}}
								/>
							</div>
							{/* Project Duration Box */}
							<div className="project_duration_box">
								<p>Project duration</p>
								<div className="date_field">
									<DatePicker
										selected={this.state.projectDurationDate}
										onChange={(date: any) => {
											this.setState({
												projectDurationDate: date
											})
										}}
									/>
								</div>
								<div className="time_field">
									<DatePicker
										selected={this.state.projectDurationTime}
										onChange={(time: any) => {
											this.setState({
												projectDurationTime: time
											})
										}}
										showTimeSelect
										showTimeSelectOnly
										timeIntervals={1}
										dateFormat="h:mm aa"
										timeCaption="Time"
									/>
								</div>
							</div>
							<div className="important_dates_box">
								<p>Important Dates</p>
								<div className="date_field">
									<DatePicker
										selected={this.state.importantDates}
										onChange={(date: any) => {
											this.setState({
												importantDates: date
											})
										}}
									/>
								</div>
								<div className="add_date">+ Add date</div>
							</div>
							{/* Visibilty Scope */}
							<div className="skills_field w-49">
								<Input
									name="Visiblity Scope"
									placeholder="Visiblity Scope"
									value={this.state.skills}
									type={InputType.SELECT}
									options={this.skillsData}
									onChange={(skills: string) => {
										this.setState({skills})
									}}
								/>
							</div>
							{/* Added Files */}
							<div className="added_files_box">
								<p>Added files</p>
								<div className="added_file_item_list">
									<div className="added_file_item">
										<span className="file_name">Login.sketch</span>
										<span className="close_icon">&times;</span>
									</div>
								</div>
								<div className="add_file_btn">
									<input type="file" id="files" hidden/>
									<label htmlFor="files">+ Add File</label>
								</div>
							</div>
							<div className="cancel_save_buttons">
								<button className="cancle_btn">Cancel</button>
								<button className="save_btn">Save</button>
							</div>
						</div>
						{/* Pro tip Content */}
						<div className="business_needs_creator_view_content_top_right">
							<div className="business_needs_creator_view_content_top_right_head">
								<img src={`${ImgPath}light_icon.png`} alt=""/>
								<span>Pro tip</span>
							</div>
							<div className="business_needs_creator_view_content_top_right_body">
								<p className="business_needs_creator_view_content_top_right_body_content">
									Lorem ipsum dolor sit amet consectetur adipisicing elit.
									Pariatur, eius harum itaque odit obcaecati nesciunt nam
									sapiente optio debitis velit officia consequatur vitae esse
									saepe suscipit. Architecto ipsam corporis omnis.
								</p>
							</div>
						</div>
					</div>
					
					{/* Bottom Section */}
					<div className="business_needs_creator_view_content_bottom">
						{/* Bottom Section Head */}
						<div className="business_needs_creator_view_content_bottom_head">
							<h2 className="business_needs_creator_view_content_bottom_head_title">
								Freelancer bidding(45)
							</h2>
						</div>
						{/* Bottom Section Body */}
						<div className="business_needs_creator_view_content_bottom_body">
							{/* Bidder Info Box */}
							<div className="bidder_infobox">
								<div className="bidder_infobox_left">
									<div className="bidder_image">
										<img src={`${ImgPath}bidder_profile_image.png`} alt=""/>
									</div>
									<div className="bidder_info">
										<h3 className="bidder_name">Wordpress Rock Star</h3>
										<p className="bidder_bidded_date">3 minutes ago</p>
										<p className="bidder_info_content">
											Lorem ipsum dolor sit amet consectetur adipisicing elit.
											Facere molestias excepturi, unde assumenda officia commodi
											voluptate repellat vero nulla aliquid, sunt recusandae
											dignissimos nesciunt alias fuga deleniti quas, voluptatem
											voluptates!
										</p>
									</div>
								</div>
								<div className="bidder_infobox_right">
									<div className="bidder_infobox_right_left">
										<div className="bidder_rating">
											<span>4.8</span>
											<img src={`${ImgPath}star_icon.png`} alt=""/>
										</div>
										<p className="bidder_reviews">134 reviews</p>
										<p className="bidder_completation_rate">
											95% Completion rate
										</p>
									</div>
									<div className="bidder_infobox_right_right">
										<h2 className="bidder_rate">$44/hour</h2>
										<button className="bidder_hire_btn">Hire me</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* Floating Chat Box */}
				<div className="floating_chat_box">
					<div className="chat_box_head">
						<span className="chat_box_head_text">Chat</span>
						<span
							className={
								'chat_box_head_icon' +
								(!this.state.showFloatingChatBox ? ' expand' : '')
							}
							onClick={this.showFloatingChatBox}
						/>
					</div>
					<div
						className={
							'chat_box_body' +
							(this.state.showFloatingChatBox ? ' expand' : '')
						}
					>
						<Tabs
							selectedIndex={this.state.chatBoxTabIndex}
							onSelect={chatBoxTabIndex => this.setState({chatBoxTabIndex})}
						>
							<TabList className="chat_box_body_head">
								<Tab className="chat_box_body_head_item">Active</Tab>
								<Tab className="chat_box_body_head_item">Archive</Tab>
							</TabList>
							<div className="chat_box_body_body">
								<TabPanel className="chat_box_body_body_tab_content active">
									<div className="chat_box_body_body_box">
										<div className="chat_box_body_body_box_left">
											<img src={`${ImgPath}bidder_profile_image.png`} alt=""/>
										</div>
										<div className="chat_box_body_body_box_right">
											<h4>
												Nojer <small>3 Minutes ago</small>
											</h4>
											<p>Lorem ipsum dolor sit amet.</p>
										</div>
									</div>
								</TabPanel>
								<TabPanel className="chat_box_body_body_tab_content">
									Archive Tab Content
								</TabPanel>
							</div>
						</Tabs>
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
)(BusinessNeedsCreatorView)
