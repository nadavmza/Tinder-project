import { View, Text,FlatList } from 'react-native'
import React,{useEffect,useState} from 'react'
import tw from 'tailwind-react-native-classnames'
import useAuth from "../hooks/useAuth"
import ChatRow from '../components/ChatRow'
import {db} from "../firebase";
import {collection,onSnapshot,query,where} from "@firebase/firestore";

const ChatList = () => {
    const [matches,setMatches]=useState ([]);
    const {user} =useAuth()

    useEffect (() =>
        onSnapshot(
          query(
            collection(db,'matches'),
            where('userMatched','array-contains',user.uid)
        ),
        (snapshot)=> 
        setMatches(snapshot.docs.map((doc)=>({
            id: doc.id,
            ...doc.data(),
        }))
        )
        ),
    [user]
    );
  return (
    matches.length>0 ?(
    <FlatList
    style={tw `h-full`}
    data={matches}
    keyExtractor={(item)=>item.id}
    renderItem={({item}) => <ChatRow matchDetails={item}/>}
    />
    ) :(
      <View style={tw `p-5`}>
        <Text style ={tw`text-center text-lg`}>
          No matches at the moment
        </Text>
      </View>
    )
   
  )
}

export default ChatList