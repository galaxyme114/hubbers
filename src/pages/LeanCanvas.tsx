import * as React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import Sidebar from '../containers/Sidebar'
import { RootState } from '../reducers/index'

const ImgPath = '/images/'

interface LeanCanvasProps {
}

interface LeanCanvasState {
	comment: string
	text: string
	showFullContent: boolean
	sideBar: boolean
	showExperts: boolean
	showActivityHistory: boolean
	chatBoxTabIndex: number
	modules: boolean
}

class LeanCanvas extends React.Component<LeanCanvasProps, LeanCanvasState> {
	constructor(props: LeanCanvasProps) {
		super(props)
		this.state = {
			comment: '',
			text: '',
			showFullContent: false,
			sideBar: true,
			showExperts: false,
			showActivityHistory: false,
			chatBoxTabIndex: 0,
			modules: false
		}
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
	public showExperts = () => {
		this.setState({
			showExperts: !this.state.showExperts
		})
	}
	public showActivityHistory = () => {
		this.setState({
			showActivityHistory: !this.state.showActivityHistory
		})
	}
	public closeRightSidebar = () => {
		this.setState({
			// showExperts: !this.state.showExperts,
			showExperts: false,
			showActivityHistory: !this.state.showActivityHistory
		})
	}
	
	public render() {
		return (
			<div className="lean_canvas_content_wrapper">
				<Helmet>
					<title>Canvas</title>
				</Helmet>
				<div className="lean_canvas_content_main">
					{/* Sidebar */}
					<Sidebar
						sideBar={this.state.sideBar}
						toggleSidebar={this.toggleSidebar}
						toggleModules={this.toggleModules}
					/>
					{/* Main Content Inner */}
					<div
						className={
							'lean_canvas_content_main_inner' +
							(!this.state.sideBar ? ' full-width' : '')
						}
					>
						{/* Main Content Inner Left */}
						<div
							className={
								'lean_canvas_content_main_inner_left' +
								(this.state.showExperts || this.state.showActivityHistory
									? ' sidebar_active'
									: '')
							}
						>
							{/* Main Content Inne Left Header */}
							<div className="lean_canvas_content_main_inner_left_header">
								<div className="lean_canvas_content_main_inner_left_header_left">
									<ul>
										<li>
											<img src={`${ImgPath}expert-2.png`} alt=""/>
										</li>
										<li>
											<img src={`${ImgPath}expert-2.png`} alt=""/>
										</li>
										<li>
											<img src={`${ImgPath}expert-2.png`} alt=""/>
										</li>
										<li>
											<img src={`${ImgPath}expert-2.png`} alt=""/>
										</li>
										<li>
											<img src={`${ImgPath}expert-2.png`} alt=""/>
										</li>
										<li>
											<span>+</span>
										</li>
									</ul>
								</div>
								<div className="lean_canvas_content_main_inner_left_header_right">
									{!this.state.showActivityHistory && (
										<ul>
											<li onClick={this.showActivityHistory}>
												<span/>
												<span/>
												<span/>
											</li>
											{!this.state.showExperts && (
												<li>
													<button>Show free tutorials</button>
												</li>
											)}
										</ul>
									)}
								</div>
							</div>
							{/* Main Content Inne Left body */}
							<div className="lean_canvas_content_main_inner_left_body">
								<div className="lean_canvas_content_main_inner_left_body_top">
									{/* Problem Column */}
									<div className="lean_canvas_content_main_inner_left_body_top_col">
										<div className="lean_canvas_content_main_inner_left_body_col_inner">
											<div className="lean_canvas_content_main_inner_left_body_col_inner_header">
												<img
													src={`${ImgPath}problem_icon.png`}
													alt=""
													className="icon"
												/>
												<h3>
													Problem
													<img
														src={`${ImgPath}help_icon.png`}
														alt=""
														className="help_icon"
													/>
												</h3>
												<button className="add_icon">+</button>
											</div>
											<div className="lean_canvas_content_main_inner_left_body_col_inner_body">
												{/* Card */}
												<div className="card card_active">
													<div className="card_body">
														<h2 className="card_body_title">
															Lorem ipsum dolor sit.
														</h2>
														<p className="card_body_content">
															Lorem ipsum dolor sit amet consectetur,
															adipisicing elit. Ipsam, unde libero rerum.
														</p>
														<ul className="card_body_list">
															<li className="card_body_list_item">
																<img src={`${ImgPath}expert-2.png`} alt=""/>
															</li>
															<li className="card_body_list_item">
																<img src={`${ImgPath}expert-2.png`} alt=""/>
															</li>
														</ul>
													</div>
													<div className="card_footer">
														<ul className="card_footer_list">
															<li className="card_footer_list_item">
																<img
																	src={`${ImgPath}add_user_icon.png`}
																	alt=""
																/>
															</li>
															<li className="card_footer_list_item">
																<img
																	src={`${ImgPath}color_plate_icon.png`}
																	alt=""
																/>
															</li>
															<li className="card_footer_list_item">
																<img
																	src={`${ImgPath}gallery_icon.png`}
																	alt=""
																/>
															</li>
														</ul>
														<button className="card_footer_button">
															<span/>
															<span/>
															<span/>
														</button>
													</div>
												</div>
												{/* Card 2 */}
												<div className="card">
													<div className="card_body">
														<h2 className="card_body_title">
															Lorem ipsum dolor sit.
														</h2>
														<p className="card_body_content">
															Lorem ipsum dolor sit amet consectetur,
															adipisicing elit.
														</p>
														<ul className="card_body_list">
															<li className="card_body_list_item">
																<img src={`${ImgPath}expert-2.png`} alt=""/>
															</li>
															<li className="card_body_list_item">
																<img src={`${ImgPath}expert-2.png`} alt=""/>
															</li>
														</ul>
													</div>
												</div>
											</div>
										</div>
									</div>
									{/* Solution and Key Metrics Column */}
									<div className="lean_canvas_content_main_inner_left_body_top_col has_two_cols">
										{/* Solution */}
										<div className="lean_canvas_content_main_inner_left_body_col_inner">
											<div className="lean_canvas_content_main_inner_left_body_col_inner_header">
												<img
													src={`${ImgPath}solution_icon.png`}
													alt=""
													className="icon"
												/>
												<h3>
													Solution
													<img
														src={`${ImgPath}help_icon.png`}
														alt=""
														className="help_icon"
													/>
												</h3>
												<button className="add_icon">+</button>
											</div>
											<div className="lean_canvas_content_main_inner_left_body_col_inner_body">
												{/* Body */}
											</div>
										</div>
										{/* Key Metrics */}
										<div className="lean_canvas_content_main_inner_left_body_col_inner">
											<div className="lean_canvas_content_main_inner_left_body_col_inner_header">
												<img
													src={`${ImgPath}key_metrics_icon.png`}
													alt=""
													className="icon"
												/>
												<h3>
													Key metrics
													<img
														src={`${ImgPath}help_icon.png`}
														alt=""
														className="help_icon"
													/>
												</h3>
												<button className="add_icon">+</button>
											</div>
											<div className="lean_canvas_content_main_inner_left_body_col_inner_body">
												{/* Body */}
											</div>
										</div>
									</div>
									{/* Unique Value Proposition Column */}
									<div className="lean_canvas_content_main_inner_left_body_top_col">
										<div className="lean_canvas_content_main_inner_left_body_col_inner">
											<div className="lean_canvas_content_main_inner_left_body_col_inner_header">
												<img
													src={`${ImgPath}unique_value_proposition_icon.png`}
													alt=""
													className="icon"
												/>
												<h3>
													Unique Value <br/> Propostion
													<img
														src={`${ImgPath}help_icon.png`}
														alt=""
														className="help_icon"
													/>
												</h3>
												<button className="add_icon">+</button>
											</div>
											<div className="lean_canvas_content_main_inner_left_body_col_inner_body">
												{/* Body */}
											</div>
										</div>
									</div>
									{/* Unfair Advantage and Cahnnels Column */}
									<div className="lean_canvas_content_main_inner_left_body_top_col has_two_cols">
										{/* Unfair Advantage */}
										<div className="lean_canvas_content_main_inner_left_body_col_inner">
											<div className="lean_canvas_content_main_inner_left_body_col_inner_header">
												<img
													src={`${ImgPath}unfir_advantage_icon.png`}
													alt=""
													className="icon"
												/>
												<h3>
													Unfair <br/>
													Advantage
													<img
														src={`${ImgPath}help_icon.png`}
														alt=""
														className="help_icon"
													/>
												</h3>
												<button className="add_icon">+</button>
											</div>
											<div className="lean_canvas_content_main_inner_left_body_col_inner_body">
												{/* Body */}
											</div>
										</div>
										{/* Cahnnels */}
										<div className="lean_canvas_content_main_inner_left_body_col_inner">
											<div className="lean_canvas_content_main_inner_left_body_col_inner_header">
												<img
													src={`${ImgPath}channels_icon.png`}
													alt=""
													className="icon"
												/>
												<h3>
													Channels
													<img
														src={`${ImgPath}help_icon.png`}
														alt=""
														className="help_icon"
													/>
												</h3>
												<button className="add_icon">+</button>
											</div>
											<div className="lean_canvas_content_main_inner_left_body_col_inner_body">
												{/* Body */}
											</div>
										</div>
									</div>
									{/* Customer Segments Column */}
									<div className="lean_canvas_content_main_inner_left_body_top_col">
										<div className="lean_canvas_content_main_inner_left_body_col_inner">
											<div className="lean_canvas_content_main_inner_left_body_col_inner_header">
												<img
													src={`${ImgPath}customer_segments_icon.png`}
													alt=""
													className="icon"
												/>
												<h3>
													Customer <br/> Segments
													<img
														src={`${ImgPath}help_icon.png`}
														alt=""
														className="help_icon"
													/>
												</h3>
												<button className="add_icon">+</button>
											</div>
											<div className="lean_canvas_content_main_inner_left_body_col_inner_body">
												{/* Body */}
											</div>
										</div>
									</div>
								</div>
								<div className="lean_canvas_content_main_inner_left_body_bottom">
									{/* Const Structure Column */}
									<div className="lean_canvas_content_main_inner_left_body_bottom_col">
										<div className="lean_canvas_content_main_inner_left_body_col_inner">
											<div className="lean_canvas_content_main_inner_left_body_col_inner_header">
												<img
													src={`${ImgPath}cost_structure_icon.png`}
													alt=""
													className="icon"
												/>
												<h3>
													Const Structure
													<img
														src={`${ImgPath}help_icon.png`}
														alt=""
														className="help_icon"
													/>
												</h3>
												<button className="add_icon">+</button>
											</div>
											<div className="lean_canvas_content_main_inner_left_body_col_inner_body">
												{/* Body */}
											</div>
										</div>
									</div>
									{/* Revenue Column */}
									<div className="lean_canvas_content_main_inner_left_body_bottom_col">
										<div className="lean_canvas_content_main_inner_left_body_col_inner">
											<div className="lean_canvas_content_main_inner_left_body_col_inner_header">
												<img
													src={`${ImgPath}revenue_icon.png`}
													alt=""
													className="icon"
												/>
												<h3>
													Revenue
													<img
														src={`${ImgPath}help_icon.png`}
														alt=""
														className="help_icon"
													/>
												</h3>
												<button className="add_icon">+</button>
											</div>
											<div className="lean_canvas_content_main_inner_left_body_col_inner_body">
												{/* Body */}
											</div>
										</div>
									</div>
								</div>
							</div>
							{/* Main Content Inne Left Footer */}
							<div className="lean_canvas_content_main_inner_left_footer">
								{/* Main Content Inne Left Footer Header*/}
								<div className="lean_canvas_content_main_inner_left_footer_header">
									<div className="lean_canvas_content_main_inner_left_footer_header_left">
										<h5>{this.state.showExperts && 'Experts'}</h5>
									</div>
									<div className="lean_canvas_content_main_inner_left_footer_header_right">
										{!this.state.showExperts ? (
											<button
												className="show_experts"
												onClick={this.showExperts}
											>
												Show Experts
											</button>
										) : (
											<button
												className="hide_experts"
												onClick={this.showExperts}
											>
												Hide Experts <span>&times;</span>
											</button>
										)}
									</div>
								</div>
								{/* Main Content Inne Left Footer Body */}
								{this.state.showExperts && (
									<div className="lean_canvas_content_main_inner_left_footer_body">
										<ul>
											{/* Expert Card */}
											<li className="experts_card">
												<div className="expert_image">
													<img src={`${ImgPath}expert-2.png`} alt=""/>
												</div>
												<h3 className="expert_name">Seo Meo</h3>
												<Link to={'#'} className="expert_website">
													www.carnet.cc
												</Link>
												<h4 className="expert_role">Product Manager</h4>
												<p className="expert_info">
													Lorem ipsum dolor sit amet consectetur, adipisicing
													elit. Laborum, delectus!
												</p>
											</li>
											<li className="experts_card">
												<div className="expert_image">
													<img src={`${ImgPath}expert-2.png`} alt=""/>
												</div>
												<h3 className="expert_name">Seo Meo</h3>
												<Link to={'#'} className="expert_website">
													www.carnet.cc
												</Link>
												<h4 className="expert_role">Product Manager</h4>
												<p className="expert_info">
													Lorem ipsum dolor sit amet consectetur, adipisicing
													elit. Laborum, delectus!
												</p>
											</li>
											<li className="experts_card">
												<div className="expert_image">
													<img src={`${ImgPath}expert-2.png`} alt=""/>
												</div>
												<h3 className="expert_name">Seo Meo</h3>
												<Link to={'#'} className="expert_website">
													www.carnet.cc
												</Link>
												<h4 className="expert_role">Product Manager</h4>
												<p className="expert_info">
													Lorem ipsum dolor sit amet consectetur, adipisicing
													elit. Laborum, delectus!
												</p>
											</li>
											<li className="experts_card">
												<div className="expert_image">
													<img src={`${ImgPath}expert-2.png`} alt=""/>
												</div>
												<h3 className="expert_name">Seo Meo</h3>
												<Link to={'#'} className="expert_website">
													www.carnet.cc
												</Link>
												<h4 className="expert_role">Product Manager</h4>
												<p className="expert_info">
													Lorem ipsum dolor sit amet consectetur, adipisicing
													elit. Laborum, delectus!
												</p>
											</li>
											<li className="experts_card">
												<div className="expert_image">
													<img src={`${ImgPath}expert-2.png`} alt=""/>
												</div>
												<h3 className="expert_name">Seo Meo</h3>
												<Link to={'#'} className="expert_website">
													www.carnet.cc
												</Link>
												<h4 className="expert_role">Product Manager</h4>
												<p className="expert_info">
													Lorem ipsum dolor sit amet consectetur, adipisicing
													elit. Laborum, delectus!
												</p>
											</li>
										</ul>
									</div>
								)}
							</div>
						</div>
						{/* Main Content Inner Right */}
						<div
							className={
								'lean_canvas_content_main_inner_right' +
								(this.state.showExperts || this.state.showActivityHistory
									? ' active'
									: '')
							}
						>
							<div
								className={
									'sidebar_close_btn' +
									(this.state.showActivityHistory ? ' active' : '')
								}
								onClick={this.closeRightSidebar}
							>
								&times;
							</div>
							{/* Experts Side Bar */}
							<div
								className={
									'show_experts_right_sidebar' +
									(this.state.showExperts ? ' active' : '')
								}
							>
								<div className="show_experts_right_sidebar_header">
									<button className="hide_experts" onClick={this.showExperts}>
										Hide Experts <span>&times;</span>
									</button>
								</div>
								<div className="show_experts_right_sidebar_body">
									<h2 className="show_experts_right_sidebar_body_title">
										Need help for your projects?
									</h2>
									<div className="sponsors_card">
										<div className="sponsors_card_header">
											<img
												src={`${ImgPath}sponsors_image.png`}
												alt=""
												className="sponsor_image"
											/>
										</div>
										<div className="sponsors_card_body">
											<img
												src={`${ImgPath}expert-2.png`}
												className="sponsor_icon"
											/>
											<h2 className="sponsor_title">
												Creating brand identity systems
											</h2>
											<p className="sponsor_name">by Jean Bernard Antoine</p>
											<p className="sponsor_text">
												I write clear solution for problem your product want to
												solve
											</p>
										</div>
									</div>
								</div>
							</div>
							
							{/* History and Activity */}
							<div
								className={
									'activity_histroy_right_sidebar' +
									(this.state.showActivityHistory ? ' active' : '')
								}
							>
								<Tabs
									selectedIndex={this.state.chatBoxTabIndex}
									onSelect={chatBoxTabIndex =>
										this.setState({chatBoxTabIndex})
									}
								>
									<div className="activity_histroy_right_sidebar_header">
										<TabList className="activity_histroy_tablist">
											<Tab className="activity_histroy_tablist_item">
												History
											</Tab>
											<Tab className="activity_histroy_tablist_item">
												Activity
											</Tab>
										</TabList>
									</div>
									<div className="divider"/>
									<div className="activity_histroy_right_sidebar_body">
										<TabPanel className="activity_histroy_tablist_panel active">
											<div className="histroy_tablist_panel_box">
												<p className="histroy_tablist_panel_box_title">
													Monday
												</p>
												<div className="histroy_tablist_panel_box_card">
													<h3>March 3 at 12:13 PM</h3>
													<p>Current Version</p>
													<p>
														<span/>
														Udit Virwani
													</p>
													<button className="histroy_tablist_panel_box_card_button">
														<span/>
														<span/>
														<span/>
													</button>
												</div>
											</div>
											<div className="histroy_tablist_panel_box">
												<p className="histroy_tablist_panel_box_title">
													Tuesday
												</p>
												<div className="histroy_tablist_panel_box_card">
													<h3>March 3 at 12:13 PM</h3>
													<p>Current Version</p>
													<p>
														<span/>
														Udit Virwani
													</p>
													<button className="arrow"/>
												</div>
												<div className="histroy_tablist_panel_box_card">
													<h3>March 3 at 12:13 PM</h3>
													<p>Current Version</p>
													<p>
														<span/>
														Udit Virwani
													</p>
													<button className="arrow"/>
												</div>
											</div>
										</TabPanel>
										<TabPanel className="activity_histroy_tablist_panel">
											{/* Actitvity Card */}
											<div className="activity_card">
												<div className="activity_card_header">
													<div className="activity_card_header_left">
														<img
															src={`${ImgPath}expert-3.png`}
															alt=""
															className="activity_card_header_left_image"
														/>
													</div>
													<div className="activity_card_header_right">
														<h3 className="activity_card_header_right_name">
															Udit Virwani
															<span>on</span>
															<span>Lean Canvas</span>
														</h3>
														<p className="activity_card_header_right_date">
															yesterday at 2:25 PM
														</p>
													</div>
												</div>
												<div className="activity_card_body">
													<p className="activity_card_body_content">
														<span className="mentioned">@tanya86763220</span>{' '}
														I've just added a version history of screenshot from
														google drive Just to some up oue call, we'll be
														looking to add collobrative tools to all our
														modules, which would include some changes.
													</p>
												</div>
											</div>
											{/* Activity card */}
											<div className="activity_card">
												<div className="activity_card_header">
													<div className="activity_card_header_left">
														<img
															src={`${ImgPath}expert-3.png`}
															alt=""
															className="activity_card_header_left_image"
														/>
													</div>
													<div className="activity_card_header_right">
														<h3 className="activity_card_header_right_name">
															Udit Virwani
															<span>on</span>
															<span>Canvas v4.0</span>
														</h3>
														<p className="activity_card_header_right_date">
															yesterday at 2:25 PM
														</p>
													</div>
												</div>
												<div className="activity_card_body">
													<img
														src={`${ImgPath}screenshot.png`}
														alt=""
														className="activity_card_body_attchement"
													/>
												</div>
											</div>
											{/* Activity card */}
											<div className="activity_card">
												<div className="activity_card_header">
													<div className="activity_card_header_left">
														<img
															src={`${ImgPath}expert-3.png`}
															alt=""
															className="activity_card_header_left_image"
														/>
													</div>
													<div className="activity_card_header_right">
														<h3 className="activity_card_header_right_name">
															Udit Virwani
															<span>on</span>
															<span>slide_1.jpg</span>
														</h3>
														<p className="activity_card_header_right_date">
															yesterday at 2:25 PM
														</p>
													</div>
												</div>
											</div>
										</TabPanel>
									</div>
								</Tabs>
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
)(LeanCanvas)
