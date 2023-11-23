import type { MDXComponents } from 'mdx/types'
import { Ubuntu_Mono } from 'next/font/google'

const ubuntumon = Ubuntu_Mono({ subsets: ['latin'], weight: ['400']})

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => <h1 {...props} className="fw-bold text-center p-3" />,
    h2: (props) => <h2 {...props} className='pt-3'/>,
    h3: (props) => <h3 {...props} className='pt-3' />,
    pre: (props) => <pre {...props} className="p-3" />,
    code: (props) => <code {...props} style={{ lineHeight: '1', fontSize: '1.1rem'}} className={ubuntumon.className}/>,
    ...components,
  }
}