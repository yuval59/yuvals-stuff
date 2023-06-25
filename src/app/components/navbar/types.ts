import { ROUTES } from '@/constants'

export type NavbarProps = {
  page: (typeof ROUTES)[keyof typeof ROUTES]
}
