import { defineAbilityFor } from './defineAbilityFor.js'

const ability = defineAbilityFor({ role: 'MEMBER' })

console.log(ability.can('invite', 'User'))
console.log(ability.can('delete', 'User'))
console.log(ability.cannot('delete', 'User'))
