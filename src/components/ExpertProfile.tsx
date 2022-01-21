import * as React from 'react'
import { ExpertRecord } from '../constants/models'
import Rating from './Rating'

export interface ExpertiseProfile extends ExpertRecord {
	isMicro?: boolean
}

const ExpertProfile: React.StatelessComponent<ExpertiseProfile> = (
	{thumbnailImageUrl, rating, name, caption, bio, reviews, isMicro = false}) => {
	return (
		<div className={'expert-profile ' + (isMicro ? 'micro' : '')}>
			<div className="expert-profile__meta">
				<div className="expert-profile__thumbnail" style={{backgroundImage: 'url(' + thumbnailImageUrl + ')'}}/>
				{
					!isMicro && (
						<div>
							<div className="expert-profile__rating">
								<Rating value={rating}/>
								<span className="rating">{rating}</span>&nbsp;
								<span className="reviews">({reviews})</span>
							</div>
							<a href="mailto:support@hubbe.rs">
								<button className="btn btn-outline expert-profile__contact">Contact Me</button>
							</a>
						</div>
					)
				}
			</div>
			<div className="expert-profile__info">
				<h3 className="expert-profile__name">{name}</h3>
				<span className="expert-profile__caption">{caption}</span>
				{
					isMicro && (
						<div className="expert-profile__rating">
							<Rating value={rating}/>
							<span className="rating">{rating}</span>&nbsp;
							<span className="reviews">({reviews})</span>
						</div>
					)
				}
				{
					!isMicro && (
						<div className="expert-profile__bio" dangerouslySetInnerHTML={{__html: bio}}/>
					)
				}
			</div>
			{
				isMicro && (
					<div className="expert-profile__bio" dangerouslySetInnerHTML={{__html: bio}}/>
				)
			}
		</div>
	)
}

export default ExpertProfile