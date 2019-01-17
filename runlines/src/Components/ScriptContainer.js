import React, { Component } from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';


class ScriptContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { selectedCharacter : props.selectedCharacter }

        this.renderCell = this.renderCell.bind(this);
    }

    renderCell(cellData) {
        const selectedCharacter = this.state.selectedCharacter;
        const textColor = (cellData.item.speaking_character === selectedCharacter) ? 'yellow' : 'white';
        return (
            <View style={{ borderColor:'black', borderWidth: 2 }}>
                <Text 
                style={{ backgroundColor: textColor, color:  'black'}}
                onPress={() => {
                    this.onLinePress(cellData)
                }}>{`${cellData.item.speaking_character}: ${cellData.item.line}`}</Text>
            </View>
        );
    }

    onLinePress = (pressedLine) => {
        console.log(pressedLine)
        Actions.testMemoryContainer({ selectedCharacter: this.props.characterName, selectedScript: this.props.selectedScript, selectedLine: pressedLine })
    }


    render() {
        return (
            <View>
                <FlatList
                    data={this.props.selectedScript.script_data}
                    renderItem={this.renderCell}
                    keyExtractor={item => JSON.stringify(item.index)}
                />
            </View>
        );
    }
}

export default ScriptContainer;