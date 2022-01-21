import * as React from 'react'

import { BusinessNeedsRecord } from '../constants/models'
import Share from '../containers/Share'

export enum BusinessNeedsViewType {
	OWNER = 'OWNER',
	PUBLIC = 'PUBLIC'
}

export interface BusinessNeedsProps extends BusinessNeedsRecord {
	viewType: BusinessNeedsViewType
}

export interface BusinessNeedsState {
}

export default class BusinessNeedsTile extends React.Component<BusinessNeedsProps, BusinessNeedsState> {
	public constructor(props: BusinessNeedsProps) {
		super(props)
		this.state = {}
	}
	
	public render() {
		const {project, description, tags, viewType} = this.props
		
		return (
			<div className={'businessexpertise ' + 'micro'}>
				<div className="expertise-image" style={{backgroundImage: `url(${project.featuredImageUrl})`}}/>
				<div className="expertise-expert">
					<div className="expertise-expert__name-wrap">
						<div className="expertise-expert__name">{project.name}</div>
						<div className="expertise-expert__caption">{description}</div>
					</div>
				</div>
				{
					tags && tags.length > 0 && (
						<div className="expertise-excerpt">
							{tags.map((t: string, i: number) => <a key={i} href="">#{t}</a>)}
						</div>
					)
				}
				{
					viewType === BusinessNeedsViewType.PUBLIC && (
						<div className="expertise-meta">
							<div className="expertise-meta__actions">
								<button className="btn">I WANT TO DO THIS JOB</button>
							</div>
							<div className="expertise-meta__price">
								<div className="sharename">SHARE</div>
								<Share shareURL={window.location.href}/>
							</div>
						</div>
					)
				}
				{
					viewType === BusinessNeedsViewType.OWNER && (
						<div className="expertise-meta">
							<div className="expertise-meta__actions">
								<button className="btn">See all bids</button>
							</div>
						</div>
					)
				}
			</div>
		)
	}
}