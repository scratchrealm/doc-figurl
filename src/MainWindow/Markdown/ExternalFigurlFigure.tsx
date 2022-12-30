import { FunctionComponent } from "react";
import ReactVisibilitySensor from "react-visibility-sensor";

type Props ={
	src: string
	height: number
}

const ExternalFigurlFigure: FunctionComponent<Props> = ({src, height}) => {
	return (
		<ReactVisibilitySensor partialVisibility={true}>
			{({isVisible}: {isVisible: boolean}) => 
				isVisible ? (
					<iframe
						title="external figurl figure"
						src={src}
						width="100%"
						height={height}
						frameBorder={0}
					/>
				) : (
					<div
						style={{position: 'relative', width: "100%", height}}
					>
						Waiting for visible
					</div>
				)
			}
		</ReactVisibilitySensor>
	)
}

export default ExternalFigurlFigure
