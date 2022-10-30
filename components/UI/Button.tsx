import { ReactNode } from 'react'

export interface Props {
  type?: "button" | "submit"
  children: ReactNode
}
const Button = ({ type = "button", children, ...props }: Props) => {
  return (
    <button disabled={props.disabled} className="inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">{children}</button>
  )
}

export default Button;
