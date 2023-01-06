import { FunctionComponent, useMemo } from "react";
import './TinyButton.css'

type Props ={
	onClick: () => void
	width: number
	height: number
	title: string
	margin: number
}

const TinyButton: FunctionComponent<Props> = ({onClick, width, height, margin, title}) => {
	const styleOuter: React.CSSProperties = useMemo(() => ({
		position: 'relative',
		width,
		height
	}), [width, height])
	const styleInner: React.CSSProperties = useMemo(() => ({
		position: 'relative',
		left: margin,
		top: margin,
		width: width - margin * 2,
		height: height - margin * 2
	}), [width, height, margin])
	return (
		<div style={styleOuter}>
			<div style={styleInner} className="TinyButton" title={title} onClick={onClick} />
		</div>
	)
}

export default TinyButton
