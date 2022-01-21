import * as React from 'react'
import Icon from '../components/Icon'
import { InputType } from '../constants/enums'
import Input from './Input'

export interface MessagePopupProps {
	
}

export interface MessagePopupState {
	searchText: string
	msgText: string
}

export default class MessagePopup extends React.Component<MessagePopupProps, MessagePopupState> {
	constructor(props: MessagePopupProps) {
		super(props)
		
		this.state = {
			searchText: '',
			msgText: ''
		}
	}
	
	public render() {
		
		
		return (
			<div>
				<div className="messages_popup_box">
					<div className="messages_popup_inner">
						<div className="messages_popup_header">
							<div className="messages_popup_header_title">Messages</div>
							<div className="messages_count">15</div>
							<div className="messages_popup_setting"><Icon name="close"/></div>
						</div>
						<div className="messages_popup_search">
							<div className="searchicon">
								<img src="/assets/images/searchicon.png"/>
							</div>
							<div className="searchinput">
								<Input
									name="search"
									placeholder="Search"
									value={this.state.searchText}
									type={InputType.TEXT}
									onChange={(searchText: string) => {
										this.setState({searchText})
									}}
								/>
							</div>
						</div>
						<div className="messages_popup_content">
							<div className="content_list">
								<div className="content_list_thumbnail" style={{
									backgroundImage:
										'url(/assets/images/expertimg.jpg)',
									backgroundPosition: 'center',
									backgroundSize: '100% 100%'
								}}>
								</div>
								<div className="chat_list_status_active"></div>
								<div className="content_list_content">
									<div className="content_list_content_time">
										5 min ago
									</div>
									<div className="content_list_content_title">
										User Name
									</div>
									<div className="content_list_content_caption">
										User message User message User message User message User message
									</div>
								</div>
							</div>
							<div className="content_list">
								<div className="content_list_thumbnail" style={{
									backgroundImage:
										'url(/assets/images/expertimg.jpg)',
									backgroundPosition: 'center',
									backgroundSize: '100% 100%'
								}}>
								</div>
								<div className="chat_list_status"></div>
								<div className="content_list_content">
									<div className="content_list_content_time">
										5 min ago
									</div>
									<div className="content_list_content_title">
										User Name
									</div>
									<div className="content_list_content_caption">
										User message User message User message User message User message
									</div>
								</div>
							</div>
							<div className="content_list">
								<div className="content_list_thumbnail" style={{
									backgroundImage:
										'url(/assets/images/expertimg.jpg)',
									backgroundPosition: 'center',
									backgroundSize: '100% 100%'
								}}>
								</div>
								<div className="chat_list_status_active"></div>
								<div className="content_list_content">
									<div className="content_list_content_time">
										5 min ago
									</div>
									<div className="content_list_content_title">
										User Name
									</div>
									<div className="content_list_content_caption">
										User message User message User message User message User message
									</div>
								</div>
							</div>
							<div className="content_list">
								<div className="content_list_thumbnail" style={{
									backgroundImage:
										'url(/assets/images/expertimg.jpg)',
									backgroundPosition: 'center',
									backgroundSize: '100% 100%'
								}}>
								</div>
								<div className="chat_list_status"></div>
								<div className="content_list_content">
									<div className="content_list_content_time">
										5 min ago
									</div>
									<div className="content_list_content_title">
										User Name
									</div>
									<div className="content_list_content_caption">
										User message User message User message User message User message
									</div>
								</div>
							</div>
						</div>
						<div className="messages_popup_footer">
							<div className="footer_editicon">
								<img src="/assets/images/editicon.png"/>
							</div>
						</div>
					</div>
				</div>
				
				<div className="messages_popup_box sidepopup">
					<div className="messages_popup_inner">
						<div className="messages_popup_header">
							<div className="messages_popup_header_title">Anna Smith</div>
							<div className="messages_popup_setting"><Icon name="close"/></div>
						</div>
						<div className="messages_popup_content">
							<div className="chat_list_send">
								<div className="chat_list_left">
									<div className="chat_list_thumbnail" style={{
										backgroundImage:
											'url(/assets/images/expertimg.jpg)',
										backgroundPosition: 'center',
										backgroundSize: '100% 100%'
									}}>
									</div>
									<div className="chat_list_status"></div>
									<div className="chat_list_left_timeago">5 day ago</div>
								</div>
								<div className="chat_list_right">
									<div>
										Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
										industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
										and scrambled it to make a type specimen book. It has survived not only five centuries, but also the
										leap into electronic typesetting, remaining essentially unchanged.
									</div>
								</div>
							</div>
							<div className="content_list_receive">
								<div className="chat_list_left">
									<div>
										Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
										industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
										and scrambled it to make a type specimen book. It has survived not only five centuries, but also the
										leap into electronic typesetting, remaining essentially unchanged.
									</div>
								</div>
								<div className="chat_list_right">
									<div className="chat_list_thumbnail" style={{
										backgroundImage:
											'url(/assets/images/expertimg.jpg)',
										backgroundPosition: 'center',
										backgroundSize: '100% 100%'
									}}>
									</div>
									<div className="chat_list_status"></div>
									<div className="chat_list_left_timeago">5 day ago</div>
								</div>
							</div>
						</div>
						<div className="messages_popup_footer">
							<div className="sendinput">
								<Input
									name="search"
									placeholder="Send message"
									value={this.state.msgText}
									type={InputType.TEXT}
									onChange={(msgText: string) => {
										this.setState({msgText})
									}}
								/>
							</div>
							<div className="footer_editicon">
								<Icon name="camera"/>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
	
}