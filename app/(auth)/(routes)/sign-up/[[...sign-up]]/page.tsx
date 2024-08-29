import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return <SignUp
  appearance={{
    elements: {
      formButtonPrimary: 'bg-[#3333ff] hover:bg-[#2e2ee6] text-sm',
    }}}
   />
}