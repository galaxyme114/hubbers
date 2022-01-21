import * as React from 'react'

export interface ImageIconProps {
	name: string,
	isHighlighted?: boolean
}

const ImageIcon: React.StatelessComponent<ImageIconProps> = ({name, isHighlighted = false}) => {
	return (
		<img src={'https://hubbers-hk.oss-cn-hongkong.aliyuncs.com/assets/pldt/icons/' + name + '.svg'}/>
	)
}

export default ImageIcon