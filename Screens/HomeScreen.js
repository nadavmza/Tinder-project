import { View, Text,Button,TouchableOpacity,Image,StyleSheet} from 'react-native';
import React,{ useState,useRef,useLayoutEffect,useEffect} from 'react';
import {useNavigation} from "@react-navigation/core"
import useAuth from '../hooks/useAuth';
import tw from 'tailwind-react-native-classnames'
import { SafeAreaView } from 'react-native-safe-area-context';
import {AntDesign,Entypo,Ionicons} from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
import {collection,doc,onSnapshot,query,getDocs,setDoc,where,getDoc,serverTimestamp} from "firebase/firestore";
import {db} from "../firebase";
import generatedId from '../lib/generatedId'





const Dummy_DATA=[

{

    firstName:"nadav",
    lastName:"mazuz",
    job:"full stack",
    photoURL:require("../nadav.jpg"),
    age:27,
    id:123

},
{
firstName:"nadava",
    lastName:"mazuza",
    job:"full stackaa",
    photoURL:require("../tair.jpg"),
    age:40,
    id:456
},
{
  firstName:"elon",
      lastName:"musk",
      job:"full nadav",
      photoURL:require("../nad.jpg"),
      age:30,
      id:789
  }
]

const HomeScreen = () => {
    const navigation =useNavigation();
    const {user,logout} = useAuth();
    const [profiles,setProfiles] = useState([])
    const swipeRef=useRef(null);

  useLayoutEffect(()=>{
    onSnapshot(doc(db,'users',user.uid),(snapshot)=>{
      if(!snapshot.exists()) {
        navigation.navigate('Modal')
      }
    })
  },[])

  useEffect(()=>{
  let unsub;
  console.warn("anada2")

    const fetchCards= async()=>{
      const passes=await getDocs(collection(db,'users',user.uid,'passes')).then
      ((snapshot)=>snapshot.docs.map((doc)=>doc.id)
      );

      const swipes=await getDocs(collection(db,'users',user.uid,'swipes')).then
      ((snapshot)=>snapshot.docs.map((doc)=>doc.id)
      );


      const passedUserIds=passes.length > 0 ?passes :['test']
      const swipedUserIds=swipes.length > 0 ?swipes :['test']



      unsub=onSnapshot(query
      (collection(db,'users'),
      where('id','not-in',[...passedUserIds, ...swipedUserIds])),
      (snapshot)=>{
        setProfiles(
          snapshot.docs.
          filter((doc)=>doc.id !== user.uid)
          .map((doc)=>({
            id:doc.id,
            ...doc.data(),
          
          }))
          )
      })
    }

     fetchCards();
     return unsub;
  },[db])
   

  const swipeLeft=(cardIndex)=>{
    if(!profiles[cardIndex]) return;

    const userSwiped =profiles[cardIndex];
    // console.log(`you swiped pass on ${userSwiped,displayName}`)
    setDoc(doc(db,"users",user.uid,"passes",userSwiped.id),
    userSwiped)
  }
  const swipeRight=async(cardIndex)=>{
    if(!profiles[cardIndex]) return;

    const userSwiped =profiles[cardIndex];

    const loggedInProfile=await (await getDoc(doc(db,'users',user.uid))
    ).data();

    getDoc(doc(db,'users',userSwiped.id,'swipes',user.uid)).then(
      (documentSnapshot)=>{
        if(documentSnapshot.exists()) {
           setDoc(doc(db,'users',user.uid,'swipes',userSwiped.id),
           userSwiped)
// Create A match
          setDoc(doc(db,'matches',generatedId(user.uid,userSwiped.id)),
          {
          //here is the problem
             users:{
               [user.uid]:loggedInProfile,
               [userSwiped.id]:userSwiped,
            },
            userMatched:[user.uid,userSwiped.id],
            timestamp:serverTimestamp(),
           })
         
          alert("ss")

         
          navigation.navigate('Match',{
            loggedInProfile,
            userSwiped,
          })
          

        } 
        else{
           setDoc(doc(db,'users',user.uid,'swipes',userSwiped.id),
           userSwiped)
           alert("nadavzx")

        }
      }
      )
  
  }
  return (
    <SafeAreaView style={[tw`flex-1`]} >
      {/* {Header} */}
      <View style={[tw`flex-row items-center justify-between px-5`]}>

        <TouchableOpacity onPress={logout}>
          <Image 
          style={[tw`h-10 w-10 rounded-full`]}
          source={{uri: user.photoURL}}
          />
        </TouchableOpacity>
      
      
      <TouchableOpacity onPress={()=>navigation.navigate("Modal")}>
        <Image style={[tw`h-14 w-14`]} source={require("../logo.png")}></Image>
      </TouchableOpacity>


      <TouchableOpacity onPress={()=>navigation.navigate("Chat")}>
        <Ionicons name="chatbubbles-sharp" 
        size={30}
        color="#FF5864"
        />
      </TouchableOpacity>
      
      </View>
     
      {/* End of header */}
      {/* Cards */}
      <View style ={tw `flex-1 -mt-6`}>
      <Swiper 
      ref={swipeRef}
      containerStyle={{backgroundColor:"transparent"}}
      cards={profiles}
      stackSize={5}
      cardIndex={0}
      animateCardOpacity
      verticalSwipe={false}
      onSwipedLeft={(cardIndex)=>{
        swipeLeft(cardIndex)
        // console.log("Swipe pass")
      }}
      onSwipedRight={(cardIndex)=>{
        swipeRight(cardIndex)

        // console.log("Swipe Match")
      }}
      backgroundColor={"#4FD0E9"}
      overlayLabels={{
        left:{
          title:"NOPE",
          style:{
            label:{
              textAlign: "right",
              color:"red",
            },
          },
        },
        right:{
          title:"MATCH",
          style:{
            label:{
              color:"#4DED30",
            },
          },
        },
      }}
      
        renderCard={(card)=> card ? (
          <View key={card.id} style={tw `relative bg-white-500 h-3/4 rounded-xl`}>
          <Image style={tw `absolute top-0 h-full w-full rounded-xl`} source={{uri:card.photoURL}}/>
          
          <View style={[tw `absolute bottom-0 bg-white w-full 
          flex-row justify-between items-center h-20 px-6 py -2 rounded-b-xl`
          ,styles.cardShadow]}>

            <View>
              <Text style={[tw`text-xl font-bold`]}>{card.displayName}</Text>
              <Text>{card.job}</Text>

            </View>
            <Text style={[tw`text-2xl font-bold`]}>{card.age}</Text>
          </View>
        </View>
        ) : (
          <View style ={[tw 
            `relative bg-white h-3/4 rounded-xl justify-center items-center`,
            styles.cardShadow,
          ]}
          >
            <Text style ={tw `font-bold pb-5`}>No More Profiles</Text>
            <Image 
            style={[tw `h-20 w-full`]}
            height={100}
            width={100}
            source={{uri :"https://links.papareact.com/6gb"}}


        
        />

      </View>
        )}
    />
    </View>

      <View style={[tw`flex flex-row justify-evenly`]}>
        <TouchableOpacity 
        onPress={()=>swipeRef.current.swipeLeft()}
        style={[tw`items-center justify-center rounded-full w-16 h-16
        bg-red-200`]}>
          <Entypo name="cross" size={24} color="red"/>
        </TouchableOpacity>


        <TouchableOpacity 
        onPress={()=>swipeRef.current.swipeRight()}
        style={[tw`items-center justify-center rounded-full w-16 h-16 bg-green-200`]}>
          <AntDesign name="heart" size={24}/>
        </TouchableOpacity>

      </View>
      
    </SafeAreaView>
  );
};

export default HomeScreen;


const styles= StyleSheet.create({
  cardShadow:{
    shadowColor:"#000",
    shadowOffset:{
      width:0,
      height:1,
    },
    shadowOpacity:0.2,
    shadowRadius:1.41,
    elevation:2,
  },
});
