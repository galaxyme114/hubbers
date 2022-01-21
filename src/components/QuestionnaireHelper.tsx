import * as React from 'react'
import { VideoRecord } from '../constants/models'

export interface QuestionnaireHelperProps {
	title: string,
	explanation: [string],
	video: VideoRecord,
	links: [string],
	image: string,
	onClick: any
}

export default class QuestionnaireHelper extends React.Component<QuestionnaireHelperProps, {}> {
	public render() {
		const {title, explanation, image, links, onClick} = this.props
		
		const helperImage = image ? 'url(' + image + ')' : 'url(./images/tutorial-poster.png)'
		
		return (
			<div className="questionnaire-helper">
				<div className="questionnaire-helper__title">{title}</div>
				<div className="questionnaire-helper__video" style={{backgroundImage: helperImage}}/>
				{
					explanation && (
						<div className="questionnaire-helper__explanation">
							{
								explanation.map((e, index) => (
									<p
										key={index}
										dangerouslySetInnerHTML={{__html: e}}
										onClick={() => {
											const link = links[links.length >= index ? index : 0]
											if (link) {
												onClick(link)
											}
										}}/>
								))
							}
						</div>
					)
				}
			</div>
		)
	}
}