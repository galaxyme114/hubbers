import * as React from 'react'

export interface HeroBannerProps {
	bannerImage: string
	title: string
	caption: string
	description: string
	cta: string
	onClick?: any
	overlay?: boolean
}

export default class HeroBanner extends React.Component<HeroBannerProps, {}> {
	public render() {
		const {bannerImage, caption, title, description, cta, onClick, overlay} = this.props
		
		return (
			<div
				className={'hero-banner ' + (overlay ? 'add-overlay' : '')}
				style={{backgroundImage: `url(${bannerImage})`}}>
				<div className="container">
					<div className="hero-banner__inner">
						<div>
							<h1 className="hero-banner__title" dangerouslySetInnerHTML={{__html: title}}/>
							<div className="hero-banner__description" dangerouslySetInnerHTML={{__html: description}}/>
							{
								cta && (
									<div className="hero-banner__cta">
										<button
											className="btn btn-large btn-cta"
											onClick={onClick}>
											{cta}
										</button>
									</div>
								)
							}
							{
								caption && <h4 className="hero-banner__caption">{caption}</h4>
							}
						</div>
					</div>
				</div>
			</div>
		)
	}
}