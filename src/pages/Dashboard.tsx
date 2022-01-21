import * as React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import Modules from '../containers/Modules'
import Sidebar from '../containers/Sidebar'
import { RootState } from '../reducers/index'

import { Line } from 'react-chartjs-2'

interface DashboardProps {
}

interface DashboardState {
	sideBar: boolean
	chartData: any
	lineChartData: any
	areaChartSelect: any
	modules: boolean
}

class Dashboard extends React.Component<DashboardProps, DashboardState> {
	public areaChartSelectOtions: any = [
		{value: 'Yearly', label: 'Yearly'},
		{value: 'Quaterly', label: 'Quaterly'},
		{value: 'Monthly', label: 'Monthly'},
		{value: 'Weekly', label: 'Weekly'},
		{value: 'daily', label: 'daily'}
	]
	
	private chartOptions: any = {
		legend: {
			display: false,
			position: 'top'
		},
		tooltips: {
			callbacks: {
				label: (tooltipItem: any, data: any) => {
					return [
						' task ' + tooltipItem.yLabel,
						' on progress ' + tooltipItem.yLabel,
						' completed ' + tooltipItem.yLabel
					]
				}
			}
		}
	}
	
	private lineChartOptions: any = {
		legend: {
			display: false,
			position: 'top'
		},
		tooltips: {
			callbacks: {
				label: (tooltipItem: any, data: any) => {
					return [
						' task ' + tooltipItem.yLabel,
						' on progress ' + tooltipItem.yLabel,
						' completed ' + tooltipItem.yLabel
					]
				}
			}
		}
	}
	
