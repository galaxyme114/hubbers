import * as React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import Sidebar from '../containers/Sidebar'
import { RootState } from '../reducers/index'

const ImgPath = '/images/'

const Step1Content = [
	{
		id: 1,
		img: 'plug',
		title: 'Electrical Design'
	},
	{
		id: 2,
		img: 'tools-and-utensils',
		title: 'Mechanical Design'
	},
	{
		id: 3,
		img: 'processor',
		title: 'Embedded Firmware'
	},
	{
		id: 4,
		img: 'smartphone',
		title: 'Mobile Application'
	},
	{
		id: 5,
		img: 'gear',
		title: 'Software'
	}
]
const Step2Content = [
	{
		img: 'headphones',
		title: 'Audio'
	},
	{
		img: 'fashion',
		title: 'Clothing And Apparel'
	},
	{
		img: 'plug',
		title: 'Electronics'
	},
	{
		img: 'barbell',
		title: 'Fitness'
	},
	{
		img: 'heart',
		title: 'Heart & Beauty'
	},
	{
		img: 'washing-machine',
		title: 'Household Appliances'
	},
	{
		img: 'puzzle',
		title: 'Indoor Games'
	},
	{
		img: 'kitchen',
		title: 'kitchen & Dining'
	},
	{
		img: 'lawn-mower',
		title: 'Lawn & Garden'
	},
	{
		img: 'luggage',
		title: 'Luggage and Travel'
	},
	{
		img: 'outdoor-activity',
		title: 'Outdoor Recreation'
	},
	{
		img: 'social-care',
		title: 'Personal Care'
	},
	{
		img: 'cat',
		title: 'Pet Supplies'
	},
	{
		img: 'tyre',
		title: 'Vechicle Parts & Accessories'
	},
	{
		img: 'bed',
		title: 'Furniture'
	}
]
const Step3Content = [
	{
		img: 'connection',
		title: 'Connected'
	},
	{
		img: 'artist',
		title: 'Artistic Design'
	},
	{
		img: 'growth',
		title: 'Eco Friendly'
	},
	{
		img: 'budget',
		title: 'Low Cost'
	},
	{
		img: 'folder',
		title: 'Unusual Materials'
	},
	{
		img: 'briefcase',
		title: 'New Hi-tech Materials'
	},
	{
		img: 'psychiatry',
		title: 'New Function'
	}
]
const Step4Content = [
	{
		img: 'bluetooth',
		title: 'Bluetooth'
	},
	{
		img: 'wifi',
		title: 'Wifi'
	},
	{
		img: 'wifi-open',
		title: 'Cellula'
	},
	{
		img: 'satellite',
		title: 'Satellite'
	},
	{
		img: 'error',
		title: 'Not sure'
	},
	{
		img: 'speech-bubble',
		title: 'No communication'
	}
]
const Step5Content = [
	{
		ChemicalSensor: [
			{
				img: 'fan',
				title: 'Air Quality'
			},
			{
				img: 'clean',
				title: 'Water Quality'
			},
			{
				img: 'humidity',
				title: 'Humidity/Moisture'
			}
		]
	},
	{
		MotionSensor: [
			{
				img: 'speedometer',
				title: 'Accelerometer'
			},
			{
				img: 'icons8-gyroscope-filled-50',
				title: 'Gyroscope'
			},
			{
				img: 'icons8-proximity-sensor-100',
				title: 'Proximity'
			},
			{
				img: 'map-location',
				title: 'GPS'
			}
		]
	},
	{
		Other: [
			{
				img: 'plug',
				title: 'Electrical'
			},
			{
				img: 'electric-meter',
				title: 'Force/Pressure'
			},
			{
				img: 'vision',
				title: 'Optical'
			},
			{
				img: 'thermometer',
				title: 'Temprature'
			},
			{
				img: 'speaker',
				title: 'Acoustic/Sound'
			},
			{
				img: 'error',
				title: 'Not Applicable'
			},
			{
				img: 'error',
				title: 'Not sure'
			}
		]
	}
]
const Step6Content = [
	{
		img: 'keyboard',
		title: 'Keyboard or Keypad'
	},
	{
		img: 'mobile-app',
		title: 'Touch Screen'
	},
	{
		img: 'double-tap-stroke-gesture-of-two-fingers',
		title: 'Gesture Recognition'
	},
	{
		img: 'sensor',
		title: 'High Performation Motion Sensing'
	},
	{
		img: 'camera',
		title: 'Photo or Video Capturing'
	},
	{
		img: 'microphone',
		title: 'Voice Recognition'
	},
	{
		img: 'error',
		title: 'Not Applicable'
	},
	{
		img: 'error',
		title: 'Not Sure'
	}
]
const Step7Content = [
	{
		img: 'led',
		title: 'Indicator LEDs'
	},
	{
		img: 'tv',
		title: 'Display Screen'
	},
	{
		img: 'error',
		title: 'Not Applicable'
	},
	{
		img: 'error',
		title: 'Not Sure'
	}
]
const Step8Content = [
	{
		img: 'battery',
		title: 'Disposable Batteries'
	},
	{
		img: 'battery-charging',
		title: 'Rechargeable Battery'
	},
	{
		img: 'rechargeable-battery',
		title: 'Rechargeable Battery Removable'
	},
	{
		img: 'charging',
		title: 'Wired Power Connection'
	},
	{
		img: 'error',
		title: 'Not sure'
	}
]
const Step9Content = [
	{
		img: 'mobile-app',
		title: 'Mobile App'
	},
	{
		img: 'cloud-computing',
		title: 'Cloud Cloud'
	},
	{
		img: 'cloud-computing-1',
		title: 'Computer or Server'
	},
	{
		img: 'biometric-recognition',
		title: 'Identical Product'
	},
	{
		img: 'visibility',
		title: 'Non-Identical Product'
	},
	{
		img: 'error',
		title: 'None'
	}
]

