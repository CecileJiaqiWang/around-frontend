import React from 'react';
import { Tabs, Button } from 'antd';
import {POSITION_KEY, GEO_OPTIONS, TOKEN_KEY, AUTH_PREFIX} from "../Constants";
import $ from 'jquery';


const TabPane = Tabs.TabPane;

const operations = <Button>Extra Action</Button>;

export class Home extends React.Component {
    state = {
        loadingGeoLocation: false,
        loadingPosts: false,
        error: '',
        posts: [],
    }

    componenentDidMount() {
        this.setState({loadingGeoLocation: true, error: ''});
        this.getGeoLocation();
    }

    getGeoLocation = () => {
        if ('geoLocation' in navigator) {
            navigator.geoLocation.getCurrentPosition(
                this.onSuccessLoadGeoLocation,
                this.onFailedLoadGeolocation,
                GEO_OPTIONS,
            );
        } else {
            this.setState({error: 'Your browser does not support geolocation! Please change a browser!'})
        }
    }

    onSuccessLoadGeoLocation = (position) => {
        console.log(position);
        this.setState({loadingGeoLocation: false, error: ''});
        // Destruct.
        const{ latitude, longitude } = position.coords;
        localStorage.setItem(POSITION_KEY, JSON.stringify({lat: latitude, lon: longitude}));
        this.loadNearbyPosts();

    }

    onFailedLoadGeolocation = () => {
        this.setState({loadingGeoLocation: false, error: 'Failed to load geolocation!'});
    }


    loadNearbyPosts = () => {
        const { latitude, longitude } = JSON.parse(localStorage.getItem(POSITION_KEY));
        this.setState({loadingPosts: true, error: ''});
        $.ajax({
            url: `${API_ROOT}/search?lat=${latitude}&lon=${longitude}&range=20000`,
            method: 'GET',
            headers: {
                Authorization: `${AUTH_PREFIX} ${localStorage.getItem(TOKEN_KEY)}`,
            },
        }).then((response) => {
            this.setState({ posts: response, loadingPosts: false, error: ''});
            console.log(response);
        }, (error) => {
            this.setState({ loadingPosts: false, error: error.responseText});
            console.log(error);
        }).catch((error) => {
            console.log(error);
        });
    }


    render() {
        return (
            <Tabs tabBarExtraContent={operations}>
                <TabPane tab="Tab 1" key="1">Content of tab 1</TabPane>
                <TabPane tab="Tab 2" key="2">Content of tab 2</TabPane>
                <TabPane tab="Tab 3" key="3">Content of tab 3</TabPane>
            </Tabs>

        );
    }
}