	constructor(props: DashboardProps) {
		super(props)
		this.state = {
			sideBar: true,
			areaChartSelect: '',
			chartData: {
				labels: [
					'January',
					'February',
					'March',
					'April',
					'May',
					'June',
					'July',
					'Aug',
					'Sep'
				],
				datasets: [
					{
						label: 'My First dataset',
						fill: true,
						lineTension: 0.1,
						backgroundColor: 'rgba(141, 198, 63,0.4)',
						borderColor: 'rgba(141, 198, 63,1)',
						borderCapStyle: 'butt',
						borderDash: [],
						borderDashOffset: 0.0,
						borderJoinStyle: 'miter',
						pointBorderColor: 'rgba(141, 198, 63,1)',
						pointBackgroundColor: '#fff',
						pointBorderWidth: 1,
						pointHoverRadius: 5,
						pointHoverBackgroundColor: 'rgba(141, 198, 63,1)',
						pointHoverBorderColor: 'rgba(220,220,220,1)',
						pointHoverBorderWidth: 2,
						pointRadius: 1,
						pointHitRadius: 10,
						data: [35, 15, 30, 25, 28, 35, 45, 20, 25, 45, 10, 35, 60, 15, 25]
					}
				]
			},
			lineChartData: {
				labels: [
					'January',
					'February',
					'March',
					'April',
					'May',
					'June',
					'July',
					'Aug',
					'Sep'
				],
				datasets: [
					{
						label: 'My Second dataset',
						fill: false,
						lineTension: 0.1,
						backgroundColor: 'rgba(225, 225, 223,0.4)',
						borderColor: 'rgba(225, 225, 223,1)',
						borderCapStyle: 'butt',
						borderDash: [],
						borderDashOffset: 0.0,
						borderJoinStyle: 'miter',
						pointBorderColor: 'rgba(225, 225, 223,1)',
						pointBackgroundColor: '#fff',
						pointBorderWidth: 1,
						pointHoverRadius: 5,
						pointHoverBackgroundColor: 'rgba(225, 225, 223,1)',
						pointHoverBorderColor: 'rgba(220,220,220,1)',
						pointHoverBorderWidth: 2,
						pointRadius: 1,
						pointHitRadius: 10,
						data: [25, 15, 60, 35, 28, 10, 25, 20, 45, 25, 28, 25, 30, 15, 35]
					},
					{
						label: 'My Third dataset',
						fill: false,
						lineTension: 0.1,
						backgroundColor: 'rgba(141, 198, 63,0.4)',
						borderColor: 'rgba(141, 198, 63,1)',
						borderCapStyle: 'butt',
						borderDash: [],
						borderDashOffset: 0.0,
						borderJoinStyle: 'miter',
						pointBorderColor: 'rgba(141, 198, 63,1)',
						pointBackgroundColor: '#fff',
						pointBorderWidth: 1,
						pointHoverRadius: 5,
						pointHoverBackgroundColor: 'rgba(141, 198, 63,1)',
						pointHoverBorderColor: 'rgba(220,220,220,1)',
						pointHoverBorderWidth: 2,
						pointRadius: 1,
						pointHitRadius: 10,
						data: [35, 15, 30, 25, 28, 35, 45, 20, 25, 45, 10, 35, 60, 15, 25]
					}
				]
			},
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
			<div className="dashboard_content_wrapper">
				<Helmet>
					<title>Dashboard</title>
				</Helmet>
				<div className="dashboard_content_main">
					<Sidebar
						sideBar={this.state.sideBar}
						toggleSidebar={this.toggleSidebar}
						toggleModules={this.toggleModules}
					/>
					
					<div
						className={
							'dashboard_content_main_inner' +
							(!this.state.sideBar ? ' full-width' : '')
						}
					>
						<div className="dashboard_content_main_inner_left">
							<div className="dashboard_content_main_inner_head">
								<div className="dashboard_content_main_inner_head_top">
									<h4 className="dashboard_content_main_inner_head_title">
										Dashboard
									</h4>
									<h6>Hello, User Name!</h6>
									<p>this is your team summary for september 2018</p>
								</div>
								<div className="dashboard_content_main_inner_head_bottom">
									<div className="dashboard_content_main_inner_head_bottom_inner_box">
										<p>Projects</p>
										<h4>4</h4>
									</div>
									<div className="dashboard_content_main_inner_head_bottom_inner_box">
										<p>Task</p>
										<h4>35</h4>
									</div>
									<div className="dashboard_content_main_inner_head_bottom_inner_box">
										<p>Backing</p>
										<h4>3</h4>
									</div>
									<div className="dashboard_content_main_inner_head_bottom_inner_box">
										<p>On progress</p>
										<h4>12</h4>
									</div>
									<div className="dashboard_content_main_inner_head_bottom_inner_box">
										<p>Competed</p>
										<h4>8</h4>
									</div>
									<div className="dashboard_content_main_inner_head_bottom_inner_box">
										<p>Member</p>
										<h4>4</h4>
									</div>
									<div className="dashboard_content_main_inner_head_bottom_inner_box">
										<p>Completeness sore</p>
										<h4>
											75% <span>out of 100%</span>
										</h4>
									</div>
								</div>
							</div>
							<div className="dashboard_content_main_inner_body">
								<div className="dashboard_content_main_inner_body_chart_area_box">
									<div className="dashboard_content_main_inner_body_chart_area_box_top">
										<div className="dashboard_content_main_inner_body_chart_area_box_top_head">
											<h4>Summary</h4>
											{/* <div className="custom_select">
												<Input
													name="select"
													// label="Select"
													placeholder="Select"
													value={this.state.areaChartSelect}
													type={InputType.SELECT}
													options={this.areaChartSelectOtions}
												// onChange={(email: string) => { this.setState({ email }) }}
												/>
											</div> */}
											<select>
												<option value="">Yearly</option>
												<option value="">Quaterly</option>
												<option value="">Monthly</option>
												<option value="">Weekly</option>
												<option value="">daily</option>
											</select>
										</div>
										<Line
											data={this.state.chartData}
											options={this.chartOptions}
										/>
									</div>
									<div className="dashboard_content_main_inner_body_chart_area_box_bottom">
										<div className="dashboard_content_main_inner_body_chart_area_box_bottom_inner_box">
											<p>Total projects</p>
											<h4>34</h4>
										</div>
										<div className="dashboard_content_main_inner_body_chart_area_box_bottom_inner_box">
											<p>Total task</p>
											<h4>2.300</h4>
										</div>
										<div className="dashboard_content_main_inner_body_chart_area_box_bottom_inner_box">
											<div className="chart_box"/>
											<p>Completeness score</p>
											<h4>
												75% <span>out of 100%</span>
											</h4>
										</div>
									</div>
								</div>
								<div className="dashboard_content_main_inner_body_chart_line_box">
									<div className="dashboard_content_main_inner_body_chart_line_box_top">
										<div className="dashboard_content_main_inner_body_chart_line_box_top_head">
											<div className="dashboard_content_main_inner_body_chart_line_box_top_head_left">
												<h4>Work burn down</h4>
												<p>11.11.2019 - 10.11.2019</p>
											</div>
											<div className="dashboard_content_main_inner_body_chart_line_box_top_head_right">
												<select>
													<option value="">Sprint 12</option>
													<option value="">Sprint 13</option>
													<option value="">Sprint 14</option>
													<option value="">Sprint 15</option>
													<option value="">Sprint 16</option>
												</select>
											</div>
										</div>
										<Line
											data={this.state.lineChartData}
											options={this.lineChartOptions}
										/>
										<div className="dashboard_content_main_inner_body_chart_line_box_top_foot">
											<div className="dashboard_content_main_inner_body_chart_line_box_top_foot_inner_box">
												<h3>12</h3>
												<p>Stories</p>
											</div>
											<div className="dashboard_content_main_inner_body_chart_line_box_top_foot_inner_box">
												<h3>78</h3>
												<p>Points</p>
											</div>
											<div className="dashboard_content_main_inner_body_chart_line_box_top_foot_inner_box">
												<h3>76</h3>
												<p>Points done</p>
											</div>
										</div>
									</div>
									<div className="dashboard_content_main_inner_body_chart_line_box_bottom">
										<div className="dashboard_content_main_inner_body_chart_line_box_bottom_inner_box">
											<div className="dashboard_content_main_inner_body_chart_line_box_bottom_inner_box_left">
												<p>Backlog Zero</p>
												<h4>ca. 6 sprints</h4>
											</div>
											<div className="dashboard_content_main_inner_body_chart_line_box_bottom_inner_box_right">
												<input
													type="checkbox"
													id="black-zero"
													className="custom-styled-checkbox"
												/>
												<label
													htmlFor="black-zero"
													className="custom-styled-label"
												/>
											</div>
										</div>
										<div className="dashboard_content_main_inner_body_chart_line_box_bottom_inner_box">
											<div className="dashboard_content_main_inner_body_chart_line_box_bottom_inner_box_left">
												<p>Done pointst</p>
												<h4>234</h4>
											</div>
											<div className="dashboard_content_main_inner_body_chart_line_box_bottom_inner_box_right">
												<input
													type="checkbox"
													id="done-pointst"
													className="custom-styled-checkbox"
												/>
												<label
													htmlFor="done-pointst"
													className="custom-styled-label"
												/>
											</div>
										</div>
										<div className="dashboard_content_main_inner_body_chart_line_box_bottom_inner_box">
											<div className="dashboard_content_main_inner_body_chart_line_box_bottom_inner_box_left">
												<p>Open points</p>
												<h4>23</h4>
											</div>
											<div className="dashboard_content_main_inner_body_chart_line_box_bottom_inner_box_right">
												<input
													type="checkbox"
													id="open-points"
													className="custom-styled-checkbox"
												/>
												<label
													htmlFor="open-points"
													className="custom-styled-label"
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="dashboard_content_main_inner_right">
							<div className="dashboard_content_main_inner_right_inner_box">
								<div className="dashboard_content_main_inner_right_inner_box_head">
									<img src="/images/expert-2.png" alt=""/>
									<h2>Benjamin Hartman</h2>
									<p>Copywriting and social media expert</p>
								</div>
								<div className="divider"/>
								<div className="dashboard_content_main_inner_right_inner_box_body">
									<span>from</span>
									<span>
										<b>Canada</b>
									</span>
									<span>member since</span>
									<span>
										<b>September 2019</b>
									</span>
									<span>profession</span>
									<span>
										<b>Copywritter</b>
									</span>
								</div>
								<div className="divider"/>
								<div className="dashboard_content_main_inner_right_inner_box_foot">
									<p>
										Hello! Lorem ipsum dolor sit amet consectetur adipisicing
										elit. Exercitationem, consequatur fugit totam aspernatur
										nulla accusamus, laudantium eveniet ducimus autem
										reprehenderit possimus. Quaerat exercitationem, rerum
										aspernatur sequi eligendi voluptatibus dicta alias?
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<Modules
					modules={this.state.modules}
					toggleModules={this.toggleModules}
				/>
			</div>
		)
	}
}

const mapStateToProps = (state: RootState) => ({})

export default connect(
	mapStateToProps,
	{}
)(Dashboard)
