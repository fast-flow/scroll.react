import p from 'prop-types'
export default function (app) {
    app.defaultProps = {
        prefixClassName: 'face-scroll',
        themes: '',
        onRelease: function () {
            return true
        },
        onChange: function () {}
    }
    app.propTypes = {
        prefixClassName: p.string,
        themes: p.string
    }
}
