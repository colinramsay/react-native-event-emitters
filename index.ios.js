/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var EventEmitter = require('EventEmitter');
var Subscribable = require('Subscribable');

var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    NavigatorIOS
} = React;


var navigatorevents = React.createClass({
    componentWillMount: function() {
        this.eventEmitter = new EventEmitter();
    },

    onRightButtonPress: function() {
        this.eventEmitter.emit('myRightBtnEvent', { someArg: 'argValue' });
    },

    render: function() {
        return <NavigatorIOS
                style={styles.container}
                initialRoute={{
                    title: 'Test',
                    component: Test,
                    rightButtonTitle: 'Change String',
                    onRightButtonPress: this.onRightButtonPress,
                    passProps: {
                        events: this.eventEmitter
                    }
                }}/>
    }
});

var Test = React.createClass({
    mixins: [Subscribable.Mixin],

    getInitialState: function() {
        return {
            variable: 'original string'
        };
    },

    componentDidMount: function() {
        this.addListenerOn(this.props.events, 'myRightBtnEvent', this.miscFunction);
    },

    miscFunction: function(args){
        this.setState({
            variable: args.someArg
        });
    },
    render: function(){
        return(
            <View style={styles.scene}><Text>{this.state.variable}</Text></View>
        )
    }
});


var styles = StyleSheet.create({
    container: { flex: 1 },
    scene: {padding: 10, paddingTop: 74}
});

AppRegistry.registerComponent('navigatorevents', () => navigatorevents);
