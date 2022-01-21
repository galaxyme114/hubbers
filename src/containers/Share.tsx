import * as React from 'react'
import { connect } from 'react-redux'
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from 'react-share'
import Icon from '../components/Icon'

export interface ShareProps {
	shareURL: string
}

export interface ShareState {
}

class Share extends React.Component<ShareProps, ShareState> {
	public constructor(props: ShareProps) {
		super(props)
		this.state = {}
	}
	
	public render() {
		// const Domainurl = 'http://hubbers.io'
		const {shareURL} = this.props
		// const shareUrl = Domainurl + sharePath + '/' + shortId + '/'
		return (
			<div className="common-share-box">
				<FacebookShareButton url={shareURL} className="common-share-socialbtn">
					<div className="socialicon"><Icon name="facebook"/></div>
				</FacebookShareButton>
				
				<TwitterShareButton url={shareURL} className="common-share-socialbtn">
					<div className="socialicon"><Icon name="twitter"/></div>
				</TwitterShareButton>
				
				<LinkedinShareButton url={shareURL} className="common-share-socialbtn">
					<div className="socialicon"><Icon name="linkedin"/></div>
				</LinkedinShareButton>
			</div>
		)
	}
	
}

export default connect(null, {})(Share)