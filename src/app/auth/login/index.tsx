import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Separator } from '@/components/ui/separator'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { schema } from '@/utils/schema.zod'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import googleIcon from '@/assets/iconsGoogle.svg'
import githubIcon from '@/assets/githubIcon.svg'
import { Link } from 'react-router'
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
  useSignInWithGithub
} from 'react-firebase-hooks/auth'
import { auth } from '@/firebase/firebase.conf'
import { useTransition } from 'react'

type FormData = z.infer<typeof schema>


export function LoginPage() {
  const [isPending, startTransition] = useTransition()
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth)
  const [signInWithGoogle] = useSignInWithGoogle(auth)
  const [signInWithGithub] = useSignInWithGithub(auth)

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<FormData> = (data) => {
    startTransition(async () => {
      try {
        await signInWithEmailAndPassword(data.email, data.password)
        form.reset()

      } catch (error) {
        console.error(error)
      }
    })
  }

  return (
    <>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className='text-center'>Login</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent
          className='flex flex-col gap-4'
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 mt-2"
            >
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username or Email</FormLabel>
                    <FormControl>
                      <Input {...field} autoComplete='off' placeholder="L7NlU@example.com" />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.email?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" placeholder="password" />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.password?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <Button
                type='submit'
                disabled={isPending}
                className={`w-full capitalize font-bold text-sm ${isPending && 'cursor-not-allowed'}`}
              >
                login
              </Button>
            </form>
          </Form>
          <div className='flex items-center gap-2'>
            <i className='border w-full h-0 rounded-sm' />
            <p className='text-center text-muted-foreground font-semibold'>or</p>
            <i className='border w-full h-0 rounded-sm' />
          </div>
          <div
            className='flex flex-col gap-2'
          >
            <Button
              onClick={() => signInWithGoogle()}
            >
              <img
                src={googleIcon}
                alt="icon google"
                className='size-6'
              />
              <span>Login with Google</span>
            </Button>
            <Button
              onClick={() => signInWithGithub()}
            >
              <img
                src={githubIcon}
                alt="icon github"
                className='size-6'
              />
              <span>Login with Github</span>
            </Button>
          </div>
        </CardContent>
        <CardFooter
          className='flex flex-col gap-2 justify-center'
        >
          <p className='text-center text-muted-foreground text-sm flex gap-2'>
            <span>Don&apos;t have an account?</span>
            <Link
              to={'/auth/register'}
              className='underline underline-offset-4'
            >
              Register
            </Link>
          </p>
        </CardFooter>
      </Card>
    </>
  )
}