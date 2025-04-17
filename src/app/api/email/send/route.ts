import ReactEmailTemplate, { type EmailBodyT } from '@/components/Templates/ReactEmailTemplate'
import { generateRandomStr } from '@/lib/utils/helpers'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// You can only send testing emails to your own email address (labancadellamulta@gmail.com).
// To send emails to other recipients, please verify a domain at resend.com/domains,
// and change the `from` address to an email using this domain.

export async function POST(req: Request) {
  const reqData = (await req.json()) as EmailBodyT

  const toAddress = reqData.adminAddress || 'labancadellamulta@gmail.com'

  try {
    const { data, error } = await resend.emails.send({
      from: 'La Banca della Multa <noreply@bancadellamulta.it>',
      to: toAddress,
      subject: `Richiesta di partecipazione - #${generateRandomStr(12)}`,
      react: ReactEmailTemplate({
        teamId: reqData.teamId,
        teamName: reqData.teamName,
        adminName: reqData.adminName,
        applicantEmail: reqData.applicantEmail,
      }),
    })

    if (error) {
      return Response.json({ error: error.message }, { status: 500 })
    }

    return Response.json({ data })
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}
