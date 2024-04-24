import { ROUTES } from '@/app'

export type NavbarProps = {
  page: (typeof ROUTES)[keyof typeof ROUTES]
}
