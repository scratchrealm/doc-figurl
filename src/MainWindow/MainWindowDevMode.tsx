import { FunctionComponent, useCallback } from "react";
import GithubMarkdownContent from "./GithubMarkdownContent";
import useDevModeMarkdownContent from "./useDevModeMarkdownContent";

type Props ={
	width: number
	height: number
	docUrl: string
}

const MainWindowDevMode: FunctionComponent<Props> = ({width, height, docUrl}) => {
	const {markdownContent, error, refresh} = useDevModeMarkdownContent(docUrl)

	const handleKeyDown = useCallback((e: any) => {
		if (e.key === 'r') {
			refresh()
		}
	}, [refresh])

	if (error) {
		return <div style={{color: 'red'}}>Error: {error}</div>
	}
	if (!markdownContent) {
		return <div>Loading markdown from {docUrl}</div>
	}
	return (
		<div
			tabIndex={0}
			onKeyDown={handleKeyDown}
		>
			<GithubMarkdownContent
				markdown={markdownContent}
				internalFigureMode={false}
				width={width}
				height={height}
			/>
		</div>
	)
}

export default MainWindowDevMode
