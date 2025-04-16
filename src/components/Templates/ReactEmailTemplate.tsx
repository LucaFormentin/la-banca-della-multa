import {
  Body,
  Button,
  Container,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components'

export type EmailBodyT = {
  teamId: string
  teamName: string
  adminAddress?: string | null
  adminName: string | null
  applicantEmail: string | null
}

const baseImgURL =
  process.env.NODE_ENV === 'production'
    ? 'http://192.168.1.170:3000'
    : '/static'

const baseApiURL = process.env.VERCEL_URL

const ReactEmailTemplate = (props: EmailBodyT) => {
  const acceptRequestApiHref = `${baseApiURL}/api/email/accept-join-request?teamId=${props.teamId}&applicantEmail=${props.applicantEmail}`

  return (
    <Html>
      <Tailwind>
        <Body className='bg-white m-auto px-2 font-sans'>
          <Preview>Hai una nuova richiesta di partecipazione!</Preview>
          <Container className='border border-solid border-gray-300 rounded my-10 mx-auto p-5 max-w-xl'>
            <Section className='mt-8'>
              <Img
                src={`${baseImgURL}/assets/android-chrome-512x512.png`}
                width={48}
                height={48}
                alt='logo'
                className='my-0 mx-auto'
              />
              <Heading className='text-black text-2xl text-center font-normal p-0 my-6 mx-0'>
                <strong>La Banca della Multa</strong>
              </Heading>
              <Text className='text-sm leading-6'>Ciao {props.adminName},</Text>
              <Text className='text-sm leading-6'>
                Ti informo che l'utente <strong>{props.applicantEmail}</strong>{' '}
                ha richiesto di partecipare alla tua squadra{' '}
                <strong>{props.teamName}</strong>.
              </Text>
              <Text className='text-sm leading-6'>
                Se conosci questa persona, puoi accettare la sua richiesta
                cliccando il pulsante qui sotto.
              </Text>
            </Section>
            <Section className='my-8 text-center'>
              <Button
                className='bg-black rounded text-white text-sm font-semibold no-underline text-center px-5 py-3'
                href={acceptRequestApiHref}
              >
                Accetta la Richiesta
              </Button>
            </Section>
            <Text>Altrimenti, ignora questa mail.</Text>
            <Hr className='border border-solid border-gray-500 my-6 mx-0 w-full' />
            <Text className='text-xs leading-6 text-gray-500'>
              Questa mail è stata generata automaticamente dalla web app{' '}
              <span className='text-black'>La Banca della Multa</span>. Si prega
              di non rispondere a questa mail. Se si riscontrano dei problemi si
              prega di contattare direttamente il proprietario della
              applicazione all'indirizzo:{' '}
              <Link
                href={'mailto:labancadellamulta@gmail.com'}
                className='text-black underline'
              >
                labancadellamulta@gmail.com
              </Link>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default ReactEmailTemplate
