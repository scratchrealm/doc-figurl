import { FunctionComponent } from "react";
import { useLocation } from "react-router-dom";
import GithubMarkdownContent from "./GithubMarkdownContent";
import useWindowDimensions from "./useWindowDimensions";

type Props ={
}

const MainWindow: FunctionComponent<Props> = () => {
	const location = useLocation()
	const {width, height} = useWindowDimensions()

	if (location.pathname.startsWith('/gh/')) {
		return (
			<GithubMarkdownContent
				ghSource={`${location.pathname.slice('/gh/'.length)}`}
				width={width}
				height={height}
			/>
		)
	}

	return (
		<div>Invalid path</div>
	)
}

export default MainWindow
