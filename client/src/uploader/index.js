import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Progressbar from '../progressbar';
import { Input, Icon, Button, Progress } from 'semantic-ui-react';

export default class Uploader extends Component {
    state = {
        error: null,
        file: null,
        //idle, ready, retry, uploading, uploadComplete, error
        state: 'idle',
        progress: 0
    }

    handleFiles = (event) => {
        if (event.target.files) {
            let csvfile = event.target.files[0];
            if (csvfile.type !== 'text/csv') {
                this.setState(
                    {
                        error: csvfile.name + ' is not a .csv file',
                        state: 'error',
                        file: null
                    }
                );
            } else {
                this.setState(
                    {
                        error: null,
                        state: 'ready',
                        file: csvfile,
                        progress: 0
                    }
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

        this.setState({ state: 'uploading', progress: 0 });
    }

    displayProgress = (event) => {
        if (event.lengthComputable) {
            this.setState({ progress: event.loaded * 100 / event.total });
        }
    }

    uploadSuccess = (evt) => {
        if (evt.type !== 'load') {
            console.log(evt);
        }

        if (evt.target.status !== 200) {
            this.setState({
                state: 'error',
                error: evt.target.status + ' ' + evt.target.statusText,
                retry: true
            });
            return;
        }
        this.setState({
            state: 'uploadComplete',
            retry: false
        });
    }

    uploadError = (evt) => {
        switch (evt.type) {
            case "timeout":
                this.setState({
                    state: 'error',
                    retry: true,
                    error: 'Timeout reached trying to post to ' + evt.target.responseURL
                });
                break;
        }
        console.log(evt);
    }

    render() {
        let loading = this.state.state === 'uploading';
        let disableButton = !(this.state.state === 'retry' || this.state.state === 'ready');
        let error = this.state.state === 'error';
        let buttonText = 'Upload';
        switch (this.state.state) {
            case 'uploadComplete':
                buttonText = 'Upload complete!';
                break;
            case 'retry':
                buttonText = 'Retry?';
                break;
        }


        return (
            <div>
                <Input type="file" id="uploadField"
                    onChange={this.handleFiles}
                    multiple={false}
                    icon={<Icon name='file text outline' />} />
                <Button id="uploadButton" color='linkedin' loading={loading} negative={error} positive={this.state.state === 'uploadComplete'} attached='top' fluid={true} onClick={this.handleUpload} disabled={disableButton}>{buttonText}</Button>
                {(loading || error) && (
                    <Progress percent={this.state.progress} error={error} active>
                        {this.state.error}
                    </Progress>
                )}
            </div>
        );
    }
}