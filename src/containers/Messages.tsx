import * as moment from 'moment'
import * as React from 'react'
import { connect } from 'react-redux'
import Icon from '../components/Icon'
import Input from '../components/Input'
import { InputType } from '../constants/enums'
import { RootState } from '../reducers/index'

import { doSendConvertationMessage, fetchAllConvertation, fetchConvertationDetail } from '../actions/messages'
import { ActionTypeStates } from '../constants/action-types'
import { State as AllConvertationsState } from '../reducers/messages'

const Spinner = require('react-spinkit')

export interface MessagesProps {
	state: AllConvertationsState
	fetchAllConvertation: any
	fetchConvertationDetail: any
	doSendConvertationMessage: any
}

export interface MessagesState {
	searchText: string
	msgText: string,
	chatPannels: any
	isopenchat: ActionTypeStates
	isChatStatus: boolean
}

class Messages extends React.Component<MessagesProps, MessagesState> {
	constructor(props: MessagesProps) {
		super(props)
		
		this.state = {
			searchText: '',
			msgText: '',
			chatPannels: [],
			isopenchat: null,
			isChatStatus: false
			
		}
	}
	
	public componentDidMount() {
		this.props.fetchAllConvertation()
	}
	
	public openChat(convertationId: string) {
		this.props.fetchConvertationDetail(convertationId)
			.then((response: any) => {
				// console.log(response.payload)
				this.setState({isopenchat: ActionTypeStates.SUCCESS})
				
				if (ActionTypeStates.SUCCESS === 'SUCCESS') {
					
					
					if (this.state.chatPannels.length === 0) {
						console.log(response.payload)
						const tempUSerInfo = []
						tempUSerInfo.push(response.payload)
						this.setState({
							chatPannels: tempUSerInfo
						})
					} else {
						let tempUserInfo1 = []
						
						if (this.state.chatPannels.length > 0) {
							tempUserInfo1 = this.state.chatPannels
						}
						
						tempUserInfo1.push(response.payload)
						
						this.setState({
							chatPannels: tempUserInfo1
						})
					}
					console.log(ActionTypeStates.SUCCESS)
					console.log(this.state.chatPannels)
				}
				
			}).catch(() => {
			this.setState({isopenchat: ActionTypeStates.FAILED})
		})
		
	}
	
	public closeChat(index: number) {
		console.log(index)
		this.setState({isChatStatus: true})
		this.state.chatPannels.splice(index, 1)
		
	}
	
	public render() {
		const {state} = this.props
		// console.log(state)
		return (
			<div>
				<div className="messages_popup_box">
					<div className="messages_popup_inner">
						<div className="messages_popup_header">
							<div className="messages_popup_header_title">Messages</div>
							{
								(state.AllConversationList.length > 0) &&
								<div className="messages_count">{state.AllConversationList.length}</div>
							}
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
							{
								(state.status === ActionTypeStates.INPROGRESS && state.AllConversationList.length === 0) &&
								<div className="page-loading">
									<Spinner name="three-dots" fadeIn="none"/>
								</div>
							}
							{
								(state.AllConversationList.length > 0) && state.AllConversationList.map((op: any, i: number) =>
									<div className="content_list" key={i} onClick={() => {
										this.openChat(op._id)
									}}>
										<div className="content_list_thumbnail" style={{
											backgroundImage:
												'url(' + op.author.thumbnail_image_url + ')',
											backgroundPosition: 'center',
											backgroundSize: '100% 100%'
										}}>
										</div>
										<div className="chat_list_status_active"></div>
										<div className="content_list_content">
											<div className="content_list_content_time">
												{moment(op.updatedAt).fromNow()}
											</div>
											<div className="content_list_content_title">
												{op.author.name} {op.author.last_name}
											</div>
											<div className="content_list_content_caption">
												{op.latestMessage.message}
											</div>
										</div>
									</div>
								)
							}
						</div>
						<div className="messages_popup_footer">
							<div className="footer_editicon">
								<img src="/assets/images/editicon.png"/>
							</div>
						</div>
					</div>
				</div>
				
				{
					// tslint:disable-next-line:max-line-length
					this.state.chatPannels && this.state.chatPannels.length > 0 && this.state.chatPannels.map((op: any, i: number) =>
						
						<div className={'chat_messages_popup_box sidepopup' + (i + 1)} key={i}>
							<div className="chat_messages_popup_inner">
								<div className="chat_messages_popup_header">
									<div className="chat_messages_popup_header_title">
										{
											op.author &&
											<div>{op.author.name} {op.author.last_name}</div>
										}
									</div>
									<div className="chat_messages_popup_close" onClick={() => {
										this.closeChat(i)
									}}><Icon name="close"/></div>
								</div>
								<div className="chat_messages_popup_content">
									{
										op.messages && op.messages.map((chat: any, j: number) =>
											<div className="chat_list_send" key={j}>
												<div className="chat_list_left">
													<div className="chat_list_thumbnail" style={{
														backgroundImage:
															'url(/assets/images/expertimg.jpg)',
														backgroundPosition: 'center',
														backgroundSize: '100% 100%'
													}}>
													</div>
													<div className="chat_list_status_active"></div>
													<div className="chat_list_left_timeago">{moment(chat.updatedAt).fromNow()}</div>
												</div>
												<div className="chat_list_right">
													<div>
														{chat.message}
													</div>
												</div>
											</div>
										)
									}
									
									{/*<div className="content_list_receive">
										<div className="chat_list_left">
											<div>
												Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
											</div>
										</div>
										<div className="chat_list_right">
											<div className="chat_list_thumbnail" style={{ backgroundImage:
												'url(/assets/images/expertimg.jpg)',
												backgroundPosition: 'center',
												backgroundSize: '100% 100%' }}>
											</div>
											<div className="chat_list_status"></div>
											<div className="chat_list_left_timeago">5 day ago</div>
										</div>
											</div>*/}
								</div>
								<div className="chat_messages_popup_footer">
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
									<div className="chat_footer_sendicon" onClick={() => this.sendMessage(op, i)}>
										<Icon name="camera"/>
									</div>
								</div>
							</div>
						</div>
					)
				}
			</div>
		)
	}
	
	private sendMessage(userInfo: any, index: number) {
		console.log(index)
		console.log(userInfo)
		console.log(this.state.chatPannels)
		// this.state.chatPannels[index].push(userInfo)
		
		// const data = {
		// 	'convertationId': '',
		// 	'message': this.state.msgText
		// }
		// this.props.doSendConvertationMessage(data)
	}
}

const mapStateToProps = (state: RootState) => ({
	state: state.Allconvertations
})

export default connect(mapStateToProps, {
	fetchAllConvertation,
	fetchConvertationDetail,
	doSendConvertationMessage
})(Messages)