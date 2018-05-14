var React = require('react')
var Scroll = require('scroll.react')
class Basic extends React.Component {
    render () {
        return (
            <div className="basicDemo" >
                <Scroll
                    style={{
                        height: '5em',
                        border: '1px dotted skyblue'
                    }}
                >
                    ... start
                    <div style={{height:"10em", border: '1px solid red'}}></div>
                    ... end
                </Scroll>
            </div>
        )
    }
}
/*ONFACE-DEL*/Basic = require("react-hot-loader").hot(module)(Basic)
module.exports = Basic
