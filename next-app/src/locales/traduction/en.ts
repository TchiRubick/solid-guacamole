export default {
  hero: {
    title: 'Are you the chosen one?',
    description:
      "Don't you care about how your website is built, how modern it is, or how fast it runs. You prefere to have it for a cheaper price delivered in a record time without minding about security, performance, scalability or the best practice ?",
    'fit-button': 'That fit my description',
    'disagree-button': 'I disagree !!',
  },
  'signin-form': {
    title: 'Login',
    description: 'Enter your email below to login to your account',
    'email-label': 'Email',
    'email-placeholder': 'm@example.com',
    'password-label': 'Password',
    'login-button': 'Login',
    'forgot-password-link': 'Forgot your password?',
    'sign-up-link': 'Sign up',
    'no-account': "Don't have an account?",
    'email-not-found': 'Email not found',
    'invalid-credentials': 'Invalid credentials',
  },
  'server-error': {
    'min-email-length': 'Email must be at least 3 characters',
    'max-email-length': 'Email must be less than 255 characters',
    'min-password-length': 'Password must be at least 6 characters',
    'max-password-length': 'Password must be less than 255 characters',
  },
} as const;
