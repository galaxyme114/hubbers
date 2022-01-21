import * as React from 'react'
import * as ReactShare from 'react-share'
import Icon from '../components/Icon'

export interface ShareProps {
	shareURL: string
}

export interface ShareState {
	isOpen: boolean
}

class FloatingShare extends React.Component<ShareProps, ShareState> {
	public constructor(props: ShareProps) {
		super(props)
		
		this.state = {
			isOpen: false
		}
	}
	
	public render() {
		const {shareURL} = this.props
		
		return (
			<div
				className={'floating-share__wrap ' + (this.state.isOpen ? 'active' : '')}
				onClick={(e: any) => {
					e.preventDefault()
					this.toggleShareView()
				}}>
				{this.props.children}
				<div className={'floating-share ' + (this.state.isOpen ? 'floating-share--open' : '')}>
					<ReactShare.FacebookShareButton url={shareURL} className="floating-share__button">
						<Icon name="facebook"/>
					</ReactShare.FacebookShareButton>
					<ReactShare.TwitterShareButton url={shareURL} className="floating-share__button">
						<Icon name="twitter"/>
					</ReactShare.TwitterShareButton>
					<ReactShare.LinkedinShareButton url={shareURL} className="floating-share__button">
						<Icon name="linkedin"/>
					</ReactShare.LinkedinShareButton>
				</div>
			</div>
		)
	}
	
	private toggleShareView() {
		this.setState({isOpen: !this.state.isOpen})
	}
}

export default FloatingShare