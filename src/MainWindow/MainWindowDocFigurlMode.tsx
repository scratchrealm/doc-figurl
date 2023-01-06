import { FunctionComponent } from "react";
import { useLocation } from "react-router-dom";
import GithubMarkdownContent from "./GithubMarkdownContent";
import useGithubMarkdownContent from "./useGithubMarkdownContent";

type Props ={
	width: number
	height: number
}

const MainWindowDocFigurlMode: FunctionComponent<Props> = ({width, height}) => {
	const location = useLocation()

	const ghSourceUri = `${location.pathname.slice('/gh/'.length)}`

	const {markdownContent, error} = useGithubMarkdownContent(ghSourceUri)

	if (!location.pathname.startsWith('/gh/')) {
		return (
			<div>Invalid path</div>
		)
	}
	if (error) {
		return <div style={{color: 'red'}}>Error: {error}</div>
	}
	if (!markdownContent) {
		return <div>Loading markdown from {ghSourceUri}</div>
	}
	const ghSourceUrl = `https://github.com/${ghSourceUri}`
	return (
		<div
			// tabIndex={0}
			// onKeyDown={handleKeyDown}
		>
			<div style={{color: '#aaaaff', textAlign: 'center'}}>
				<br />
				Viewing <a style={{color: 'inherit'}} href={ghSourceUrl} target="_blank" rel="noreferrer">{ghSourceUrl}</a>
			</div>
			<GithubMarkdownContent
				markdown={markdownContent}
				internalFigureMode={false}
				width={width}
				height={height}
			/>
		</div>
	)
}

export default MainWindowDocFigurlMode
