import { Component } from "react"
import extend from "extend"
import util from "util.react"
require('./index.css')
class Scroll extends Component {
    constructor (props) {
        super(props)
        util.betterDefaultValue(props)
        const self = this
        this.state = {}
    }
    componentDidMount () {
        const self = this
        self.refs.root.addEventListener('touchstart', function (e) {
            self.setState({
                startY: e.touches[0].clientY
            })
        })
        self.refs.root.addEventListener('touchmove', function (e) {
            e.preventDefault()
            e.stopPropagation()
            self.setState({
                y: e.touches[0].clientY - self.state.startY
            })
        })
    }
    render() {
        const self = this
        var rootClassName = [
            self.props.prefixClassName,
            util.themes(self.props),
        ].join(' ')

        return (
            <div
                ref="root"
                className={rootClassName}
                style={self.props.style}
            >
                <div style={{position: 'relative', top: self.state.y}} >
                    {self.props.children}
                </div>
            </div>
        )
    }
}
require('./props').default(Scroll)
export default Scroll
module.exports= Scroll
