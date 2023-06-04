import type { HorizontalNavItems } from '@layouts/types'

export default [
  {
    title: 'Home',
    to: { name: 'index' },
    icon: { icon: 'mdi-home-outline' },
  },
  {
    title: 'Events',
    to: { name: 'events' },
    icon: { icon: 'mdi-file-document-outline' },
  },
] as HorizontalNavItems
