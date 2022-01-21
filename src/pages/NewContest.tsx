import * as React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'

import Icon from '../components/Icon'
import { RootState } from '../reducers/index'

import { fetchContestDetail } from '../actions/homepage'
import { State as ContestDetailDataState } from '../reducers/contestDetail'

import Slider from 'react-slick'
// import ContestAgreement from '../components/ContestAgreement'
import Input from '../components/Input'
import { ConstantsCarousel, MarksCarousel } from '../constants/carouselSettings'
import { InputType } from '../constants/enums'

interface NewContestDetailProps {
	state: ContestDetailDataState
	fetchContestDetail: any
}

interface NewContestDetailState {
	title: string
	design: string
	functionality: string
	usability: string
	market: string
	title1: string
	design1: string
	functionality1: string
	usability1: string
	market1: string
}

class NewContestDetail extends React.Component<NewContestDetailProps, NewContestDetailState> {
	constructor(props: NewContestDetailProps) {
		super(props)
		
		this.state = {
			title: 'Connected armchair with back massage functions',
			design: 'It combines a lazy boy couch with top of the line, connected features.',
			functionality: 'Reclining chair function, adjustable back massage function, inbuilt charging station.',
			usability: 'Comfort and technology combined. ',
			market: 'Lazy boy has been a big hit in the USA and is a stable item of many homes. This is an updated, improved version of the furniture.',
			title1: '',
			design1: '',
			functionality1: '',
			usability1: '',
			market1: ''
		}
	}
	
