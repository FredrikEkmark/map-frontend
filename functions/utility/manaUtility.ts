import {Mana, ManaCost} from "../../types/manaTypes";

export function canPayManaInFull(playerMana: Mana, cost: ManaCost): boolean {

    console.log(cost.manpower)

    if (playerMana.manpower < (cost.manpower || 0))
        return false

    if (playerMana.food < (cost.food || 0))
        return false

    if (playerMana.wood < (cost.wood || 0))
        return false

    if (playerMana.stone < (cost.stone || 0))
        return false

    if (playerMana.leather < (cost.leather || 0))
        return false

    if (playerMana.simpleClothes < (cost.simpleClothes || 0))
        return false

    if (playerMana.furniture < (cost.furniture || 0))
        return false

    return true
}