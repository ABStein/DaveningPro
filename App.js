import { StyleSheet, View } from 'react-native';
import TextViewer from './components/TextViewer';
import Button from './components/Button';
import { useState } from 'react';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as Haptics from 'expo-haptics';
import {HDate} from '@hebcal/core';
import OpenAI from 'openai';

export default function App() {
    const [showAppOptions, setShowAppOptions] = useState(false);
    const [response, setResponse] = useState('');

    // have fun knowing what to daven today
    const openai = new OpenAI({
        apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
    });

    const getDavening = async () => {
        try {
            const hebrewDate = new HDate().toString();
            const usePromptToGetOutput = await openai.chat.completions.create({
                messages: [
                    { role: 'user', content: `Given today's hebrew date ${hebrewDate}, are there any changes to today's davening, otherwise say "Today is ${hebrewDate}, nothing is changed with davening today.` },
                ],
                model: 'gpt-3.5-turbo',
            });
            console.log('i worked!', usePromptToGetOutput.choices[0].message.content)
            setShowAppOptions(true);
            return setResponse(usePromptToGetOutput.choices[0].message.content);
        } catch (error) {
            console.error('Error:yadayada', error);
        }
        response === '' && getDavening();
    }
    
  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          {showAppOptions ? (
            <TextViewer
              daveningText={response}
            />
          ) : (
            <TextViewer
              daveningText={"What's on the docket for today?"}
            />  
          )}
        </View>
        <View style={styles.footerContainer}>
          <Button theme="primary" label="Get Today's Davening" onPress={
            // use haptics to give user feedback
            () => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.light);
              getDavening();
            }
          } />
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    paddingTop: 300,
  },
  footerContainer: {
    flex: 1,
    alignItems: 'center',
  }
});
