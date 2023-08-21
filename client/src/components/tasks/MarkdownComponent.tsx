import { useContext } from 'react';
import ReactMarkdown from 'react-markdown';
//import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
	oneDark,
	oneLight,
} from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import { ThemeContext } from '../../services/Themes/Theme';

import { ListItem, UnorderedList } from '@carbon/react';

type MarkDownComponentProps = {
	text: string;
};

const MarkDownComponent = ({ text }: MarkDownComponentProps) => {
	const { isLightTheme } = useContext(ThemeContext);
	return (
		<ReactMarkdown
			className='markdown'
			remarkPlugins={[remarkGfm]}
			components={{
				h1: props => <h1 {...props} style={{ padding: '1em 0em' }}></h1>,
				h2: props => <h2 {...props} style={{ padding: '0.5em 0em' }}></h2>,
				ul: props => (
					<UnorderedList {...props} style={{ padding: '1em 2em' }} />
				),
				li: props => <ListItem {...props} />,
				code({ node, inline, className, children, ...props }) {
					const match = /language-(\w+)/.exec(className || '');
					return !inline && match ? (
						<SyntaxHighlighter
							children={String(children).replace(/\n$/, '')}
							style={isLightTheme ? (oneLight as any) : (oneDark as any)}
							language={match[1]}
							PreTag='div'
							{...props}
						/>
					) : (
						<code className={className} {...props}>
							{children}
						</code>
					);
				},
			}}
		>
			{text}
		</ReactMarkdown>
	);
};

export default MarkDownComponent;
