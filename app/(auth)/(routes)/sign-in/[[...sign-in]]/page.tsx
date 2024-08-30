import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return <SignIn appearance={{
    elements: {
      formButtonPrimary: 'bg-[#3333ff] hover:bg-[#2e2ee6] text-sm',
    },
  }} />
}