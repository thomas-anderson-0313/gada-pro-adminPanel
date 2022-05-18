import React from "react"

const SearchBox = ({ styleName, placeholder, onChange, value }) => {
  return (
    <div className={`search-bar right-side-icon bg-transparent ${styleName}`}>
      <div className="form-group">
        <button className="search-icon"></button>
      </div>
    </div>
  )
}
export default SearchBox

SearchBox.defaultProps = {
  styleName: "",
  value: "",
}
