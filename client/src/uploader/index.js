import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export default class Uploader extends Component {
    state = {
        error: null,
        file: null
    }

    handleFiles = (event) => {
        if (event.target.files) {
            let csvfile = event.target.files[0];
            if (csvfile.type != 'text/csv'){
                this.setState(
                    {error: csvfile.name + ' is not a .csv file',
                    file: null}
                );
            } else {
                this.setState(
                    {error: null,
                    file: csvfile}
                )
            }
        }
    }

    handleUpload = (event) => {
    }

    render() {
        let style = {
            border: 'solid 1px',
            maxWidth: '50%'
        };

        return (
            <div style={style}>
                <input type="file" id="uploadField" 
                onChange={this.handleFiles}
                multiple={false} />
                <button id="uploadButton" onClick={this.handleUpload} disabled={!this.state.file}>Upload</button>
                {this.state.error && 
                    (<div style={{color: 'red'}}>{this.state.error}</div>)
                }
            </div>
        );
    }
}