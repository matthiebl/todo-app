import React from 'react'

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../api/firebase'
import { useNavigate } from 'react-router-dom'

interface LoginPageProps {
    register?: boolean
}

export const LoginPage: React.FC<LoginPageProps> = ({ register = false }) => {
    const navigate = useNavigate()

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const [error, setError] = React.useState('')

    const onSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(credentials => {
                console.log(credentials.user)
            })
            .catch(error => {
                if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                    setError('Incorrect email or password')
                    return
                }
                console.log(error)
            })
    }

    const onRegister = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(credentials => {
                console.log(credentials.user)
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    setError('Email already in use')
                    return
                }
                console.log(error.code)
                console.log(error.message)
            })
    }

    return (
        <div className='flex h-screen w-screen items-center justify-center'>
            <div className='w-full max-w-md space-y-8 p-4'>
                <div>
                    <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
                        {register ? 'Register a new account' : 'Sign in to your account'}
                    </h2>
                    <p className='mt-2 text-center text-sm text-gray-600'>
                        Or{' '}
                        <a
                            href={register ? '/login' : './register'}
                            onClick={event => {
                                event.preventDefault()
                                setError('')
                                navigate(register ? '/login' : '/register')
                            }}
                            className='font-medium text-indigo-600 hover:text-indigo-500'
                        >
                            {register ? 'sign in to an existing account' : 'register a new account'}
                        </a>
                    </p>
                </div>
                <form className='mt-8 space-y-6'>
                    <input type='hidden' name='remember' value='true' />
                    <div className='-space-y-px rounded-md shadow-sm'>
                        <div>
                            <label htmlFor='email-address' className='sr-only'>
                                Email address
                            </label>
                            <input
                                id='email-address'
                                name='email'
                                type='email'
                                value={email}
                                onChange={event => setEmail(event.target.value)}
                                required
                                className='relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                                placeholder='Email address'
                            />
                        </div>
                        <div>
                            <label htmlFor='password' className='sr-only'>
                                Password
                            </label>
                            <input
                                id='password'
                                name='password'
                                type='password'
                                value={password}
                                onChange={event => setPassword(event.target.value)}
                                required
                                className='relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                                placeholder='Password'
                            />
                        </div>
                    </div>

                    {error && <div className='text-sm text-red-500'>{error}</div>}

                    <div>
                        <button
                            type='submit'
                            onClick={event => {
                                event.preventDefault()
                                setError('')
                                register ? onRegister() : onSignIn()
                            }}
                            className='flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                        >
                            {register ? 'Register' : 'Sign in'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
