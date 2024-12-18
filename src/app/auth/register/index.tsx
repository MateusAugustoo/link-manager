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
import { Link } from 'react-router'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { FirebaseError } from 'firebase/app'
import { auth } from '@/firebase/firebase.conf'
import { useToast } from '@/hooks/use-toast'
import { useTransition } from 'react'

type FormData = z.infer<typeof schema>

export function RegisterPage() {
  const [isPending, startTransition] = useTransition()
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth)
  const { toast } = useToast()

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit: SubmitHandler<FormData> = (data) => {
    startTransition(async () => {
      try {
        await createUserWithEmailAndPassword(data.email, data.password)
        form.reset()
        toast({
          title: 'Success',
          description: 'User created successfully',
          duration: 3000
        })
      } catch (error) {
        if (error instanceof FirebaseError) {
          console.log(error)
        }
      }
    })
  }

  return (
    <>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className='text-center'>Register</CardTitle>
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
              <FormField
                name='confirmPassword'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" placeholder="confirm password" />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.confirmPassword?.message}
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
        </CardContent>
        <CardFooter
          className='flex flex-col gap-2 justify-center'
        >
          <p className='text-center text-muted-foreground text-sm flex gap-2'>
            <span>Already have an account?</span>
            <Link
              to={'/auth/login'}
              className='underline underline-offset-4'
            >
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </>
  )
}