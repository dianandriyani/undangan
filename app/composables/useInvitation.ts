import { INVITATIONS } from '../constants/invitations'

import type { Invitation } from '../../shared/types/invitation'

export function useInvitation() {
  function getBySlug(slug: string): Invitation | undefined {
    return INVITATIONS.find(
      (invitation) => invitation.slug === slug,
    )
  }

  function getPublished(): Invitation[] {
    return INVITATIONS.filter(
      (invitation) => invitation.status === 'published',
    )
  }

  function getDefault(): Invitation | undefined {
    return (
      getPublished()[0] ??
      INVITATIONS[0]
    )
  }

  return {
    getBySlug,
    getPublished,
    getDefault,
  }
}
