import type { HorizontalNavItems } from '@layouts/types'

export default [
  {
    title: 'Home',
    to: { name: 'index' },
    icon: { icon: 'tabler-smart-home' },
  },
  {
    title: 'Events',
    to: { name: 'events' },
    icon: { icon: 'tabler-file' },
  },
  {
    title: 'Competitions',
    to: { name: 'competitions' },
    icon: { icon: 'tabler-file' },
  },
] as HorizontalNavItems
