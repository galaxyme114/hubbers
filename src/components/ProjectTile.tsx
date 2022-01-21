import * as moment from 'moment'
import * as React from 'react'
import { Link } from 'react-router-dom'

import { ProjectStageValues } from '../constants/enums'
import { ProjectRecord } from '../constants/models'
import Icon from './Icon'

export interface ProjectTileProps extends ProjectRecord {
}

export interface ProjectTileState {
}

export default class ProjectTile extends React.Component<ProjectTileProps, ProjectTileState> {
	public constructor(props: ProjectTileProps) {
		super(props)
		
		this.state = {}
	}
	
	public render() {
		const {shortId, name, slug, state, likesCount, shares, views, featuredImageUrl, created_at} = this.props
		
		return (
			<div className="project-tile__wrap">
				<Link to={`/projects/${shortId}/${slug}`}>
					<div className="project-tile">
						<div className="project-tile__image" style={{backgroundImage: 'url(' + featuredImageUrl + ')'}}>
							<div className="project-tile__details">
								<div className="project-tile__name">{name}</div>
								<div className="project-tile__date">{moment(created_at).fromNow()}</div>
								<div className="project-tile__stats">
									<div><Icon name="eye"/> {views}</div>
									<div><Icon name="heart-empty"/> {likesCount}</div>
									<div><Icon name="share"/> {shares}</div>
								</div>
							</div>
						</div>
						<div className="project-tile__info">
							<div className={'project-tile__info__indicator ' + (state % 1 !== 0 ? 'pending' : 'success')}/>
							<div className="project-tile__info__step">
								<strong>STEP {Math.floor(state + 1)}</strong> &nbsp; {ProjectStageValues[state]}
							</div>
						</div>
					</div>
				</Link>
			</div>
		)
	}
}