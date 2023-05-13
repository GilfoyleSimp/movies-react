import { createContext } from "react";
import { useState } from "react";


export const UserContext = createContext({
    displayName: '',
    photoUrl: '', 
    email: '',
    uid: '',
    currentUser: null,
    setCurrentUser: () => {}
})

export const UserProvider = ({children}) => {
    const [displayName, setDisplayName] = useState('')
    const [photoUrl, setPhotoUrl] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [uid, setUid] = useState('')
    const [currentUser, setCurrentUser] = useState(null)


    const value = {
        displayName, setDisplayName,
        photoUrl, setPhotoUrl,
        userEmail, setUserEmail,
        uid, setUid,
        currentUser, setCurrentUser
    }

    

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    )

}