import * as React from 'react'
import Icon from './Icon'
import { InputType } from '../constants/enums'
import Input from '../components/Input'

const doFetchContinent = [{}]

export interface ChooseCommunityModalProps {
	onSubmit: any
}

export interface ChooseCommunityModalState {
	continent: string
	country: string
}

export default class ChooseCommunityModal extends React.Component<ChooseCommunityModalProps, ChooseCommunityModalState> {
	public constructor(props: ChooseCommunityModalProps) {
		super(props)
		this.state = {
			continent: '',
			country: ''
		}
	}
	
	public render() {
		const {onSubmit} = this.props
		const {continent, country} = this.state
		
		return (
			<div id="choose-community-modal" className="choose-community-modal" onClick={this.handleRootClick}>
				<div className="choose-community-modal__body">
					<div className="choose-community-modal__body__inner">
						<div onClick={this.handleClose} className="close-action"><Icon name="close"/></div>
						<div className="title">Choose community</div>
						<div className="content-box">
							<div className="content">
								<div className="field-title">Choose contient</div>
								<div className="field-select">
									<Input
										name="continent"
										// placeholder="Select Project"
										value={continent}
										type={InputType.SELECT}
										options={doFetchContinent}
										onChange={(v: any) => this.setState({continent: v})}/>
									<div className="members">2541 members</div>
								</div>
							</div>
							<div className="content">
								<div className="field-title">Choose country</div>
								<div className="field-select">
									<Input
										name="country"
										// placeholder="Select Project"
										value={country}
										type={InputType.SELECT}
										options={doFetchContinent}
										onChange={(v: any) => this.setState({country: v})}/>
									<div className="members">241 members</div>
								</div>
							</div>
							<div className="another-field">
								<span>+</span>Add another community
							</div>
							<div className="change-btn">
								<button className="btn">Change community</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
	
	private handleRootClick(e: any) {
		const isRoot = e.target.className === 'choose-community-modal'
		
		if (isRoot) {
			document.body.classList.remove('show-choose-community-modal')
		}
	}
	
	private handleClose() {
		document.body.classList.remove('show-choose-community-modal')
	}
}