import { ReactNode } from 'react'

export interface Props {
  type?: "button" | "submit"
  children: ReactNode
}
const Button = ({ type = "button", children, ...props }: Props) => {
  return (
    <button disabled={props.disabled} className="items-center rounded border border-transparent bg-primary-600 px-2 py-1 text-md md:text-lg text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 tracking-wide cursor-pointer hover:bg-primary-700  hover:transition-all">{children}</button>
  )
}

export default Button;
