import * as React from 'react'
import { VideoRecord } from '../constants/models'
import { VideoService } from '../constants/enums'

export interface VideoProps extends VideoRecord {
	
}

const Video: React.StatelessComponent<VideoProps> = ({service, value}) => {
	return (
		<div className="video">
			{
				service === VideoService.YOUTUBE && (
					<embed src={value}/>
				)
			}
			{
				service === VideoService.VIMEO && (
					<embed src={value}/>
				)
			}
			{
				service === VideoService.LOCAL && (
					<video controls>
						<source src={value} type="video/mp4"/>
						Your browser does not support the video tag.
					</video>
				)
			}
		</div>
	)
}

export default Video