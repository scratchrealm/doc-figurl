import { FunctionComponent, PropsWithChildren, useMemo } from "react";
import { ReactElement } from "react-markdown/lib/react-markdown";
import Markdown from "./Markdown/Markdown";
import processMarkdown from "./processMarkdown";
import useGithubMarkdownContent from "./useGithubMarkdownContent";

type Props ={
	ghSource: string
	width: number
	height: number
}

const GithubMarkdownContent: FunctionComponent<Props> = ({width, height, ghSource}) => {
	const {content, error} = useGithubMarkdownContent(ghSource)
	const processedContent = useMemo(() => (content !== undefined ? processMarkdown(content) : undefined), [content])
	if (error) {
		return <div style={{color: 'red'}}>Error: {error}</div>
	}
	if (processedContent === undefined) {
		return <div>Loading {ghSource}</div>
	}
	return (
		<Wrapper
			width={width}
			height={height}
		>
			<Markdown source={processedContent} />
		</Wrapper>
	)
}

const Wrapper: FunctionComponent<PropsWithChildren<{width: number, height: number}>> = ({children, width, height}) => {
	const cc = children as ReactElement
	let hOuterMargin = 30
	const hInnerMargin = 45
	const maxInnerWidth = 1300
	const extra = width - hInnerMargin * 2 - hOuterMargin * 2 - maxInnerWidth
	if (extra > 0) {
		hOuterMargin += extra / 2
	}
	const vOuterMargin = 30
	const vInnerMargin = 30
	const W1 = width - hOuterMargin * 2
	const W2 = W1 - hInnerMargin * 2
	return (
		<div style={{position: 'relative', left: hOuterMargin, width: W1, top: vOuterMargin, border: 'solid 1px lightgray', paddingBottom: 100}}>
			<div style={{position: 'relative', left: hInnerMargin, width: W2, top: vInnerMargin}}>
				<cc.type {...cc.props} />
			</div>
		</div>
	)
}

export default GithubMarkdownContent
