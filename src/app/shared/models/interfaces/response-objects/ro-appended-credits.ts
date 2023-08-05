import { IRoCast } from "./ro-cast"
import { IRoCrew } from "./ro-crew"

export interface IRoAppendedCredits {
    id: number
    cast: IRoCast[]
    crew: IRoCrew[]
}
