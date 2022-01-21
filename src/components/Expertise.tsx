import * as React from 'react'
import * as ReactTooltip from 'react-tooltip'

import { ExpertiseRecord } from '../constants/models'
import Icon from './Icon'

export interface ExpertiseProps extends ExpertiseRecord {
	isMicro?: boolean,
	isShortlisted?: boolean,
	isFavourite?: boolean,
	onClick: any,
	onShortlist?: any
	onFavourite?: any
}

const Expertise: React.StatelessComponent<ExpertiseProps> = (
	{name, expert, packages, featuredImageUrl, isMicro, isShortlisted, isFavourite, onClick, onShortlist, onFavourite}
) => {
	return (
		<div className={'expertise ' + (isMicro ? 'micro' : '')} onClick={onClick}>
			<div className="expertise-image" style={{backgroundImage: 'url(' + featuredImageUrl + ')'}}/>
			<div className="expertise-expert">
				<img className="expertise-expert__thumbnail" src={expert.thumbnailImageUrl}/>
				<div className="expertise-expert__name-wrap">
					<div className="expertise-expert__name">{expert.name}</div>
					<div className="expertise-expert__caption">{expert.caption}</div>
				</div>
			</div>
			<div className="expertise-excerpt">
				{name}
			</div>
			<div className="expertise-expert__rating-wrap">
				<Icon name="star"/>
				<span className="expertise-expert__rating">{expert.rating}</span>
				&nbsp;
				<span className="expertise-expert__review">({expert.reviews})</span>
			</div>
			<div className="expertise-meta">
				<div className="expertise-meta__actions">
					{
						onShortlist && (
							<span
								data-tip={isShortlisted ? 'Remove from shortlist' : 'Add to shortlist'}
								onClick={(e) => {
									e.stopPropagation()
									onShortlist()
								}}>
								<Icon name="menu" active={isShortlisted}/>
							</span>
						)
					}
					{
						onFavourite && (
							<span
								data-tip={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
								onClick={(e) => {
									e.stopPropagation()
									onFavourite()
								}}>
								<Icon name={isFavourite ? 'heart' : 'heart-empty'} active={isFavourite}/>
							</span>
						)
					}
					<ReactTooltip effect="solid"/>
				</div>
				{
					packages.length > 0 && (
						<div className="expertise-meta__price">
							from {packages[0].price} {packages[0].currency}
						</div>
					)
				}
			</div>
		</div>
	)
}

export default Expertise