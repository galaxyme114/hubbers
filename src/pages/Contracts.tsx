import * as React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import Input from '../components/Input'
import { InputType } from '../constants/enums'
import Sidebar from '../containers/Sidebar'
import { RootState } from '../reducers/index'

interface ContractsProps {
}

interface ContractsState {
	comment: string
	text: string
	showFullContent: boolean
	sideBar: boolean
	modules: boolean
}

class Contracts extends React.Component<ContractsProps, ContractsState> {
	constructor(props: ContractsProps) {
		super(props)
		this.state = {
			comment: '',
			text: '',
			showFullContent: false,
			sideBar: true,
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
	
	public render() {
		
		return (
			<div className="contracts_content_wrapper">
				<Helmet>
					<title>Contracts</title>
				</Helmet>
				<div className="contracts_content_main">
					<Sidebar sideBar={this.state.sideBar} toggleSidebar={this.toggleSidebar} toggleModules={this.toggleModules}/>
					<div className={'contracts_content_main_inner' + (!this.state.sideBar ? ' full-width' : '')}>
						<div className="contracts_content_main_inner_left">
							<div className="contracts_content_main_inner_head">
								<h4 className="contracts_content_main_inner_head_title">Contracts</h4>
								<div className="search_box">
									<Input
										name="search_bar"
										placeholder="Search"
										value={this.state.text}
										type={InputType.TEXT}
										onChange={(text: string) => {
											this.setState({text})
										}}
									/>
									<img src="/images/sidebar/search.png" className="search_icon"/>
								</div>
							</div>
							
							<div className="contracts_content_main_inner_body contract_card_wraper">
								
								<div className="contract_card_wraper_inner">
									<div className="contract_card_wraper_inner_top">
										<div className="contract_card_left">
											<img src="/images/messages.png" className="user_profile_image"/>
										</div>
										<div className="contract_card_right">
											<div className="contract_card_right_top">
												<span>Comapany name</span>
												<span>$30.000</span>
											</div>
											<div className="contract_card_right_bottom">
												<span>digital marketing</span>
												<span>fixed price</span>
											</div>
										</div>
									</div>
									<div className="contract_card_wraper_inner_bottom">
										<div className="contract_card_wraper_inner_bottom_left">Type <b>Expertise</b></div>
										<div className="contract_card_wraper_inner_bottom_right">
											<span>View terms</span>
											<img src="/images/download-icon.png" className="download-icon" alt="download icon"/>
										</div>
									</div>
								</div>
								<div className="contract_card_wraper_inner">
									<div className="contract_card_wraper_inner_top">
										<div className="contract_card_left">
											<img src="/images/messages.png" className="user_profile_image"/>
										</div>
										<div className="contract_card_right">
											<div className="contract_card_right_top">
												<span>Comapany name</span>
												<span>$30.000</span>
											</div>
											<div className="contract_card_right_bottom">
												<span>digital marketing</span>
												<span>fixed price</span>
											</div>
										</div>
									</div>
									<div className="contract_card_wraper_inner_bottom">
										<div className="contract_card_wraper_inner_bottom_left">Type <b>Expertise</b></div>
										<div className="contract_card_wraper_inner_bottom_right">
											<span>View terms</span>
											<img src="/images/download-icon.png" className="download-icon" alt="download icon"/>
										</div>
									</div>
								</div>
								<div className="contract_card_wraper_inner">
									<div className="contract_card_wraper_inner_top">
										<div className="contract_card_left">
											<img src="/images/messages.png" className="user_profile_image"/>
										</div>
										<div className="contract_card_right">
											<div className="contract_card_right_top">
												<span>Comapany name</span>
												<span>$30.000</span>
											</div>
											<div className="contract_card_right_bottom">
												<span>digital marketing</span>
												<span>fixed price</span>
											</div>
										</div>
									</div>
									<div className="contract_card_wraper_inner_bottom">
										<div className="contract_card_wraper_inner_bottom_left">Type <b>Expertise</b></div>
										<div className="contract_card_wraper_inner_bottom_right">
											<span>View terms</span>
											<img src="/images/download-icon.png" className="download-icon" alt="download icon"/>
										</div>
									</div>
								</div>
								<div className="contract_card_wraper_inner">
									<div className="contract_card_wraper_inner_top">
										<div className="contract_card_left">
											<img src="/images/messages.png" className="user_profile_image"/>
										</div>
										<div className="contract_card_right">
											<div className="contract_card_right_top">
												<span>Comapany name</span>
												<span>$30.000</span>
											</div>
											<div className="contract_card_right_bottom">
												<span>digital marketing</span>
												<span>fixed price</span>
											</div>
										</div>
									</div>
									<div className="contract_card_wraper_inner_bottom">
										<div className="contract_card_wraper_inner_bottom_left">Type <b>Expertise</b></div>
										<div className="contract_card_wraper_inner_bottom_right">
											<span>View terms</span>
											<img src="/images/download-icon.png" className="download-icon" alt="download icon"/>
										</div>
									</div>
								</div>
								<div className="contract_card_wraper_inner">
									<div className="contract_card_wraper_inner_top">
										<div className="contract_card_left">
											<img src="/images/messages.png" className="user_profile_image"/>
										</div>
										<div className="contract_card_right">
											<div className="contract_card_right_top">
												<span>Comapany name</span>
												<span>$30.000</span>
											</div>
											<div className="contract_card_right_bottom">
												<span>digital marketing</span>
												<span>fixed price</span>
											</div>
										</div>
									</div>
									<div className="contract_card_wraper_inner_bottom">
										<div className="contract_card_wraper_inner_bottom_left">Type <b>Expertise</b></div>
										<div className="contract_card_wraper_inner_bottom_right">
											<span>View terms</span>
											<img src="/images/download-icon.png" className="download-icon" alt="download icon"/>
										</div>
									</div>
								</div>
								<div className="contract_card_wraper_inner">
									<div className="contract_card_wraper_inner_top">
										<div className="contract_card_left">
											<img src="/images/messages.png" className="user_profile_image"/>
										</div>
										<div className="contract_card_right">
											<div className="contract_card_right_top">
												<span>Comapany name</span>
												<span>$30.000</span>
											</div>
											<div className="contract_card_right_bottom">
												<span>digital marketing</span>
												<span>fixed price</span>
											</div>
										</div>
									</div>
									<div className="contract_card_wraper_inner_bottom">
										<div className="contract_card_wraper_inner_bottom_left">Type <b>Expertise</b></div>
										<div className="contract_card_wraper_inner_bottom_right">
											<span>View terms</span>
											<img src="/images/download-icon.png" className="download-icon" alt="download icon"/>
										</div>
									</div>
								</div>
								<div className="contract_card_wraper_inner">
									<div className="contract_card_wraper_inner_top">
										<div className="contract_card_left">
											<img src="/images/messages.png" className="user_profile_image"/>
										</div>
										<div className="contract_card_right">
											<div className="contract_card_right_top">
												<span>Comapany name</span>
												<span>$30.000</span>
											</div>
											<div className="contract_card_right_bottom">
												<span>digital marketing</span>
												<span>fixed price</span>
											</div>
										</div>
									</div>
									<div className="contract_card_wraper_inner_bottom">
										<div className="contract_card_wraper_inner_bottom_left">Type <b>Expertise</b></div>
										<div className="contract_card_wraper_inner_bottom_right">
											<span>View terms</span>
											<img src="/images/download-icon.png" className="download-icon" alt="download icon"/>
										</div>
									</div>
								</div>
								<div className="contract_card_wraper_inner">
									<div className="contract_card_wraper_inner_top">
										<div className="contract_card_left">
											<img src="/images/messages.png" className="user_profile_image"/>
										</div>
										<div className="contract_card_right">
											<div className="contract_card_right_top">
												<span>Comapany name</span>
												<span>$30.000</span>
											</div>
											<div className="contract_card_right_bottom">
												<span>digital marketing</span>
												<span>fixed price</span>
											</div>
										</div>
									</div>
									<div className="contract_card_wraper_inner_bottom">
										<div className="contract_card_wraper_inner_bottom_left">Type <b>Expertise</b></div>
										<div className="contract_card_wraper_inner_bottom_right">
											<span>View terms</span>
											<img src="/images/download-icon.png" className="download-icon" alt="download icon"/>
										</div>
									</div>
								</div>
								<div className="contract_card_wraper_inner">
									<div className="contract_card_wraper_inner_top">
										<div className="contract_card_left">
											<img src="/images/messages.png" className="user_profile_image"/>
										</div>
										<div className="contract_card_right">
											<div className="contract_card_right_top">
												<span>Comapany name</span>
												<span>$30.000</span>
											</div>
											<div className="contract_card_right_bottom">
												<span>digital marketing</span>
												<span>fixed price</span>
											</div>
										</div>
									</div>
									<div className="contract_card_wraper_inner_bottom">
										<div className="contract_card_wraper_inner_bottom_left">Type <b>Expertise</b></div>
										<div className="contract_card_wraper_inner_bottom_right">
											<span>View terms</span>
											<img src="/images/download-icon.png" className="download-icon" alt="download icon"/>
										</div>
									</div>
								</div>
								<div className="contract_card_wraper_inner">
									<div className="contract_card_wraper_inner_top">
										<div className="contract_card_left">
											<img src="/images/messages.png" className="user_profile_image"/>
										</div>
										<div className="contract_card_right">
											<div className="contract_card_right_top">
												<span>Comapany name</span>
												<span>$30.000</span>
											</div>
											<div className="contract_card_right_bottom">
												<span>digital marketing</span>
												<span>fixed price</span>
											</div>
										</div>
									</div>
									<div className="contract_card_wraper_inner_bottom">
										<div className="contract_card_wraper_inner_bottom_left">Type <b>Expertise</b></div>
										<div className="contract_card_wraper_inner_bottom_right">
											<span>View terms</span>
											<img src="/images/download-icon.png" className="download-icon" alt="download icon"/>
										</div>
									</div>
								</div>
							
							</div>
						</div>
						<div className="contracts_content_main_inner_right">
							<div className="contracts_content_main_inner_head">
								<button className="button solid">Download contract</button>
								<button className="button outline">Export to PDF</button>
								<button className="button outline">Save</button>
							</div>
							<div className="contracts_content_main_inner_body contracts_detail_box">
								<div className="contracts_detail_box_inner company_section">
									<div className="contract_card_wraper_inner">
										<div className="contract_card_wraper_inner_top_box">
											<div className="contract_card_wraper_inner_top">
												<div className="contract_card_left">
													<img src="/images/messages.png" className="user_profile_image"/>
												</div>
												<div className="contract_card_right">
													<div className="contract_card_right_top">
														<span>Comapany name</span>
														<span>$30.000</span>
													</div>
													<div className="contract_card_right_bottom">
														<span>digital marketing</span>
														<span>fixed price</span>
													</div>
												</div>
											</div>
											<div className="contract_card_wraper_inner_bottom">
												<div className="contract_card_wraper_inner_bottom_inner">
													<span>Contract type</span>
													<b>Global partnership</b>
												</div>
												<div className="contract_card_wraper_inner_bottom_inner">
													<span>Date</span>
													<b>March 11, 2019</b>
												</div>
												<div className="contract_card_wraper_inner_bottom_inner">
													<span>Date</span>
													<b>March 11, 2019</b>
												</div>
												<div className="contract_card_wraper_inner_bottom_inner">
													<span>Duration</span>
													<b>2 months</b>
												</div>
											</div>
										</div>
										<div className="contract_card_wraper_inner_bottom_box">
											<div className="contract_card_wraper_inner_bottom_box_left">
												<div className="contract_card_wraper_inner_bottom_box_inner_box">
													<h5>Part one</h5>
													<h5>Corner Corp</h5>
													<p>13 AV de la Liberation</p>
													<p>79 000 paris</p>
													<p>Siret: 098 756 766</p>
												</div>
												<div className="contract_card_wraper_inner_bottom_box_inner_box">
													<h5>with</h5>
													<h5>Periscop digital</h5>
													<p>13 AV de la Liberation</p>
													<p>79 000 paris</p>
													<p>Siret: 098 756 766</p>
												</div>
											</div>
											<div className="contract_card_wraper_inner_bottom_box_right">
												<div className="contract_card_wraper_inner_bottom_box_inner_box">
													<h5>Contact Person</h5>
													<h5>Hermal Hill</h5>
													<p>Marketing Director</p>
													<p>03 04 04 95 95</p>
													<p>herma@gmail.com</p>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="contracts_detail_box_inner terms_section">
									<h5 className="terms_section_title">Terms</h5>
									<div className={'terms_section_content ' + (this.state.showFullContent ? 'expand' : '')}>
										<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, eum voluptate, at suscipit,
											cum ut nostrum adipisci veritatis quis impedit debitis quos. Veritatis adipisci obcaecati
											esse accusantium autem non sunt? cum ut nostrum adipisci veritatis quis impedit
											debitis quos. Veritatis adipisci obcaecati esse accusantium autem non sunt?
										</p>
										<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, eum voluptate, at suscipit,
											cum ut nostrum adipisci veritatis quis impedit debitis quos. Veritatis adipisci obcaecati
											esse accusantium autem non sunt? cum ut nostrum adipisci veritatis quis impedit
											debitis quos. Veritatis adipisci obcaecati esse accusantium autem non sunt?
										</p>
									</div>
									<div className="view_more_button_box">
										<button className="view_more_button"
										        onClick={() => this.setState({showFullContent: !this.state.showFullContent})}
										>View more
										</button>
									</div>
								</div>
								<div className="contracts_detail_box_inner timeline_section">
									<h5 className="timeline_section_title">Timeline</h5>
									<div className="timeline_section_inner">
										<div className="timeline_section_inner_box">
											<h4>March 2019</h4>
											<div className="dates">
												<span>1</span>
												<span>2</span>
												<span>3</span>
												<span>4</span>
												<span>5</span>
												<span>6</span>
												<span>7</span>
												<span className="active">8</span>
												<span>9</span>
												<span>10</span>
												<span>11</span>
												<span>12</span>
												<span>13</span>
												<span>14</span>
												<span>15</span>
												<span>16</span>
												<span>17</span>
												<span>18</span>
												<span>19</span>
												<span>20</span>
												<span>21</span>
												<span>22</span>
												<span>23</span>
												<span>24</span>
												<span>25</span>
												<span>26</span>
												<span>27</span>
												<span>28</span>
												<span>29</span>
												<span>30</span>
												<span>31</span>
											</div>
										</div>
										<div className="timeline_section_inner_box">
											<h4>April 2019</h4>
											<div className="dates">
												<span>1</span>
												<span>2</span>
												<span>3</span>
												<span>4</span>
												<span>5</span>
												<span>6</span>
												<span>7</span>
												<span>8</span>
												<span>9</span>
												<span>10</span>
												<span>11</span>
												<span>12</span>
												<span>13</span>
												<span>14</span>
												<span>15</span>
												<span>16</span>
												<span>17</span>
												<span>18</span>
												<span>19</span>
												<span>20</span>
												<span>21</span>
												<span>22</span>
												<span>23</span>
												<span>24</span>
												<span>25</span>
												<span>26</span>
												<span>27</span>
												<span>28</span>
												<span>29</span>
												<span>30</span>
												<span>31</span>
											</div>
										</div>
									</div>
									<div className="timeline_section_progress_bar">
										<div className="timeline_section_progress_bar_status">Begining of the contract</div>
									</div>
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

export default connect(mapStateToProps, {})(Contracts)