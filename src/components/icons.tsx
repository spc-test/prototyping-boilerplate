import { Command, Moon, SunMedium, Plus, Trash2, Edit2, Check, X } from "lucide-react"

export type IconKeys = keyof typeof icons

type IconsType = {
  [key in IconKeys]: React.ElementType
}

const icons = {
  logo: Command,
  sun: SunMedium,
  moon: Moon,
  plus: Plus,
  trash: Trash2,
  edit: Edit2,
  check: Check,
  close: X,
}

export const Icons: IconsType = icons
