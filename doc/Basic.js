var React = require('react')
var Scroll = require('scroll.react')
import Icon from "icon.react"
import message from "face-message"
class Basic extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            photos: [
                'https://picsum.photos/100/1001'
            ]
        }
    }
    render () {
        const startTriggerUpdateDistance = 30
        const self = this
        return (
            <div className="basicDemo" >
                <Scroll
                    ref={(node) => {
                        self.$refs = self.$refs || {}
                        self.$refs.scroll = node
                    }}
                    pullDownFetch={function(resolve) {
                        setTimeout(function () {
                            if (self.state.photos.length < 3) {
                                let random = (parseInt(Math.random()*100) + 100)
                                self.setState({
                                    photos: [`https://picsum.photos/${random}/${random}`].concat(self.state.photos)
                                })
                            }
                            else {
                                message.info('没有更多了')
                            }
                            resolve()
                        }, 500)
                    }}
                    pullDownDistance={20}
                    pullDownTip={( <div>下拉刷新</div> )}
                    pullDownReleaseTip={(<div>松开更新</div>)}
                    pullDownLoading={(<div>加载中...</div>)}
                    style={{
                        height: '20em',
                        border: '1px solid blue'
                    }}
                >
                    {
                        self.state.photos.map(function (item, key) {
                            return <img src={item} key={key} style={{display: 'block'}} alt=""/>
                        })
                    }
                </Scroll>
            </div>
        )
    }
}
/*ONFACE-DEL*/Basic = require("react-hot-loader").hot(module)(Basic)
module.exports = Basic
