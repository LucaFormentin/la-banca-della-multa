import Image from "next/image"

type Props = {
  onClick?: (e: React.MouseEvent) => void
}

const GoogleBtn = (props: Props) => {
  return (
    <button className='p-4 rounded-full border border-solid border-white/[.145] hover:bg-white/[.145]' onClick={props.onClick}>
      <Image src={'/assets/google.png'} alt='Google' width={20} height={20} className='inline-block mr-2' />
      Sign In with Google
    </button>
  )
}

export default GoogleBtn
