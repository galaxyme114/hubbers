import * as React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import Input from '../components/Input'
import { InputType } from '../constants/enums'
import Sidebar from '../containers/Sidebar'
import { RootState } from '../reducers/index'

interface MessagesProps {
}

interface MessagesState {
	comment: string
	text: string
	sideBar: boolean
	modules: boolean
}

class Messages extends React.Component<MessagesProps, MessagesState> {
	constructor(props: MessagesProps) {
		super(props)
		this.state = {
			comment: '',
			text: '',
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
			<div className="messages_content_wrapper">
				<Helmet>
					<title>Messages</title>
				</Helmet>
				<div className="messages_content_main">
					<Sidebar sideBar={this.state.sideBar} toggleSidebar={this.toggleSidebar} toggleModules={this.toggleModules}/>
					<div className={'messages_content_main_inner' + (!this.state.sideBar ? ' full-width' : '')}>
						<div className="messages_content_main_inner_left">
							<div className="messages_content_main_inner_head">
								<h4 className="messages_content_main_inner_head_title">Messages</h4>
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
							
							<div className="messages_content_main_inner_body message_card_wraper">
								<div className="message_card">
									<div className="message_card_left">
										<img src="/images/messages.png" className="user_profile_image"/>
										<div className="status_indicator online"></div>
									</div>
									<div className="message_card_right">
										<div className="date">21 Feb</div>
										<h4 className="user_name">Marat derevenko</h4>
										<div className="messsage_content">
											<span className="message_text">Yes, sure. 8pm </span>
											<span className="unread_bagde">9</span>
										</div>
									</div>
								</div>
								<div className="message_card">
									<div className="message_card_left">
										<img src="/images/messages.png" className="user_profile_image"/>
										<div className="status_indicator"></div>
									</div>
									<div className="message_card_right">
										<div className="date">21 Feb</div>
										<h4 className="user_name">Marat derevenko</h4>
										<div className="messsage_content">
											<span className="message_text">Yes, sure. 8pm </span>
										</div>
									</div>
								</div>
								<div className="message_card">
									<div className="message_card_left">
										<img src="/images/messages.png" className="user_profile_image"/>
										<div className="status_indicator online"></div>
									</div>
									<div className="message_card_right">
										<div className="date">21 Feb</div>
										<h4 className="user_name">Marat derevenko</h4>
										<div className="messsage_content">
											<span className="message_text">Yes, sure. 8pm </span>
											<span className="unread_bagde">9</span>
										</div>
									</div>
								</div>
								<div className="message_card">
									<div className="message_card_left">
										<img src="/images/messages.png" className="user_profile_image"/>
										<div className="status_indicator"></div>
									</div>
									<div className="message_card_right">
										<div className="date">21 Feb</div>
										<h4 className="user_name">Marat derevenko</h4>
										<div className="messsage_content">
											<span className="message_text">Yes, sure. 8pm </span>
										</div>
									</div>
								</div>
								<div className="message_card">
									<div className="message_card_left">
										<img src="/images/messages.png" className="user_profile_image"/>
										<div className="status_indicator online"></div>
									</div>
									<div className="message_card_right">
										<div className="date">21 Feb</div>
										<h4 className="user_name">Marat derevenko</h4>
										<div className="messsage_content">
											<span className="message_text">Yes, sure. 8pm </span>
											<span className="unread_bagde">9</span>
										</div>
									</div>
								</div>
								<div className="message_card">
									<div className="message_card_left">
										<img src="/images/messages.png" className="user_profile_image"/>
										<div className="status_indicator"></div>
									</div>
									<div className="message_card_right">
										<div className="date">21 Feb</div>
										<h4 className="user_name">Marat derevenko</h4>
										<div className="messsage_content">
											<span className="message_text">Yes, sure. 8pm </span>
										</div>
									</div>
								</div>
								<div className="message_card">
									<div className="message_card_left">
										<img src="/images/messages.png" className="user_profile_image"/>
										<div className="status_indicator online"></div>
									</div>
									<div className="message_card_right">
										<div className="date">21 Feb</div>
										<h4 className="user_name">Marat derevenko</h4>
										<div className="messsage_content">
											<span className="message_text">Yes, sure. 8pm </span>
											<span className="unread_bagde">9</span>
										</div>
									</div>
								</div>
								<div className="message_card">
									<div className="message_card_left">
										<img src="/images/messages.png" className="user_profile_image"/>
										<div className="status_indicator"></div>
									</div>
									<div className="message_card_right">
										<div className="date">21 Feb</div>
										<h4 className="user_name">Marat derevenko</h4>
										<div className="messsage_content">
											<span className="message_text">Yes, sure. 8pm </span>
										</div>
									</div>
								</div>
								<div className="message_card">
									<div className="message_card_left">
										<img src="/images/messages.png" className="user_profile_image"/>
										<div className="status_indicator online"></div>
									</div>
									<div className="message_card_right">
										<div className="date">21 Feb</div>
										<h4 className="user_name">Marat derevenko</h4>
										<div className="messsage_content">
											<span className="message_text">Yes, sure. 8pm </span>
											<span className="unread_bagde">9</span>
										</div>
									</div>
								</div>
								<div className="message_card">
									<div className="message_card_left">
										<img src="/images/messages.png" className="user_profile_image"/>
										<div className="status_indicator"></div>
									</div>
									<div className="message_card_right">
										<div className="date">21 Feb</div>
										<h4 className="user_name">Marat derevenko</h4>
										<div className="messsage_content">
											<span className="message_text">Yes, sure. 8pm </span>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="messages_content_main_inner_right">
							<div className="messages_content_main_inner_head">
								<h4 className="messages_content_main_inner_head_title">Bla bla bla</h4>
								<p className="messages_content_main_inner_head_text">from Sarah Parker</p>
								<div className="divider"></div>
							</div>
							<div className="messages_content_main_inner_body chat-box">
								<div className="chat-box-inner">
									<div className="message_card left_side">
										<div className="message_card_left">
											<img src="/images/expert-2.png" className="user_image"/>
											<span className="message_time">10:31pm </span>
										</div>
										<div className="message_card_right">
											<span className="message_text">Hey come to visit us !!</span>
										</div>
									</div>
									<div className="message_card right_side">
										<span className="message_text">Sure, at what time?</span>
									</div>
									<div className="message_card left_side">
										<div className="message_card_left">
											<img src="/images/expert-2.png" className="user_image"/>
											<span className="message_time">10:31pm </span>
										</div>
										<div className="message_card_right">
											<span className="message_text">let's meet 8pm tomorrow</span>
										</div>
									</div>
									<div className="message_card left_side">
										<div className="message_card_left">
											<img src="/images/expert-2.png" className="user_image"/>
											<span className="message_time">10:31pm </span>
										</div>
										<div className="message_card_right">
											<span className="message_text">Hey come to visit us !!</span>
										</div>
									</div>
									<div className="message_card right_side">
										<span className="message_text">Sure, at what time?</span>
									</div>
									<div className="message_card left_side">
										<div className="message_card_left">
											<img src="/images/expert-2.png" className="user_image"/>
											<span className="message_time">10:31pm </span>
										</div>
										<div className="message_card_right">
											<span className="message_text">let's meet 8pm tomorrow</span>
										</div>
									</div>
									<div className="message_card left_side">
										<div className="message_card_left">
											<img src="/images/expert-2.png" className="user_image"/>
											<span className="message_time">10:31pm </span>
										</div>
										<div className="message_card_right">
											<span className="message_text">Hey come to visit us !!</span>
										</div>
									</div>
									<div className="message_card right_side">
										<span className="message_text">Sure, at what time?</span>
									</div>
									<div className="message_card left_side">
										<div className="message_card_left">
											<img src="/images/expert-2.png" className="user_image"/>
											<span className="message_time">10:31pm </span>
										</div>
										<div className="message_card_right">
											<span className="message_text">let's meet 8pm tomorrow</span>
										</div>
									</div>
								</div>
								<div className="write_message_box">
									<img src="/images/smile-icon.png" className="smile_icon" alt="smile icon"/>
									<Input
										name="text"
										placeholder="write message..."
										type={InputType.TEXT}
										value={this.state.comment}
										onChange={(comment: string) => {
											this.setState({comment})
										}}
									/>
									<input type="file" id="file"/>
									<label htmlFor="file" className="file_btn">
										<img src="/images/attachment-icon.png" className="attachment_icon" alt="attachment-icon"/>
									</label>
									<button className="send_btn">
										<img src="/images/paper-plane-icon.png" className="paper_plane_icon" alt="paper-plane-icon"/>
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

export default connect(mapStateToProps, {})(Messages)