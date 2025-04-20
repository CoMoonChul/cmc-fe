import GoogleAuthCallback from '@/features/user/ui/GoogleAuthCallback'

type SearchParams = Promise<{ [key: string]: string | undefined }>

const GoogleAuthCallbackPage = async (props: {
  searchParams: SearchParams
}) => {
  const searchParams = await props.searchParams
  return <GoogleAuthCallback flow={searchParams.flow ?? ''} />
}

export default GoogleAuthCallbackPage
