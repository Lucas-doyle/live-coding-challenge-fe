type SearchInputProps = {
  value: string
  onChange: (value: string) => void
}

export function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <label className="search-field">
      <span>Search titles</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Filter by page title…"
        aria-label="Search by page title"
      />
    </label>
  )
}
