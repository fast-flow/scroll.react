var React = require('react')
var Scroll = require('scroll.react')
import Icon from "icon.react"
import message from "face-message"
class Basic extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            photos: [
                'https://picsum.photos/100/1111'
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

                    pullUpFetch={(resolve) => {
                        setTimeout(function () {
                            if (self.state.photos.length < 3) {
                                let random = (parseInt(Math.random()*100) + 100)
                                self.setState({
                                    photos: self.state.photos.concat([`https://picsum.photos/${random}/${random}`])
                                })
                                resolve()
                            }
                            else {
                                resolve({type: 'empty'})
                            }

                        }, 500)
                    }}
                    pullUpDistance={20}
                    pullUpTip={( <div>上拉刷新</div> )}
                    pullUpReleaseTip={(<div>松开更新</div>)}
                    pullUpLoading={(<div>加载中...</div>)}
                    pullUpEmpty={(<div>没有更多了</div>)}

                    style={{
                        height: '20em',
                        border: '1px solid blue'
                    }}
                >
                    {
                        self.state.photos.map(function (item, key) {
                            let size = item.split('/').slice(-2)
                            return <img width={size[0]} height={size[1]} src={item} key={key} style={{display: 'block'}} alt=""/>
                        })
                    }
                </Scroll>
            </div>
        )
    }
}
/*ONFACE-DEL*/Basic = require("react-hot-loader").hot(module)(Basic)
module.exports = Basic
