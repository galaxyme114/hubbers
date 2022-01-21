import * as React from 'react'
import Icon from '../components/Icon'
import { InputType } from '../constants/enums'
import Input from './Input'

export interface NewMessagePopupProps {
	
}

export interface NewMessagePopupState {
	addsomeone: string
}

export default class NewMessagePopup extends React.Component<NewMessagePopupProps, NewMessagePopupState> {
	constructor(props: NewMessagePopupProps) {
		super(props)
		
		this.state = {
			addsomeone: ''
		}
	}
	
	public render() {
		
		
		return (
			<div>
				<div className="new_messages_popup_box">
					<div className="new_messages_popup_inner">
						<div className="new_messages_popup_header">
							<div className="new_messages_popup_header_title">New Message</div>
							<div className="new_messages_popup_setting"><Icon name="close"/></div>
						</div>
						<div className="new_messages_popup_content">
							<div className="new_messages_content_list">
								<div className="chatuser">
									Benjamin V<Icon name="close"/>
								</div>
								<div className="dividerline_left"></div>
								<div className="add_someone">
									<Input
										name="addsomeone"
										placeholder="Add Someone..."
										value={this.state.addsomeone}
										type={InputType.TEXT}
										onChange={(addsomeone: string) => {
											this.setState({addsomeone})
										}}
									/>
								</div>
							</div>
						</div>
						<div className="messages_popup_footer">
							<div className="footer_editicon">
								<button className="btn conversationbtn">START CONVERSATION</button>
							</div>
						</div>
					</div>
				</div>
				
				<div className="new_messages_popup_box new_sidepopup">
					<div className="new_messages_popup_inner">
						<div className="new_messages_popup_header">
							<div className="new_messages_popup_header_title">New Message</div>
							<div className="new_messages_popup_setting"><Icon name="close"/></div>
						</div>
						<div className="new_messages_popup_content">
							<div className="new_messages_list">
								<div>Benjamin v</div>
							</div>
							<div className="new_messages_list active">
								<div>Benjamin Vital</div>
							</div>
							<div className="new_messages_list">
								<div>Benjamin Vignon</div>
							</div>
							<div className="new_messages_list">
								<div>Benjamin Vith45</div>
							</div>
							<div className="new_messages_list">
								<div>Benjamin v</div>
							</div>
							<div className="new_messages_list active">
								<div>Benjamin Vital</div>
							</div>
							<div className="new_messages_list">
								<div>Benjamin Vignon</div>
							</div>
							<div className="new_messages_list">
								<div>Benjamin Vith45</div>
							</div>
							<div className="new_messages_list">
								<div>Benjamin v</div>
							</div>
							<div className="new_messages_list">
								<div>Benjamin Vital</div>
							</div>
							<div className="new_messages_list">
								<div>Benjamin Vignon</div>
							</div>
							<div className="new_messages_list">
								<div>Benjamin Vith45</div>
							</div>
							<div className="new_messages_list">
								<div>Benjamin v</div>
							</div>
							<div className="new_messages_list active">
								<div>Benjamin Vital</div>
							</div>
							<div className="new_messages_list">
								<div>Benjamin Vignon</div>
							</div>
							<div className="new_messages_list">
								<div>Benjamin Vith45</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
	
}