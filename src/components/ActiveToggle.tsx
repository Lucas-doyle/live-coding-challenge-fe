type ActiveToggleProps = {
  checked: boolean
  disabled?: boolean
  onChange: (next: boolean) => void
}

export function ActiveToggle({ checked, disabled, onChange }: ActiveToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={checked ? 'Mark as inactive' : 'Mark as active'}
      className={`status-toggle${checked ? ' is-on' : ''}`}
      disabled={disabled}
      onClick={(event) => {
        event.preventDefault()
        event.stopPropagation()
        onChange(!checked)
      }}
    >
      <span className="status-toggle-knob" />
    </button>
  )
}
