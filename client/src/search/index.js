import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Search } from 'semantic-ui-react';
import Axios, {CancelToken} from 'axios';
import axiosCancel from 'axios-cancel';

axiosCancel(Axios, {debug: true});

export default class SearchView extends Component {
    static defaultProps = {
        api_endpoint: '/search'
    }
    state = {
        isLoading: false,
        upToDate: true,
        value: '',
        matches: [],
        axios: Axios.create({
            baseURL: this.props.api_endpoint,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'POST'
        })
    }

    requestData = (value) => {
        //We already have a request it progress, cancel it
        if(this.state.isLoading) {
            Axios.cancel(this.currentRequest);
        }
        this.currentRequest=value;
        this.state.axios.post("", {
            query: value,
        },{requestId: value}).then(res => {
            let matches = res.data.results.slice(0,30);
            this.setState({matches: matches, isLoading: false});
        }).catch(err => {
            console.log('good old error');
            console.log(err);
        });
    }

    handleSearchChange = (e, { value }) => {
        if(value) {
            this.requestData(value);
            this.setState({value: value, isLoading: true});
        } else {
            this.setState({value: value, isLoading: false});
        }
    }

    renderResult = (props) => {
        return (
            <div key={props.id} id={'result-' + props.id} >
                <p>{props.name}</p>
                <p>{props.address}</p>
            </div>
        )
    }
    render() {
        return (
            <Search
                loading={this.state.isLoading}
                value={this.state.value}
                results={this.state.matches}
                onSearchChange={this.handleSearchChange}
                resultRenderer={this.renderResult} />
        )
    }
}