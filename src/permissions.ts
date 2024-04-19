import { AbilityBuilder } from '@casl/ability'

import { AppAbility } from './defineAbilityFor.js'
import { User } from './models/user.js'

type Roles = 'ADMIN' | 'MEMBER'

type PermissionsByRole = (
  user: User,
  builder: AbilityBuilder<AppAbility>
) => void

export const permissions: Record<Roles, PermissionsByRole> = {
  ADMIN(_, { can }) {
    can('manage', 'all')
  },

  MEMBER(_, { can }) {
    can('invite', 'User')
    can('create', 'Project')
  }
}
