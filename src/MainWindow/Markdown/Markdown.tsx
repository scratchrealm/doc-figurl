import "katex/dist/katex.min.css";
import { FunctionComponent } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula as highlighterStyle } from 'react-syntax-highlighter/dist/esm/styles/prism';
import rehypeKatexPlugin from 'rehype-katex';
import rehypeRaw from "rehype-raw";
import remarkGfm from 'remark-gfm';
import remarkMathPlugin from 'remark-math';
import 'github-markdown-css'

type Props ={
	source: string
}

const Markdown: FunctionComponent<Props> = ({source}) => {
	return (
		<div className="markdown-body">
			<ReactMarkdown
				children={source}
				remarkPlugins={[remarkGfm, remarkMathPlugin]}
				rehypePlugins={[rehypeRaw, rehypeKatexPlugin]}
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
					}
				}}
				linkTarget="_blank"
			/>
		</div>
	)
}

export default Markdown
