import { parse } from '@conform-to/zod'
import { json, type DataFunctionArgs, type MetaFunction } from '@remix-run/node'
import { Link, Outlet } from '@remix-run/react'
import { safeRedirect } from 'remix-utils/safe-redirect'
import { z } from 'zod'
import { ContactFormEmail } from '#app/components/emails/contact-email.server.tsx'
import { GeneralErrorBoundary } from '#app/components/error-boundary.tsx'
import { Button } from '#app/components/ui/button.tsx'
import { Icon } from '#app/components/ui/icon.tsx'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '#app/components/ui/tooltip.tsx'
import { sendEmail } from '#app/utils/email.server.ts'
import { redirectWithToast } from '#app/utils/toast.server.ts'
import { EmailSchema } from '#app/utils/user-validation.ts'

const contactFormSchema = z.object({
	email: EmailSchema,
	name: z.string().min(1),
	message: z.string().min(1),
	redirectTo: z.string().optional(),
})

export async function action({ request }: DataFunctionArgs) {
	const formData = await request.formData()

	const submission = await parse(formData, {
		schema: contactFormSchema,
		// acceptMultipleErrors: () => true,
		async: true,
	})

	if (submission.intent !== 'submit') {
		return json({ status: 'idle', submission } as const)
	}
	if (!submission.value) {
		return json(
			{
				status: 'error',
				submission,
			} as const,
			{ status: 400 },
		)
	}
	const { email, name, message, redirectTo } = submission.value

	const response = await sendEmail({
		from: 'Contact Form from Wochlife <noreply@wochlife.com>',
		to: 'filip.cablik@icloud.com', // mail of preference where the message should be delivered to (owner of web, admin, etc.)
		reply_to: email,
		subject: `Web Form message from ` + email,
		react: <ContactFormEmail email={email} name={name} message={message} />,
	})

	if (response.status === 'success') {
		return redirectWithToast(safeRedirect(redirectTo, '/'), {
			title: 'Contact Form',
			description: 'Your message was sent! 👍.',
		})
	} else {
		submission.error[''] = [response.error.message]
		return json(
			{
				status: 'error',
				submission,
			} as const,
			{ status: 500 },
		)
	}
}

export const meta: MetaFunction = () => {
	return [{ title: 'Contacts | Wochlife' }]
}

export default function ContactForm() {
	return (
		<div className="container mx-auto flex flex-col justify-center pb-32 pt-20">
			<div className="delayed-fade-in-100">
				<div className="text-center">
					<h1 className="text-h3">Contact</h1>
					<p className="mt-6">Get in touch with me through socials </p>

					<div className="my-8">
						<div className="flex justify-center gap-5">
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<a
											href="https://github.com/fcablik/"
											target="_blank"
											rel="noreferrer"
											className='hover:text-highlight transition'
										>
											<Icon name="github-logo" size="xl" />
										</a>
									</TooltipTrigger>
									<TooltipContent>GitHub / @fcablik</TooltipContent>
								</Tooltip>
							</TooltipProvider>

							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<a
											href="https://discordapp.com/users/1051502197105508482"
											target="_blank"
											rel="noreferrer"
											className='hover:text-highlight transition'
										>
											<Icon name="discord-logo" size="xl" />
										</a>
									</TooltipTrigger>
									<TooltipContent>Discord / @filipcablik</TooltipContent>
								</Tooltip>
							</TooltipProvider>

							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<a
											href="https://www.linkedin.com/in/filipcablik/"
											target="_blank"
											rel="noreferrer"
											className='hover:text-highlight transition'
										>
											<Icon name="linkedin-logo" size="xl" />
										</a>
									</TooltipTrigger>
									<TooltipContent>LinkedIn / filipcablik</TooltipContent>
								</Tooltip>
							</TooltipProvider>

							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<a
											href="https://instagram.com/filipcablik"
											target="_blank"
											rel="noreferrer"
											className='hover:text-highlight transition'
										>
											<Icon name="instagram-logo" size="xl" />
										</a>
									</TooltipTrigger>
									<TooltipContent>Instagram / @filipcablik</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						</div>
					</div>
				</div>

				<div className="text-center">
					<Link to="form">
						<Button>Or Send a Message</Button>
					</Link>
				</div>
			</div>

			<Outlet />
		</div>
	)
}

export function ErrorBoundary() {
	return <GeneralErrorBoundary />
}
