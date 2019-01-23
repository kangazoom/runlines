import React, { Component } from 'react';
import { StyleSheet, Button, View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Header from './Common/Header'
import RecorderContainer from './RecorderContainer';


class TestMemoryContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLine: props.selectedLine,
            cueLine: props.selectedScript.script_data[props.selectedLineIndex-1],
            transcription: null
        }
    }
    
        transcriptionResponse = (data) => {
            let lineAsString = "";
            if (data!==null) {
            let results = data['results'];
            for (let result of results) {
                lineAsString += result["alternatives"][0]["transcript"]
            }

            this.setState({
                transcription: lineAsString
              })
              Actions.resultsContainer({selectedCharacter: this.props.selectedCharacter, selectedScript: this.props.selectedScript, selectedLine: this.state.selectedLine, transcription: this.state.transcription})


        }
            else {
                return 'TRY AGAIN'
            }

          }

          wordSuggestionBuckets = () => {
            let actualTextWordsArray = this.state.selectedLine.split(" ");
            let totalChars = 0
            let charCounter = 0;
            let bigBucket = [];
            let miniBucket = ""
            let bucketCounter = 0;
            let wordCounter = 0

            for (let word of actualTextWordsArray) {
                
                charCounter += (word.length+1)
                totalChars += (word.length+1)
                wordCounter += 1

                if (totalChars >= 10000 || wordCounter >= 500) {
                    break
                }

                if (charCounter > 100) {
                    charCounter = 0
                    charCounter += (word.length+1)
                    bigBucket.push(miniBucket)
                    miniBucket= ""
                    
                }
                miniBucket += `${word} `
            }
            bigBucket.push(miniBucket)
            console.log(bigBucket)
            return bigBucket;

          }




        //   onResultsPress = () => {
        //     //   Actions.resultsContainer()
        //     // Actions.resultsContainer({selectedCharacter: this.props.selectedCharacter, selectedScript: this.props.selectedScript, selectedLine: this.state.selectedLine, transcription: this.state.transcription})
        //     // hard coding:
        //     Actions.resultsContainer({selectedCharacter: this.props.selectedCharacter, selectedScript: this.props.selectedScript, selectedLine: this.state.selectedLine, transcription: this.state.transcription})
        // }
    
    render() {
        console.log(this.state.cueLine)
        let phrases = this.wordSuggestionBuckets()
        
        console.log(this.state.selectedLine)
        console.log(this.state.transcription)
        return (
            <View style={styles.containerStyle}>
                <Header>Cue Line: </Header>
                {this.state.cueLine ? <Text>{this.state.cueLine.speaking_character}: {this.state.cueLine.line} </Text> : <Text>YOU HAVE THE FIRST LINE!</Text>}
                <Header>Your Line:</Header>
                <Text>{this.state.selectedLine}</Text>
                <Header>Record</Header>
                <RecorderContainer returnedTranscriptionResponseCB={this.transcriptionResponse} phrases={phrases}/>
                {/* <Text>Returned Transcription: {this.state.transcription}</Text> */}
                {/* <Text>Parsed Transcription:</Text> */}
                {/* <Button
                title="CONTINUE TO NEXT PAGE (CHANGE LATER)"
                onPress={this.onResultsPress}
                /> */}

            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: '#fff'
        },
    headerStyle: {
        fontSize: 20,
    }
});

export default TestMemoryContainer;