	public render() {
		const {state} = this.props
		
		return (
			<div className="page-contest-detail">
				<Helmet>
					<title>Contest Dashboard | Hubbers - Hub of Makers</title>
				</Helmet>
				<div className="contest-detail-container">
					<div className="container">
						<div className="contest-detail__header">
							<h2>Make the greatest connected mug on earth</h2>
							<p className="time_ago">8 Days to go</p>
							<div className="header_timeline">
								<ul className="header_time_list">
									<li>
										<span><img src="/images/icon/start-time.png"/></span>
										<span className="left_span">Start Time:</span>
										<span className="right_span">March, 1st 12:00 am</span>
									</li>
									<li>
										<span><img src="/images/icon/end-time.png"/></span>
										<span className="left_span">Finish Time:</span>
										<span className="right_span">March, 31st 12:00 am</span>
									</li>
								</ul>
							</div>
						</div>
						<div className="contest-detail__tabspart">
							<Tabs>
								<TabList>
									<Tab>
										<div className="contest-detail__tabmenu">
											General
										</div>
									</Tab>
									<Tab>
										<div className="contest-detail__tabmenu">
											Creators
										</div>
									</Tab>
									<Tab>
										<div className="contest-detail__tabmenu">
											Award Judges
										</div>
									</Tab>
									<Tab>
										<div className="contest-detail__tabmenu">
											More Info
										</div>
									</Tab>
									<Tab>
										<div className="contest-detail__tabmenu">
											Official Rules
										</div>
									</Tab>
								</TabList>
								<TabPanel>
									<div className="tab_general">
										<div className="tab_general__header">
											<div className="tab_general_left">
												<ul className="general-sub-menu-left">
													<li>
														<div className="icon-content">
															<span><img src="/images/icon/product.png"/></span>
														</div>
														<div className="text-content">
															<h4>Product</h4>
															<p>Outdoor Recreation</p>
														</div>
													</li>
													<li>
														<div className="icon-content">
															<span><img src="/images/icon/innovation.png"/></span>
														</div>
														<div className="text-content">
															<h4>Innovation</h4>
															<p>Connected</p>
														</div>
													</li>
													<li>
														<div className="icon-content">
															<span><img src="/images/icon/geography.png"/></span>
														</div>
														<div className="text-content">
															<h4>Geography</h4>
															<p>Worldwide</p>
														</div>
													</li>
												</ul>
											</div>
											<div className="tab_general_right">
												<ul className="general-sub-menu-right">
													<li>
														<div className="text-content">
															<h4>Contestants</h4>
															<p>22</p>
														</div>
													</li>
													<li>
														<div className="text-content">
															<h4>Judges</h4>
															<p>39</p>
														</div>
													</li>
												</ul>
											</div>
										</div>
										<div className="tab_general__content">
											<div className="general__content__left">
												<div className="left_image"
												     style={{
													     backgroundImage: 'url(https://legacy.hubbers.io/uploads/650xjpg-89503.jpg)',
													     backgroundSize: 'cover',
													     backgroundRepeat: 'no-repeat'
												     }}/>
												<div className="general_bottom_row">
													<ul className="iconslist">
														<li>
															<a><Icon name="eye"></Icon> 254</a>
														</li>
														<li>
															<a><Icon name="heart-empty"></Icon> 25</a>
														</li>
														<li>
															<a><Icon name="star-empty"></Icon> 54</a>
														</li>
														<li>
															<a><Icon name="share"></Icon> 24</a>
														</li>
													</ul>
												</div>
											</div>
											<div className="general__content__right">
												<div className="prize-content">
													<div className="prize-content__heading"><h2>Prizes</h2></div>
													<table>
														<tbody>
														<tr>
															<td className="prize0">
																<div className="prize_icon">
																	<img src="/images/icon/standing-2.png"/>
																</div>
																<div className="prize-box stand-2">
																	<h2>Place 2</h2>
																</div>
																<div className="bottom-info">
																	<h4>800 USD</h4>
																	<p>5% royalties<br/>
																		if manufactured</p>
																</div>
															</td>
															<td className="prize0">
																<div className="prize_icon">
																	<img src="/images/icon/standing-1.png"/>
																</div>
																<div className="prize-box stand-1">
																	<h2>Place 1</h2>
																</div>
																<div className="bottom-info">
																	<h4>1600 USD</h4>
																	<p>5% royalties<br/>
																		if manufactured</p>
																</div>
															</td>
															<td className="prize0">
																<div className="prize_icon">
																	<img src="/images/icon/standing-3.png"/>
																</div>
																<div className="prize-box stand-3">
																	<h2>Place 3</h2>
																</div>
																<div className="bottom-info">
																	<h4>500 USD</h4>
																	<p>5% royalties<br/>
																		if manufactured</p>
																</div>
															</td>
														
														</tr>
														</tbody>
													</table>
												</div>
												{/*<div className="prize_bottom_btnbox">
													<div className="prize_bottom_btnbox_left">
														<button className="btn">Add Entrie</button>
													</div>
													<div className="prize_bottom_btnbox_right">
														<button className="btn">View Entries</button>
													</div>
												</div>*/}
												<div className="prize_bottom_btnbox">
													<div className="prize_bottom_btnbox_left">
														<div className="become_a_contestant">
															<a>
																<img src="http://legacy.hubbers.io/contests/signup-feature-2.png"/>
																<br/>
																<span className="text-become">Become a Contestant</span>
															</a>
														</div>
													</div>
													
													<div className="prize_bottom_btnbox_right">
														<div className="become_a_judge">
															<a>
																<img src="http://legacy.hubbers.io/contests/become-a-judge.png"/>
																<br/>
																<span className="text-become">Become a Judge</span>
															</a>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</TabPanel>
								<TabPanel>
									<div className="tab_creators">
										<div className="tab_creators_heading">
											<h3>There are <strong> 24 contestants </strong> on this contest</h3>
										</div>
										<div className="tab_creators_slider_items">
											<Slider {...ConstantsCarousel}>
												<div className="tab_creators_slider_item">
													<div className="general-details">
														<div className="image_section">
															<img src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/ry9YVHqPQ.jpg"/>
														</div>
														<div className="member_name">
															<p className="name">Tolga Tuncer</p>
															<p className="country">TR</p>
														</div>
														<div className="bottom-bar">
															<div className="average-bar">
																<div style={{width: '66%'}} className="inside-average-bar"></div>
																<div className="average-marks">
																	<span>6.65</span>
																</div>
															</div>
														</div>
													</div>
												</div>
												<div className="tab_creators_slider_item">
													<div className="general-details">
														<div className="image_section">
															<img src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/ry9YVHqPQ.jpg"/>
														</div>
														<div className="member_name">
															<p className="name">Tolga Tuncer</p>
															<p className="country">TR</p>
														</div>
													</div>
												</div>
												<div className="tab_creators_slider_item">
													<div className="general-details">
														<div className="image_section">
															<img src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/ry9YVHqPQ.jpg"/>
														</div>
														<div className="member_name">
															<p className="name">Tolga Tuncer</p>
															<p className="country">TR</p>
														</div>
													</div>
												</div>
												<div className="tab_creators_slider_item">
													<div className="general-details">
														<div className="image_section">
															<img src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/ry9YVHqPQ.jpg"/>
														</div>
														<div className="member_name">
															<p className="name">Tolga Tuncer</p>
															<p className="country">TR</p>
														</div>
													</div>
												</div>
												<div className="tab_creators_slider_item">
													<div className="general-details">
														<div className="image_section">
															<img src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/ry9YVHqPQ.jpg"/>
														</div>
														<div className="member_name">
															<p className="name">Tolga Tuncer</p>
															<p className="country">TR</p>
														</div>
													</div>
												</div>
												<div className="tab_creators_slider_item">
													<div className="general-details">
														<div className="image_section">
															<img src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/ry9YVHqPQ.jpg"/>
														</div>
														<div className="member_name">
															<p className="name">Tolga Tuncer</p>
															<p className="country">TR</p>
														</div>
													</div>
												</div>
												<div className="tab_creators_slider_item">
													<div className="general-details">
														<div className="image_section">
															<img src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/ry9YVHqPQ.jpg"/>
														</div>
														<div className="member_name">
															<p className="name">Tolga Tuncer</p>
															<p className="country">TR</p>
														</div>
													</div>
												</div>
											</Slider>
										</div>
									</div>
								</TabPanel>
								<TabPanel>
									<div className="tab_creators">
										<div className="tab_creators_heading">
											<h3>There are <strong> 24 judges </strong> on this contest</h3>
										</div>
										<div className="tab_creators_slider_items">
											<Slider {...ConstantsCarousel}>
												<div className="tab_creators_slider_item">
													<div className="general-details">
														<div className="image_section">
															<img src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/ry9YVHqPQ.jpg"/>
														</div>
														<div className="member_name">
															<p className="name">Tolga Tuncer</p>
															<p className="country">TR</p>
														</div>
													</div>
												</div>
												<div className="tab_creators_slider_item">
													<div className="general-details">
														<div className="image_section">
															<img src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/ry9YVHqPQ.jpg"/>
														</div>
														<div className="member_name">
															<p className="name">Tolga Tuncer</p>
															<p className="country">TR</p>
														</div>
													</div>
												</div>
												<div className="tab_creators_slider_item">
													<div className="general-details">
														<div className="image_section">
															<img src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/ry9YVHqPQ.jpg"/>
														</div>
														<div className="member_name">
															<p className="name">Tolga Tuncer</p>
															<p className="country">TR</p>
														</div>
													</div>
												</div>
												<div className="tab_creators_slider_item">
													<div className="general-details">
														<div className="image_section">
															<img src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/ry9YVHqPQ.jpg"/>
														</div>
														<div className="member_name">
															<p className="name">Tolga Tuncer</p>
															<p className="country">TR</p>
														</div>
													</div>
												</div>
												<div className="tab_creators_slider_item">
													<div className="general-details">
														<div className="image_section">
															<img src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/ry9YVHqPQ.jpg"/>
														</div>
														<div className="member_name">
															<p className="name">Tolga Tuncer</p>
															<p className="country">TR</p>
														</div>
													</div>
												</div>
												<div className="tab_creators_slider_item">
													<div className="general-details">
														<div className="image_section">
															<img src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/ry9YVHqPQ.jpg"/>
														</div>
														<div className="member_name">
															<p className="name">Tolga Tuncer</p>
															<p className="country">TR</p>
														</div>
													</div>
												</div>
												<div className="tab_creators_slider_item">
													<div className="general-details">
														<div className="image_section">
															<img src="https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/ry9YVHqPQ.jpg"/>
														</div>
														<div className="member_name">
															<p className="name">Tolga Tuncer</p>
															<p className="country">TR</p>
														</div>
													</div>
												</div>
											</Slider>
										</div>
									</div>
								</TabPanel>
								<TabPanel>
									<div>More Info</div>
								</TabPanel>
								<TabPanel>
									<div>Official Rules</div>
								</TabPanel>
							</Tabs>
						</div>
						<div className="dashboard_leaderboard">
							<Tabs>
								<TabList>
									<Tab>
										<div className="leaderboard__tabmenu">
											New Marks <span className="countnumber">0</span>
										</div>
									</Tab>
									<Tab>
										<div className="leaderboard__tabmenu">
											All Marks <span className="countnumber">0</span>
										</div>
									</Tab>
									<Tab>
										<div className="leaderboard__tabmenu">
											Leaderboard
										</div>
									</Tab>
								</TabList>
								<TabPanel>
									<div className="marks_heading">
										<div className="tab_marks">
											<div className="tab_marks_heading">
												<h3>New Marks</h3>
											</div>
											<div className="tab_marks_slider_items">
												<Slider {...MarksCarousel}>
													<div className="tab_marks_slider_item">
														<li className="general-details">
															<div className="image_section">
																<img
																	src="https://legacy.hubbers.io/uploads/temp/garbage/benjamin-picturejpg-14034.jpg"/>
															</div>
															<div className="member_name">
																<p className="name">Benjamin Vignon</p>
																<p className="country">Average Marks <strong> 1 </strong></p>
															</div>
														</li>
													</div>
													<div className="tab_marks_slider_item">
														<li className="general-details">
															<div className="image_section">
																<img
																	src="https://legacy.hubbers.io/uploads/temp/garbage/benjamin-picturejpg-14034.jpg"/>
															</div>
															<div className="member_name">
																<p className="name">Benjamin Vignon</p>
																<p className="country">Average Marks <strong> 1 </strong></p>
															</div>
														</li>
													</div>
													<div className="tab_marks_slider_item">
														<li className="general-details">
															<div className="image_section">
																<img
																	src="https://legacy.hubbers.io/uploads/temp/garbage/benjamin-picturejpg-14034.jpg"/>
															</div>
															<div className="member_name">
																<p className="name">Benjamin Vignon</p>
																<p className="country">Average Marks <strong> 1 </strong></p>
															</div>
														</li>
													</div>
													<div className="tab_marks_slider_item">
														<li className="general-details">
															<div className="image_section">
																<img
																	src="https://legacy.hubbers.io/uploads/temp/garbage/benjamin-picturejpg-14034.jpg"/>
															</div>
															<div className="member_name">
																<p className="name">Benjamin Vignon</p>
																<p className="country">Average Marks <strong> 1 </strong></p>
															</div>
														</li>
													</div>
												</Slider>
											</div>
										</div>
									</div>
								</TabPanel>
								<TabPanel>
									<div className="marks_heading">
										<div className="tab_marks">
											<div className="tab_marks_heading">
												<h3>All Marks</h3>
											</div>
											<div className="tab_marks_slider_items">
												<Slider {...MarksCarousel}>
													<div className="tab_marks_slider_item">
														<li className="general-details">
															<div className="image_section">
																<img
																	src="https://legacy.hubbers.io/uploads/temp/garbage/benjamin-picturejpg-14034.jpg"/>
															</div>
															<div className="member_name">
																<p className="name">Benjamin Vignon</p>
																<p className="country">Average Marks <strong> 1 </strong></p>
															</div>
														</li>
													</div>
													<div className="tab_marks_slider_item">
														<li className="general-details">
															<div className="image_section">
																<img
																	src="https://legacy.hubbers.io/uploads/temp/garbage/benjamin-picturejpg-14034.jpg"/>
															</div>
															<div className="member_name">
																<p className="name">Benjamin Vignon</p>
																<p className="country">Average Marks <strong> 1 </strong></p>
															</div>
														</li>
													</div>
													<div className="tab_marks_slider_item">
														<li className="general-details">
															<div className="image_section">
																<img
																	src="https://legacy.hubbers.io/uploads/temp/garbage/benjamin-picturejpg-14034.jpg"/>
															</div>
															<div className="member_name">
																<p className="name">Benjamin Vignon</p>
																<p className="country">Average Marks <strong> 1 </strong></p>
															</div>
														</li>
													</div>
													<div className="tab_marks_slider_item">
														<li className="general-details">
															<div className="image_section">
																<img
																	src="https://legacy.hubbers.io/uploads/temp/garbage/benjamin-picturejpg-14034.jpg"/>
															</div>
															<div className="member_name">
																<p className="name">Benjamin Vignon</p>
																<p className="country">Average Marks <strong> 1 </strong></p>
															</div>
														</li>
													</div>
												</Slider>
											</div>
										</div>
									</div>
								</TabPanel>
								<TabPanel>
									<div className="leaderboard_heading">
										<h2>Dashboard</h2>
									</div>
									{/* <LeaderBoard /> */}
								</TabPanel>
							</Tabs>
						</div>
						<div>
							{/*  <ContestAgreement />*/}
						</div>
						<div className="entrie_form">
							<Tabs>
								<TabList>
									<Tab>
										<div className="entrie_form__tabmenu">
											First Entrie
										</div>
									</Tab>
									<Tab>
										<div className="entrie_form__tabmenu">
											Entrie2 (Draft)
										</div>
									</Tab>
								</TabList>
								<TabPanel>
									<div className="first_entrie_form_content">
										<div className="form_content_inner">
											<label>DESCRIBE YOUR ENTRY</label>
											<Input
												name="title"
												placeholder=""
												disabled={true}
												value={this.state.title}
												type={InputType.TEXT}
												onChange={(title: string) => {
													this.setState({title})
												}}/>
											<label>DESIGN FEATURES</label>
											<Input
												name="design"
												placeholder=""
												disabled={true}
												value={this.state.design}
												type={InputType.TEXT}
												onChange={(design: string) => {
													this.setState({design})
												}}/>
											<label>FUNCTIONALITY FEATURES</label>
											<Input
												name="functionality"
												placeholder=""
												disabled={true}
												value={this.state.functionality}
												type={InputType.TEXT}
												onChange={(functionality: string) => {
													this.setState({functionality})
												}}/>
											<label>USABILITY FEATURES</label>
											<Input
												name="usability"
												placeholder=""
												disabled={true}
												value={this.state.usability}
												type={InputType.TEXT}
												onChange={(usability: string) => {
													this.setState({usability})
												}}/>
											<label>MARKET POTENTIAL</label>
											<Input
												name="market"
												placeholder=""
												disabled={true}
												value={this.state.market}
												type={InputType.TEXT}
												onChange={(market: string) => {
													this.setState({market})
												}}/>
										</div>
									</div>
								</TabPanel>
								<TabPanel>
									<div className="first_entrie_form_content">
										<div className="form_content_inner">
											<Input
												name="title"
												placeholder="Please write the title of your project"
												value={this.state.title1}
												type={InputType.TEXT}
												onChange={(title1: string) => {
													this.setState({title1})
												}}/>
											
											<Input
												name="design"
												placeholder="Design features"
												value={this.state.design1}
												type={InputType.TEXT}
												onChange={(design1: string) => {
													this.setState({design1})
												}}/>
											
											<Input
												name="functionality"
												placeholder="Functionality features"
												value={this.state.functionality1}
												type={InputType.TEXT}
												onChange={(functionality1: string) => {
													this.setState({functionality1})
												}}/>
											
											<Input
												name="usability"
												placeholder="Usability features"
												value={this.state.usability1}
												type={InputType.TEXT}
												onChange={(usability1: string) => {
													this.setState({usability1})
												}}/>
											
											<Input
												name="market"
												placeholder="Commercial features"
												value={this.state.market1}
												type={InputType.TEXT}
												onChange={(market1: string) => {
													this.setState({market1})
												}}/>
										</div>
									</div>
								</TabPanel>
							</Tabs>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state: RootState) => ({
	state: state.contestDetail
})

export default connect(mapStateToProps, {
	fetchContestDetail
})(NewContestDetail)