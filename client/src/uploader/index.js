import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Progressbar from '../progressbar';

export default class Uploader extends Component {
    state = {
        error: null,
        file: null,
        //idle, ready, uploading, uploadComplete, error
        state: 'idle',
        progress: 0
    }

    handleFiles = (event) => {
        if (event.target.files) {
            let csvfile = event.target.files[0];
            if (csvfile.type !== 'text/csv'){
                this.setState(
                    {error: csvfile.name + ' is not a .csv file',
                    state: 'error',
                    file: null}
                );
            } else {
                this.setState(
                    {error: null,
                    state: 'ready',
                    file: csvfile,
                    progress: 0}
                )
            }
        }
    }

    handleUpload = (event) => {
        //Because the new fetch() API doesn't support progress tracking
        let request = new XMLHttpRequest();
        request.open('POST', '/import');
        request.timeout = 30000;
        request.upload.addEventListener('progress', this.displayProgress, false);
        request.addEventListener('load', this.uploadSuccess);
        request.addEventListener('error', this.uploadError);
        request.addEventListener('timeout', this.uploadError);
        request.addEventListener('abort', this.uploadError);


        let formData = new FormData();
        formData.append("csvfile", this.state.file);
        request.send(formData);

        this.setState({state: 'uploading', progress: 0});
    }

    displayProgress = (event) => {
        if (event.lengthComputable) {
            this.setState({progress: event.loaded * 100 / event.total});
        }
    }

    uploadSuccess = (evt) => {
        if(evt.type !== 'load') {
            console.log(evt);
        }

        if(evt.target.status !== 200) {
            this.setState({
                state: 'error',
                error: evt.target.status + ' ' + evt.target.statusText
            });
            return;
        }
        this.setState({
            state: 'uploadComplete'
        });
        console.log('motherfucker');
    }

    uploadError = (evt) => {
        switch(evt.type) {
            case "timeout":
                this.setState({state: 'error',
                error: 'Timeout reached trying to post to ' + evt.target.responseURL});
                break;
        }
        console.log(evt);
    }

    render() {
        let style = {
            border: 'solid 1px',
            maxWidth: '50%'
        };

        let errorStyle = {
            color: 'red'
        }

        let status;
        if (this.state.error && this.state.progress != 0) {
            status = (
                <div>
                <Progressbar error={true} progress={this.state.progress} />
                <div style={{color: 'red'}}>{this.state.error}</div>
                </div>
            );
        } else if (this.state.error) {
            status = (
                <div style={{color: 'red'}}>{this.state.error}</div>
            );
        } if (this.state.progress != 0) {
            status = (<Progressbar progress={this.state.progress} />)
        }

        return (
            <div style={style}>
                <input type="file" id="uploadField" 
                onChange={this.handleFiles}
                multiple={false} />
                <button id="uploadButton" onClick={this.handleUpload} disabled={this.state.state!=='ready'}>Upload</button>
                {this.state.progress !==0 && 
                (<Progressbar progress={this.state.progress} error={this.state.state==='error'}/>)}
                {this.state.state === 'error' && (
                    <div style={errorStyle}>{this.state.error}</div>
                )}
                {this.state.state === 'uploadComplete' && (
                    <div>Successfully uploaded {this.state.file.name}</div>
                )}
            </div>
        );
    }
}