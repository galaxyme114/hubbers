import * as React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'

import { RootState } from '../reducers/index'

interface BusinessNeedsPublicUserProps {
}

interface BusinessNeedsPublicUserState {
	showJobContent: boolean
}

const ImgPath = '/images/'

class BusinessNeedsPublicUser extends React.Component<BusinessNeedsPublicUserProps,
	BusinessNeedsPublicUserState> {
	constructor(props: BusinessNeedsPublicUserProps) {
		super(props)
		this.state = {
			showJobContent: false
		}
	}
	
	public showJobContent = () => {
		this.setState({
			showJobContent: !this.state.showJobContent
		})
	}
	
	public render() {
		return (
			<div className="business_needs_public_user_content_wrapper">
				<Helmet>
					<title>BusinessNeedsPublicUser</title>
				</Helmet>
				<div className="business_needs_public_user_content">
					<div className="business_needs_public_user_content_left">
						<div className="business_needs_public_user_content_left_left">
							<h2 className="job_title">
								Design Mobile app graphics for a simple app
							</h2>
							<p className="job_posted_date">Posted 3 days ago</p>
							<button className="job_posted_category">
								Graphics &amp; Design
							</button>
							<button className="job_posted_category">Logo Design</button>
							<div className="divider"/>
							<div className="job_info_box_wrapper">
								<div className="job_info_box">
									<p>Project Type</p>
									<p>
										<b className="project_ongoing">Ongoing</b>
									</p>
								</div>
								<div className="job_info_box">
									<p>Hours</p>
									<p>
										<b>Hourly</b>
									</p>
								</div>
								<div className="job_info_box">
									<p>Project Lenght</p>
									<p>
										<b>1-3 months</b>
									</p>
								</div>
								<div className="job_info_box">
									<p>Entry level</p>
									<p>
										<b>Lovest rate</b>
									</p>
								</div>
							</div>
							<div className="divider"/>
							<div
								className={
									'job_info' + (this.state.showJobContent ? ' expand' : '')
								}
							>
								<p>
									Lorem ipsum dolor sit amet consectetur adipisicing elit.
									Excepturi iusto aperiam doloribus assumenda, provident facere
									corrupti. Necessitatibus ducimus tenetur totam tempore. Nemo
									suscipit reiciendis laborum ut dolorum dignissimos
									voluptatibus expedita?
								</p>
								<p>
									Art needed:
									<br/>
									Icon <br/>
									3 Screenshots <br/>
									2-3 screens (Mostly they only have 4-5-6 buttons per screen)
								</p>
							</div>
							<button className="read_more_btn" onClick={this.showJobContent}>
								+ Read more
							</button>
							<div className="divider"/>
							<h4 className="job_skills_experience">Skills and experince:</h4>
							<ul className="skills_list">
								<li>Graphic Design</li>
								<li>Icon Design</li>
								<li>Illustrator</li>
								<li>Logo Design</li>
								<li>Photoshop</li>
							</ul>
						</div>
						<div className="business_needs_public_user_content_left_right">
							<div className="business_needs_public_user_content_left_right_head">
								Activity on this job
							</div>
							<div className="business_needs_public_user_content_left_right_body">
								<ul>
									<li>
										Bid range <span>High</span>
									</li>
									<li>$45.00</li>
									<li>Avg.</li>
									<li>$18.08</li>
									<li>Low</li>
									<li>$6.00</li>
								</ul>
								<ul>
									<li>Proposals</li>
									<li>20 to 50</li>
									<li>Last viewed by client</li>
									<li>20 hrs ago</li>
									<li>Interviewing:</li>
									<li>4</li>
									<li>Ivites sent:</li>
									<li>2</li>
									<li>Unanswered invites:</li>
									<li>1</li>
								</ul>
								<button className="bid_button">Bid on project</button>
								<div className="save_share_btns">
									<button>
										<img src={`${ImgPath}save_icon.png`} alt=""/>
										Save
									</button>
									<button>
										<img src={`${ImgPath}share_icon.png`} alt=""/>
										Share
									</button>
								</div>
							</div>
						</div>
					</div>
					<div className="business_needs_public_user_content_right">
						<div className="business_needs_public_user_content_right_head">
							About the employee
						</div>
						<div className="business_needs_public_user_content_right_body">
							<div className="business_needs_public_user_content_right_body_top">
								<div className="employee_img">
									<img src={`${ImgPath}employee_img.png`} alt=""/>
								</div>
								<h3 className="employee_name">hubbers</h3>
								<p className="employee_company">
									Digital transformation agency
								</p>
							</div>
							<div className="business_needs_public_user_content_right_body_bottom">
								<ul>
									<li>
										<img src={`${ImgPath}map_marker_icon.png`} alt=""/>
										From
									</li>
									<li>Argentina</li>
									<li>
										<img src={`${ImgPath}user_icon.gif`} alt=""/>
										Member Since
									</li>
									<li>Jan 2014</li>
									<li>
										<img src={`${ImgPath}clock_icon.gif`} alt=""/>
										Avg. Response Time
									</li>
									<li>3 hours</li>
									<li>
										<img src={`${ImgPath}dollar_icon.gif`} alt=""/>
										Payment method
									</li>
									<li>not verified</li>
								</ul>
								<button className="send_button">Send message</button>
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
)(BusinessNeedsPublicUser)
