import * as React from 'react'
import { connect } from 'react-redux'

import Icon from '../components/Icon'
import Input from '../components/Input'
import { InputType } from '../constants/enums'
import { RootState } from '../reducers/index'

export interface ConversationProps {
	conversationId: string
}

export interface ConversationState {
	messageText: string
}

class Conversation extends React.Component<ConversationProps, ConversationState> {
	constructor(props: ConversationProps) {
		super(props)
		
		this.state = {
			messageText: ''
		}
	}
	
	public render() {
		return (
			<div className="message-content">
				<div className="message-content_row">
					<div className="message-content__main-content">
						<div className="message-content__main-content_inner">
							<ul>
								<li className="message_sent">
									<div className="message__userimg"
									     style={{
										     backgroundImage: 'url("https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/By3LZ2iZQ.jpg")',
										     backgroundRepeat: 'no-repeat',
										     backgroundPosition: 'center',
										     backgroundSize: 'contain'
									     }}/>
									<div className="message__content">
										<div className="message__content_name">Den Denchik <span>February 25, 2018</span></div>
										<div className="message__content_msg">
											Sed ut perspiciatis, unde omnis Sed ut perspiciatis, unde omnis Sed ut perspiciatis, unde omnis
										</div>
									</div>
								</li>
								<li className="message_sent">
									<div className="message__userimg"
									     style={{
										     backgroundImage: 'url("https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/By3LZ2iZQ.jpg")',
										     backgroundRepeat: 'no-repeat',
										     backgroundPosition: 'center',
										     backgroundSize: 'contain'
									     }}/>
									<div className="message__content">
										<div className="message__content_name">Den Denchik <span>February 25, 2018</span></div>
										<div className="message__content_msg">
											Sed ut perspiciatis, unde omnis Sed ut perspiciatis, unde omnis Sed ut perspiciatis, unde omnis
										</div>
									</div>
								</li>
								<li className="message_sent">
									<div className="message__userimg"
									     style={{
										     backgroundImage: 'url("https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/By3LZ2iZQ.jpg")',
										     backgroundRepeat: 'no-repeat',
										     backgroundPosition: 'center',
										     backgroundSize: 'contain'
									     }}/>
									<div className="message__content">
										<div className="message__content_name">Den Denchik <span>February 25, 2018</span></div>
										<div className="message__content_msg">
											Sed ut perspiciatis, unde omnis Sed ut perspiciatis, unde omnis Sed ut perspiciatis, unde omnis
										</div>
									</div>
								</li>
								<li className="message_sent">
									<div className="message__userimg"
									     style={{
										     backgroundImage: 'url("https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/By3LZ2iZQ.jpg")',
										     backgroundRepeat: 'no-repeat',
										     backgroundPosition: 'center',
										     backgroundSize: 'contain'
									     }}/>
									<div className="message__content">
										<div className="message__content_name">Den Denchik <span>February 25, 2018</span></div>
										<div className="message__content_msg">
											Sed ut perspiciatis, unde omnis Sed ut perspiciatis, unde omnis Sed ut perspiciatis, unde omnis
										</div>
									</div>
								</li>
								<li className="message_sent">
									<div className="message__userimg"
									     style={{
										     backgroundImage: 'url("https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/By3LZ2iZQ.jpg")',
										     backgroundRepeat: 'no-repeat',
										     backgroundPosition: 'center',
										     backgroundSize: 'contain'
									     }}/>
									<div className="message__content">
										<div className="message__content_name">Den Denchik <span>February 25, 2018</span></div>
										<div className="message__content_msg">
											Sed ut perspiciatis, unde omnis Sed ut perspiciatis, unde omnis Sed ut perspiciatis, unde omnis
										</div>
									</div>
								</li>
								<li className="message_sent">
									<div className="message__userimg"
									     style={{
										     backgroundImage: 'url("https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/By3LZ2iZQ.jpg")',
										     backgroundRepeat: 'no-repeat',
										     backgroundPosition: 'center',
										     backgroundSize: 'contain'
									     }}/>
									<div className="message__content">
										<div className="message__content_name">Den Denchik <span>February 25, 2018</span></div>
										<div className="message__content_msg">
											Sed ut perspiciatis, unde omnis Sed ut perspiciatis, unde omnis Sed ut perspiciatis, unde omnis
										</div>
									</div>
								</li>
								<li className="message_sent">
									<div className="message__userimg"
									     style={{
										     backgroundImage: 'url("https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/By3LZ2iZQ.jpg")',
										     backgroundRepeat: 'no-repeat',
										     backgroundPosition: 'center',
										     backgroundSize: 'contain'
									     }}/>
									<div className="message__content">
										<div className="message__content_name">Den Denchik <span>February 25, 2018</span></div>
										<div className="message__content_msg">
											Sed ut perspiciatis, unde omnis Sed ut perspiciatis, unde omnis Sed ut perspiciatis, unde omnis
										</div>
									</div>
								</li>
								<li className="message_replies">
									<div className="message__content">
										<div className="message__userimg"
										     style={{
											     backgroundImage: 'url("https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/By3LZ2iZQ.jpg")',
											     backgroundRepeat: 'no-repeat',
											     backgroundPosition: 'center',
											     backgroundSize: 'contain'
										     }}/>
										<div className="message__content_name">Den Denchik <span>February 25, 2018</span></div>
										<div className="message__content_msg">
											Sed ut perspiciatis, unde omnis Sed ut perspiciatis, unde omnis Sed ut perspiciatis, unde omnis
										</div>
										<div className="message__attached">
											<div>
												<Icon name="attach"/>
												New exam paper that has been changed.doc
											</div>
										</div>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div className="send-message-box">
					<div className="send-message-box_textarea">
						<form>
							<Input
								name="messageText"
								placeholder="Enter your message ..."
								value={this.state.messageText}
								type={InputType.TEXTAREA}
								onChange={(messageText: string) => {
									this.setState({messageText})
								}}
							/>
						</form>
					</div>
					<div className="send-message-box_btn">
						<button className="btn" onClick={() => {
							console.log('sending a message')
						}}>Send
						</button>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state: RootState) => ({})

export default connect(mapStateToProps, {})(Conversation)