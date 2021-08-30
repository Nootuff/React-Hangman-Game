import React from "react"

class AlphaButtons extends React.Component {
    render() {
        return (
            <button className="AlphaButtons" value={this.props.ltr} onClick={this.props.function} disabled={this.props.disabler}>
                {this.props.ltr}
            </button>
        )
    }
}

export default AlphaButtons