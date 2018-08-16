import React from 'react';
import { Tabs, Button } from 'antd';
import {POSITION_KEY, GEO_OPTIONS} from "../Constants"


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
            )
        }
    }

    onSuccessLoadGeoLocation = (position) => {
        console.log(position);
        this.setState({loadingGeoLocation: false, error: ''});
        // Destruct.
        const{ latitude, longitude } = position.coords;
        localStorage.setItem(POSITION_KEY, JSON .stringify({lat: latitude, lon: longitude}));
        // ToDo: Load Nearby Posts according the current location.

    }

    onFailedLoadGeolocation = () => {
        this.setState({loadingGeoLocation: false, error: 'Failed to load geolocation!'});
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