interface ProductDefinitionProps {
}

interface ProductDefinitionState {
	comment: string
	text: string
	showFullContent: boolean
	sideBar: boolean
	showExperts: boolean
	showActivityHistory: boolean
	chatBoxTabIndex: number
	currentStep: number
	modules: boolean
	// Step1Content: any
	// filterStatus: any
}

class ProductDefinition extends React.Component<ProductDefinitionProps,
	ProductDefinitionState> {
	constructor(props: ProductDefinitionProps) {
		super(props)
		this.state = {
			comment: '',
			text: '',
			showFullContent: false,
			sideBar: true,
			showExperts: false,
			showActivityHistory: false,
			chatBoxTabIndex: 0,
			currentStep: 1,
			modules: false
			// Step1Content: { Step1Content },
			// filterStatus: ''
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
	public nextStep = () => {
		if (this.state.currentStep !== 9) {
			this.setState({
				currentStep: this.state.currentStep + 1
			})
		}
	}
	public previousStep = () => {
		if (this.state.currentStep !== 1) {
			this.setState({
				currentStep: this.state.currentStep - 1
			})
		}
	}
	
	/*
	public addActiveClass = (i: any, content: any) => {
		if (content.isAdd) {
			content.isAdd = false
		} else {
			content.isAdd = true
		}
		if (content.isAddcheckout) {
			content.isAddcheckout = false
		} else {
			content.isAddcheckout = true
		}
		content.quantity = Number(content.quantity) + Number(1)
		const newArray = content // if isChecked is true
			? [...this.state.Step1Content, content] // add element
			: [...this.state.Step1Content].filter(e => e !== content) // remove the elements that are equal to newStatus
		this.setState({ filterStatus: newArray })
	}
	*/
	public render() {
		return (
			<div className="product_definition_content_wrapper">
				<Helmet>
					<title>Product Definition</title>
				</Helmet>
				<div className="product_definition_content_main">
					{/* Sidebar */}
					<Sidebar
						sideBar={this.state.sideBar}
						toggleSidebar={this.toggleSidebar}
						toggleModules={this.toggleModules}
					/>
					{/* Main Content Inner */}
					<div
						className={
							'product_definition_content_main_inner' +
							(!this.state.sideBar ? ' full-width' : '')
						}
					>
						{/* Main Content Inner Left */}
						<div
							className={
								'product_definition_content_main_inner_left' +
								(this.state.showExperts || this.state.showActivityHistory
									? ' sidebar_active'
									: '')
							}
						>
							{/* Main Content Inne Left Header */}
							<div className="product_definition_content_main_inner_left_header">
								<div className="product_definition_content_main_inner_left_header_left">
									<h2 className="product_definition_content_main_inner_left_header_left_title">
										Product Definition
									</h2>
								</div>
								<div className="product_definition_content_main_inner_left_header_right">
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
							<div className="product_definition_content_main_inner_left_body">
								{/* Steps */}
								<div className="steps_count">
									<div className="steps_count_text">
										{this.state.currentStep} OF 9
									</div>
									<div className="steps_count_indicator">
										<span
											className={this.state.currentStep === 1 ? 'active' : ''}
										/>
										<span
											className={this.state.currentStep === 2 ? 'active' : ''}
										/>
										<span
											className={this.state.currentStep === 3 ? 'active' : ''}
										/>
										<span
											className={this.state.currentStep === 4 ? 'active' : ''}
										/>
										<span
											className={this.state.currentStep === 5 ? 'active' : ''}
										/>
										<span
											className={this.state.currentStep === 6 ? 'active' : ''}
										/>
										<span
											className={this.state.currentStep === 7 ? 'active' : ''}
										/>
										<span
											className={this.state.currentStep === 8 ? 'active' : ''}
										/>
										<span
											className={this.state.currentStep === 9 ? 'active' : ''}
										/>
									</div>
								</div>
								
								<div className="product_definition_content_main_inner_left_body_inner">
									{this.state.currentStep === 1 && (
										<React.Fragment>
											<div className="product_definition_content_main_inner_left_body_inner_top">
												<h2 className="product_definition_content_main_inner_left_body_inner_top_title">
													Select the domains where your product need development
												</h2>
											</div>
											<div className="product_definition_content_main_inner_left_body_inner_middle">
												{Step1Content.map((content, i) => (
													<div className="product_definition_card" key={i}>
														<img
															src={`${ImgPath}product-definition-icon/${
																content.img
																}.png`}
															className="product_definition_card_img"
														/>
														<h4 className="product_definition_card_title">
															{content.title}
														</h4>
														<div className="product_definition_card_checkbox"/>
													</div>
												))}
												{/* Other */}
												<div className="product_definition_other">
													<div className="product_definition_other_inner">
														<div className="product_definition_other_inner_left">
															<div className="product_definition_card_checkbox">
																<input type="checkbox" id="ed"/>
																<label htmlFor="ed"/>
															</div>
															<h5>Other</h5>
														</div>
														<div className="product_definition_other_inner_right">
															<input type="text"/>
														</div>
													</div>
												</div>
											</div>
										</React.Fragment>
									)}
									{this.state.currentStep === 2 && (
										<div className="product_definition_content_main_inner_left_body_inner_middle">
											<React.Fragment>
												<div className="product_definition_content_main_inner_left_body_inner_top">
													<h2 className="product_definition_content_main_inner_left_body_inner_top_title">
														Choose the best product category that match your
														project
													</h2>
												</div>
												<div className="product_definition_content_main_inner_left_body_inner_middle">
													{Step2Content.map((content, i) => (
														<div className="product_definition_card" key={i}>
															<img
																src={`${ImgPath}product-definition-icon/${
																	content.img
																	}.png`}
																className="product_definition_card_img"
															/>
															<h4 className="product_definition_card_title">
																{content.title}
															</h4>
															<div className="product_definition_card_checkbox"/>
														</div>
													))}
													{/* Other */}
													<div className="product_definition_other">
														<div className="product_definition_other_inner">
															<div className="product_definition_other_inner_left">
																<div className="product_definition_card_checkbox">
																	<input type="checkbox" id="ed"/>
																	<label htmlFor="ed"/>
																</div>
																<h5>Other</h5>
															</div>
															<div className="product_definition_other_inner_right">
																<input type="text"/>
															</div>
														</div>
													</div>
												</div>
											</React.Fragment>
										</div>
									)}
									{this.state.currentStep === 3 && (
										<div className="product_definition_content_main_inner_left_body_inner_middle">
											<React.Fragment>
												<div className="product_definition_content_main_inner_left_body_inner_top">
													<h2 className="product_definition_content_main_inner_left_body_inner_top_title">
														Choose the best Innovation Category for your project
													</h2>
												</div>
												<div className="product_definition_content_main_inner_left_body_inner_middle">
													{Step3Content.map((content, i) => (
														<div className="product_definition_card" key={i}>
															<img
																src={`${ImgPath}product-definition-icon/${
																	content.img
																	}.png`}
																className="product_definition_card_img"
															/>
															<h4 className="product_definition_card_title">
																{content.title}
															</h4>
															<div className="product_definition_card_checkbox"/>
														</div>
													))}
													{/* Other */}
													<div className="product_definition_other">
														<div className="product_definition_other_inner">
															<div className="product_definition_other_inner_left">
																<div className="product_definition_card_checkbox">
																	<input type="checkbox" id="ed"/>
																	<label htmlFor="ed"/>
																</div>
																<h5>Other Function</h5>
															</div>
															<div className="product_definition_other_inner_right">
																<input type="text"/>
															</div>
														</div>
													</div>
												</div>
											</React.Fragment>
										</div>
									)}
									{this.state.currentStep === 4 && (
										<div className="product_definition_content_main_inner_left_body_inner_middle">
											<React.Fragment>
												<div className="product_definition_content_main_inner_left_body_inner_top">
													<h2 className="product_definition_content_main_inner_left_body_inner_top_title">
														What kind of communication will be used?
													</h2>
												</div>
												<div className="product_definition_content_main_inner_left_body_inner_middle">
													{Step4Content.map((content, i) => (
														<div className="product_definition_card" key={i}>
															<img
																src={`${ImgPath}product-definition-icon/${
																	content.img
																	}.png`}
																className="product_definition_card_img"
															/>
															<h4 className="product_definition_card_title">
																{content.title}
															</h4>
															<div className="product_definition_card_checkbox"/>
														</div>
													))}
													{/* Other */}
													<div className="product_definition_other">
														<div className="product_definition_other_inner">
															<div className="product_definition_other_inner_left">
																<div className="product_definition_card_checkbox">
																	<input type="checkbox" id="ed"/>
																	<label htmlFor="ed"/>
																</div>
																<h5>Other</h5>
															</div>
															<div className="product_definition_other_inner_right">
																<input type="text"/>
															</div>
														</div>
													</div>
												</div>
											</React.Fragment>
										</div>
									)}
									{this.state.currentStep === 5 && (
										<div className="product_definition_content_main_inner_left_body_inner_middle">
											<React.Fragment>
												<div className="product_definition_content_main_inner_left_body_inner_top">
													<h2 className="product_definition_content_main_inner_left_body_inner_top_title">
														What enviroment sensors does the product need?
													</h2>
												</div>
												<div className="product_definition_content_main_inner_left_body_inner_middle">
													<h3 className="product_definition_content_main_inner_left_body_inner_middle__section_title">
														Chemical Sensor
													</h3>
													{Step5Content[0].ChemicalSensor.map((content, i) => (
														<div className="product_definition_card" key={i}>
															<img
																src={`${ImgPath}product-definition-icon/${
																	content.img
																	}.png`}
																className="product_definition_card_img"
															/>
															<h4 className="product_definition_card_title">
																{content.title}
															</h4>
															<div className="product_definition_card_checkbox"/>
														</div>
													))}
													<h3 className="product_definition_content_main_inner_left_body_inner_middle__section_title">
														Motion Sensor
													</h3>
													{Step5Content[1].MotionSensor.map((content, i) => (
														<div className="product_definition_card" key={i}>
															<img
																src={`${ImgPath}product-definition-icon/${
																	content.img
																	}.png`}
																className="product_definition_card_img"
															/>
															<h4 className="product_definition_card_title">
																{content.title}
															</h4>
															<div className="product_definition_card_checkbox"/>
														</div>
													))}
													<h3 className="product_definition_content_main_inner_left_body_inner_middle__section_title">
														Other
													</h3>
													{Step5Content[2].Other.map((content, i) => (
														<div className="product_definition_card" key={i}>
															<img
																src={`${ImgPath}product-definition-icon/${
																	content.img
																	}.png`}
																className="product_definition_card_img"
															/>
															<h4 className="product_definition_card_title">
																{content.title}
															</h4>
															<div className="product_definition_card_checkbox"/>
														</div>
													))}
													{/* Other */}
													<div className="product_definition_other">
														<div className="product_definition_other_inner">
															<div className="product_definition_other_inner_left">
																<div className="product_definition_card_checkbox">
																	<input type="checkbox" id="ed"/>
																	<label htmlFor="ed"/>
																</div>
																<h5>Other</h5>
															</div>
															<div className="product_definition_other_inner_right">
																<input type="text"/>
															</div>
														</div>
													</div>
												</div>
											</React.Fragment>
										</div>
									)}
									{this.state.currentStep === 6 && (
										<div className="product_definition_content_main_inner_left_body_inner_middle">
											<React.Fragment>
												<div className="product_definition_content_main_inner_left_body_inner_top">
													<h2 className="product_definition_content_main_inner_left_body_inner_top_title">
														What kind of hardware interface will be used
													</h2>
												</div>
												<div className="product_definition_content_main_inner_left_body_inner_middle">
													{Step6Content.map((content, i) => (
														<div className="product_definition_card" key={i}>
															<img
																src={`${ImgPath}product-definition-icon/${
																	content.img
																	}.png`}
																className="product_definition_card_img"
															/>
															<h4 className="product_definition_card_title">
																{content.title}
															</h4>
															<div className="product_definition_card_checkbox"/>
														</div>
													))}
													{/* Other */}
													<div className="product_definition_other">
														<div className="product_definition_other_inner">
															<div className="product_definition_other_inner_left">
																<div className="product_definition_card_checkbox">
																	<input type="checkbox" id="ed"/>
																	<label htmlFor="ed"/>
																</div>
																<h5>Other</h5>
															</div>
															<div className="product_definition_other_inner_right">
																<input type="text"/>
															</div>
														</div>
													</div>
												</div>
											</React.Fragment>
										</div>
									)}
									{this.state.currentStep === 7 && (
										<div className="product_definition_content_main_inner_left_body_inner_middle">
											<React.Fragment>
												<div className="product_definition_content_main_inner_left_body_inner_top">
													<h2 className="product_definition_content_main_inner_left_body_inner_top_title">
														What kind of graphic interface will be used
													</h2>
												</div>
												<div className="product_definition_content_main_inner_left_body_inner_middle">
													{Step7Content.map((content, i) => (
														<div className="product_definition_card" key={i}>
															<img
																src={`${ImgPath}product-definition-icon/${
																	content.img
																	}.png`}
																className="product_definition_card_img"
															/>
															<h4 className="product_definition_card_title">
																{content.title}
															</h4>
															<div className="product_definition_card_checkbox"/>
														</div>
													))}
													{/* Other */}
													<div className="product_definition_other">
														<div className="product_definition_other_inner">
															<div className="product_definition_other_inner_left">
																<div className="product_definition_card_checkbox">
																	<input type="checkbox" id="ed"/>
																	<label htmlFor="ed"/>
																</div>
																<h5>Other</h5>
															</div>
															<div className="product_definition_other_inner_right">
																<input type="text"/>
															</div>
														</div>
													</div>
												</div>
											</React.Fragment>
										</div>
									)}
									{this.state.currentStep === 8 && (
										<div className="product_definition_content_main_inner_left_body_inner_middle">
											<React.Fragment>
												<div className="product_definition_content_main_inner_left_body_inner_top">
													<h2 className="product_definition_content_main_inner_left_body_inner_top_title">
														How the product will be powered
													</h2>
												</div>
												<div className="product_definition_content_main_inner_left_body_inner_middle">
													{Step8Content.map((content, i) => (
														<div className="product_definition_card" key={i}>
															<img
																src={`${ImgPath}product-definition-icon/${
																	content.img
																	}.png`}
																className="product_definition_card_img"
															/>
															<h4 className="product_definition_card_title">
																{content.title}
															</h4>
															<div className="product_definition_card_checkbox"/>
														</div>
													))}
													{/* Other */}
													<div className="product_definition_other">
														<div className="product_definition_other_inner">
															<div className="product_definition_other_inner_left">
																<div className="product_definition_card_checkbox">
																	<input type="checkbox" id="ed"/>
																	<label htmlFor="ed"/>
																</div>
																<h5>Other</h5>
															</div>
															<div className="product_definition_other_inner_right">
																<input type="text"/>
															</div>
														</div>
													</div>
												</div>
											</React.Fragment>
										</div>
									)}
									{this.state.currentStep === 9 && (
										<div className="product_definition_content_main_inner_left_body_inner_middle">
											<React.Fragment>
												<div className="product_definition_content_main_inner_left_body_inner_top">
													<h2 className="product_definition_content_main_inner_left_body_inner_top_title">
														With what other products your projct communicate to?
													</h2>
												</div>
												<div className="product_definition_content_main_inner_left_body_inner_middle">
													{Step9Content.map((content, i) => (
														<div className="product_definition_card" key={i}>
															<img
																src={`${ImgPath}product-definition-icon/${
																	content.img
																	}.png`}
																className="product_definition_card_img"
															/>
															<h4 className="product_definition_card_title">
																{content.title}
															</h4>
															<div className="product_definition_card_checkbox"/>
														</div>
													))}
													{/* Other */}
													<div className="product_definition_other">
														<div className="product_definition_other_inner">
															<div className="product_definition_other_inner_left">
																<div className="product_definition_card_checkbox">
																	<input type="checkbox" id="ed"/>
																	<label htmlFor="ed"/>
																</div>
																<h5>Other</h5>
															</div>
															<div className="product_definition_other_inner_right">
																<input type="text"/>
															</div>
														</div>
													</div>
												</div>
											</React.Fragment>
										</div>
									)}
									<div className="product_definition_content_main_inner_left_body_inner_bottom">
										<div className="button_box">
											<button
												className="previous_button"
												onClick={this.previousStep}
											>
												<img src="/images/previous-arrow.png" alt=""/>
												<span>PREVIOUS</span>
											</button>
										</div>
										<div className="button_box">
											<button className="next_button" onClick={this.nextStep}>
												<span>NEXT</span>
												<img src="/images/next-arrow.png" alt=""/>
											</button>
										</div>
									</div>
								</div>
							</div>
							{/* Main Content Inne Left Footer */}
							<div className="product_definition_content_main_inner_left_footer">
								{/* Main Content Inne Left Footer Header*/}
								<div className="product_definition_content_main_inner_left_footer_header">
									<div className="product_definition_content_main_inner_left_footer_header_left">
										<h5>{this.state.showExperts && 'Experts'}</h5>
									</div>
									<div className="product_definition_content_main_inner_left_footer_header_right">
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
									<div className="product_definition_content_main_inner_left_footer_body">
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
								'product_definition_content_main_inner_right' +
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
)(ProductDefinition)
