// import "katex/dist/katex.min.css";
import { FunctionComponent } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula as highlighterStyle } from 'react-syntax-highlighter/dist/esm/styles/prism';
// import rehypeKatexPlugin from 'rehype-katex';
import rehypeMathJaxSvg from "rehype-mathjax";
import rehypeRaw from "rehype-raw";
import remarkGfm from 'remark-gfm';
import remarkMathPlugin from 'remark-math';
import 'github-markdown-css'
import ExternalFigurlFigure from "./ExternalFigurlFigure";
import InternalFigurlFigure from "./InternalFigurlFigure";

type Props ={
	source: string
	internalFigureMode: boolean
}

const Markdown: FunctionComponent<Props> = ({source, internalFigureMode}) => {
	return (
		<div className="markdown-body">
			<ReactMarkdown
				children={source}
				remarkPlugins={[remarkGfm, remarkMathPlugin]}
				rehypePlugins={[rehypeRaw, rehypeMathJaxSvg/*, rehypeKatexPlugin*/]}
				components={{
					code: ({node, inline, className, children, ...props}) => {
						const match = /language-(\w+)/.exec(className || '')
						return !inline && match ? (
						<SyntaxHighlighter
							children={String(children).replace(/\n$/, '')}
							style={highlighterStyle as any}
							language={match[1]}
							PreTag="div"
							{...props}
						/>
						) : (
						<code className={className} {...props}>
							{children}
						</code>
						)
					},
					div: ({node, className, children, ...props}) => {
						if (className === 'figurl-figure') {
							if (internalFigureMode) {
								return (
									<InternalFigurlFigure
										src={(props as any).src}
										height={(props as any).height}
									/>
								)
							}
							else {
								return (
									<ExternalFigurlFigure
										src={(props as any).src}
										height={(props as any).height}
									/>
								)
							}
						}
						else {
							return <div className={className} {...props}>{children}</div>
						}
					}
				}}
				linkTarget="_blank"
			/>
		</div>
	)
}

export default Markdown
