import * as React from 'react'

export interface LinkableSocialProps {
	name: string
	linked?: boolean
}

const LinkableSocial: React.StatelessComponent<LinkableSocialProps> = ({name, linked}) => {
	return (
		<div className={'linkable-social' + ' ' + (linked ? 'linked' : '')}>
			<span className={'icon icon-primary icon-' + name}/>
			{
				!linked && <span className={'icon icon-plus icon-connect'}/>
			}
		</div>
	)
}

export default LinkableSocial