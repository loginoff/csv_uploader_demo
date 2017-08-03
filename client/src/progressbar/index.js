import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export default class Progressbar extends Component {
    static defaultProps = {
        error: false,
        progress: 0
    }

    render() {
        let innerStyle = {
            position: 'absolute',
            display: 'block',
            left: 0,
            top: 0,
            display: 'block',
            height: '15px',
            width: this.props.progress + '%',
            height: '100%',
            //padding: '2px 5px',
            // margin: '2px 0',
            borderRadius: '5px',
            backgroundColor: '#428bca',
            backgroundImage: 'linear-gradient(to bottom,#428bca 0,#3071a9 100%)',
            opacity: 0.7,
        };

        let outerStyle = {
            borderRadius: '5px',
            position: 'relative',
            display: 'block',
            height: '15px',
            backgroundColor: '#ebebeb',
            backgroundImage: 'linear-gradient(to bottom,#ebebeb 0,#f5f5f5 100%)'
        }

        if (this.props.progress == 100 ) {
            innerStyle.backgroundColor = '#0AA699'
            delete innerStyle['backgroundImage']
        }

        if (this.props.error) {
            innerStyle.backgroundColor = '#F35958'
            delete innerStyle['backgroundImage']
        }

        return (
            <div style={outerStyle}>
                <div style={innerStyle}></div>
            </div>

        );
    }
}