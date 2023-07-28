import type { VerticalNavItems } from '@/@layouts/types'

export default [
  {
    title: 'Events',
    to: { name: 'events' },
    icon: { icon: 'mdi-file-document-outline' },
  },
  {
    title: 'Users',
    to: { name: 'users' },
    icon: { icon: 'mdi-users' },
  },
  {
    title: 'Profiles',
    to: { name: 'profiles' },
    icon: { icon: 'mdi-user' },
  },
  {
    title: 'Pets',
    to: { name: 'pets' },
    icon: { icon: 'mdi-paw' },
  },
] as VerticalNavItems
