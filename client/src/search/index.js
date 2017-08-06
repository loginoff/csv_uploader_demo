import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Input, Table, Icon, Label } from 'semantic-ui-react';
import Axios, { CancelToken } from 'axios';
import axiosCancel from 'axios-cancel';

axiosCancel(Axios, { debug: true });

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
        }),
        error: ''
    }

    requestData = (value) => {
        //We already have a request it progress, cancel it
        if (this.state.isLoading) {
            Axios.cancel(this.currentRequest);
        }
        this.currentRequest = value;
        this.state.axios.post("", {
            query: value,
        }, { requestId: value }).then(res => {
            let matches = res.data.results.slice(0, 30);
            this.setState({ matches: matches, isLoading: false, error: '' });
        }).catch(err => {
            this.setState({ error: err.message, isLoading: false })
        });
    }

    handleSearchChange = (e, { value }) => {
        if (value) {
            this.requestData(value);
            this.setState({ value: value, isLoading: true });
        } else {
            this.setState({ value: value, isLoading: false, matches: [] });
        }
    }

    renderMatch = (match,i) => {
        return (
            <Table.Row key={match.id} id={'result-' + i}>
                <Table.Cell>
                    {match.id}
                </Table.Cell>
                <Table.Cell>
                    {match.name}
                </Table.Cell>
                <Table.Cell>
                    {match.age}
                </Table.Cell>
                <Table.Cell>
                    {match.address}
                </Table.Cell>
                <Table.Cell>
                    <Label color={(match.team==='WHITE') ? 'grey':match.team.toLowerCase()}>{match.team}</Label>
                </Table.Cell>
            </Table.Row>
        )
    }
    render() {
        return (
            <div>
                <Input
                    id='searchField'
                    icon={<Icon name='user' />}
                    loading={this.state.isLoading}
                    onChange={this.handleSearchChange}
                    error={this.state.error!==''}
                />
                {(this.state.error!=='') && (<Label color='red' basic pointing="left">Server error!</Label>)}
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Id</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Age</Table.HeaderCell>
                            <Table.HeaderCell>Address</Table.HeaderCell>
                            <Table.HeaderCell>Team</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.state.matches.map(this.renderMatch)}
                    </Table.Body>
                </Table>
            </div>

        )
    }
}