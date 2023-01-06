import { FunctionComponent, useCallback } from "react";
import TinyButton from "./TinyButton";

type Props ={
	src?: string
	visible: boolean
	setVisible: (v: boolean) => void
}

const ss = 14

const style0: React.CSSProperties = {
	position: 'relative',
	width: '100%',
	height: ss,
	background: 'lightgray'
	// background: '#65a6fc'
}

const FigurlFigureMenuBar: FunctionComponent<Props> = ({src, visible, setVisible}) => {
	const handleOpen = useCallback(() => {
		window.open(src, '_blank')
	}, [src])
	return (
		<div
			style={style0}
		>
			{
				src && (
					<div style={{float: 'right'}}>
						<TinyButton onClick={handleOpen} width={ss} height={ss} margin={3} title="Open in new tab" />
					</div>
				)
			}
			<div style={{float: 'right'}}>
				<TinyButton onClick={() => setVisible(!visible)} width={ss} height={ss} margin={3} title="Toggle visibility" />
			</div>
		</div>
	)
}

export default FigurlFigureMenuBar
