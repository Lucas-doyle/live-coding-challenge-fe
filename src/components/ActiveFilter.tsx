type ActiveFilterProps = {
  checked: boolean
  onChange: (checked: boolean) => void
}

export function ActiveFilter({ checked, onChange }: ActiveFilterProps) {
  return (
    <label className="active-filter">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span>Active only</span>
    </label>
  )
}
