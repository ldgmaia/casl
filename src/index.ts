import { defineAbilityFor } from './defineAbilityFor.js'

const ability = defineAbilityFor({ role: 'MEMBER' })

console.log(ability.can('transfer_ownership', 'Organization'))
console.log(ability.can('delete', 'User'))
console.log(ability.cannot('delete', 'User'))
